// main.jsx
// This is the entry point of the React application. It sets up the Redux store, React Router, and renders the app within the DOM.

import { StrictMode } from "react"; // StrictMode helps identify potential issues in the app
import { createRoot } from "react-dom/client"; // ReactDOM to render the app into the root element
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing routing components for navigation
import routes from "./routes"; // Importing the route configuration
import { Provider } from "react-redux"; // Provider to give Redux store access throughout the app
import "./index.css"; // Global CSS styles
import store from "./store/store"; // Redux store
import "preline/dist/preline";


//----------------------------------------------------------------
//               Application Rendering and Setup
//----------------------------------------------------------------
// The `createRoot` function renders the entire React app into the root element of the HTML document.
// We wrap the app in StrictMode, Provider (for Redux), and Router (for routing) for state management and navigation.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provider wraps the app and provides access to the Redux store */}
    <Provider store={store}>
      {/* Router wraps the Routes and handles navigation in the app */}
      <Router>
        <Routes>
          {/* Map through the routes array and render the defined routes */}
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {/* If the route has child routes, map through and render them */}
              {route.children?.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);

//---------------------------------------------
//                Details
//---------------------------------------------

// 1. **StrictMode**:
//    - Used to identify potential problems in the app, such as unsafe lifecycles or legacy API usage.
//    - It helps with highlighting issues during development without affecting the production build.

// 2. **Provider (Redux)**:
//    - The `Provider` component from `react-redux` makes the Redux store available to any nested components that are connected to Redux.
//    - This allows components to dispatch actions or access state from the global store.

// 3. **Router (React Router)**:
//    - `BrowserRouter` (aliased as `Router`) is used to manage navigation and routing in the app.
//    - The `Routes` component is used to define all the available routes in the application.

// 4. **Routes Mapping**:
//    - The `routes` array, imported from the routes file, contains the paths and components that will be rendered for each route.
//    - The `map()` function is used to iterate over the routes and dynamically create `Route` components.
//    - Nested routes (child routes) are handled by checking for the presence of `route.children` and rendering the child routes accordingly.
