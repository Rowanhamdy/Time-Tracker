"use client";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { HiOutlineLogout } from "react-icons/hi";

export default function LogoutPage() {
  const { logout } = useContext(UserContext);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      logout();
    }
  }, [countdown, logout]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-[#0a0a0a] p-4 relative overflow-hidden text-slate-900 dark:text-white transition-colors duration-500">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-sm text-center">
        <div className="relative flex justify-center mb-10">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-25 scale-150"></div>
          <div className="relative bg-white dark:bg-blue-600/10 border border-slate-200 dark:border-blue-500/20 p-6 rounded-3xl text-blue-600 dark:text-blue-500 shadow-xl dark:shadow-2xl transition-all">
            <HiOutlineLogout size={48} className="animate-pulse" />
          </div>
        </div>

        <div className="space-y-2 mb-12">
          <h2 className="text-3xl font-black tracking-tight italic text-slate-900 dark:text-white">
            Logging <span className="text-blue-600 dark:text-blue-500 font-black">Out</span>
          </h2>
          <p className="text-slate-500 dark:text-gray-500 text-sm font-medium tracking-wide uppercase">
            Safely clearing your session...
          </p>
        </div>

        <div className="relative inline-flex items-center justify-center mb-12 group">
          <span className="text-8xl font-black text-slate-900 dark:text-white transition-all group-hover:scale-110 duration-500">
            {countdown}
          </span>
          <div className="absolute inset-0 border-4 border-slate-200 dark:border-white/5 rounded-full scale-150"></div>
          <div 
            className="absolute inset-0 border-4 border-blue-600 dark:border-blue-500 rounded-full scale-150 transition-all duration-1000 ease-linear shadow-[0_0_20px_rgba(37,99,235,0.2)] dark:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            style={{ 
                clipPath: `inset(${100 - (countdown / 3) * 100}% 0 0 0)`,
                opacity: countdown === 0 ? 0 : 1
            }}
          ></div>
        </div>

        <div className="max-w-50 mx-auto h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-linear-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(37,99,235,0.3)]"
            style={{ width: `${(countdown / 3) * 100}%` }}
          />
        </div>
        
        <p className="text-[10px] text-slate-400 dark:text-gray-600 font-black uppercase tracking-[0.3em] animate-pulse">
          Thank you for using TimeTracker
        </p>
      </div>

      <div className="absolute bottom-10 text-slate-200 dark:text-gray-800 font-black text-6xl opacity-30 dark:opacity-5 pointer-events-none select-none">
        GOODBYE
      </div>
    </div>
  );
}