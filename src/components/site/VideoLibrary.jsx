"use client";

import { useMemo, useState } from "react";
import { Search, PlayCircle, Film, X, ExternalLink, ArrowRight } from "lucide-react";
import { VideoCard } from "./Elements";
import { ytId } from "@/lib/utils";
import ClientPager from "./ClientPager";

export default function VideoLibrary({ videos = [] }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
const getYouTubeThumbnail = (url) => {
  const id = ytId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};
  const matched = useMemo(
    () =>
      videos.filter(
        (v) =>
          (tab === "all" ||
            (tab === "videos"
              ? Boolean(ytId(v.youtubeUrl))
              : !ytId(v.youtubeUrl))) &&
          [v.title, v.description, v.content].some((x) =>
            String(x || "")
              .toLowerCase()
              .includes(query.toLowerCase()),
          ),
      ),
    [query, tab, videos],
  );

  const total = Math.max(1, Math.ceil(matched.length / 9));
  const current = Math.min(total, page);
  const visibleVideos = matched.slice((current - 1) * 9, current * 9);

  const openVideo = (video) => {
    const id = ytId(video.youtubeUrl);
    if (id) setSelectedVideo({ ...video, videoId: id });
  };

  return (
    <>
      <div className="mb-10 rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 md:p-9">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="stylish-badge">
              <Film size={14} /> Multimedia library
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold text-[var(--theme-ink)]">
              Browse video topics & explainers
            </h2>

            <p className="mt-3 text-sm leading-7 text-[var(--theme-muted)]">
              Click a recording to play it here, or open it on YouTube. Written
              guides remain available separately.
            </p>
          </div>

          <div className="flex items-center gap-3 self-center rounded-2xl bg-[var(--theme-dark)] p-5 text-white">
            <PlayCircle size={28} />
            <div>
              <strong className="block text-2xl">{videos.length}</strong>
              <span className="text-xs">Library entries</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative">
            <Search
              className="absolute left-4 top-3.5 text-[var(--theme-ink)]"
              size={19}
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              type="search"
              placeholder="Search by legal subject or title..."
              className="field h-12 rounded-xl pl-12"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All Topics"],
              ["videos", "Recordings"],
              ["guides", "Demo Guides"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setTab(value);
                  setPage(1);
                }}
                className={`rounded-xl px-4 py-3 text-xs font-extrabold transition ${
                  tab === value
                    ? "bg-[var(--theme-dark)] text-white shadow-lg"
                    : "border border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-ink)] hover:bg-[var(--theme-tint)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-7 text-sm text-[var(--theme-muted)]">
        Showing{" "}
        <strong className="text-[var(--theme-ink)]">{matched.length}</strong> of{" "}
        {videos.length} topics
      </p>

      <div
        id="listing-start"
        className="grid scroll-mt-32 gap-7 md:grid-cols-2 lg:grid-cols-3"
      >
        {visibleVideos.map((video) => {
          const videoId = ytId(video.youtubeUrl);
          const thumbnail = getYouTubeThumbnail(video.youtubeUrl);

          return (
            <div
              key={video._id || video.slug || video.title}
              className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] shadow-sm"
            >
              <button
                type="button"
                onClick={() => openVideo(video)}
                disabled={!videoId}
                aria-label={`Play ${video.title}`}
                className="group relative block aspect-video w-full overflow-hidden bg-neutral-900"
              >
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={`${video.title} video thumbnail`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[var(--theme-tint)]">
                    <Film size={42} className="text-[var(--theme-primary)]" />
                  </div>
                )}

                {videoId && (
                  <span className="absolute inset-0 flex items-center justify-center bg-red/10 transition group-hover:bg-black/30">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition group-hover:scale-110">
                      <PlayCircle size={34} />
                    </span>
                  </span>
                )}
              </button>

              <div className="p-5">
                <h3 className="text-lg font-bold text-[var(--theme-ink)]">
                  {video.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--theme-muted)]">
                  {video.description ||
                    video.content ||
                    "Explore this legal topic."}
                </p>

                {videoId ? (
                  <button
                    type="button"
                    onClick={() => openVideo(video)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--theme-primary)] px-4 py-3 text-sm font-bold text-white hover:opacity-90"
                  >
                    <PlayCircle size={18} />
                    Play Video
                  </button>
                ) : (
                  <a
                    href={video.slug ? `/media/${video.slug}` : "/media"}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[var(--theme-border)] px-4 py-3 text-sm font-bold text-[var(--theme-ink)]"
                  >
                    Read Guide <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ClientPager page={current} total={total} onChange={setPage} />

      {!matched.length && (
        <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-tint)] p-16 text-center text-sm text-[var(--theme-muted)]">
          No matching topics in this category.
        </div>
      )}

      {selectedVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedVideo.title || "Video player"}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedVideo(null);
            }
          }}
        >
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl">
            <div className="flex items-center justify-between gap-4 bg-neutral-900 px-4 py-3 text-white">
              <h3 className="min-w-0 truncate text-sm font-bold sm:text-base">
                {selectedVideo.title}
              </h3>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700 sm:text-sm"
                >
                  <ExternalLink size={15} />
                  <span className="hidden sm:inline">Open YouTube</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  aria-label="Close video player"
                  className="rounded-lg p-2 hover:bg-white/10"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                key={selectedVideo.videoId}
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?autoplay=1&controls=1&rel=0&playsinline=1`}
                title={selectedVideo.title || "YouTube video"}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
