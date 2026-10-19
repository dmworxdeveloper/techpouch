import { Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { siteConfig, whatsappMessages, whatsappUrl } from "@/lib/site";

const { contact } = siteConfig;

const channels = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: contact.phoneDisplay,
    action: "Chat on WhatsApp",
    href: whatsappUrl(whatsappMessages.general),
    external: true,
    accent: "bg-whatsapp/15 text-whatsapp-dark",
  },
  {
    icon: Phone,
    label: "Phone",
    value: contact.phoneDisplay,
    action: "Call us",
    href: contact.phoneHref,
    accent: "bg-brand-50 text-brand-600",
  },
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    action: "Send an email",
    href: `mailto:${contact.email}`,
    accent: "bg-brand-50 text-brand-600",
  },
];

/** Contact channels with WhatsApp, tel: and mailto: actions. */
export function ContactDetails() {
  return (
    <ul className="space-y-3">
      {channels.map(({ icon: Icon, label, value, action, href, external, accent }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition hover:border-brand-200 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${accent}`}>
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold tracking-wide text-ink-500 uppercase">{label}</span>
              <span className="block truncate font-semibold text-ink-900">{value}</span>
            </span>
            <span className="hidden text-sm font-medium text-brand-600 group-hover:text-brand-700 sm:inline">
              {action} →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
