// components/TimelineSection.js
"use client";

export default function TimelineSection() {
  const milestones = [
    {
      year: "2009",
      title: "Enrolled with the Bar Council of Delhi",
      desc: "Began legal practice in Delhi, building extensive experience in civil and criminal litigation before the High Court and District Courts.",
    },
    {
      year: "2018 - 2020",
      title: "Honorary Secretary, Bar Council of Delhi",
      desc: "Served the legal fraternity through welfare reforms, medical assistance initiatives, improved professional infrastructure and support for young advocates.",
    },
    {
      year: "2020 - 2022",
      title: "Co-Chairman, Bar Council of Delhi",
      desc: "Continued institutional leadership with a focus on advocate welfare, transparency, legal infrastructure and structured mentorship across the profession.",
    },
    {
      year: "Present",
      title: "Legal, Corporate & Sports Leadership",
      desc: "Leads LAWVS Legal India Pvt Ltd as Managing Director and serves as Treasurer of World Yogasana and Vice-President of Indraprastha Yogasana.",
    },
  ];

  return (
    <section className="premium-texture-bg w-full py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.05),transparent_40%)]" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            The Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Milestones of Leadership & Trust
          </h2>
        </div>

        <div className="relative border-l border-slate-800 ml-4 md:ml-32 text-left space-y-12">
          {milestones.map((item, idx) => (
            <div key={idx} className="relative pl-8 group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 group-hover:bg-amber-400 transition-colors z-10" />

              {/* Year block that positions perfectly on desktop left */}
              <div className="md:absolute md:-left-36 md:top-1 text-sm font-black text-amber-500 tracking-wider">
                {item.year}
              </div>

              <div className="space-y-2 max-w-2xl">
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
