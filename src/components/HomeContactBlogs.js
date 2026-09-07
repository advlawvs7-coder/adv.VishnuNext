// components/HomeContactBlogs.js
"use client";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import SubmissionPopup from "@/components/SubmissionPopup";

export default function HomeContactBlogs({ blogs = [] }) {
  const [status,setStatus]=useState({loading:false,message:"",type:""});
  const fallbackBlogs = [
    {
      title: "Understanding Young Advocate Welfare Schemes in Delhi",
      date: "May 26, 2026",
      readTime: "5 Min Read",
      excerpt:
        "An in-depth analysis of financial stipends, library subventions, and health policies currently proposed for young lawyers.",
      slug: null,
    },
    {
      title: "A Masterclass on Matrimonial Mediation & Strategies",
      date: "May 20, 2026",
      readTime: "7 Min Read",
      excerpt:
        "Exploring the dynamic shifts in family court proceedings and alternative dispute resolutions under recent mandates.",
      slug: null,
    },
  ];

  const recentBlogs = blogs.length ? blogs.map(blog=>({title:blog.title,date:new Date(blog.publishedAt||blog.createdAt).toLocaleDateString("en-IN"),readTime:blog.category,excerpt:blog.description,slug:blog.slug})) : fallbackBlogs;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({loading:true,message:"",type:""});
    try {
      const response=await fetch("/api/contact",{method:"POST",body:new FormData(form)});
      const result=await response.json();
      setStatus({loading:false,message:result.message,type:result.success?"success":"error"});
      if(result.success)form.reset();
    } catch {
      setStatus({loading:false,message:"Your request could not be submitted. Please check your connection and try again.",type:"error"});
    }
  };

  return (
    <section className="premium-texture-bg w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Two Column Grid: Left for Blogs, Right for Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT SIDE: LATEST INSIGHTS (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-2">
              <Link href="/knowledge-hub" className="text-xs font-bold uppercase tracking-widest text-amber-600 hover:text-amber-800">
                Knowledge Hub
              </Link>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Latest Legal <span className="text-amber-600">Insights</span>
              </h2>
            </div>

            <div className="space-y-4">
              {recentBlogs.map((blog, idx) => (
                <Link
                  key={idx}
                  href={blog.slug ? `/blogs/${blog.slug}` : "/knowledge-hub"}
                  className="bg-white/80 p-5 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition group"
                >
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-2">
                    <span>{blog.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-amber-600">{blog.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-600 transition mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {blog.excerpt}
                  </p>
                </Link>
              ))}
            </div>
            <Link href="/knowledge-hub" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-amber-700">
              Explore the Knowledge Hub <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* RIGHT SIDE: PREMIUM QUICK CONSULTATION FORM (7 Columns) */}
          <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 text-left relative overflow-hidden">
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="mb-6 space-y-1">
              <h3 className="text-xl font-bold tracking-wide text-white">
                Request Urgent Consultation
              </h3>
              <p className="text-xs text-slate-400">
                Fill out the quick framework form below; our desk team will
                reply within 24 working hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-slate-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <FaUser size={12} />
                    </span>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Contact Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <FaPhoneAlt size={12} />
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <FaEnvelope size={12} />
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Brief Case / Inquiry Description
                </label>
                <textarea
                  name="message"
                  rows="3"
                  required
                  placeholder="Describe your legal matter or welfare suggestion here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-lg text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 mt-2 shadow-lg"
              >
                <span>{status.loading ? "Submitting…" : "Request Consultation"}</span> <FaPaperPlane size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>
      <SubmissionPopup status={status} onClose={()=>setStatus({loading:false,message:"",type:""})} />
    </section>
  );
}
