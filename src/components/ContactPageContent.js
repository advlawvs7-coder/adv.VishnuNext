// components/ContactPageContent.js
"use client";
import { useState } from "react";
import SubmissionPopup from "@/components/SubmissionPopup";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    type: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", type: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setStatus({
        loading: false,
        message: result.message,
        type: result.success ? "success" : "error",
      });
      if (result.success)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
    } catch {
      setStatus({
        loading: false,
        message:
          "Your request could not be submitted. Please check your connection and try again.",
        type: "error",
      });
    }
  };

  const offices = [
    {
      region: "Primary Litigation Chambers",
      address:
        "Chamber Block, High Court of Delhi & District Court Complexes (Tis Hazari, Rohini, Patiala House), New Delhi, India.",
      phone: "+91 8171974067",
      email: "info@advocatevishnu.com",
    },
    {
      region: "Pan-India Executive Hubs (LAWVS LEGAL)",
      address: "Mumbai, Kolkata, Chennai, Chandigarh, Lucknow, Allahabad.",
      phone: "Corporate Desk Network",
      email: "info@lawvslegal.com",
    },
    {
      region: "Global Presence Networks",
      address:
        "International Strategic Liaison Desks — Dubai (UAE) & Singapore.",
      phone: "International Routing Desk",
      email: "global@lawvslegal.com",
    },
  ];

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Header Grid Area */}
        <div className="border-l-4 border-amber-500 pl-4 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block">
            Institutional Channels
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Connect With Our <span className="text-amber-600">Legal Desks</span>
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Access immediate judicial counsel, institutional bar updates, or
            schedule corporate framework meetings across our regional and global
            touchpoints.
          </p>
        </div>

        {/* Main 2-Column Split: Left Info Desks, Right Premium Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: ADDRESS MATRICES & OFFICE DETAILS (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Operational Info Card */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <FaClock size={14} />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Operational Hours
                </h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Monday – Saturday: 10:00 AM – 07:00 PM IST <br />
                <span className="text-xs text-slate-400 font-medium">
                  *Urgent criminal bail or administrative bar matters route
                  through emergency cell pipelines 24/7.
                </span>
              </p>
            </div>

            {/* Offices Array Loop Grid */}
            <div className="space-y-4">
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-[0.5px] p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded">
                    {office.region}
                  </span>

                  <div className="flex gap-3 text-sm text-slate-600 pt-1">
                    <FaMapMarkerAlt
                      className="text-amber-500 mt-1 flex-shrink-0"
                      size={14}
                    />
                    <p className="leading-relaxed">{office.address}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-500">
                    <div className="flex items-center gap-2">
                      <FaPhoneAlt className="text-amber-500" size={11} />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-amber-500" size={11} />
                      <span className="truncate">{office.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: SECURE LITIGATION DOSSIER INTAKE FORM (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Case Intake & Briefing Framework
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Please provide comprehensive structural variables to accelerate
                procedural alignment panels.
              </p>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 text-slate-700"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g., Devendra Malik"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition"
                  />
                </div>

                {/* Contact Number */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
              </div>

              {/* Inquiry Subject */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Matter / Litigation Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="E.g., High Court Writ Appeal / Young Advocate Welfare Query"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
              </div>

              {/* Detailed Message Textarea */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Brief Statement of Facts / Core Intent
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Outline core elements of legal grievance or welfare program submission..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition resize-none"
                />
              </div>

              {/* Submission Button */}
              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow"
              >
                <span>
                  {status.loading
                    ? "Submitting…"
                    : "Submit Consultation Request"}
                </span>{" "}
                <FaPaperPlane size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>
      <SubmissionPopup
        status={status}
        onClose={() => setStatus({ loading: false, message: "", type: "" })}
      />
    </section>
  );
}
