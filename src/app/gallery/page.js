// src/app/gallery/page.js
"use client";
import { useState } from "react";
import {
  FaImages,
  FaBalanceScale,
  FaUsers,
  FaGlobe,
  FaHeartbeat,
} from "react-icons/fa";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    "Bar Council",
    "Litigation",
    "Global LAWVS",
    "Community & Yoga",
  ];

  const galleryItems = [
    {
      id: 1,
      category: "Bar Council",
      title: "BCD Welfare Assembly 2026",
      desc: "Chairing the resolution committee for young advocate stipends.",
      imgPlaceholder: "bg-slate-800 text-amber-500",
    },
    {
      id: 2,
      category: "Litigation",
      title: "Delhi High Court Post-Trial",
      desc: "Briefing junior advocates after a technical civil trial briefing.",
      imgPlaceholder: "bg-slate-700 text-amber-400",
    },
    {
      id: 3,
      category: "Global LAWVS",
      title: "Dubai Corporate Liaison Office",
      desc: "Inauguration ceremony of the LAWVS international strategic desk.",
      imgPlaceholder: "bg-slate-900 text-amber-500",
    },
    {
      id: 4,
      category: "Community & Yoga",
      title: "World Yogasana Summit",
      desc: "Addressing the international delegation as the Treasurer of World Yogasana.",
      imgPlaceholder: "bg-slate-800 text-amber-400",
    },
    {
      id: 5,
      category: "Bar Council",
      title: "Advocate Health Cover Launch",
      desc: "Distributing standardized insurance cards to newly enrolled litigators.",
      imgPlaceholder: "bg-slate-700 text-amber-500",
    },
    {
      id: 6,
      category: "Global LAWVS",
      title: "Singapore Panel Meet",
      desc: "Cross-border arbitration framework discussions with Southeast Asian allies.",
      imgPlaceholder: "bg-slate-900 text-amber-400",
    },
  ];

  // Filter Logic
  const filteredItems =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  // Category Icon Helper
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Bar Council":
        return <FaUsers size={12} />;
      case "Litigation":
        return <FaBalanceScale size={12} />;
      case "Global LAWVS":
        return <FaGlobe size={12} />;
      case "Community & Yoga":
        return <FaHeartbeat size={12} />;
      default:
        return <FaImages size={12} />;
    }
  };

  return (
    <div className="w-full min-h-screen premium-texture-bg pt-28 pb-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-left border-l-4 border-amber-500 pl-4 mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block">
            Visual Archives
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Media & Event <span className="text-amber-600">Gallery</span>
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            A visual repository tracking bar council leadership, global law firm
            summits, and community wellness initiatives led by Advocate Dr.
            Vishnu Sharma.
          </p>
        </div>

        {/* Dynamic Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 pb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center gap-2 border ${
                activeFilter === cat
                  ? "bg-slate-900 border-slate-900 text-white shadow-md"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Gallery Interactive Grid Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left transform hover:-translate-y-1"
            >
              {/* Media Asset Window (Using placeholders, you can replace with your actual <Image /> tags later) */}
              <div
                className={`w-full h-56 ${item.imgPlaceholder} flex flex-col items-center justify-center relative transition-transform duration-500 group-hover:scale-[1.01]`}
              >
                <FaImages
                  size={36}
                  className="opacity-40 mb-2 group-hover:scale-110 transition-transform"
                />
                <span className="text-[10px] uppercase font-black tracking-widest opacity-30">
                  {item.category} Asset Stream
                </span>

                {/* Float Category Pill inside Image Container */}
                <span className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md border border-slate-700">
                  {item.category}
                </span>
              </div>

              {/* Text Description Box */}
              <div className="p-5 space-y-2 bg-white relative z-10">
                <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-amber-600 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Fallback State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white/50 border border-dashed border-slate-200 rounded-2xl">
            <p className="text-slate-400 text-sm">
              No media entries found in this archival stream.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
