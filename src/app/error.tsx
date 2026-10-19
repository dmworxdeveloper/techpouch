"use client";

import { RotateCcw } from "lucide-react";
import { buttonClasses, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappUrl } from "@/lib/site";

/** Error boundary for unexpected rendering errors. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="text-sm font-semibold text-brand-600">Something went wrong</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">We couldn&apos;t load this page</h1>
      <p className="mx-auto mt-4 max-w-md text-ink-600">
        Please try again. If the problem continues, our team is available on WhatsApp.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button type="button" onClick={reset} className={buttonClasses("primary")}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Try again
        </button>
        <ButtonLink href={whatsappUrl()} external variant="whatsapp">
          <WhatsAppIcon className="size-4" />
          Chat on WhatsApp
        </ButtonLink>
      </div>
    </Container>
  );
}
