// components/PracticeAreas.js
"use client";
import {
  FaScaleBalanced,
  FaBuildingShield,
  FaBuildingColumns,
  FaHandshakeAngle,
} from "react-icons/fa6";

export default function PracticeAreas() {
  const areas = [
    {
      icon: <FaBuildingShield size={28} className="text-amber-500" />,
      title: "Corporate & Commercial Law",
      desc: "Comprehensive advisory on corporate restructurings, regulatory compliances, and enterprise infrastructure setups through LAWVS Legal India.",
    },
    {
      icon: <FaScaleBalanced size={28} className="text-amber-500" />,
      title: "Criminal Defense & Trial Litigation",
      desc: "Robust representation across trial courts and the High Court, protecting constitutional rights with profound procedural command.",
    },
    {
      icon: <FaBuildingColumns size={28} className="text-amber-500" />,
      title: "Matrimonial & Family Dispute Law",
      desc: "Expert guidance in high-stakes family law, divorce litigation, and complex cross-border matrimonial mediation via Advocate Matrimony.",
    },
    {
      icon: <FaHandshakeAngle size={28} className="text-amber-500" />,
      title: "Bar Council Strategy & Welfare Reforms",
      desc: "Institutional policy formulation, continuous legal education design, and structural grievance redressal models for young advocates.",
    },
  ];

  return (
    <section id="practice-areas" className="premium-texture-bg w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 rounded-md">
            Legal Frameworks
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Areas of Strategic <span className="text-amber-600">Practice</span>
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Delivering bespoke litigative strategies and commercial legal
            infrastructure backed by 17+ years of courtroom and advisory
            expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-900 group-hover:bg-amber-500 transition-colors duration-300" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 transition-all duration-300">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {area.icon}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-amber-600 transition-colors">
                  {area.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {area.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
