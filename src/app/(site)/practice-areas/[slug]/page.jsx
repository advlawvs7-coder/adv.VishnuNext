import { notFound } from "next/navigation";
import Link from "next/link";
import RichContent from "@/components/site/RichContent";

import { Service, one, data } from "@/lib/content";
import {
  PageBanner,
  BreadcrumbSide,
  ServiceCard,
} from "@/components/site/Elements";
import InquiryForm from "@/components/site/InquiryForm";
import {
  FileText,
  Scale,
  ShieldCheck,
  ArrowRight,
  Info,
  BookOpen,
  ClipboardList,
  CalendarDays,
} from "lucide-react";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = await one(Service, { slug, published: true });
  return s
    ? {
        title: s.seoTitle || s.title,
        description: s.seoDescription || s.summary,
        alternates: {
          canonical: `https://advocatevishnusharma.com/practice-areas/${slug}`,
        },
      }
    : { title: "Practice Area Not Found" };
}
export default async function PracticeDetail({ params }) {
  const { slug } = await params;
  const [s, services] = await Promise.all([
    one(Service, { slug, published: true }),
    data(Service, { published: true }, { sort: { order: 1 }, limit: 250 }),
  ]);
  if (!s) notFound();
  const related = services
    .filter((x) => x.slug !== slug && x.category === s.category)
    .slice(0, 3);
  return (
    <>
      <PageBanner
        eyebrow={s.category || "LEGAL PRACTICE"}
        title={s.title}
        description={s.summary}
        image={s.image}
      />
      <section className="border-b border-[var(--theme-border)] bg-[var(--theme-tint)] py-7">
        <div className="container-site grid gap-4 md:grid-cols-3">
          {[
            [
              BookOpen,
              "Topic-specific information",
              "Overview and legal context",
            ],
            [
              ClipboardList,
              "Useful preparation",
              "Records and documents to consider",
            ],
            [
              ShieldCheck,
              "Individual assessment",
              "Options depend on the facts",
            ],
          ].map(([Icon, heading, sub]) => (
            <div
              className="flex gap-3 rounded-xl bg-white p-4 shadow-sm"
              key={heading}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--theme-tint)] text-[var(--theme-ink)]">
                <Icon size={22} />
              </span>
              <div>
                <h3 className="text-sm font-bold text-[var(--theme-ink)]">
                  {heading}
                </h3>
                <p className="mt-1 text-xs text-[var(--theme-muted)]">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="container-site grid items-start gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_330px]">
        <article className="min-w-0">
          <div className="mb-9 flex items-center gap-4 rounded-2xl border border-[var(--theme-border)] bg-gradient-to-r from-[var(--theme-tint)] to-[var(--theme-tint)] p-6">
            <Info size={27} className="shrink-0 text-[var(--theme-ink)]" />
            <div>
              <p className="font-serif text-lg font-bold text-[var(--theme-ink)]">
                Understanding your legal position
              </p>
              <p className="mt-1 text-sm leading-7 text-[var(--theme-muted)]">
                This demo guide provides an introduction to{" "}
                {s.title.toLowerCase()}. It is not a legal opinion or a
                prediction of the outcome of any matter.
              </p>
            </div>
          </div>
          <div className="prose-content max-w-none">
            <RichContent content={s.content || s.summary} />
          </div>
          <div className="mt-14 rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-7 md:p-10">
            <div className="mb-7 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--theme-dark)] text-white">
                <CalendarDays size={22} />
              </span>
              <div>
                <p className="kicker">CONSULTATION REQUEST</p>
                <h2 className="font-serif text-2xl font-bold text-[var(--theme-ink)]">
                  Enquire About {s.title}
                </h2>
              </div>
            </div>
            <InquiryForm source={`Service: ${s.title}`} />
          </div>
        </article>
        <div className="lg:sticky lg:top-[105px]">
          <BreadcrumbSide services={services} />
        </div>
      </div>
      {related.length > 0 && (
        <section className="section-pad bg-[var(--theme-tint)]">
          <div className="container-site">
            <div className="mb-9 flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="kicker mb-3">CONTINUE EXPLORING</p>
                <h2 className="font-serif text-3xl font-bold">
                  Related practice areas
                </h2>
              </div>
              <Link href="/practice-areas" className="btn-dark">
                All Services <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((x) => (
                <ServiceCard key={x.slug} service={x} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
