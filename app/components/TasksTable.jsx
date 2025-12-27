"use client";
import React from "react";
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineSave, HiOutlineClock, HiOutlineUserCircle } from "react-icons/hi";

export default function TasksTable({ tasks, editingId, setEditingId, handleSave, handleDelete, handleToggleCompleted, getProgress, firstName, handleEditTask }) {
  return (
    <div className="overflow-x-auto custom-scrollbar rounded-3xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/2">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/2 transition-colors">
            {["Assigned To", "Task Title", "Timeline", "Status", "Progress", "Estimated", "Actions"].map((header) => (
              <th key={header} className="py-5 px-6 text-left text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
          {tasks.map((task) => {
            const progress = getProgress(task.start_date, task.end_date);
            return (
              <tr key={task.id} className="group hover:bg-blue-50/50 dark:hover:bg-white/2 transition-all duration-300">
                
                {/* Assigned To */}
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                      <HiOutlineUserCircle size={20} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-bold text-sm">{task.first_name || firstName}</span>
                  </div>
                </td>

                {/* Task Title */}
                <td className="py-4 px-6 min-w-50">
                  {editingId === task.id ? (
                    <input 
                      value={task.title} 
                      onChange={(e) => handleEditTask(task.id, "title", e.target.value)} 
                      className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 px-3 py-2 rounded-xl text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm" 
                    />
                  ) : (
                    <span className={`text-sm font-medium transition-colors ${task.completed ? "text-gray-400 dark:text-gray-500 line-through" : "text-gray-600 dark:text-gray-300"}`}>
                      {task.title}
                    </span>
                  )}
                </td>

                {/* Timeline */}
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex flex-col gap-1 text-[11px] text-gray-500 dark:text-gray-500 uppercase font-bold tracking-tight">
                    <span className="flex items-center gap-1 opacity-80">
                      <span className="w-1 h-1 rounded-full bg-blue-500"></span> Start: {task.start_date || "-"}
                    </span>
                    <span className="flex items-center gap-1 opacity-80">
                      <span className="w-1 h-1 rounded-full bg-purple-500"></span> End: {task.end_date || "-"}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-6 whitespace-nowrap">
                  <button 
                    onClick={() => handleToggleCompleted(task)} 
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black border transition-all active:scale-95 ${
                      task.completed 
                        ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20" 
                        : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20"
                    }`}
                  >
                    {task.completed ? "Completed" : "Active"}
                  </button>
                </td>

                {/* Progress Bar */}
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="w-32 h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full transition-all duration-700 shadow-[0_0_8px_rgba(37,99,235,0.3)] ${progress === 100 ? "bg-green-500" : "bg-blue-600 dark:bg-blue-500"}`} 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                </td>

                {/* Estimated Time */}
                <td className="py-4 px-6 whitespace-nowrap text-xs font-bold text-gray-500 dark:text-gray-400">
                  <HiOutlineClock className="inline mr-1 text-blue-600 dark:text-blue-500" /> 
                  {task.start_date && task.end_date ? `${Math.ceil((new Date(task.end_date) - new Date(task.start_date)) / (1000 * 60 * 60 * 24))}d` : "N/A"}
                </td>

                {/* Actions */}
                <td className="py-4 px-6 whitespace-nowrap flex gap-2">
                  {editingId === task.id ? (
                    <button onClick={() => handleSave(task)} className="p-2 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm">
                      <HiOutlineSave size={18} />
                    </button>
                  ) : (
                    <button onClick={() => setEditingId(task.id)} className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <HiOutlinePencilAlt size={18} />
                    </button>
                  )}
                  <button onClick={() => handleDelete(task.id)} className="p-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                    <HiOutlineTrash size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}