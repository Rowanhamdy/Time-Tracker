"use client";
import React, { useState } from "react";
import TasksTable from "../components/TasksTable";
import useTasks from "../utils/fetchTasks";
import { editTask } from "../utils/editTask";
import { deleteTask } from "../utils/deleteTask";
import AddTask from "../components/addTask";
import EmptyTasks from "../components/EmptyTasks";
import AuthGuard from "../components/AuthGuard";
import { HiOutlineFilter, HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function TasksPage() {
  const [filter, setFilter] = useState("all"); 
  const [editingId, setEditingId] = useState(null);

  const {
    tasks,
    setAllTasks,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
    firstName,
  } = useTasks(10, false, filter);

  const handleEditTask = (taskId, key, value) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, [key]: value } : t))
    );
  };

  const handleSaveTask = async (task) => {
    await editTask(task.id, task);
    setEditingId(null);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
      setAllTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const handleToggleCompleted = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await editTask(task.id, updatedTask);
    setAllTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updatedTask : t))
    );
  };

  const getProgress = (start_date, end_date) => {
    if (!start_date || !end_date) return 0;
    const start = new Date(start_date).getTime();
    const end = new Date(end_date).getTime();
    const now = Date.now();
    if (now <= start) return 0;
    if (now >= end) return 100;
    return Math.round(((now - start) / (end - start)) * 100);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white pt-24 pb-20 px-4">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-75 h-75 bg-blue-600/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-75 h-75 bg-purple-600/10 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
                Hey, <span className="text-blue-500">{firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : "User"}</span>
              </h1>
              <p className="text-gray-400">Manage your daily goals and track your progress.</p>
            </div>
            <AddTask onTaskAdded={(newTask) => setAllTasks((prev) => [newTask, ...prev])} />
          </div>

          {/* Filter & Controls Container */}
          <div className="bg-white/3 backdrop-blur-md border border-white/10 p-2 rounded-2xl mb-8 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-2 border-r border-white/10 text-gray-400">
              <HiOutlineFilter size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Filter:</span>
            </div>
            
            {["all", "inProgress", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setCurrentPage(1); }}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  filter === f
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {f === "all" ? "All Tasks" : f === "inProgress" ? "In Progress" : "Completed"}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="bg-white/3 backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium animate-pulse">Fetching your tasks...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="py-20 text-center">
                <EmptyTasks />
              </div>
            ) : (
              <TasksTable
                tasks={tasks}
                editingId={editingId}
                setEditingId={setEditingId}
                handleSave={handleSaveTask}
                handleDelete={handleDeleteTask}
                handleToggleCompleted={handleToggleCompleted}
                getProgress={getProgress}
                firstName={firstName}
                handleEditTask={handleEditTask}
              />
            )}

            {/* Pagination Glass Footer */}
            {!loading && tasks.length > 0 && (
              <div className="flex justify-between items-center px-8 py-6 border-t border-white/5 bg-white/1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-20 transition-all active:scale-90"
                >
                  <HiChevronLeft size={24} />
                  <span className="font-bold text-sm hidden sm:block">Previous</span>
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Page</span>
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-lg text-sm font-black">{currentPage}</span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest text-nowrap">of {totalPages}</span>
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-20 transition-all active:scale-90"
                >
                  <span className="font-bold text-sm hidden sm:block">Next</span>
                  <HiChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}