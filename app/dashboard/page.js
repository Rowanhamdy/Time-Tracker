"use client";

import AuthGuard from "../components/AuthGuard";
import useDashboardData from "../hooks/useDashboardData";
import LineChartCard from "../components/charts/LineChartCard";
import PieChartCard from "../components/charts/PieChartCard";
import BarChartCard from "../components/charts/BarChartCard";
import OverviewChart from "../components/charts/OverviewChart";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";
import { generateColors } from "../utils/chartColors";
import {
  HiOutlineChartPie,
  HiOutlineTrendingUp,
  HiOutlineCalendar,
  HiOutlinePresentationChartBar,
} from "react-icons/hi";

export default function Dashboard() {
  const { weekData, monthData, yearData, overviewData, loading } =
    useDashboardData();

  if (loading) {
    return (
      <AuthGuard>
        <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] pt-24 px-6 transition-colors duration-500">
          <div className="mx-auto max-w-7xl">
            <DashboardSkeleton />
          </div>
        </main>
      </AuthGuard>
    );
  }

  const pieColors = generateColors(weekData.length);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white pt-24 pb-12 px-4 md:px-10 relative overflow-hidden transition-colors duration-500">
        
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-cyan-500/5 dark:bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-10">
            <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
              Performance <span className="text-blue-600 dark:text-blue-500">Analytics</span>
            </h1>
            <p className="text-slate-500 dark:text-gray-400 font-medium">
              Monitor your productivity and task distribution in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card: Daily Progress */}
            <div className="bg-white dark:bg-white/3 backdrop-blur-md border border-slate-200 dark:border-white/5 p-6 rounded-[2.5rem] shadow-xl dark:shadow-2xl transition-all hover:border-blue-500/30 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-500">
                  <HiOutlineTrendingUp size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-gray-200">
                  Daily Progress
                </h3>
              </div>
              <LineChartCard
                title=""
                data={monthData}
                xKey="date"
                dataKey="tasks"
                color="#2563eb" 
              />
            </div>

            {/* Card: Weekly Distribution */}
            <div className="bg-white dark:bg-white/3 backdrop-blur-md border border-slate-200 dark:border-white/5 p-6 rounded-[2.5rem] shadow-xl dark:shadow-2xl transition-all hover:border-purple-500/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-500/10 rounded-2xl text-purple-600 dark:text-purple-500">
                  <HiOutlineChartPie size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-gray-200">
                  Weekly Distribution
                </h3>
              </div>
              <PieChartCard
                title=""
                data={weekData}
                dataKey="tasks"
                nameKey="date"
                colors={pieColors}
              />
            </div>

            <div className="bg-white dark:bg-white/3 backdrop-blur-md border border-slate-200 dark:border-white/5 p-6 rounded-[2.5rem] shadow-xl dark:shadow-2xl transition-all hover:border-green-500/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-500/10 rounded-2xl text-green-600 dark:text-green-500">
                  <HiOutlineCalendar size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-gray-200">
                  Yearly Overview
                </h3>
              </div>
              <BarChartCard
                title=""
                data={yearData}
                xKey="month"
                dataKey="tasks"
                color="#059669" 
              />
            </div>

            {/* Card: Total Insights */}
            <div className="bg-white dark:bg-white/3 backdrop-blur-md border border-slate-200 dark:border-white/5 p-6 rounded-[2.5rem] shadow-xl dark:shadow-2xl transition-all hover:border-cyan-500/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-500/10 rounded-2xl text-cyan-600 dark:text-cyan-500">
                  <HiOutlinePresentationChartBar size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-gray-200">
                  Total Insights
                </h3>
              </div>
              <OverviewChart data={overviewData} />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}