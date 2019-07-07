import React from 'react';
import Camera from './jscomponents/Camera.js';

function App() {
  const centerText = {
    textAlign: 'center'
  }

  

  return (
    <div className="App">
      <h1 style = {centerText}>The Secret Keeper</h1>
      <p style = {centerText}>Push the button to find out the secret...if you're worthy.</p>
      <Camera/>
    </div>
  );
}

export default App;
