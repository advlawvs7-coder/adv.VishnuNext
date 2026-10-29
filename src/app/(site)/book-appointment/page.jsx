import Link from "next/link";
import { getSettings, data, Service, Section } from "@/lib/content";
import { PageBanner } from "@/components/site/Elements";
import InquiryForm from "@/components/site/InquiryForm";
import MotionSurface from "@/components/site/MotionSurface";
import {
  CalendarCheck2,
  ClipboardCheck,
  Clock3,
  ShieldCheck,
  ArrowUpRight,
  Phone,
  Video,
  FileCheck2,
} from "lucide-react";
export async function generateMetadata() {
  const s = await getSettings();
  return {
    title: `Book a Legal Consultation | ${s.brandName}`,
    description: s.consultationText,
  };
}
export default async function Appointment() {
  const [s, services] = await Promise.all([
    getSettings(),
    data(Service, { published: true, featured: true }, { limit: 20 }),
  ]);
  const steps = [
    {
      Icon: ClipboardCheck,
      n: "01",
      title: "Share an overview",
      text: "Select a matter type and describe your question in brief.",
    },
    {
      Icon: CalendarCheck2,
      n: "02",
      title: "Office confirmation",
      text: "The office can respond about consultation availability and terms.",
    },
    {
      Icon: FileCheck2,
      n: "03",
      title: "Prepare for discussion",
      text: "After confirmation, follow any instructions about relevant documents.",
    },
  ];
   const sections = await data(
     Section,
     {
       sectionKey: "consultation",
       enabled: true,
     },
     { sort: { order: 1 }, limit: 1 },
   );   
    const consultation = sections[0];
  return (
    <>
      <PageBanner
        eyebrow="PRIVATE CONSULTATION REQUEST"
        title="Book an appointment"
        description={
          s.consultationTitle ||
          "Request a conversation with Advocate Dr. Vishnu Sharma."
        }
        image={consultation.image || ""}
      />
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--theme-tint)] via-white to-[var(--theme-tint)] py-14 lg:py-20">
        <div className="container-site grid items-start gap-10 lg:grid-cols-[.86fr_1.14fr] lg:gap-16">
          <div>
            <span className="stylish-badge">
              <CalendarCheck2 size={15} /> Consultation process
            </span>
            <h2 className="mt-7 max-w-xl font-serif text-4xl font-bold leading-tight text-[var(--theme-ink)] sm:text-5xl">
              Focused advice begins with understanding the facts.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--theme-muted)]">
              {s.consultationText}
            </p>
            <div className="mt-9 grid gap-4">
              {steps.map((x) => (
                <MotionSurface key={x.n}>
                  <div className="spectrum-card flex gap-5 p-6">
                    <div className="accent-icon grid h-12 w-12 shrink-0 place-items-center rounded-xl">
                      <x.Icon size={24} />
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest text-[var(--theme-ink)]">
                        STEP {x.n}
                      </span>
                      <h3 className="mt-2 font-serif text-xl font-bold">
                        {x.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--theme-muted)]">
                        {x.text}
                      </p>
                    </div>
                  </div>
                </MotionSurface>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="btn-dark" href={`tel:${s.phone}`}>
                <Phone size={16} /> Call the Office
              </a>
              <Link className="btn-soft" href="/online-consultation">
                <Video size={17} /> Online Consultation
              </Link>
            </div>
          </div>
          <MotionSurface className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[30px] border border-[var(--theme-border)] bg-white shadow-[0_28px_85px_rgba(0,75,72,.14)]">
              <div className="relative overflow-hidden bg-gradient-to-r from-[var(--theme-dark)] via-[var(--theme-dark)] to-[var(--theme-primary)] p-8 text-white">
                <div className="absolute -right-10 top-[-55px] h-48 w-48 rounded-full border-[25px] border-white/10" />
                <span className="relative flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.24em] text-[var(--theme-accent-light)]">
                  <Clock3 size={17} /> Appointment request
                </span>
                <h2 className="relative mt-4 font-serif text-3xl font-bold">
                  Request a consultation slot
                </h2>
                <p className="relative mt-3 text-sm text-slate-200">
                  Fill the form below. An appointment is confirmed only after
                  the office responds.
                </p>
              </div>
              <div className="p-6 sm:p-9">
                <InquiryForm
                  source="Premium appointment request"
                  serviceOptions={services}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-3 rounded-xl border border-[var(--theme-border)] bg-white p-4 text-xs leading-6 text-[var(--theme-muted)]">
              <ShieldCheck
                className="shrink-0 text-[var(--theme-ink)]"
                size={18}
              />{" "}
              Please do not submit privileged documents or confidential
              credentials through the public form.
            </div>
          </MotionSurface>
        </div>
      </section>
    </>
  );
}
