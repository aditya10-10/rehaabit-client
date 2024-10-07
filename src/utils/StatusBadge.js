import React from "react";

const statusStyles = {
  "Pending": {
    backgroundColor: "#e0e0e0",
    color: "#555",
  },
  "Confirmed": {
    backgroundColor: "#b3e5fc",
    color: "#0288d1",
  },
  "Professional Assigned": {
    backgroundColor: "#e1bee7",
    color: "#6a1b9a",
  },
  "On The Way": {
    backgroundColor: "#b2ebf2",
    color: "#00796b",
  },
  "Service Started": {
    backgroundColor: "#ffe082",
    color: "#f57c00",
  },
  "Service Completed": {
    backgroundColor: "#c8e6c9",
    color: "#388e3c",
  },
  "Payment Pending": {
    backgroundColor: "#ffe0b2",
    color: "#f57c00",
  },
  "Paid": {
    backgroundColor: "#b2dfdb",
    color: "#00796b",
  },
  "Cancelled By Provider": {
    backgroundColor: "#F4D2DD",
    color: "#607d8b",
  },
  "Cancelled By Customer": {
    backgroundColor: "#F8B6CD",
    color: "#C51D58",
  },
  "Rescheduled": {
    backgroundColor: "#ffccbc",
    color: "#d84315",
  },
  "Refund Initiated": {
    backgroundColor: "#ffecb3",
    color: "#fbc02d",
  },
  "Refund Completed": {
    backgroundColor: "#c8e6c9",
    color: "#388e3c",
  },
};

const normalizeStatus = (status) => {
  return status
    ?.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = normalizeStatus(status);

  const style = statusStyles[normalizedStatus] || {
    backgroundColor: "#e0e0e0",
    color: "#555",
  };
  return (
    <span
      className="px-3 py-1 rounded-full font-semibold"
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        fontFamily: "Roboto, sans-serif",
        display: "inline-block",
        margin: "5px",
        textAlign: "center", 
        lineHeight: "1.5",   
        minWidth: "120px",  
      }}
    >
      {normalizedStatus}
    </span>
  );
};

export default StatusBadge;
