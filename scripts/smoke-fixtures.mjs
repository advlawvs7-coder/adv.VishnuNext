/** No npm install, DB connection or browser needed. Validates offline-demo data and route coverage. */
import fs from "node:fs";
import path from "node:path";
import {
  menuGroups,
  generalPracticeNames,
  specificPracticeNames,
} from "../src/lib/catalogue.mjs";
const read = (name) =>
  JSON.parse(fs.readFileSync(`src/dummy-data/${name}.json`, "utf8"));
const names = [
  "settings",
  "services",
  "posts",
  "faqs",
  "videos",
  "slides",
  "sections",
  "pages",
  "navigation",
  "team",
  "testimonials",
  "about",
];
const records = Object.fromEntries(names.map((name) => [name, read(name)]));
const { services, posts, faqs, videos, pages, navigation, about } = records;
if (!Array.isArray(about.introduction) || about.introduction.length < 2)
  throw new Error("About Us JSON content is missing");
const slug = (x) =>
  String(x)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
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
  "/theme-preview",
];
const available = new Set([
  ...staticRoutes,
  ...services.map((x) => `/practice-areas/${x.slug}`),
  ...posts.map((x) => `/blog/${x.slug}`),
  ...videos.map((x) => `/videos/${x.slug || slug(x.title)}`),
  ...pages.map((x) => `/pages/${x.slug}`),
]);
const errors = [];
const assert = (ok, msg) => {
  if (!ok) errors.push(msg);
};
for (const name of names)
  assert(fs.existsSync(`src/dummy-data/${name}.json`), `missing JSON ${name}`);
for (const [name, rows, key] of [
  ["services", services, "slug"],
  ["posts", posts, "slug"],
  ["videos", videos, "slug"],
  ["pages", pages, "slug"],
  ["faqs", faqs, "question"],
]) {
  const values = rows.map((x) => x[key]);
  assert(values.every(Boolean), `${name}: missing ${key}`);
  assert(new Set(values).size === values.length, `${name}: duplicate ${key}`);
}
for (const service of services) {
  assert(
    (service.content || "").length > 1200,
    `service content short: ${service.slug}`,
  );
  assert(service.published === true, `unpublished service: ${service.slug}`);
  assert(
    available.has(`/practice-areas/${service.slug}`),
    `service route: ${service.slug}`,
  );
}
for (const post of posts) {
  assert(
    (post.content || "").length > 1100,
    `blog content short: ${post.slug}`,
  );
  assert(post.published === true, `unpublished blog: ${post.slug}`);
}
for (const video of videos) {
  assert(
    (video.content || "").length > 800,
    `video guide short: ${video.slug}`,
  );
  assert(video.published === true, `unpublished video: ${video.slug}`);
}
for (const faq of faqs)
  assert((faq.answer || "").length > 90, `FAQ answer short: ${faq.question}`);
for (const nav of navigation) {
  if (nav.href?.startsWith("/"))
    assert(
      available.has(nav.href),
      `navigation 404 ${nav.label} -> ${nav.href}`,
    );
}
for (const group of menuGroups)
  for (const [name, s] of group.links)
    assert(available.has(`/practice-areas/${s}`), `mega menu 404: ${name}`);
for (const name of [...generalPracticeNames, ...specificPracticeNames])
  assert(
    available.has(`/practice-areas/${slug(name)}`),
    `catalogue 404: ${name}`,
  );
for (const route of staticRoutes)
  assert(
    fs.existsSync(`src/app/(site)${route === "/" ? "" : route}/page.jsx`),
    `missing static page ${route}`,
  );
for (const [name, base] of [
  ["service", "practice-areas"],
  ["post", "blog"],
  ["video", "videos"],
  ["page", "pages"],
])
  assert(
    fs.existsSync(`src/app/(site)/${base}/[slug]/page.jsx`),
    `missing dynamic ${name} page`,
  );
const dynamicUrls =
  services.length + posts.length + pages.length + videos.length;
const summary = {
  status: errors.length ? "FAIL" : "PASS",
  routeUrls: available.size,
  dynamicUrls,
  services: services.length,
  blogArticles: posts.length,
  videoGuides: videos.length,
  faqs: faqs.length,
  slides: records.slides.length,
  homepageSections: records.sections.length,
  footerMenuLinks: navigation.filter((x) => x.parent === "Footer").length,
  megaMenuLinks: menuGroups.flatMap((g) => g.links).length,
  dummyDataFiles: names.length,
  failures: errors.length,
};
fs.writeFileSync(
  "DEMO_DATA_AUDIT.md",
  `# Offline-first Next.js demo data and route audit\n\n${Object.entries(
    summary,
  )
    .map(([k, v]) => `- **${k}:** ${v}`)
    .join(
      "\n",
    )}\n\nThe audit checks fixtures and source routes. It does not represent a running Next.js production build or a browser click-through test. All information is editable sample copy requiring factual, copyright and legal review.\n\n## Errors\n\n${errors.length ? errors.map((e) => `- ${e}`).join("\n") : "None found."}\n`,
);
console.log(JSON.stringify(summary, null, 2));
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
