"use client";

import { useGetWidgetsQuery } from "@/store/api/widgetApi";
import Header from "@/components/layout/Header";
import WidgetCard from "@/components/widgets/WidgetCard";
import { useEffect, useState, Suspense } from "react";
import { Widget, WidgetFilters } from "@/types/widget";
import { useSearchParams } from "next/navigation";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";

const AVAILABLE_TAGS = [
  "marketing",
  "automation",
  "travel",
  "advertising",
  "social media",
  "content",
  "AI",
  "email",
  "analytics",
  "flights",
  "optimization",
];

// Create a client component that uses useSearchParams inside Suspense
function WidgetsList() {
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Get all query params for filtering
  const search = searchParams.get("search") || undefined;
  const tags =
    searchParams.get("tags")?.split(",").filter(Boolean) || undefined;
  const sort = (searchParams.get("sort") as WidgetFilters["sort"]) || undefined;
  const page = Number(searchParams.get("page")) || 1;

  // Create the query object
  const queryParams: WidgetFilters = {
    ...(search && { search }),
    ...(tags && { tags }),
    ...(sort && { sort }),
    page,
    pageSize: 8,
  };

  // Use RTK Query to fetch widgets with filters
  const { data, isLoading, error } = useGetWidgetsQuery(queryParams);
  const [widgets, setWidgets] = useState<Widget[]>([]);

  // Since we don't have a real API, we'll use the hardcoded data from the query
  // When the api response is ready, this would be replaced with real data
  useEffect(() => {
    if (data?.widgets) {
      // Use server data when available
      setWidgets(data.widgets);
    } else {
      // Use local fallback data from the import
      import("@/data/widgets.json").then((module) => {
        setWidgets(module.default.widgets);
      });
    }
  }, [data]);

  // Duplicate the widgets to have more items for the grid
  const duplicatedWidgets = [
    ...widgets,
    ...widgets.map((w) => ({ ...w, id: `${w.id}-copy-1` })),
    ...widgets.map((w) => ({ ...w, id: `${w.id}-copy-2` })),
    ...widgets.map((w) => ({ ...w, id: `${w.id}-copy-3` })),
  ];

  // Handle tag toggle
  const toggleTag = (tag: string) => {
    const currentTags = tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newTags.length > 0) {
      newSearchParams.set("tags", newTags.join(","));
    } else {
      newSearchParams.delete("tags");
    }
    newSearchParams.set("page", "1"); // Reset to first page on filter change
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event("popstate"));
  };

  // Handle sort change
  const handleSortChange = (sort: WidgetFilters["sort"]) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (sort) {
      newSearchParams.set("sort", sort);
    } else {
      newSearchParams.delete("sort");
    }
    newSearchParams.set("page", "1"); // Reset to first page on sort change
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event("popstate"));
  };

  // Clear all filters
  const clearFilters = () => {
    const newSearchParams = new URLSearchParams();
    if (search) newSearchParams.set("search", search);
    window.history.pushState(
      null,
      "",
      search ? `?${newSearchParams.toString()}` : window.location.pathname
    );
    window.dispatchEvent(new Event("popstate"));
  };

  const currentTags = tags || [];

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between mt-2">
          <button
            type="button"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center text-sm text-gray-400 hover:text-gray-300"
          >
            <FunnelIcon className="h-4 w-4 mr-1" />
            Filters {currentTags.length > 0 && `(${currentTags.length})`}
          </button>

          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm text-gray-400">
              Sort:
            </label>
            <select
              id="sort"
              value={sort || "popular"}
              onChange={(e) =>
                handleSortChange(e.target.value as WidgetFilters["sort"])
              }
              className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            >
              <option value="popular">Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="recent">Recent</option>
            </select>
          </div>
        </div>

        {isFiltersOpen && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mt-3 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-300">Filter by tags</h3>
              {(currentTags.length > 0 || search) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-400 hover:text-gray-300 flex items-center"
                >
                  <XMarkIcon className="h-3 w-3 mr-1" />
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    currentTags.includes(tag)
                      ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                      : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4 bg-gray-900 rounded-lg">
          Error loading widgets. Please try again later.
        </div>
      ) : widgets.length === 0 ? (
        <div className="text-center text-gray-400 p-8 bg-gray-900 rounded-lg">
          No widgets found matching your criteria. Try adjusting your filters.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {duplicatedWidgets.map((widget) => (
              <WidgetCard key={widget.id} widget={widget} />
            ))}
          </div>

          {data && data.total > data.pageSize && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    // Handle pagination with URL params
                    const newSearchParams = new URLSearchParams(
                      searchParams.toString()
                    );
                    newSearchParams.set("page", String(Math.max(1, page - 1)));
                    window.history.pushState(
                      null,
                      "",
                      `?${newSearchParams.toString()}`
                    );
                    window.dispatchEvent(new Event("popstate"));
                  }}
                  disabled={page === 1}
                  className={`px-3 py-1 rounded-md ${
                    page === 1
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Previous
                </button>

                <span className="text-gray-400 text-sm px-2">
                  Page {page} of {Math.ceil(data.total / data.pageSize)}
                </span>

                <button
                  onClick={() => {
                    // Handle pagination with URL params
                    const newSearchParams = new URLSearchParams(
                      searchParams.toString()
                    );
                    newSearchParams.set("page", String(page + 1));
                    window.history.pushState(
                      null,
                      "",
                      `?${newSearchParams.toString()}`
                    );
                    window.dispatchEvent(new Event("popstate"));
                  }}
                  disabled={page >= Math.ceil(data.total / data.pageSize)}
                  className={`px-3 py-1 rounded-md ${
                    page >= Math.ceil(data.total / data.pageSize)
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </>
  );
}

// Loading fallback for the Suspense boundary
function WidgetsListFallback() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
    </div>
  );
}

export default function WidgetListPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<WidgetsListFallback />}>
            <WidgetsList />
          </Suspense>
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
