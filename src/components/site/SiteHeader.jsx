"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  ArrowUpRight,
  Scale,
  MapPin,
  Globe2,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { menuGroups } from "@/lib/catalogue.mjs";
import BrandMark from "./BrandMark";
const defaultSiteNav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Practice Areas", "/practice-areas"],
  ["Videos", "/videos"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
  ["FAQs", "/faqs"],
];
export default function SiteHeader({ settings, services, navigation }) {
  const pathname = usePathname();
  const [mobile, setMobile] = useState(false),
    [expanded, setExpanded] = useState(""),
    [mobilePractice, setMobilePractice] = useState(false),
    [hover, setHover] = useState(false);
  useEffect(() => { setMobile(false); setExpanded(""); setMobilePractice(false); setHover(false); }, [pathname]);
  useEffect(() => {
    if (!mobile) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => { if (event.key === "Escape") setMobile(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [mobile]);
  const siteNav = navigation
    .filter(
      (n) => !n.parent && n.enabled !== false && n.href !== "/book-appointment",
    )
    .map((n) => [n.label, n.href]);
  if (!siteNav.length) siteNav.push(...defaultSiteNav);
  const practiceLinks = navigation.filter(
    (n) => n.parent === "Practice Areas" && n.enabled !== false,
  );
  const displayGroups = practiceLinks.length
    ? menuGroups.map((g) => ({
        ...g,
        links: practiceLinks
          .filter((n) => (n.group || "Additional Areas") === g.label)
          .map((n) => [n.label, n.href.replace(/^\/practice-areas\//, "")]),
      }))
    : menuGroups;
  const extraGroups = [
    ...new Set(
      practiceLinks
        .map((n) => n.group)
        .filter((g) => g && !menuGroups.some((x) => x.label === g)),
    ),
  ].map((g) => ({
    label: g,
    links: practiceLinks
      .filter((n) => n.group === g)
      .map((n) => [n.label, n.href.replace(/^\/practice-areas\//, "")]),
  }));
  const groups = [...displayGroups, ...extraGroups];
  return (
    <>
      <div className="v8-topbar v9-topbar">
        <div className="container-site flex min-h-10 flex-wrap items-center justify-between gap-3 py-2 text-[11px] tracking-wide">
          <span className="v9-topbar-location flex items-center gap-2">
            <MapPin size={13} className="v9-topbar-icon" />
            {settings.locationText || "New Delhi, India"}
            <span className="mx-2 hidden sm:inline v9-topbar-separator">|</span>
            <span className="hidden sm:inline">
              Indian Legal Services • Domestic & NRI Enquiries
            </span>
          </span>

          <div className="v9-topbar-contact flex items-center gap-4">
            <a
              href={`tel:${settings.phone || ""}`}
              className="v9-topbar-link flex items-center gap-2"
            >
              <Phone size={12} className="v9-topbar-icon" />
              <span>{settings.phone}</span>
            </a>

            <a
              href={`mailto:${settings.email || ""}`}
              className="v9-topbar-email hidden items-center gap-2 md:flex"
            >
              <Mail size={12} className="v9-topbar-icon" />
              {settings.email}
            </a>
          </div>
        </div>
      </div>

      <header className="v5-site-header v9-site-header sticky top-0 z-40 border-b border-[var(--theme-border)]">
        <div className="container-site relative flex min-h-[88px] items-center justify-between gap-5">
          <Link
            href="/"
            onClick={() => setMobile(false)}
            className="v9-header-logo shrink-0"
            aria-label="Advocate Dr. Vishnu Sharma - Home"
          >
            <BrandMark />
          </Link>
          <nav
            className="v9-main-nav hidden h-[88px] items-center gap-1 xl:flex"
            aria-label="Primary navigation"
          >
            {siteNav.map(([label, href]) =>
              label === "Practice Areas" ? (
                <div
                  key={label}
                  className="group flex h-full items-center"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onFocus={() => setHover(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget))
                      setHover(false);
                  }}
                >
                  <Link
                    href={href}
                    onClick={() => setHover(false)}
                    className={`v5-nav-button v9-nav-button flex items-center gap-2 rounded-xl px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide ${hover ? "v5-nav-active" : ""}`}
                    aria-expanded={hover}
                  >
                    {label}
                    <ChevronDown size={14} />
                  </Link>
                  <div
                    className={`v5-mega v9-mega absolute left-0 right-0 top-full max-h-[min(78vh,690px)] overflow-y-auto rounded-b-[24px] border-t-[3px] border-[var(--theme-primary)] bg-white shadow-[0_35px_80px_rgba(3,42,51,.24)] transition-all duration-300 ${hover ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-4 opacity-0"}`}
                  >
                    <div className="grid grid-cols-5 gap-5 p-8">
                      {groups.map((group) => (
                        <div key={group.label}>
                          <h3 className="mb-4 border-b border-[var(--theme-border)] pb-3 font-serif text-[17px] font-bold text-ink">
                            {group.label}
                          </h3>
                          <div className="space-y-2.5">
                            {group.links.map(([title, slug]) => (
                              <Link
                                onClick={() => setHover(false)}
                                href={`/practice-areas/${slug}`}
                                key={slug}
                                className="v5-mega-item v9-mega-item block rounded-lg px-3 py-2.5 text-xs leading-5 text-[var(--theme-muted)] transition-all"
                              >
                                {title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between bg-sand px-8 py-4">
                      <span className="text-xs text-[var(--theme-muted)]">
                        Browse 100+ general and specialist legal-service entries
                      </span>
                      <Link
                        onClick={() => setHover(false)}
                        href="/practice-areas"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink"
                      >
                        View All Practice Areas <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="v5-nav-button v9-nav-button rounded-xl px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide"
                >
                  {label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/book-appointment"
              className="btn-gold v9-header-cta hidden text-[11px] lg:inline-flex"
            >
              <CalendarDays size={15} /> Book Appointment
            </Link>
            <button
              type="button"
              className="v8-menu-trigger v9-menu-trigger rounded-xl border border-[var(--theme-border)] p-3 text-ink xl:hidden"
              onClick={() => setMobile(!mobile)}
              aria-label={mobile ? "Close side menu" : "Open side menu"}
              aria-expanded={mobile}
            >
              {mobile ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <button
        type="button"
        tabIndex={mobile ? 0 : -1}
        aria-label="Close navigation"
        onClick={() => setMobile(false)}
        className={`v8-drawer-backdrop xl:hidden ${mobile ? "is-open" : ""}`}
      />
      <aside
        role="dialog"
        aria-label="Mobile site navigation"
        aria-modal={mobile ? "true" : undefined}
        aria-hidden={!mobile}
        className={`v8-mobile-drawer v9-mobile-drawer xl:hidden ${mobile ? "is-open" : ""}`}
      >
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] p-5">
          <BrandMark compact />
          <button
            type="button"
            onClick={() => setMobile(false)}
            className="v8-menu-trigger"
            aria-label="Close navigation"
          >
            <X size={22} />
          </button>
        </div>
        <div className="v8-drawer-scroll px-5 py-4">
          <nav
            aria-label="Mobile navigation"
            className="v9-drawer-nav space-y-1"
          >
            {siteNav.map(([label, href]) =>
              label === "Practice Areas" ? (
                <div key={href} className="border-b border-themeBorder">
                  <div className="flex items-center justify-between">
                    <Link
                      href={href}
                      onClick={() => setMobile(false)}
                      className="block py-3 font-bold"
                    >
                      {label}
                    </Link>
                    <button
                      onClick={() => setMobilePractice(!mobilePractice)}
                      className="rounded-lg p-3 transition hover:bg-[var(--theme-tint)]"
                      aria-label="Expand practice areas"
                    >
                      <ChevronDown size={19} />
                    </button>
                  </div>
                  {mobilePractice && (
                    <div className="pb-3">
                      {groups.map((g) => (
                        <div key={g.label}>
                          <button
                            className="flex w-full justify-between py-2 text-sm font-semibold text-gold"
                            onClick={() =>
                              setExpanded(expanded === g.label ? "" : g.label)
                            }
                          >
                            {g.label}
                            <ChevronDown size={16} />
                          </button>
                          {expanded === g.label &&
                            g.links.map(([t, s]) => (
                              <Link
                                key={s}
                                href={`/practice-areas/${s}`}
                                onClick={() => setMobile(false)}
                                className="block rounded-lg py-2 pl-4 text-sm text-[var(--theme-muted)] transition hover:bg-[var(--theme-tint)] hover:text-[var(--theme-ink)]"
                              >
                                {t}
                              </Link>
                            ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobile(false)}
                  className="block rounded-lg border-b border-themeBorder px-4 py-3 font-semibold transition hover:bg-[var(--theme-tint)] hover:text-[var(--theme-ink)]"
                >
                  {label}
                </Link>
              ),
            )}
            <Link
              href="/book-appointment"
              onClick={() => setMobile(false)}
              className="btn-gold mt-3 w-full"
            >
              Book Appointment <ArrowUpRight size={16} />
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
