import React from 'react';
import './App.css'
function App() {
  return (
    <div>
      <h1 className="App">Hello Google</h1>
      <button className="card cyan lighten-1" style={{textAlign:"center",padding:"20px",margin:"10%"}}>
      <i className="fa fa-google " ></i><br></br>
      <a href="/google" >Sigin With Google</a>
      </button>
    </div>
  );
}

export default App;
