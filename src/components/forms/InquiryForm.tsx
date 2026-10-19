"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, ImagePlus, Loader2, Mail, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { forms, uploadRules, type FieldDef, type FormId } from "@/lib/forms/definitions";
import { summarizeInquiry, validateInquiry, type FieldErrors } from "@/lib/forms/validation";
import { mailtoUrl, siteConfig, whatsappUrl } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const SERVER_MESSAGES: Record<string, string> = {
  invalid: "Please check the highlighted fields and try again.",
  rate_limited: "You have sent several inquiries in a short time. Please wait a few minutes, or contact us on WhatsApp.",
  too_fast: "That was quicker than expected — please check your details and press send again.",
  not_configured: "Our online form is temporarily unavailable, so your inquiry was not sent.",
  send_failed: "We couldn't send your inquiry just now, so it was not delivered.",
  bad_request: "Something went wrong while sending your inquiry.",
};

const fieldClass =
  "mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-base text-ink-900 shadow-sm transition placeholder:text-ink-500/70 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none sm:text-sm";

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export function InquiryForm({
  formId,
  defaultValues = {},
}: {
  formId: FormId;
  defaultValues?: Record<string, string>;
}) {
  const form = forms[formId];
  const id = useId();
  const startedAt = useRef(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(form.fields.filter((f) => f.type !== "files").map((f) => [f.name, defaultValues[f.name] ?? ""])),
  );
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  // Event timestamps share performance.now()'s clock, so fill time can be measured without Date.now().
  useEffect(() => {
    startedAt.current = performance.now();
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") resultRef.current?.focus();
  }, [status]);

  const fileField = form.fields.find((f) => f.type === "files");
  const fileMeta = () => files.map((f) => ({ name: f.name, size: f.size, type: f.type }));
  const fallbackText = () => summarizeInquiry(form, values, files.map((f) => f.name));

  const setValue = (name: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [name]: e.target.value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const addFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    const next = [...files];
    for (const file of picked) {
      if (!next.some((f) => f.name === file.name && f.size === file.size)) next.push(file);
    }
    setFiles(next);
    if (fileField) {
      const fileErrors = validateInquiry({ ...form, fields: [fileField] }, {}, next.map((f) => ({ name: f.name, size: f.size, type: f.type })));
      setErrors((prev) => ({ ...prev, [fileField.name]: fileErrors[fileField.name] ?? "" }));
    }
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    if (fileField) {
      const fileErrors = validateInquiry({ ...form, fields: [fileField] }, {}, next.map((f) => ({ name: f.name, size: f.size, type: f.type })));
      setErrors((prev) => ({ ...prev, [fileField.name]: fileErrors[fileField.name] ?? "" }));
    }
  };

  const focusFirstError = (found: FieldErrors) => {
    const first = form.fields.find((f) => found[f.name]);
    if (first) document.getElementById(`${id}-${first.name}`)?.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validateInquiry(form, values, fileMeta());
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      focusFirstError(found);
      return;
    }

    const body = new FormData();
    body.set("formId", form.id);
    body.set("elapsedMs", String(Math.round(e.timeStamp - startedAt.current)));
    body.set("website", (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "");
    for (const [name, value] of Object.entries(values)) body.set(name, value);
    if (fileField) for (const file of files) body.append(fileField.name, file);

    setStatus("submitting");
    setServerError("");
    try {
      const response = await fetch("/api/inquiry", { method: "POST", body });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      };
      if (response.ok && result.ok) {
        setStatus("success");
        return;
      }
      if (result.fieldErrors) {
        setErrors(result.fieldErrors);
        focusFirstError(result.fieldErrors);
      }
      setServerError(SERVER_MESSAGES[result.error ?? ""] ?? SERVER_MESSAGES.bad_request);
      setStatus("error");
    } catch {
      setServerError("We couldn't reach our server, so your inquiry was not sent. Please check your connection.");
      setStatus("error");
    }
  };

  const reset = (timeStamp: number) => {
    setValues((prev) => Object.fromEntries(Object.keys(prev).map((k) => [k, defaultValues[k] ?? ""])));
    setFiles([]);
    setErrors({});
    setStatus("idle");
    startedAt.current = timeStamp;
  };

  if (status === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="animate-fade-up rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center outline-none sm:p-8"
      >
        <CheckCircle2 className="mx-auto size-12 text-emerald-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-ink-900">Thank you — your inquiry has been sent</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
          Our team has received your details and will reply to {values.email || "your email address"}. For anything
          urgent, you can also message us on WhatsApp.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={(e) => reset(e.timeStamp)} className={buttonClasses("secondary")}>
            Send another inquiry
          </button>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp")}>
            <WhatsAppIcon className="size-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const describe = (field: FieldDef) =>
    [errors[field.name] ? `${id}-${field.name}-error` : "", field.hint ? `${id}-${field.name}-hint` : ""]
      .filter(Boolean)
      .join(" ") || undefined;

  const renderField = (field: FieldDef) => {
    const fieldId = `${id}-${field.name}`;
    const invalid = Boolean(errors[field.name]);
    const border = invalid ? "border-red-500" : "border-line";
    const common = {
      id: fieldId,
      name: field.name,
      "aria-invalid": invalid,
      "aria-describedby": describe(field),
      "aria-required": field.required || undefined,
    };

    return (
      <div key={field.name} className={field.half ? "sm:col-span-1" : "sm:col-span-2"}>
        <label htmlFor={fieldId} className="text-sm font-medium text-ink-800">
          {field.label}
          {field.required ? (
            <span className="text-red-600" aria-hidden="true">
              {" "}
              *
            </span>
          ) : (
            field.type !== "files" && <span className="font-normal text-ink-500"> (optional)</span>
          )}
        </label>

        {field.type === "select" ? (
          <select {...common} value={values[field.name]} onChange={setValue(field.name)} className={`${fieldClass} ${border}`}>
            <option value="">{field.required ? "Select an option" : "Select (optional)"}</option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          <textarea
            {...common}
            rows={4}
            value={values[field.name]}
            onChange={setValue(field.name)}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            className={`${fieldClass} ${border} resize-y`}
          />
        ) : field.type === "files" ? (
          <div className="mt-1.5">
            <label
              htmlFor={fieldId}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-5 text-sm font-medium text-ink-700 transition hover:border-brand-500 hover:bg-brand-50 has-[:focus-visible]:border-brand-500 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100 ${
                invalid ? "border-red-500" : "border-line"
              }`}
            >
              <ImagePlus className="size-5 text-brand-600" aria-hidden="true" />
              Choose images
              <input
                {...common}
                type="file"
                multiple
                accept={uploadRules.acceptAttr}
                onChange={addFiles}
                className="sr-only"
              />
            </label>
            {files.length > 0 && (
              <ul className="mt-3 space-y-2" aria-label="Selected images">
                {files.map((file, i) => (
                  <li
                    key={`${file.name}-${file.size}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2 text-sm"
                  >
                    <span className="min-w-0 truncate text-ink-800">{file.name}</span>
                    <span className="flex shrink-0 items-center gap-2 text-ink-500">
                      {formatSize(file.size)}
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        aria-label={`Remove ${file.name}`}
                        className="grid size-7 place-items-center rounded-md hover:bg-white hover:text-red-600 focus-visible:outline-2 focus-visible:outline-brand-500"
                      >
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <input
            {...common}
            type={field.type}
            value={values[field.name]}
            onChange={setValue(field.name)}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            inputMode={field.type === "email" ? "email" : field.type === "tel" ? "tel" : undefined}
            className={`${fieldClass} ${border}`}
          />
        )}

        {field.hint && (
          <p id={`${fieldId}-hint`} className="mt-1.5 text-xs text-ink-500">
            {field.hint}
          </p>
        )}
        {errors[field.name] && (
          <p id={`${fieldId}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {errors[field.name]}
          </p>
        )}
      </div>
    );
  };

  const submitting = status === "submitting";

  return (
    <form noValidate onSubmit={handleSubmit} aria-busy={submitting} className="space-y-5">
      <p className="text-sm text-ink-500">
        Fields marked <span className="text-red-600">*</span> are required.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">{form.fields.map(renderField)}</div>

      {/* Honeypot for spam bots — hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {status === "error" && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="animate-fade-up rounded-xl border border-red-200 bg-red-50 p-4 text-sm outline-none"
        >
          <p className="flex gap-2 font-medium text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {serverError}
          </p>
          <p className="mt-2 text-ink-700">You can send the same details another way:</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <a href={whatsappUrl(fallbackText())} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp")}>
              <WhatsAppIcon className="size-4" />
              Send via WhatsApp
            </a>
            <a href={mailtoUrl(`${form.title} from ${values.name || "website visitor"}`, fallbackText())} className={buttonClasses("secondary")}>
              <Mail className="size-4" aria-hidden="true" />
              Send by email
            </a>
          </div>
          {files.length > 0 && (
            <p className="mt-2 text-xs text-ink-500">Please attach your images again in WhatsApp or your email.</p>
          )}
        </div>
      )}

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-500 sm:max-w-xs">
          We use your details only to reply to this inquiry. See our{" "}
          <Link href="/privacy-policy" className="text-brand-600 underline-offset-2 hover:underline">
            privacy policy
          </Link>
          .
        </p>
        <button type="submit" disabled={submitting} className={buttonClasses("primary", "lg")}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            form.submitLabel
          )}
        </button>
      </div>

      <p className="text-center text-xs text-ink-500 sm:text-left">
        Prefer to chat?{" "}
        <a
          href={whatsappUrl(`Hello ${siteConfig.name}, I have an inquiry.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-whatsapp-dark underline-offset-2 hover:underline"
        >
          Message us on WhatsApp
        </a>{" "}
        and share images directly.
      </p>
    </form>
  );
}
