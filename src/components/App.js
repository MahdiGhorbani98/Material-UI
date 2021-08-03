import Home from "./Home";
import '../css/Home.css';
import {useEffect,useState} from 'react';
import Axios from 'axios'
import axios from "axios";
function App() {
  const [notes,setNotes] = useState([]); 
  const [load,setLoad] = useState(false);

  useEffect(() => {
    Axios.get('https://api.npoint.io/87c5bf40b4c2172aedd1')
    .then(res =>{setNotes(res.data.notes); setLoad(true)})
    

  }, [])


  return (
    <div >
      
      <Home notes={notes} load={load}/>
    </div>
  );
}

export default App;
