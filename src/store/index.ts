import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { widgetApi } from "./api/widgetApi";
import favoritesReducer from "./services/favoritesSlice";

export const store = configureStore({
  reducer: {
    [widgetApi.reducerPath]: widgetApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(widgetApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
