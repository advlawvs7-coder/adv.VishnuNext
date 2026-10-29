import { existsSync, writeFileSync } from "node:fs";
import { readFileSync } from "node:fs";
const readJson = (name) =>
  JSON.parse(readFileSync(`src/dummy-data/${name}.json`, "utf8"));
const [services, posts, faqs, navigation, pages, sections, slides, videos] = [
  "services",
  "posts",
  "faqs",
  "navigation",
  "pages",
  "sections",
  "slides",
  "videos",
].map(readJson);
import {
  menuGroups,
  generalPracticeNames,
  specificPracticeNames,
} from "../src/lib/catalogue.mjs";
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const filenames = [
  "src/app/(site)/page.jsx",
  "src/app/(site)/about/page.jsx",
  "src/app/(site)/practice-areas/page.jsx",
  "src/app/(site)/practice-areas/[slug]/page.jsx",
  "src/app/(site)/blog/page.jsx",
  "src/app/(site)/blog/[slug]/page.jsx",
  "src/app/(site)/videos/[slug]/page.jsx",
  ...[
    "contact",
    "videos",
    "team",
    "faqs",
    "book-appointment",
    "profile",
    "billing-and-fees",
    "online-consultation",
    "directions",
    "courts-of-practice",
    "media",
  ].map((v) => `src/app/(site)/${v}/page.jsx`),
  "src/app/(site)/resources/page.jsx",
  "src/app/(site)/judgments/page.jsx",
  "src/app/(site)/theme-preview/page.jsx",
  "src/app/(site)/pages/[slug]/page.jsx",
  "src/app/admin/login/page.jsx",
  "src/app/admin/(dashboard)/page.jsx",
];
const staticPaths = new Set([
  "/",
  ...filenames
    .filter((p) => /\/\(site\)\/.+\/page\.jsx$/.test(p) && !p.includes("["))
    .map((p) => p.slice("src/app/(site)".length).replace(/\/page.jsx$/, "")),
]);
const valid = new Set([
  ...staticPaths,
  ...services.map((s) => `/practice-areas/${s.slug}`),
  ...posts.map((p) => `/blog/${p.slug}`),
  ...videos.map((v) => `/videos/${v.slug}`),
  ...pages.map((p) => `/pages/${p.slug}`),
  "/admin",
  "/admin/login",
]);
const errors = [];
for (const f of filenames)
  if (!existsSync(f)) errors.push(`Missing route component: ${f}`);
const groups = [
  ...menuGroups.flatMap((g) =>
    g.links.map(([label, slug]) => ({
      label,
      route: `/practice-areas/${slug}`,
    })),
  ),
  ...generalPracticeNames.map((n) => ({
    label: n,
    route: `/practice-areas/${slug(n)}`,
  })),
  ...specificPracticeNames.map((n) => ({
    label: n,
    route: `/practice-areas/${slug(n)}`,
  })),
];
for (const { label, route } of groups)
  if (!valid.has(route))
    errors.push(`Missing catalogue destination: ${label} → ${route}`);
for (const n of navigation)
  if (n.href?.startsWith("/") && !valid.has(n.href))
    errors.push(`Missing navigation destination: ${n.label} → ${n.href}`);
const footer = navigation.filter((n) => n.parent === "Footer");
const audit = `# ROUTE & MENU COVERAGE AUDIT\n\n**Domain:** advocatevishnusharma.com\n\n**Reference:** https://www.karanthukral.com/ (navigation structure studied, not text or graphics copied)\n\n**Status:** ${errors.length ? "FAIL" : "PASS"} — ${errors.length} missing source routes or links\n\n- Desktop mega menu: ${menuGroups.length} columns, ${menuGroups.reduce((n, g) => n + g.links.length, 0)} entries\n- General legal service directory: ${generalPracticeNames.length} entries\n- Specific service directory: ${specificPracticeNames.length} entries\n- Total unique generated service detail routes: ${services.length}\n- Demo blog-detail routes: ${posts.length}\n- Demo video detail routes: ${videos.length}\n- FAQ records: ${faqs.length}\n- Homepage sections: ${sections.length}; hero slides: ${slides.length}\n- Explicit footer links: ${footer.length}\n- Total valid public routes represented in project: ${[...valid].filter((x) => !x.startsWith("/admin")).length}\n\n## Main header and utility pages\n\n${navigation
  .filter((n) => !n.parent || n.parent === "Footer")
  .map((n) => `- ${n.label}: \`${n.href}\``)
  .join(
    "\n",
  )}\n\n## Hover menu — every entry\n\n${menuGroups.map((g) => `### ${g.label}\n${g.links.map(([label, s]) => `- ${label}: \`/practice-areas/${s}\``).join("\n")}`).join("\n\n")}\n\n## Directory routes\n\n${groups.map((x) => `- ${x.label}: \`${x.route}\``).join("\n")}\n\n## Important implementation notes\n\nAll links above render their own Next.js dynamic detail page, but **page copy is independently written placeholder content**, not a verbatim reproduction of the other firm's copyrighted material. The brochure site works without MongoDB. Database-powered admin persistence and contact-form storage require MongoDB configuration and seeding. A runtime build and click-through browser test are still required before production.\n\n## Errors\n\n${errors.length ? errors.map((x) => `- ${x}`).join("\n") : "None in route/link inventory."}\n`;
writeFileSync("ROUTE_AUDIT.md", audit);
console.log({
  status: errors.length ? "FAIL" : "PASS",
  issues: errors.length,
  uniquePublicRoutes: [...valid].filter((x) => !x.startsWith("/admin")).length,
  services: services.length,
  posts: posts.length,
  faq: faqs.length,
  footer: footer.length,
});
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
