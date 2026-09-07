// components/AboutPageContent.js
"use client";
import {
  FaGavel,
  FaGlobe,
  FaAward,
  FaHeartbeat,
  FaCalendarAlt,
} from "react-icons/fa";

export default function AboutPageContent() {
  const highlights = [
    {
      icon: <FaCalendarAlt className="text-amber-500 text-xl" />,
      title: "Enrolment Year",
      desc: "2009 with Bar Council of Delhi",
    },
    {
      icon: <FaGavel className="text-amber-500 text-xl" />,
      title: "16+ Years Experience",
      desc: "Civil & Criminal Practice across Delhi HC & District Courts",
    },
    {
      icon: <FaAward className="text-amber-500 text-xl" />,
      title: "Leadership Roles",
      desc: "Former Co-Chairman & Hony. Secretary, BCD",
    },
    {
      icon: <FaGlobe className="text-amber-500 text-xl" />,
      title: "Global Footprint",
      desc: "LAWVS LEGAL LLP (Pan-India, Dubai, Singapore)",
    },
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Main Grid: Left Narrative + Right Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT SIDE: BIOGRAPHY (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 rounded-md inline-block">
                Biography
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                About Advocate <br />
                <span className="text-amber-600">Dr. Vishnu Sharma</span>
              </h1>
              <h3 className="text-base sm:text-lg font-bold text-slate-700 tracking-wide pt-1">
                A Transformational Leader for Legal Excellence
              </h3>
            </div>

            <div className="text-slate-600 space-y-4 text-sm sm:text-base leading-relaxed justify-center">
              <p>
                <strong>Advocate Vishnu Sharma</strong> is a pioneering legal
                professional serving the legal fraternity with unwavering
                dedication since 2009. With <strong>16+ years</strong> of
                exceptional practice in Civil and Criminal litigation across
                Delhi High Court and major district courts (Tis Hazari, Rohini,
                Karkardooma, Patiala House), he has built a stellar reputation
                as a trusted advocate and strategist in complex dispute
                resolution.
              </p>
              <p>
                As Former Co-Chairman (2020-2022) and Honorary Secretary
                (2018-2020) of <strong>Bar Council of Delhi</strong>, Advocate
                Sharma successfully championed welfare reforms benefiting
                165,000+ advocates across Indias largest bar council. His
                transformational leadership modernized welfare schemes, expanded
                health insurance coverage, and created pathways for{" "}
                <strong>young advocate</strong> empowerment and professional
                growth.
              </p>
              <p>
                Beyond litigation, Advocate Sharma leads{" "}
                <strong>LAWVS LEGAL LLP</strong>—a globally recognized firm with
                pan-India presence (Delhi, Mumbai, Kolkata, Chennai, Chandigarh,
                Lucknow, Allahabad) and international offices (Dubai,
                Singapore).
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: FLOATING ACCENT HIGHLIGHT BOXES (5 Columns) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:mt-12">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 mb-4">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADDITIONAL BOTTOM PROFILE: HUMANITARIAN & WELLNESS ASPECTS */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_50%)]" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-2 flex justify-start md:justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
                <FaHeartbeat size={32} />
              </div>
            </div>
            <div className="md:col-span-10 space-y-2">
              <h4 className="text-lg font-bold tracking-wide text-amber-400">
                Holistic Wellness & Community Leadership
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                He also serves as Treasurer of World Yogasana and Vice-President
                of <strong>Indraprastha Yogasana</strong>, promoting holistic
                wellness, ethical living, and community service across the legal
                profession and society.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
