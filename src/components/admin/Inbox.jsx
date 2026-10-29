"use client";
import { useEffect, useState } from "react";
import { RefreshCw, Mail, Phone, CalendarDays } from "lucide-react";
export default function Inbox() {
  const [items, setItems] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [selected, setSelected] = useState(null),
    [status, setStatus] = useState("all");
  async function load() {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/inquiries", { cache: "no-store" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setItems(j.items || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function update(item, change) {
    try {
      const r = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: item._id, status: change }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setSelected(j.item);
      await load();
    } catch (e) {
      setError(e.message);
    }
  }
  const filtered = items.filter((i) => status === "all" || i.status === status);
  return (
    <>
      <div className="mb-7">
        <p className="kicker mb-2">Lead Management</p>
        <h1 className="font-serif text-3xl">Consultation Enquiries</h1>
        <p className="mt-2 text-sm text-[var(--theme-muted)]">
          Every public form submission is saved here.
        </p>
      </div>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <section className="admin-card overflow-hidden">
          <div className="flex gap-3 border-b p-4">
            <select
              className="field flex-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
            <button onClick={load} className="rounded border p-3">
              <RefreshCw size={17} />
            </button>
          </div>
          <div className="max-h-[700px] divide-y overflow-auto">
            {loading ? (
              <p className="p-5 text-sm text-[var(--theme-muted)]">
                Loading...
              </p>
            ) : filtered.length ? (
              filtered.map((x) => (
                <button
                  key={x._id}
                  onClick={() => setSelected(x)}
                  className={`block w-full p-5 text-left hover:bg-sand ${selected?._id === x._id ? "bg-sand" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold">{x.name}</p>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${x.status === "new" ? "bg-amber-100 text-amber-700" : "bg-themeTint text-[var(--theme-muted)]"}`}
                    >
                      {x.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--theme-muted)]">
                    {x.service || x.subject || "Website enquiry"} •{" "}
                    {new Date(x.createdAt).toLocaleDateString("en-IN")}
                  </p>
                  <p className="mt-2 line-clamp-1 text-sm text-[var(--theme-muted)]">
                    {x.message}
                  </p>
                </button>
              ))
            ) : (
              <p className="p-5 text-sm text-[var(--theme-muted)]">
                No matching enquiries.
              </p>
            )}
          </div>
        </section>
        <section className="admin-card min-h-[420px] p-7">
          {selected ? (
            <>
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b pb-6">
                <div>
                  <p className="kicker mb-2">Enquiry Details</p>
                  <h2 className="font-serif text-2xl font-bold">
                    {selected.name}
                  </h2>
                </div>
                <select
                  className="field max-w-44"
                  value={selected.status}
                  onChange={(e) => update(selected, e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="mb-7 space-y-3 text-sm text-[var(--theme-muted)]">
                <p className="flex gap-3">
                  <Mail size={16} className="text-gold" />
                  <a
                    href={`mailto:${selected.email}`}
                    className="hover:underline"
                  >
                    {selected.email}
                  </a>
                </p>
                <p className="flex gap-3">
                  <Phone size={16} className="text-gold" />
                  <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                </p>
                <p className="flex gap-3">
                  <CalendarDays size={16} className="text-gold" />
                  {new Date(selected.createdAt).toLocaleString("en-IN")}
                </p>
                <p>Source: {selected.source}</p>
                <p>Legal matter: {selected.service || "Not selected"}</p>
                <p>Subject: {selected.subject || "—"}</p>
              </div>
              <h3 className="font-serif text-lg font-bold">Message</h3>
              <p className="mt-3 whitespace-pre-wrap rounded-lg bg-sand p-5 text-sm leading-7 text-slate-700">
                {selected.message}
              </p>
            </>
          ) : (
            <div className="grid h-full min-h-[300px] place-items-center text-center text-sm text-slate-400">
              Select an enquiry to view its details.
            </div>
          )}
        </section>
      </div>
    </>
  );
}
