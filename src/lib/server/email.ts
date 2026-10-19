/*
 * Server-only email delivery through the Resend HTTP API (https://resend.com).
 * No SDK is needed; credentials are read from server environment variables and
 * never reach the browser. See README → "Inquiry forms" for setup.
 */

export type EmailAttachment = { filename: string; content: Buffer };

export type OutgoingEmail = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
};

export type SendResult = { ok: true } | { ok: false; reason: "not_configured" | "provider_error" };

const DEFAULT_TO = "techpouch123@gmail.com";
/** Resend's shared test sender. Replace with an address on your verified domain via INQUIRY_FROM_EMAIL. */
const DEFAULT_FROM = "Tech Pouch Website <onboarding@resend.dev>";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail(email: OutgoingEmail): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "not_configured" };

  const to = (process.env.INQUIRY_TO_EMAIL || DEFAULT_TO).split(",").map((s) => s.trim()).filter(Boolean);

  try {
    const response = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL || DEFAULT_FROM,
        to,
        subject: email.subject,
        text: email.text,
        html: email.html,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
        ...(email.attachments?.length
          ? {
              attachments: email.attachments.map((a) => ({
                filename: a.filename,
                content: a.content.toString("base64"),
              })),
            }
          : {}),
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      // Log status only — never the request body, which contains personal data.
      console.error(`[inquiry] Email provider responded with status ${response.status}`);
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[inquiry] Email provider request failed:", error instanceof Error ? error.name : "unknown");
    return { ok: false, reason: "provider_error" };
  }
}
