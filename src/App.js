import './App.css';
import database from './fire'
import "firebase/database"


function App() {


  function writeNewSpot( name, rating, typeArr) {
   database.ref('spots/').push({
      spot_name: name,
      rating: rating,
      type : typeArr,
    });
  }
  writeNewSpot("test spot", "3", ["manual"])

  var allSpots = database.ref("spots")
  allSpots.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data)

  })
 
  return (

    <div className="App ">
       <h1>HELLO peopel</h1>
    </div>
  );
}

export default App;
