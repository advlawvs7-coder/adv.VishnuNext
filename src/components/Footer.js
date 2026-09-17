// components/Footer.js
"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaRegEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80 text-left">
          {/* Column 1: Profile & Credentials */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-wide border-l-4 border-amber-500 pl-3">
              Advocate Dr. Vishnu Sharma
            </h3>
            <p className="text-xs font-medium text-amber-500 tracking-wider uppercase">
              Former Co-Chairman & Hony. Secretary, Bar Council of Delhi
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              LAWVS Legal India Pvt Ltd. Championing young advocate welfare and
              dedicated to legal excellence across Delhi/NCR.
            </p>
          </div>

          {/* Column 2: Quick Corporate Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About Advocate Vishnu", path: "/about" },
                { name: "Knowledge Hub", path: "/knowledge-hub" },
                { name: "Gallery", path: "/gallery" },
                { name: "Insights & Blogs", path: "/blogs" },
                { name: "Get In Touch", path: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.path}
                    className="hover:text-amber-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="text-amber-500 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                      →
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Help desk */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Official Helpline
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <span className="text-amber-500">📞</span>
                <a
                  href="tel:+918171974067"
                  className="hover:text-white transition"
                >
                  +91 8171974067
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-amber-500">✉️</span>
                <a
                  href="mailto:info@advocatevishnu.com"
                  className="hover:text-white transition"
                >
                  info@advocatevishnu.com
                </a>
              </p>
              <p className="text-xs leading-relaxed">
                <span className="text-amber-500">📍</span> Bar Council of Delhi,
                New Delhi, India
              </p>
            </div>
          </div>

          {/* Column 4: Premium Network Portals */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Our Network Portals
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://lawvs.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 px-4 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 group-hover:text-amber-400 transition">
                    Legal Services
                  </span>
                  <span className="text-sm font-bold text-white tracking-wide">
                    LAWVS.COM
                  </span>
                </div>
                <span className="text-slate-500 group-hover:text-white transition">
                  ↗
                </span>
              </a>

              <a
                href="https://advocatematrimony.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 px-4 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 group-hover:text-pink-400 transition">
                    Matrimonial Law
                  </span>
                  <span className="text-sm font-bold text-white tracking-wide">
                    Advocate Matrimony
                  </span>
                </div>
                <span className="text-slate-500 group-hover:text-white transition">
                  ↗
                </span>
              </a>

              <a
                href="https://debtrecoverservices.com/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 px-4 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 group-hover:text-blue-400 transition">
                    Debt Recovery Services
                  </span>
                  <span className="text-sm font-bold text-white tracking-wide">
                    debtrecoverservices.com
                  </span>
                </div>
                <span className="text-slate-500 group-hover:text-white transition">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Social Icons & Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          {/* Copyright text */}
          <div className="text-xs text-slate-500 space-y-1 ordenar-2 sm:order-1">
            <p>© 2026 Advocate Vishnu Sharma Campaign. All rights reserved.</p>
            <p className="text-slate-600 font-medium">
              Committed to Young Advocate Welfare & Bar Council Excellence
            </p>
          </div>

          {/* Social Icons Loop */}
          <div className="flex items-center gap-3 order-1 sm:order-2">
            {[
              {
                href: "https://www.facebook.com/vishnu.sharma.10441861",
                icon: <FaFacebookF size={14} />,
                color: "hover:bg-blue-600 hover:text-white",
              },
              {
                href: "https://www.instagram.com/advvishnusharma.bcd",
                icon: <FaInstagram size={14} />,
                color:
                  "hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-purple-600 hover:text-white",
              },
              {
                href: "https://www.youtube.com/@LAWVSLEGAL",
                icon: <FaYoutube size={14} />,
                color: "hover:bg-red-600 hover:text-white",
              },
              {
                href: "https://x.com/LawvsF",
                icon: <FaXTwitter size={14} />,
                color: "hover:bg-black hover:text-white",
              },
              {
                href: "https://www.linkedin.com/in/advocate-dr-vishnu-sharma-94213353",
                icon: <FaLinkedinIn size={14} />,
                color: "hover:bg-blue-700 hover:text-white",
              },
              //   {
              //     href: "mailto:info@advocatevishnu.com?subject=Legal%20Consultation&body=Hello%20Advocate%20Vishnu,",
              //     icon: <FaRegEnvelope size={14} />,
              //     color: "hover:bg-amber-500 hover:text-slate-900",
              //   },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700/30 transition-all duration-300 transform hover:-translate-y-1 shadow-md ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
