// store.js
// This is the Redux store setup. It integrates RTK Query API slices and standard reducers.

import { configureStore } from "@reduxjs/toolkit";

// Importing reducers for managing the state
import userReducer from "../features/user/userSlice"; // Reducer for user-related state (e.g., authentication)
import { userApi } from "../features/user/userApi"; // API slice for user-related API calls (login, register)

import componentReducer from "../features/component/componentSlice"; // Reducer for component-related state
import { componentApi } from "../features/component/componentApi"; // API slice for component-related API calls

import packageReducer from "../features/component/packageSlice";
import { packageApi } from "../features/component/packageApi";

//----------------------------------------------------------------
//                Setting up the global store
//----------------------------------------------------------------

const store = configureStore({
  reducer: {
    // Regular Redux slice reducers:
    user: userReducer, // Manages user-related state (e.g., current user, token)
    component: componentReducer, // Manages component-related state (e.g., current component, library)
    package: packageReducer, // Add package state management

    // RTK Query API slices:
    [userApi.reducerPath]: userApi.reducer, // Handles user-related API calls (login, register)
    [componentApi.reducerPath]: componentApi.reducer, // Handles component-related API calls (create, fetch, update, delete)
    [packageApi.reducerPath]: packageApi.reducer, // Add package API
  },

  // Middleware is used to extend or customize how actions are dispatched and how the store behaves.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      componentApi.middleware,
      packageApi.middleware,
      // Add additional middleware here as needed
    ),
});

export default store;

//---------------------------------------------
//                Details
//---------------------------------------------

// 1. **Reducers**:
//    - A reducer is a function that takes the current state and an action as input, then returns a new state.
//    - `userReducer` manages user-related state (e.g., authentication, token storage).
//    - `componentReducer` manages component-related state (e.g., current component, status, error).

// 2. **API Slices (RTK Query)**:
//    - API slices are used to handle API calls with RTK Query. They generate hooks for making HTTP requests in components.
//    - The `userApi` and `componentApi` handle the interactions with the backend for user authentication and component management, respectively.

// 3. **Middleware**:
//    - Middleware is added to handle async actions, caching, and refetching of API data.
//    - RTK Query provides middleware for each API slice, which helps manage network interactions.
