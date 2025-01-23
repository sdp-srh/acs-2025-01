import React, { useState } from 'react';
import './App.css';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleButtonClick1 = () => {
    alert(`First input is: ${input1}`);
  };

  const handleButtonClick2 = () => {
    alert(`Second input is: ${input2}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={input1}
          onChange={e => setInput1(e.target.value)}
          placeholder="Enter text here..."
        />
        <button onClick={handleButtonClick1}>Click Me 1</button>
        <input
          type="text"
          value={input2}
          onChange={e => setInput2(e.target.value)}
          placeholder="Enter more text..."
        />
        <button onClick={handleButtonClick2}>Click Me 2</button>
      </header>
    </div>
  );
}

export default App;
