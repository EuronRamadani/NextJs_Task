import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Widget, WidgetFilters, WidgetListResponse } from "@/types/widget";

export const widgetApi = createApi({
  reducerPath: "widgetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getWidgets: builder.query<WidgetListResponse, WidgetFilters>({
      query: (params) => ({
        url: "/widget",
        params,
      }),
    }),
    getWidgetById: builder.query<Widget, string>({
      query: (id) => ({
        url: "/widget",
        params: { id },
      }),
    }),
  }),
});

export const { useGetWidgetsQuery, useGetWidgetByIdQuery } = widgetApi;
