import Link from "next/link";
import { getSettings, Service, data } from "@/lib/content";
import { PageBanner } from "@/components/site/Elements";
import MotionSurface from "@/components/site/MotionSurface";
import InquiryForm from "@/components/site/InquiryForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CalendarDays,
  ArrowUpRight,
  ShieldCheck,
  Globe2,
  MessageCircle,
} from "lucide-react";
export async function generateMetadata() {
  const s = await getSettings();
  return {
    title: `Contact Us | ${s.brandName}`,
    description:
      s.consultationText ||
      "Contact the Delhi legal office for consultation availability.",
  };
}
export default async function Contact() {
  const [s, services] = await Promise.all([
    getSettings(),
    data(Service, { featured: true, published: true }, { limit: 16 }),
  ]);
  const points = [
    {
      Icon: MapPin,
      title: "Office Address",
      value: s.address,
      href: "/directions",
      hint: "View office directions",
    },
    {
      Icon: Phone,
      title: "Call Our Office",
      value: s.phone,
      href: `tel:${s.phone}`,
      hint: "Telephone consultation enquiries",
    },
    {
      Icon: Mail,
      title: "Email Enquiries",
      value: s.email,
      href: `mailto:${s.email}`,
      hint: "Write to the office",
    },
    {
      Icon: Clock,
      title: "Consultation Timings",
      value: s.officeHours,
      href: "/book-appointment",
      hint: "Confirm available appointment slots",
    },
  ];
  return (
    <>
      <PageBanner
        eyebrow="LET’S CONNECT"
        title="Contact our legal office"
        description={
          s.consultationText || "Make an informed start to your legal matter."
        }
        image="https://res.cloudinary.com/damwcqwvs/image/upload/v1793104961/advocate-vishnu-sharma/w8mccikbpdkdlhnejnqz.png"
      />
      <section className="bg-[var(--theme-tint)] py-14 lg:py-20">
        <div className="container-site grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:gap-14">
          <div>
            <span className="stylish-badge">
              <MessageCircle size={15} /> We are here to listen
            </span>
            <h2 className="mt-6 font-serif text-4xl font-bold leading-tight text-[var(--theme-ink)] sm:text-5xl">
              Let’s begin with a clear conversation.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-8 text-[var(--theme-muted)]">
              {s.consultationText}
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {points.map(({ Icon, title, value, href, hint }) => (
                <MotionSurface key={title}>
                  <Link
                    href={href}
                    className="spectrum-card group flex min-h-[176px] flex-col p-6"
                  >
                    <span className="accent-icon mb-4 grid h-12 w-12 place-items-center rounded-xl">
                      <Icon size={24} />
                    </span>
                    <h3 className="font-serif text-lg font-bold">{title}</h3>
                    <p className="mt-2 break-words text-sm leading-6 text-[var(--theme-muted)]">
                      {value}
                    </p>
                    <span className="accent-link mt-auto pt-3 text-xs font-bold">
                      {hint} ↗
                    </span>
                  </Link>
                </MotionSurface>
              ))}
            </div>
            <div className="mt-7 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-5 text-xs leading-7 text-[var(--theme-ink)]">
              <ShieldCheck className="mb-2 text-[var(--theme-ink)]" />
              Please share a concise overview, not private evidence or
              passwords. A request does not establish an advocate–client
              relationship.
            </div>
          </div>
          <MotionSurface className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[28px] border border-[var(--theme-border)] bg-white shadow-[0_28px_85px_rgba(13,79,82,.14)]">
              <div className="bg-gradient-to-r from-[var(--theme-dark)] via-[var(--theme-dark)] to-[var(--theme-primary)] p-7 text-white sm:p-9">
                <span className="text-[11px] font-bold uppercase tracking-[.24em] text-[var(--theme-accent-light)]">
                  Contact form
                </span>
                <h2 className="mt-3 font-serif text-3xl font-bold">
                  Tell us about your matter
                </h2>
                <p className="mt-3 text-sm text-slate-200">
                  Complete the form to request a callback or an appointment.
                </p>
              </div>
              <div className="p-6 sm:p-9">
                <InquiryForm
                  source="Contact premium form"
                  serviceOptions={services}
                />
              </div>
            </div>
          </MotionSurface>
        </div>
      </section>
      <section className="bg-[var(--theme-dark)] py-12 text-white">
        <div className="container-site flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--theme-primary)]">
              REMOTE SUPPORT
            </p>
            <h2 className="font-serif text-2xl font-bold">
              Calling from outside India?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Request an online consultation and share your time zone.
            </p>
          </div>
          <Link href="/online-consultation" className="btn-gold">
            <Globe2 size={17} /> Online Consultation <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
