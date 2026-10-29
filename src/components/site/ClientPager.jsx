"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function ClientPager({ page = 1, total = 1, onChange }) {
  if (total <= 1) return null;
  const numbers = [
    ...new Set(
      [1, total, page - 2, page - 1, page, page + 1, page + 2].filter(
        (n) => n >= 1 && n <= total,
      ),
    ),
  ].sort((a, b) => a - b);
  const go = (n) => {
    onChange(n);
    if (typeof document !== "undefined") {
      const marker = document.getElementById("listing-start");
      if (marker) marker.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 px-3 py-7"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        className="v5-page-btn"
        aria-label="Previous page"
      >
        <ChevronLeft size={17} />
      </button>
      {numbers.map((n, i) => (
        <span key={n} className="contents">
          {i > 0 && n - numbers[i - 1] > 1 && (
            <span aria-hidden="true" className="px-1 text-slate-400">
              …
            </span>
          )}
          <button
            aria-current={page === n ? "page" : undefined}
            type="button"
            onClick={() => go(n)}
            className={`v5-page-btn ${page === n ? "v5-page-active" : ""}`}
          >
            {n}
          </button>
        </span>
      ))}
      <button
        type="button"
        disabled={page >= total}
        onClick={() => go(page + 1)}
        className="v5-page-btn"
        aria-label="Next page"
      >
        <ChevronRight size={17} />
      </button>
      <span className="ml-2 text-xs text-[var(--theme-muted)]">
        Page {page} of {total}
      </span>
    </nav>
  );
}
