import Link from "next/link";
import { PageBanner } from "@/components/site/Elements";
import { getSettings, data, Team } from "@/lib/content";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
export const metadata = {
  title: "Advocate Profile | Advocate Dr. Vishnu Sharma",
};
export default async function Profile() {
  const [settings, team] = await Promise.all([
    getSettings(),
    data(Team, { published: true }),
  ]);
  const t = team[0];
  return (
    <>
      <PageBanner
        eyebrow="About the Advocate"
        title="Advocate Dr. Vishnu Sharma"
        description="Legal practice, client communication and responsible representation in Delhi."
      />
      <div className="container-site section-pad grid gap-14 lg:grid-cols-[380px_1fr]">
        <div>
          <div className="overflow-hidden border border-[var(--theme-border)] bg-sand">
            <img
              className="aspect-[4/4] w-full object-contain"
              src={
              
                "https://res.cloudinary.com/damwcqwvs/image/upload/v1792828170/advocate-vishnu-sharma/ofzrsprdafwhwdzznvzd.jpg"
              }
              alt="Professional portrait placeholder; replace with a verified image"
            />
          </div>
          <p className="mt-4 text-xs text-[var(--theme-muted)]">
            Illustration placeholder — upload the verified advocate photograph
            before launch.
          </p>
        </div>
        <article>
          <p className="kicker mb-4">Legal Counsel • New Delhi</p>
          <h2 className="display-title mb-7">Professional Approach</h2>
          <p className="mb-5 leading-8 text-[var(--theme-muted)]">
            {t?.description || settings.aboutContent}
          </p>
          <p className="mb-5 leading-8 text-[var(--theme-muted)]">
            The focus is understanding the matter, explaining the procedural
            options, identifying relevant evidence, and working within the
            applicable Indian legal framework. A website visit does not
            establish an advocate–client relationship.
          </p>
          <div className="my-9 grid gap-4 border-y border-[var(--theme-border)] py-6 md:grid-cols-2">
            {[
              "15+ years of legal practice",
              "Former Hony. Secretary Member, Bar Council of Delhi",
              "Civil, criminal and matrimonial matters",
              "Property, NRI and commercial disputes",
            ].map((x) => (
              <p key={x} className="flex items-start gap-3 text-sm text-ink">
                <CheckCircle2 size={18} className="shrink-0 text-gold" />
                {x}
              </p>
            ))}
          </div>
          <h3 className="mb-3 font-serif text-2xl">Practice Areas</h3>
          <p className="leading-8 text-[var(--theme-muted)]">
            The service catalogue includes matrimonial and family disputes,
            civil litigation, criminal defence, property and inheritance,
            corporate matters, and India-related NRI enquiries. Specific
            availability and scope are confirmed individually.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/practice-areas" className="btn-dark">
              Explore Services
            </Link>
            <Link href="/book-appointment" className="btn-gold">
              Request Consultation <ArrowUpRight size={16} />
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
