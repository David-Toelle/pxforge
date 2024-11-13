import React, { useState } from "react";
import { useLoginMutation } from "../userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../userSlice";
import "../styles/Login.css";
import Loading from "../../../components/Loading/Loading";
import BasicBtn from "../../../components/buttons/BasicBtn/BasicBtn";
import "preline/dist/preline";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password }).unwrap();
      dispatch(setUser({ user, token: user.token }));
      navigate("/");
    } catch (err) {
      console.error("Failed to log in:", err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full bg-black rounded-2xl shadow-lg p-6 border border-gray-200 border-opacity-20 dark:border-gray-700 dark:border-opacity-20">
        {isLoading ? (
          <Loading size="60px" color="#3498db" />
        ) : (
          <form className="space-y-6" onSubmit={handleLogin}>
            <h2 className="text-3xl font-bold text-center text-white dark:text-white border-b border-gray-200 dark:border-gray-700">
              Login
            </h2>
            <p className="text-center text-sm text-gray-600 dark:text-neutral-400">
              Ready to get started?{" "}
              <a
                href="/register"
                className="text-blue-600 hover:underline font-medium dark:text-blue-500"
              >
                Sign up here
              </a>
            </p>

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
                className="w-full p-4 border border-gray-200 border-opacity-20 dark:border-gray-700 dark:border-opacity-20 rounded-lg text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:text-white"
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
                className="w-full p-4 border border-gray-200 border-opacity-20 dark:border-gray-700 dark:border-opacity-20 rounded-lg text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                id="remember-me"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-neutral-900 dark:border-gray-700"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-600 dark:text-neutral-400"
              >
                Remember me
              </label>
            </div>
            <div className="flex justify-center">
              <BasicBtn
                type="submit"
                label="Login"
                className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
