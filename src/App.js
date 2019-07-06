import React from 'react';
import Camera from './jscomponents/Camera.js';
import UserFace from './img/userFace.JPG';

function App() {
  return (
    <div className="App">
      <h1>Facial Recognition</h1>
      <Camera/>
      <h3>Expected User</h3>
      <img src={UserFace} alt="User Face" width="200px"/>
    </div>
  );
}

export default App;
