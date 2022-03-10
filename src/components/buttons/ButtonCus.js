import React from "react";
import "./button.scss";
function ButtonCus({ children, primary, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      className={`button-antech ${primary ? "button-antech--primary" : ""} ${
        disabled ? "button-antech--disabled" : ""
      }`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}

export default ButtonCus;
