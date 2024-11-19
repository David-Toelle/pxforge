import React, { useState } from "react";
import { useRegisterMutation } from "../userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../userSlice";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import Loading from "../../../components/Loading/Loading";
import BasicBtn from "../../../components/buttons/BasicBtn/BasicBtn";
import "preline/dist/preline";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      dispatch(setUser({ user, token: user.token }));
      navigate("/");
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full bg-black rounded-2xl shadow-lg p-6 border border-gray-200 border-opacity-20">
        {isLoading ? (
          <Loading size="60px" color="#3498db" />
        ) : (
          <form className="space-y-6" onSubmit={handleRegister}>
            <h2 className="text-3xl font-bold text-center text-white dark:text-white border-b">
              Register
            </h2>
            <p className="text-center text-sm text-gray-600 dark:text-neutral-400">
              Already have an account?{" "}
              <a
                href="https://pxforge.netlify.app/login"
                className="text-blue-600 hover:underline font-medium dark:text-blue-500"
              >
                Log in here
              </a>
            </p>

            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full p-4 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full p-4 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full p-4 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-4 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
              />
            </div>
            <div className="flex justify-center">
              <BasicBtn
                type="submit"
                label="Register"
                className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
