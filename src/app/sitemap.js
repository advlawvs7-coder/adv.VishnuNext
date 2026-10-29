import { getSettings, data, Service, Post, Page, Video } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function sitemap() {
  const [s, services, posts, pages, videos] = await Promise.all([
    getSettings(),
    data(Service, { published: true }),
    data(Post, { published: true }),
    data(Page, { published: true }),
    data(Video, { published: true }),
  ]);
  const root = (
    s.siteUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://advocatevishnusharma.com"
  ).replace(/\/$/, "");
  const routes = [
    "",
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
  ];
  return [
    ...routes.map((x) => ({ url: root + x, lastModified: new Date() })),
    ...services.map((x) => ({
      url: root + "/practice-areas/" + x.slug,
      lastModified: new Date(x.updatedAt || Date.now()),
    })),
    ...posts.map((x) => ({
      url: root + "/blog/" + x.slug,
      lastModified: new Date(x.updatedAt || Date.now()),
    })),
    ...pages.map((x) => ({
      url: root + "/pages/" + x.slug,
      lastModified: new Date(x.updatedAt || Date.now()),
    })),
    ...videos.map((x) => ({
      url:
        root +
        "/videos/" +
        (x.slug ||
          x.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")),
      lastModified: new Date(x.updatedAt || Date.now()),
    })),
  ];
}
