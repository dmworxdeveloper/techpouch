import { Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { siteConfig, whatsappMessages, whatsappUrl } from "@/lib/site";

const { contact } = siteConfig;

const channels = [
  {
    icon: Phone,
    label: "Call us",
    value: contact.phoneDisplay,
    href: contact.phoneHref,
    accent: "bg-brand-50 text-brand-600",
  },
  {
    icon: Mail,
    label: "Email us",
    value: contact.email,
    href: `mailto:${contact.email}`,
    accent: "bg-brand-50 text-brand-600",
  },
  {
    icon: WhatsAppIcon,
    label: "Chat on WhatsApp",
    value: contact.phoneDisplay,
    href: whatsappUrl(whatsappMessages.general),
    external: true,
    accent: "bg-whatsapp/15 text-whatsapp-dark",
  },
];

/** Contact channels with tel:, mailto: and WhatsApp actions. `row` lays them out side by side. */
export function ContactDetails({ layout = "stack" }: { layout?: "stack" | "row" }) {
  return (
    <ul className={layout === "row" ? "grid gap-3 sm:grid-cols-3" : "space-y-3"}>
      {channels.map(({ icon: Icon, label, value, href, external, accent }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-white p-3.5 transition hover:border-brand-200 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            <span className={`grid size-11 shrink-0 place-items-center rounded-full ${accent}`}>
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-ink-900">{value}</span>
              <span className="block text-xs text-ink-500 group-hover:text-brand-600">{label}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
