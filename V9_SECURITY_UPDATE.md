# V9 — security update and deployment guide

**Date:** 27 October 2026

This is the user's V9 premium design/source with security-related dependency changes only. The full-width 70svh background-image banners, 10 single-accent themes, transparent styling, animated header, mobile side drawer, admin content system, MongoDB, AI blog and legal chatbot remain in the code.

## Changes included

| Dependency | Before | V9 security edition | Why |
| --- | --- | --- | --- |
| `next` | `^15.5.0` | `15.5.28` | Pin latest security-patched 15.x release as of 27 October 2026 |
| `quill` | `^2.0.3` | `2.0.2` | Avoid GHSA-v3m3-f69x-jf25 affecting exactly 2.0.3; downgrade workaround, *not* an official patched Quill release |
| `postcss` | `^8.4.49` | `8.5.31` | Security fixes after 8.5.22 |
| `overrides.postcss` | nested `next` only | `$postcss` globally | Make nested PostCSS use patched direct version |
| `overrides.postcss-selector-parser` | none | `6.1.5` | Backported security fix compatible with Tailwind CSS 3 |

The Quill editor now sanitizes incoming imported HTML and outgoing HTML, in addition to the public page's existing `sanitize-html` renderer. Other project features are unchanged intentionally.

## Correct install on Windows PowerShell

1. Back up the **current website** and MongoDB. Do not overwrite your `.env.local` or production database.
2. Extract the ZIP to a new folder (do **not** overlay an older `node_modules` folder).
3. Copy your existing `.env.local` *locally* into the new extracted folder. This file is intentionally excluded from downloads.
4. In **the new folder**, execute:

```powershell
node -v
npm -v
npm install
npm run verify:security
npm run verify:v9
npm audit
npm audit --omit=dev
npm run build
npm run dev
```

The `package-lock.json` was **deliberately removed** from the delivered ZIP because the V9 lock had `quill@2.0.3` and a vulnerable nested `next/node_modules/postcss@8.4.31`. `npm install` creates a new consistent `package-lock.json` and downloads patched packages. After confirming audit/build, commit the new lockfile and use `npm ci` for subsequent reproducible deployments.

Inspect `npm ls next postcss postcss-selector-parser quill tailwindcss braces` to verify actual resolved package versions. **Do not run `npm audit fix --force`**: it may migrate Tailwind 3 and Next 15 to incompatible major versions and damage the 10-theme UI.

## Verification and known limits

- Local static/source checks can show package pins, imports, routes, CMS datasets, CSS contracts and navigation inventory.
- `npm audit`, actual browser interaction, MongoDB/AI integrations and `npm run build` require network-connected package installation; they were **not successfully performed here**. The ZIP must not be represented as zero-vulnerability or production-certified.
- **Next.js 15 reached end-of-life for security support 21 October 2026.** This 15.5.28 pin is an immediate conservative patch, not an indefinite secure baseline. Schedule a separately tested upgrade to supported Next.js 16 (review async request APIs, build system and config).
- The `braces` advisory `GHSA-vfj7-8cjw-p6xm` was **withdrawn** on 23 October 2026 because it was judged not practically exploitable. Tailwind 3 can still depend on `braces@3.0.3`, but that withdrawn finding does not justify a rushed major migration. An older npm advisory feed may still show it.
- Quill downgrade to 2.0.2 avoids the published exact-2.0.3 advisory but needs manual rich text editor testing. The content HTML is sanitized; do not remove the sanitizer.

## References

- Next.js 15.5.28 security changelog: https://nextjs-changelog.vercel.app/
- Next.js 15 lifecycle: https://endoflife.date/nextjs
- Quill advisory: https://github.com/advisories/GHSA-v3m3-f69x-jf25
- PostCSS selector parser 6.1.5 security backport: https://github.com/postcss/postcss-selector-parser/releases/tag/6.1.5
- Withdrawn braces advisory: https://osv.dev/vulnerability/GHSA-vfj7-8cjw-p6xm
