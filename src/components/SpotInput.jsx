import { React, useState } from "react";
import database from "../fire";

const SpotInput = () => {
  const [spotInfo, setSpotInfo] = useState({
    name: "",
    coords: [0, 0],
    rating: 5,
    type: [],
    bustRating: "0",
  });
  const [typeInfo, setTypeInfo] = useState({
    flat: false,
    ledge: false,
    rail: false,
    manual: false,
    curb: false,
    stairs: false,
  });

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

  const submitNewSpot = async () => {
    let lat;
    let lng;

    //Get user location
    navigator.geolocation.getCurrentPosition(async position => {
      lat = await position.coords.latitude;
      lng = await position.coords.longitude;
      setSpotInfo(prevState => ({
        ...prevState,
        coords: [lat, lng],
      }));
      setTimeout(() => database.ref("spots/").push(spotInfo));
      //Submit to database
    });
  };

  return (
    <div className="mb-5 mt-5 flex flex-col">
      <form action="" className=" flex flex-col">
        <label className="my-3">
          Name:
          <input
            type="text"
            name="name"
            value={spotInfo.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="my-3">
          Rating:
          <input
            type="radio"
            name="rating"
            value={1}
            onChange={handleInputChange}
          />{" "}
          1
          <input
            type="radio"
            name="rating"
            value={2}
            onChange={handleInputChange}
          />{" "}
          2
          <input
            type="radio"
            name="rating"
            value={3}
            onChange={handleInputChange}
          />{" "}
          3
          <input
            type="radio"
            name="rating"
            value={4}
            onChange={handleInputChange}
          />{" "}
          4
          <input
            type="radio"
            name="rating"
            value={5}
            onChange={handleInputChange}
          />{" "}
          5
        </label>

        <label className="my-3">
          {" "}
          Type
          <label>
            {" "}
            Flat
            <input
              name="flat"
              value="flat"
              type="checkbox"
              checked={spotInfo.flat}
              onChange={handleTypeInputChange}
            />
          </label>
          <label>
            {" "}
            Ledge
            <input
              name="ledge"
              type="checkbox"
              checked={spotInfo.ledge}
              onChange={handleTypeInputChange}
            />
          </label>
          <label>
            {" "}
            Rail
            <input
              name="rail"
              type="checkbox"
              checked={spotInfo.rail}
              onChange={handleTypeInputChange}
            />
          </label>
          <label>
            {" "}
            Manual
            <input
              name="manual"
              type="checkbox"
              checked={spotInfo.manual}
              onChange={handleTypeInputChange}
            />
          </label>
          <label>
            {" "}
            Curb
            <input
              name="curb"
              type="checkbox"
              checked={spotInfo.curb}
              onChange={handleTypeInputChange}
            />
          </label>
          <label>
            {" "}
            Stairs
            <input
              name="stairs"
              type="checkbox"
              checked={spotInfo.stairs}
              onChange={handleTypeInputChange}
            />
          </label>
        </label>
        <label className="my-3">
          👮🏻‍♂️ Bust Rating:
          <input
            type="radio"
            name="bustRating"
            value={1}
            onChange={handleInputChange}
          />{" "}
          1
          <input
            type="radio"
            name="bustRating"
            value={2}
            onChange={handleInputChange}
          />{" "}
          2
          <input
            type="radio"
            name="bustRating"
            value={3}
            onChange={handleInputChange}
          />{" "}
          3
          <input
            type="radio"
            name="bustRating"
            value={4}
            onChange={handleInputChange}
          />{" "}
          4
          <input
            type="radio"
            name="bustRating"
            value={5}
            onChange={handleInputChange}
          />{" "}
          5
        </label>
      </form>

      <button type="button" onClick={() => submitNewSpot()}>
        Submit New Spot
      </button>
    </div>
  );
};

export default SpotInput;
