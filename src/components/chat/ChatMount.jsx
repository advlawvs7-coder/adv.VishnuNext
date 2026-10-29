"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircleQuestion } from "lucide-react";

const STORAGE_KEY = "legal-assistant-button-position";
const EDGE = 12;

const LegalChat = dynamic(() => import("./LegalChat"), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-24 left-5 z-[65] rounded-full bg-[var(--theme-dark)] px-4 py-3 text-sm text-white">
      Opening assistant…
    </div>
  ),
});

export default function ChatMount() {
  const [activated, setActivated] = useState(false);
  const [position, setPosition] = useState(null);
  const [dragging, setDragging] = useState(false);

  const buttonRef = useRef(null);
  const dragRef = useRef(null);
  const movedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const suppressTimerRef = useRef(null);

  const clampPosition = useCallback((x, y) => {
    const button = buttonRef.current;
    const width = button?.offsetWidth ?? 220;
    const height = button?.offsetHeight ?? 48;

    return {
      x: Math.max(EDGE, Math.min(x, window.innerWidth - width - EDGE)),
      y: Math.max(EDGE, Math.min(y, window.innerHeight - height - EDGE)),
    };
  }, []);

  useEffect(() => {
    let saved = null;

    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      // Ignore invalid saved position.
    }

    // Default: bottom-left, similar to the original button.
    const button = buttonRef.current;
    const width = button?.offsetWidth ?? 220;
    const height = button?.offsetHeight ?? 48;

    const initialX = Number.isFinite(saved?.x) ? saved.x : 16;

    const initialY = Number.isFinite(saved?.y)
      ? saved.y
      : window.innerHeight - height - 96;

    setPosition(clampPosition(initialX, initialY));

    const handleResize = () => {
      setPosition((current) => {
        if (!current) return current;

        const next = clampPosition(current.x, current.y);

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}

        return next;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (suppressTimerRef.current) {
        clearTimeout(suppressTimerRef.current);
      }
    };
  }, [clampPosition]);

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const rect = buttonRef.current.getBoundingClientRect();

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
    };

    movedRef.current = false;

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {}
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (!movedRef.current && Math.hypot(dx, dy) < 6) return;

    movedRef.current = true;
    setDragging(true);

    setPosition(clampPosition(drag.originX + dx, drag.originY + dy));
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setDragging(false);

    if (movedRef.current) {
      suppressClickRef.current = true;

      setPosition((current) => {
        if (current) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
          } catch {}
        }
        return current;
      });

      // Clear suppression if the browser doesn't emit a click.
      if (suppressTimerRef.current) {
        clearTimeout(suppressTimerRef.current);
      }

      suppressTimerRef.current = setTimeout(() => {
        suppressClickRef.current = false;
      }, 400);
    }

    movedRef.current = false;
  };

  const handleClick = (event) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;

      if (suppressTimerRef.current) {
        clearTimeout(suppressTimerRef.current);
      }

      event.preventDefault();
      event.stopPropagation();
      return;
    }

    setActivated(true);
  };

  if (activated) return <LegalChat initialOpen />;

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Open legal assistant"
      title="Drag to move • Click to chat"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
      className={[
        "fixed z-[65] flex items-center gap-2 rounded-full",
        "bg-[var(--theme-primary)] px-4 py-3 text-sm font-bold text-white",
        "shadow-2xl transition-shadow hover:bg-[var(--theme-dark)]",
        "select-none touch-none",
        dragging ? "cursor-grabbing" : "cursor-grab hover:-translate-y-1",
      ].join(" ")}
      style={
        position
          ? { left: position.x, top: position.y }
          : { left: 16, bottom: 96 }
      }
    >
      <MessageCircleQuestion size={20} />
      Ask Legal Question
    </button>
  );
}
