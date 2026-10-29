"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  Filter,
  Scale,
  ChevronRight,
  LayoutGrid,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { ServiceCard } from "./Elements";
import ClientPager from "./ClientPager";
import {
  menuGroups,
  generalPracticeNames,
  specificPracticeNames,
} from "@/lib/catalogue.mjs";
const slug = (x) =>
  x
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export default function PracticeExplorer({ services = [] }) {
  const [q, setQ] = useState(""),
    [category, setCategory] = useState("All Services"),
    [page, setPage] = useState(1);
  const categories = useMemo(
    () => [
      "All Services",
      ...new Set(services.map((x) => x.category).filter(Boolean)),
    ],
    [services],
  );
  const list = useMemo(
    () =>
      services.filter(
        (s) =>
          (category === "All Services" || s.category === category) &&
          [s.title, s.summary, s.category, s.slug].some((v) =>
            String(v || "")
              .toLowerCase()
              .includes(q.toLowerCase()),
          ),
      ),
    [q, category, services],
  );
  function selectCategory(value) {
    setCategory(value);
    setPage(1);
  }
  const perPage = 12;
  const maxPage = Math.max(1, Math.ceil(list.length / perPage));
  const current = Math.min(page, maxPage);
  return (
    <div>
      <div className="rounded-3xl border border-[var(--theme-border)] bg-gradient-to-br from-[var(--theme-tint)] via-white to-[var(--theme-tint)] p-6 shadow-[0_20px_60px_rgba(8,71,82,.08)] md:p-9">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <span className="stylish-badge">
              <Filter size={15} /> Find a service
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-[var(--theme-ink)] md:text-4xl">
              Explore all {services.length} practice areas
            </h2>
            <p className="mt-3 text-sm text-[var(--theme-muted)]">
              Every result below opens a dedicated information page—not an empty
              placeholder.
            </p>
          </div>
          <span className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-[var(--theme-dark)] text-white md:flex">
            <Scale size={32} />
          </span>
        </div>
        <label className="relative mt-8 block">
          <Search
            className="pointer-events-none absolute left-5 top-[17px] text-[var(--theme-ink)]"
            size={21}
          />
          <input
            className="w-full rounded-2xl border border-[var(--theme-border)] bg-white py-4 pl-14 pr-5 text-sm text-[var(--theme-ink)] shadow-sm outline-none transition focus:border-[var(--theme-primary)] focus:ring-4 focus:ring-[#0da499]/10"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search: Divorce, NRI, Bail, Family, Property, Arbitration..."
            aria-label="Search practice areas"
          />
        </label>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => selectCategory(c)}
              className={`rounded-full border px-4 py-2.5 text-[11px] font-extrabold transition duration-200 hover:-translate-y-1 ${category === c ? "border-[var(--theme-primary)] bg-[var(--theme-dark)] text-white shadow-lg" : "border-[var(--theme-border)] bg-white text-[var(--theme-ink)] hover:border-[var(--theme-primary)] hover:bg-[var(--theme-tint)]"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="my-9 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[var(--theme-muted)]">
          <strong className="text-[var(--theme-ink)]">{list.length}</strong>{" "}
          matching services
        </p>
        {(q || category !== "All Services") && (
          <button
            onClick={() => {
              setQ("");
              selectCategory("All Services");
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--theme-ink)]"
          >
            <RotateCcw size={15} /> Clear filters
          </button>
        )}
      </div>
      <div
        id="listing-start"
        className="grid scroll-mt-32 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {list.slice((current - 1) * perPage, current * perPage).map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
      {!list.length && (
        <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-14 text-center text-[var(--theme-muted)]">
          No matching area. Try a different keyword or clear the filters.
        </div>
      )}
      <ClientPager page={current} total={maxPage} onChange={setPage} />
      <div className="mt-20 border-t border-[var(--theme-border)] pt-12">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker mb-3">REFERENCE MENU COVERAGE</p>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              All hover-menu services
            </h2>
          </div>
          <span className="rounded-full bg-[var(--theme-tint)] px-4 py-2 text-xs font-bold text-[var(--theme-ink)]">
            {menuGroups.reduce((n, g) => n + g.links.length, 0)} direct links
          </span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menuGroups.map((g, i) => (
            <div key={g.label} className="spectrum-card p-6">
              <h3 className="mb-5 border-b border-themeBorder pb-4 font-serif text-xl font-bold">
                {g.label}
              </h3>
              <div className="space-y-1">
                {g.links.map(([label, route]) => (
                  <Link
                    key={route}
                    href={`/practice-areas/${route}`}
                    className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 text-sm text-[var(--theme-muted)] transition hover:bg-[var(--theme-tint)] hover:text-[var(--theme-ink)]"
                  >
                    {label}
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 opacity-40 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20 grid gap-9 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-serif text-3xl font-bold">
            General Legal Services
          </h2>
          <p className="mb-6 text-sm leading-7 text-[var(--theme-muted)]">
            Browse the wider catalogue of commonly encountered matters.
          </p>
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-5 md:p-7">
            <div className="grid gap-x-6 sm:grid-cols-2">
              {generalPracticeNames.map((x) => (
                <Link
                  key={x}
                  href={`/practice-areas/${slug(x)}`}
                  className="group flex items-center justify-between gap-2 border-b border-[var(--theme-border)] py-3 text-[13px] font-medium text-[var(--theme-ink)] transition hover:translate-x-1 hover:text-[var(--theme-ink)]"
                >
                  {x}
                  <ChevronRight
                    size={13}
                    className="shrink-0 text-[var(--theme-ink)]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Specialist Legal Services
          </h2>
          <p className="mb-6 text-sm leading-7 text-[var(--theme-muted)]">
            Direct links to each additional legal subject and its own page.
          </p>
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-5 md:p-7">
            <div className="grid gap-x-6 sm:grid-cols-2">
              {specificPracticeNames.map((x) => (
                <Link
                  key={x}
                  href={`/practice-areas/${slug(x)}`}
                  className="group flex items-center justify-between gap-2 border-b border-[var(--theme-border)] py-3 text-[13px] font-medium text-[var(--theme-ink)] transition hover:translate-x-1 hover:text-[var(--theme-primary)]"
                >
                  {x}
                  <ChevronRight
                    size={13}
                    className="shrink-0 text-[var(--theme-primary)]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
