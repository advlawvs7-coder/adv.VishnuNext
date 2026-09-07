// components/AboutSection.js
"use client";
import Link from "next/link";
import { FaGavel, FaUsers, FaAward, FaGraduationCap } from "react-icons/fa";

export default function AboutSection() {
  const pillars = [
    {
      icon: <FaUsers className="text-amber-500 w-6 h-6" />,
      title: "Young Advocate Welfare",
      desc: "Stipend support, institutional legal chambers, and structural mentorship programs.",
    },
    {
      icon: <FaGavel className="text-amber-500 w-6 h-6" />,
      title: "Bar Council Excellence",
      desc: "Bringing transparency, robust representation, and modern infrastructure to the Delhi Bar.",
    },
    {
      icon: <FaGraduationCap className="text-amber-500 w-6 h-6" />,
      title: "Continuous Legal Education",
      desc: "Regular workshops, insights, and dynamic training modules for contemporary practice.",
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden premium-texture-bg">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout: Text Content + Floating Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Rich Text & Narrative (Takes 7 Columns) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md">
                Leadership Profile
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Dedicated To Justice, <br />
                <span className="text-amber-600">
                  Committed To Advocates Welfare
                </span>
              </h2>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Advocate Dr. Vishnu Sharma has served the legal fraternity since
              2009 and brings 17+ years of courtroom experience in civil and
              criminal litigation. A former Co-Chairman and Honorary Secretary
              of the Bar Council of Delhi, he now leads <strong>LAWVS Legal
              India Pvt Ltd</strong> as Managing Director while continuing his
              work for advocate welfare, professional education and ethical
              legal practice.
            </p>

            {/* Core Pillars Grid inside About */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-2 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300 transform group-hover:-translate-y-1 shadow-sm">
                    <span className="group-hover:text-amber-400 transition-colors duration-300">
                      {pillar.icon}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm tracking-wide pt-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center text-sm font-bold text-slate-950 hover:text-amber-600 tracking-wider uppercase group"
              >
                Read Full Biography
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Side: Attractive Stats Grid (Takes 5 Columns) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Background Aesthetic Blur Effect */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-3xl blur-2xl -z-10" />

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Stat Card 1 */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-left shadow-xl transform hover:scale-[1.03] transition-all duration-300">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 block tracking-tight">
                  17+
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1 block">
                  Years Experience
                </span>
                <p className="text-[11px] text-slate-500 mt-2 leading-normal">
                  In complex litigations & policy matters.
                </p>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 text-left shadow-md mt-6 transform hover:scale-[1.03] transition-all duration-300">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 block tracking-tight">
                  2018–22
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 mt-1 block">
                  Former BCD Leadership
                </span>
                <p className="text-[11px] text-slate-500 mt-2 leading-normal">
                  Hony. Secretary and former Co-Chairman.
                </p>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 text-left shadow-md -mt-6 transform hover:scale-[1.03] transition-all duration-300">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 block tracking-tight">
                  2009
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 mt-1 block">
                  Enrollment Year
                </span>
                <p className="text-[11px] text-slate-500 mt-2 leading-normal">
                  Enrolled with the Bar Council of Delhi.
                </p>
              </div>

              {/* Stat Card 4 */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-left shadow-xl transform hover:scale-[1.03] transition-all duration-300">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 block tracking-tight">
                  LAWVS
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1 block">
                  Managing Director
                </span>
                <p className="text-[11px] text-slate-500 mt-2 leading-normal">
                  Legal advisory and dispute management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
