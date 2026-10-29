import { data, Team } from "@/lib/content";
import { PageBanner } from "@/components/site/Elements";
import { asset } from "@/lib/utils";
export const metadata = {
  title: "Advocate Profile & Team | Dr. Advocate Vishnu Sharma",
};
export default async function TeamPage() {
  const people = await data(Team, { published: true }, { sort: { order: 1 } });
  return (
    <>
      <PageBanner
        title="Advocate & Team"
        description="The individuals and professional background of the practice."
      />
      <section className="section-pad container-site grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {people.map((p) => (
          <article key={p._id} className="border border-themeBorder">
            <img
              src={asset(p.image, "/images/portrait-placeholder.svg")}
              alt={`Portrait of ${p.name} (placeholder image if not yet uploaded)`}
              className="h-[330px] w-full bg-sand object-cover"
            />
            <div className="p-7">
              <h2 className="font-serif text-2xl font-bold">{p.name}</h2>
              <p className="mt-2 font-bold text-gold">{p.designation}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--theme-muted)]">
                {p.description}
              </p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
