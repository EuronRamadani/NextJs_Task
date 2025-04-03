// src/store/services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define types for your API responses
interface ExampleResponse {
  id: number;
  title: string;
  description: string;
}

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // Define endpoints here with proper typing
    getExample: builder.query<ExampleResponse, void>({
      query: () => "example",
    }),
  }),
});

// Export hooks for usage in components
export const { useGetExampleQuery } = api;
