import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

const CHARS = "01αβλ∇∑φψωΩ∈∀∃IAAI";
const FONT_SIZE = 13;

function noise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 3.1 + t * 0.38) *
    Math.cos(y * 2.7 - t * 0.29) *
    Math.sin((x + y) * 1.9 + t * 0.52) +
    Math.cos(x * 5.2 - y * 2.1 + t * 0.21) * 0.45 +
    Math.sin(x * 1.4 + y * 3.8 - t * 0.17) * 0.3
  );
}

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1, y: -1 });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const onResize = () => resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const onMouseLeave = () => {
      mouse.current = { x: -1, y: -1 };
    };

    window.addEventListener("resize", onResize);
    // Listen on window so we capture mouse even when hovering buttons
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const isDark = () => document.documentElement.classList.contains("dark");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / FONT_SIZE);
      const rows = Math.ceil(canvas.height / FONT_SIZE);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const dark = isDark();

      ctx.font = `${FONT_SIZE}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const nx = c / cols;
          const ny = r / rows;

          const n = noise(nx * 6, ny * 5, t);
          // Normalize: noise ranges roughly -1.75 .. 1.75
          const base = (n + 1.75) / 3.5;

          // Mouse halo: within ~20% of screen width, characters get brighter
          let mouseBump = 0;
          if (mx >= 0) {
            const dx = nx - mx;
            const dy = ny - my;
            const dist = Math.sqrt(dx * dx + dy * dy * 2.5);
            mouseBump = Math.max(0, 1 - dist / 0.22) * 0.55;
          }

          const alpha = Math.min(0.95, base * 0.14 + mouseBump);
          if (alpha < 0.018) continue;

          // Deterministic char per cell, very slowly cycling
          const charIdx =
            Math.floor(
              Math.abs(Math.sin(c * 17.391 + r * 11.743) * CHARS.length + t * 0.18)
            ) % CHARS.length;

          // Color: brighter near cursor
          if (dark) {
            // Violet → indigo gradient per alpha
            const boost = mouseBump > 0.08 ? 1 : 0;
            ctx.fillStyle = boost
              ? `rgba(192, 132, 252, ${alpha})` // purple-400
              : `rgba(139, 92, 246, ${alpha})`;  // violet-500
          } else {
            ctx.fillStyle = mouseBump > 0.08
              ? `rgba(99, 102, 241, ${alpha})`   // indigo-500
              : `rgba(79, 70, 229, ${alpha})`;   // indigo-600
          }

          ctx.fillText(CHARS[charIdx], c * FONT_SIZE, r * FONT_SIZE);
        }
      }

      t += 0.016;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}
