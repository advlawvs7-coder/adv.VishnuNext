import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Scale,
  HeartHandshake,
  Users,
  Shield,
  Globe,
  Building2,
  ScrollText,
  ShieldCheck,
  Landmark,
  FileCheck2,
  HandCoins,
  BriefcaseBusiness,
  BookOpen,
  ChevronRight,
  Gavel,
  Play,
  Clock,
  CalendarDays,
  MoveUpRight,
} from "lucide-react";
import { asset, ytId } from "@/lib/utils";
import MotionSurface from "./MotionSurface";
import { topicImage } from "@/lib/topic-image";
import VideoCardPlayer from "./VideoPopup";
const icons = {
  scale: Scale,
  "heart-handshake": HeartHandshake,
  users: Users,
  shield: Shield,
  globe: Globe,
  "building-2": Building2,
  "scroll-text": ScrollText,
  "shield-check": ShieldCheck,
  landmark: Landmark,
  "file-check-2": FileCheck2,
  "hand-coins": HandCoins,
  "briefcase-business": BriefcaseBusiness,
};
const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}) {
  return (
    <div className={`mb-11 ${center ? "mx-auto max-w-3xl text-center" : ""}`}>
      <div
        className="mb-4 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.23em] text-[var(--theme-ink)] "
        style={center ? { justifyContent: "center" } : {}}
      >
        <span className="h-[2px] w-8 bg-gradient-to-r from-primary to-accent" />
        {eyebrow}
      </div>
      <h2 className="display-title max-w-4xl" >{title}</h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-8 text-[var(--theme-muted)] ${center ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
export function ServiceCard({ service }) {
  const Icon = icons[service.icon] || Scale;
  return (
    <MotionSurface>
      <Link
        href={`/practice-areas/${service.slug}`}
        className="spectrum-card group flex min-h-[335px] flex-col p-7"
      >
        <div className="absolute right-0 top-0 h-28 w-54 overflow-hidden rounded-bl-[60px]  transition group-hover:scale-110 group-hover:opacity-[.50]">
          <img
            src={service.image || topicImage(service.title, service.category)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative mb-6 flex items-start justify-between">
          <span className="accent-icon flex h-14 w-14 items-center justify-center rounded-2xl">
            <Icon size={27} strokeWidth={1.65} />
          </span>
          <ArrowUpRight
            size={19}
            className="opacity-30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
          />
        </div>
        <h3 className="mb-3 font-serif text-[22px] font-bold leading-snug text-[var(--theme-ink)] transition-colors">
          {service.title}
        </h3>
        <p className="mb-6 line-clamp-3 text-[13px] leading-7 text-[var(--theme-muted)]">
          {service.summary}
        </p>
        <span className="accent-link mt-auto inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest">
          Explore Service{" "}
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-2"
          />
        </span>
      </Link>
    </MotionSurface>
  );
}
export function PostCard({ post }) {
  return (
    <MotionSurface>
      <Link
        href={`/blog/${post.slug}`}
        className="editorial-card group block border border-[var(--theme-border)] bg-white shadow-sm"
      >
        <div className="relative h-56 overflow-hidden bg-[var(--theme-tint)]">
          <img
            src={asset(post.coverImage)}
            alt={`Illustrative image for ${post.title}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-4 left-4 rounded-lg border border-[var(--theme-border)] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--theme-ink)]">
            {post.category || "Legal Insights"}
          </div>
        </div>
        <div className="p-7">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold text-[var(--theme-ink)]">
            <CalendarDays size={13} />
            {!isNaN(new Date(post.publishedAt || post.createdAt).getTime())
              ? new Date(post.publishedAt || post.createdAt).toLocaleDateString(
                  "en-IN",
                  { month: "long", year: "numeric" },
                )
              : "Legal article"}{" "}
            <span className="mx-2 text-slate-300">•</span> 5 min read
          </p>
          <h3 className="min-h-[59px] font-serif text-[22px] font-bold leading-[1.36] text-[var(--theme-ink)] transition-colors group-hover:text-[var(--theme-ink)]">
            {post.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-[13px] leading-7 text-[var(--theme-muted)]">
            {post.excerpt}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-[var(--theme-ink)]">
            Read Full Article{" "}
            <ArrowUpRight
              size={17}
              className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        </div>
      </Link>
    </MotionSurface>
  );
}

export function VideoCard({ video }) {
  const id = ytId(video.youtubeUrl);
  const slug = video.slug || slugify(video.title);
  const thumbnail =
    getYouTubeThumbnail(video.youtubeUrl) || asset(video.thumbnail);

  return (
    <MotionSurface>
      <article className="editorial-card group overflow-hidden rounded-xl border border-[var(--theme-border)] bg-white shadow-sm transition hover:shadow-md">
        <div className="relative aspect-[16/8] overflow-hidden bg-[var(--theme-dark)]">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`${video.title} video thumbnail`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[var(--theme-tint)]">
              <Film size={30} className="text-[var(--theme-primary)]" />
            </div>
          )}

          {id ? (
            <VideoCardPlayer
              youtubeUrl={video.youtubeUrl}
              title={video.title}
            />
          ) : (
            <Link
              href={`/videos/${slug}`}
              aria-label={`Open ${video.title} topic guide`}
              className="absolute inset-0 z-10 grid place-items-center"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--theme-primary)] text-white shadow-lg">
                <Play fill="currentColor" size={15} />
              </span>
            </Link>
          )}

          <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-white px-2 py-1 text-[9px] font-bold uppercase text-[var(--theme-ink)]">
            {id
              ? video.sourcePublisher
                ? `External: ${video.sourcePublisher}`
                : "Watch video"
              : "Demo explainer"}
          </span>
        </div>

        <div className="p-3">
          <h3 className="line-clamp-2 font-serif text-sm font-bold leading-5 text-[var(--theme-ink)]">
            {video.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[var(--theme-muted)]">
            {video.description}
          </p>

          {video.sourcePublisher && (
            <p className="mt-1 truncate text-[9px] font-bold uppercase text-[var(--theme-ink)]">
              Publisher: {video.sourcePublisher}
            </p>
          )}

          <div className="mt-2">
            {id ? (
              <VideoCardPlayer
                youtubeUrl={video.youtubeUrl}
                title={video.title}
                compact
              />
            ) : (
              <Link
                href={`/videos/${slug}`}
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[var(--theme-ink)]"
              >
                Open Topic Guide <ArrowRight size={12} />
              </Link>
            )}
          </div>
        </div>
      </article>
    </MotionSurface>
  );
}

export function PageBanner({ eyebrow, title, description, image }) {
  const bannerSrc = asset(image || topicImage(title, eyebrow));
  return (
    <section className="v8-page-banner v9-page-banner" aria-label={`${title} page introduction`}>
      <img
        src={bannerSrc}
        alt=""
        aria-hidden="true"
        className="v9-banner-photo"
        loading="eager"
        fetchPriority="high"
      />
      <div className="container-site v9-banner-shell">
        <div className="v9-page-content v9-rise-enter">
          <p className="v9-banner-kicker">{eyebrow || "ADVOCATE DR. VISHNU SHARMA"}</p>
          <h1 className={`v9-banner-title ${String(title || "").length > 58 ? "v9-banner-title-long" : ""}`}>{title}</h1>
          {description && <p className="v9-banner-description">{description}</p>}
          <nav aria-label="Breadcrumb" className="v9-banner-breadcrumb">
            <Link href="/" className="v9-text-link">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="min-w-0 truncate" title={title}>{title}</span>
          </nav>
        </div>
      </div>
      <span className="v9-banner-bottom-rule" aria-hidden="true" />
    </section>
  );
}
export function BreadcrumbSide({ services }) {
  return (
    <aside className="space-y-7">
      <div className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-white p-7 shadow-sm">
        <h3 className="mb-5 border-b border-themeBorder pb-5 font-serif text-2xl font-bold">
          Explore Other Services
        </h3>
        <div className="max-h-[460px] overflow-y-auto pr-2">
          {services.slice(0, 22).map((s) => (
            <Link
              key={s.slug}
              href={`/practice-areas/${s.slug}`}
              className="group flex items-center justify-between gap-3 border-b border-themeBorder py-3.5 text-sm text-[var(--theme-muted)] transition hover:translate-x-1 hover:text-[var(--theme-ink)]"
            >
              <span>{s.title}</span>
              <ArrowUpRight size={14} className="shrink-0" />
            </Link>
          ))}
        </div>
        <Link
          href="/practice-areas"
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--theme-ink)]"
        >
          All practice areas <ArrowRight size={15} />
        </Link>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-[var(--theme-dark)] via-[var(--theme-dark)] to-[var(--theme-primary)] p-8 text-white shadow-xl">
        <Gavel className="mb-5 text-[var(--theme-accent-light)]" size={39} />
        <h3 className="font-serif text-3xl">Need legal guidance?</h3>
        <p className="mt-4 text-sm leading-8 text-slate-200">
          Request a consultation to discuss your situation, documents and
          available legal options.
        </p>
        <Link href="/book-appointment" className="btn-gold mt-7">
          Request Consultation <MoveUpRight size={16} />
        </Link>
      </div>
    </aside>
  );
}

function getYouTubeThumbnail(url) {
  const id = ytId(url);

  if (!id) return "";

  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
