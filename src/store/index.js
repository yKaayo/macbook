import { configureStore } from "@reduxjs/toolkit";

// Slices
import laptopSlice from "./slices/laptopSlice";

export const store = configureStore({
  reducer: {
    laptop: laptopSlice,
  },
});
