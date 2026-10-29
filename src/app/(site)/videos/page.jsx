import { data, Section, Video } from "@/lib/content";
import { PageBanner } from "@/components/site/Elements";
import VideoLibrary from "@/components/site/VideoLibrary";
export const metadata = {
  title: "Legal Awareness Videos & Topic Guides | Dr. Advocate Vishnu Sharma",
  description:
    "Browse legal topic videos and text explainers about family, property, NRI, criminal and Indian legal procedures.",
};
export default async function VideosPage() {
  const items = await data(Video, { published: true }, { sort: { order: 1 } });
  const sections = await data(
      Section,
      {
        sectionKey: "videos",
        enabled: true,
      },
      { sort: { order: 1 }, limit: 1 },
    );
  
    const video = sections[0];
  return (
    <>
      <PageBanner
        eyebrow={video?.eyebrow ||"LEGAL EDUCATION"}
        title={video?.title || "Videos & Legal Explainers"}
        description={video?.description || "Search our topics, open a complete guide, and watch official recordings when they are available."}
        image={video?.image}
      />
      <section className="section-pad container-site">
        <VideoLibrary videos={items} />
      </section>
    </>
  );
}
