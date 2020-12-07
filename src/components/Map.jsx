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
};

export default function Map() {
  const [data, setData] = useState();
  const [spotInfo, setSpotInfo] = useState(null);

  useEffect(() => {
    database.ref("spots").on("value", snapshot => {
      if (snapshot && snapshot.exists()) {
        setData(snapshot.val());
      }
    });
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

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
              key={spot.id}
              position={{ lat: +spot.coords[0], lng: +spot.coords[1] }}
              onClick={() => {
                setSpotInfo(spot);
              }}
            />
          ))}
        {spotInfo && (
          <InfoWindow
            position={{ lat: +spotInfo.coords[0], lng: +spotInfo.coords[1] }}
            onCloseClick={() => setSpotInfo(null)}
          >
            <div>{spotInfo.name}</div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
