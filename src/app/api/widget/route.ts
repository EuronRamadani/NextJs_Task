import { NextRequest, NextResponse } from "next/server";
import widgetsData from "@/data/widgets.json";
import { WidgetFilters, WidgetListResponse } from "@/types/widget";

export async function GET(request: NextRequest) {
  // Parse query params
  const searchParams = request.nextUrl.searchParams;

  // Check if this is a request for a specific widget
  const widgetId = searchParams.get("id");

  if (widgetId) {
    // Find widget by ID
    const widget = widgetsData.widgets.find((w) => w.id === widgetId);

    // Return 404 if widget not found
    if (!widget) {
      return new NextResponse(JSON.stringify({ message: "Widget not found" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    // Add artificial delay to simulate network
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(widget);
  }

  // Otherwise, handle as a list request
  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") as WidgetFilters["sort"]) || "popular";
  const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  // Filter widgets based on search and tags
  let filteredWidgets = widgetsData.widgets;

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredWidgets = filteredWidgets.filter(
      (widget) =>
        widget.title.toLowerCase().includes(searchLower) ||
        widget.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply tags filter
  if (tags.length > 0) {
    filteredWidgets = filteredWidgets.filter((widget) =>
      tags.some((tag) => widget.tags.includes(tag))
    );
  }

  // Apply sorting
  if (sort === "rating") {
    filteredWidgets.sort((a, b) => b.rating - a.rating);
  } else if (sort === "recent") {
    // Since we don't have a date field, we'll just reverse the order as an example
    filteredWidgets.reverse();
  }

  // Apply pagination
  const startIndex = (page - 1) * pageSize;
  const paginatedWidgets = filteredWidgets.slice(
    startIndex,
    startIndex + pageSize
  );

  // Create response
  const response: WidgetListResponse = {
    widgets: paginatedWidgets,
    total: filteredWidgets.length,
    page,
    pageSize,
  };

  // Add artificial delay to simulate network
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(response);
}
