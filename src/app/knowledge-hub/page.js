import Link from "next/link";
import {
  FaArrowRight,
  FaBalanceScale,
  FaBriefcase,
  FaFileContract,
  FaGavel,
  FaHandshake,
  FaUsers,
} from "react-icons/fa";

export const metadata = {
  title: "Legal Knowledge Hub",
  description:
    "Clear legal guidance from Advocate Dr. Vishnu Sharma on civil, criminal, matrimonial, corporate and dispute resolution matters in Delhi.",
  alternates: { canonical: "/knowledge-hub" },
};

const topics = [
  {
    icon: FaBalanceScale,
    title: "Civil Litigation",
    text: "Understand civil suits, injunctions, property disputes, recovery proceedings, evidence and the practical stages of a court case.",
    points: [
      "Property and possession disputes",
      "Civil recovery and injunctions",
      "Court procedure and evidence",
    ],
  },
  {
    icon: FaGavel,
    title: "Criminal Law",
    text: "Learn the basic legal process from complaint and investigation to bail, trial and representation before District Courts and the High Court.",
    points: [
      "Bail and criminal defence",
      "Complaints and investigation",
      "Trial and appellate remedies",
    ],
  },
  {
    icon: FaUsers,
    title: "Matrimonial & Family Law",
    text: "Practical information on divorce, maintenance, child custody, domestic disputes and settlement options for families.",
    points: [
      "Divorce and judicial separation",
      "Maintenance and child custody",
      "Mediation and negotiated settlement",
    ],
  },
  {
    icon: FaBriefcase,
    title: "Corporate & Commercial Law",
    text: "Guidance for companies and business owners on contracts, compliance, employment matters, governance and commercial risk.",
    points: [
      "Corporate compliance",
      "Employment and commercial contracts",
      "Business dispute strategy",
    ],
  },
  {
    icon: FaFileContract,
    title: "Legal Drafting & Advisory",
    text: "Know why clear documentation, timely legal review and carefully drafted notices or agreements help prevent avoidable disputes.",
    points: [
      "Legal notices and replies",
      "Contracts and agreements",
      "Case and document review",
    ],
  },
  {
    icon: FaHandshake,
    title: "Dispute Resolution",
    text: "Explore litigation, mediation, negotiation and arbitration to understand which route may suit the facts and objectives of a dispute.",
    points: [
      "Mediation and negotiation",
      "Arbitration",
      "Litigation management",
    ],
  },
];

const steps = [
  [
    "01",
    "Identify the legal issue",
    "Separate the facts, documents, dates and immediate risks before deciding the next step.",
  ],
  [
    "02",
    "Review your documents",
    "Keep agreements, notices, messages, receipts, orders and other relevant records organised.",
  ],
  [
    "03",
    "Understand available options",
    "A matter may require advice, notice, negotiation, mediation, court action or a combination of these.",
  ],
  [
    "04",
    "Take timely legal advice",
    "Limitation periods and procedural requirements can affect legal rights, so avoid unnecessary delay.",
  ],
];

export default function KnowledgeHubPage() {
  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-amber-400/20" />
        <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full border border-amber-400/10" />
        <div className="relative mx-auto max-w-7xl">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-amber-400">
            Legal Knowledge Hub
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Clear legal information before you take the next step.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Built around 17+ years of courtroom experience, this hub helps
            individuals, families and businesses understand common legal issues,
            possible routes and the importance of timely advice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Read Legal Articles <FaArrowRight size={12} />
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:border-amber-400 hover:text-amber-400"
            >
              Discuss a Legal Matter
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase tracking-[0.22em] text-amber-700">
              Explore by subject
            </span>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Legal guidance for real-world concerns
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Start with the area closest to your concern. Each topic explains
              the key issues in plain language and helps you prepare for a
              focused consultation.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map(({ icon: Icon, title, text, points }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-amber-400">
                  <Icon size={20} />
                </div>
                <h2 className="mt-5 text-xl font-black text-slate-900">
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-700">
                  {points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-amber-600">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.22em] text-amber-700">
              Before consultation
            </span>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Prepare the right information
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Good legal advice begins with complete facts. A simple timeline
              and organised documents can make the first discussion more useful
              and efficient.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="font-black text-amber-700">{number}</span>
                <h3 className="mt-3 text-lg font-black text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-3xl bg-slate-950 p-8 text-white shadow-2xl sm:p-12 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
              Need advice on your facts?
            </p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Speak with Advocate Dr. Vishnu Sharma
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Get focused legal guidance for civil, criminal, matrimonial or
              commercial matters before deciding your next course of action.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-xl bg-amber-500 px-7 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-400"
          >
            Schedule Consultation
          </Link>
        </div>
        <p className="mx-auto mt-6 max-w-7xl text-xs leading-5 text-slate-500">
          General information on this page is for awareness only and does not
          create an advocate-client relationship or replace advice based on the
          specific facts of a matter.
        </p>
      </section>
    </main>
  );
}
