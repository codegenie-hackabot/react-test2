import { useState } from 'react';
import './Roulette.css';

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Roulette() {
  const [result, setResult] = useState(null);
  const spin = () => {
    const idx = Math.floor(Math.random() * numbers.length);
    setResult(numbers[idx]);
  };
  return (
    <div className="roulette-container">
      <h2>Roulette Wheel</h2>
      <div className="wheel">
        {numbers.map((n) => (
          <div key={n} className="segment">{n}</div>
        ))}
      </div>
      <button onClick={spin}>Spin</button>
      {result !== null && <p className="result">Result: {result}</p>}
    </div>
  );
}
