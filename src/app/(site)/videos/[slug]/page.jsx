import Link from "next/link";
import { notFound } from "next/navigation";
import RichContent from "@/components/site/RichContent";
import {
  ArrowLeft,
  ArrowRight,
  PlayCircle,
  BookOpen,
  Info,
} from "lucide-react";
import { Video, data } from "@/lib/content";
import { PageBanner, VideoCard } from "@/components/site/Elements";
import { asset, ytId } from "@/lib/utils";
const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const all = await data(Video, { published: true });
  const v = all.find((x) => (x.slug || slugify(x.title)) === slug);
  return {
    title: v ? `${v.title} | Legal Awareness` : "Video not found",
    description: v?.description || "",
  };
}
export default async function VideoDetail({ params }) {
  const { slug } = await params;
  const all = await data(Video, { published: true }, { sort: { order: 1 } });
  const video = all.find((x) => (x.slug || slugify(x.title)) === slug);
  if (!video) notFound();
  const yt = ytId(video.youtubeUrl);
  return (
    <>
      <PageBanner
        eyebrow="Legal Video & Topic Guide"
        title={video.title}
        description={video.description}
      />
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1fr_315px]">
        <article>
          <div className="relative mb-9 overflow-hidden rounded-2xl bg-[var(--theme-dark)] shadow-2xl">
            {yt ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${yt}`}
                title={video.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full"
              />
            ) : (
              <div className="relative aspect-video">
                <img
                  src={asset(video.thumbnail)}
                  alt={`Illustrative topic cover: ${video.title}`}
                  className="h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/40">
                  <div className="text-center text-white">
                    <BookOpen
                      size={50}
                      className="mx-auto mb-4 text-[var(--theme-accent-light)]"
                    />
                    <p className="font-serif text-2xl font-bold">
                      Written demo explainer
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      No uploaded recording for this topic yet
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {video.sourcePublisher && (
            <div className="mb-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-4 text-sm font-semibold text-[var(--theme-ink)]">
              Original publisher: {video.sourcePublisher} · External educational
              material · Not created or endorsed by this office
            </div>
          )}
          <div className="mb-9 flex items-start gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-5 text-sm leading-7 text-[var(--theme-ink)]">
            <Info size={21} className="mt-1 shrink-0" />
            <p>
              These preview entries illustrate how video pages appear. Videos
              from outside publishers are attributed to their publishers and do
              not imply any connection or endorsement. Add your own official
              videos in the admin dashboard. The accompanying written
              information is general, not case-specific legal advice.
            </p>
          </div>
          <div className="prose-content">
            <RichContent content={video.content || video.description} />
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={video.relatedHref || "/practice-areas"}
              className="btn-gold"
            >
              Related Legal Service <ArrowRight size={17} />
            </Link>
            <Link href="/videos" className="btn-dark">
              <ArrowLeft size={16} /> All Videos
            </Link>
          </div>
        </article>
        <aside>
          <h2 className="mb-6 font-serif text-2xl font-bold">
            More legal explainers
          </h2>
          <div className="space-y-5">
            {all
              .filter((x) => x.title !== video.title)
              .slice(0, 4)
              .map((v) => (
                <VideoCard key={v.title} video={v} />
              ))}
          </div>
        </aside>
      </div>
    </>
  );
}
