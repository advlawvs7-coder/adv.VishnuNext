"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-72 animate-pulse rounded-xl bg-slate-100" />,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link"],
    ["clean"],
  ],
};

const formats = ["header", "bold", "italic", "underline", "strike", "color", "background", "list", "align", "blockquote", "code-block", "link"];

export default function RichTextEditor({ value, onChange }) {
  return <div className="blog-editor overflow-visible rounded-xl border border-slate-300 bg-white"><ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} formats={formats} placeholder="Write the complete article here…" /></div>;
}
