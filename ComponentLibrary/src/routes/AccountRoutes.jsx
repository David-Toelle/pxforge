// AccountRoutes.jsx
// This file defines routes related to the user account page and applies the MainLayout to them.

import MainLayout from "../layouts/MainLayout/MainLayout.jsx"; 
import { Account } from "../features/account/pages/Account.jsx"; 

import ProtectedRoutes from "./ProtectedRoutes";
// Defining routes for the account feature
export const accountRoutes = [
  {
    path: "/account", // Path for the account page
    element: (
      <MainLayout>
        <ProtectedRoutes>
          <Account />
        </ProtectedRoutes>
      </MainLayout>
    ),
  },
];

// Export the route and import it into index.jsx for inclusion in the main routes.
