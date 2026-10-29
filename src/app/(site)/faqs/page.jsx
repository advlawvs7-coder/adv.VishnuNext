import { data, FAQ, Section } from "@/lib/content";
import { PageBanner } from "@/components/site/Elements";
import FaqExplorer from "@/components/site/FaqExplorer";
export const metadata = {
  title: "NRI & Legal FAQs | Advocate Dr. Vishnu Sharma",
  description: "Browse or search 50+ legal questions by category.",
};
export default async function FAQPage() {
  const items = await data(
    FAQ,
    { published: true },
    { sort: { order: 1 }, limit: 300 },
  );

   const sections = await data(
     Section,
     {
       sectionKey: "faqs",
       enabled: true,
     },
     { sort: { order: 1 }, limit: 1 },
   );   
  const faq = sections[0];
  
  return (
    <>
      <PageBanner
        eyebrow={faq?.eyebrow || "Knowledge Base"}
        title={faq?.title || "Legal Questions, Clearly Organised"}
        description={faq?.description || "Browse frequently asked questions about NRI legal matters, property, inheritance, matrimonial law, immigration and court procedure."}
        image={faq?.image || ""}
      />
      <section className="section-pad container-site">
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {[
            [String(items.length), "Frequently asked questions"],
            [
              String(new Set(items.map((x) => x.category || "General")).size),
              "Legal knowledge categories",
            ],
            ["24/7", "Self-service reading access"],
          ].map(([n, t]) => (
            <div key={t} className="spectrum-card p-7">
              <p className="font-serif text-4xl font-bold text-[var(--theme-ink)]">
                {n}
              </p>
              <p className="mt-3 text-sm font-semibold text-[var(--theme-muted)]">
                {t}
              </p>
            </div>
          ))}
        </div>
        <FaqExplorer items={items} />
      </section>
    </>
  );
}
