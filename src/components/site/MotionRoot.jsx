"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Dependency-free viewport motion with accessible reduced-motion support. */
export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector("main");

    if (!root) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      root
        .querySelectorAll(".motion-reveal, .premium-reveal")
        .forEach((el) => el.classList.add("motion-visible"));

      return;
    }

    const elements = root.querySelectorAll(".motion-reveal, .premium-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -25px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
