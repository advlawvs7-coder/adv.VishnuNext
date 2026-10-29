import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { readFileSync } from "node:fs";
// One authoritative dummy-data folder: these same JSON files populate the public demo.
const readJson = (name) =>
  JSON.parse(
    readFileSync(
      new URL(`../src/dummy-data/${name}.json`, import.meta.url),
      "utf8",
    ),
  );
const [
  settings,
  slides,
  sections,
  services,
  posts,
  faqs,
  team,
  videos,
  navigation,
  pages,
  testimonials,
] = [
  "settings",
  "slides",
  "sections",
  "services",
  "posts",
  "faqs",
  "team",
  "videos",
  "navigation",
  "pages",
  "testimonials",
].map(readJson);
const file = readFileSync(".env.local", "utf8");
for (const line of file.split(/\r?\n/)) {
  const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (match && !process.env[match[1]])
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
}
const uri = process.env.MONGODB_URI,
  email = process.env.ADMIN_EMAIL,
  password = process.env.ADMIN_PASSWORD;
if (
  !uri ||
  !email ||
  !password ||
  password.length < 12 ||
  !process.env.AUTH_SECRET ||
  process.env.AUTH_SECRET.length < 32
) {
  console.error(
    "Fill MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD (12+ chars), AUTH_SECRET (32+ chars) in .env.local first.",
  );
  process.exit(1);
}
await mongoose.connect(uri);
const schemas = {
  settings: { key: { type: String, unique: true }, brandName: String },
  admins: {
    email: { type: String, unique: true },
    name: String,
    passwordHash: String,
    sessionVersion: Number,
    active: Boolean,
  },
  services: { slug: { type: String, unique: true } },
  posts: { slug: { type: String, unique: true } },
  sections: { sectionKey: { type: String, unique: true } },
  pages: { slug: { type: String, unique: true } },
  slides: { title: String },
  faqs: { question: String },
  team: { name: String },
  videos: { title: String },
  navigation: { label: String },
  testimonials: { quote: String },
};
async function upsert(collection, key, entries) {
  const name = collection.toUpperCase();
  const target =
    { team: "teams", navigation: "navigations" }[collection] || collection;
  const model =
    mongoose.models[name] ||
    mongoose.model(
      name,
      new mongoose.Schema(schemas[collection], {
        strict: false,
        timestamps: true,
      }),
      target,
    );
  let inserted = 0,
    refreshed = 0;
  const refresh = process.argv.includes("--refresh-demo-content");
  const syncVideos = process.argv.includes("--sync-video-metadata");
  const upgradeImages = process.argv.includes("--sync-legacy-images");
  for (const entry of entries) {
    const lookup =
      collection === "navigation"
        ? { label: entry.label, href: entry.href, parent: entry.parent || "" }
        : { [key]: entry[key] };
    const update = { $setOnInsert: entry };
    // Use explicit refresh only; otherwise preserve everything changed from /admin.
    if (refresh) {
      const fields =
        collection === "services"
          ? ["content", "summary", "seoTitle", "seoDescription"]
          : collection === "posts"
            ? ["content", "excerpt", "seoDescription"]
            : collection === "faqs"
              ? ["answer"]
              : collection === "videos"
                ? [
                    "youtubeUrl",
                    "thumbnail",
                    "slug",
                    "description",
                    "sourcePublisher",
                    "order",
                  ]
                : [];
      if (fields.length) {
        update.$set = Object.fromEntries(
          fields.map((k) => [k, entry[k]]).filter(([, v]) => v !== undefined),
        );
        for (const k of Object.keys(update.$set)) delete update.$setOnInsert[k];
        refreshed++;
      }
    }
    const r = await model.updateOne(lookup, update, { upsert: true });
    if (r.upsertedCount) inserted++;
    // Safe one-time upgrades: populate only missing video details, never replace real admin URLs.
    if (collection === "videos" && syncVideos && !r.upsertedCount) {
      const current = await model.findOne(lookup).lean();
      const patch = {};
      for (const field of [
        "youtubeUrl",
        "slug",
        "thumbnail",
        "sourcePublisher",
        "description",
        "relatedHref",
      ]) {
        if (!current?.[field] && entry[field]) patch[field] = entry[field];
      }
      if (Object.keys(patch).length)
        await model.updateOne(lookup, { $set: patch });
    }
    // Replace only the known previous-demo generic image, not a user-uploaded image.
    if (
      ["services", "posts"].includes(collection) &&
      upgradeImages &&
      !r.upsertedCount
    ) {
      const current = await model.findOne(lookup).lean();
      const k = collection === "services" ? "image" : "coverImage";
      if (
        /^https:\/\/images\.unsplash\.com\/photo-(1589829545856|1505664194779|1494412519320|1589391886645)/.test(
          current?.[k] || "",
        ) &&
        entry[k]?.startsWith("/images/topics/")
      ) {
        await model.updateOne(lookup, { $set: { [k]: entry[k] } });
      }
    }
  }
  console.log(
    `${collection}: ${inserted} newly inserted; ${refresh ? `${refreshed} demo copy updates requested` : "existing entries preserved"}`,
  );
}
await upsert("settings", "key", [settings]);
await upsert("slides", "title", slides);
await upsert("sections", "sectionKey", sections);
await upsert("services", "slug", services);
await upsert("posts", "slug", posts);
await upsert("faqs", "question", faqs);
await upsert("team", "name", team);
await upsert("videos", "title", videos);
await upsert("navigation", "label", navigation);
await upsert("pages", "slug", pages);
await upsert("testimonials", "quote", testimonials);
const Admin =
  mongoose.models.ADMINS ||
  mongoose.model(
    "ADMINS",
    new mongoose.Schema(schemas.admins, { timestamps: true }),
    "admins",
  );
await Admin.updateOne(
  { email: email.toLowerCase() },
  {
    $setOnInsert: {
      name: "Website Administrator",
      email: email.toLowerCase(),
      passwordHash: await bcrypt.hash(password, 12),
      sessionVersion: 0,
      active: true,
    },
  },
  { upsert: true },
);
console.log(
  `Admin available: ${email.toLowerCase()} — password preserved on re-seed`,
);
await mongoose.disconnect();
