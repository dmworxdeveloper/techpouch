import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ProductCategories } from "@/components/home/ProductCategories";
import { FeatureStrip } from "@/components/home/FeatureStrip";
import { Wholesale } from "@/components/home/Wholesale";
import { CustomManufacturing } from "@/components/home/CustomManufacturing";
import { WhyChoose } from "@/components/home/WhyChoose";
import { HowToOrder } from "@/components/home/HowToOrder";
import { ContactSection } from "@/components/home/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

/*
 * Organization data uses only verified details (name, URL, phone, email).
 * Add `address`, `logo` or `sameAs` here once they are confirmed.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      description: siteConfig.tagline,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phoneE164,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: siteConfig.contact.phoneE164,
        email: siteConfig.contact.email,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      publisher: { "@id": `${absoluteUrl("/")}#organization` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <Hero />
      <ProductCategories />
      <FeatureStrip />
      <Wholesale />
      <CustomManufacturing />
      <WhyChoose />
      <HowToOrder />
      <ContactSection />
    </>
  );
}
