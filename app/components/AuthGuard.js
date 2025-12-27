"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children, adminOnly = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    // Run asynchronously to avoid sync state update warning
    const checkAuth = async () => {
      if (!token) {
        router.push("/login");
      } else if (adminOnly && role !== "admin") {
        router.push("/tasks");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, adminOnly]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return <>{children}</>;
}
