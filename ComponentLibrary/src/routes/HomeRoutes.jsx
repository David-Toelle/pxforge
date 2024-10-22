// AccountRoutes.jsx
// This file defines routes related to the user account page and applies the MainLayout to them.

import MainLayout from "../layouts/MainLayout/MainLayout.jsx"; // Importing MainLayout for wrapping the account page
import { Home } from "../features/dashboard/pages/Home.jsx"; 

// Defining routes for the account feature
export const homeRoutes = [
  {
    path: "/", // Path for the account page
    element: (
      <MainLayout>
        {/* Renders the account page inside the MainLayout; a custom layout can be applied if needed */}
        <Home />
      </MainLayout>
    ),
  },
];

// Export the route and import it into index.jsx for inclusion in the main routes.
