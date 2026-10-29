"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, WandSparkles, ShieldCheck, ImagePlus, FileEdit, Clock, CheckCircle, Rocket, RefreshCw, XCircle, Eye, AlertTriangle } from "lucide-react";
const statusColor = { draft: "bg-slate-100 text-slate-700", pending_review: "bg-amber-100 text-amber-800", approved: "bg-blue-100 text-blue-800", published: "bg-emerald-100 text-emerald-800" };
export default function AiBlogStudio() {
  const [topic, setTopic] = useState("");
  const [createImage, setCreateImage] = useState(false);
  const [records, setRecords] = useState([]);
  const [runs, setRuns] = useState([]);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [filter, setFilter] = useState("all");
  const load = async () => {
    try { const res = await fetch("/api/admin/ai-blog", { cache: "no-store" }); const data = await res.json(); if (!res.ok) throw new Error(data.error); setRecords(data.posts || []); setRuns(data.runs || []); }
    catch (e) { setError(e.message); }
  };
  useEffect(() => { load(); }, []);
  async function action(payload, key) {
    setError(""); setNotice(""); setBusy(key);
    try {
      const response = await fetch("/api/admin/ai-blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Action failed");
      setNotice(payload.action === "generate" ? `Draft created. ${data.imageError ? `Image skipped: ${data.imageError}` : "Review it before publishing."}` : "Changes saved successfully.");
      if (payload.action === "generate") setTopic("");
      await load();
    } catch(e) { setError(e.message); } finally { setBusy(""); }
  }
  const shown = records.filter(p => filter === "all" || (p.published ? "published" : (p.reviewStatus || "draft")) === filter);
  return <div className="space-y-8">
    <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[var(--theme-dark)] via-[var(--theme-primary)] to-[var(--theme-dark)] px-6 py-8 text-white shadow-2xl md:px-10 md:py-11">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/20" />
      <p className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.22em] text-white/80"><Sparkles size={15}/> AI CONTENT WORKSPACE</p>
      <h1 className="font-serif text-3xl font-bold md:text-5xl">Editorial Blog Studio</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85">Create legal education drafts with Gemini, optionally generate a cover image, edit in the existing rich-text editor, then approve and publish yourself. Daily drafts enter the same review queue.</p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold"><ShieldCheck size={15}/> Human approval required • No automatic publishing</div>
    </section>
    {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
    {notice && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</div>}
    <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <form onSubmit={e => { e.preventDefault(); action({ action: "generate", topic, createImage }, "generate"); }} className="admin-card space-y-5 p-6 md:p-8">
        <div className="flex items-center gap-3"><WandSparkles className="text-[var(--theme-primary)]"/><h2 className="font-serif text-2xl font-bold">Generate a new draft</h2></div>
        <label className="block text-sm font-bold">Article title or topic
          <textarea className="field mt-3 min-h-28 w-full" minLength={12} maxLength={200} required value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. How Delhi businesses can prepare evidence for unpaid invoice recovery" />
        </label>
        <label className="flex items-center gap-3 rounded-xl bg-[var(--theme-tint)] p-4 text-sm"><input type="checkbox" checked={createImage} onChange={e => setCreateImage(e.target.checked)}/> <ImagePlus size={18}/> Generate an optional AI cover image (requires Cloudinary)</label>
        <div className="flex flex-wrap gap-3"><button type="submit" disabled={!!busy || topic.trim().length < 12} className="btn-dark inline-flex items-center gap-2 disabled:opacity-60"><Sparkles size={16}/>{busy === "generate" ? "Generating…" : "Generate draft"}</button><Link className="btn-gold" href="/admin/posts">Write manually instead</Link></div>
        <p className="text-xs leading-6 text-[var(--theme-muted)]">AI content may contain mistakes. Verify current laws, legal authorities, deadlines and accuracy, and check originality before publication.</p>
      </form>
      <div className="admin-card space-y-5 p-6 md:p-8"><h2 className="font-serif text-2xl font-bold">Daily automation</h2><p className="text-sm leading-7 text-[var(--theme-muted)]">Vercel cron: every day at <strong>10:00 AM IST</strong> (04:30 UTC). A new unpublished draft is created only when your environment settings allow it.</p><div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-4 font-mono text-xs leading-7">AUTO_BLOG_ENABLED=true<br/>CRON_SECRET=…<br/>GEMINI_API_KEY=…<br/>AUTO_BLOG_IMAGE=false</div><div className="space-y-2 text-xs text-[var(--theme-muted)]"><p className="font-bold">Recent daily runs</p>{runs.length ? runs.slice(0,5).map(r => <p key={r._id}>{r.dateKey}: {r.status}</p>) : <p>No scheduled drafts yet.</p>}</div></div>
    </section>
    <section className="admin-card overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--theme-border)] p-6"><div><h2 className="font-serif text-2xl font-bold">Editorial review queue</h2><p className="mt-1 text-xs text-[var(--theme-muted)]">Edit → Approve → Publish</p></div><div className="flex flex-wrap items-center gap-2"><select aria-label="Filter status" value={filter} onChange={e => setFilter(e.target.value)} className="field text-sm">{["all","pending_review","draft","approved","published"].map(x => <option key={x} value={x}>{x.replaceAll("_"," ")}</option>)}</select><button onClick={load} className="rounded-xl border p-3" title="Refresh" aria-label="Refresh"><RefreshCw size={16}/></button></div></div>
      {shown.length ? <div className="divide-y divide-[var(--theme-border)]">{shown.map(p => { const status = p.published ? "published" : (p.reviewStatus || "draft"); return <article key={p._id} className="flex flex-col gap-4 p-5 transition hover:bg-[var(--theme-tint)] md:flex-row md:items-center md:justify-between"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${statusColor[status] || statusColor.draft}`}>{status.replaceAll("_", " ")}</span>{p.aiGenerated && <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold text-violet-700">AI assisted</span>}</div><h3 className="mt-2 font-semibold">{p.title}</h3><p className="mt-1 text-xs text-[var(--theme-muted)]">{p.aiImageError || (p.coverImage ? "Cover image attached" : "No cover image (optional)")}</p></div><div className="flex flex-wrap gap-2"><Link className="rounded-lg border border-[var(--theme-border)] bg-white px-3 py-2 text-xs font-bold hover:bg-[var(--theme-tint)]" href={`/admin/posts?edit=${p._id}`}><FileEdit size={14} className="mr-1 inline"/> Edit</Link>{p.published && <Link href={`/blog/${p.slug}`} target="_blank" className="rounded-lg border px-3 py-2 text-xs"><Eye size={14} className="mr-1 inline"/> View</Link>}{status === "pending_review" && <button disabled={!!busy} onClick={() => action({ action:"approve", id:p._id }, p._id)} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"><CheckCircle size={14} className="mr-1 inline"/> Approve</button>}{status === "approved" && <button disabled={!!busy} onClick={() => action({ action:"publish", id:p._id }, p._id)} className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"><Rocket size={14} className="mr-1 inline"/> Publish</button>}{status === "draft" && <button disabled={!!busy} onClick={() => action({ action:"request-review", id:p._id }, p._id)} className="rounded-lg border px-3 py-2 text-xs font-bold">Send to review</button>}{status !== "draft" && <button disabled={!!busy} onClick={() => action({ action:"draft", id:p._id }, p._id)} className="rounded-lg border px-3 py-2 text-xs font-bold"><XCircle size={13} className="mr-1 inline"/> Unpublish / Draft</button>}{!p.coverImage && <button disabled={!!busy} onClick={() => action({ action:"generate-image", id:p._id }, p._id)} className="rounded-lg border px-3 py-2 text-xs font-bold"><ImagePlus size={14} className="mr-1 inline"/> AI Cover</button>}</div></article>; })}</div> : <div className="p-10 text-center text-sm text-[var(--theme-muted)]">No posts match this filter.</div>}
    </section>
  </div>;
}
