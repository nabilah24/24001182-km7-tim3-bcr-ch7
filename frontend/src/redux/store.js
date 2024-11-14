import { configureStore } from "@reduxjs/toolkit";
import slices from "./slices";

// It will make a temporary store with the provided reducer
export const store = configureStore({
  reducer: slices,
  devTools: import.meta.env.MODE == "development", // Enable Redux DevTools in development mode
});
