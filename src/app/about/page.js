// src/app/about/page.js

import AboutPageContent from "@/components/AboutPageContent";

export const metadata = {
  title: "About Dr. Vishnu Sharma | Profile & Achievements",
  description:
    "Learn more about the 16+ years journey, BCD leadership, and global legal networks of Advocate Dr. Vishnu Sharma.",
};

export default function AboutPage() {
  return (
    // Global dynamic textured wrapper layout
    <div className="w-full min-h-screen premium-texture-bg pt-28 pb-12 bg-slate-50">
      {/* Dynamic Header Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left mb-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Root / Profile / Corporate Biography
        </p>
      </div>

      {/* Render Main Structured Content */}
      <AboutPageContent />
    </div>
  );
}
