// components/FaqSection.js
"use client";
import { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "What is the primary objective of the Young Advocates Welfare initiative?",
      a: "The initiative focuses on providing mandatory structural stipends, affordable smart co-working legal chambers, digital library access, and immediate medical insurance policies to newly enrolled legal practitioners across Delhi courts.",
    },
    {
      q: "How can I access digital insights or connect for active legal consultation?",
      a: "You can use the Quick Consultation Dossier form at the bottom of our homepage, or visit our specialized legal panels like LAWVS.COM for instant end-to-end legal support maps.",
    },
    {
      q: "What benefits does membership with the Bar Council of Delhi bring?",
      a: "BCD serves as the apex statutory governance framework regulating legal practice guidelines in the capital. Members receive standardized regulatory updates, institutional support, grievance redressal, and professional welfare buffers.",
    },
  ];

  return (
    <section className="premium-texture-bg w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Help Desk
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Queries
          </h2>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white/80 border border-slate-200/80 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-slate-900 font-bold text-sm sm:text-base hover:bg-slate-50 transition focus:outline-none"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className="text-amber-600 flex-shrink-0">
                    {isOpen ? <HiMinus size={18} /> : <HiPlus size={18} />}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-48 border-t border-slate-100" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs sm:text-sm text-slate-500 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
