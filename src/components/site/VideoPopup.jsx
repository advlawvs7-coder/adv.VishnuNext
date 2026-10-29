"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Play, ArrowRight, X } from "lucide-react";

function getEmbedUrl(url = "") {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    let id = "";

    if (hostname === "youtu.be" || hostname === "www.youtu.be") {
      id = parsed.pathname.split("/").filter(Boolean)[0];
    } else if (
      hostname === "youtube.com" ||
      hostname === "www.youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "youtube-nocookie.com" ||
      hostname === "www.youtube-nocookie.com"
    ) {
      id =
        parsed.searchParams.get("v") ||
        parsed.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] ||
        "";
    }

    return /^[a-zA-Z0-9_-]{11}$/.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`
      : "";
  } catch {
    return "";
  }
}

export default function VideoCardPlayer({
  youtubeUrl,
  title = "Video",
  compact = false,
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const closePopup = useCallback(() => setOpen(false), []);

  const embedUrl = getEmbedUrl(youtubeUrl);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const currentPadding =
      parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }

    body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePopup();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [open, closePopup]);

  const popup = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePopup();
        }
      }}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-white/15 bg-[#080d18] shadow-2xl"
        style={{
          transform: "none",
          animation: "none",
          transition: "none",
        }}
      >
        <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
          <h2 className="min-w-0 flex-1 truncate text-sm font-semibold text-white sm:text-base">
            {title}
          </h2>

          <button
            type="button"
            onClick={closePopup}
            aria-label="Close video"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="absolute inset-0 h-full w-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              Invalid YouTube URL.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {compact ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-ink)]"
        >
          View Video <ArrowRight size={14} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Play ${title}`}
          className="absolute inset-0 z-10 grid w-full place-items-center"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-[var(--theme-primary)] text-white shadow-xl transition-transform group-hover:scale-110">
            <Play fill="currentColor" size={19} />
          </span>
        </button>
      )}

      {mounted && open && createPortal(popup, document.body)}
    </>
  );
}
