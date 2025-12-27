"use client";
import React, { useState, useContext } from "react";
import { supabase } from "@/lib/db";
import { UserContext } from "../context/UserContext";
import { HiPlusCircle, HiOutlineDocumentText, HiCheckCircle } from "react-icons/hi";

export default function AddTask({ onTaskAdded }) {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      setMessage("Error: User not found. Please login.");
      return;
    }

    setIsLoading(true);
    const newTask = {
      title,
      start_date: startDate,
      end_date: endDate,
      completed: false,
      user_id: user.id,
      first_name: user.firstName,
    };

    try {
      const { data, error } = await supabase.from("tasks").insert([newTask]).select();
      if (error) throw error;

      setMessage("Task added successfully!");
      setTitle("");
      setStartDate("");
      setEndDate("");
      if (onTaskAdded && data?.length) onTaskAdded(data[0]);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-white/3 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 rounded-[2.5rem] shadow-xl dark:shadow-2xl relative overflow-hidden group transition-all hover:border-blue-500/30">
      
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all"></div>

      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-3 bg-blue-600/10 dark:bg-blue-600/20 rounded-2xl text-blue-600 dark:text-blue-500 shadow-inner">
          <HiPlusCircle size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Create New Task</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-widest">Plan your next move</p>
        </div>
      </div>

      <form onSubmit={handleAddTask} className="grid grid-cols-1 lg:grid-cols-7 gap-5 items-end relative z-10">
        
        {/* Task Title */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] ml-1">
            Task Objective
          </label>
          <div className="relative group/input">
            <HiOutlineDocumentText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-blue-600 dark:group-focus-within/input:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="E.g. Design System Phase 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/10 pl-11 pr-4 py-3.5 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
              required
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="lg:col-span-1.5 flex flex-col gap-2">
          <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] ml-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/10 px-4 py-3.5 rounded-2xl text-gray-600 dark:text-gray-400 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
          />
        </div>

        {/* End Date */}
        <div className="lg:col-span-1.5 flex flex-col gap-2">
          <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] ml-1">
            Deadline
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/10 px-4 py-3.5 rounded-2xl text-gray-600 dark:text-gray-400 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-1">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-13.5 flex items-center justify-center bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 dark:hover:bg-blue-500 active:scale-95 transition-all shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)] disabled:opacity-50`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Launch"
            )}
          </button>
        </div>
      </form>

      {/* Modern Toast/Message */}
      {message && (
        <div className={`mt-6 flex items-center gap-3 p-4 rounded-2xl border transition-all animate-in fade-in slide-in-from-bottom-4 ${
          message.includes("Error") 
            ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20" 
            : "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20"
        }`}>
          {!message.includes("Error") && <HiCheckCircle size={20} />}
          <span className="text-sm font-bold tracking-tight">{message}</span>
        </div>
      )}
    </div>
  );
}