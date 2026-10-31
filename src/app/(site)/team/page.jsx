import { data, Team } from "@/lib/content";
import { PageBanner } from "@/components/site/Elements";
import TeamSearch from "@/components/site/TeamSearch";

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
        image={
          "https://res.cloudinary.com/damwcqwvs/image/upload/v1793351420/3.jpg"
        }
      />

      <section className="section-pad container-site">
        <TeamSearch people={JSON.parse(JSON.stringify(people))} />
      </section>
    </>
  );
}
