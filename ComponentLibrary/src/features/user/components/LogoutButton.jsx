// LogoutButton.jsx
// This component handles logging the user out by dispatching the logout action and navigating the user back to the home page.

import React from "react"; // Importing React for creating the component
import { useDispatch } from "react-redux"; // Redux hook for dispatching actions
import { logout } from "../userSlice"; // Importing the logout action from the user slice
import { useNavigate } from "react-router-dom"; // React Router hook for navigation

//----------------------------------------------------------------
//                 Logout Button Component
//----------------------------------------------------------------
// This component renders a button that logs the user out when clicked.
// It dispatches the `logout` action and navigates the user back to the home page.

const LogoutButton = () => {
  const dispatch = useDispatch(); // Hook for dispatching Redux actions
  const nav = useNavigate(); // Hook for programmatic navigation

  // Handle logout process
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear user state
    nav("/"); // Navigate the user to the home page after logging out
  };

  return <button onClick={handleLogout}>Logout</button>; // Render a button that triggers the logout when clicked
};

export default LogoutButton;

//---------------------------------------------
//                Details
//---------------------------------------------

// 1. **Logout Action**:
//    - The `logout` action is dispatched to clear the user state (removing user data and the authentication token).
//    - This action is defined in the `userSlice.js` and handles removing user-related data from the Redux store.

// 2. **Navigation**:
//    - After the user is logged out, the `useNavigate` hook from React Router is used to redirect the user to the home page.
