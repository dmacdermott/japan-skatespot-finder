import './App.css';
import database from './fire'
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"

function App() {


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
 

  return (

    <div className="App ">
       <h1>
         Japan Skate Tracker
       </h1>
    </div>
  );
}

export default App;
