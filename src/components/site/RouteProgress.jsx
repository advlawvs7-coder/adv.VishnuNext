"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
/** A visible response to click immediately; Suspense loading JSX handles slow server routes. */
export default function RouteProgress() {
  const path = usePathname(); const search = useSearchParams();
  const [pending, setPending] = useState(false);
  useEffect(() => { setPending(false); }, [path, search]);
  useEffect(() => {
    let timeout;
    const click = e => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const href = new URL(link.href, location.href);
      if (href.origin !== location.origin || href.protocol !== location.protocol || href.pathname + href.search === location.pathname + location.search) return;
      setPending(true);
      clearTimeout(timeout); timeout = setTimeout(() => setPending(false), 18000);
    };
    document.addEventListener("click", click, true);
    return () => { document.removeEventListener("click", click, true); clearTimeout(timeout); };
  }, []);
  return pending ? <div className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[3px] overflow-hidden bg-[var(--theme-tint)]" role="progressbar" aria-label="Navigating to page"><div className="h-full w-[45%] animate-[route-loading_1.2s_ease-in-out_infinite] bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-accent)] to-[var(--theme-primary)]" /></div> : null;
}
