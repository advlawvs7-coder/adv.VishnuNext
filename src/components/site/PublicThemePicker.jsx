"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE_THEMES, themeId } from "@/lib/themes";
import ThemeMiniPreview from "@/components/site/ThemeMiniPreview";
import { previewTheme, clearThemePreview } from "./ThemeSync";
import { Check, ArrowUpRight, RotateCcw, Palette } from "lucide-react";

/** Public sandbox: try site-wide theme designs without MongoDB or an admin login. */
export default function PublicThemePicker({
  publishedTheme = "sky-blue",
}) {
  const [selected, setSelected] = useState(themeId(publishedTheme));
  useEffect(() => {
    setSelected(
      themeId(document.documentElement.dataset.theme || publishedTheme),
    );
  }, [publishedTheme]);
  function select(id) {
    previewTheme(id);
    setSelected(id);
  }
  function reset() {
    clearThemePreview(publishedTheme);
    setSelected(themeId(publishedTheme));
  }
  return (
    <div className="container-site py-14 md:py-20">
      <div className="mb-10 grid items-end gap-5 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="kicker">LIVE FULL-WEBSITE THEME PREVIEW</p>
          <h2 className="mt-3 font-serif text-3xl font-bold md:text-5xl">
            Choose one look for every page.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--theme-muted)]">
            Select a theme below, then open any Practice Area, Blog, FAQ,
            Contact or other page in this browser session. The header,
            dropdowns, cards, page titles, buttons, footer and admin style all
            follow the same palette. This public preview does not change the
            published theme.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn-soft">
            <RotateCcw size={16} /> Reset Preview
          </button>
          <Link href="/" className="btn-gold">
            Explore Homepage <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SITE_THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            aria-pressed={selected === theme.id}
            onClick={() => select(theme.id)}
            className="group overflow-hidden rounded-3xl border-2 bg-transparent p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            style={{
              borderColor:
                selected === theme.id
                  ? "var(--theme-primary)"
                  : "var(--theme-border)",
            }}
          >
            <ThemeMiniPreview theme={theme} />
            <span className="mt-3 flex items-center justify-between gap-2">
              <strong className="text-sm text-[var(--theme-ink)]">
                {theme.name}
              </strong>
              {selected === theme.id && (
                <Check size={17} className="text-[var(--theme-primary)]" />
              )}
            </span>
            <span className="mt-1 block text-xs leading-5 text-[var(--theme-muted)]">
              {theme.caption}
            </span>
            <span className="mt-3 flex h-2 gap-1">
              {[
                theme.primary,
                theme.primary,
                theme.primary,
                theme.primary,
                theme.surface,
              ].map((color, i) => (
                <span
                  key={i}
                  className="flex-1 rounded"
                  style={{ background: color }}
                />
              ))}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-12 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-6 md:p-8">
        <p className="flex items-center gap-2 font-semibold text-[var(--theme-ink)]">
          <Palette size={19} /> Current preview:{" "}
          {SITE_THEMES.find((t) => t.id === selected)?.name}
        </p>
        <p className="mt-2 text-sm leading-7 text-[var(--theme-muted)]">
          To publish this look to all visitors, sign in to the CMS and choose it
          from Admin → Website Themes → Publish. A visitor using this page
          cannot change your MongoDB theme setting.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/about" className="btn-dark">
            View About Page <ArrowUpRight size={16} />
          </Link>
          <Link href="/practice-areas" className="btn-soft">
            View Practice Areas <ArrowUpRight size={16} />
          </Link>
          <Link href="/contact" className="btn-soft">
            View Contact <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
