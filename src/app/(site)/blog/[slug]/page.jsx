import { notFound } from "next/navigation";
import Link from "next/link";
import RichContent from "@/components/site/RichContent";

import { Post, one, data } from "@/lib/content";
import { PageBanner, PostCard } from "@/components/site/Elements";
import InquiryForm from "@/components/site/InquiryForm";
import { asset } from "@/lib/utils";
import {
  CalendarDays,
  Clock3,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  PhoneCall,
} from "lucide-react";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await one(Post, { slug, published: true });
  return p
    ? {
        title: p.seoTitle || p.title,
        description: p.seoDescription || p.excerpt,
        alternates: {
          canonical: `https://advocatevishnusharma.com/blog/${slug}`,
        },
      }
    : { title: "Article Not Found" };
}
export default async function Article({ params }) {
  const { slug } = await params;
  const [post, others] = await Promise.all([
    one(Post, { slug, published: true }),
    data(
      Post,
      { published: true, slug: { $ne: slug } },
      { sort: { publishedAt: -1 }, limit: 3 },
    ),
  ]);
  if (!post) notFound();
  const publishedDate = new Date(
    post.publishedAt || post.createdAt || Date.now(),
  );
  const estimatedReading = Math.max(
    3,
    Math.ceil(String(post.content || "").split(/\s+/).length / 190),
  );
  return (
    <>
      <PageBanner
        eyebrow={post.category || "LEGAL INSIGHTS"}
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
      />
      <section className="bg-[var(--theme-tint)] py-12 lg:py-20">
        <div className="container-site grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_365px] xl:gap-14">
          <article className="min-w-0 overflow-hidden rounded-[24px] border border-[var(--theme-border)] bg-white shadow-[0_25px_75px_rgba(12,36,49,.08)]">
            <div className="border-b border-[var(--theme-border)] px-6 py-6 md:px-10">
              <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-[var(--theme-primary)]">
                <span className="flex items-center gap-2">
                  <BookOpen size={16} /> {post.category || "Legal Education"}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />{" "}
                  {Number.isNaN(publishedDate.getTime())
                    ? "Legal article"
                    : publishedDate.toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock3 size={16} /> {estimatedReading} min read
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <img
                className="max-h-[440px] w-full object-cover"
                src={asset(post.coverImage)}
                alt={`Illustrative cover for ${post.title}`}
              />
            </div>
            <div className="px-6 pb-12 pt-9 md:px-11 md:pb-16">
              <div className="mb-9 rounded-2xl border-l-4 border-[var(--theme-primary)] bg-[var(--theme-tint)] p-6 text-sm leading-8 text-[var(--theme-ink)]">
                {post.excerpt}
              </div>
              <div className="prose-content max-w-none break-words">
                <RichContent content={post.content || post.excerpt} />
              </div>
              <div className="mt-14 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-5 text-xs leading-7 text-[var(--theme-muted)]">
                This educational material is not an individual legal opinion.
                The applicable law and procedure should be checked against the
                facts and the latest official materials.
              </div>
              <div className="mt-7">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--theme-ink)] hover:text-[var(--theme-alt)]"
                >
                  ← Back to all legal articles
                </Link>
              </div>
            </div>
          </article>
          <aside
            className="lg:sticky lg:top-[105px] lg:self-start"
            aria-label="Book an appointment"
          >
            <div className="overflow-hidden rounded-[24px] border border-[var(--theme-border)] bg-white shadow-[0_25px_65px_rgba(2,50,61,.15)]">
              <div className="relative overflow-hidden bg-gradient-to-br from-[var(--theme-dark)] via-[var(--theme-dark)] to-[var(--theme-primary)] p-7 text-white">
                <div className="absolute -right-10 -top-8 h-32 w-32 rounded-full border border-white/25" />
                <span className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest">
                  <CalendarDays size={15} /> Request Appointment
                </span>
                <h2 className="relative mt-5 font-serif text-3xl font-bold leading-tight">
                  Discuss your legal matter
                </h2>
                <p className="relative mt-4 text-sm leading-7 text-slate-100">
                  Send a brief enquiry for a consultation with Advocate Dr.
                  Vishnu Sharma.
                </p>
              </div>
              <div className="p-6">
                <InquiryForm compact source={`Blog: ${post.title}`} />
              </div>
            </div>
            <div className="mt-5 grid gap-3 rounded-2xl border border-[var(--theme-border)] bg-white p-5 text-xs leading-6 text-[var(--theme-muted)]">
              <p className="flex items-start gap-3">
                <ShieldCheck
                  className="mt-1 shrink-0 text-[var(--theme-ink)]"
                  size={18}
                />{" "}
                Please do not send confidential case papers before a
                professional engagement is agreed.
              </p>
              <Link
                href="/practice-areas"
                className="inline-flex items-center gap-2 font-extrabold text-[var(--theme-ink)] hover:text-[var(--theme-primary)]"
              >
                Explore Practice Areas <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-extrabold text-[var(--theme-ink)] hover:text-[var(--theme-primary)]"
              >
                Office Contact Details <PhoneCall size={15} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
      {others.length > 0 && (
        <section className="section-pad bg-[var(--theme-tint)]">
          <div className="container-site">
            <div className="mb-9 flex items-center justify-between gap-4">
              <h2 className="font-serif text-3xl font-bold text-[var(--theme-ink)]">
                Continue reading
              </h2>
              <Link
                href="/blog"
                className="text-sm font-bold text-[var(--theme-ink)]"
              >
                All articles →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
