import React from 'react';
import Camera from './jscomponents/Camera.js';

function App() {
  return (
    <div className="App">
      <h1>The Secret Keeper</h1>
      <p>Push the button to find out the secret...if you're worthy.</p>
      <Camera/>
    </div>
  );
}

export default App;
