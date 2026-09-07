// src/app/contact/page.js

import ContactPageContent from "@/components/ContactPageContent";

export const metadata = {
  title: "Contact Desks | Advocate Dr. Vishnu Sharma",
  description:
    "Reach out across our litigation chambers in Delhi High Court or global LAWVS LEGAL liaison centers.",
};

export default function ContactPage() {
  return (
    // Global continuous texture layer application across internal views
    <div className="w-full min-h-screen premium-texture-bg pt-28 pb-12 bg-slate-50">
      {/* Route Directory Visual Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left mb-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Root / Institutional Desks / Consultation Hub
        </p>
      </div>

      {/* Render Main Contact & Offices Split System */}
      <ContactPageContent />
    </div>
  );
}
