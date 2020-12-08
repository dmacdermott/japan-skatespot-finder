import { React, useState } from "react";
import fire from "../fire";
import "firebase/storage";

const SpotInput = ({ lat, lng, showInput }) => {
  const [spotInfo, setSpotInfo] = useState({
    name: "",
    coords: [lat, lng],
    rating: 5,
    type: [],
    bustRating: "0",
    img: "",
  });
  const [typeInfo, setTypeInfo] = useState({
    flat: false,
    ledge: false,
    rail: false,
    manual: false,
    curb: false,
    stairs: false,
    skatepark: false,
  });
  const [uploadStatus, setUploadStatus] = useState();

  const handleInputChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setSpotInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
    console.log(spotInfo);
  };

  //handle checkbox input and push to spotInfo state
  const handleTypeInputChange = e => {
    const name = e.target.name;
    const value = e.target.checked;
    setTypeInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
    const types = [];
    for (let type in typeInfo) {
      if (typeInfo[type]) types.push(type);
    }
    setSpotInfo(prevState => ({
      ...prevState,
      type: types,
    }));
  };

  const handleUploadChange = e => {
    const file = e.target.files[0];
    const storageRef = fire.storage().ref("spot_images/" + file.name);
    const task = storageRef.put(file);
    task.on(
      "state_changed",
      function progress(snapshot) {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadStatus(percentage);
      },
      function error(err) {
        console.log(err);
      },
      function complete() {
        setSpotInfo(prevState => ({
          ...prevState,
          img: file.name,
        }));
      },
      console.log(spotInfo)
    );
  };

  const submitNewSpot = () => {
    fire.database().ref("spots/").push(spotInfo);
    showInput();
  };

  return (
    <div className="bottom-wrapper absolute flex bottom-0 w-full text-center">
      <div className="shadow-lg block rounded-lg m-5 pl-5 pr-5 bg-white mx-auto">
        <h3 className="text-xl font-bold leading-7 text-navy-800 sm:text-lg sm:truncate mt-2">
          Add Spot
        </h3>
        <form action="" className=" flex flex-col">
          <label className="my-3">
            Name:
            <input
              type="text"
              name="name"
              value={spotInfo.name}
              onChange={handleInputChange}
              className="border-b-2 border-purple-900 focus:outline-none"
            />
          </label>
          <label className="my-3">
            ⭐️ Rating: 1
            <input
              type="radio"
              name="rating"
              value={1}
              onChange={handleInputChange}
            />{" "}
            2
            <input
              type="radio"
              name="rating"
              value={2}
              onChange={handleInputChange}
            />{" "}
            3
            <input
              type="radio"
              name="rating"
              value={3}
              onChange={handleInputChange}
            />{" "}
            4
            <input
              type="radio"
              name="rating"
              value={4}
              onChange={handleInputChange}
            />{" "}
            5
            <input
              type="radio"
              name="rating"
              value={5}
              onChange={handleInputChange}
            />{" "}
          </label>

          <div className="flex flex-row mx-auto flex-wrap max-w-sm">
            <label className="mx-3">
              Skatepark:
              <input
                name="skatepark"
                value="skatepark"
                type="checkbox"
                checked={spotInfo.skatepark}
                onChange={handleTypeInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Flat:
              <input
                name="flat"
                value="flat"
                type="checkbox"
                checked={spotInfo.flat}
                onChange={handleTypeInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Ledge:
              <input
                name="ledge"
                type="checkbox"
                checked={spotInfo.ledge}
                onChange={handleTypeInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Rail:
              <input
                name="rail"
                type="checkbox"
                checked={spotInfo.rail}
                onChange={handleTypeInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Manual:
              <input
                name="manual"
                type="checkbox"
                checked={spotInfo.manual}
                onChange={handleTypeInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Curb:
              <input
                name="curb"
                type="checkbox"
                checked={spotInfo.curb}
                onChange={handleTypeInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Stairs:
              <input
                name="stairs"
                type="checkbox"
                checked={spotInfo.stairs}
                onChange={handleTypeInputChange}
              />
            </label>
          </div>

          <label className="my-3">
            👮🏻‍♂️ Bust Rating: 1
            <input
              type="radio"
              name="bustRating"
              value={1}
              onChange={handleInputChange}
            />{" "}
            2
            <input
              type="radio"
              name="bustRating"
              value={2}
              onChange={handleInputChange}
            />{" "}
            3
            <input
              type="radio"
              name="bustRating"
              value={3}
              onChange={handleInputChange}
            />{" "}
            4
            <input
              type="radio"
              name="bustRating"
              value={4}
              onChange={handleInputChange}
            />{" "}
            5
            <input
              type="radio"
              name="bustRating"
              value={5}
              onChange={handleInputChange}
            />{" "}
          </label>
        </form>

        {/* <label className="block mt-2 mb-5">
         
          <input
            type="file"
            name=""
            id=""
            size="20"
            onChange={handleUploadChange}
          />
        </label> */}
        <input
          type="file"
          name="uploadfile"
          id="img"
          style={{ display: "none" }}
          onChange={handleUploadChange}
        />
        <label htmlFor="img" className="block cursor-pointer border-b-2 w-md">
          {" "}
          {uploadStatus ? uploadStatus.toFixed() + `%` : "Upload Image"}
        </label>

        <button
          className="text-white font-bold rounded-full py-3 px-6 bg-purple-500 hover:bg-purple-700 focus:outline-none mb-3"
          type="button"
          onClick={() => submitNewSpot()}
        >
          Submit New Spot
        </button>
      </div>
    </div>
  );
};

export default SpotInput;
