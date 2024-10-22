// componentRoutes.jsx
// Defines routes for component-related pages like creating, editing, and viewing the component library.

import MySandPack from "../features/component/pages/ComponentEditor.jsx"; // Importing the shared ComponentEditor page
import ComponentLibrary from "../features/component/pages/ComponentLibrary.jsx"; // Importing the ComponentLibrary page
import MainLayout from "../layouts/MainLayout/MainLayout.jsx"; // Importing MainLayout to wrap component routes

export const componentRoutes = [
  {
    path: "/components/new", // Route for creating a new component
    element: (
      <MainLayout>
        {/* Renders the ComponentEditor page for new components */}
        <MySandPack />
      </MainLayout>
    ),
  },
  {
    path: "/components/:id/edit", // Route for editing an existing component
    element: (
      <MainLayout>
        {/* Renders the ComponentEditor page for editing components */}
        <MySandPack />
      </MainLayout>
    ),
  },
  {
    path: "/components/library", // Route for viewing the component library
    element: (
      <MainLayout>
        {/* Renders the ComponentLibrary page inside the MainLayout */}
        <ComponentLibrary />
      </MainLayout>
    ),
  },
];

export default componentRoutes;
