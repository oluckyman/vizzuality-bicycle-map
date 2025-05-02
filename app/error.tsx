"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-gray-700">
      <h2 className="text-3xl font-semibold mb-4 text-gray-600">Something went wrong</h2>
      <p className="mb-6 text-gray-500">See developer logs for details</p>
      <button
        className="text-white px-4 py-2 inline-block bg-blue-500 font-medium rounded-md hover:bg-blue-400 transition-colors"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
