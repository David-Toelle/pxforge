import { useState } from "react"; // Importing React hooks for state management
import { useRegisterMutation } from "../userApi"; // Importing the register mutation from userApi
import { useDispatch } from "react-redux"; // Redux hook for dispatching actions
import { setUser } from "../userSlice"; // Importing the setUser action to update the user state
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import "../styles/Register.css"; // Importing the CSS file for styling the register page
import Loading from "../../../components/Loading/Loading"; // Importing the reusable Loading component
import BasicBtn from "../../../components/buttons/BasicBtn/BasicBtn";
//----------------------------------------------------------------
//                    Register Component
//----------------------------------------------------------------
// This component manages the registration form. It handles input fields for first name, last name, email, and password, and submits a register request.

const Register = () => {
  const [firstName, setFirstName] = useState(""); // Local state to store the first name input
  const [lastName, setLastName] = useState(""); // Local state to store the last name input
  const [email, setEmail] = useState(""); // Local state to store the email input
  const [password, setPassword] = useState(""); // Local state to store the password input
  const [register, { isLoading }] = useRegisterMutation(); // Hook for performing the register mutation
  const dispatch = useDispatch(); // Hook for dispatching Redux actions
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle form submission for registration
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Attempt registration with user data, then update user state on success
      const user = await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      dispatch(setUser({ user, token: user.token })); // Dispatch setUser action to store user data and token 
      navigate("/"); // Navigate to home page after successful registration
    } catch (err) {
      console.error("Failed to register:", err); // Log any errors encountered during registration
    }
  };

  return (
    <div className="register-page">
      {/* Conditionally show the loading spinner if the registration is in progress */}
      {isLoading ? (
        <Loading size="60px" color="#3498db" />
      ) : (
        <form className="register-form" onSubmit={handleRegister}>
          {/* First Name input field */}
          <div className="input-firstName">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} // Update firstName state on input change
            />
          </div>
          {/* Last Name input field */}
          <div className="input-lastName">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} // Update lastName state on input change
            />
          </div>
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
          {/* Submit button, disabled while registration request is in progress */}
          
          <BasicBtn type="submit" label="Register" size="medium"></BasicBtn>
        </form>
      )}
    </div>
  );
};

export default Register;
