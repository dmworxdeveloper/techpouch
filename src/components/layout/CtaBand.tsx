import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappUrl } from "@/lib/site";

/** Closing call-to-action used at the bottom of inner pages. */
export function CtaBand({
  title,
  text,
  message,
  secondary = { label: "Contact Us", href: "/contact" },
}: {
  title: string;
  text: string;
  message: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="reveal relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 text-center text-white sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl"
          />
          <h2 className="relative text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/70">{text}</p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={whatsappUrl(message)} external variant="whatsapp" size="lg">
              <WhatsAppIcon className="size-5" />
              Ask on WhatsApp
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="light" size="lg">
              {secondary.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
