import { React, useRef } from "react";
import fire from "../fire";

const storage = fire.storage();
const storageRef = storage.ref();
const spotsRef = storageRef.child("spot_images");

const star = "⭐️";
const police = "👮🏻‍♂️";

const MoreInfo = ({ detailedInfo, showMoreInfo }) => {
  const imgRef = useRef();

  const photo = storageRef.child(`spot_images/${detailedInfo.img}`);
  photo
    .getDownloadURL()
    .then(url => (document.getElementById("image-el").src = url))
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div className="shadow-lg rounded-lg bg-white flex flex-col h-100 w-100 align-middle justify-center text-center absolute top-2/4 left-2/4 -translate-x-2/4">
      <div className=" rounded-lg m-5 pl-5 pr-5">
        <h1 className="font-bold text-xl"> {detailedInfo.name}</h1>
        <div className="my-2">
          {typeof detailedInfo.type === "object"
            ? ((<h2 className="text-md">Type</h2>),
              detailedInfo.type.map(type => (
                <span className=" rounded-full py-0.5 px-2 border border-purple-900 border-opacity-100 mx-0.5">
                  {" "}
                  {type}{" "}
                </span>
              )))
            : null}
        </div>
        <p className="my-2">
          Rating:
          {star.repeat(detailedInfo.rating)}
        </p>
        <p className="my-2">
          Bust Rating:
          {police.repeat(detailedInfo.bustRating)}
        </p>
        <img src="" alt="" id="image-el" />
      </div>

      <button
        className="bg-purple-900 rounded-full h-12 w-12 text-white shadow-lg focus:outline-none mt-4"
        onClick={() => showMoreInfo()}
      >
        <svg
          className="transform rotate-45"
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

export default MoreInfo;
