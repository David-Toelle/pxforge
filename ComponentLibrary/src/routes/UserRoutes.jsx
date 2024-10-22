// userRoutes.jsx
// This file defines routes for user-related pages like login and registration, using the MainLayout.

import Login from "../features/user/pages/Login.jsx"; // Importing the login page component
import Register from "../features/user/pages/Register.jsx"; // Importing the registration page component
import MainLayout from "../layouts/MainLayout/MainLayout.jsx"; // Importing MainLayout to wrap user routes

// Defining routes for the user feature
export const userRoutes = [
  {
    path: "/login", // Route for the login page
    element: (
      <MainLayout>
        {/* Renders the login page inside the MainLayout; a custom layout can be applied if needed */}
        <Login />
      </MainLayout>
    ),
  },
  {
    path: "/register", // Route for the registration page
    element: (
      <MainLayout>
        {/* Renders the registration page inside the MainLayout; a custom layout can be applied if needed */}
        <Register />
      </MainLayout>
    ),
  },
];

// Export the route and import it into index.jsx for inclusion in the main routes.
