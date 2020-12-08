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

  //Helper Functions
  function showInput() {
    return setShowInput(!showSpotInput);
  }

  function getFilter() {
    return setFilter(!showFilter);
  }

  return (
    <div className="App relative">
      <Map />

      <AddFilterBtn
        showInput={showInput}
        showSpotInput={showSpotInput}
        getFilter={getFilter}
        showFilter={showFilter}
      ></AddFilterBtn>
      {showSpotInput && <SpotInput lat={latitude} lng={longitude} />}
      {showFilter && <Filter />}
    </div>
  );
}

export default App;
