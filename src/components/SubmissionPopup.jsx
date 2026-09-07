"use client";

import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";

export default function SubmissionPopup({ status, onClose }) {
  if (!status?.message || status.loading) return null;

  const success = status.type === "success";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="submission-popup-title">
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close notification" />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white p-7 text-center shadow-[0_30px_90px_rgba(15,23,42,.45)] sm:p-9">
        <button onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900" aria-label="Close"><FaTimes size={13} /></button>
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${success ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
          {success ? <FaCheck size={24} /> : <FaExclamationTriangle size={24} />}
        </div>
        <p className={`mt-5 text-xs font-black uppercase tracking-[0.2em] ${success ? "text-emerald-700" : "text-red-700"}`}>{success ? "Request Submitted" : "Submission Failed"}</p>
        <h2 id="submission-popup-title" className="mt-2 text-2xl font-black text-slate-900">{success ? "Thank you for contacting us" : "We could not send your request"}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{status.message}</p>
        <button onClick={onClose} className={`mt-6 w-full rounded-xl px-5 py-3.5 text-sm font-bold text-white transition ${success ? "bg-emerald-700 hover:bg-emerald-800" : "bg-slate-950 hover:bg-slate-800"}`}>{success ? "Done" : "Try Again"}</button>
      </div>
    </div>
  );
}
