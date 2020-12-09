import fire from "../fire";
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
  position: "absolute",
  height: "100%",
  top: 0,
  bottom: 0,
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

export default function Map({ filterResults, getDetailedInfo }) {
  const [data, setData] = useState();
  const [spotInfo, setSpotInfo] = useState(null);

  useEffect(() => {
    fire
      .database()
      .ref("spots")
      .on("value", snapshot => {
        if (snapshot && snapshot.exists()) {
          let data = [];
          const obj = snapshot.val();
          for (let spots in obj) {
            data.push(obj[spots]);
          }

          if (filterResults) {
            data = data.filter(
              spots => spots.type && spots.type.includes(filterResults)
            );
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
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={centerMap}
        options={options}
      >
        {data &&
          data.length > 0 &&
          data.map(spot => (
            <Marker
              key={spot.coords}
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
                {typeof spotInfo.type === "object" ? (
                  ((<h2 className="text-md">Type</h2>),
                  spotInfo.type.map(type => (
                    <span
                      key={type}
                      className=" rounded-full py-0.5 px-2 border border-purple-900 border-opacity-100 mx-0.5"
                    >
                      {" "}
                      {type}{" "}
                    </span>
                  )))
                ) : spotInfo.type ? (
                  <span className=" rounded-full py-0.5 px-2 border border-purple-900 border-opacity-100 mx-0.5">
                    {" "}
                    {spotInfo.type}{" "}
                  </span>
                ) : null}
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
                onClick={() => getDetailedInfo(spotInfo)}
              >
                Show More Info
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="inline w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
