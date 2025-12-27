"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-700 mb-6">
        {error.message || "Unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
