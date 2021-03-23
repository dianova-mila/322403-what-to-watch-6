import React from "react";
import "./toast.css";

const Toast = ({isErrorShow, errorText}) => {
  if (isErrorShow) {
    return (
      <div className="toast-container">
        <div className="toast-item">
          {errorText}
        </div>
      </div>
    );
  }

  return ``;
};

export default Toast;
