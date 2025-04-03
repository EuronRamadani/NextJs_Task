"use client";

import { useGetWidgetByIdQuery } from "@/store/api/widgetApi";
import { StarIcon } from "@heroicons/react/20/solid";
import { formatNumber } from "@/utils/format";
import { DocumentIcon } from "@heroicons/react/24/outline";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SingleWidgetPage({ params }: PageProps) {
  const { data: widget, isLoading } = useGetWidgetByIdQuery(params.id);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-64 bg-gray-800 rounded-lg mb-8"></div>
          <div className="h-32 bg-gray-800 rounded-lg"></div>
        </div>
      </main>
    );
  }

  if (!widget) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold">Widget not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{widget.title}</h1>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center">
            <StarIcon className="h-6 w-6 text-yellow-400" />
            <span className="ml-1 text-xl">{widget.rating.toFixed(1)}</span>
            <span className="ml-1 text-gray-400">
              ({formatNumber(widget.ratingCount)})
            </span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">
            {formatNumber(widget.views)} views
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">{widget.shop.name}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {widget.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-gray-700 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <p className="text-gray-300">{widget.description}</p>
        </div>

        {widget.exampleOutputs && widget.exampleOutputs.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Example Output</h2>
            <div className="space-y-4">
              {widget.exampleOutputs.map((output) => (
                <div
                  key={output.fileName}
                  className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg"
                >
                  <DocumentIcon className="h-6 w-6 text-gray-400" />
                  <span>{output.fileName}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="fixed bottom-6 right-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}
