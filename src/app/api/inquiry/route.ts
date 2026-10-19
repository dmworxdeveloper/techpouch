import { forms, uploadRules } from "@/lib/forms/definitions";
import { isFormId, summarizeInquiry, validateInquiry, type FileMeta } from "@/lib/forms/validation";
import { sendEmail, type EmailAttachment } from "@/lib/server/email";
import { rateLimit } from "@/lib/server/rate-limit";

/*
 * Receives contact, wholesale and custom manufacturing inquiries and emails them
 * to Tech Pouch. Responds { ok: true } only when the email provider accepted the message.
 */

/** Submissions faster than this after the form appeared are treated as automated. */
const MIN_FILL_TIME_MS = 2500;
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

type ErrorCode = "invalid" | "rate_limited" | "too_fast" | "not_configured" | "send_failed" | "bad_request";

function fail(status: number, error: ErrorCode, fieldErrors?: Record<string, string>) {
  return Response.json({ ok: false, error, ...(fieldErrors ? { fieldErrors } : {}) }, { status });
}

/** Strips control characters (except newlines/tabs) from user input. */
function clean(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Checks the file's leading bytes so a renamed non-image cannot be attached. */
function hasImageSignature(bytes: Uint8Array, type: string): boolean {
  const starts = (sig: number[], offset = 0) => sig.every((b, i) => bytes[offset + i] === b);
  if (type === "image/jpeg") return starts([0xff, 0xd8, 0xff]);
  if (type === "image/png") return starts([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (type === "image/webp") return starts([0x52, 0x49, 0x46, 0x46]) && starts([0x57, 0x45, 0x42, 0x50], 8);
  return false;
}

function safeFilename(name: string, index: number): string {
  const base = name.replace(/[^\w.-]+/g, "_").slice(-80);
  return base || `reference-${index + 1}`;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > uploadRules.maxTotalBytes + 256 * 1024) return fail(413, "invalid", { attachments: "Attachments are too large." });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(`inquiry:${ip}`, RATE_LIMIT.limit, RATE_LIMIT.windowMs).allowed) {
    return fail(429, "rate_limited");
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return fail(400, "bad_request");
  }

  const formId = data.get("formId");
  if (!isFormId(formId)) return fail(400, "bad_request");
  const form = forms[formId];

  // Honeypot: real visitors never see or fill this field. Pretend success so bots don't adapt.
  if (String(data.get("website") ?? "").trim()) return Response.json({ ok: true });

  const elapsed = Number(data.get("elapsedMs"));
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_TIME_MS) return fail(400, "too_fast");

  const values: Record<string, string> = {};
  const files: File[] = [];
  for (const field of form.fields) {
    if (field.type === "files") {
      for (const entry of data.getAll(field.name)) {
        if (entry instanceof File && entry.size > 0) files.push(entry);
      }
    } else {
      const raw = data.get(field.name);
      values[field.name] = typeof raw === "string" ? clean(raw) : "";
    }
  }

  const fileMeta: FileMeta[] = files.map((f) => ({ name: f.name, size: f.size, type: f.type }));
  const fieldErrors = validateInquiry(form, values, fileMeta);

  const attachments: EmailAttachment[] = [];
  if (!fieldErrors.attachments) {
    for (const [i, file] of files.entries()) {
      const bytes = new Uint8Array(await file.arrayBuffer());
      if (!hasImageSignature(bytes, file.type)) {
        fieldErrors.attachments = "One of the files is not a valid JPG, PNG or WebP image.";
        break;
      }
      attachments.push({ filename: safeFilename(file.name, i), content: Buffer.from(bytes) });
    }
  }
  if (Object.keys(fieldErrors).length) return fail(422, "invalid", fieldErrors);

  const text = summarizeInquiry(form, values, attachments.map((a) => a.filename));
  const html = `<pre style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(text)}</pre>`;
  const name = values.name || "Website visitor";

  const result = await sendEmail({
    subject: `${form.title} from ${name}`.slice(0, 150),
    text,
    html,
    replyTo: values.email,
    attachments,
  });

  if (!result.ok) {
    return fail(result.reason === "not_configured" ? 503 : 502, result.reason === "not_configured" ? "not_configured" : "send_failed");
  }
  return Response.json({ ok: true });
}
