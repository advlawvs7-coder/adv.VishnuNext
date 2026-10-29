import fs from "node:fs";
const source = (p) => fs.readFileSync(p, "utf8");
const videos = JSON.parse(source("src/dummy-data/videos.json"));
const issues = [];
const assert = (condition, msg) => {
  if (!condition) issues.push(msg);
};
const blog = source("src/app/(site)/blog/[slug]/page.jsx");
const service = source("src/app/(site)/practice-areas/[slug]/page.jsx");
const faq = source("src/components/site/FaqExplorer.jsx");
const home = source("src/app/(site)/page.jsx");
const embed = source("src/app/(site)/videos/[slug]/page.jsx");
const seed = source("scripts/seed.mjs");
assert(
  blog.includes("lg:sticky lg:top-[105px]") &&
    blog.includes("InquiryForm compact"),
  "Blog detail is missing sticky booking form",
);
assert(
  service.includes("lg:sticky lg:top-[105px]"),
  "Service detail sidebar is not sticky",
);
assert(
  faq.includes("AnimatePresence") && faq.includes("Search"),
  "FAQ animation/search not found",
);
assert(home.match(/<section/g)?.length >= 14, "Homepage sections are missing");
assert(
  embed.includes("youtube-nocookie.com/embed"),
  "YouTube embed route missing",
);
assert(
  seed.includes('collection === "videos" && syncVideos') && seed.includes("youtubeUrl"),
  "Existing video seed refresh support missing",
);
const actual = videos.filter((v) => v.youtubeUrl);
assert(actual.length >= 2, "No real YouTube seed samples");
for (const video of actual) {
  assert(
    /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/.test(video.youtubeUrl),
    `Invalid YouTube URL: ${video.slug}`,
  );
  assert(
    Boolean(video.sourcePublisher),
    `Publisher not credited: ${video.slug}`,
  );
}
console.log(
  JSON.stringify(
    {
      status: issues.length ? "FAIL" : "PASS",
      homepageSections: (home.match(/<section/g) || []).length,
      publicVideoRecords: videos.length,
      youtubeExamples: actual.length,
      issues,
    },
    null,
    2,
  ),
);
if (issues.length) process.exit(1);
