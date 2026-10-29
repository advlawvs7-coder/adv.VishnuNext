"use client";
import { useState } from "react";
import { UploadCloud, Copy, Check } from "lucide-react";
export default function MediaUploader() {
  const [file, setFile] = useState(null),
    [url, setUrl] = useState(""),
    [error, setError] = useState(""),
    [uploading, setUploading] = useState(false),
    [copied, setCopied] = useState(false);
  async function upload() {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setUrl(j.url);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }
  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
  }
  return (
    <>
      <div className="mb-7">
        <p className="kicker mb-2">Media Library</p>
        <h1 className="font-serif text-3xl">Upload Images</h1>
        <p className="mt-2 text-sm text-[var(--theme-muted)]">
          Cloudinary uploads are optional. Use hosted image URLs in any content
          editor if not configured.
        </p>
      </div>
      <div className="admin-card max-w-3xl p-7">
        <label className="flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-dashed border-themeBorder p-12 text-center hover:border-gold">
          <UploadCloud className="text-gold" size={38} />
          <span className="font-semibold">
            Select JPG, PNG or WebP (up to 5 MB)
          </span>
          <span className="text-xs text-slate-400">
            Stored directly in Cloudinary, not in ephemeral server storage
          </span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              setFile(e.target.files?.[0]);
              setUrl("");
              setError("");
            }}
            className="hidden"
          />
        </label>
        {file && (
          <p className="mt-4 text-sm">
            Selected: <b>{file.name}</b>
          </p>
        )}
        <button
          className="btn-gold mt-5 disabled:opacity-50"
          disabled={!file || uploading}
          onClick={upload}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {url && (
          <div className="mt-7 rounded-lg bg-sand p-5">
            <img
              src={url}
              alt="Uploaded"
              className="mb-4 h-48 w-full object-contain"
            />
            <div className="flex items-center gap-2">
              <input className="field flex-1" readOnly value={url} />
              <button className="rounded border bg-white p-3" onClick={copy}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
            <p className="mt-3 text-xs text-[var(--theme-muted)]">
              Copy URL and paste it into any Image URL field of the admin CMS.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
