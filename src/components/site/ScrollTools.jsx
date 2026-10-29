"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
export default function ScrollTools() {
  const pathname = usePathname(),
    [percent, setPercent] = useState(0),
    [visible, setVisible] = useState(false);
  useEffect(() => {
    const check = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPercent(
        total > 0
          ? Math.min(100, Math.round((window.scrollY / total) * 100))
          : 0,
      );
      setVisible(window.scrollY > 430);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);
  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[90] h-px bg-transparent"
        role="progressbar"
        aria-label="Page reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div
          className="h-full bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-accent)] to-[var(--theme-primary)] shadow-md transition-[width] duration-100"
          style={{ width: `${percent}%` }}
        />
      </div>
      <button
        type="button"
        aria-label="Back to top"
        title="Back to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          })
        }
        className={`v8-scroll-top fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[var(--theme-dark)] text-white shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-[var(--theme-dark)] sm:right-8 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"}`}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
