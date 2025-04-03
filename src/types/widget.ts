export interface Widget {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratingCount: number;
  views: number;
  tags: string[];
  shop: {
    name: string;
  };
  exampleOutputs?: {
    fileName: string;
    fileType: string;
    url: string;
  }[];
}

export interface WidgetListResponse {
  widgets: Widget[];
  total: number;
  page: number;
  pageSize: number;
}

export interface WidgetFilters {
  search?: string;
  tags?: string[];
  sort?: "popular" | "recent" | "rating";
  page?: number;
  pageSize?: number;
}
