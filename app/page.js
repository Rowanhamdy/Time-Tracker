"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  HiArrowRight,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineLightningBolt,
  HiOutlineDocumentText,
} from "react-icons/hi";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="my-background min-h-screen pt-20 pb-10 flex items-center justify-center overflow-hidden transition-colors duration-500">
      
      <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[100px] z-2"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-cyan-500/10 dark:bg-cyan-600/20 rounded-full blur-[100px] z-2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-sm font-bold mb-6 animate-fade-in backdrop-blur-sm">
            <HiOutlineLightningBolt className="animate-pulse" />
            <span>Smart Task Management</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black mb-6 tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
            Time
            <span className="text-cyan-600 dark:text-transparent dark:bg-clip-text dark:bg-linear-to-r dark:from-blue-400 dark:to-cyan-400">
              Tracker
            </span>
          </h1>

          <p className="text-slate-700 dark:text-white/90 text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed font-semibold">
            Master your schedule with precision. Track tasks, manage team
            productivity, and reach your goals with our all-in-one time
            management suite.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link
              href="/login"
              className="group flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 dark:bg-cyan-600 text-white rounded-2xl font-bold hover:bg-blue-700 dark:hover:bg-cyan-700 transition-all shadow-xl shadow-blue-600/30 active:scale-95 z-20"
            >
              Get Started
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/signUp"
              className="flex items-center justify-center px-10 py-4 bg-white/20 dark:bg-transparent border-2 border-slate-300 dark:border-gray-700 text-slate-900 dark:text-white rounded-2xl font-bold hover:bg-white/40 dark:hover:bg-white/5 backdrop-blur-md transition-all active:scale-95 z-20"
            >
              Create Account
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24 border-t border-slate-300 dark:border-white/10 pt-12 w-full max-w-4xl">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-white/50 dark:bg-blue-500/10 rounded-xl backdrop-blur-sm shadow-sm border border-white/20">
                <HiOutlineClock className="text-blue-600 dark:text-blue-400 text-3xl" />
              </div>
              <span className="text-slate-800 dark:text-gray-200 font-extrabold tracking-tight">
                Real-time Tracking
              </span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-white/50 dark:bg-cyan-500/10 rounded-xl backdrop-blur-sm shadow-sm border border-white/20">
                <HiOutlineCheckCircle className="text-cyan-600 dark:text-cyan-400 text-3xl" />
              </div>
              <span className="text-slate-800 dark:text-gray-200 font-extrabold tracking-tight">
                Task Completion
              </span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-white/50 dark:bg-purple-500/10 rounded-xl backdrop-blur-sm shadow-sm border border-white/20">
                <HiOutlineDocumentText className="text-purple-600 dark:text-purple-400 text-3xl" />
              </div>
              <span className="text-slate-800 dark:text-gray-200 font-extrabold tracking-tight">
                Smart Reporting
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}