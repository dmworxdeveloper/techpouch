# Tech Pouch website

Multi-page manufacturing and e-commerce inquiry website for **Tech Pouch** — tablet covers, mouse pads,
headphone leather repair accessories, wholesale supply and custom manufacturing.

Next.js 16 (App Router, Cache Components, TypeScript), Tailwind CSS v4, Lucide icons. No database, CMS or
payment provider; the catalog is typed data that can later be moved to a CMS.

```bash
npm install
npm run dev        # http://localhost:3000
npx tsc --noEmit   # type-check
npm run lint
npm run build && npm start
```

Copy `.env.example` to `.env.local` (or set the variables in your hosting dashboard). See
[Environment variables](#environment-variables).

## Routes

| Route | Page |
| --- | --- |
| `/` | Homepage |
| `/products` | All catalog categories and products |
| `/products/[category]` | Category page (zipper tablet covers, universal tablet covers, mouse pads, …) |
| `/products/[category]/[product]` | Product detail page |
| `/headphone-leather-repair` | Dedicated headphone leather repair accessories page |
| `/headphone-leather-repair/[product]` | Headphone accessory product page |
| `/wholesale` | Wholesale & bulk inquiries + quote form |
| `/custom-manufacturing` | Custom manufacturing process + project inquiry form |
| `/about`, `/contact`, `/faq` | About, contact form, searchable FAQ |
| `/privacy-policy`, `/terms` | Policy pages |
| `/api/inquiry` | Form submission endpoint (POST) |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated SEO files |

Redirects for moved URLs live in `next.config.ts` (`/products/headphone-leather-repair-accessories` →
`/headphone-leather-repair`). Add an entry there whenever a public URL changes.

## Project structure

```
src/lib/catalog/      categories.ts, products.ts (data), types.ts, index.ts (queries)
src/lib/faqs.ts       FAQ questions and answers (used by /faq, product and service pages)
src/lib/forms/        form field definitions + shared client/server validation
src/lib/server/       email delivery (Resend) and rate limiting — server only
src/lib/site.ts       business details, navigation, WhatsApp message builders
src/lib/seo.ts        per-page metadata helper (title, canonical, Open Graph, Twitter)
src/components/       layout (Header, Footer, FloatingWhatsApp, PageHeader, CtaBand, LegalPage),
                      products (cards, grid, gallery, OrderPanel, ProductDetail), forms (InquiryForm),
                      ui (Button, FaqAccordion, StatusMessage, …), home (homepage sections)
public/images/products/<category>/   product photos
public/images/cutouts/               transparent product cut-outs used in decorative compositions
public/brand/                        logo (dark + light versions) and monogram; favicon in src/app/icon.png
```

## Adding a product or category

**New product** — add an object to `src/lib/catalog/products.ts`:

```ts
{
  id: "laptop-sleeve-13",              // unique
  slug: "laptop-sleeve-13",            // URL segment
  categoryId: "zipper-tablet-covers",  // an id from categories.ts
  name: "13-inch Laptop Sleeve",
  status: "published",                 // "draft" hides it everywhere
  shortDescription: "…",
  description: ["Paragraph one…", "Paragraph two…"],
  images: [{ src: "/images/products/zipper-tablet-covers/laptop-sleeve-13.webp", alt: "…", width: 1200, height: 1200 }],
  sizes: ["13-inch"],                  // optional; shown as selectable options
  variants: [{ label: "Colour", options: ["Black", "Grey"] }], // optional, verified only
  features: ["…"],
  specifications: [{ label: "Material", value: "…" }],
  faqIds: ["single-piece", "wholesale"], // optional, ids from src/lib/faqs.ts
  seo: { title: "…", description: "…" },
}
```

Its product page, category listing, related products, search results, floating-WhatsApp message and
sitemap entry are generated automatically.

**New category** — add an object to `src/lib/catalog/categories.ts`. Use `placement: "catalog"` and
`href: "/products/<slug>"` for a normal category (it appears in the menu, homepage, product listing and
footer automatically). `placement: "dedicated"` is for categories with their own top-level page, like
headphone repair; those need a route folder like `src/app/headphone-leather-repair`.

Only add sizes, variants, specifications and compatibility details that Tech Pouch has confirmed.

## Replacing product images

1. Put the new photo in `public/images/products/<category>/` with a descriptive file name
   (WebP or JPEG, ideally square, at least 1000 px).
2. Update `src`, `alt` (describe what the photo shows), `width` and `height` in
   `products.ts` (and `categories.ts` for the category card image).

Frames use fixed aspect ratios with `object-contain`, so no layout changes are needed. The decorative
hero/about compositions use the transparent cut-outs referenced in `src/lib/images.ts`.

> **Before launch:** the current photos came from the supplied `tech-pouch.zip`. Several look like
> marketplace listing images and some are AI-generated. Replace them with Tech Pouch's own photography.

## Inquiry forms

Contact (`/contact` and homepage), wholesale (`/wholesale`) and custom manufacturing
(`/custom-manufacturing`) forms all post to `/api/inquiry`, which:

- validates every field on the server with the same rules as the browser (`src/lib/forms`);
- accepts up to 4 JPG/PNG/WebP reference images (4 MB total, file signatures checked) on the wholesale
  and custom forms and attaches them to the email;
- blocks spam with a hidden honeypot field, a minimum fill time and a per-IP rate limit
  (5 submissions / 10 minutes, in-memory per server instance);
- emails the inquiry to Tech Pouch through [Resend](https://resend.com) with the visitor's email as
  reply-to, and reports success **only** when Resend accepts the message.

If email is not configured or delivery fails, the form says the inquiry was **not** sent and offers
"Send via WhatsApp" / "Send by email" buttons pre-filled with the visitor's details.

**To activate email delivery:**

1. Create a Resend account and an API key.
2. Verify your sending domain in Resend (needed to deliver to techpouch123@gmail.com from your own address).
3. Set `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL` (e.g. `Tech Pouch <inquiries@your-domain.com>`) and,
   optionally, `INQUIRY_TO_EMAIL` on the server. Never prefix them with `NEXT_PUBLIC_`.
4. Submit a test inquiry on the live site.

For stricter rate limiting across serverless instances, back `src/lib/server/rate-limit.ts` with a shared
store such as Upstash Redis.

## Retail ordering

Product pages have an order panel: choose a verified option (e.g. size), set a quantity (default 1) and
press **Order via WhatsApp**. WhatsApp opens with the product name, option, quantity and product link and
asks Tech Pouch to confirm availability, total price, delivery charges and Cash on Delivery availability.
There are no public prices, carts or checkout. To add one later, add price fields to the `Product` type
and build cart/checkout routes on top of the same catalog.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes, for production | Live domain for canonical URLs, sitemap, Open Graph and product links in WhatsApp messages |
| `RESEND_API_KEY` | For form email | Resend API key (server only) |
| `INQUIRY_FROM_EMAIL` | For form email | Sender on a Resend-verified domain |
| `INQUIRY_TO_EMAIL` | No | Recipient(s), comma-separated; defaults to techpouch123@gmail.com |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console HTML-tag token |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 ID; update the privacy policy when enabling |

## SEO

- Unique title, description, canonical URL, Open Graph and Twitter card on every page (`pageMetadata`).
- One H1 per page, breadcrumbs with `BreadcrumbList` JSON-LD on inner pages, `Organization` + `WebSite`
  JSON-LD on the homepage, `FAQPage` JSON-LD on `/faq` (mirrors the visible questions).
- `Product` JSON-LD is intentionally omitted: Google requires a price, review or rating for Product
  markup, and none are published. Add it in `ProductDetail.tsx` once real prices exist.
- Sitemap is generated from the catalog. Unknown product URLs render the 404 page with `noindex`.
- After launch: verify the domain in Google Search Console and submit `/sitemap.xml`.

## Still to do

- Set the environment variables above and verify email delivery on the live domain.
- Replace product photos with Tech Pouch's own photography.
- Confirm headphone accessory parts and compatible models, then update the product data and remove the
  category `notice`.
- Have the privacy policy and terms reviewed, and add return/refund terms once confirmed.
- Add real social profile URLs in `socialLinks` (`src/lib/site.ts`) if wanted.
