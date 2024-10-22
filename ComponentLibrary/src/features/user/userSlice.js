// userSlice.js
// This file manages the user-related state in the application, including user authentication and session management.
// It uses Redux Toolkit's `createSlice` to handle actions and reducers in one place.

import { createSlice } from "@reduxjs/toolkit"; // Importing Redux Toolkit's `createSlice` to create the user slice

//----------------------------------------------------------------
//                       Initial State
//----------------------------------------------------------------
// Defining the initial state of the user feature, including:
// 1. `user`: Stores user-specific data.
// 2. `token`: Stores the authentication token (if the user is logged in).
// 3. `isAuthenticated`: A boolean flag to track if the user is logged in.

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

//----------------------------------------------------------------
//                     User Slice Setup
//----------------------------------------------------------------
// The `userSlice` handles user-related actions such as setting the user and logging out.
// The `reducers` object defines the actions and how the state should be updated when they are dispatched.

const userSlice = createSlice({
  name: "user", // The slice name (used by Redux)
  initialState, // The initial state defined above
  reducers: {
    // `setUser` action: Updates the user state when the user logs in or registers.
    setUser(state, action) {
      console.log(action.payload);
      state.user = action.payload.user.user; // Sets the user data from the payload

      state.isAuthenticated = true; // Marks the user as authenticated
      localStorage.setItem("authToken", state.user.token); // Stores the token in local storage for session persistence
    },

    // `logout` action: Clears the user state when the user logs out.
    logout(state) {
      state.user = null; // Clears the user data
      state.isAuthenticated = false; // Marks the user as not authenticated
      localStorage.removeItem("authToken"); // Removes the token from local storage
    },
    restoreLogin: (state) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        state.isAuthenticated = true;
      }
    },
  },
});

// Exporting the actions for use in components
export const { setUser, logout, restoreLogin } = userSlice.actions;

// Exporting the user slice reducer to be included in the store
export default userSlice.reducer;

//---------------------------------------------
//                Details
//---------------------------------------------

// 1. **`setUser` action**:
//    - This action is dispatched when a user logs in or registers.
//    - It updates the user state with data provided from the API response.
//    - The authentication token is stored both in the Redux state and in localStorage to keep the user logged in even after a refresh.

// 2. **`logout` action**:
//    - This action is dispatched when the user logs out.
//    - It clears the user and token from the Redux state and removes the token from localStorage to end the session.

// 3. **Local Storage**:
//    - LocalStorage is used here to persist the authentication token across page reloads, allowing the app to remember the user’s login state.
