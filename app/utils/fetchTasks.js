"use client";
import { useState, useEffect, useContext, useMemo } from "react";
import { UserContext } from "../context/UserContext";
import { supabase } from "@/lib/db";

export default function useTasks(
  itemsPerPage = 10,
  forceAdmin = false,
  filter = "all"
) {
  const { user } = useContext(UserContext);

  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.loggedIn || !user.id) return;

    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase.from("tasks").select("*");

        if (!forceAdmin && user.role !== "admin") {
          query = query.eq("user_id", user.id);
        }

        const { data, error: fetchError } = await query;
        if (fetchError) throw fetchError;

        setAllTasks(data || []);
      } catch (e) {
        console.error("Error loading tasks:", e.message);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [user.id, user.loggedIn, user.role, forceAdmin, user]); 

  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => {
      if (filter === "inProgress") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });
  }, [allTasks, filter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / itemsPerPage)
  );

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    tasks: paginatedTasks,
    setAllTasks,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
    error,
    firstName: user.firstName,
  };
}