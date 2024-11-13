// features/package/packageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { packageApi } from "./packageApi";

// Initial state for package management
const initialState = {
  currentPackage: null,
  status: "idle",
  error: null,
};

// Package slice to manage the state for package-related actions
const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setCurrentPackage(state, action) {
      state.currentPackage = action.payload;
    },
    clearCurrentPackage(state) {
      state.currentPackage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        packageApi.endpoints.fetchUserPackages.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        packageApi.endpoints.fetchUserPackages.matchFulfilled,
        (state) => {
          state.status = "success";
        }
      )
      .addMatcher(
        packageApi.endpoints.fetchUserPackages.matchRejected,
        (state, action) => {
          state.status = "error";
          state.error = action.error.message;
        }
      );
  },
});

// Export actions for setting and clearing the current package
export const { setCurrentPackage, clearCurrentPackage } = packageSlice.actions;

// Export the package slice reducer to be used in the store setup
export default packageSlice.reducer;
