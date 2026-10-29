import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import sanitizeHtml from "sanitize-html";
export default function RichContent({ content = "" }) {
  const source = String(content || "");
  const html =
    /^\s*<(?:h[1-6]|p|div|ul|ol|blockquote|pre|figure|img|table|strong|em)\b/i.test(
      source,
    );
  if (!html)
    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>;
  const safe = sanitizeHtml(source, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "h1",
      "h2",
      "figure",
      "figcaption",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      span: ["class"],
      p: ["class"],
      h2: ["class"],
      h3: ["class"],
      ol: ["class"],
      li: ["class", "data-list"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https"] },
    transformTags: {
      a: (tag, attrs) => ({
        tagName: "a",
        attribs: { ...attrs, rel: "noopener noreferrer" },
      }),
    },
  });
  return <div dangerouslySetInnerHTML={{ __html: safe }} />;
}
