import { PageBanner } from "@/components/site/Elements";
import Link from "next/link";
import { Landmark, ArrowUpRight } from "lucide-react";
export const metadata = {
  title: "Courts and Tribunals | Advocate Dr. Vishnu Sharma",
};
const courts = [
  [
    "Delhi High Court",
    "Writ proceedings, appeals and matters within its jurisdiction.",
  ],
  [
    "District & Family Courts",
    "Civil, matrimonial, custody and other matters subject to the appropriate forum.",
  ],
  [
    "Criminal Courts",
    "Bail applications and criminal-case stages before competent courts.",
  ],
  [
    "Consumer Commissions",
    "Consumer disputes subject to statutory jurisdiction.",
  ],
  [
    "Arbitral Tribunals",
    "Arbitration proceedings where an arbitration agreement or legal basis applies.",
  ],
  [
    "NCLT & Other Tribunals",
    "Statutory matters within the jurisdiction of a tribunal.",
  ],
];
export default function Courts() {
  return (
    <>
      <PageBanner
        eyebrow="Court Practice"
        title="Courts & Tribunals"
        description="The appropriate forum always depends on the nature, location and procedural status of a dispute."
      />
      <section className="section-pad container-site">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courts.map(([t, d]) => (
            <div
              key={t}
              className="border border-[var(--theme-border)] bg-white p-8"
            >
              <Landmark className="mb-6 text-gold" size={32} />
              <h2 className="font-serif text-2xl font-bold">{t}</h2>
              <p className="mt-4 text-sm leading-8 text-[var(--theme-muted)]">
                {d}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-[var(--theme-muted)]">
          This informational directory is not a claim of admission or
          availability in every listed forum. Representation and local counsel
          arrangements are confirmed case by case.
        </p>
        <Link href="/book-appointment" className="btn-dark mt-7">
          Request Consultation <ArrowUpRight size={16} />
        </Link>
      </section>
    </>
  );
}
