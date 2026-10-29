import Link from "next/link";
import { data, Section } from "@/lib/content";
import { PageBanner } from "@/components/site/Elements";
import { ArrowRight, ShieldCheck, BookOpen, Compass } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Practice Areas | Advocate Dr. Vishnu Sharma",
  description:
    "Explore legal practice areas, services, documents and procedures.",
};

export default async function PracticeAreas() {
 const sections = await data(
   Section,
   {
     sectionKey: "practice",
     enabled: true,
   },
   { sort: { order: 1 }, limit: 1 },
 );

 const practice = sections[0];
  return (
    <>
      <PageBanner
        eyebrow={practice?.eyebrow || "OUR PRACTICE AREAS"}
        title={practice?.title || "Practice Areas"}
        description={
          practice?.description ||
          "Explore our legal practice areas and services."
        }
        image={practice?.image || undefined}
      />

      <section className="section-pad container-site">
        <div className="mb-12 grid gap-5 md:grid-cols-3">
          {[
            {
              Icon: ShieldCheck,
              title: "Individual pages",
              subtitle:
                "Explore information and guidance for each legal service.",
            },
            {
              Icon: BookOpen,
              title: "Explore at your pace",
              subtitle:
                "Browse available sections and find relevant information.",
            },
            {
              Icon: Compass,
              title: "Plan your consultation",
              subtitle:
                "Prepare relevant questions and documents before consultation.",
            },
          ].map(({ Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-6"
            >
              <Icon
                size={28}
                className="shrink-0 text-[var(--theme-primary)]"
              />
              <div>
                <h3 className="font-serif text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--theme-muted)]">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic data from Section model */}
        {sections.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <article
                key={section._id.toString()}
                className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {section.eyebrow && (
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--theme-accent)]">
                    {section.eyebrow}
                  </p>
                )}

                <h2 className="font-serif text-xl font-bold text-[var(--theme-ink)]">
                  {section.title}
                </h2>

                {section.description && (
                  <p className="mt-3 text-sm leading-7 text-[var(--theme-muted)]">
                    {section.description}
                  </p>
                )}

                {section.image && (
                  <img
                    src={section.image}
                    alt={section.title || "Legal section"}
                    className="mt-4 h-44 w-full rounded-xl object-cover"
                  />
                )}

                {section.ctaText && section.ctaHref && (
                  <Link
                    href={section.ctaHref}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-[var(--theme-primary)] hover:text-[var(--theme-accent)]"
                  >
                    {section.ctaText}
                    <ArrowRight size={16} />
                  </Link>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-[var(--theme-border)] p-6 text-[var(--theme-muted)]">
            No published sections are currently available.
          </p>
        )}
      </section>

      <section className="premium-glow py-14 text-white">
        <div className="container-site flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-[var(--theme-accent-light)]">
              LEGAL CONSULTATION
            </p>
            <h2 className="font-serif text-3xl font-bold">
              Need legal guidance?
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Explore the available information before requesting a
              consultation.
            </p>
          </div>

          <Link href="/book-appointment" className="btn-gold">
            Request Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}