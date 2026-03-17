import { useState, useEffect, useRef } from 'react';

function Minigame() {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ top: '20%', left: '20%' });
  const gameAreaRef = useRef(null);

  // Move the target to a random position every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameAreaRef.current) return;
      const area = gameAreaRef.current.getBoundingClientRect();
      const newTop = Math.random() * (area.height - 30);
      const newLeft = Math.random() * (area.width - 30);
      setPosition({ top: `${newTop}px`, left: `${newLeft}px` });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setScore((s) => s + 1);
  };

  return (
    <section id="minigame" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <h2>Click the Box! Score: {score}</h2>
      <div
        ref={gameAreaRef}
        style={{
          position: 'relative',
          height: '200px',
          border: '2px solid #333',
          margin: '0 auto',
          width: '80%',
          maxWidth: '400px',
        }}
      >
        <div
          onClick={handleClick}
          style={{
            position: 'absolute',
            width: '30px',
            height: '30px',
            backgroundColor: '#ff5722',
            cursor: 'pointer',
            top: position.top,
            left: position.left,
          }}
        />
      </div>
    </section>
  );
}

export default Minigame;
