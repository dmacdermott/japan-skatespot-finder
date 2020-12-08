import "./App.css";
import Map from "./components/Map";
import AddSpot from "./components/AddSpot";
import SpotInput from "./components/SpotInput";
import { useState } from "react";

function App() {
  const [showSpotInput, setShowInput] = useState(false);

  //Helper Functions
  function showInput() {
    return setShowInput(!showSpotInput);
  }

  return (
    <div className="App relative">
      <Map />
      <AddSpot showInput={showInput} showSpotInput={showSpotInput}></AddSpot>
      {showSpotInput && <SpotInput />}
    </div>
  );
}

export default App;

//READ WRITE FUNCTIONS FOR GOOGLE FIREBASE
// function writeNewSpot( name, rating, typeArr) {
//  database.ref('spots/').set({
//     spot_name: name,
//     rating: rating,
//     type : typeArr,
//   });
// }
// writeNewSpot("test spot", "3", ["manual"])

// var allSpots = database.ref("spots")
// allSpots.on("value", (snapshot) => {
//   const data = snapshot.val();
//   console.log(data)

// })
