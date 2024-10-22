// src/components/LoadingSpinner.jsx

import React from "react";
import "./Loading.css"; // Import the CSS for styling the spinner

const Loading = ({ size = "50px", color = "#3498db" }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    borderColor: `${color} transparent transparent transparent`,
  };

  return <div className="loading-spinner" style={spinnerStyle}></div>;
};

export default Loading;
