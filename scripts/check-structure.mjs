import fs from "node:fs";
import path from "node:path";
const readJson = (name) =>
  JSON.parse(fs.readFileSync(`src/dummy-data/${name}.json`, "utf8"));
const [services, posts, slides, sections, settings] = [
  "services",
  "posts",
  "slides",
  "sections",
  "settings",
].map(readJson);
const required = [
  "package.json",
  "next.config.mjs",
  "tailwind.config.js",
  ".env.example",
  "src/app/(site)/page.jsx",
  "src/app/(site)/about/page.jsx",
  "src/app/(site)/practice-areas/[slug]/page.jsx",
  "src/app/(site)/blog/[slug]/page.jsx",
  "src/app/admin/(dashboard)/layout.jsx",
  "src/app/admin/(dashboard)/[resource]/page.jsx",
  "src/app/api/admin/[resource]/route.js",
  "src/app/api/auth/login/route.js",
  "src/app/api/inquiries/route.js",
  "src/app/api/admin/upload/route.js",
  "src/lib/db.js",
  "src/models/index.js",
  "scripts/seed.mjs",
];
const missing = required.filter((file) => !fs.existsSync(file));
const source = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (/\.(js|jsx|mjs)$/.test(entry.name)) source.push(file);
  }
}
walk("src");
const broken = [];
for (const file of source) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/from\s*['"](@\/[^'"]+)['"]/g)) {
    const base = path.resolve("src", match[1].slice(2));
    if (
      !["", ".js", ".jsx", ".mjs", "/index.js"].some((ext) =>
        fs.existsSync(base + ext),
      )
    )
      broken.push(`${file}: ${match[1]}`);
  }
}
const duplicates = [];
for (const [name, rows, key] of [
  ["services", services, "slug"],
  ["posts", posts, "slug"],
  ["slides", slides, "title"],
  ["sections", sections, "sectionKey"],
]) {
  const keys = rows.map((row) => row[key]);
  if (new Set(keys).size !== keys.length) duplicates.push(name);
}
if (!settings.siteUrl.includes("advocatevishnusharma.com"))
  duplicates.push("domain");
console.log("Project structure check");
console.log("JS/JSX source files:", source.length);
console.log("Demo records:", {
  services: services.length,
  posts: posts.length,
  slides: slides.length,
  sections: sections.length,
});
console.log(
  "Missing files:",
  missing.length,
  "Broken @ imports:",
  broken.length,
  "Duplicate seed keys:",
  duplicates.length,
);
for (const issue of [...missing, ...broken, ...duplicates])
  console.error("  •", issue);
if (missing.length + broken.length + duplicates.length) process.exit(1);
console.log("PASS — structure and seed-data integrity verified");
