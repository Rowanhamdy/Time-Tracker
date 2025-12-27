"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/Schema";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";
import { supabase } from "@/lib/db";
import { HiOutlineMail, HiOutlineLockClosed, HiArrowRight } from "react-icons/hi";

export default function LoginForm() {
  const { login } = useContext(UserContext);
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginUser = async (data) => {
    setApiError("");
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) { setApiError(authError.message); return; }

      const { data: { user } } = await supabase.auth.getUser();

      login({
        id: user.id,
        role: user.user_metadata?.role || "user",
        firstName: user.user_metadata?.firstName || "",
        lastName: user.user_metadata?.lastName || "",
        email: user.email,
        profileImage: user.user_metadata?.profileImage || "/user.png",
      });

      router.push(user.user_metadata?.role === "admin" ? "/admin" : "/tasks");
    } catch (err) {
      setApiError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0a] px-4 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-cyan-500/10 dark:bg-cyan-600/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white dark:bg-white/3 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              Welcome <span className="text-blue-600 dark:text-blue-500">Back</span>
            </h2>
            <p className="text-slate-500 dark:text-gray-400 text-sm">Please enter your details to sign in</p>
          </div>

          {apiError && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 py-3 px-4 rounded-xl text-sm text-center mb-6">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(loginUser)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 text-xl" />
                <input
                  {...register("email")}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-blue-600 dark:text-blue-500 font-bold hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 text-xl" />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 dark:text-gray-500 text-sm font-medium">
              New here?{" "}
              <a href="/signUp" className="text-blue-600 dark:text-white font-bold hover:underline transition-colors">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}