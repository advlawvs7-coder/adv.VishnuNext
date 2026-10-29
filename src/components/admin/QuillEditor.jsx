"use client";
import "quill/dist/quill.snow.css";
import sanitizeHtml from "sanitize-html";

const safeEditorHtml = (html) => sanitizeHtml(String(html || ""), {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2", "h3", "h4", "img", "figure", "figcaption", "span"],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    span: ["class"],
    p: ["class"],
    li: ["class", "data-list"],
    ol: ["class"],
  },
  allowedSchemes: ["https", "http", "mailto"],
  allowedSchemesByTag: { img: ["https", "http"] },
});
import { useEffect, useRef, useState } from "react";
/** Rich text editor with sticky formatting toolbar. Existing Markdown converts on edit only. */
export default function QuillEditor({ value = "", onChange, id }) {
  const host = useRef(null),
    editor = useRef(null),
    callback = useRef(onChange),
    [failed, setFailed] = useState(false);
  callback.current = onChange;
  useEffect(() => {
    let alive = true,
      instance = null,
      handler = null;
    (async () => {
      try {
        const [{ default: Quill }, { marked }] = await Promise.all([
          import("quill"),
          import("marked"),
        ]);
        if (!alive || !host.current) return;
        instance = new Quill(host.current, {
          theme: "snow",
          placeholder:
            "Write headings, paragraphs, bullet lists, links and legal content…",
          modules: {
            toolbar: [
              [{ header: [2, 3, 4, false] }],
              ["bold", "italic", "underline", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["link", "image", "code-block"],
              ["clean"],
            ],
          },
        });
        const source = String(value || "");
        const html =
          /^\s*<(?:h[1-6]|p|div|ul|ol|blockquote|pre|figure|img|table|strong|em)\b/i.test(
            source,
          )
            ? source
            : await marked.parse(source);
        // Sanitize saved/AI HTML before placing it in the DOM-backed editor.
        instance.clipboard.dangerouslyPasteHTML(safeEditorHtml(html), "silent");
        handler = () => callback.current(safeEditorHtml(instance.root.innerHTML));
        instance.on("text-change", handler);
        editor.current = instance;
      } catch (e) {
        console.error("Quill failed to load", e);
        if (alive) setFailed(true);
      }
    })();
    return () => {
      alive = false;
      if (instance && handler) instance.off("text-change", handler);
      editor.current = null;
    };
    // Keyed mount per record prevents the editor from switching another draft's content.
  }, []);
  if (failed)
    return (
      <textarea
        aria-label="Content"
        id={id}
        className="field min-h-80"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  return (
    <div className="cms-quill">
      <div ref={host} id={id} aria-label="Rich text content editor" />
    </div>
  );
}
