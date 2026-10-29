export function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .trim()
    .normalize("NFKC")
    .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
export function plain(value) {
  return JSON.parse(JSON.stringify(value));
}
export function ytId(url = "") {
  return (
    String(url).match(
      /(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|music\.youtube\.com\/(?:watch\?(?:[^#]*&)?v=|podcast\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    )?.[1] || ""
  );
}
export const asset = (url, fallback = "/images/legal-architecture.svg") =>
  url?.trim() || fallback;
export function safeHref(value = "") {
  const link = String(value).trim();
  if (link.startsWith("/") && !link.startsWith("//")) return link;
  if (/^https:\/\//i.test(link)) return link;
  if (/^mailto:[^\s]+$/i.test(link) || /^tel:\+?[\d\s()-]+$/.test(link))
    return link;
  return "#";
}
