import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Scale,
  ShieldCheck,
  FileCheck2,
  Globe2,
  MapPin,
  CheckCircle2,
  ChevronRight,
  HeartHandshake,
  BriefcaseBusiness,
} from "lucide-react";
import { getSettings, data, Team, Section, Service, FAQ } from "@/lib/content";
import {
  PageBanner,
  SectionHeading,
  ServiceCard,
} from "@/components/site/Elements";
import MotionSurface from "@/components/site/MotionSurface";
import { asset } from "@/lib/utils";
const itemsOf = (v) =>
  String(v || "")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [title, ...parts] = line.split("|");
      return { title, description: parts.join("|") };
    });
export async function generateMetadata() {
  const s = await getSettings();
  return {
    title: `About the Practice | ${s.brandName}`,
    description: s.aboutContent?.slice(0, 150),
  };
}
export default async function About() {
  const [s, sections, services, faqs, team] = await Promise.all([
    getSettings(),
    data(Section, { enabled: true }),
    data(Service, { published: true }, { sort: { order: 1 }, limit: 9 }),
    data(FAQ, { published: true }, { sort: { order: 1 }, limit: 6 }),
    data(Team, { published: true }, { limit: 3 }),
  ]);
  const get = (key) => sections.find((x) => x.sectionKey === key) || {};
  const intro = get("about-introduction"),
    process = get("about-process"),
    values = get("about-values"),
    nri = get("about-nri");
  const section = await data(
    Section,
    {
      sectionKey: "about-introduction",
      enabled: true,
    },
    { sort: { order: 1 }, limit: 1 },
  );

  const about = section[0];
  return (
    <>
      <PageBanner
        eyebrow="KNOW OUR PRACTICE"
        title={s.aboutTitle || "About Dr. Advocate Vishnu Sharma"}
        description={s.aboutContent}
        image={about.image ||
          ""
        }
      />
      <section className="section-pad container-site grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <MotionSurface>
          <div className="relative">
            <img
              src={asset(s.aboutImage)}
              alt="Illustrative legal office"
              className="h-[480px] w-full rounded-[27px] object-cover shadow-[0_24px_65px_rgba(6,49,53,.19)]"
            />
            <div className="absolute -bottom-5 right-4 rounded-2xl bg-[var(--theme-dark)] p-6 text-white shadow-xl">
              <strong className="font-serif text-3xl text-[var(--theme-accent-light)]">
                {s.experienceLabel || "15+ Years"}
              </strong>
              <p className="mt-1 text-xs">Professional legal experience</p>
            </div>
          </div>
        </MotionSurface>
        <MotionSurface>
          <span className="stylish-badge">{intro.eyebrow || "WHO WE ARE"}</span>
          <h2 className="mt-7 font-serif text-4xl font-bold leading-tight text-[var(--theme-ink)] md:text-5xl">
            {intro.title || s.aboutTitle}
          </h2>
          <p className="mt-6 whitespace-pre-line text-sm leading-8 text-[var(--theme-muted)]">
            {intro.description || s.aboutContent}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/profile" className="btn-dark">
              Professional Profile <ArrowRight size={16} />
            </Link>
            <Link href="/book-appointment" className="btn-gold">
              Book Appointment <ArrowUpRight size={16} />
            </Link>
          </div>
        </MotionSurface>
      </section>
      <section className="section-pad premium-glow text-white">
        <div className="container-site">
          <SectionHeading
            eyebrow={process.eyebrow || "OUR PROCESS"}
            title={process.title || "How we work"}
            description={process.description}
            center
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {itemsOf(process.bullets).map((x, i) => (
              <MotionSurface key={i} delay={i * 0.05}>
                <div className="glass-panel group h-full p-7 transition hover:-translate-y-3 hover:bg-white/20">
                  <span className="font-serif text-4xl text-[var(--theme-accent-light)]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-bold">
                    {x.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-200">
                    {x.description}
                  </p>
                </div>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad container-site">
        <SectionHeading
          eyebrow="LEGAL FOCUS"
          title="Discover our practice areas"
          description="Explore each category for information about documents, legal process and consultation."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((x) => (
            <ServiceCard key={x.slug} service={x} />
          ))}
        </div>
        <Link href="/practice-areas" className="btn-dark mt-9">
          All Practice Areas <ArrowRight size={16} />
        </Link>
      </section>
      <section className="section-pad bg-[var(--theme-tint)]">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[.78fr_1.22fr]">
          <div>
            <span className="stylish-badge">
              {values.eyebrow || "OUR VALUES"}
            </span>
            <h2 className="mt-6 font-serif text-4xl font-bold text-[var(--theme-ink)]">
              {values.title}
            </h2>
            <p className="mt-5 text-sm leading-8 text-[var(--theme-muted)]">
              {values.description}
            </p>
            <p className="mt-6 text-sm font-semibold text-[var(--theme-ink)]">
              {s.experienceLabel || ""} · {s.locationText || ""}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {itemsOf(values.bullets).map((x, i) => {
              const Icon = [ShieldCheck, FileCheck2, Scale, HeartHandshake][
                i % 4
              ];
              return (
                <MotionSurface key={i}>
                  <div className="spectrum-card h-full p-7">
                    <span className="accent-icon mb-5 grid h-12 w-12 place-items-center rounded-xl">
                      <Icon size={23} />
                    </span>
                    <h3 className="font-serif text-xl font-bold">{x.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--theme-muted)]">
                      {x.description}
                    </p>
                  </div>
                </MotionSurface>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-pad container-site grid items-center gap-12 lg:grid-cols-2">
        <MotionSurface>
          <div className="relative overflow-hidden rounded-[27px] bg-[var(--theme-dark)] p-10 text-white shadow-xl">
            <img
              src={asset(nri.image || "/images/topics/nri.svg")}
              alt="International legal services illustration"
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
            <div className="relative">
              <Globe2 size={45} className="text-[var(--theme-accent-light)]" />
              <h2 className="mt-7 font-serif text-4xl font-bold">
                {nri.title || "Legal advice across distances"}
              </h2>
              <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-100">
                {nri.description}
              </p>
              <Link href="/online-consultation" className="btn-gold mt-7">
                Online Consultation <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </MotionSurface>
        <MotionSurface>
          <SectionHeading
            eyebrow="FAQS"
            title="Before your first appointment"
            description="Answers based on published questions in the CMS."
          />
          <div className="space-y-3">
            {faqs.slice(0, 5).map((q, i) => (
              <details
                key={q._id || q.question}
                className="faq-premium group rounded-xl border border-[var(--theme-border)] bg-white p-5"
                open={i === 0}
              >
                <summary className="flex cursor-pointer justify-between gap-3 font-serif font-bold">
                  {q.question}
                  <span className="text-[var(--theme-ink)]">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-[var(--theme-muted)]">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
          <Link href="/faqs" className="btn-dark mt-6">
            Read More FAQs <ArrowRight size={16} />
          </Link>
        </MotionSurface>
      </section>
      <section className="bg-[var(--theme-dark)] py-12 text-white">
        <div className="container-site flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[var(--theme-accent-light)]">
              THE NEXT STEP
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold">
              Discuss your legal concerns.
            </h2>
          </div>
          <Link href="/book-appointment" className="btn-gold">
            Request Appointment <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
