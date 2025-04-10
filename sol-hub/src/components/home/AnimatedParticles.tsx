import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const AnimatedParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Create particles
    const particles: Particle[] = [];
    const createParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 15);

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 40 + 10;
        const color =
          Math.random() > 0.5
            ? `rgba(155, 135, 245, ${Math.random() * 0.4 + 0.1})` // Purple
            : `rgba(249, 115, 22, ${Math.random() * 0.4 + 0.1})`; // Orange

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          color: color,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 2 - 1,
        });
      }
    };

    createParticles();

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Update rotation
        particle.rotation += particle.rotationSpeed;

        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.globalAlpha = particle.opacity;

        // Draw circle for particle
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Handle boundary checking
        if (
          particle.x < -particle.size ||
          particle.x > canvas.width + particle.size
        ) {
          particle.speedX = -particle.speedX;
        }

        if (
          particle.y < -particle.size ||
          particle.y > canvas.height + particle.size
        ) {
          particle.speedY = -particle.speedY;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-60"
    />
  );
};

export default AnimatedParticles;
