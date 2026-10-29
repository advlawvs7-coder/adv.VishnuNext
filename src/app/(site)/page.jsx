import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  ClipboardCheck,
  MessageCircle,
  Globe2,
  Building2,
  Scale,
  Landmark,
  Shield,
  BookOpen,
  CalendarDays,
  FileText,
  PlayCircle,
  MapPinned,
  ChevronRight,
  Gavel,
  ScrollText,
  HeartHandshake,
  BriefcaseBusiness,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import Hero from "@/components/site/Hero";
import InquiryForm from "@/components/site/InquiryForm";
import {
  SectionHeading,
  ServiceCard,
  PostCard,
  VideoCard,
} from "@/components/site/Elements";
import { getHomepage, getSettings } from "@/lib/content";
import * as demo from "@/dummy-data/index";
import { asset } from "@/lib/utils";
const journeys = [
  {
    name: "Matrimonial & Child Custody",
    href: "/practice-areas/matrimonial-disputes-child-custody",
    icon: HeartHandshake,
    detail:
      "Divorce, child welfare, maintenance and complex family circumstances.",
  },
  {
    name: "Property & Inheritance",
    href: "/practice-areas/nri-property-lawyer-india",
    icon: Building2,
    detail: "Title examination, property transfer, partition and succession.",
  },
  {
    name: "Criminal & Bail",
    href: "/practice-areas/criminal-lawyer-bail",
    icon: Gavel,
    detail: "Criminal procedure, bail applications, notices and case defence.",
  },
  {
    name: "NRI Legal Services",
    href: "/practice-areas/nri-legal-services",
    icon: Globe2,
    detail: "Indian legal concerns when you or your family live abroad.",
  },
  {
    name: "Business & Arbitration",
    href: "/practice-areas/arbitration-litigation",
    icon: BriefcaseBusiness,
    detail: "Commercial disagreements, business claims and dispute resolution.",
  },
  {
    name: "Wills & Succession",
    href: "/practice-areas/will-succession-lawyer",
    icon: ScrollText,
    detail: "Wills, estate documentation and lawful asset succession.",
  },
];
const processIcons = [MessageCircle, ClipboardCheck, ShieldCheck];
const forumLinks = [
  [
    "Delhi High Court",
    "/practice-areas/delhi-high-court-lawyer",
    "Appeals, writ proceedings and other matters within its jurisdiction.",
  ],
  [
    "Family Courts",
    "/practice-areas/divorce-lawyer-india",
    "Matrimonial proceedings, maintenance and issues affecting children.",
  ],
  [
    "Civil & District Courts",
    "/practice-areas/civil-litigation",
    "Civil rights, injunctions, recovery and property-related litigation.",
  ],
  [
    "Tribunals & Arbitration",
    "/practice-areas/corporate-nclt",
    "Specialised statutory proceedings and commercial dispute forums.",
  ],
];
const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "UAE",
  "Singapore",
  "Germany",
  "New Zealand",
];
const toBullets = (v) =>
  String(v || "")
    .split("\n")
    .map((x) => {
      const [a, ...b] = x.split("|");
      return [a, b.join("|")];
    })
    .filter((x) => x[0]);
export async function generateMetadata() {
  const s = await getSettings();
  return {
    title: s.seoTitle || s.siteTitle,
    description: s.seoDescription || s.siteDescription,
    alternates: { canonical: s.siteUrl || "https://advocatevishnusharma.com" },
  };
}
export default async function HomePage() {
  const [settings, home] = await Promise.all([getSettings(), getHomepage()]);
  const slides = home.slides;
  const services = home.services;
  const posts = home.posts;
  const videos = home.videos;
  const faqs = home.faqs;
  const team = home.team;
  const sections = home.sections;
  const get = (key) =>
    sections.find((s) => s.sectionKey === key) ||
    demo.sections.find((s) => s.sectionKey === key) ||
    {};
  const process = get("process"),
    practice = get("practice"),
    nri = get("nri"),
    why = get("why"),
    legalVideos = get("videos"),
    blog = get("blog"),
    questions = get("faqs"),
    consult = get("consultation");
  const steps = toBullets(process.bullets);
  const strengths = toBullets(why.bullets);
  const visualHighlights = [
    ...new Map(services.map((x) => [x.category || x.slug, x])).values(),
  ].slice(0, 3);
  return (
    <>
      <Hero slides={slides} settings={settings} />

      <section
        id="who-we-are"
        className="section-pad container-site grid items-center gap-14 lg:grid-cols-[.95fr_1.05fr]"
      >
        <div className="relative">
          <div className="absolute -left-5 -top-5 hidden h-28 w-28 border-l-[3px] border-t-[3px] border-gold lg:block" />
          <img
            src={asset(settings.aboutImage)}
            alt="Books and legal case preparation"
            className="h-[430px] w-full object-cover shadow-editorial md:h-[560px]"
          />
          <div className="absolute -bottom-6 right-5 bg-ink px-8 py-7 text-white shadow-xl md:-right-6">
            <span className="font-serif text-4xl text-[var(--theme-accent-light)]">
              15+
            </span>
            <span className="ml-3 inline-block text-xs font-semibold uppercase tracking-widest">
              Years of
              <br />
              Legal Practice
            </span>
          </div>
        </div>
        <div className="py-8">
          <p className="kicker mb-4">{settings.aboutEyebrow || "WHO WE ARE"}</p>
          <h2 className="display-title">
            {settings.aboutTitle ||
              "Practical legal advice with a personal approach"}
          </h2>
          <div className="my-7 h-1 w-20 bg-gold" />
          <p className="whitespace-pre-line text-[15px] leading-8 text-[var(--theme-muted)]">
            {settings.aboutContent}
          </p>
          <div className="mt-7 space-y-3">
            {[
              "Civil, criminal, matrimonial and property matters",
              "India-related queries from domestic and NRI clients",
              "Document-led case evaluation and clear procedural guidance",
            ].map((x) => (
              <div
                className="flex items-start gap-3 text-sm font-medium text-ink"
                key={x}
              >
                <CheckCircle2 size={18} className="mt-1 shrink-0 text-gold" />
                {x}
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/about" className="btn-dark">
              Learn About the Practice <ArrowUpRight size={17} />
            </Link>
            <Link href="/profile" className="btn-soft">
              Advocate Profile <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-sand">
        <div className="container-site">
          <SectionHeading
            eyebrow={process.eyebrow || "HOW WE WORK"}
            title={process.title || "Understanding. Planning. Action."}
            description={process.description}
            center
          />
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map(([heading, text], i) => {
              const Icon = processIcons[i % processIcons.length];
              return (
                <div
                  key={i}
                  className="spectrum-card group relative overflow-hidden p-9"
                >
                  <span className="absolute right-5 top-2 font-serif text-8xl font-bold text-[var(--theme-accent-light)]">
                    0{i + 1}
                  </span>
                  <div className="accent-icon relative mb-7 grid h-16 w-16 place-items-center rounded-xl">
                    <Icon size={31} strokeWidth={1.6} />
                  </div>
                  <h3 className="relative mb-4 font-serif text-[25px] font-bold text-ink">
                    {heading}
                  </h3>
                  <p className="relative text-[14px] leading-8 text-[var(--theme-muted)]">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad container-site" id="practice-areas">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading
            eyebrow={practice.eyebrow || "PRACTICE AREAS"}
            title={practice.title || "Our Legal Services"}
            description={practice.description}
          />
          <Link href="/practice-areas" className="btn-dark mb-11">
            Browse All Services <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 9).map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <section className="section-pad overflow-hidden">
        <div className="container-site">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.22em] text-[var(--theme-primary)]">
                LEGAL MATTERS IN FOCUS
              </p>
              <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl text-[var(--theme-primary)]">
                Explore the work behind every case
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Browse practice guides, documents and options for different
                types of legal matters.
              </p>
            </div>
            <Link href="/practice-areas" className="btn-dark">
              All Practices <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {visualHighlights.map((x) => (
              <Link
                key={x.slug}
                href={`/practice-areas/${x.slug}`}
                className="editorial-card group overflow-hidden rounded-[20px] border border-[var(--theme-border)] transition duration-300 hover:-translate-y-1 hover:border-[var(--theme-primary)]"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={asset(x.image)}
                    alt={`Illustration for ${x.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-primary)]">
                    {x.category || "Legal Service"}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-[var(--theme-ink)]">
                    {x.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--theme-muted)]">
                    {x.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-[var(--theme-primary)]">
                    Read this guide <ArrowUpRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="section-pad bg-[var(--theme-dark)] text-white">
        <div className="container-site">
          <p className="kicker mb-4 text-center">EXPLORE BY LEGAL MATTER</p>
          <h2 className="font-serif text-4xl md:text-5xl text-center">
            Find the right starting point
          </h2>
          <p className="mt-5 max-w-7xl text-slate-300 leading-8 text-center">
            Each of the topics below leads to a detailed service page with
            relevant documents, possible procedures and a consultation option.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((x, i) => {
              const Icon = journeys[i % journeys.length].icon;
              return (
                <Link
                  key={x.slug}
                  href={`/practice-areas/${x.slug}`}
                  className="group relative isolate overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-3 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-dark)] hover:shadow-[0_22px_45px_rgba(3,180,161,.25)]"
                >
                  <div
                    className="absolute inset-0 -z-10 opacity-[.12] transition-opacity group-hover:opacity-[.26]"
                    style={{
                      backgroundImage: `linear-gradient(color-mix(in srgb,var(--theme-dark) 70%,transparent),color-mix(in srgb,var(--theme-dark) 90%,transparent)),url(${x.image || "/images/legal-architecture.svg"})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="mb-8 flex items-center justify-between">
                    <Icon
                      size={36}
                      strokeWidth={1.5}
                      className="text-[var(--theme-accent)]"
                    />
                    <span className="font-serif text-3xl text-white/20">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl group-hover:text-[var(--theme-accent)]">
                    {x.title}
                  </h3>
                  <p className="mt-4 min-h-14 text-sm leading-7 text-slate-300">
                    {x.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)]">
                    View Service <ArrowUpRight size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section> */}

      <section className="relative isolate overflow-hidden bg-[var(--theme-tint)]">
        <div className="absolute right-0 top-0 h-full w-2/5 bg-[var(--theme-tint)] [clip-path:polygon(45%_0,100%_0,100%_100%,0_100%)]" />
        <div className="container-site relative grid items-center gap-12 py-20 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="kicker mb-4">INTERNATIONAL ENQUIRIES</p>
            <h2 className="display-title">
              {nri.title || "Indian legal matters, wherever you live"}
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[var(--theme-muted)]">
              {nri.description ||
                "For families and individuals living overseas who need advice on a legal matter in India."}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "NRI property and inheritance",
                "Overseas family and divorce matters",
                "Power of attorney and documentation",
                "Legal consultations from abroad",
              ].map((x) => (
                <Link
                  key={x}
                  href="/practice-areas/nri-legal-services"
                  className="flex items-center gap-2 text-sm font-semibold text-ink hover:text-gold"
                >
                  <ChevronRight size={16} className="text-gold" />
                  {x}
                </Link>
              ))}
            </div>
            <Link
              href="/practice-areas/nri-legal-services"
              className="btn-gold mt-9"
            >
              Explore NRI Legal Services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative">
            <img
              src={asset(
                "https://res.cloudinary.com/damwcqwvs/image/upload/v1792846391/homec.jpg",
              )}
              className="h-[380px] w-full object-cover shadow-editorial"
              alt="International document review"
            />
            <div className="absolute -bottom-6 left-6 right-6 bg-ink px-6 py-5 text-white">
              <p className="font-serif text-xl">
                India-related enquiries worldwide
              </p>
              <p className="mt-1 text-xs text-slate-300">
                These are visitor locations, not claims of overseas offices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad container-site">
        <SectionHeading
          eyebrow="INTERNATIONAL CLIENT ENQUIRIES"
          title="Legal enquiries from across borders"
          description="Visitors living overseas can request an India-focused consultation. The office location remains New Delhi; foreign-law advice may require locally qualified counsel."
          center
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {countries.map((c) => (
            <Link
              key={c}
              href="/online-consultation"
              className="group flex items-center justify-center gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-tint)] px-4 py-7 text-center text-sm font-bold transition-all duration-300 hover:-translate-y-2 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-tint)] hover:text-[var(--theme-ink)] hover:shadow-xl"
            >
              <Globe2 className="text-gold" size={21} />
              <span>{c}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-pad bg-sand">
        <div className="container-site">
          <SectionHeading
            eyebrow="PROFESSIONAL APPROACH"
            title={why.title || "Attention to every detail"}
            description={why.description}
            center
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {strengths.map(([a, b], i) => {
              const Icon = [ShieldCheck, Scale, MessageCircle, ClipboardCheck][
                i % 4
              ];
              return (
                <div className="spectrum-card p-7" key={i}>
                  <Icon
                    size={35}
                    className="mb-6 text-gold"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-serif text-xl font-bold">{a}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--theme-muted)]">
                    {b}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad container-site">
        <SectionHeading
          eyebrow="COURTS & FORUMS"
          title="Understanding the appropriate legal forum"
          description="Different proceedings belong before different courts or statutory authorities. Explore the procedures and forum-related questions."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {forumLinks.map(([a, link, text]) => (
            <Link key={a} href={link} className="spectrum-card group p-7">
              <Landmark className="mb-7 text-gold" size={35} />
              <h3 className="font-serif text-xl font-bold">{a}</h3>
              <p className="mt-4 min-h-28 text-sm leading-7 text-[var(--theme-muted)]">
                {text}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-gold">
                Read More <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link className="btn-dark" href="/courts-of-practice">
            Courts & Tribunals Guide <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section-pad bg-[var(--theme-dark)] text-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="border border-white/20 p-9">
            <Scale size={53} className="text-[var(--theme-accent)]" />
            <p className="mt-8 font-serif text-4xl">
              Advocate Dr.
              <br />
              Vishnu Sharma
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              15+ years of practice experience
              <br />
              Former Honorary Secretary Member, Bar Council of Delhi
            </p>
            <Link href="/profile" className="btn-gold mt-7">
              Professional Profile <ArrowRight size={16} />
            </Link>
          </div>
          <div>
            <p className="kicker mb-5">MEET THE ADVOCATE</p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              A considered approach to legal advocacy.
            </h2>
            <p className="mt-7 text-[15px] leading-9 text-slate-300">
              {team[0]?.description || settings.aboutContent}
            </p>
            <p className="mt-5 text-sm leading-8 text-slate-300">
              Each matter requires a careful reading of the facts, documents,
              jurisdiction and current law. The website is intended to help
              visitors identify relevant services and prepare for their first
              consultation.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link className="btn-gold" href="/about">
                About the Office <ArrowUpRight size={16} />
              </Link>
              <Link className="btn-outline" href="/team">
                Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad ">
        <div className="container-site">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionHeading
              eyebrow={legalVideos.eyebrow || "LEGAL AWARENESS"}
              title={legalVideos.title || "Videos and legal explainers"}
              description={legalVideos.description}
            />

            <Link href="/videos" className="btn-dark">
              View Video Library <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {videos.slice(0, 4).map((v) => (
            <VideoCard key={v.title} video={v} />
          ))}
        </div>
      </section>

      <section className="section-pad bg-sand">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={blog.eyebrow || "KNOWLEDGE CENTRE"}
              title={blog.title || "Legal insights and articles"}
              description={blog.description}
            />
            <Link href="/blog" className="btn-dark mb-11">
              Explore All Articles <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad container-site">
        <div className="grid gap-12 lg:grid-cols-[.83fr_1.17fr]">
          <div>
            <SectionHeading
              eyebrow={questions.eyebrow || "QUESTIONS ANSWERED"}
              title={questions.title || "Frequently asked questions"}
              description={questions.description}
            />
            <Link className="btn-dark" href="/faqs">
              Explore All FAQs <ArrowRight size={16} />
            </Link>
          </div>
          <div className="faq-premium space-y-3">
            {faqs.slice(0, 6).map((q, i) => (
              <details
                key={i}
                className="group border border-[var(--theme-border)] bg-white p-6"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg font-bold text-ink">
                  <span>{q.question}</span>
                  <span className="text-gold text-xl group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-5 border-t border-themeBorder pt-4 text-sm leading-8 text-[var(--theme-muted)]">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--theme-tint)] text-gray">
        <div className="container-site grid gap-12 lg:grid-cols-[.83fr_1.17fr]">
          <div>
            <p className="kicker mb-4">{consult.eyebrow || "CONTACT"}</p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              {consult.title || "Request a legal consultation"}
            </h2>
            <p className="mt-6 text-[15px] leading-8 text-slate-300">
              {consult.description ||
                "Tell us the broad nature of the matter and a suitable way to contact you."}
            </p>
            <div className="mt-10 space-y-5">
              <p className="flex gap-4 text-sm leading-7">
                <MapPinned className="shrink-0 text-[var(--theme-accent)]" />
                {settings.address}
              </p>
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-4 font-serif text-2xl text-[var(--theme-accent)]"
              >
                <PhoneCall />
                {settings.phone}
              </a>
              <Link
                href="/directions"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--theme-accent)]"
              >
                Office Directions <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="bg-white p-7 text-ink shadow-xl md:p-10">
            <p className="kicker">REQUEST A CALLBACK</p>
            <h3 className="mb-6 mt-2 font-serif text-3xl">
              Tell us about your matter
            </h3>
            <InquiryForm source="Homepage full consultation form" />
          </div>
        </div>
      </section>
    </>
  );
}
