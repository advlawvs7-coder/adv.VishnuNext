import Link from "next/link";
import { ArrowRight, Scale, Landmark, BookOpen } from "lucide-react";
import { PageBanner, SectionHeading } from "@/components/site/Elements";
const matters = [
  [
    "Natural Justice & Fair Procedure",
    "Courts may examine whether a person affected by an administrative decision had a meaningful opportunity to respond and whether the decision was reasoned. The applicable statute and facts are essential.",
    "/practice-areas/administrative-law",
  ],
  [
    "Child Welfare in Custody Matters",
    "The welfare of the child is a primary consideration in custody and guardianship decisions. No fixed formula can replace evaluation of stability, care and the particular family situation.",
    "/practice-areas/child-support-and-custody",
  ],
  [
    "Rights in Property & Partition",
    "Questions of ownership, possession, inheritance and partition require review of the applicable substantive law and the documentary chain. A revenue entry does not by itself settle every title dispute.",
    "/practice-areas/partition-of-property",
  ],
  [
    "Criminal Bail & Procedural Safeguards",
    "A court considers liberty alongside the relevant statute, nature of accusations and risk factors. General constitutional principles must be applied to the facts of each bail application.",
    "/practice-areas/criminal-lawyer-bail",
  ],
  [
    "Cheque Dishonour and Procedural Conditions",
    "A claim under the Negotiable Instruments Act requires careful attention to legally enforceable debt and statutory conditions. Notice and filing dates must be checked from the underlying documents.",
    "/practice-areas/cheque-bounce-ni-act",
  ],
  [
    "Commercial Contracts & Arbitration",
    "The agreement, arbitration clause, dispute and applicable legislation shape the availability of arbitration and the jurisdiction of courts. Contract language matters more than labels used by the parties.",
    "/practice-areas/arbitration-litigation",
  ],
];
export const metadata = {
  title: "Judgments and Legal Principles | Advocate Dr. Vishnu Sharma",
  description:
    "An educational guide to legal principles relevant to Indian courts and tribunals.",
};
export default function Judgments() {
  return (
    <>
      <PageBanner
        eyebrow="COURTS & JUDICIAL PRINCIPLES"
        title="Judgments & Legal Principles"
        description="A topic-based knowledge resource, not a claim of cases argued or won by this office."
        image={''}
      />
      <section className="section-pad container-site">
        <SectionHeading
          eyebrow="GENERAL LEGAL PRINCIPLES"
          title="Themes often discussed by Indian courts"
          description="These are original educational summaries of broad legal ideas. No fictitious citations or unverified case results are presented."
        />
        <div className="grid gap-7 md:grid-cols-2">
          {matters.map(([title, description, href], i) => (
            <div
              key={title}
              className="border border-[var(--theme-border)] p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <Scale className="text-gold" size={29} />
                <span className="font-serif text-3xl text-[color-mix(in_srgb,var(--theme-accent)_30%,transparent)]">
                  0{i + 1}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold">{title}</h2>
              <p className="mt-5 text-sm leading-8 text-[var(--theme-muted)]">
                {description}
              </p>
              <Link
                href={href}
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-gold"
              >
                Related Legal Service <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-12 border-l-4 border-gold bg-sand p-6 text-sm leading-8">
          Court decisions are context-dependent. This section intentionally does
          not use invented case citations or suggest that the practitioner acted
          in the matters described. Add verified case notes and official
          citations before publication.
        </p>
        <div className="mt-8">
          <Link className="btn-dark" href="/resources">
            Browse Legal Resources <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
