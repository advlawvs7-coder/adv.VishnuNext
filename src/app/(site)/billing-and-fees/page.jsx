import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { PageBanner } from "@/components/site/Elements";
import { Page, Section, one } from "@/lib/content";
export const metadata = {
  title: "Billing & Fees | Advocate Dr. Vishnu Sharma",
};
export default async function Billing() {
  const p = await one(Page, { slug: "billing-and-fees", published: true });
  const sections = await data(
      Section,
      {
        sectionKey: "blog",
        enabled: true,
      },
      { sort: { order: 1 }, limit: 1 },
    );
  
    const blog = sections[0];
  return (
    <>
      <PageBanner
        eyebrow="Important Information"
        title="Billing & Fees"
        description="Understanding fee structures and professional engagement terms."
      />
      <section className="section-pad container-site grid gap-12 lg:grid-cols-[1fr_320px]">
        <article className="prose-content">
          <ReactMarkdown>
            {p?.content ||
              "Professional fees are discussed before an engagement is agreed. The amount and structure depend on the work and scope involved."}
          </ReactMarkdown>
        </article>
        <aside className="h-fit bg-sand p-7">
          <h2 className="font-serif text-2xl font-bold">Discuss Your Matter</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--theme-muted)]">
            Arrange a preliminary appointment to discuss relevant work and
            terms. No fixed fee or outcome is implied.
          </p>
          <Link href="/book-appointment" className="btn-dark mt-6">
            Book Appointment
          </Link>
        </aside>
      </section>
    </>
  );
}
