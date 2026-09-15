import {
  FaBalanceScale,
  FaBriefcase,
  FaGlobeAsia,
  FaHandsHelping,
  FaHeart,
  FaLandmark,
} from "react-icons/fa";

const achievements = [
  {
    icon: FaBalanceScale,
    title: "17+ Years of Litigation Practice",
    text: "Enrolled in 2009, Advocate Vishnu Sharma represents clients in complex civil and criminal matters before the High Court of Delhi and the District Courts at Tis Hazari, Rohini, Karkardooma, Patiala House and Saket.",
  },
  {
    icon: FaLandmark,
    title: "Bar Council Leadership (2018–2022)",
    text: "He served as Honorary Secretary from 2018 to 2020 and as Co-Chairman from 2020 to 2022, contributing to advocate welfare, medical assistance and stronger professional support systems.",
  },
  {
    icon: FaBriefcase,
    title: "Managing Director, LAWVS Legal",
    text: "He leads LAWVS Legal India Pvt Ltd in full-service legal advisory, corporate compliance, litigation and dispute management across major Indian commercial centres and international jurisdictions.",
  },
  {
    icon: FaHandsHelping,
    title: "Advocate Welfare & Mentorship",
    text: "His work supports emerging lawyers through practical mentorship, litigation training, career guidance and initiatives designed to strengthen access to professional opportunities.",
  },
  {
    icon: FaHeart,
    title: "World Yogasana & Wellness",
    text: "As Treasurer of World Yogasana and Vice-President of Indraprastha Yogasana, he promotes sports governance, physical health and holistic well-being alongside his legal practice.",
  },
  {
    icon: FaGlobeAsia,
    title: "Community & Legal Advocacy",
    text: "He remains engaged in legal awareness, community service and ethical advocacy aimed at strengthening access to justice and public confidence in the legal system.",
  },
];

const principles = [
  [
    "Integrity",
    "Transparent, ethical and responsible representation in every matter.",
  ],
  [
    "Client-Centric Advocacy",
    "Clear strategy shaped around each client’s rights, facts and legal objectives.",
  ],
  [
    "Professional Excellence",
    "Careful preparation backed by deep courtroom and dispute-resolution experience.",
  ],
  [
    "Advocate Empowerment",
    "Mentorship and institutional support for the next generation of legal professionals.",
  ],
];

export default function HomeProfileSections() {
  return (
    <>
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">
              Professional Profile
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Legal Experience, Leadership & Public Service
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              A career spanning courtroom advocacy, Bar leadership, corporate
              legal services, professional mentorship and community wellness.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
                  <Icon aria-hidden="true" size={21} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">
              Core Principles
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Strategic Advocacy Grounded in Trust
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Advocate Vishnu Sharma combines legal strategy with professional
              ethics, responsive communication and a long-term commitment to the
              legal fraternity.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map(([title, text], index) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-black text-amber-600">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
