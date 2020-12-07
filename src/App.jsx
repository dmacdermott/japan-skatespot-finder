import "./App.css";
import database from "./fire";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "50vh",
};
const centerMap = {
  lat: 35.6804,
  lng: 139.769,
};

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

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
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={centerMap}
      ></GoogleMap>
    </div>
  );
}

export default App;
