import { PageBanner } from "@/components/site/Elements";
import { getSettings } from "@/lib/content";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";
export const metadata = {
  title: "Office Directions | Advocate Dr. Vishnu Sharma",
};
export default async function Directions() {
  const s = await getSettings();
  const query = encodeURIComponent(s.address || "Karam Pura Delhi");
  return (
    <>
      <PageBanner
        eyebrow="Visit Us"
        title="Directions to Office"
        description="Plan your visit only after the appointment has been confirmed."
      />
      <section className="section-pad container-site">
        <div className="mx-auto max-w-4xl border border-[var(--theme-border)] bg-sand p-9 md:p-14">
          <MapPin className="mb-5 text-gold" size={39} />
          <h2 className="font-serif text-3xl font-bold">Delhi Office</h2>
          <p className="mt-4 max-w-lg text-lg leading-9 text-[var(--theme-muted)]">
            {s.address}
          </p>
          <p className="mt-4 text-sm text-[var(--theme-muted)]">
            Office hours: {s.officeHours || "By prior appointment"}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark"
            >
              Open Google Maps <ArrowUpRight size={16} />
            </a>
            <a className="btn-gold" href={`tel:${s.phone}`}>
              <Phone size={16} /> Call Office
            </a>
          </div>
          <p className="mt-8 text-xs text-[var(--theme-muted)]">
            The destination is generated from the office address configured in
            site settings; confirm the location before travel.
          </p>
        </div>
      </section>
    </>
  );
}
