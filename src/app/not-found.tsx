"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Widget Not Found</h2>
          <p className="text-gray-400 mb-8">
            The widget you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/widgets"
            className="px-4 py-2 bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-400 transition-colors"
          >
            Back to Widgets
          </Link>
        </div>
      </main>
      <footer className="bg-gray-900 border-t border-gray-800 py-2 px-4 text-xs text-gray-500">
        <div className="flex justify-center space-x-4">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Contact</span>
          <span>Docs</span>
        </div>
        <div className="text-center mt-1">&copy; 2024. All rights reserved</div>
      </footer>
    </div>
  );
}
