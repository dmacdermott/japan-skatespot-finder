import { React, useState } from "react";

const AddFilterBtn = ({ showInput, showSpotInput, getFilter }) => {
  const [hideFilterBtn, setHideFilterBtn] = useState(false);
  const [hideAddBtn, setHideAddBtn] = useState(false);
  return (
    <div className="z-50 absolute bottom-4 right-4 flex flex-col ">
      <button
        type="button"
        onClick={() => {
          getFilter();
          setHideAddBtn(!hideAddBtn);
        }}
        className={
          hideFilterBtn
            ? "hidden"
            : "bg-green-500 rounded-full h-12 w-12 text-white shadow-lg focus:outline-none"
        }
      >
        {hideAddBtn ? (
          <svg
            className={"transform rotate-45"}
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
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-9 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </button>

      <button
        type="button"
        onClick={() => {
          showInput();
          setHideFilterBtn(!hideFilterBtn);
        }}
        className={
          hideAddBtn
            ? "hidden"
            : " bg-green-500 rounded-full h-12 w-12 text-white shadow-lg focus:outline-none mt-4"
        }
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
    </div>
  );
};

export default AddFilterBtn;
