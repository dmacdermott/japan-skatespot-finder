import React from "react";

const AddSpot = ({ showInput, showSpotInput }) => {
  return (
    <button
      type="button"
      onClick={() => {
        showInput();
      }}
      className="z-50 absolute bottom-4 right-4 bg-green-500 rounded-full h-12 w-12 text-white shadow-lg focus:outline-none"
    >
      <svg
        className={showSpotInput ? "transform rotate-45" : ""}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>
  );
};

export default AddSpot;
