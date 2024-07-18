import React from "react";
import { CheckCircleOutline } from "@mui/icons-material"; // Import MUI icon
import "./form.css"; // Import your CSS file for styling

export const ReviewSuccess = () => {
  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-icon">
          <CheckCircleOutline style={{ fontSize: 64, color: "#4CAF50" }} />
        </div>
        <div className="success-text">
          Thank you for your review
        </div>
      </div>
    </div>
  );
};
