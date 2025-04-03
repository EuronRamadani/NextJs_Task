import { Widget } from "@/types/widget";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/20/solid";
import { formatNumber } from "@/utils/format";

interface WidgetCardProps {
  widget: Widget;
}

export const WidgetCard = ({ widget }: WidgetCardProps) => {
  return (
    <Link
      href={`/widgets/${widget.id}`}
      className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-white truncate pr-4">
          {widget.title}
        </h3>
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-white">{widget.rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-400">
            ({formatNumber(widget.ratingCount)})
          </span>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-400 mb-3">
        <span>{formatNumber(widget.views)} views</span>
        <span className="mx-2">•</span>
        <span>{widget.requests} requests</span>
        <span className="mx-2">•</span>
        <span>{widget.shop.name}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {widget.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
};
