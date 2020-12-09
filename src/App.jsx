import "./App.css";
import Map from "./components/Map";
import AddFilterBtn from "./components/AddFilterBtn";
import SpotInput from "./components/SpotInput";
import { useState } from "react";
import { usePosition } from "use-position";
import Filter from "./components/Filter";
import MoreInfo from "./components/MoreInfo";

function App() {
  //Get User Locations
  const watch = true;
  const { latitude, longitude } = usePosition(watch);
  const [showSpotInput, setShowInput] = useState(false);
  const [showFilter, setFilter] = useState(false);
  const [filterResults, setFilterResults] = useState(null);
  const [moreInfo, setMoreInfo] = useState();
  const [detailedInfo, setDetailedInfo] = useState();

  //Helper Functions
  function showInput() {
    return setShowInput(!showSpotInput);
  }
  function getFilter() {
    return setFilter(!showFilter);
  }

  function getFilterResults(type) {
    return setFilterResults(type);
  }

  function getDetailedInfo(spot) {
    setDetailedInfo(spot);
    setMoreInfo(!moreInfo);
  }

  function showMoreInfo() {
    setMoreInfo(!moreInfo);
  }

  return (
    <div className="App relative">
      <h1 className="absolute top-5 z-50 font-bold text-sm ml-5 rounded-full py-3 px-6 bg-purple-700 text-white shadow-lg">
        Skate Spot Finder
      </h1>

      <Map
        filterResults={filterResults}
        getDetailedInfo={getDetailedInfo}
        className={"max-h-full"}
      />

      <AddFilterBtn
        showInput={showInput}
        showSpotInput={showSpotInput}
        getFilter={getFilter}
        showFilter={showFilter}
      ></AddFilterBtn>
      {showSpotInput && !showFilter && (
        <SpotInput lat={latitude} lng={longitude} showInput={showInput} />
      )}
      {showFilter && !showSpotInput && (
        <Filter getFilterResults={getFilterResults} />
      )}
      {moreInfo && (
        <MoreInfo detailedInfo={detailedInfo} showMoreInfo={showMoreInfo} />
      )}
    </div>
  );
}

export default App;
