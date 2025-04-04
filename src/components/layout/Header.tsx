"use client";

import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCallback, useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Component with useSearchParams that needs to be wrapped in Suspense
function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  // Update searchTerm if it changes from URL
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  // Create URL with updated params
  const createQueryString = useCallback(
    (params: Record<string, string | string[] | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      // Update search params
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key);
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            newSearchParams.delete(key);
          } else {
            newSearchParams.set(key, value.join(","));
          }
        } else {
          newSearchParams.set(key, value);
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname.includes("/widgets")) {
      router.push(
        `/widgets?${createQueryString({
          search: searchTerm || null,
          page: "1", // Reset to first page on new search
        })}`
      );
    } else {
      // If not on widgets page, redirect to widgets page with search
      router.push(`/widgets?${searchTerm ? `search=${searchTerm}` : ""}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        />
      </div>
    </form>
  );
}

// Loading fallback for search
function SearchBarFallback() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      </div>
      <input
        type="text"
        placeholder="Search widgets..."
        disabled
        className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg block w-full pl-10 pr-3 py-2 focus:outline-none"
      />
    </div>
  );
}

export default function Header() {
  return (
    <header className="bg-black border-b border-gray-800 py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M3.5 5.5L6 3L12 5L18 3L20.5 5.5V18.5L18 21L12 19L6 21L3.5 18.5V5.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5V19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 7.5V17"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 7.5V17"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-semibold mr-1">abyss</span>
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="flex items-center space-x-5">
          <Link
            href="/widgets"
            className="flex items-center text-sm font-medium text-gray-300 hover:text-white bg-gray-800/50 rounded-lg px-3 py-1.5"
          >
            <span className="mr-1">Widgets</span>
            <PlusIcon className="h-5 w-5 text-yellow-400" />
          </Link>
          <div className="flex items-center text-sm font-medium text-gray-400 hover:text-white bg-transparent py-1.5 px-2">
            <span>Requests</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1.5 opacity-60"
            >
              <path
                d="M19 9L12 16L5 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <button className="bg-gray-800/40 p-2 rounded-full text-gray-300 hover:text-white">
            <svg
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              className="text-gray-400"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 15.5V17.25M12 7V12.75"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              />
            </svg>
          </button>
          <button className="bg-gray-800/40 p-2 rounded-full text-gray-300 hover:text-white">
            <svg
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              className="text-gray-400"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M14.8571 15.7143C15.5714 15 16 14 16 13C16 11 14.5 9.5 12.5 9.5H11.4286C9.42857 9.5 8 8 8 6C8 4.5 9 3.42857 10.1429 3.14286"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
              />
            </svg>
          </button>
          <div className="h-9 w-9 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-purple-500">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-full h-full flex items-center justify-center">
              <span className="text-sm font-medium">E</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
