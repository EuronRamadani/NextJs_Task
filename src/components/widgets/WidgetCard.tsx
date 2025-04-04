import { Widget } from "@/types/widget";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/20/solid";
import { formatNumber } from "@/utils/format";

interface WidgetCardProps {
  widget: Widget;
}

export default function WidgetCard({ widget }: WidgetCardProps) {
  // Use fixed tags that match the image for demo purposes
  const fixedTags = ["css", "cross-browser", "highlighting", "textselection"];

  return (
    <Link
      href={`/widgets/${widget.id}`}
      className="block bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
    >
      <div className="p-4">
        <h2 className="text-md font-medium text-white mb-1 truncate">
          {widget.title}
        </h2>

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
