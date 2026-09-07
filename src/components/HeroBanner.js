// components/HeroBanner.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function HeroBanner() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1920", // Replace with real photo later
      title: "Advocate Dr. Vishnu Sharma",
      subtitle: "Enrolled Since 2009 • 17+ Years of Practice",
      description:
        "Experienced counsel for civil, criminal, matrimonial and commercial matters before the High Court of Delhi and District Courts.",
      ctaText: "Get Consultation",
      ctaLink: "/contact",
    },
    {
      image:
        "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&q=80&w=1920",
      title: "Leadership Built on Service",
      subtitle: "Former Co-Chairman & Hony. Secretary, BCD",
      description:
        "Former Co-Chairman (2020–2022) and Honorary Secretary (2018–2020), Bar Council of Delhi, with a continuing commitment to advocate welfare.",
      ctaText: "View Practice Areas",
      ctaLink: "/#practice-areas",
    },
    {
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1920",
      title: "LAWVS Legal India",
      subtitle: "Managing Director • LAWVS Legal India Pvt Ltd",
      description:
        "Leading full-service legal advisory, corporate compliance and dispute management across major Indian commercial hubs and international jurisdictions.",
      ctaText: "Read Our Blogs",
      ctaLink: "/blogs",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-play Slider Logic: Har 5 second me change hoga
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] bg-slate-950 overflow-hidden">
      {/* 1. SLIDER IMAGES (Smooth Fade Animation) */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Dark Vignette Overlay for Luxury Look */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-out scale-105"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95) 30%, rgba(15, 23, 42, 0.4) 70%, rgba(15, 23, 42, 0.8)), url(${slide.image})`,
              transform: index === current ? "scale(1)" : "scale(1.05)",
            }}
          />

          {/* 2. DYNAMIC TEXT CONTENT (Staggered Motion Effects) */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
                {/* Subtitle Badge with sliding delay */}
                <span
                  className={`inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded transition-all duration-700 delay-100 ${
                    index === current
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {slide.subtitle}
                </span>

                {/* Big Heading with cinematic animation */}
                <h1
                  className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight transition-all duration-700 delay-300 ${
                    index === current
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  {slide.title}
                </h1>

                {/* Description Text */}
                <p
                  className={`text-sm sm:text-lg text-slate-300 leading-relaxed transition-all duration-700 delay-500 ${
                    index === current
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  {slide.description}
                </p>

                {/* Animated Call-to-Action Button */}
                <div
                  className={`pt-4 transition-all duration-700 delay-700 ${
                    index === current
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center bg-amber-500 text-slate-900 font-bold px-6 py-3 sm:px-8 sm:py-3.5 rounded shadow-lg hover:bg-amber-400 transition-all duration-300 transform hover:-translate-y-0.5 uppercase tracking-wider text-xs sm:text-sm"
                  >
                    {slide.ctaText} <span className="ml-2 font-bold">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 3. ULTRA-CLEAN CONTROLLER BUTTONS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-amber-500 hover:text-slate-900 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm group"
        aria-label="Previous Slide"
      >
        <HiOutlineChevronLeft
          size={20}
          className="group-hover:scale-110 transition-transform"
        />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-amber-500 hover:text-slate-900 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm group"
        aria-label="Next Slide"
      >
        <HiOutlineChevronRight
          size={20}
          className="group-hover:scale-110 transition-transform"
        />
      </button>

      {/* 4. MOTION PROGRESS INDICATORS (BOTTOM DOTS) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === current
                ? "w-8 bg-amber-500"
                : "w-2 bg-slate-600 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
