import { Post, Section, data } from "@/lib/content";
import { PostCard, PageBanner } from "@/components/site/Elements";
import Link from "next/link";
export const metadata = {
  title: "Legal Blog & Articles | Advocate Dr. Vishnu Sharma",
  description:
    "Original demonstration articles covering legal issues and procedures in India.",
};
export default async function Blog({ searchParams }) {
  const sp = await searchParams;
  const query = String(sp?.q || "")
    .slice(0, 120)
    .trim();
  const selected = String(sp?.category || "").slice(0, 70);
  const page = Math.max(
    1,
    Math.min(1000, Number.parseInt(sp?.page || "1", 10) || 1),
  );
  const articles = await data(
    Post,
    { published: true },
    { sort: { publishedAt: -1 }, limit: 1000 },
  );
  const categories = [
    ...new Set(articles.map((p) => p.category).filter(Boolean)),
  ].sort();
  const results = articles.filter(
    (p) =>
      (!selected || p.category === selected) &&
      (!query ||
        [p.title, p.excerpt, p.category].some((v) =>
          String(v || "")
            .toLowerCase()
            .includes(query.toLowerCase()),
        )),
  );
  const size = 9;
  const pages = Math.max(1, Math.ceil(results.length / size));
  const list = results.slice((page - 1) * size, page * size);
  const mkPage = (num) =>
    `/blog?${new URLSearchParams({ ...(query ? { q: query } : {}), ...(selected ? { category: selected } : {}), page: String(num) })}`;
  const sections = await data(
    Section,
    {
      sectionKey: "blog",
      enabled: true,
    },
    { sort: { order: 1 }, limit: 1 },
  );

  const blog = sections[0];
  return (
    <>
      <PageBanner
        eyebrow={blog.eyebrow || ""}
        title={blog.title || "Legal Insights & Articles"}
        description={blog.description || 
          "Explore our legal knowledge centre across NRI, matrimonial, property and court matters."
        }
        image={blog.image || ""}
      />
      <section className="section-pad container-site">
        <div className="mb-8 rounded-xl border-l-4 border-[var(--theme-primary)] bg-[var(--theme-tint)] px-6 py-4 text-xs leading-6 text-[var(--theme-ink)]">
          Preview content: demonstration articles. Replace with verified
          original posts before launch.
        </div>
        <form
          action="/blog"
          method="GET"
          className="mb-10 grid gap-3 rounded-2xl border border-[var(--theme-border)] bg-gradient-to-r from-[var(--theme-tint)] via-white to-[var(--theme-tint)] p-6 shadow-sm sm:grid-cols-[1fr_250px_auto]"
        >
          <input
            className="field"
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search legal articles"
            aria-label="Search articles"
          />
          <select
            className="field"
            name="category"
            defaultValue={selected}
            aria-label="Filter category"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button className="btn-dark">Search</button>
        </form>
        <p className="mb-6 text-sm text-[var(--theme-muted)]">
          {results.length} articles found
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        {!list.length && (
          <p className="py-20 text-center text-[var(--theme-muted)]">
            No matching articles. Try another search.
          </p>
        )}
        {pages > 1 && (
          <nav
            className="mt-12 flex flex-wrap justify-center gap-2"
            aria-label="Blog pagination"
          >
            {Array.from({ length: pages }, (_, i) => i + 1).map((i) => (
              <Link
                key={i}
                href={mkPage(i)}
                className={`grid h-10 w-10 place-items-center rounded border text-sm font-semibold ${i === page ? "border-gold bg-gold text-white" : "hover:border-gold"}`}
              >
                {i}
              </Link>
            ))}
          </nav>
        )}
      </section>
    </>
  );
}
