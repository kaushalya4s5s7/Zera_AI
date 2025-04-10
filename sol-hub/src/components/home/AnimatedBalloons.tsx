"use client";
import React, { useEffect, useState } from "react";

interface Balloon {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
}

const colors = [
  "bg-purple-light",
  "bg-purple",
  "bg-purple-dark",
  "bg-orange-light",
  "bg-orange",
  "bg-orange-dark",
  "bg-pink-400",
  "bg-blue-400",
  "bg-green-400",
];

const AnimatedBalloons: React.FC = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    // Create initial balloons
    const initialBalloons = Array.from({ length: 15 }, (_, i) =>
      createRandomBalloon(i)
    );
    setBalloons(initialBalloons);

    // Animation loop
    const intervalId = setInterval(() => {
      setBalloons((prevBalloons) =>
        prevBalloons.map((balloon) => {
          // Move balloon upward
          const newY = balloon.y - balloon.speed;

          // If balloon goes off screen, reset it at bottom with new random properties
          if (newY < -150) {
            return createRandomBalloon(balloon.id);
          }

          // Otherwise, update its position
          return {
            ...balloon,
            y: newY,
            x: balloon.x + Math.sin(newY * 0.01) * 1.5, // Add gentle side-to-side motion
          };
        })
      );
    }, 50);

    // Periodically add new balloons
    const newBalloonInterval = setInterval(() => {
      setBalloons((prev) => {
        const maxId = prev.length > 0 ? Math.max(...prev.map((b) => b.id)) : 0;
        return [...prev, createRandomBalloon(maxId + 1)];
      });
    }, 3000);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(newBalloonInterval);
    };
  }, []);

  const createRandomBalloon = (id: number): Balloon => {
    const windowWidth =
      typeof window !== "undefined" ? window.innerWidth : 1200;

    return {
      id,
      x: Math.random() * windowWidth,
      y: window.innerHeight + Math.random() * 100, // Start below screen
      size: Math.random() * 60 + 40, // Size between 40-100px
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 1 + 0.5, // Random speed
      opacity: Math.random() * 0.4 + 0.1, // Random opacity between 0.1-0.5
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className={`absolute rounded-full ${balloon.color} shadow-lg`}
          style={{
            left: `${balloon.x}px`,
            top: `${balloon.y}px`,
            width: `${balloon.size}px`,
            height: `${balloon.size}px`,
            opacity: balloon.opacity,
            filter: "blur(8px)",
            transform: `rotate(${balloon.id * 30}deg)`,
            transition: "transform 1s ease",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBalloons;
