# Tech Pouch website

Marketing and lead-generation site for **Tech Pouch** — tablet covers, mouse pads, selected headphone
leather repair accessories, wholesale supply and custom manufacturing.

Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4 and Lucide icons.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the live domain before
deploying. It drives canonical URLs, Open Graph URLs, `sitemap.xml`, `robots.txt` and structured data.
On Vercel the production domain is used automatically if the variable is not set; otherwise it falls
back to `http://localhost:3000`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage (hero, products, wholesale, custom manufacturing, why us, how to order, contact) |
| `/products` | Product overview |
| `/products/zipper-tablet-covers` | Product page |
| `/products/universal-tablet-covers` | Product page (7, 8 and 10-inch) |
| `/products/mouse-pads` | Product page |
| `/products/headphone-leather-repair-accessories` | Secondary category page |
| `/custom-manufacturing` | Custom manufacturing process and inquiry |
| `/about` | About Tech Pouch |
| `/contact` | Contact details and inquiry form |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated SEO files |

## Where to edit things

- **Business details, WhatsApp number, prefilled messages, navigation** — `src/lib/site.ts`
- **Products (names, descriptions, verified details, sizes, images, SEO text)** — `src/lib/products.ts`.
  Adding an entry there creates its product page, nav/footer links and sitemap entry.
- **Logo** — `src/components/layout/Logo.tsx` (text wordmark; swap for an `<Image>` when a logo file exists)
  and `src/app/icon.svg` (favicon).
- **Homepage sections** — `src/components/home/*`, assembled in `src/app/page.tsx`.
- **Colours and fonts** — theme tokens at the top of `src/app/globals.css`.

### Replacing product photos

Product images live in `public/images/products/` and are referenced only from `src/lib/products.ts`.
To replace one, add the new file (WebP or JPEG, ideally square and at least 1000px), then update
that product's `src`, `alt`, `width` and `height`. Images are shown with `object-contain` inside
fixed-ratio frames, so any size works without layout changes.

> **Before launch:** the current photos came from the supplied `tech-pouch.zip`. Several file names
> suggest they were taken from marketplace listings (e.g. Amazon/eBay-style names, a third-party brand
> name) and some are AI-generated. Replace them with Tech Pouch's own product photography so the site
> does not show other sellers' images as Tech Pouch products.

## Contact form

The inquiry form (`src/components/contact/ContactForm.tsx`) validates input in the browser and then
opens **WhatsApp** or the visitor's **email app** with the inquiry pre-filled. Nothing is stored or
sent by the website itself — the visitor presses send in WhatsApp/email, and the form says so.

To deliver submissions directly from the site instead, add a server-side handler, for example:

1. Create a Server Action or `src/app/api/contact/route.ts` that re-validates the fields.
2. Send the message with an email provider (Resend, Postmark, SendGrid, SMTP…) using an API key stored
   in a server-only environment variable (no `NEXT_PUBLIC_` prefix).
3. Add spam protection (honeypot field and/or Cloudflare Turnstile / reCAPTCHA) and rate limiting.
4. Show success/error states from the server response in the form.

## SEO notes

- Unique title, description and canonical URL per page; one H1 per page; Open Graph/Twitter metadata
  and a generated default social image.
- `Organization` + `WebSite` JSON-LD on the homepage using verified details only (name, URL, phone,
  email). Add `address`, `logo` or `sameAs` once confirmed.
- `BreadcrumbList` JSON-LD on all inner pages.
- `Product` JSON-LD is intentionally not added yet: no prices, availability or reviews are published.
  Add it to `src/app/products/[slug]/page.tsx` once accurate offer data exists — never with
  placeholder prices or ratings.

## Not implemented yet

- Online cart, checkout, payments, Cash on Delivery and order management. The site does not claim
  these exist; orders are arranged through WhatsApp, phone or email. The product catalog in
  `src/lib/products.ts` is the natural starting point for adding prices and a cart later.
- Server-side form delivery (see above).
- Privacy policy and terms pages (add them and link from the footer once the content is available).
