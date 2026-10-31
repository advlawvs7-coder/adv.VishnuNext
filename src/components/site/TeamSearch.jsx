"use client";

import { useMemo, useState, useEffect } from "react";
import { asset } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
const ITEMS_PER_PAGE = 12;

export default function TeamSearch({ people = [] }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPeople = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return people;

    return people.filter((person) =>
      [person.name, person.designation, person.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [people, search]);

  const totalPages = Math.ceil(filteredPeople.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPeople = filteredPeople.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <>
      {/* Search */}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="w-full max-w-sm">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team members..."
            aria-label="Search team members"
            className="w-full rounded-xl border border-themeBorder bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/10"
          />
        </div>

        <p className="text-xs text-[var(--theme-muted)]">
          Showing {filteredPeople.length > 0 ? startIndex + 1 : 0}–
          {Math.min(startIndex + ITEMS_PER_PAGE, filteredPeople.length)} of{" "}
          {filteredPeople.length} members
        </p>
      </div>

      {/* Premium Compact Team Cards */}
      {currentPeople.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {currentPeople.map((p) => (
            <article
              key={p._id}
              className="group overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--theme-primary)]/30 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/4.3] overflow-hidden bg-sand">
                <img
                  src={asset(p.image, "/images/portrait-placeholder.svg")}
                  alt={`Portrait of ${p.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <h2 className="line-clamp-1 font-serif text-sm font-bold text-[var(--theme-ink)] sm:text-base">
                  {p.name}
                </h2>

                <p className="mt-1 line-clamp-1 text-[11px] font-semibold text-[var(--theme-primary)]">
                  {p.designation}
                </p>

                {/* {p.description && (
                  <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-[var(--theme-muted)]">
                    {p.description}
                  </p>
                )} */}

                <div className="mt-3 h-px bg-[var(--theme-border)]" />

                {/* <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-muted)]">
                    Team Member
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] transition group-hover:bg-[var(--theme-primary)] group-hover:text-white">
                    <ArrowUpRight size={13} />
                  </span>
                </div> */}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--theme-border)] bg-white py-12 text-center">
          <h2 className="font-serif text-xl font-bold text-[var(--theme-ink)]">
            No Team Members Found
          </h2>
          <p className="mt-2 text-sm text-[var(--theme-muted)]">
            Try searching with another name.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="border border-themeBorder px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`h-10 min-w-10 border px-3 text-sm ${
                currentPage === page
                  ? "border-[var(--theme-primary)] bg-[var(--theme-primary)] text-white"
                  : "border-themeBorder hover:bg-sand"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="border border-themeBorder px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
