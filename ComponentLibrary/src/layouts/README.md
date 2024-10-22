.
--------------------------------
        Folder Structure 
................................

When creating a new layout, follow this structure:

/layouts/
   └── [LayoutName]/
        ├── [LayoutName].jsx   # The main layout component (JSX)
        └── [LayoutName].css   # The styling for the layout (CSS)

Example:

/layouts/
   └── MainLayout/
        ├── MainLayout.jsx
        └── MainLayout.css


--------------------------------
      Adding a New Layout
................................

1. Create a new layout folder: Inside the layouts/ folder, create a subfolder named after your layout (e.g., AdminLayout).

2. Create a JSX component: Inside the new folder, create a file for your layout component (e.g., AdminLayout.jsx). This will define the structure of the pages using this layout.

3. Add CSS for styling: Create a corresponding CSS file (e.g., AdminLayout.css) in the same folder to handle the layout's styling.

4. Wrap components with your layout: Once your layout is built, apply it to any route where you want this layout to be used. In your route file, wrap the component in your new layout component.

----------------------------------------|
     Example of Applying a Layout:      |
........................................|


import AdminLayout from "../layouts/AdminLayout/AdminLayout.jsx";
import SomeComponent from "../features/someFeature/SomeComponent.jsx";

export const someFeatureRoutes = [
  {
    path: "/admin",
    element: (
      <AdminLayout>
        <SomeComponent />
      </AdminLayout>
    ),
  },
];
