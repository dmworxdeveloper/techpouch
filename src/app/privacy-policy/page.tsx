import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/*
 * Plain-language privacy policy based on how this website currently works.
 * Have it reviewed by a legal professional before launch and update it whenever
 * analytics, payment or other services are added.
 */

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Tech Pouch collects, uses and protects the information you share through this website, WhatsApp and email.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const { contact } = siteConfig;
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated="19 October 2026"
      intro="This policy explains what information Tech Pouch collects when you use this website or contact us, and how we use it."
    >
      <h2>Information we collect</h2>
      <p>We collect information that you choose to share with us, including:</p>
      <ul>
        <li>Details you enter in our contact, wholesale and custom manufacturing forms — such as your name, email address, phone number, business name, location, product interests, quantities and message.</li>
        <li>Reference images you attach to an inquiry.</li>
        <li>Messages and information you send us by WhatsApp, email or phone.</li>
      </ul>
      <p>
        When you use the website, basic technical information such as your IP address and browser type may be processed by our
        hosting provider and used to keep the website secure and prevent spam.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your inquiries and provide product information and quotes.</li>
        <li>To discuss, confirm and fulfil orders, including delivery arrangements.</li>
        <li>To review custom manufacturing requests you send us.</li>
        <li>To protect the website from spam and misuse.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Services that process information for us</h2>
      <ul>
        <li>Form submissions are delivered to our inbox by an email delivery service.</li>
        <li>If you contact us on WhatsApp, your messages are also handled under WhatsApp&apos;s own privacy policy.</li>
        <li>Our website is run by a hosting provider that processes technical request data.</li>
        <li>When you place an order, we share the details needed for delivery with the delivery service used for that order.</li>
      </ul>

      <h2>Cookies and analytics</h2>
      <p>
        This website does not use advertising cookies. If we add analytics to understand how the website is used, we will update
        this policy to describe it.
      </p>

      <h2>How long we keep information</h2>
      <p>
        We keep inquiry and order information for as long as needed to respond to you, complete orders and keep reasonable
        business records, and then delete it.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us what information we hold about you, ask us to correct it, or ask us to delete it, by contacting us using
        the details below.
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The date at the top of this page shows when it was last changed.</p>

      <h2>Contact</h2>
      <p>
        For privacy questions, email <a href={`mailto:${contact.email}`}>{contact.email}</a> or call{" "}
        <a href={contact.phoneHref}>{contact.phoneDisplay}</a>. You can also read our <Link href="/terms">Terms &amp; Conditions</Link>.
      </p>
    </LegalPage>
  );
}
