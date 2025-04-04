import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../index";

interface FavoritesState {
  ids: string[];
  lastAdded?: string;
  loading: {
    [id: string]: boolean;
  };
}

const initialState: FavoritesState = {
  ids: [],
  loading: {},
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavoriteStart: (state, action: PayloadAction<string>) => {
      state.loading[action.payload] = true;
    },
    addFavoriteSuccess: (state, action: PayloadAction<string>) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
        state.lastAdded = action.payload;
      }
      state.loading[action.payload] = false;
    },
    addFavoriteFailure: (state, action: PayloadAction<string>) => {
      state.loading[action.payload] = false;
    },
    removeFavoriteStart: (state, action: PayloadAction<string>) => {
      state.loading[action.payload] = true;
    },
    removeFavoriteSuccess: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
      if (state.lastAdded === action.payload) {
        state.lastAdded = undefined;
      }
      state.loading[action.payload] = false;
    },
    removeFavoriteFailure: (state, action: PayloadAction<string>) => {
      state.loading[action.payload] = false;
    },
    clearFavorites: (state) => {
      state.ids = [];
      state.lastAdded = undefined;
      state.loading = {};
    },
  },
});

// Export actions
export const {
  addFavoriteStart,
  addFavoriteSuccess,
  addFavoriteFailure,
  removeFavoriteStart,
  removeFavoriteSuccess,
  removeFavoriteFailure,
  clearFavorites,
} = favoritesSlice.actions;

// Export action creators with simulated API delay
export const addFavorite = (id: string): AppThunk => {
  return async (dispatch) => {
    dispatch(addFavoriteStart(id));

    // Simulate API call with delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      dispatch(addFavoriteSuccess(id));
    } catch {
      dispatch(addFavoriteFailure(id));
    }
  };
};

export const removeFavorite = (id: string): AppThunk => {
  return async (dispatch) => {
    dispatch(removeFavoriteStart(id));

    // Simulate API call with delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      dispatch(removeFavoriteSuccess(id));
    } catch {
      dispatch(removeFavoriteFailure(id));
    }
  };
};

// Export selectors
export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export const selectIsFavorite = (id: string) => (state: RootState) =>
  state.favorites.ids.includes(id);
export const selectFavoritesCount = (state: RootState) =>
  state.favorites.ids.length;
export const selectLastAddedFavorite = (state: RootState) =>
  state.favorites.lastAdded;
export const selectIsFavoriteLoading = (id: string) => (state: RootState) =>
  Boolean(state.favorites.loading[id]);

// Export reducer
export default favoritesSlice.reducer;
