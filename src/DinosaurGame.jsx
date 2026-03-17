import React, { useEffect, useRef, useState } from 'react';
import './DinosaurGame.css';

const DinosaurGame = () => {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dino = { x: 50, y: 150, w: 20, h: 20, vy: 0, grounded: true };
    const gravity = 0.6;
    const jumpStrength = -12;
    const obstacles = [];
    let frame = 0;

    const handleKey = (e) => {
      if (e.code === 'Space' && dino.grounded) {
        dino.vy = jumpStrength;
        dino.grounded = false;
      }
    };
    window.addEventListener('keydown', handleKey);

    const loop = () => {
      if (!running) return;
      frame++;
      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Dinosaur physics
      dino.vy += gravity;
      dino.y += dino.vy;
      if (dino.y >= 150) { dino.y = 150; dino.vy = 0; dino.grounded = true; }
      // Draw dinosaur
      ctx.fillStyle = '#555';
      ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
      // Add obstacles
      if (frame % 120 === 0) {
        obstacles.push({ x: canvas.width, y: 150, w: 20, h: 20 });
      }
      // Move and draw obstacles
      ctx.fillStyle = '#900';
      obstacles.forEach((obs, i) => {
        obs.x -= 4;
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        // Collision
        if (
          dino.x < obs.x + obs.w &&
          dino.x + dino.w > obs.x &&
          dino.y < obs.y + obs.h &&
          dino.y + dino.h > obs.y
        ) {
          setRunning(false);
        }
        // Remove off-screen
        if (obs.x + obs.w < 0) obstacles.splice(i, 1);
      });
      requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [running]);

  return (
    <div className="dino-game">
      <h2>Dinosaur Game</h2>
      <canvas ref={canvasRef} width={300} height={200} />
      {!running && <button onClick={() => setRunning(true)}>Restart</button>}
    </div>
  );
};

export default DinosaurGame;
