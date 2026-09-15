// src/app/page.js

import AboutSection from "@/components/AboutSection";
import FaqSection from "@/components/FaqSection";
import HeroBanner from "@/components/HeroBanner";
import HomeContactBlogs from "@/components/HomeContactBlogs";
import PracticeAreas from "@/components/PracticeAreas";
import TimelineSection from "@/components/TimelineSection";
import { getBlogs } from "@/actions/blogActions";
import HomeProfileSections from "@/components/HomeProfileSections";

export const metadata = {
  title: "Advocate Dr. Vishnu Sharma | 17+ Years Legal Experience",
  description:
    "Advocate Dr. Vishnu Sharma is a senior legal practitioner, former Co-Chairman and Honorary Secretary of the Bar Council of Delhi, and Managing Director of LAWVS Legal India Pvt Ltd.",
};
export const dynamic = "force-dynamic";
export default async function Home() {
  const { data: blogs = [] } = await getBlogs();
  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* 1. Dynamic Motion Hero Banner (Cinematic Dark Layer) */}
      <HeroBanner />

      {/* 2. About Section with Custom Global Texture Wrapper */}
      <div className="premium-texture-bg border-b border-slate-200/60">
        <AboutSection />
      </div>
      <HomeContactBlogs blogs={blogs.slice(0, 2)} />
      <PracticeAreas />
      <HomeProfileSections />
      <TimelineSection />
      <FaqSection />
      {/* 3. Media Section with Custom Global Texture Wrapper (Translucent White Layer over pattern) */}
      <div className="premium-texture-bg bg-white/40 backdrop-blur-[0.5px]">
        {/* <MediaSection /> */}
      </div>

      {/* 4. Optional Bottom Section (Pattern continued) */}
      <div className="premium-texture-bg py-12 text-center border-t border-slate-200/40">
        <p className="text-xs text-slate-400 tracking-widest uppercase font-medium">
          Advocate Dr. Vishnu Sharma • Litigation • Leadership • Legal
          Excellence
        </p>
      </div>
    </div>
  );
}
