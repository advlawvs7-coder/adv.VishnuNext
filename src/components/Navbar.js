"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTimes,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineArrowRight, HiOutlineMenuAlt3 } from "react-icons/hi";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/vishnu.sharma.10441861",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/advvishnusharma.bcd",
    icon: FaInstagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@LAWVSLEGAL",
    icon: FaYoutube,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/advocate-dr-vishnu-sharma-94213353",
    icon: FaLinkedinIn,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollTop > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const closeOnEscape = (event) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div
          className={`hidden overflow-hidden bg-slate-950 text-slate-300 transition-all duration-300 ease-out md:block ${isScrolled ? "pointer-events-none -translate-y-2 border-transparent opacity-0" : "translate-y-0 border-slate-800 opacity-100"}`}
          style={{ maxHeight: isScrolled ? 0 : 44 }}
          aria-hidden={isScrolled}
        >
          <div className="border-b border-inherit">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 text-xs sm:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <a
                  href="tel:+918171974067"
                  className="flex items-center gap-2 transition hover:text-amber-400"
                >
                  <FaPhoneAlt size={11} /> +91 8171974067
                </a>
                <a
                  href="mailto:info@advocatevishnu.com"
                  className="hidden transition hover:text-amber-400 sm:block"
                >
                  info@advocatevishnu.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="transition hover:-translate-y-0.5 hover:text-amber-400"
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <nav
          className={`border-b border-slate-200/80 bg-white/95 backdrop-blur-xl transition-all duration-500 ${isScrolled ? "h-[68px] shadow-lg" : "h-[82px] shadow-sm"}`}
        >
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="group flex min-w-0 items-center gap-3"
              aria-label="Advocate Vishnu Sharma home"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 font-serif text-xl font-black text-amber-400 shadow-lg ring-1 ring-amber-400/30 transition group-hover:bg-amber-500 group-hover:text-slate-950">
                VS
              </span>
              <span className="min-w-0 leading-none">
                <span className="block text-[9px] font-black uppercase tracking-[0.28em] text-amber-700 sm:text-[10px]">
                  Advocate Dr.
                </span>
                <span className="mt-1 block truncate font-serif text-lg font-black tracking-tight text-slate-950 sm:text-[22px]">
                  Vishnu Sharma
                </span>
                <span className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:block">
                  Legal Counsel • Delhi
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-5 text-sm font-semibold text-slate-700 md:flex lg:gap-7">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 transition hover:text-amber-700 ${isActive(item.href) ? "text-amber-700" : ""}`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-amber-500 transition-transform ${isActive(item.href) ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              ))}
              {/* <Link
                href="/contact"
                className="rounded-lg bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-wider text-amber-400 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Consult Now
              </Link> */}
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900 shadow-sm transition active:scale-95 md:hidden"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <HiOutlineMenuAlt3 size={25} />
            </button>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[999] md:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 h-full w-full bg-slate-950/65 backdrop-blur-sm"
          />
          <aside
            id="mobile-navigation"
            className="absolute right-0 top-0 z-10 flex h-[100dvh] w-[88%] max-w-sm flex-col overflow-y-auto bg-white shadow-[-24px_0_60px_rgba(15,23,42,.35)]"
            aria-label="Mobile navigation"
          >
            <div className="relative border-b border-amber-400/30 bg-slate-950 px-6 pb-7 pt-5">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-amber-500 hover:text-slate-950"
                aria-label="Close menu"
              >
                <FaTimes size={17} />
              </button>
              <div className="flex items-center gap-3 pr-12">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 font-serif text-xl font-black text-slate-950">
                  VS
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                    Advocate Dr.
                  </p>
                  <p className="mt-1 font-serif text-xl font-black text-white">
                    Vishnu Sharma
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400">
                17+ Years of Legal Experience
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Former Co-Chairman & Hony. Secretary, Bar Council of Delhi
              </p>
            </div>

            <div className="flex-1 px-5 py-5">
              <p className="px-3 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
                Explore
              </p>
              <nav className="mt-3 space-y-1.5">
                {navLinks.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold transition ${isActive(item.href) ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200" : "text-slate-700 hover:bg-slate-50 hover:text-amber-700"}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-amber-600/70">
                        0{index + 1}
                      </span>
                      {item.label}
                    </span>
                    <HiOutlineArrowRight className="transition group-hover:translate-x-1" />
                  </Link>
                ))}
              </nav>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-4 text-sm font-bold text-amber-400 shadow-xl"
              >
                Schedule a Consultation <HiOutlineArrowRight />
              </Link>
            </div>

            <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">
              <a
                href="tel:+918171974067"
                className="text-sm font-black text-slate-900"
              >
                +91 8171974067
              </a>
              <p className="mt-1 text-xs text-slate-500">
                info@advocatevishnu.com
              </p>
              <div className="mt-4 flex gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-amber-500 hover:text-slate-950"
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
