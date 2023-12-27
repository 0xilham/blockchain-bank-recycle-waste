import React from "react";

const ButtonPrimary = ({ children, addClass }) => {
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-semibold text-center me-2 mb-2" +
        addClass
      }
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
