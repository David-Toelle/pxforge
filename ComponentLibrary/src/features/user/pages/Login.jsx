import React, { useState } from "react"; // Importing React hooks for state management
import { useLoginMutation } from "../userApi"; // Importing the login mutation from userApi
import { useDispatch } from "react-redux"; // Redux hook for dispatching actions
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import { setUser } from "../userSlice"; // Importing the setUser action to update the user state
import "../styles/Login.css"; // Importing the CSS file for styling the login page
import Loading from "../../../components/Loading/Loading"; // Importing the reusable Loading component
import BasicBtn from "../../../components/buttons/BasicBtn/BasicBtn";
//----------------------------------------------------------------
//                     Login Component
//----------------------------------------------------------------
// This component manages the login form. It handles input fields for email and password, and submits a login request.

const Login = () => {
  const [email, setEmail] = useState(""); // Local state to store the email input
  const [password, setPassword] = useState(""); // Local state to store the password input
  const [login, { isLoading }] = useLoginMutation(); // Hook for performing the login mutation
  const dispatch = useDispatch(); // Hook for dispatching Redux actions
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Attempt login with email and password, then update user state on success
      const user = await login({ email, password }).unwrap();
      dispatch(setUser({ user, token: user.token })); // Dispatch setUser action to store user data and token
      navigate("/"); // Navigate to home page after successful login
    } catch (err) {
      console.error("Failed to log in:", err); // Log any errors encountered during login
    }
  };

  return (
    <div className="login-page">
      {/* Conditionally show the loading spinner if the login is in progress */}
      {isLoading ? (
        <Loading size="60px" color="#3498db" />
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          {/* Email input field */}
          <div className="input-email">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            />
          </div>
          {/* Password input field */}
          <div className="input-password">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            />
          </div>
          {/* Submit button, disabled while login request is in progress */}
          
          <BasicBtn type="submit"  label="Login" size="medium" ></BasicBtn>
        </form>
      )}
    </div>
  );
};

export default Login;
