# V8: TRANSPARENT ONE-COLOR DESIGN — START HERE

See **[V8_THEME_GUIDE.md](V8_THEME_GUIDE.md)** for new theme setup, routes, and migration notes. The existing project README follows.

---

# V7 Update — AI Blog Studio, Legal Chatbot & Loading Feedback

**New full instructions:** [AI_BLOG_CHATBOT_GUIDE.md](AI_BLOG_CHATBOT_GUIDE.md).

- AI Blog Studio: `/admin/ai-blog`; draft → review → approve → publish; optional Gemini image + Cloudinary.
- Daily protected draft cron: `/api/cron/daily-blog` at 10:00 AM IST when `AUTO_BLOG_ENABLED=true` (Vercel production).
- Website legal-topic chatbot with suggested questions and database-approved FAQ context, click-to-load UI.
- Page transitions show an immediate progress bar and route loading skeletons.
- **No automated publication**; the original pages, admin, themes and seed data remain.
- The uploaded `.env.local` has been removed from this distribution. Recreate it from `.env.example`.

---

# NEW IN V6: GLOBAL PREMIUM THEMES

**16 coordinated color combinations across every page**, including header, mega menus, homepage slider, cards, FAQs, footer and admin. Try them without MongoDB at `/theme-preview`; sign in and publish at `/admin/themes`. For details, see [THEME_GUIDE.md](THEME_GUIDE.md).

---

# Advocate Dr. Vishnu Sharma — Premium V5 Update (October 2026)

**Domain:** `advocatevishnusharma.com`  
**Stack:** Next.js App Router / React 19 / Tailwind CSS / MongoDB + Mongoose / Framer Motion / Quill 2 rich editor.  
**Architecture:** public website, protected admin and internal API routes in one deployable Next.js project. MongoDB Atlas is a managed external database; there is no separately deployed Express API.

## Start / migrate

```bash
npm install
cp .env.example .env.local
# Set MONGODB_URI, AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD (do not keep examples)
npm run seed
npm run dev
```

Go to `http://localhost:3000` (website) or `http://localhost:3000/admin/login` (admin).

For an existing V4 MongoDB database, run `npm run seed` again to add new About sections and footer navigation records **without overwriting existing CMS edits**. Optional targeted migrations:

```bash
npm run seed:videos   # fill missing YouTube video metadata, do not replace existing URLs
npm run seed:images   # replace only the known older demo stock-image URLs with topic artwork
```

`npm run seed:refresh` exists from earlier versions but **overwrites selected demonstration copy**; use it only when you deliberately want to refresh demo copy and have a backup.

## What changed in V5

- Header: hover backgrounds for every desktop menu item, animated Practice Areas mega dropdown, mobile hamburger navigation.
- First-screen carousel: no enquiry form. A responsive Who We Are panel, experience/location cards and animated legal-services marquee appear within the hero. Hero images remain editable at Admin → Hero Sliders.
- Visible **1px scroll-progress line** at the top and a back-to-top button after scrolling.
- Homepage: additional topic-photo service gallery, animated image cards, current services/blogs/videos/FAQs from CMS, responsive visual treatment.
- Contact Us and Book Appointment: separate premium animated layouts with functional enquiry forms and data-driven practice-area selects.
- Practice Areas, Videos, FAQs and Admin resource tables: numbered pagination; Blog listing already has URL-based numbered pagination.
- About Us: introduction in Site Settings and four new `about-*` editable blocks in Admin → Homepage Sections, plus live services and FAQ sections.
- Blogs, service pages, video guides and CMS pages: rich text supports both existing Markdown and the new HTML saved by **Quill**; HTML rendered with `sanitize-html`.
- Quill format toolbar uses CSS `position: sticky; top: 80px` below the sticky admin header. It remains visible while the editor scrolls through long content.
- Dynamic footer grouped links: Admin → Navigation controls Footer / Practice Areas. New seed rows provide resources and policies.
- Topic-specific local artwork: `/public/images/topics/` includes family, property, criminal, NRI, immigration, wills, cyber, business, arbitration and civil illustrations. Service and blog image fields can be replaced in Admin.

## MongoDB content policy

Set `MONGODB_CONTENT_MODE=hybrid` while populating the CMS. MongoDB records **always win**, even if a field is intentionally empty or a record is unpublished. Bundled dummy fixtures supply only records not found in MongoDB. Edits that change a seed slug preserve a `seedIdentity` so the old fixture does not reappear. Admin deletions mark a document `deleted: true` so seed/demo content does not reappear.

After importing everything, change to `MONGODB_CONTENT_MODE=database` to show **only database records** (and no bundled fixtures). With `MONGODB_URI` unset, the public preview uses dummy fixtures; login and enquiry persistence require MongoDB.

### Edit content from the admin

- **Site Settings:** identity, phone, office address, About text, consultation copy and hero stats.
- **Slides:** headings, image, CTA and ordering.
- **Homepage Sections:** enable/disable, title, description, images, process lists, About sections.
- **Practice Areas / Blog / Custom Pages / Videos:** unique slugs, imagery, Quill body, SEO metadata, publish status.
- **Navigation:** menu, mega-menu categories, footer grouped links.
- **Media:** Cloudinary credentials are optional but needed to upload image files from admin; external or local image URLs are otherwise supported.

For custom footer entries use `parent=Footer`, `group=Important Links` (or `Legal Resources` / `Policies`). For the mega menu use `parent=Practice Areas` and the desired group name.

## Verification and limitations

The included source audits are available with `npm run verify:v5` and `node scripts/check-structure.mjs`. They check source structure, routes, links, content, video fixtures and visual component expectations. A syntax parser also checked the source. **The npm dependency installation timed out in the authoring environment, so an actual `next build`, rendered visual QA and browser click-through were not completed.** Run `npm install && npm run build` on your development machine or CI before deployment. Fix any runtime issues found there before going live.

Important: all demonstration legal information is illustrative. Verify all legal statements, professional facts, images, URLs, and regulatory compliance before public release. YouTube videos from external publishers must retain attribution.

---

## Animated V4 improvements (October 2026)

- **Article detail:** dedicated left article column + right booking sidebar that stays visible on desktop (`lg:sticky top-[105px]`), with the actual consultation form powered by `/api/inquiries` when MongoDB is configured. On narrow devices the form follows the article naturally.
- **FAQs:** Framer Motion opening/closing animations, search, category chips, and expand/collapse controls.
- **Practice areas:** 134 detailed routes plus a filterable index and mega menu; sticky related-service sidebar on desktop. Preview works without a database (`npm run dev` without `MONGODB_URI`).
- **YouTube demonstration seed:** two actual publicly identifiable videos published by the _Supreme Court of India_ with attribution and real YouTube IDs. Nine other video records are explicitly written demo explainers, **not imaginary hosted videos**. External videos are never attributed to Advocate Dr. Vishnu Sharma.
- **Video administration:** a new `Video Publisher / Channel` field, and YouTube URLs support standard watch, short, embed, live and `youtu.be` formats. Replace these seed examples with your own official videos from `/admin/videos`.

### If you already seeded a MongoDB database

Running `npm run seed` **inserts only missing records** and preserves anything you edited in `/admin`. This brings in the two new attributed video records. Existing video rows will not be overwritten.

To explicitly update seed-owned video links, thumbnails and text you can run:

```bash
npm run seed:refresh
```

**Caution:** `seed:refresh` also refreshes demonstration bodies for services, posts, and FAQs. Back up your database first if you have edited those records. The ordinary `npm run seed` is safer for existing admin content.

### UI and route checks

```bash
npm run check
npm run verify:routes
npm run verify:links
npm run verify:demo
npm run verify:ui
```

These checks verify source fixtures, route coverage and required component layouts; they do not replace a real `npm run build` and manual responsive-browser testing.

# Advocate Dr. Vishnu Sharma — Premium Animated Next.js Website

**Website:** `https://advocatevishnusharma.com`  
**Stack:** Next.js 15 App Router · React 19 · Tailwind CSS 3 · Framer Motion · MongoDB/Mongoose (optional for the public demo)  
**Brand:** Advocate Dr. Vishnu Sharma · New Delhi

A complete Next.js frontend with a large, original legal-service demonstration catalogue, hover mega-menu, clickable footer, responsive animated homepage, resource pages, service detail pages, searchable blog, video topic guides, searchable FAQs, and a built-in admin/backend for later MongoDB use. **Only one Next.js application is deployed; no separate backend API server is needed.** MongoDB Atlas is a separately hosted database service when persistence is enabled.

The layout and navigation coverage were studied from `https://www.karanthukral.com/`. This is **not** a verbatim copy of that firm's copyrighted text, photographs, achievements, identity or logo. Services and original demonstration articles require professional review before public launch.

## Preview immediately — no MongoDB, API keys or admin setup needed

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. This starts in offline-first sample-content mode when you have NOT set `MONGODB_URI`. Every public page reads from the dedicated `src/dummy-data/` JSON folder.

The contact form deliberately displays an error in this preview mode because messages cannot be safely stored without the database. For a usable contact form and editable admin dashboard, configure MongoDB (instructions below).

## What's new in this animated edition

- **Premium animated homepage:** gradient hero carousel, animated legal-topic marquee, scroll reveals, animated cards, multi-colored icon hover, shadow/scale effects, rich About preview, how we work, six practice-topic pathways, NRI section, courts/forums, professional profile, legal explainers, articles, FAQ and consultation.
- **Framer Motion:** `MotionSurface.jsx` animates service, blog and video cards as they enter the viewport and on hover; `MotionRoot.jsx` uses IntersectionObserver for light-weight section motion. Includes reduced-motion behavior.
- **Practice Areas:** searchable/filterable all-service directory with load-more, _all_ reference-menu groups plus general/specific links, dedicated `practice-areas/[slug]` pages with substantial content, related services, consultation and sidebar.
- **About Us:** detailed independently written biography/approach sections sourced from `src/dummy-data/about.json`, values, process, service focus, NRI information, professional profile, and questions.
- **Blog:** thirty searchable, paginated sample articles with content-rich dynamic detail pages.
- **Video Library:** eleven topic cards with animated design, search, and **individual `/videos/[slug]` pages**. Without a real YouTube URL, show a written demo guide instead of a broken player; add a real official video URL from `/admin/videos` when available.
- **FAQs:** fifty-six usable categorized answers and a live search/accordion UI.
- **Footer:** direct internal links to profile, services, policies, fees, courts, directions, blogs, videos, FAQs and other utility pages. Every audited internal link points to an included route.
- **Demo data with incomplete MongoDB:** public reads merge stored items over bundled JSON records. Old collections no longer automatically empty new menus, service pages, blogs, video library or FAQs. Use `MONGODB_CONTENT_MODE=database` later to disable fallback and make the DB fully authoritative.

## Data folder — all editable JSON fixtures

```text
src/dummy-data/
  index.js
  about.json          # About section copy, values, process, NRI text, FAQs
  services.json       # 134 practice-area pages (rich Markdown body)
  posts.json          # 30 blog articles (rich Markdown body)
  videos.json         # 9 topic cards + written guides + detail slugs
  faqs.json           # 56 answers and category labels
  slides.json         # 3 home hero slides
  sections.json       # 16 homepage section settings
  navigation.json     # main menu, hover entries and footer links
  pages.json          # privacy/disclaimer/other CMS text pages
  team.json           # professional profile sample
  testimonials.json   # non-public demonstration entry
  settings.json       # domain, office contact and SEO defaults
```

**To edit the preview**, change these JSON files and restart the dev server if necessary. `src/dummy-data/index.js` is the public data source. There is no fake remote API and nothing is fetched from another website at runtime. Seed script later reads the **same JSON files**.

### Preview page URLs

```text
/                         Animated premium homepage
/about                    Expanded About Us
/practice-areas            Search, filter, complete directory
/practice-areas/[slug]     134 individual legal service pages
/blog                     Filterable article listing
/blog/[slug]              30 individual Markdown articles
/videos                   Searchable video/topic library
/videos/[slug]            9 demo explainer details / future embeds
/faqs                     56 searchable FAQ answers
/profile                  Advocate profile
/team                     Team/profile listing
/courts-of-practice       Courts and forums
/contact                  Contact information and enquiry form
/book-appointment         Enquiry form
/online-consultation      Remote consultation details
/directions               Office directions
/billing-and-fees         Billing and fee information
/resources                Legal resources
/judgments                Judicial principles informational page
/media                    Media/publications placeholder
/pages/[slug]             CMS utility pages incl. disclaimer/privacy/terms
/admin/login              Admin sign-in (requires MongoDB)
/admin                    Protected content administration
```

## Enable MongoDB, admin CMS and working enquiry submission

Make a `.env.local` in the project root (do not commit it):

```dotenv
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/advocate_vishnu_sharma?retryWrites=true&w=majority
MONGODB_CONTENT_MODE=hybrid
AUTH_SECRET=REPLACE_WITH_48_CHARACTERS_OR_LONGER_RANDOM_SECRET
ADMIN_EMAIL=admin@advocatevishnusharma.com
ADMIN_PASSWORD=REPLACE_WITH_UNIQUE_STRONG_PASSWORD_AT_LEAST_12_CHARACTERS
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create an `AUTH_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Then run:

```bash
npm run seed
npm run dev
```

- **Admin login:** http://localhost:3000/admin/login
- **Public site:** http://localhost:3000

The admin dashboard (inside this same Next.js app) manages services, posts, video details and optional YouTube URLs, FAQs, homepage slides, sections, navigation, profile, pages, settings, images and enquiry submissions. Internal Next.js route handlers power CRUD; no separate Express or external API server. Images can be uploaded if Cloudinary credentials are supplied.

**Hybrid mode:** bundled dummy records fill gaps in incomplete MongoDB collections, while saved database changes override matching records. Old empty/very short content is replaced by complete preview copy for reading. Deleting a bundled item from the DB while hybrid is enabled allows its fixture to reappear; use `published:false`/`enabled:false` to hide it, or set `MONGODB_CONTENT_MODE=database` after your production database has all desired records. `npm run seed` inserts missing records, and retains administrator edits. `npm run seed:refresh` deliberately refreshes selected demo copy — back up first.

## Commands and tests

```bash
npm run verify:demo       # All JSON fixtures, 195 URLs, menu + footer + detail pages
npm run verify:routes     # Route directory coverage
npm run verify:links      # Static link source audit
npm run verify:content    # Minimum body/FAQ content checks
npm run check             # Project structure and internal imports
npm run build             # Run after installing dependencies
```

See `DEMO_DATA_AUDIT.md`, `ROUTE_AUDIT.md`, `FULL_LINK_AUDIT.md`, and `CONTENT_AUDIT.md`. The final demo-data check counts **195 public URLs**, **134 services**, **30 articles**, **9 video guides**, **56 FAQs**, **19 reference-style hover links**, and **11 footer menu links**. It reports zero missing known fixture routes.

**Test scope:** The source files and JSON fixtures have passed syntax/route/source-level checks. A full live `npm install` + `next build` and interactive browser test could NOT be run in this authoring environment because packages from the npm registry were inaccessible. Run the build and test UI interactions on your machine or CI before deployment. A source-route audit does not prove production uptime or visual behavior.

## Deployment

Deploy this single Next.js project to Vercel or another Node.js-compatible Next.js host and set the custom domain `advocatevishnusharma.com`. Add MongoDB Atlas credentials only when you want server-persisted admin edits and contact enquiries. Configure DNS as instructed by your hosting provider. Set `NEXT_PUBLIC_SITE_URL=https://advocatevishnusharma.com` and `settings.json` / admin global settings accordingly. Configure HTTPS, backups, security monitoring, rate limits and Cloudinary credentials if using image uploads.

## Legal, rights and editorial requirements

Before going public, verify contact details and professional credentials; replace generic photos and demo video cards with authorised media; review every law-specific page against current statutes and judgments; ensure compliance with applicable Indian advocate advertising/professional rules. This preview does not claim foreign offices, awards, guaranteed results, or fictitious client testimonials. No uploaded demo article is a case-specific legal opinion.

## V9 Security update (27 Oct 2026)

V9 retains the full-width photo banners, 10 themes, animations, admin and AI features.
The supplied `package.json` pins `next@15.5.28` (last available security-patched 15.x at this date), `quill@2.0.2` (not the affected 2.0.3), and PostCSS `8.5.31`. `overrides` forces patched PostCSS in nested dependencies and the Tailwind 3-compatible `postcss-selector-parser@6.1.5`. Quill editor import/export HTML is additionally sanitized. The original `package-lock.json` was removed because it referred to **old vulnerable resolved dependencies**. Run `npm install` to generate a fresh one, then commit the new lockfile to version control.

Run `npm run verify:v9`, `npm audit`, `npm audit --omit=dev`, and `npm run build` locally. A full install/audit/build was **not** run while packaging because this environment could not reach npmjs.org. DO NOT interpret static verification as evidence of zero vulnerabilities. If `npm audit` is nonzero, inspect its full output; do not blindly use `--force`.

Next.js 15 reached end of security support on 21 Oct 2026. Despite installing its last patched 15.5.28 build as an immediate mitigation, plan a separately tested migration to supported Next.js 16. Tailwind CSS 4 is likewise a separate migration; do not automatically accept a breaking `npm audit fix --force` upgrade. The `braces` advisory GHSA-vfj7-8cjw-p6xm was withdrawn by GitHub on 23 Oct 2026 as not practically exploitable.

Read `V9_SECURITY_UPDATE.md` before deploying.

