import { React, useState, useEffect } from "react";

const Filter = ({ getFilterResults }) => {
  const [filterType, setFilterType] = useState();

  const handleInputChange = e => {
    const value = e.target.value;
    setFilterType(value);
  };

  return (
    <div className="bottom-wrapper absolute flex bottom-0 w-full text-center ">
      <div className="shadow-lg block rounded-lg m-5 pl-5 pr-5 bg-white mx-auto max-w-md">
        <h3 className="text-xl font-bold leading-7 text-navy-800 sm:text-lg sm:truncate mt-2">
          Filter Spots
        </h3>
        <form action="" className=" flex flex-col">
          <label className="my-3">
            <label className="mx-3">
              Skateparks:
              <input
                name="spot-types"
                value="skatepark"
                type="radio"
                onChange={handleInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Flat Ground:
              <input
                name="spot-types"
                value="flat"
                type="radio"
                onChange={handleInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Ledges:
              <input
                name="spot-types"
                value="ledge"
                type="radio"
                onChange={handleInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Rails:
              <input
                name="spot-types"
                type="radio"
                value="rail"
                onChange={handleInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Manual Spots:
              <input
                name="spot-types"
                type="radio"
                value="manual"
                onChange={handleInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Curbs:
              <input
                name="spot-types"
                type="radio"
                value="curb"
                onChange={handleInputChange}
              />
            </label>
            <label className="mx-3">
              {" "}
              Stairs:
              <input
                name="spot-types"
                type="radio"
                value="stairs"
                onChange={handleInputChange}
              />
            </label>
          </label>
        </form>

        <button
          className="text-white font-bold rounded-full py-3 px-6 bg-purple-700 hover:bg-purple-900 focus:outline-none mb-3"
          type="button"
          onClick={() => getFilterResults(filterType)}
        >
          Filter Spots
        </button>
      </div>
    </div>
  );
};

export default Filter;
