import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { formatNumber } from "@/utils/format";
import widgetsData from "@/data/widgets.json";

export default function WidgetListPage() {
  const widgets = widgetsData.widgets;

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {widgets.map((widget) => (
            <Link
              key={widget.id}
              href={`/widgets/${widget.id}`}
              className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{widget.title}</h2>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1">{widget.rating.toFixed(1)}</span>
                  <span className="ml-1 text-gray-400">
                    ({formatNumber(widget.ratingCount)})
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {widget.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{formatNumber(widget.views)} views</span>
                <span>{widget.shop.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
