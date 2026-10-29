"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  HelpCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import ClientPager from "./ClientPager";
export default function FaqExplorer({ items = [] }) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("All FAQs"),
    [expandAll, setExpandAll] = useState(false),
    [open, setOpen] = useState({}),
    [page, setPage] = useState(1);
  const reduced = useReducedMotion();
  const categories = useMemo(
    () => ["All FAQs", ...new Set(items.map((x) => x.category || "General"))],
    [items],
  );
  const visible = useMemo(
    () =>
      items.filter(
        (x) =>
          (category === "All FAQs" || (x.category || "General") === category) &&
          `${x.question} ${x.answer}`
            .toLowerCase()
            .includes(query.toLowerCase().trim()),
      ),
    [query, category, items],
  );
  const maxPage = Math.max(1, Math.ceil(visible.length / 12)),
    current = Math.min(page, maxPage),
    slice = visible.slice((current - 1) * 12, current * 12);
  const grouped = categories
    .filter((x) => x !== "All FAQs")
    .map((x) => ({
      category: x,
      items: slice.filter((item) => (item.category || "General") === x),
    }))
    .filter((x) => x.items.length);
  const toggle = (key) => {
    setExpandAll(false);
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const isOpen = (key) => expandAll || Boolean(open[key]);
  return (
    <div className="faq-premium">
      <div className="relative mb-10 overflow-hidden rounded-[28px] border border-[var(--theme-border)] bg-gradient-to-br from-[var(--theme-tint)] via-white to-[var(--theme-tint)] p-7 shadow-[0_24px_65px_rgba(0,70,73,.08)] md:p-10">
        <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full border-[28px] border-[var(--theme-border)]" />
        <div className="relative mb-7 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="stylish-badge">
              <HelpCircle size={15} /> Knowledge Centre
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-[var(--theme-ink)]">
              Find an answer faster.
            </h2>
            <p className="mt-2 text-sm text-[var(--theme-muted)]">
              Explore {items.length} general legal questions organised by matter
              type.
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--theme-dark)] px-6 py-4 text-white">
            <strong className="block font-serif text-3xl">
              {visible.length}
            </strong>
            <span className="text-xs text-white/75">Matching answers</span>
          </div>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <label className="relative min-w-[230px] flex-1">
            <Search
              className="absolute left-4 top-3.5 text-[var(--theme-ink)]"
              size={20}
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              type="search"
              placeholder="Search divorce, property, bail, NRI, documents..."
              className="field h-12 rounded-xl pl-12"
              aria-label="Search FAQ questions"
            />
          </label>
          <button
            type="button"
            className="btn-dark"
            onClick={() => setExpandAll(!expandAll)}
          >
            {expandAll ? <ChevronsUp size={17} /> : <ChevronsDown size={17} />}{" "}
            {expandAll ? "Collapse" : "Expand"} Answers
          </button>
        </div>
        <div
          className="relative mt-6 flex flex-wrap gap-2"
          role="group"
          aria-label="FAQ categories"
        >
          {categories.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => {
                setCategory(c);
                setPage(1);
                setExpandAll(false);
              }}
              className={`rounded-xl border px-4 py-2.5 text-[11px] font-extrabold transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${category === c ? "border-[var(--theme-primary)] bg-[var(--theme-dark)] text-white shadow-md" : "border-[var(--theme-border)] bg-white text-[var(--theme-ink)] hover:border-[var(--theme-primary)] hover:bg-[var(--theme-tint)]"}`}
            >
              {c}{" "}
              <span className="ml-1 opacity-60">
                {c === "All FAQs"
                  ? items.length
                  : items.filter((i) => (i.category || "General") === c).length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div id="listing-start" className="scroll-mt-32" />
      {grouped.map((group) => (
        <section className="mb-12" key={group.category}>
          <div className="mb-6 flex items-center justify-between border-b border-[var(--theme-border)] pb-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--theme-tint)] text-[var(--theme-ink)]">
                <MessageCircle size={20} />
              </span>
              <h2 className="font-serif text-2xl font-bold text-[var(--theme-ink)]">
                {group.category}
              </h2>
            </div>
            <span className="text-xs font-bold text-[var(--theme-ink)]">
              {group.items.length} answers
            </span>
          </div>
          <div className="grid gap-3">
            {group.items.map((f, i) => {
              const key = f._id || f.question,
                active = isOpen(key);
              return (
                <div
                  key={key}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${active ? "border-[var(--theme-primary)] shadow-[0_16px_35px_rgba(9,126,110,.13)]" : "border-[var(--theme-border)] shadow-sm hover:-translate-y-0.5 hover:border-[var(--theme-primary)] hover:shadow-lg"}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-expanded={active}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left md:p-6"
                  >
                    <span className="flex items-start gap-4">
                      <span className="mt-1 text-xs font-bold text-[var(--theme-ink)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-serif text-lg font-bold leading-7 ${active ? "text-[var(--theme-ink)]" : "text-[var(--theme-ink)]"}`}
                      >
                        {f.question}
                      </span>
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-[var(--theme-ink)] transition-transform duration-300 ${active ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div
                        key="answer"
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          reduced
                            ? { display: "none" }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <p className="mx-5 border-t border-[var(--theme-border)] pb-6 pt-5 text-sm leading-8 text-[var(--theme-muted)] md:mx-6">
                          {f.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <ClientPager page={current} total={maxPage} onChange={setPage} />
      {!visible.length && (
        <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-12 text-center">
          <HelpCircle
            className="mx-auto mb-3 text-[var(--theme-ink)]"
            size={38}
          />
          <h3 className="font-serif text-xl font-bold">No questions found</h3>
          <p className="mt-2 text-sm text-[var(--theme-muted)]">
            Try a shorter keyword or select another category.
          </p>
          <button
            className="btn-dark mt-5"
            onClick={() => {
              setQuery("");
              setCategory("All FAQs");
            }}
          >
            Clear search
          </button>
        </div>
      )}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-gradient-to-r from-[var(--theme-dark)] to-[var(--theme-dark)] p-8 text-white">
        <div>
          <h3 className="font-serif text-2xl font-bold">
            Need advice on your own circumstances?
          </h3>
          <p className="mt-3 text-sm text-slate-200">
            These are general answers. A tailored assessment requires facts and
            documents.
          </p>
        </div>
        <Link href="/book-appointment" className="btn-gold">
          Request Consultation <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
