import { configureStore } from "@reduxjs/toolkit";
import { widgetApi } from "./api/widgetApi";

export const store = configureStore({
  reducer: {
    [widgetApi.reducerPath]: widgetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(widgetApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
