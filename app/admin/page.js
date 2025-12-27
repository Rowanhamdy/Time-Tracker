"use client";
import React from "react";
import AuthGuard from "../components/AuthGuard";
import AdminPageContent from "../components/AdminPageContent";

export default function Admin() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-500">
      
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-75 h-75 bg-indigo-500/5 dark:bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <AuthGuard adminOnly={true}>
        <div className="relative z-10">
          <AdminPageContent />
        </div>
      </AuthGuard>
    </main>
  );
}