import { forms, uploadRules, type FormDef, type FormId } from "./definitions";

export type FieldErrors = Record<string, string>;
export type FileMeta = { name: string; size: number; type: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{5,}$/;

export function isFormId(value: unknown): value is FormId {
  return typeof value === "string" && value in forms;
}

/** Validates text values and file metadata against a form definition. Runs in the browser and on the server. */
export function validateInquiry(form: FormDef, values: Record<string, string>, files: FileMeta[] = []): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of form.fields) {
    if (field.type === "files") {
      if (files.length > uploadRules.maxFiles) {
        errors[field.name] = `Please attach no more than ${uploadRules.maxFiles} images.`;
      } else if (files.some((f) => !(uploadRules.acceptedTypes as readonly string[]).includes(f.type))) {
        errors[field.name] = "Only JPG, PNG and WebP images can be attached.";
      } else if (files.reduce((sum, f) => sum + f.size, 0) > uploadRules.maxTotalBytes) {
        errors[field.name] = `Attachments must be ${uploadRules.maxTotalBytes / 1024 / 1024} MB or less in total.`;
      }
      continue;
    }

    const value = (values[field.name] ?? "").trim();
    const label = field.label.toLowerCase();

    if (!value) {
      if (field.required) {
        errors[field.name] =
          field.type === "select" ? `Please choose a ${label}.` : `Please enter your ${label}.`;
      }
      continue;
    }
    if (field.minLength && value.length < field.minLength) {
      errors[field.name] =
        field.type === "textarea"
          ? `Please add a little more detail (at least ${field.minLength} characters).`
          : `Please enter at least ${field.minLength} characters.`;
    } else if (field.maxLength && value.length > field.maxLength) {
      errors[field.name] = `Please keep this under ${field.maxLength} characters.`;
    } else if (field.type === "email" && !EMAIL_PATTERN.test(value)) {
      errors[field.name] = "Please enter a valid email address.";
    } else if (field.type === "tel" && !PHONE_PATTERN.test(value)) {
      errors[field.name] = "Please enter a valid phone number.";
    } else if (field.type === "select" && field.options && !field.options.includes(value)) {
      errors[field.name] = "Please choose one of the listed options.";
    }
  }

  return errors;
}

/** Plain-text summary of an inquiry, used for the email body and the WhatsApp fallback. */
export function summarizeInquiry(form: FormDef, values: Record<string, string>, fileNames: string[] = []): string {
  const lines = form.fields.flatMap((field) => {
    if (field.type === "files") {
      return fileNames.length ? [`${field.label}: ${fileNames.join(", ")}`] : [];
    }
    const value = (values[field.name] ?? "").trim();
    if (!value) return [];
    return field.type === "textarea" ? [`${field.label}:`, value, ""] : [`${field.label}: ${value}`];
  });
  return [`${form.title}`, "", ...lines].join("\n").trim();
}
