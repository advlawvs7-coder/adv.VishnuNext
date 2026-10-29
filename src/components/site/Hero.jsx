"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight, Scale, Globe2, MapPin, ShieldCheck, CalendarDays } from "lucide-react";
import { asset, safeHref } from "@/lib/utils";
export default function Hero({ slides = [], settings = {} }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const clock = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(clock);
  }, [paused, slides.length]);
  const slide = slides[index] || {
    title: settings.brandName || "Advocate Dr. Vishnu Sharma",
    subtitle: settings.tagline || "Legal guidance in Delhi",
    ctaText: "Explore Legal Services", ctaHref: "/practice-areas",
  };
  const move = (value) => slides.length && setIndex((value + slides.length) % slides.length);
  const stats = [
    [settings.experienceLabel || "15+ Years", "Legal practice", Scale],
    [settings.locationText || "New Delhi", "Office location", MapPin],
    ["India & NRI", "Legal enquiries", Globe2],
  ];
  const ticker = ["Matrimonial & Family Law", "NRI Property", "Civil Litigation", "Criminal Defence", "Wills & Succession", "Arbitration", "Legal Consultation"];
  return (
    <section
      className="v9-home-carousel"
      aria-roledescription="carousel"
      aria-label="Homepage introduction"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="v9-home-stage">
        <img
          key={`photo-${index}`}
          src={asset(slide.image || "/images/legal-architecture.svg")}
          alt=""
          aria-hidden="true"
          className="v9-home-photo"
          fetchPriority={index === 0 ? "high" : undefined}
        />
        <div className="container-site v9-home-content v9-home-content-right">
          <div className="v9-home-copy v9-enter-right" key={`copy-${index}`}>
            <span className="v9-banner-kicker inline-flex items-center gap-2">
              <Scale size={15} />
              {slide.eyebrow || "ADVOCATE DR. VISHNU SHARMA"}
            </span>
            <h1 className="v9-home-title">{slide.title}</h1>
            <p className="v9-home-subtitle">{slide.subtitle}</p>
            <div className="v9-home-actions">
              <Link
                className="btn-gold"
                href={safeHref(slide.ctaHref || "/practice-areas")}
              >
                {slide.ctaText || "Explore Services"}
                <ArrowUpRight size={17} />
              </Link>
              <Link className="btn-soft" href="/book-appointment">
                <CalendarDays size={16} /> Book Appointment
              </Link>
            </div>
            <div className="v9-slider-controls" aria-label="Slider controls">
              <button
                type="button"
                className="v8-slider-arrow"
                aria-label="Previous banner"
                onClick={() => move(index - 1)}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                className="v8-slider-arrow"
                aria-label="Next banner"
                onClick={() => move(index + 1)}
              >
                <ArrowRight size={16} />
              </button>
              <span className="v9-slide-number">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(Math.max(1, slides.length)).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5">
                {slides.map((s, i) => (
                  <button
                    type="button"
                    key={s._id || i}
                    onClick={() => move(i)}
                    className={`v8-slide-dot ${i === index ? "is-active" : ""}`}
                    aria-label={`Show banner ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="v9-home-info v9-enter-up" id="who-we-are">
            <div className="v9-home-about">
              <span className="v9-about-label">
                <ShieldCheck size={16} /> WHO WE ARE
              </span>
              <span className="v9-about-summary">
                {settings.aboutTitle ||
                  "Personal attention. Professional legal counsel."}
              </span>
              <Link
                href="/about"
                aria-label="Read about the practice"
                className="v9-about-arrow"
              >
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="v9-home-stats">
              {stats.map(([value, label, Icon]) => (
                <div className="v9-home-stat" key={label}>
                  <Icon aria-hidden="true" size={17} />
                  <span className="v9-stat-text">
                    <strong>{value}</strong>
                    <small>{label}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className="marquee-rail v9-marquee-rail"
        aria-label="Types of legal services"
      >
        <div className="marquee-track">
          {[0, 1].flatMap((repeat) =>
            ticker.map((t) => (
              <span
                key={`${repeat}-${t}`}
                className="inline-flex items-center gap-3"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--theme-primary)]" />
                {t}
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
