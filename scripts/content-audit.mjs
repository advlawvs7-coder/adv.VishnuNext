import fs from "node:fs";
const read = (name) =>
  JSON.parse(fs.readFileSync(`src/dummy-data/${name}.json`, "utf8"));
const [services, posts, pages, faqs, slides, videos, sections, navigation] = [
  "services",
  "posts",
  "pages",
  "faqs",
  "slides",
  "videos",
  "sections",
  "navigation",
].map(read);
const words = (text) =>
  String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
const stats = (a) => ({
  records: a.length,
  minWords: Math.min(...a.map((x) => words(x.content))),
  averageWords: Math.round(
    a.reduce((n, x) => n + words(x.content), 0) / a.length,
  ),
  maxWords: Math.max(...a.map((x) => words(x.content))),
});
const summary = {
  services: stats(services),
  blogs: stats(posts),
  utilityCmsPages: stats(pages),
  faqs: faqs.length,
  homepageConfigSections: sections.length,
  heroSlides: slides.length,
  videoSlots: videos.length,
  referenceMegaMenu: navigation.filter((x) => x.parent === "Practice Areas")
    .length,
};
const failures = [
  ...services
    .filter((x) => words(x.content) < 300)
    .map((x) => "Service: " + x.slug),
  ...posts.filter((x) => words(x.content) < 250).map((x) => "Blog: " + x.slug),
  ...pages.filter((x) => words(x.content) < 170).map((x) => "Page: " + x.slug),
];
fs.writeFileSync(
  "CONTENT_AUDIT.md",
  `# Content completeness audit\n\n${Object.entries(summary)
    .map(
      ([key, value]) =>
        `- **${key}**: ${typeof value === "object" ? JSON.stringify(value) : value}`,
    )
    .join(
      "\n",
    )}\n\nThis is source-level content auditing only. The material is original editable demonstration copy, not independently verified professional legal advice. An administrator must review each item for current law, correct branding, search intent, and professional standards before launch. Demo video slots do not claim an uploaded recording.\n\n**Pages below minimum editorial word length:** ${failures.length}\n\n${failures.join("\n") || "None."}\n`,
);
console.log(summary, "content failures", failures.length);
if (failures.length) {
  console.error(failures);
  process.exit(1);
}
