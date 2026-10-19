"use client";

import { useId, useState, type FormEvent } from "react";
import { Info, Mail } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { products } from "@/lib/products";
import { mailtoUrl, whatsappUrl } from "@/lib/site";

/*
 * This form has no server backend. On submit it validates the fields, then opens
 * WhatsApp or the visitor's email app with the inquiry pre-filled, so the visitor
 * sends it themselves. See README → "Contact form" for adding server-side delivery.
 */

const inquiryTypes = ["Retail", "Wholesale", "Custom Manufacturing", "Other"] as const;
const productOptions = [...products.map((p) => p.name), "Custom product", "Not sure yet"];

type Fields = {
  name: string;
  email: string;
  inquiryType: string;
  product: string;
  message: string;
};
type Errors = Partial<Record<keyof Fields, string>>;
type Channel = "whatsapp" | "email";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_PATTERN.test(f.email.trim())) errors.email = "Please enter a valid email address.";
  if (!f.inquiryType) errors.inquiryType = "Please choose an inquiry type.";
  if (f.message.trim().length < 10) errors.message = "Please add a few details (at least 10 characters).";
  return errors;
}

function composeMessage(f: Fields): string {
  return [
    "Hello Tech Pouch,",
    "",
    f.message.trim(),
    "",
    `Name: ${f.name.trim()}`,
    `Email: ${f.email.trim()}`,
    `Inquiry type: ${f.inquiryType}`,
    `Product of interest: ${f.product || "Not specified"}`,
  ].join("\n");
}

const fieldClass =
  "mt-1.5 block w-full rounded-xl border bg-white px-3.5 py-2.5 text-base text-ink-900 shadow-sm transition placeholder:text-ink-500/70 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none sm:text-sm";

export function ContactForm({ defaultInquiryType = "" }: { defaultInquiryType?: string }) {
  const id = useId();
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    inquiryType: defaultInquiryType,
    product: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState<Channel | null>(null);

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel = submitter?.value === "email" ? "email" : "whatsapp";

    const found = validate(fields);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      document.getElementById(`${id}-${firstInvalid}`)?.focus();
      setOpened(null);
      return;
    }

    const body = composeMessage(fields);
    if (channel === "whatsapp") {
      window.open(whatsappUrl(body), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = mailtoUrl(`${fields.inquiryType} inquiry from ${fields.name.trim()}`, body);
    }
    setOpened(channel);
  };

  const errorId = (key: keyof Fields) => `${id}-${key}-error`;
  const describe = (key: keyof Fields) => (errors[key] ? errorId(key) : undefined);
  const border = (key: keyof Fields) => (errors[key] ? "border-red-500" : "border-line");
  const errorText = (field: keyof Fields) =>
    errors[field] ? (
      <p id={errorId(field)} className="mt-1.5 text-sm text-red-600">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5" aria-describedby={`${id}-note`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium text-ink-800">
            Full Name <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={fields.name}
            onChange={update("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            className={`${fieldClass} ${border("name")}`}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-ink-800">
            Email Address <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={fields.email}
            onChange={update("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            className={`${fieldClass} ${border("email")}`}
          />
          {errorText("email")}
        </div>
        <div>
          <label htmlFor={`${id}-inquiryType`} className="text-sm font-medium text-ink-800">
            Inquiry Type <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <select
            id={`${id}-inquiryType`}
            name="inquiryType"
            required
            value={fields.inquiryType}
            onChange={update("inquiryType")}
            aria-invalid={!!errors.inquiryType}
            aria-describedby={describe("inquiryType")}
            className={`${fieldClass} ${border("inquiryType")}`}
          >
            <option value="" disabled>
              Select an option
            </option>
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errorText("inquiryType")}
        </div>
        <div>
          <label htmlFor={`${id}-product`} className="text-sm font-medium text-ink-800">
            Product of Interest
          </label>
          <select
            id={`${id}-product`}
            name="product"
            value={fields.product}
            onChange={update("product")}
            className={`${fieldClass} border-line`}
          >
            <option value="">Select a product (optional)</option>
            {productOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="text-sm font-medium text-ink-800">
          Message <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          value={fields.message}
          onChange={update("message")}
          placeholder="Quantities, sizes, specifications or any other details…"
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
          className={`${fieldClass} ${border("message")} resize-y`}
        />
        {errorText("message")}
      </div>

      <p id={`${id}-note`} className="flex gap-2 rounded-xl bg-surface p-3 text-sm text-ink-600">
        <Info className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
        <span>
          Choosing a button opens WhatsApp or your email app with your inquiry filled in. Your message is
          only sent when you press send there.
        </span>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" value="whatsapp" className={buttonClasses("whatsapp", "lg", "flex-1")}>
          <WhatsAppIcon className="size-5" />
          Continue on WhatsApp
        </button>
        <button type="submit" value="email" className={buttonClasses("secondary", "lg", "flex-1")}>
          <Mail className="size-5" aria-hidden="true" />
          Continue by Email
        </button>
      </div>

      <p role="status" aria-live="polite" className="text-sm text-ink-700 empty:hidden">
        {opened === "whatsapp" &&
          "WhatsApp has opened in a new tab with your inquiry — press send there to deliver it."}
        {opened === "email" &&
          "Your email app should open with your inquiry — press send there to deliver it."}
      </p>
    </form>
  );
}
