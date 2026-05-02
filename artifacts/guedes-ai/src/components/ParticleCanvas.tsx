import React, { useEffect, useRef } from "react";

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      sinOffset: number;
      sinSpeed: number;
    }[] = [];

    const colors = ["rgba(255, 255, 255, 0.2)", "rgba(45, 53, 255, 0.3)", "rgba(0, 200, 150, 0.15)"];
    const particleCount = Math.floor((width * height) / 10000); // Responsive particle count (~1500 for standard screens)

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        sinOffset: Math.random() * Math.PI * 2,
        sinSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy + Math.sin(time * p.sinSpeed + p.sinOffset) * 0.5;

        // Mouse Parallax effect
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          p.x -= dx * 0.01;
          p.y -= dy * 0.01;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}