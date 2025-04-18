"use client";

import { StarIcon } from "@heroicons/react/20/solid";
import {
  DocumentIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import { Widget } from "@/types/widget";
import { formatFileSize } from "@/utils/format";
import Header from "./layout/Header";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
  selectIsFavoriteLoading,
} from "@/store/services/favoritesSlice";
import { useWidgetRating } from "@/hooks/useWidgetRating";

interface WidgetDetailsProps {
  widget: Widget;
}

export default function WidgetDetails({ widget }: WidgetDetailsProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(widget.id));
  const isLoading = useAppSelector(selectIsFavoriteLoading(widget.id));

  // Use the hook but we'll display fixed values to match the design
  useWidgetRating({
    initialRating: widget.rating,
    ratingCount: widget.ratingCount,
    onRatingChange: (newRating) => {
      console.log(`User rated widget ${widget.id} with ${newRating} stars`);
      // In a real app, this would call an API to save the rating
    },
  });

  // Toggle favorite status
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(widget.id));
    } else {
      dispatch(addFavorite(widget.id));
    }
  };

  useEffect(() => {
    // Immediately set up the fallback content since we know the image won't load
    if (imageContainerRef.current) {
      imageContainerRef.current.classList.add(
        "flex",
        "items-center",
        "justify-center"
      );
      const text = document.createElement("div");
      text.className = "text-4xl font-bold text-white/80";
      text.textContent = "MARKETING CAMPAIGN DRAFT";
      imageContainerRef.current.appendChild(text);
    }
  }, []);

  // Helper function for getting clickable star props (without using the hook's return value)
  const getStarProps = (star: number) => ({
    onClick: () => console.log(`Rating: ${star}`),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        console.log(`Rating: ${star}`);
      }
    },
    tabIndex: 0,
    role: "button",
    "aria-label": `Rate ${star} stars`,
  });

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">{widget.title}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div
                ref={imageContainerRef}
                className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-orange-500 to-blue-600"
              >
                {/* The MARKETING CAMPAIGN DRAFT text will be added by the useEffect */}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {widget.tags && widget.tags.length > 0 ? (
                  widget.tags.map((tag) => (
                    <div
                      key={tag}
                      className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-md"
                    >
                      {tag}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-md">
                      css
                    </div>
                    <div className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-md">
                      cross-browser
                    </div>
                    <div className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-md">
                      highlighting
                    </div>
                    <div className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-md">
                      textselection
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8">
                <h2 className="text-xl text-gray-400 mb-4">Example Output</h2>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <DocumentIcon className="h-6 w-6 text-gray-400" />
                    <span className="text-gray-300">
                      Marketing_Campaign.pdf
                    </span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {formatFileSize(3276800)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl text-gray-400 mb-4">Discussion</h2>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-sm font-medium">D</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">doirogue</span>
                        <span className="text-xs text-gray-500 ml-2">
                          24 hr ago
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          (edited)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pl-10">
                    <p className="text-gray-300 mb-2">
                      I wouldn&apos;t call concurrent.futures more
                      &quot;advanced&quot; - it&apos;s a simpler interface that
                      works very much the same regardless of whether you use
                      multiple threads or multiple processes as the underlying
                      parallelization gimmick.
                    </p>
                    <p className="text-gray-300">
                      Personally I think that to import multiprocessing as mp
                      def mp_factorizer_map(nums, nprocs): with mp.Pool(nprocs)
                      as pool: return (num:factors for num, factors in zip(nums,
                      pool.map(factorize_naive, nums)))
                    </p>
                    <div className="flex items-center mt-3">
                      <button className="text-gray-500 hover:text-gray-300 flex items-center text-xs">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          className="mr-1"
                        >
                          <path
                            fill="currentColor"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          />
                        </svg>
                        18k
                      </button>
                      <button className="text-gray-500 hover:text-gray-300 flex items-center text-xs ml-3">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          className="mr-1"
                        >
                          <path
                            fill="currentColor"
                            d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
                          />
                        </svg>
                        Reply
                      </button>
                      <button className="text-gray-500 hover:text-gray-300 text-xs ml-3">
                        View replies (2)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-sm font-medium">D</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">doirogue</span>
                        <span className="text-xs text-gray-500 ml-2">
                          24 hr ago
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          (edited)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pl-10">
                    <p className="text-gray-300 mb-2">
                      I wouldn&apos;t call concurrent.futures more
                      &quot;advanced&quot; - it&apos;s a simpler interface that
                      works very much the same
                    </p>
                    <div className="flex items-center mt-3">
                      <button className="text-gray-500 hover:text-gray-300 flex items-center text-xs">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          className="mr-1"
                        >
                          <path
                            fill="currentColor"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          />
                        </svg>
                        18k
                      </button>
                      <button className="text-gray-500 hover:text-gray-300 flex items-center text-xs ml-3">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          className="mr-1"
                        >
                          <path
                            fill="currentColor"
                            d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
                          />
                        </svg>
                        Reply
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 mb-6">
                  <div className="flex bg-gray-900 border border-gray-800 p-4 rounded-lg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-gray-500 mr-3"
                    >
                      <path
                        d="M12 15.5V17.25M12 7V12.75"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Share your thoughts..."
                        className="bg-transparent w-full outline-none text-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex justify-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        {...getStarProps(star)}
                        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm"
                      >
                        <StarIcon
                          className={`h-8 w-8 ${
                            star <= 3.6
                              ? "text-yellow-400"
                              : star <= 3.6
                              ? "text-yellow-400/80"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center mb-6">
                  <div className="text-2xl font-semibold">3.6</div>
                  <div className="text-gray-400 text-sm">1 Rating</div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>You have 2 free runs</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-black mr-2">
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M12 4v16m-8-8h16"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 text-sm font-medium">7.2</div>
                    <div className="text-xs text-yellow-400">10%</div>
                  </div>
                </div>

                <button
                  className="w-full bg-amber-800 hover:bg-amber-700 text-white font-medium py-3 rounded-md mb-4 transition-colors"
                  aria-label="Get started with this widget"
                >
                  GET STARTED
                </button>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={toggleFavorite}
                    disabled={isLoading}
                    className={`p-2 ${
                      isLoading
                        ? "text-gray-500 cursor-wait"
                        : isFavorite
                        ? "text-red-500"
                        : "text-gray-400 hover:text-white"
                    }`}
                    aria-label={
                      isLoading
                        ? "Loading..."
                        : isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : isFavorite ? (
                      <HeartIconSolid className="h-5 w-5" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-white"
                    aria-label="Share this widget"
                  >
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
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
