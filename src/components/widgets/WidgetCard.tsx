import { Widget } from "@/types/widget";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import { formatNumber } from "@/utils/format";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
  selectIsFavoriteLoading,
} from "@/store/services/favoritesSlice";

interface WidgetCardProps {
  widget: Widget;
}

export default function WidgetCard({ widget }: WidgetCardProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(widget.id));
  const isLoading = useAppSelector(selectIsFavoriteLoading(widget.id));

  // Prevent navigation when clicking the favorite button
  const handleFavoriteClick = (e: React.MouseEvent) => {
    if (isLoading) return;

    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFavorite(widget.id));
    } else {
      dispatch(addFavorite(widget.id));
    }
  };

  // Fixed tags that match the image for demo purposes
  const fixedTags = ["css", "cross-browser", "highlighting", "textselection"];

  return (
    <Link
      href={`/widgets/${widget.id}`}
      className="block bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-md font-medium text-white truncate pr-2">
            {widget.title}
          </h2>
          <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              isLoading
                ? "text-gray-500 cursor-wait"
                : isFavorite
                ? "text-red-500"
                : "text-gray-500 hover:text-gray-300"
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
                className="animate-spin h-4 w-4"
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
              <HeartIconSolid className="h-4 w-4" />
            ) : (
              <HeartIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.floor(widget.rating)
                      ? "text-yellow-400"
                      : star <= widget.rating
                      ? "text-yellow-400/80"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-300">
              {widget.rating.toFixed(1)}
            </span>
          </div>
          <div className="mx-2 text-gray-600">•</div>
          <div className="flex items-center">
            <span className="text-sm text-gray-400">{widget.shop.name}</span>
          </div>
        </div>

        <div className="flex items-center text-xs text-gray-500">
          <span>{formatNumber(widget.views)} views</span>
          <span className="mx-2">•</span>
          <span>{formatNumber(widget.ratingCount)} requests</span>
        </div>
      </div>

      <div className="border-t border-gray-800 py-2 px-3 grid grid-cols-4 gap-2 text-xs">
        {fixedTags.slice(0, 4).map((tag) => (
          <div
            key={tag}
            className="flex items-center justify-center text-gray-400"
          >
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}
