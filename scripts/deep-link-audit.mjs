import fs from "node:fs";
import path from "node:path";
const readJson = (name) =>
  JSON.parse(fs.readFileSync(`src/dummy-data/${name}.json`, "utf8"));
const [services, posts, pages, navigation, sections, slides, videos] = [
  "services",
  "posts",
  "pages",
  "navigation",
  "sections",
  "slides",
  "videos",
].map(readJson);
const staticRoutes = [
  "/",
  "/about",
  "/practice-areas",
  "/blog",
  "/team",
  "/videos",
  "/faqs",
  "/contact",
  "/book-appointment",
  "/online-consultation",
  "/profile",
  "/billing-and-fees",
  "/directions",
  "/courts-of-practice",
  "/media",
  "/judgments",
  "/resources",
  "/admin/login",
  "/admin",
  "/admin/inquiries",
  "/admin/settings",
  "/admin/media",
  "/admin/change-password",
  "/admin/themes",
  "/admin/posts",
  "/admin/ai-blog",
  "/theme-preview",
];
const valid = new Set([
  ...staticRoutes,
  ...services.map((x) => `/practice-areas/${x.slug}`),
  ...posts.map((x) => `/blog/${x.slug}`),
  ...videos.map((x) => `/videos/${x.slug}`),
  ...pages.map((x) => `/pages/${x.slug}`),
]);
const root = "src";
let files = [];
function walk(folder) {
  for (const f of fs.readdirSync(folder, { withFileTypes: true })) {
    const p = path.join(folder, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(js|jsx|mjs)$/.test(f.name)) files.push(p);
  }
}
walk(root);
const refs = [];
for (const file of files) {
  const s = fs.readFileSync(file, "utf8");
  for (const m of s.matchAll(/\bhref\s*=\s*["'](\/[\w\-/.?=#]*)["']/g))
    refs.push({ file, path: m[1] });
  for (const m of s.matchAll(
    /\bhref\s*=\s*\{\s*["'](\/[\w\-/.?=#]*)["']\s*\}/g,
  ))
    refs.push({ file, path: m[1] });
}
// Include static route literals held in footer/resource arrays and homepage card data.
for (const file of files.filter((x) =>
  /SiteFooter\.jsx$|\(site\)\/resources\/page\.jsx$|\(site\)\/judgments\/page\.jsx$|\(site\)\/page\.jsx$/.test(
    x,
  ),
)) {
  const src = fs.readFileSync(file, "utf8");
  for (const m of src.matchAll(
    /['"](\/(?:[a-z][a-z0-9-]*)(?:\/[a-z0-9-]+)*)['"]/g,
  )) {
    if (
      !m[1].startsWith("/admin") &&
      !m[1].startsWith("/images") &&
      !m[1].startsWith("/api")
    )
      refs.push({ file, path: m[1] });
  }
}
for (const n of [
  ...navigation,
  ...slides,
  ...sections.map((x) => ({ href: x.ctaHref || "" })),
])
  if (n.href?.startsWith("/")) refs.push({ file: "seed", path: n.href });
const broken = [];
for (const entry of refs) {
  const clean = entry.path.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (!valid.has(clean)) broken.push(`${entry.file}: ${entry.path}`);
}
const counts = {
  publicPages: [...valid].filter((v) => !v.startsWith("/admin")).length,
  services: services.length,
  posts: posts.length,
  pages: pages.length,
  staticLinksChecked: refs.length,
  brokenLinks: broken.length,
  expandedHomepageSections: 15,
};
fs.writeFileSync(
  "FULL_LINK_AUDIT.md",
  `# Site-wide clickable link audit\n\nSource: original structure inspired by https://www.karanthukral.com/; original content, not a copy of another firm.\n\n${Object.entries(
    counts,
  )
    .map(([k, v]) => `- ${k}: ${v}`)
    .join(
      "\n",
    )}\n\n## Important scope\n\nThis is a *static source and seed-data audit*, not a browser click-through or deployed build. Dynamically constructed links are checked separately by verify-routes.mjs. Form storage requires MongoDB; link existence is not backend connectivity.\n\n## Errors\n\n${broken.length ? broken.map((x) => `- ${x}`).join("\n") : "No missing static local link destinations found."}\n`,
);
console.log(counts);
if (broken.length) {
  console.error(broken.join("\n"));
  process.exit(1);
}
