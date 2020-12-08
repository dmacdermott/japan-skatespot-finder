import "./App.css";
import Map from "./components/Map";
import AddFilterBtn from "./components/AddFilterBtn";
import SpotInput from "./components/SpotInput";
import { useState } from "react";
import { usePosition } from "use-position";
import Filter from "./components/Filter";

function App() {
  //Get User Locations
  const watch = true;
  const { latitude, longitude } = usePosition(watch);
  console.log(latitude);
  const [showSpotInput, setShowInput] = useState(false);
  const [showFilter, setFilter] = useState(false);
  const [filterResults, setFilterResults] = useState(null);

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

  return (
    <div className="App relative">
      <Map filterResults={filterResults} />

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
    </div>
  );
}

export default App;
