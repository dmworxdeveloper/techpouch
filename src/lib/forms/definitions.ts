import { publishedCategories } from "@/lib/catalog";

/*
 * Inquiry form definitions shared by the browser (rendering + instant validation)
 * and the /api/inquiry route (authoritative validation). Add or change a field here
 * and both sides pick it up.
 */

export type FieldType = "text" | "email" | "tel" | "select" | "textarea" | "files";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  minLength?: number;
  maxLength?: number;
  autoComplete?: string;
  placeholder?: string;
  hint?: string;
  /** Renders at half width on larger screens. */
  half?: boolean;
};

export type FormId = "contact" | "wholesale" | "custom";

export type FormDef = {
  id: FormId;
  /** Used in the email subject and WhatsApp fallback. */
  title: string;
  submitLabel: string;
  fields: FieldDef[];
};

export const uploadRules = {
  maxFiles: 4,
  /** Total for all files. Kept under common serverless request limits (e.g. 4.5 MB on Vercel). */
  maxTotalBytes: 4 * 1024 * 1024,
  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
  acceptAttr: ".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp",
} as const;

const categoryNames = publishedCategories.map((c) => c.name);

const nameField: FieldDef = {
  name: "name",
  label: "Full Name",
  type: "text",
  required: true,
  minLength: 2,
  maxLength: 100,
  autoComplete: "name",
  half: true,
};
const emailField: FieldDef = {
  name: "email",
  label: "Email Address",
  type: "email",
  required: true,
  maxLength: 200,
  autoComplete: "email",
  half: true,
};
const businessField: FieldDef = {
  name: "businessName",
  label: "Business Name",
  type: "text",
  maxLength: 150,
  autoComplete: "organization",
  half: true,
};
const quantityField: FieldDef = {
  name: "quantity",
  label: "Estimated Quantity",
  type: "text",
  required: true,
  maxLength: 100,
  placeholder: "e.g. 1 sample, 100 pieces",
  half: true,
};
const attachmentsField: FieldDef = {
  name: "attachments",
  label: "Reference Images",
  type: "files",
  hint: `Optional. Up to ${uploadRules.maxFiles} JPG, PNG or WebP images, ${uploadRules.maxTotalBytes / 1024 / 1024} MB in total.`,
};

export const forms: Record<FormId, FormDef> = {
  contact: {
    id: "contact",
    title: "Website inquiry",
    submitLabel: "Send Message",
    fields: [
      nameField,
      emailField,
      {
        name: "inquiryType",
        label: "Inquiry Type",
        type: "select",
        required: true,
        options: ["Retail", "Wholesale", "Custom Manufacturing", "Other"],
        half: true,
      },
      {
        name: "product",
        label: "Product of Interest",
        type: "select",
        options: [...categoryNames, "Custom product", "Not sure yet"],
        half: true,
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true,
        minLength: 10,
        maxLength: 3000,
        placeholder: "Quantities, sizes, specifications or any other details…",
      },
    ],
  },
  wholesale: {
    id: "wholesale",
    title: "Wholesale inquiry",
    submitLabel: "Request a Quote",
    fields: [
      nameField,
      businessField,
      emailField,
      { name: "phone", label: "Phone / WhatsApp", type: "tel", maxLength: 30, autoComplete: "tel", half: true },
      {
        name: "location",
        label: "Country or Delivery Location",
        type: "text",
        required: true,
        maxLength: 120,
        autoComplete: "country-name",
        half: true,
      },
      {
        name: "productCategory",
        label: "Product Category",
        type: "select",
        required: true,
        options: [...categoryNames, "Multiple categories", "Custom product", "Other"],
        half: true,
      },
      { ...quantityField, placeholder: "e.g. 200 pieces" },
      {
        name: "message",
        label: "Inquiry Details",
        type: "textarea",
        required: true,
        minLength: 10,
        maxLength: 3000,
        placeholder: "Products, sizes, colours, delivery requirements or anything else we should know…",
      },
      attachmentsField,
    ],
  },
  custom: {
    id: "custom",
    title: "Custom manufacturing inquiry",
    submitLabel: "Submit Project Inquiry",
    fields: [
      nameField,
      emailField,
      { ...businessField, label: "Company or Business Name" },
      {
        name: "productConcept",
        label: "Product Name or Concept",
        type: "text",
        required: true,
        maxLength: 150,
        placeholder: "e.g. Laptop sleeve with front pocket",
        half: true,
      },
      {
        name: "productCategory",
        label: "Product Category",
        type: "select",
        required: true,
        options: ["Tablet cover", "Mouse pad", "Headphone accessory", "Other tech accessory", "Not sure yet"],
        half: true,
      },
      quantityField,
      {
        name: "dimensions",
        label: "Desired Dimensions & Specifications",
        type: "textarea",
        required: true,
        minLength: 5,
        maxLength: 2000,
        placeholder: "Size, shape, closure type, features…",
      },
      {
        name: "materials",
        label: "Material Preferences",
        type: "text",
        maxLength: 300,
        placeholder: "Optional — e.g. leather, neoprene, fabric",
      },
      {
        name: "requirements",
        label: "Additional Requirements",
        type: "textarea",
        maxLength: 3000,
        placeholder: "Colours, branding ideas, packaging, deadlines you are working towards…",
      },
      attachmentsField,
    ],
  },
};
