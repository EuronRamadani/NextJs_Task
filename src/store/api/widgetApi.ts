import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Widget, WidgetFilters, WidgetListResponse } from "@/types/widget";

export const widgetApi = createApi({
  reducerPath: "widgetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getWidgets: builder.query<WidgetListResponse, WidgetFilters>({
      query: (params) => ({
        url: "/widgets",
        params,
      }),
    }),
    getWidgetById: builder.query<Widget, string>({
      query: (id) => `/widgets/${id}`,
    }),
  }),
});

export const { useGetWidgetsQuery, useGetWidgetByIdQuery } = widgetApi;
