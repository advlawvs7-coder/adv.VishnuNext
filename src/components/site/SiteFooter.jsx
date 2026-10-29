import Link from "next/link";
import {
  Scale,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Globe2,
  BookOpen,
} from "lucide-react";
import { menuGroups } from "@/lib/catalogue.mjs";
import BrandMark from "./BrandMark";
const quick = [
  ["Advocate Profile", "/profile"],
  ["About the Practice", "/about"],
  ["Our Team", "/team"],
  ["Courts of Practice", "/courts-of-practice"],
  ["Billing & Fees", "/billing-and-fees"],
  ["Book Appointment", "/book-appointment"],
  ["Online Consultation", "/online-consultation"],
  ["Contact Details", "/contact"],
  ["Directions to Office", "/directions"],
  ["Judgments & Legal Principles", "/judgments"],
];
const resources = [
  ["All Practice Areas", "/practice-areas"],
  ["Latest Legal Articles", "/blog"],
  ["Videos & Explainers", "/videos"],
  ["FAQs & Answers", "/faqs"],
  ["Media & Publications", "/media"],
  ["Legal Resources", "/resources"],
  ["NRI Legal Services", "/practice-areas/nri-legal-services"],
  ["Divorce Legal Services", "/practice-areas/divorce-lawyer-india"],
  ["Property Law Services", "/practice-areas/property-lawyer-delhi"],
  ["Criminal & Bail Services", "/practice-areas/criminal-lawyer-bail"],
];
const policies = [
  ["Privacy Policy", "/pages/privacy-policy"],
  ["Terms of Use", "/pages/terms-of-use"],
  ["Disclaimer", "/pages/disclaimer"],
];
function Links({ items }) {
  return (
    <div className="grid gap-3">
      {items.map(([label, href]) => (
        <Link
          href={href}
          key={href}
          className="v9-footer-link group flex items-start gap-2 text-[13px] leading-6 transition"
        >
          <ArrowRight
            size={13}
            className="mt-[6px] shrink-0 text-[var(--theme-accent)]"
          />
          {label}
        </Link>
      ))}
    </div>
  );
}
export default function SiteFooter({ settings, navigation = [] }) {
  const footerItems = navigation.filter(
    (n) => n.parent === "Footer" && n.enabled !== false,
  );
  const grouped = (name) =>
    footerItems
      .filter((n) => (n.group || "Important Links") === name)
      .map((n) => [n.label, n.href]);
  const important = grouped("Important Links").length
    ? grouped("Important Links")
    : quick;
  const legalResources = grouped("Legal Resources").length
    ? grouped("Legal Resources")
    : resources;
  const privacyLinks = grouped("Policies").length
    ? grouped("Policies")
    : policies;
  const menuItems = navigation.filter(
    (n) => n.parent === "Practice Areas" && n.enabled !== false,
  );
  const practiceGroups = menuItems.length
    ? [...new Set(menuItems.map((x) => x.group || "More Services"))].map(
        (label) => ({
          label,
          links: menuItems
            .filter((x) => (x.group || "More Services") === label)
            .map((x) => [x.label, x.href]),
        }),
      )
    : menuGroups.map((g) => ({
        label: g.label,
        links: g.links.map(([name, slug]) => [name, `/practice-areas/${slug}`]),
      }));
  const contacts = [
    [
      "Call the Office",
      `tel:${settings.phone?.replace(/[^+\d]/g, "") || "+919873181685"}`,
    ],
    ["Send an Email", `mailto:${settings.email || "advocatevishnu@yahoo.in"}`],
  ];
  return (
    <footer className="site-footer v9-footer">
      <div className="v9-footer-rule" aria-hidden="true" />
      <div className="container-site grid gap-10 py-16 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1.1fr]">
        <div>
          <Link href="/" className="mb-7 inline-flex items-center" aria-label="Advocate Dr. Vishnu Sharma home"><BrandMark /></Link>
          <p className="max-w-sm text-[13px] leading-8 text-slate-300">
            {settings.footerBlurb ||
              "Original legal education and consultation information for matrimonial, property, criminal, civil and NRI-related matters in India."}
          </p>
          <div className="my-6 h-px bg-white/15" />
          <p className="text-xs leading-6 text-slate-400">
            Information on this website does not amount to a guarantee,
            advertisement or legal advice, and an enquiry does not establish
            representation.
          </p>
          <div className="mt-6 flex gap-4">
            {[
              [Facebook, settings.facebook, "Facebook"],
              [Instagram, settings.instagram, "Instagram"],
              [Linkedin, settings.linkedin, "LinkedIn"],
              [Youtube, settings.youtube, "YouTube"],
            ]
              .filter(([, url]) => url?.startsWith("https://"))
              .map(([Icon, url, name]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-[var(--theme-accent)] hover:text-white"
                >
                  <Icon size={20} />
                </a>
              ))}
          </div>
        </div>
        <div>
          <h3 className="mb-6 border-b border-white/15 pb-4 font-serif text-xl text-white">
            Important Links
          </h3>
          <Links items={important} />
        </div>
        <div>
          <h3 className="mb-6 border-b border-white/15 pb-4 font-serif text-xl text-white">
            Legal Resources
          </h3>
          <Links items={legalResources} />
        </div>
        <div>
          <h3 className="mb-6 border-b border-white/15 pb-4 font-serif text-xl text-white">
            Practice Areas
          </h3>
          <div className="grid gap-5">
            {practiceGroups.map((g) => (
              <div key={g.label}>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--theme-accent)]">
                  {g.label}
                </p>
                <Links items={g.links} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-6 border-b border-white/15 pb-4 font-serif text-xl text-white">
            We Are Here
          </h3>
          <div className="space-y-5 text-sm leading-7">
            <p className="flex items-start gap-3">
              <MapPin
                size={20}
                className="mt-1 shrink-0 text-[var(--theme-accent)]"
              />
              {settings.address ||
                "Office No. 101, Himland House, Karampura, Delhi 110015"}
            </p>
            <a
              href={`tel:${settings.phone?.replace(/[^+\d]/g, "") || "+919873181685"}`}
              className="flex items-center gap-3 hover:text-white"
            >
              <Phone size={18} className="text-[var(--theme-accent)]" />
              {settings.phone}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="flex items-start gap-3 break-all hover:text-white"
            >
              <Mail
                size={18}
                className="mt-1 shrink-0 text-[var(--theme-accent)]"
              />
              {settings.email}
            </a>
            <p className="text-xs text-slate-400">
              Appointments: {settings.officeHours || "By prior arrangement"}
            </p>
            <Link href="/book-appointment" className="btn-gold w-full">
              Request Consultation <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/directions"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--theme-accent)]"
            >
              View Office Directions <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-wrap items-center justify-between gap-5 py-6 text-[11px] text-slate-400">
          <span>
            © {new Date().getFullYear()} •
            advocatevishnusharma.com
          </span>
          <div className="flex flex-wrap gap-5">
            {privacyLinks.map(([title, href]) => (
              <Link key={href} href={href} className="hover:text-white">
                {title}
              </Link>
            ))}
            <Link href="/admin/login" className="hover:text-white">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
