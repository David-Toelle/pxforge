// index.jsx
// This file combines all the route files from the routes folder into a single routes array
// that will be exported to the main app. Each route file defines specific routes for different features.

// Importing route definitions from other route files
import { homeRoutes } from "./HomeRoutes.jsx"; 
import { accountRoutes } from "./AccountRoutes.jsx";
import { userRoutes } from "./UserRoutes.jsx"; // Routes related to user authentication (login, register)
import { componentRoutes } from "./ComponentRoutes.jsx";

// Combining all routes into a single array
const routes = [
  ...homeRoutes, 
  ...userRoutes, 
  ...accountRoutes, 
  ...componentRoutes,
  // Spread in all routes
  {
    // This is the catch-all route for any undefined paths (404 page)
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
];

// Exporting the combined routes to be used in the main application
export default routes;
