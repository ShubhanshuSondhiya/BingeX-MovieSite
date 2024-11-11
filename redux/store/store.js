import { configureStore } from "@reduxjs/toolkit";
import movieDataSlice from "../slices/MovieDataSlice";

export const store = configureStore({
  reducer: {
    movieReducer: movieDataSlice,
  },
});
