import firebase from "firebase/app";
import "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrxeVCqvJpFuGbkMIRBvNgb-aW7vu0D_8",
  authDomain: "japan-skate-spot-finder.firebaseapp.com",
  databaseURL: "https://japan-skate-spot-finder-default-rtdb.firebaseio.com",
  projectId: "japan-skate-spot-finder",
  storageBucket: "japan-skate-spot-finder.appspot.com",
  messagingSenderId: "173154016077",
  appId: "1:173154016077:web:747a9c2bf2e9261b46f504",
  measurementId: "G-5J9E0PRPET",
};

var fire = firebase.initializeApp(firebaseConfig);

export default fire;
