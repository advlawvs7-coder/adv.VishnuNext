"use client";
import { useEffect, useState } from "react";
import { Save, UploadCloud, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { SITE_THEMES } from "@/lib/themes";
import { previewTheme, clearThemePreview } from "@/components/site/ThemeSync";
const groups = [
  {
    title: "Brand & SEO",
    description: "Website identity and search previews",
    fields: [
      ["brandName", "Website Brand Name"],
      ["subBrand", "Subtitle Under Logo"],
      ["tagline", "Brand Tagline"],
      ["siteUrl", "Production URL"],
      ["siteTitle", "Browser Title"],
      ["siteDescription", "Main Description", "textarea"],
      ["headerCtaText", "Header Button Label"],
      ["headerCtaHref", "Header Button URL"],
      ["seoTitle", "Home SEO Title"],
      ["seoDescription", "Home SEO Description", "textarea"],
    ],
  },
  {
    title: "Contact Information",
    description: "Displayed in header, footer and contact page",
    fields: [
      ["phone", "Office Phone"],
      ["whatsapp", "WhatsApp (Digits Only)"],
      ["email", "Office Email"],
      ["address", "Office Address", "textarea"],
      ["locationText", "City / Location"],
      ["officeHours", "Consultation Hours"],
      ["googleMapsUrl", "Google Maps Embed / Location URL"],
    ],
  },
  {
    title: "About the Practice",
    description: "The main home-page introduction and About page",
    fields: [
      ["aboutEyebrow", "Section Eyebrow"],
      ["aboutTitle", "About Heading"],
      ["aboutContent", "About Description", "textarea"],
      ["aboutImage", "About Image", "image"],
      ["experienceLabel", "Experience Callout"],
    ],
  },
  {
    title: "Contact & Footer",
    description: "Consultation copy, footer and social links",
    fields: [
      ["consultationTitle", "Consultation Heading"],
      ["consultationText", "Consultation Description", "textarea"],
      ["footerBlurb", "Footer Summary", "textarea"],
      ["facebook", "Facebook URL"],
      ["instagram", "Instagram URL"],
      ["linkedin", "LinkedIn URL"],
      ["youtube", "YouTube URL"],
    ],
  },
  {
    title: "Disclaimer",
    description: "Shown to visitors and linked in the footer",
    fields: [["disclaimerText", "Disclaimer Body", "textarea"]],
  },
];
function Field({ name, label, type, value, onChange }) {
  const [uploading, setUploading] = useState(false),
    [error, setError] = useState("");
  async function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      onChange(name, j.url);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }
  return (
    <div className={type === "textarea" ? "md:col-span-2" : ""}>
      <label className="admin-label" htmlFor={`s-${name}`}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          className="field"
          id={`s-${name}`}
          rows={name === "disclaimerText" ? 6 : 4}
          value={value || ""}
          onChange={(e) => onChange(name, e.target.value)}
        />
      ) : (
        <input
          className="field"
          id={`s-${name}`}
          value={value || ""}
          onChange={(e) => onChange(name, e.target.value)}
        />
      )}
      {type === "image" && (
        <div className="mt-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded border px-3 py-2 text-xs">
            <UploadCloud size={15} />
            {uploading ? "Uploading…" : "Upload (Cloudinary)"}
            <input
              type="file"
              className="hidden"
              accept="image/png,image/jpeg,image/webp"
              onChange={upload}
            />
          </label>
          {value && (
            <img
              src={value}
              alt="About image preview"
              className="mt-3 h-24 w-40 object-cover"
            />
          )}
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}
export default function SettingsForm() {
  const [data, setData] = useState(null),
    [busy, setBusy] = useState(false),
    [status, setStatus] = useState(""),
    [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/admin/settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((v) => setData(v.item || {}))
      .catch((e) => setError(e.message));
  }, []);
  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    setError("");
    try {
      const r = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setData(j.item);
      clearThemePreview(j.item?.themeId || "sky-blue");
      setStatus("Site settings and global theme saved successfully.");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="mb-8">
        <p className="kicker mb-2">Global Content</p>
        <h1 className="font-serif text-3xl">Website Settings</h1>
        <p className="mt-2 text-sm text-[var(--theme-muted)]">
          Change details site-wide from one dashboard.
        </p>
      </div>
      {!data ? (
        <div className="admin-card p-8">Loading configuration...</div>
      ) : (
        <form onSubmit={save} className="space-y-7">
          <section className="admin-card p-6 md:p-8">
            <p className="kicker">Full Website Theme</p>
            <h2 className="mt-2 font-serif text-2xl font-bold">
              Global Color Combination
            </h2>
            <p className="mt-2 text-sm text-[var(--theme-muted)]">
              This choice changes every public page, header, footer and admin.
              Preview a theme then save settings.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <select
                className="field max-w-sm"
                value={data.themeId || "sky-blue"}
                onChange={(e) => {
                  setData((x) => ({ ...x, themeId: e.target.value }));
                  previewTheme(e.target.value);
                }}
              >
                {SITE_THEMES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <Link href="/admin/themes" className="btn-soft">
                Open 16-theme gallery
              </Link>
            </div>
          </section>
          {groups.map((group) => (
            <section key={group.title} className="admin-card p-6 md:p-8">
              <h2 className="font-serif text-2xl font-bold">{group.title}</h2>
              <p className="mb-6 mt-1 text-sm text-[var(--theme-muted)]">
                {group.description}
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                {group.fields.map(([name, label, type]) => (
                  <Field
                    key={name}
                    name={name}
                    label={label}
                    type={type}
                    value={data[name]}
                    onChange={(k, v) => setData((x) => ({ ...x, [k]: v }))}
                  />
                ))}
              </div>
            </section>
          ))}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {status && (
            <p className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle2 size={16} />
              {status}
            </p>
          )}
          <button disabled={busy} className="btn-gold disabled:opacity-50">
            <Save size={16} />
            {busy ? "Saving..." : "Save All Settings"}
          </button>
        </form>
      )}
    </>
  );
}
