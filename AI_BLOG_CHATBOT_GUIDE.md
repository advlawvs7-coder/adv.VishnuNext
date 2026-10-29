# Advocate Dr Vishnu Sharma — AI Blog Studio + Legal Chatbot (V7)

This is a change to the **existing single Next.js project**, not an extra API server. All admin pages, MongoDB models, legal website pages, practice areas, blog pages, themes, and existing seed records are retained.

## New features

### AI Blog Studio — `/admin/ai-blog`

1. Log in to `/admin/login` with the existing admin credentials.
2. Open **AI Blog Studio** from the sidebar.
3. Enter a 12–200 character legal article topic. Choose **Generate optional AI cover** if Cloudinary is configured.
4. Click **Generate draft**. Gemini creates an unpublished article, meta title, meta description and excerpt. Cover image generation is optional; if image generation or upload fails, **the text draft is still saved** and the error appears in the editorial queue.
5. Select **Edit** to open that exact article in `/admin/posts?edit=<id>` using the existing rich text editor. Adjust statutes, primary sources, wording, internal links, CTA and image. **Do not publish unchecked legal claims.**
6. Back in Blog Studio, **Approve** and then **Publish**. Only the publish action exposes the article at `/blog/<slug>` and sets the publication date.
7. **Unpublish / Draft** removes the article from public visibility. Existing articles remain available in the CMS.

The editorial statuses are: `draft` → `pending_review` → `approved` → `published`. Existing, already-published content remains public; older records with no status are supported. On the normal Blog CMS editor, the `published` checkbox and editorial status are validated together.

### Daily draft creation — Vercel Cron

`vercel.json` schedules `GET /api/cron/daily-blog` at **04:30 UTC daily = 10:00 AM IST**. Note that the Vercel Hobby plan may trigger at any point within the designated UTC hour. The cron route checks `Authorization: Bearer <CRON_SECRET>` and `AUTO_BLOG_ENABLED=true` before it does anything. **It never auto-publishes**.

A `GenerationRun` document stores each UTC `dateKey`, run status and resulting post id. A unique `dateKey` prevents normal duplicate daily generation. Failure is logged; retries require manual review instead of silent regeneration. Article topics rotate through a curated legal education list and avoid the most recent AI topics.

Vercel crons run for **production deployments**. They do *not* fire automatically from `npm run dev`. If the site is hosted elsewhere, configure an equivalent scheduler to call the protected endpoint; Next.js alone is not a background scheduling system.

### Chatbot

- A lightweight **Ask Legal Question** button appears on public pages; the heavier chat interface is dynamically loaded only on the visitor's first click.
- Suggested legal questions are displayed. Visitors can also type their own question in Hindi, Hinglish or English.
- Input is validated for length, basic relevance and abuse. A MongoDB-backed per-hour rate limit is used when MongoDB is configured (12 questions per hashed-IP key/hour).
- Responses use approved database FAQs and service titles as context. Gemini can generate the reply when an API key is set and MongoDB is connected. Without Gemini, a matching FAQ is returned when available; otherwise visitors are guided to a service page/contact.
- The assistant gives **general legal information**, not a guarantee or personalized legal advice. It displays a confidentiality warning and limits answer length.
- No case facts are deliberately persisted in MongoDB by this chatbot. Operational provider-side API policies still apply to Gemini requests.

### Navigation loading

The global page-click indicator starts immediately after an internal link click. A skeleton `loading.jsx` component appears while server-rendered content is loading. The indicator clears on pathname/query changes or after a safety timeout. Existing reading progress and Back to Top remain intact. This **improves feedback, not the actual network/database latency**.

## Environment variables

Copy `.env.example` into your own `.env.local` (never commit it):

```dotenv
MONGODB_URI=mongodb+srv://<your-atlas-uri>
AUTH_SECRET=<long-random-secret-at-least-32-characters>
GEMINI_API_KEY=<Google-AI-Studio-server-key>
GEMINI_TEXT_MODEL=gemini-2.5-flash
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image
AUTO_BLOG_ENABLED=false
AUTO_BLOG_IMAGE=false
CRON_SECRET=<separate-strong-random-secret-at-least-32-characters>
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Do not** prefix `GEMINI_API_KEY`, `CRON_SECRET`, `CLOUDINARY_API_SECRET`, or `AUTH_SECRET` with `NEXT_PUBLIC_`. Vercel/hosted environments must have these same keys set server-side. Set `AUTO_BLOG_ENABLED=true` only after the manual draft pipeline and admin review are tested. To enable automatic images on the daily cron, set `AUTO_BLOG_IMAGE=true` and configure Cloudinary.

API billing/quotas are governed by Google. Check Google AI Studio model availability and quotas for your account; image generation may be a paid operation. Cloudinary provides permanent hosted cover-image URLs. No attempt is made to store a large base64 image inside the MongoDB Post record.

## Installation and checks

```powershell
npm install
npm run seed
npm run verify:v7
npm run build
npm run dev
```

Then open:

- `http://localhost:3000/admin/ai-blog` — draft and approval workspace
- `http://localhost:3000/admin/posts` — edit the article content, cover and SEO
- `http://localhost:3000/blog` — only published posts
- `http://localhost:3000/` — public chatbot and new navigation progress UI

Manual cron check (PowerShell; *do this only on a private/local environment with a configured secret*):

```powershell
$headers = @{ Authorization = "Bearer $env:CRON_SECRET" }
Invoke-RestMethod -Uri "http://localhost:3000/api/cron/daily-blog" -Headers $headers
```

If `AUTO_BLOG_ENABLED=false`, the route returns `skipped`. Once enabled, a verified manual request triggers only a draft (and repeated requests on the same UTC date skip). **Never publish generated legal writing without checking it against current official legal texts and practice requirements.**

## Deployment safety checklist

- Do not deploy a previous `.env.local` file or expose `GEMINI_API_KEY` in browser code.
- Confirm cron without bearer secret gives HTTP 401. Confirm non-admin POST to `/api/admin/ai-blog` gives HTTP 401.
- Verify a generated blog draft is *not visible* on `/blog` and that publishing requires approval.
- Check generated images or use manually licensed originals; do not use fictional client photos as actual cases.
- Test mobile navbar, chatbot overlays, browser back and route skeletons; avoid private identifying details in chatbot messages.
- Monitor AI costs, daily failures and MongoDB connection pool. A high-traffic deployment may need an external API gateway/provider quota on top of the included MongoDB limit.
- Follow current Bar Council advertising/solicitation rules and obtain editorial/legal review before publishing.

## Testing limitation

Automated static source/route/theme checks can run without credentials. Actual Gemini calls, Cloudinary uploads, MongoDB operations and end-to-end Next.js production build require reachable services and configured keys. The packaged ZIP intentionally omits `.env.local`; no previous credentials are included. If that original ZIP has been shared with other parties, consider rotating its credentials.

## Official integration references

- Gemini API: https://ai.google.dev/api/generate-content
- Gemini image: https://ai.google.dev/gemini-api/docs/models/gemini-2.5-flash-image
- Vercel cron: https://vercel.com/docs/cron-jobs/quickstart
- Cron security: https://vercel.com/docs/cron-jobs/manage-cron-jobs
