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

const police = "👮🏻‍♂️";
const star = "⭐️";

export default function Map({ filterResults }) {
  const [data, setData] = useState();
  const [spotInfo, setSpotInfo] = useState(null);

  useEffect(() => {
    database.ref("spots").on("value", snapshot => {
      if (snapshot && snapshot.exists()) {
        let data = [];
        const obj = snapshot.val();
        for (let spots in obj) {
          data.push(obj[spots]);
        }
        console.log(filterResults);
        if (filterResults) {
          data = data.filter(spots => spots.type.includes(filterResults));
        }
        data.length > 0 ? setData(data) : setData(null);
      }
    });
  }, [filterResults]);

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
  console.log("Loaded Data ", data);
  return (
    <div className="Map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={centerMap}
        options={options}
      >
        {data &&
          data.length > 0 &&
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
            <div className="m-3">
              <h3 className="text-lg font-bold">{spotInfo.name}</h3>
              <div className="my-2">
                {spotInfo.type.length >= 0
                  ? ((<h2 className="text-md">Type</h2>),
                    spotInfo.type.map(type => (
                      <span className="text-white rounded-full py-1 px-3 bg-purple-300 ">
                        {" "}
                        {type}{" "}
                      </span>
                    )))
                  : null}
              </div>
              <p className="my-2">
                Rating:
                {star.repeat(spotInfo.rating)}
              </p>
              <p className="my-2">
                Bust Rating:
                {police.repeat(spotInfo.bustRating)}
              </p>
              <button
                className="text-white rounded-full py-1 px-3 bg-blue-300"
                onClick={() => {
                  const url = `https://www.google.com/maps/@${spotInfo.coords[0]},${spotInfo.coords[1]}`;
                  window.open(url, "_blank");
                }}
              >
                Get Directions
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
