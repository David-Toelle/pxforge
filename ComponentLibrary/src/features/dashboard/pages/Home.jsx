import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center h-screen w-full text-white p-6 m-0"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1642355008521-236f1d29d0a8?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center border-b border-white/20 pb-2">
        Build Your Own Component Library
      </h1>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-8 opacity-80">
        Write or paste in code and preview the output as well as easily organize
        components into packages and publish directly to npm.
      </p>
      <Link
        to="/components/library"
        className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-opacity-80 transition-opacity"
      >
        Get Started
      </Link>
    </div>
  );
};
