import React from "react";

const Filter = () => {
  const [filterType, setFilterType] = useState();

  const handleInputChange = e => {
    const value = e.target.value;
    setFilterType(value);
    console.log(filterType);
  };

  return (
    <div className="bottom-wrapper absolute flex bottom-0 w-full text-center">
      <div className="shadow-lg block rounded-lg m-5 pl-5 pr-5 bg-white mx-auto">
        <h3 className="text-xl font-bold leading-7 text-navy-800 sm:text-lg sm:truncate mt-2">
          Filter Spots
        </h3>
        <form action="" className=" flex flex-col">
          <label className="my-3">
            Type:
            <label>
              Skateparks
              <input
                name="skatepark"
                value="skatepark"
                type="radio"
                onChange={handleInputChange}
              />
            </label>
            <label>
              {" "}
              Flat Ground
              <input
                name="flat"
                value="flat"
                type="radio"
                onChange={handleInputChange}
              />
            </label>
            <label>
              {" "}
              Ledges
              <input name="ledge" type="radio" onChange={handleInputChange} />
            </label>
            <label>
              {" "}
              Rails
              <input name="rail" type="radio" onChange={handleInputChange} />
            </label>
            <label>
              {" "}
              Manual Spots
              <input name="manual" type="radio" onChange={handleInputChange} />
            </label>
            <label>
              {" "}
              Curbs
              <input name="curb" type="radio" onChange={handleInputChange} />
            </label>
            <label>
              {" "}
              Stairs
              <input name="stairs" type="radio" onChange={handleInputChange} />
            </label>
          </label>
        </form>

        <button
          className="text-white font-bold rounded-full py-3 px-6 bg-purple-500 hover:bg-purple-700 focus:outline-none mb-3"
          type="button"
          onClick={() => filterSpots()}
        >
          Filter Spots
        </button>
      </div>
    </div>
  );
};

export default Filter;
