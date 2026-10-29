# V9 — Premium Full-Bleed Banner Redesign

This version is built on the original uploaded V8 Next.js + Tailwind + MongoDB project. It retains the same content models, AI Blog Studio, legal chatbot, 10 single-accent themes and admin theme publishing.

## What has changed

- All pages using `PageBanner` (About, Practice Areas directory and details, Blog and articles, FAQ, Videos, Contact, Appointment, Profile, Team, Resources, policies and other utility pages) share one image-backed, edge-to-edge **70svh banner**. There is no more 50/50 image-and-text grid.
- The **homepage carousel** now uses its own full-width image background at **70svh**, with controls, CTA links, Who We Are and the three key practice highlights preserved in view on typical desktop screens.
- Original images are shown with `object-fit: cover` and **no tint, dark overlay or fade**. Only a local, translucent *content box behind words* ensures text is legible. This does not tint the photo outside the text box. Large mobile/very small screens can need extra vertical space for accessibility.
- A new vector **VS + balance-of-justice** logo is shared by the header, footer and mobile drawer, with an updated square favicon.
- Theme-accent hover backgrounds and directional motion on header links, Practice Areas mega-menu, outlined buttons and mobile side drawer.
- Utility top strip uses translucent near-black; main header is frosted white; footer keeps a transparent neutral background with theme-accent link hover and gradient rule.
- V8 10 color themes, settings persistence and admin panels remain intact.

## Run

```bash
npm install
npm run verify:v9
npm run build
npm run dev
```

Open `http://localhost:3000` and test these pages: `/`, `/about`, `/practice-areas`, any `/practice-areas/[slug]`, `/blog`, any `/blog/[slug]`, `/contact`, `/book-appointment`, `/faqs`, and `/theme-preview`.

The editable image URL from your MongoDB slide/page/service record remains the image source. For a sharp 70vh desktop banner, use a high-resolution photo (suggested >= 1920px wide) with the important subject toward the right/center so the small translucent text panel does not obscure it. PageBanner will fall back to the matching local topic illustration if the database record has no image.

**Design files:** `src/app/premium-v9.css`, `src/components/site/Elements.jsx`, `src/components/site/Hero.jsx`, `src/components/site/SiteHeader.jsx`, `src/components/site/SiteFooter.jsx`, and `src/components/site/BrandMark.jsx`.

**Existing secrets:** `.env.local` is deliberately excluded from this ZIP. Copy it from your local backup, not from a public download.

## Verification limitations

Source-level route, link, theme and syntax checks were executed. `npm ci` could not resolve registry.npmjs.org in this environment, so a real production Next.js build, mobile browser render and live MongoDB test must be run locally before deploying.
