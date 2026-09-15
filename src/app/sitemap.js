import { getBlogs } from "@/actions/blogActions";
export default async function sitemap() {
  const base = "https://advocatevishnu.com";
  const fixed = [
    "",
    "/about",
    "/knowledge-hub",
    "/blogs",
    "/gallery",
    "/contact",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
  const { data = [] } = await getBlogs();
  return [
    ...fixed,
    ...data.map((blog) => ({
      url: `${base}/blogs/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || blog.createdAt),
    })),
  ];
}
