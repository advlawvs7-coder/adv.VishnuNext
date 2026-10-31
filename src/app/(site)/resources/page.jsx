import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  ShieldCheck,
  Gavel,
  Globe2,
  Scale,
} from "lucide-react";
import { PageBanner, SectionHeading } from "@/components/site/Elements";
const guides = [
  [
    "Before Your First Legal Consultation",
    "Prepare a dated timeline of events, all existing notices and court orders, and a clear list of the questions you want to ask. Avoid sending passwords or original documents through public forms.",
    "/blog/how-to-prepare-for-your-first-lawyer-consultation",
    BookOpen,
  ],
  [
    "Responding to a Legal Notice",
    "Identify the sender, allegation, relief demanded and deadline. Preserve the envelope or electronic receipt and review the underlying contract or relevant record.",
    "/blog/what-should-you-do-after-receiving-a-legal-notice",
    FileText,
  ],
  [
    "Protecting Property Records",
    "Separate sale deeds, title documents, municipal entries, possession records and powers of attorney. A mutation is not necessarily conclusive proof of title.",
    "/blog/what-to-check-before-buying-property-in-delhi",
    ShieldCheck,
  ],
  [
    "Criminal Proceedings & Bail",
    "Record the details of any complaint, FIR, notice and previous order. The legal position depends on the accusation, stage of proceedings and statutory framework.",
    "/practice-areas/criminal-lawyer-bail",
    Gavel,
  ],
  [
    "Managing India Matters From Overseas",
    "Collect Indian documents, foreign residence details and any power-of-attorney arrangements. Confirm the governing country and court before taking action.",
    "/practice-areas/nri-legal-services",
    Globe2,
  ],
  [
    "Choosing a Suitable Forum",
    "Courts and tribunals have distinct jurisdictions and timelines. Identify the decision, parties, relief and applicable procedural law before filing.",
    "/courts-of-practice",
    Scale,
  ],
];
export const metadata = {
  title: "Legal Resources & Guides | Advocate Dr. Vishnu Sharma",
  description:
    "Explore guides on legal notices, documents, property, bail, NRI matters and legal consultations.",
};
export default function Resources() {
  return (
    <>
      <PageBanner
        eyebrow="RESOURCE LIBRARY"
        title="Legal Resources & Practical Guides"
        description="Original introductory material to help visitors prepare for a legal consultation."
        image={
          "https://res.cloudinary.com/damwcqwvs/image/upload/v1793347033/8.jpg"
        }
      />
      <section className="section-pad container-site">
        <SectionHeading
          eyebrow="KNOWLEDGE & PREPARATION"
          title="Guides for frequently encountered legal questions"
          description="These educational resources are starting points, not substitutes for advice on a particular case."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map(([title, body, href, Icon]) => (
            <Link
              key={title}
              href={href}
              className="group border border-[var(--theme-border)] bg-white p-8 hover:border-gold hover:shadow-editorial"
            >
              <Icon size={36} className="text-gold" />
              <h2 className="mt-6 font-serif text-2xl font-bold">{title}</h2>
              <p className="mt-4 text-sm leading-8 text-[var(--theme-muted)]">
                {body}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold">
                Read the Guide <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-12 border-l-4 border-gold bg-sand px-8 py-7 text-sm leading-8">
          All information is illustrative and must be checked against current
          law. For time-sensitive matters, consult an appropriately qualified
          lawyer without delay.
        </div>
      </section>
    </>
  );
}
