"use client";

import { useParams } from "next/navigation";
import { useGetWidgetByIdQuery } from "@/store/api/widgetApi";
import WidgetDetails from "@/components/WidgetDetails";
import { useEffect, useState } from "react";
import { Widget } from "@/types/widget";
import { notFound } from "next/navigation";

export default function WidgetDetailPage() {
  // Get the widget ID from the route parameters
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  console.log("Widget ID:", id); // Debug log

  // Use RTK Query to fetch widget details
  const { data: widget, isLoading, error } = useGetWidgetByIdQuery(id);
  const [widgetData, setWidgetData] = useState<Widget | null>(null);
  const [loadingFromFallback, setLoadingFromFallback] = useState(false);

  // Since we don't have a real API, we'll use the hardcoded data if needed
  useEffect(() => {
    if (widget) {
      // Use server data when available
      console.log("Setting widget from API:", widget);
      setWidgetData(widget);
    } else if (!isLoading && !error) {
      // Fallback to local data
      setLoadingFromFallback(true);
      import("@/data/widgets.json").then((module) => {
        const found = module.default.widgets.find((w: Widget) => w.id === id);
        if (found) {
          console.log("Setting widget from local data:", found);
          setWidgetData(found);
        } else {
          console.error("Widget not found in local data:", id);
        }
        setLoadingFromFallback(false);
      });
    }
  }, [widget, isLoading, error, id]);

  // Force a timeout to ensure the component doesn't quickly flash a 404
  const [timeoutPassed, setTimeoutPassed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutPassed(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || loadingFromFallback || !timeoutPassed) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  // For debugging
  if (!widgetData) {
    console.error("Widget data is null or undefined");

    // Try to load a default widget if none is found
    const defaultWidgetId = "1";
    if (id !== defaultWidgetId) {
      console.log("Trying to load default widget");
      import("@/data/widgets.json").then((module) => {
        const defaultWidget = module.default.widgets.find(
          (w: Widget) => w.id === defaultWidgetId
        );
        if (defaultWidget) {
          console.log("Setting default widget:", defaultWidget);
          setWidgetData(defaultWidget);
        }
      });
    }
  }

  // Only show 404 if we're absolutely sure no widget was found
  if (
    error ||
    (!widgetData && !isLoading && !loadingFromFallback && timeoutPassed)
  ) {
    console.error("Widget not found or error:", error);
    return notFound();
  }

  // Protection against null widgetData while data is being loaded
  if (!widgetData) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return <WidgetDetails widget={widgetData} />;
}
