import "./App.css";
import database from "./fire";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import { useState, useEffect } from "react";

//Map Options
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const centerMap = {
  lat: 35.6804,
  lng: 139.769,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
};


function App() {
  const [data, setData] = useState();

  useEffect(() => {
    database.ref("spots").on("value", snapshot => 
    {if(snapshot && snapshot.exists()){
      setData(snapshot.val())
    }}
    ); 
  }, [])
 

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
        zoom={9}
        center={centerMap}
        options={options}
      >
        {data
          ? data.map(obj => (
              <Marker
                position={{ lat: +obj.coords[0], lng: +obj.coords[1] }}
              ></Marker>
            ))
          : null}

      </GoogleMap>
    </div>
  );
}

export default App;
