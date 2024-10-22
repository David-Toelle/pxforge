// ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// A reusable protected route component that checks if the user is authenticated
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child components (the protected content)
  return children;
};

export default ProtectedRoute;
