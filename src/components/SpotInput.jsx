import { React, useState } from "react";

const SpotInput = () => {
  const [spotInfo, setSpotInfo] = useState({
    name: "",
    coords: [0, 0],
    rating: 5,
    type: [],
    bustRating: "0",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSpotInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
    console.log(spotInfo);
  };

  return (
    <div className="mb-5 mt-5">
      <form action="">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={spotInfo.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
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

        <label>
          {" "}
          Type
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    </div>
  );
};

export default SpotInput;
