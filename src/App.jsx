import "./App.css";
import Map from "./components/Map";
import AddSpot from "./components/AddSpot";

function App() {
  return (
    <div className="App relative">
      <Map />
      <AddSpot></AddSpot>
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
