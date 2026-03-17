import React, { useState } from 'react';

const symbols = ['🍒', '🍋', '🔔', '⭐', '💎'];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

export default function SlotMachine() {
  const [reels, setReels] = useState([getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const interval = setInterval(() => {
      setReels([getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]);
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
    }, 2000);
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Slot Machine</h2>
      <div style={{ fontSize: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {reels.map((sym, idx) => (
          <span key={idx}>{sym}</span>
        ))}
      </div>
      <button onClick={spin} disabled={spinning} style={{ marginTop: '10px', padding: '10px 20px' }}>
        {spinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
}
