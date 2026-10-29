import "server-only";
import { connectDB } from "@/lib/db";
import {
  Settings,
  Service,
  Post,
  FAQ,
  Team,
  Video,
  Slide,
  Section,
  Navigation,
  Page,
  Testimonial,
  Inquiry,
} from "@/models";
import * as demo from "@/dummy-data/index";
import { plain } from "@/lib/utils";

const collectionFor = {
  Settings: "settings",
  Service: "services",
  Post: "posts",
  FAQ: "faqs",
  Team: "team",
  Video: "videos",
  Slide: "slides",
  Section: "sections",
  Navigation: "navigation",
  Page: "pages",
  Testimonial: "testimonials",
};
const identity = {
  settings: "key",
  services: "slug",
  posts: "slug",
  faqs: "question",
  team: "name",
  videos: "title",
  slides: "title",
  sections: "sectionKey",
  navigation: "href",
  pages: "slug",
  testimonials: "quote",
};
const keyFor = (row, name, index) =>
  row.seedIdentity ||
  (name === "navigation"
    ? `${row.parent || ""}|${row.href || ""}|${row.label || ""}`
    : String(row[identity[name]] || index));
export const demoMode = () => !process.env.MONGODB_URI;
const hybridMode = () => process.env.MONGODB_CONTENT_MODE !== "database";
function compare(a, b) {
  return typeof a === "number" && typeof b === "number"
    ? a - b
    : String(a ?? "").localeCompare(String(b ?? ""));
}
function matches(item, filter) {
  return Object.entries(filter).every(([key, v]) => {
    if (key === "$or") return v.some((condition) => matches(item, condition));
    if (v && typeof v === "object" && "$ne" in v) return item[key] !== v.$ne;
    if (v && typeof v === "object" && "$regex" in v)
      return new RegExp(v.$regex, v.$options || "").test(
        String(item[key] || ""),
      );
    return item[key] === v;
  });
}
function fixtureRows(model) {
  const name = collectionFor[model.modelName];
  const rows = name === "settings" ? [demo.settings] : demo[name] || [];
  return rows.map((item, i) => ({
    ...item,
    _id: item._id || `demo-${name}-${keyFor(item, name, i)}`,
  }));
}
function unify(model, real = []) {
  const name = collectionFor[model.modelName];
  if (!hybridMode()) return real.filter((r) => !r.deleted);
  // A MongoDB document is authoritative, including intentionally empty fields or unpublished status.
  // Only truly ABSENT records are supplied from bundled fixtures for local preview/partial seeding.
  const map = new Map(
    fixtureRows(model).map((item, i) => [keyFor(item, name, i), item]),
  );
  for (let i = 0; i < real.length; i++) {
    const record = real[i];
    const k = keyFor(record, name, i);
    if (record.deleted) map.delete(k);
    else map.set(k, record);
  }
  return [...map.values()];
}
function sorted(rows, sort, limit) {
  return rows
    .sort((a, b) => {
      for (const [key, direction] of Object.entries(sort || { order: 1 })) {
        const c = compare(a[key], b[key]);
        if (c) return c * (direction >= 0 ? 1 : -1);
      }
      return 0;
    })
    .slice(0, limit || 10000);
}
async function load(model) {
  if (demoMode()) return fixtureRows(model);
  try {
    await connectDB();
    const rows = plain(await model.find({}).limit(2000).lean());
    return unify(model, rows);
  } catch (error) {
    console.warn(
      `[CMS] MongoDB unavailable; showing bundled demo ${model.modelName}: ${error.message}`,
    );
    return fixtureRows(model);
  }
}
export async function data(model, filter = {}, opts = {}) {
  return sorted(
    (await load(model)).filter((row) => matches(row, filter)),
    opts.sort || { order: 1 },
    opts.limit,
  );
}
export async function one(model, filter = {}) {
  return (await data(model, filter, { limit: 1 }))[0] || null;
}
export async function getSettings() {
  return (await one(Settings, { key: "main" })) || demo.settings;
}
export async function getSiteShell() {
  const [settings, services, navigation] = await Promise.all([
    getSettings(),
    data(Service, { published: true }, { sort: { order: 1 } }),
    data(Navigation, { enabled: true }, { sort: { order: 1 } }),
  ]);
  return { settings, services, navigation };
}
export async function getHomepage() {
  const [slides, sections, services, posts, videos, faqs, team, testimonials] =
    await Promise.all([
      data(Slide, { enabled: true }, { sort: { order: 1 } }),
      data(Section, { enabled: true }, { sort: { order: 1 } }),
      data(
        Service,
        { published: true, featured: true },
        { sort: { order: 1 }, limit: 12 },
      ),
      data(Post, { published: true }, { sort: { publishedAt: -1 }, limit: 6 }),
      data(Video, { published: true }, { sort: { order: 1 }, limit: 6 }),
      data(FAQ, { published: true }, { sort: { order: 1 }, limit: 8 }),
      data(Team, { published: true }, { sort: { order: 1 }, limit: 4 }),
      data(Testimonial, { published: true }, { sort: { order: 1 }, limit: 3 }),
    ]);
  return {
    slides,
    sections,
    services,
    posts,
    videos,
    faqs,
    team,
    testimonials,
  };
}
export {
  Settings,
  Service,
  Post,
  FAQ,
  Team,
  Video,
  Slide,
  Section,
  Navigation,
  Page,
  Testimonial,
  Inquiry,
};
