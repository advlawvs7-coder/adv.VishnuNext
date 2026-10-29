"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function Disclaimer({ text }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      setVisible(sessionStorage.getItem("avs_disclaimer_ack") !== "yes");
    } catch {
      setVisible(true);
    }
  }, []);
  function agree() {
    try {
      sessionStorage.setItem("avs_disclaimer_ack", "yes");
    } catch {}
    setVisible(false);
  }
  if (!visible) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Website disclaimer"
      className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-lg bg-white p-7 shadow-2xl sm:p-10">
        <p className="kicker mb-3">Professional Disclaimer</p>
        <h2 className="mb-4 font-serif text-3xl text-ink">
          Important information
        </h2>
        <p className="mb-6 text-sm leading-7 text-[var(--theme-muted)]">
          {text ||
            "The information on this website is for general awareness and does not constitute solicitation, advertisement or legal advice. No advocate-client relationship is created by visiting the website."}
        </p>
        <p className="mb-7 text-xs text-[var(--theme-muted)]">
          By selecting “I Agree”, you confirm that you are seeking information
          voluntarily and understand the disclaimer.{" "}
          <Link
            href="/pages/disclaimer"
            className="text-gold underline"
            onClick={agree}
          >
            Read full disclaimer
          </Link>
          .
        </p>
        <button onClick={agree} className="btn-dark w-full">
          I Agree & Continue
        </button>
      </div>
    </div>
  );
}
