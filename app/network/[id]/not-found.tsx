import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-gray-700">
      <h2 className="text-3xl font-semibold mb-4 text-gray-600">404 Not Found</h2>
      <p className="mb-6 text-gray-500">Could not find the requested bike network.</p>
      <Link
        href="/"
        className="text-white px-4 py-2 inline-block bg-blue-500 font-medium rounded-md hover:bg-blue-400 transition-colors"
      >
        Return Home
      </Link>
    </main>
  );
}
