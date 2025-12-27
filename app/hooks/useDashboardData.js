"use client";

import { useMemo } from "react";
import useTasks from "../utils/fetchTasks";
import { getTasksByWeek } from "../utils/useGetWeekTasks";
import { getTasksByMonth } from "../utils/useGetMonthTasks";
import { getTasksByYear } from "../utils/getTasksByYear";

export default function useDashboardData() {
  const { tasks, loading } = useTasks(1000);

  const { weekData, monthData, yearData } = useMemo(() => {
    return {
      weekData: tasks ? getTasksByWeek(tasks) : [],
      monthData: tasks ? getTasksByMonth(tasks) : [],
      yearData: tasks ? getTasksByYear(tasks) : [],
    };
  }, [tasks]);

  const overviewData = useMemo(() => {
    if (!tasks || tasks.length === 0) return [];

    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const getMIndex = (dateInput) => {
      if (!dateInput) return -1;
      const d = new Date(dateInput);
      return isNaN(d.getTime()) ? -1 : d.getMonth();
    };

    return allMonths.map((monthName, index) => {
      const yearTotal = yearData
        .filter(d => getMIndex(d.month) === index)
        .reduce((sum, d) => sum + (Number(d.tasks) || 0), 0);

      const monthTotal = monthData
        .filter(d => getMIndex(d.date) === index)
        .reduce((sum, d) => sum + (Number(d.tasks) || 0), 0);

      const weekTotal = weekData
        .filter(d => getMIndex(d.date) === index)
        .reduce((sum, d) => sum + (Number(d.tasks) || 0), 0);

      return {
        name: monthName,
        week: weekTotal,
        month: monthTotal,
        year: yearTotal,
      };
    });
  }, [tasks, weekData, monthData, yearData]);

  return { weekData, monthData, yearData, overviewData, loading };
}