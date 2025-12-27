"use client";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/5 pt-16 pb-8 text-slate-500 dark:text-gray-400 relative overflow-hidden transition-colors duration-500">
      
      <div className="absolute bottom-0 left-0 w-50 h-50 bg-blue-600/5 dark:bg-blue-600/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="text-white font-black text-sm italic">T</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                Time<span className="text-blue-500">Tracker</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-gray-400">
              Elevate your productivity with our professional task management dashboard. 
              Track, manage, and succeed with precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-[0.2em]">Quick Links</h2>
            <ul className="space-y-3 text-sm">
              {["Home", "Dashboard", "Tasks", "Profile"].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                    className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-slate-300 dark:bg-gray-700 rounded-full"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-[0.2em]">Follow Us</h2>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, color: "hover:bg-blue-600" },
                { icon: <FaTwitter />, color: "hover:bg-sky-500" },
                { icon: <FaInstagram />, color: "hover:bg-pink-600" },
                { icon: <FaLinkedinIn />, color: "hover:bg-blue-700" },
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-white transition-all duration-300 border border-slate-200 dark:border-white/5 ${social.color} hover:text-white hover:border-transparent`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-[0.2em]">Contact</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <HiOutlineMail className="text-blue-600 dark:text-blue-500 mt-1" size={18} />
                <span className="text-slate-600 dark:text-gray-400">Rowaaanhamdy2001@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlinePhone className="text-blue-600 dark:text-blue-500 mt-1" size={18} />
                <span className="text-slate-600 dark:text-gray-400">+1 (234) 567-890</span>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-blue-600 dark:text-blue-500 mt-1" size={18} />
                <span className="text-slate-600 dark:text-gray-400">123 Dashboard St, City, Country</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 dark:border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-600">
            © {new Date().getFullYear()} Time Tracker. Built with Passion.
          </p>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-600">
            <a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}