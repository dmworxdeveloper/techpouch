import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/*
 * Plain-language terms reflecting the current inquiry-based ordering process.
 * Have them reviewed by a legal professional before launch, and add return,
 * refund and governing-law terms once the business has confirmed them.
 */

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms for using the Tech Pouch website, making product inquiries, placing orders and submitting custom manufacturing requests.",
  path: "/terms",
});

export default function TermsPage() {
  const { contact } = siteConfig;
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms"
      updated="19 October 2026"
      intro="These terms apply when you use the Tech Pouch website or contact us about our products and services."
    >
      <h2>Using this website</h2>
      <p>
        You may use this website to learn about our products and services and to contact us. Please do not misuse the website,
        submit false information or attempt to interfere with how it works.
      </p>

      <h2>Product information</h2>
      <p>
        We aim to keep product descriptions and images accurate. Photos are for illustration, and actual products may vary
        slightly. Details such as sizes, colours, compatibility and availability are confirmed with you before an order is
        finalised.
      </p>

      <h2>Prices and orders</h2>
      <ul>
        <li>Single-piece retail prices are shown on product pages where available. Delivery charges are shown separately; where delivery is not included, it is confirmed with you before your order is finalised.</li>
        <li>Wholesale and custom manufacturing prices are provided on request.</li>
        <li>Sending an inquiry or an “Order via WhatsApp” message is a request, not a confirmed order.</li>
        <li>An order is confirmed only when Tech Pouch has agreed the product, quantity, price and delivery details with you.</li>
        <li>Payment options — including whether Cash on Delivery is available — and delivery charges are confirmed for each order.</li>
        <li>Return, exchange and refund terms are confirmed with you when you place your order.</li>
      </ul>

      <h2>Wholesale quotes</h2>
      <p>
        Wholesale quotes depend on the products, quantities and delivery location requested and apply only to the details
        agreed in that quote.
      </p>

      <h2>Custom manufacturing requests</h2>
      <ul>
        <li>Submitting a custom manufacturing inquiry does not create an obligation for you or for Tech Pouch.</li>
        <li>We review each request individually and confirm feasibility, quantities, pricing and timing before any work begins.</li>
        <li>You confirm that you have the right to use any designs, logos, images or materials you send us.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The content of this website, including text, graphics and the Tech Pouch name and logo, may not be copied or reused
        without permission.
      </p>

      <h2>Third-party services</h2>
      <p>
        Links that open WhatsApp, email or other services take you outside this website, and those services are governed by
        their own terms.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We provide the website for general information. To the extent permitted by law, Tech Pouch is not responsible for losses
        arising from the use of the website itself. This does not affect your rights relating to products you purchase.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. The date at the top of this page shows when they were last changed.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${contact.email}`}>{contact.email}</a> or call{" "}
        <a href={contact.phoneHref}>{contact.phoneDisplay}</a>. See also our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
