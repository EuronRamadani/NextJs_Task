"use client";

import { StarIcon } from "@heroicons/react/20/solid";
import { formatNumber } from "@/utils/format";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { Widget } from "@/types/widget";

interface WidgetDetailsProps {
  widget: Widget;
}

export default function WidgetDetails({ widget }: WidgetDetailsProps) {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{widget.title}</h1>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <div className="text-4xl font-bold text-white/80">
              {widget.title.split(" ")[0]}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <StarIcon className="h-6 w-6 text-yellow-400" />
                <span className="ml-1 text-xl">{widget.rating.toFixed(1)}</span>
              </div>
              <div className="ml-4 text-gray-400">
                {formatNumber(widget.ratingCount)} ratings
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 flex-grow">
              <p className="text-gray-300 mb-6">{widget.description}</p>
              <div className="flex flex-wrap gap-2">
                {widget.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-gray-700 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {widget.exampleOutputs && widget.exampleOutputs.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Example Output</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="space-y-3">
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
