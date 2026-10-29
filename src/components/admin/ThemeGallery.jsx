"use client";
import { useState, useEffect } from "react";
import { SITE_THEMES, themeId } from "@/lib/themes";
import ThemeMiniPreview from "@/components/site/ThemeMiniPreview";
import { previewTheme, clearThemePreview } from "@/components/site/ThemeSync";
import {
  Check,
  Eye,
  Save,
  RotateCcw,
  Palette,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";

export default function ThemeGallery({ embedded = false, onThemeChange }) {
  const [saved, setSaved] = useState("sky-blue");
  const [selected, setSelected] = useState("sky-blue");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    let active = true;
    fetch("/api/admin/settings", { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw Error("Please sign in to manage themes");
        return r.json();
      })
      .then((j) => {
        if (!active) return;
        const id = themeId(j.item?.themeId);
        setSaved(id);
        let preview = id;
        try {
          preview = themeId(
            window.sessionStorage.getItem("avs-preview-theme") || id,
          );
        } catch {}
        setSelected(preview);
        setLoading(false);
      })
      .catch((e) => {
        if (active) {
          setStatus(e.message);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);
  function select(id) {
    setSelected(id);
    previewTheme(id);
    setStatus(
      "Preview active on all pages in this browser session. Save to publish for everyone.",
    );
    onThemeChange?.(id);
  }
  async function save() {
    setSaving(true);
    setStatus("");
    try {
      const r = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeId: selected }),
      });
      const j = await r.json();
      if (!r.ok) throw Error(j.error || "Save failed");
      setSaved(themeId(j.item?.themeId));
      clearThemePreview(themeId(j.item?.themeId));
      setStatus(
        "Theme saved to MongoDB. Header, footer, every public page and admin now use this palette.",
      );
    } catch (err) {
      setStatus(err.message);
    } finally {
      setSaving(false);
    }
  }
  function reset() {
    setSelected(saved);
    clearThemePreview(saved);
    onThemeChange?.(saved);
    setStatus("Preview reverted to published theme.");
  }
  return (
    <section
      className="theme-gallery admin-card p-5 md:p-8"
      aria-label="Site-wide color themes"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="kicker mb-2 flex items-center gap-2">
            <Palette size={15} /> Global Design System
          </p>
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            10 minimal one-color themes
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--theme-muted)]">
            Choose one palette for the complete site: header, dropdowns, hero,
            sections, cards, buttons, blog pages, appointment forms, footer and
            admin. Clicking a theme gives a browser-local live preview; Save
            publishes it for all visitors.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            target="_blank"
            rel="noreferrer"
            href="/theme-preview"
            className="btn-soft text-xs"
          >
            Public full-page previews <ExternalLink size={14} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="/"
            className="btn-soft text-xs"
          >
            Open Homepage <ExternalLink size={14} />
          </a>
        </div>
      </div>
      {loading ? (
        <p className="text-sm">Loading saved theme…</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SITE_THEMES.map((theme) => (
              <button
                type="button"
                key={theme.id}
                aria-pressed={selected === theme.id}
                onClick={() => select(theme.id)}
                className={`theme-choice group relative overflow-hidden rounded-2xl border-2 bg-transparent p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${selected === theme.id ? "theme-choice-active shadow-lg" : ""}`}
                style={{
                  borderColor:
                    selected === theme.id
                      ? "var(--theme-primary)"
                      : "var(--theme-border)",
                }}
              >
                <ThemeMiniPreview theme={theme} />
                <span className="mt-3 flex items-center justify-between gap-2">
                  <span className="font-bold text-[var(--theme-ink)]">
                    {theme.name}
                  </span>
                  {selected === theme.id && (
                    <Check
                      size={16}
                      className="shrink-0 text-[var(--theme-primary)]"
                    />
                  )}
                </span>
                <span className="mt-1 block text-xs text-[var(--theme-muted)]">
                  {theme.caption}
                </span>
                {saved === theme.id && (
                  <span className="mt-2 inline-flex rounded-full bg-[var(--theme-tint)] px-2 py-1 text-[10px] font-semibold text-[var(--theme-primary)]">
                    Published theme
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[var(--theme-border)] pt-6">
            <button
              type="button"
              onClick={save}
              disabled={saving || selected === saved}
              className="btn-gold disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Saving…" : "Publish selected theme"}
            </button>
            <button type="button" onClick={reset} className="btn-soft">
              <RotateCcw size={16} /> Revert Preview
            </button>
            <span className="text-sm text-[var(--theme-muted)]">
              Current:{" "}
              <strong>
                {SITE_THEMES.find((t) => t.id === selected)?.name}
              </strong>
            </span>
          </div>
          {status && (
            <p
              role="status"
              aria-live="polite"
              className="mt-4 rounded-xl bg-[var(--theme-tint)] p-3 text-sm text-[var(--theme-ink)]"
            >
              {status}
            </p>
          )}
        </>
      )}
    </section>
  );
}
