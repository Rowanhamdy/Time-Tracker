"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../schemas/Schema";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/db";
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiArrowRight, HiOutlineBadgeCheck } from "react-icons/hi";

export default function SignupForm() {
  const router = useRouter();
  const [apiMessage, setApiMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (formData) => {
    setApiMessage("");
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { 
            firstName: formData.firstName, 
            lastName: formData.lastName, 
            role: "user" 
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              role: "user"
            }
          ]);

        if (dbError) throw dbError;
      }
      
      setIsSuccess(true);
      setApiMessage("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setIsSuccess(false);
      setApiMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0a] px-4 py-12 relative overflow-hidden pt-20 transition-colors duration-500">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-xl z-10">
        <div className="bg-white dark:bg-white/3 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 transition-colors duration-500">
          
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
              Join <span className="text-blue-600 dark:text-transparent dark:bg-clip-text dark:bg-linear-to-r dark:from-blue-400 dark:to-cyan-400">TimeTracker</span>
            </h2>
            <p className="text-slate-500 dark:text-gray-400 font-medium">Start managing your time like a pro.</p>
          </div>

          {apiMessage && (
            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2 ${
              isSuccess 
                ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20" 
                : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20"
            }`}>
              {isSuccess && <HiOutlineBadgeCheck className="text-xl" />}
              {apiMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest ml-1">First Name</label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" />
                  <input
                    {...register("firstName")}
                    placeholder="John"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-700"
                  />
                </div>
                {errors.firstName && <p className="text-red-500 dark:text-red-400 text-[10px] ml-1">{errors.firstName.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest ml-1">Last Name</label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" />
                  <input
                    {...register("lastName")}
                    placeholder="Doe"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-700"
                  />
                </div>
                {errors.lastName && <p className="text-red-500 dark:text-red-400 text-[10px] ml-1">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" />
                <input
                  {...register("email")}
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-700"
                />
              </div>
              {errors.email && <p className="text-red-500 dark:text-red-400 text-[10px] ml-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-700"
                />
              </div>
              {errors.password && <p className="text-red-500 dark:text-red-400 text-[10px] ml-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 dark:text-gray-500 text-sm font-medium">
              Already part of the team?{" "}
              <a href="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}