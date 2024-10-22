import React from "react";
import "./Spinner.css"; // If using external CSS

const Spinner = () => {
  return (
    <div
      style={{
        background: "#222",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <figure className="spinner">
        <div className="dot white"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </figure>
    </div>
  );
};

export default Spinner;
