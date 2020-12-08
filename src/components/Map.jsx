import database from "../fire";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../mapStyles";
import { React, useState, useEffect } from "react";

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
  gestureHandling: "greedy",
};

export default function Map() {
  const [data, setData] = useState();
  const [spotInfo, setSpotInfo] = useState(null);

  useEffect(() => {
    database.ref("spots").on("value", snapshot => {
      if (snapshot && snapshot.exists()) {
        const data = [];
        const obj = snapshot.val();
        for (let spots in obj) {
          data.push(obj[spots]);
        }
        setData(data);
      }
    });
  }, []);

  //Helper Functions
  function getSpotInfo(spot) {
    return setSpotInfo(spot);
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  console.log(data);
  return (
    <div className="Map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={centerMap}
        options={options}
      >
        {data &&
          data.map(spot => (
            <Marker
              position={{ lat: +spot.coords[0], lng: +spot.coords[1] }}
              onClick={() => getSpotInfo(spot)}
            />
          ))}
        {spotInfo && (
          <InfoWindow
            position={{ lat: +spotInfo.coords[0], lng: +spotInfo.coords[1] }}
            onCloseClick={() => setSpotInfo(null)}
          >
            <div className="">
              <h3>{spotInfo.name}</h3>
              <div>
                {spotInfo.type
                  ? ((<h2>Type</h2>),
                    spotInfo.type.map(type => <span> {type} </span>))
                  : null}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
