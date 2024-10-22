// MainLayout.jsx
// This component serves as the main layout for pages. It includes a navigation bar, main content area, and footer.
// The layout adapts based on user authentication status to show appropriate links (login, register, account, logout).
import { useEffect } from 'react' 
import "./MainLayout.css"; 
import { Nav, NavLink } from "../../components/NavBar/NavBar";
import { logout, restoreLogin } from "../../features/user/userSlice"; 
import { useDispatch, useSelector } from "react-redux"; // Importing hooks for dispatching actions and accessing state
import { useNavigate } from "react-router-dom"; // Importing navigation hook for redirecting

// MainLayout component
// This layout wraps around the content of any page it is applied to and includes navigation and a footer.
const MainLayout = ({ children }) => {
  const dispatch = useDispatch(); // Dispatch hook to trigger actions like logout
  const navigate = useNavigate(); // Navigation hook for redirecting to other pages
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated); // Accessing user authentication status from Redux state

  // Restore login state when app loads
  useEffect(() => {
    dispatch(restoreLogin());
  }, [dispatch]);

  // Handle user logout
  const handleLogout = () => {
    navigate("/"); // Redirects the user to the home page after logging out
    dispatch(logout()); // Dispatches the logout action to update the user state
    console.log("logged out");
  };

  return (
    <div className="main-layout">
      <Nav>
        {/* Navigation links - displayed based on user authentication status */}
        <NavLink to="/">Home</NavLink>
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
        {!isAuthenticated && <NavLink to="/register">Register</NavLink>}
        {isAuthenticated && <NavLink to="/account">Account</NavLink>}
        {isAuthenticated && <NavLink onClick={handleLogout}>Logout</NavLink>}
        {/* Show logout link if user is authenticated */}
        {isAuthenticated && (
          <NavLink to="/components/library">My Library</NavLink>
        )}
      </Nav>

      <div className="content">
        {/* Sidebar can be added here if needed, currently commented out */}
        {/* <aside className="sidebar">Sidebar</aside> */}

        {/* Main content area where child components are rendered */}
        <main className="main-content">{children}</main>
      </div>

      {/* Footer section */}
      <footer className="footer">Footer</footer>
    </div>
  );
};

export default MainLayout;
