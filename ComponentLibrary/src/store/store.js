// store.js
// This is the Redux store setup. It integrates RTK Query API slices and standard reducers.

import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Importing reducers for managing the state
import userReducer from "../features/user/userSlice"; // Reducer for user-related state (e.g., authentication)
import { userApi } from "../features/user/userApi"; // API slice for user-related API calls (login, register)

import componentReducer from "../features/component/componentSlice"; // Reducer for component-related state
import { componentApi } from "../features/component/componentApi"; // API slice for component-related API calls

import packageReducer from "../features/component/packageSlice";
import { packageApi } from "../features/component/packageApi";

//----------------------------------------------------------------
//               Combining Reducers and Setting Up Root Reducer
//----------------------------------------------------------------
const appReducer = combineReducers({
  // Regular Redux slice reducers:
  user: userReducer,
  component: componentReducer,
  package: packageReducer,

  // RTK Query API slices:
  [userApi.reducerPath]: userApi.reducer,
  [componentApi.reducerPath]: componentApi.reducer,
  [packageApi.reducerPath]: packageApi.reducer,
});

// Root reducer to reset state on logout
const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    state = undefined; // Reset the state when logout action is dispatched
  }
  return appReducer(state, action);
};

//----------------------------------------------------------------
//                Setting up the global store
//----------------------------------------------------------------
const store = configureStore({
  reducer: rootReducer, // Use root reducer with reset logic
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      componentApi.middleware,
      packageApi.middleware
    ),
});

export default store;

//---------------------------------------------
//                Details
//---------------------------------------------

// 1. **Reducers**:
//    - Combined all slice reducers using `combineReducers`.
//    - Added a `rootReducer` function to handle state reset on logout by setting `state = undefined` when `user/logout` is dispatched.

// 2. **API Slices (RTK Query)**:
//    - API slices continue to handle API interactions using generated hooks for requests like login and register.

// 3. **Middleware**:
//    - Middleware is used for handling async actions, caching, and data refetching through RTK Query.
