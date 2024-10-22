import { MyLibrary } from "../features/MyLibrary/pages/MyLibrary";
import MainLayout from "../layouts/MainLayout/MainLayout.jsx";
import ProtectedRoutes from "./ProtectedRoutes";

export const myLibraryRoutes = [
  {
    path: "/MyLibrary", // Path for the account page
    element: (
      <MainLayout>
        <ProtectedRoutes>
          <MyLibrary />
        </ProtectedRoutes>
      </MainLayout>
    ),
  },
];
