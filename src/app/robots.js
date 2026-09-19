export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] },
    sitemap: "https://www.advocatevishnu.com/sitemap.xml",
  };
}
