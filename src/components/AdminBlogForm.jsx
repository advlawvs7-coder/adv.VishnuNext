"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog, updateBlog } from "@/actions/blogActions";
import { slugifyTitle } from "@/lib/slugify";
import RichTextEditor from "@/components/RichTextEditor";

export default function AdminBlogForm({ blog }) {
  const router = useRouter();
  const fileInput = useRef(null);
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [image, setImage] = useState(blog?.image || "");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const slug = useMemo(() => slugifyTitle(title), [title]);

  async function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessageType("");
    setMessage("Uploading featured image…");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/upload", { method: "POST", body });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.url) throw new Error(result.message || "Image upload failed.");
      setImage(result.url);
      setMessageType("success");
      setMessage("Featured image uploaded and ready to save.");
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Image upload failed.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (uploading) return;
    const textOnly = content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
    if (!textOnly) {
      setMessageType("error");
      setMessage("Please write the article content.");
      return;
    }
    setSaving(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const data = Object.fromEntries(form);
    data.title = title;
    data.slug = slug;
    data.content = content;
    data.image = image;
    data.published = form.get("published") === "on";
    const result = blog ? await updateBlog(blog._id, data) : await createBlog(data);
    setSaving(false);
    setMessageType(result.success ? "success" : "error");
    setMessage(result.message);
    if (result.success) {
      router.push("/admin/blogs");
      router.refresh();
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-bold text-slate-700">Title<input name="title" required value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-500" /></label>
        <label className="block text-sm font-bold text-slate-700">Automatic URL<div className="mt-2 min-h-12 break-all rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs font-normal text-slate-600">/blogs/{slug}</div><span className="mt-1 block text-xs font-normal text-slate-400">Title change karne par URL automatically update hoga.</span></label>
        <Field label="Category" name="category" value={blog?.category || "Legal Insights"} />
        <Field label="Author" name="author" value={blog?.author || "Advocate Dr. Vishnu Sharma"} />
        <Field label="Meta Title" name="metaTitle" value={blog?.metaTitle || ""} />
        <Field label="Meta Keywords (comma separated)" name="metaKeywords" value={blog?.metaKeywords?.join?.(", ") || blog?.metaKeywords || ""} />
      </div>
      <Field label="Short Description / Meta Description" name="description" value={blog?.description || ""} textarea />

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="block text-sm font-bold text-slate-700">Featured Image<input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={upload} className="mt-3 block w-full text-sm disabled:opacity-50" /></label>
        <p className="mt-2 text-xs text-slate-500">JPG, PNG or WebP • maximum 5 MB</p>
        <label className="mt-4 block text-xs font-bold text-slate-600">Or paste an HTTPS image URL<input type="url" value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://…" className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-amber-500" /></label>
        {image && <div className="mt-4 flex flex-wrap items-start gap-4"><img src={image} alt="Featured image preview" className="h-32 w-52 rounded-xl border border-slate-200 bg-white object-cover" /><button type="button" onClick={() => setImage("")} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700">Remove image</button></div>}
      </div>

      <label className="block text-sm font-bold text-slate-700">Article Content</label>
      <RichTextEditor value={content} onChange={setContent} />
      <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" name="published" defaultChecked={blog?.published ?? true} className="h-4 w-4" /> Publish this article</label>
      {message && <p role="status" className={`rounded-lg px-4 py-3 text-sm font-semibold ${messageType === "error" ? "bg-red-50 text-red-700" : messageType === "success" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>{message}</p>}
      <button disabled={saving || uploading} className="rounded-lg bg-slate-900 px-7 py-3 font-bold text-amber-400 shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Saving…" : uploading ? "Uploading image…" : blog ? "Update Blog" : "Publish Blog"}</button>
    </form>
  );
}

function Field({ label, name, value = "", textarea }) {
  const Component = textarea ? "textarea" : "input";
  return <label className="block text-sm font-bold text-slate-700">{label}<Component name={name} required={name === "description"} defaultValue={value} rows={textarea ? 4 : undefined} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none focus:border-amber-500" /></label>;
}
