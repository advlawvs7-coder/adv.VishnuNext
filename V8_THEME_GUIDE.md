# V8 — Transparent Single-Accent Website (Advocate Dr. Vishnu Sharma)

Built from the **user-uploaded advocateV7.zip**, preserving the integrated Next.js/MongoDB CMS, pages, Gemini blog workflow, legal chatbot, and existing content.

## Design changes

- 10 themes. **Signature Sky Blue (#279CFC)** is the default; other themes: Cobalt Blue, Petrol Teal, Emerald Green, Amethyst Purple, Wine Rose, Burnished Copper, Classic Indigo, Steel Blue, and Graphite.
- The site uses fixed neutral black/gray text and white page canvas. Cards, content sections, form backgrounds, header, dropdowns, footer, and admin surfaces have a transparent/neutral treatment. No multicolored gradients.
- Primary calls-to-action, selected navigation, pagination, and back-to-top controls use a gradient made from shades **of the selected accent only**.
- Homepage hero now uses an **unobscured image alongside text**; no dark mask, vignette, color filter, or photo shadow. Inner page banners use the same image-first approach. Desktop hero retains About, experience, and location within its first section. Some source illustrations are monochrome so they will not clash with any theme.
- Mobile header uses a **right-side animated navigation drawer** with scrollable Practice Areas, Escape-to-close, click-outside close, and body scroll lock. Desktop mega-menu remains.
- The 10-theme admin studio and public theme preview now display transparent mockups. Theme selection saves in `Settings.themeId` via the existing admin API.
- Responsive rules cover tablet and mobile. The existing scroll progress, back-to-top, FAQ, blog, form, AI blog studio, and chatbot continue to be part of the application.

## Installation (Windows PowerShell)

1. Extract the ZIP into a **new folder** and keep a backup of the previous project and MongoDB database.
2. Copy your existing `.env.local` **locally** into the new project. The downloadable ZIP intentionally does **not** include it. Alternatively run `Copy-Item .env.example .env.local`, then set the environment variables yourself.
3. In the new project folder:

```powershell
npm install
npm run verify:v8
npm run build
npm run dev
```

Open `http://localhost:3000` (website), `http://localhost:3000/theme-preview` (public preview) and `http://localhost:3000/admin/themes` (protected site-wide theme publisher).

For an **existing MongoDB** with an old selected palette, the frontend gracefully displays the new default Sky Blue when the old ID is not in the 10 presets. To store the new selection permanently, choose the theme in `/admin/themes` and **Publish selected theme**. This does not require resetting any blog/service records. Run `npm run seed` only if you intentionally want missing demo content inserted.

### Verification and limitations

`npm run verify:v8` tests source layout, theme consistency, static routes, links, existing demo data, and AI feature contracts. The source was also JSX-syntax-parsed and CSS parsed with no parser errors. Checks reported 198 public route destinations, 177 checked static internal links (0 missing), and 10 themes.

**Not claimed:** A live `next build`, successful MongoDB writes, browser visual review, or complete end-to-end click tests. npm dependencies could not be installed in this isolated environment. Please run `npm install`, `npm run build`, and test on a local browser and deployment preview before replacing your live website.

The clear-image approach intentionally prioritizes photography over colored overlays: image readability and cropping still depend on the actual images selected by the admin. The hero has a separate readable text column so photo darkness does not require overlays.

### Developer notes

- Theme metadata: `src/lib/themes.js`
- CSS token generator: `scripts/generate-themes.mjs` (`npm run themes:css`)
- Generated tokens: `src/app/themes.generated.css`
- Transparent global UI: `src/app/transparent-v8.css` (imported **last**)
- Side drawer: `src/components/site/SiteHeader.jsx`
- Home carousel: `src/components/site/Hero.jsx`
- Page banners: `src/components/site/Elements.jsx`
- Admin theme selection: `src/components/admin/ThemeGallery.jsx`
- Preview: `src/components/site/PublicThemePicker.jsx`
- Tests: `scripts/verify-transparent-v8.mjs`

For consistent appearance, add new color styles through CSS theme variables rather than hardcoding Tailwind accent hues. Remove the legacy custom RGB fills when redesigning further components; the V8 overlay currently normalizes these throughout the public site.
