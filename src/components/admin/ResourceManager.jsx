"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  Save,
  ExternalLink,
  UploadCloud,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { resourceConfigs } from "./adminConfig";
import QuillEditor from "./QuillEditor";
import ClientPager from "@/components/site/ClientPager";
function empty(config) {
  const values = {};
  for (const f of config.fields) {
    if (f.type === "boolean")
      values[f.key] = f.key === "published" || f.key === "enabled";
    else if (f.type === "number") values[f.key] = 0;
    else values[f.key] = "";
  }
  return values;
}
function previewLink(resource, record) {
  if (resource === "posts") return "/blog/" + record.slug;
  if (resource === "services") return "/practice-areas/" + record.slug;
  if (resource === "pages") return "/pages/" + record.slug;
  return null;
}
function FormField({ field, value, onChange }) {
  const [uploading, setUploading] = useState(false),
    [error, setError] = useState("");
  const common = {
    id: `cms-${field.key}`,
    className: "field",
    name: field.key,
    required: field.required || false,
  };
  const set = (v) => onChange(field.key, v);
  async function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const payload = new FormData();
      payload.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: payload,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      set(json.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }
  return (
    <div className={field.type === "markdown" ? "md:col-span-2" : ""}>
      <label htmlFor={`cms-${field.key}`} className="admin-label">
        {field.label}
        {field.required && " *"}
      </label>
      {field.type === "boolean" ? (
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-themeBorder px-4 py-3 text-sm">
          <input
            id={`cms-${field.key}`}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => set(e.target.checked)}
            className="h-4 w-4 accent-[#b99559]"
          />
          {value ? "Yes" : "No"}
        </label>
      ) : field.type === "select" ? (
        <select
          {...common}
          value={value ?? ""}
          onChange={(e) => set(e.target.value)}
        >
          {field.options.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
      ) : field.type === "markdown" ? (
        <QuillEditor
          id={`cms-${field.key}`}
          value={value ?? ""}
          onChange={set}
        />
      ) : field.type === "textarea" ? (
        <textarea
          {...common}
          rows={field.type === "markdown" ? 14 : 4}
          value={value ?? ""}
          onChange={(e) => set(e.target.value)}
          placeholder={
            field.type === "markdown"
              ? "## Heading\n\nWrite content with Markdown."
              : ""
          }
        />
      ) : (
        <input
          {...common}
          type={
            field.type === "number"
              ? "number"
              : field.type === "date"
                ? "date"
                : "text"
          }
          value={
            field.type === "date" && value
              ? String(value).slice(0, 10)
              : (value ?? "")
          }
          onChange={(e) =>
            set(
              field.type === "number" ? Number(e.target.value) : e.target.value,
            )
          }
        />
      )}
      {field.type === "image" && (
        <div className="mt-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-themeBorder px-3 py-2 text-xs font-semibold hover:bg-themeTint">
            <UploadCloud size={15} />
            {uploading ? "Uploading..." : "Upload Image (Cloudinary)"}
            <input
              accept="image/jpeg,image/png,image/webp"
              type="file"
              className="hidden"
              onChange={upload}
              disabled={uploading}
            />
          </label>
          {value && (
            <img
              src={value}
              alt="Image preview"
              className="mt-2 h-24 w-40 rounded border object-cover"
            />
          )}
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </div>
      )}
      {field.type === "markdown" && (
        <p className="mt-1.5 text-xs text-[var(--theme-muted)]">
          Quill editor: formatting toolbar stays visible while editing. Existing
          Markdown imports automatically; saved edits are clean HTML.
        </p>
      )}
      {field.help && (
        <p className="mt-1.5 text-xs leading-5 text-[var(--theme-muted)]">
          {field.help}
        </p>
      )}
    </div>
  );
}
export default function ResourceManager({ resource }) {
  const config = resourceConfigs[resource];
  const searchParams = useSearchParams();
  const [items, setItems] = useState([]),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [search, setSearch] = useState(""),
    [page, setPage] = useState(1),
    [editing, setEditing] = useState(null),
    [form, setForm] = useState(null),
    [error, setError] = useState(""),
    [success, setSuccess] = useState("");
  async function load() {
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/${resource}`, { cache: "no-store" });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setItems(data.items || []);
      const requestedEdit = searchParams.get("edit");
      const record = requestedEdit && (data.items || []).find(x => x._id === requestedEdit);
      if (record) {
        setEditing(record._id);
        setForm(Object.fromEntries(config.fields.map(f => [f.key, (resource === "posts" && f.key === "reviewStatus" && record.published ? "published" : record[f.key]) ?? (f.type === "boolean" ? false : f.type === "number" ? 0 : "")])));
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, [resource]);
  const filtered = useMemo(
    () =>
      items.filter((x) =>
        JSON.stringify([
          x.title,
          x.name,
          x.label,
          x.question,
          x.sectionKey,
          x.category,
          x.slug,
          x.eyebrow,
          x.quote,
        ])
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [items, search],
  );
  const pageSize = 15;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const visibleRows = filtered.slice(
    (current - 1) * pageSize,
    current * pageSize,
  );
  function edit(item) {
    setEditing(item ? item._id : "new");
    setForm(
      item
        ? Object.fromEntries(
            config.fields.map((f) => [
              f.key,
              (resource === "posts" && f.key === "reviewStatus" && item.published ? "published" : item[f.key]) ??
                (f.type === "boolean" ? false : f.type === "number" ? 0 : ""),
            ]),
          )
        : empty(config),
    );
    setError("");
    setSuccess("");
  }
  function cancel() {
    setEditing(null);
    setForm(null);
    setError("");
  }
  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const payload = editing === "new" ? form : { ...form, _id: editing };
      const r = await fetch(`/api/admin/${resource}`, {
        method: editing === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Save failed");
      setSuccess(`${config.singular} saved successfully.`);
      cancel();
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function remove(item) {
    if (
      !window.confirm(
        `Delete ${item.title || item.name || item.label || item.question || item.sectionKey || "this record"}? This cannot be undone.`,
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      const r = await fetch(`/api/admin/${resource}?id=${item._id}`, {
        method: "DELETE",
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      await load();
      setSuccess("Record deleted.");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  const label = (x) =>
    x.title ||
    x.name ||
    x.label ||
    x.question ||
    x.sectionKey ||
    x.quote?.slice(0, 60) ||
    "Untitled";
  if (!config) return <p>Invalid CMS resource.</p>;
  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker mb-2">Content Management</p>
          <h1 className="font-serif text-3xl font-bold">{config.title}</h1>
          <p className="mt-2 text-sm text-[var(--theme-muted)]">
            {config.description}
          </p>
        </div>
        <button onClick={() => edit(null)} className="btn-dark text-xs">
          <Plus size={16} /> Add {config.singular}
        </button>
      </div>
      {error && !editing && (
        <p className="mb-5 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {success && (
        <p className="mb-5 flex items-center gap-2 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle2 size={16} />
          {success}
        </p>
      )}
      {editing !== null && form && (
        <div className="admin-card mb-8 p-6 md:p-9">
          <div className="mb-7 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold">
              {editing === "new" ? "Add New" : "Edit"} {config.singular}
            </h2>
            <button
              aria-label="Close editor"
              onClick={cancel}
              className="rounded p-2 hover:bg-themeTint"
            >
              <X />
            </button>
          </div>
          <form onSubmit={save}>
            <div className="grid gap-5 md:grid-cols-2">
              {config.fields.map((field) => (
                <FormField
                  key={`${editing}-${field.key}`}
                  field={field}
                  value={form[field.key]}
                  onChange={(key, value) =>
                    setForm((prev) => ({ ...prev, [key]: value }))
                  }
                />
              ))}
            </div>
            {error && (
              <p
                role="alert"
                className="mt-5 flex items-center gap-2 text-sm text-red-600"
              >
                <AlertTriangle size={16} />
                {error}
              </p>
            )}
            <div className="mt-7 flex gap-3 border-t pt-6">
              <button disabled={busy} className="btn-gold disabled:opacity-50">
                <Save size={17} />
                {busy ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={cancel}
                className="rounded border px-6 py-3 text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="admin-card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-themeBorder p-5">
          <div className="relative flex-1 sm:max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-3.5 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="field pl-10"
              placeholder={`Search ${config.title.toLowerCase()}`}
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--theme-muted)]">
            <span>{filtered.length} records</span>
            <button
              onClick={load}
              aria-label="Refresh"
              className="rounded border p-2"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-themeTint text-xs uppercase tracking-wider text-[var(--theme-muted)]">
              <tr>
                <th className="px-5 py-4">Name / Title</th>
                <th className="px-5 py-4">Details</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-10 text-center text-[var(--theme-muted)]"
                  >
                    Loading records...
                  </td>
                </tr>
              ) : filtered.length ? (
                visibleRows.map((item) => (
                  <tr key={item._id} className="hover:bg-themeTint">
                    <td className="max-w-md px-5 py-4">
                      <div className="font-semibold text-ink">
                        {label(item)}
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.slug ||
                          item.sectionKey ||
                          item.category ||
                          item.eyebrow ||
                          item.parent ||
                          ""}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-xs text-[var(--theme-muted)]">
                      {item.category ||
                        item.designation ||
                        item.href ||
                        item.createdAt?.slice(0, 10) ||
                        "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${item.published === false || item.enabled === false ? "bg-themeTint text-[var(--theme-muted)]" : "bg-green-50 text-green-700"}`}
                      >
                        {item.published === false || item.enabled === false
                          ? "Draft / Hidden"
                          : "Visible"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          title="Edit"
                          onClick={() => edit(item)}
                          className="rounded border p-2 text-[var(--theme-muted)] hover:border-gold hover:text-gold"
                        >
                          <Pencil size={16} />
                        </button>
                        {previewLink(resource, item) && (
                          <a
                            href={previewLink(resource, item)}
                            target="_blank"
                            rel="noreferrer"
                            title="Preview"
                            className="rounded border p-2 text-[var(--theme-muted)] hover:text-gold"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                        <button
                          title="Delete"
                          disabled={busy}
                          onClick={() => remove(item)}
                          className="rounded border p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-10 text-center text-[var(--theme-muted)]"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ClientPager page={current} total={pages} onChange={setPage} />
      </div>
    </>
  );
}
