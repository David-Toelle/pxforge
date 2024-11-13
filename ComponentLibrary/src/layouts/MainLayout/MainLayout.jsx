import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { restoreLogin, logout } from "../../features/user/userSlice";
import Sidebar from "../../components/ui/sidebar";
import { MenuIcon } from "lucide-react";

const MainLayout = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);

  useEffect(() => {
    dispatch(restoreLogin());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <Sidebar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        isVisible={isSidebarVisible}
        className="fixed top-0 left-0 h-full w-64 bg-gray-900 z-50"
      />

      {/* Main Content Area with Toggle Button */}
      <div
        className={`transition-all duration-300 ${
          isSidebarVisible ? "w-[calc(100%-16rem)] ml-64" : "w-full"
        }`}
      >
        {/* Relative wrapper for the button and main content */}
        <div className="relative">
          {/* Toggle Icon */}
          <button
            onClick={toggleSidebar}
            className="absolute top-6 left-6 p-1 text-gray-700 bg-gray-200 rounded-md z-50"
            aria-label="Toggle Sidebar"
          >
            <MenuIcon className="h-8 w-7" />
          </button>

          {/* Main Content */}
          <main className="m-0">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
