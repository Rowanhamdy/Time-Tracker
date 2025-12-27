"use client";
import React, { useState } from "react";
import TasksTable from "./TasksTable";
import useTasks from "../utils/fetchTasks"; 
import { editTask } from "../utils/editTask";
import { deleteTask } from "../utils/deleteTask";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function AdminPageContent() {
  const {
    tasks,
    setAllTasks, 
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
  } = useTasks(10);

  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  const getProgress = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = Date.now();
    if (now <= start) return 0;
    if (now >= end) return 100;
    return Math.round(((now - start) / (end - start)) * 100);
  };

  const handleSave = async (task) => {
    await editTask(task.id, task);
    setEditingId(null);
    setAllTasks((prev) =>
      prev.map((t) => (t.id === task.id ? task : t))
    );
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setAllTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleToggleCompleted = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await editTask(task.id, updatedTask);
    setAllTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updatedTask : t))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "inProgress") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="mt-28 container mx-auto px-6 mb-20 min-h-screen">
      {/* Header & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            System <span className="text-blue-600 dark:text-blue-500">Administration</span>
          </h1>
          <p className="text-slate-500 dark:text-gray-500 text-sm font-medium mt-1">
            Manage all organization tasks and oversight from one place.
          </p>
        </div>

        <div className="flex bg-white dark:bg-white/5 p-1.5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm backdrop-blur-md">
          {["all", "inProgress", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                filter === f
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              {f === "all" ? "All" : f === "inProgress" ? "Progress" : "Done"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-white/2 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-500">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-400 dark:text-gray-500 font-bold text-xs uppercase tracking-widest animate-pulse">
              Fetching Secure Records...
            </p>
          </div>
        ) : (
          <>
            <TasksTable
              tasks={filteredTasks}
              editingId={editingId}
              setEditingId={setEditingId}
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleToggleCompleted={handleToggleCompleted}
              getProgress={getProgress}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/1 gap-4">
              <p className="text-xs text-slate-500 dark:text-gray-500 font-medium tracking-tight">
                Showing <span className="text-slate-900 dark:text-white font-bold">Page {currentPage}</span> of {totalPages}
              </p>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-400 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <HiOutlineChevronLeft size={20} />
                </button>

                <div className="flex gap-1 overflow-x-auto max-w-50 sm:max-w-none">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 min-w-10 rounded-xl text-xs font-bold transition-all ${
                        currentPage === i + 1 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" 
                        : "bg-white dark:bg-white/5 text-slate-400 dark:text-gray-500 border border-slate-100 dark:border-transparent hover:bg-slate-100 dark:hover:bg-white/10"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-400 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <HiOutlineChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}