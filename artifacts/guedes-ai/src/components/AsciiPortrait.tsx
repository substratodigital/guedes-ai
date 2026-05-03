import { useEffect, useRef } from "react";
import specialistImg from "@assets/Especialista-hero_1777780763963.webp";

// Light → dense (brightness high = light char, brightness low = dense char)
const CHARS = " ·:!|IA01φψαβλ∇∑ωΩ∈∀∃@#";
const CELL = 8;
const REVEAL_RADIUS = 130;
const EDGE_FRAC = 0.38; // soft-edge fraction of radius

interface CellData {
  ch: string;
  brightness: number;
  hasContent: boolean;
}

export function AsciiPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1, y: -1 });
  const curReveal = useRef(0);
  const targetReveal = useRef(0);
  const cells = useRef<CellData[]>([]);
  const gridCols = useRef(0);
  const gridRows = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;

    const img = new Image();
    img.src = specialistImg;

    const buildCells = () => {
      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) return;

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d")!;

      // Contain image (center it)
      const iAspect = img.naturalWidth / img.naturalHeight;
      const cAspect = W / H;
      let dw = W, dh = H, dx = 0, dy = 0;
      if (iAspect > cAspect) {
        dh = W / iAspect;
        dy = (H - dh) / 2;
      } else {
        dw = H * iAspect;
        dx = (W - dw) / 2;
      }
      octx.drawImage(img, dx, dy, dw, dh);

      const idata = octx.getImageData(0, 0, W, H);
      const data = idata.data;

      const cols = Math.ceil(W / CELL);
      const rows = Math.ceil(H / CELL);
      gridCols.current = cols;
      gridRows.current = rows;

      const result: CellData[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = Math.min(Math.floor(col * CELL + CELL / 2), W - 1);
          const py = Math.min(Math.floor(row * CELL + CELL / 2), H - 1);
          const idx = (py * W + px) * 4;
          const alpha = data[idx + 3];

          if (alpha < 10) {
            result.push({ ch: " ", brightness: 0, hasContent: false });
            continue;
          }

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          const charIdx = Math.min(
            CHARS.length - 1,
            Math.floor((1 - brightness) * CHARS.length)
          );
          result.push({ ch: CHARS[charIdx], brightness, hasContent: true });
        }
      }
      cells.current = result;
    };

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      if (img.complete && img.naturalWidth > 0) buildCells();
    };

    img.onload = () => resize();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      targetReveal.current = REVEAL_RADIUS;
    };
    const onMouseLeave = () => {
      targetReveal.current = 0;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = () => {
      const cellList = cells.current;
      if (!cellList.length) {
        animId = requestAnimationFrame(draw);
        return;
      }

      // Lerp reveal radius
      curReveal.current = lerp(curReveal.current, targetReveal.current, 0.09);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${CELL}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      const cols = gridCols.current;
      const rows = gridRows.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const radius = curReveal.current;
      const hasMousen = mx >= 0 && radius > 0.5;
      const innerR = radius * (1 - EDGE_FRAC);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cell = cellList[row * cols + col];
          if (!cell?.hasContent || cell.ch === " ") continue;

          const cx = col * CELL + CELL / 2;
          const cy = row * CELL + CELL / 2;

          let drawAlpha = 1;
          if (hasMousen) {
            const dx = cx - mx;
            const dy = cy - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < innerR) continue; // fully revealed — skip char
            if (dist < radius) {
              const t = (dist - innerR) / (radius - innerR);
              drawAlpha = t * t; // quadratic ease
            }
          }

          const alpha = drawAlpha * (0.28 + cell.brightness * 0.62);
          if (alpha < 0.02) continue;

          // Violet-purple, slightly warmer for brighter cells
          const rb = Math.round(167 + cell.brightness * 20);
          const gb = Math.round(139 + cell.brightness * 10);
          ctx.fillStyle = `rgba(${rb},${gb},250,${alpha.toFixed(3)})`;
          ctx.fillText(cell.ch, col * CELL, row * CELL);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none"
      style={{ cursor: "crosshair" }}
    >
      {/* Real photo — revealed by mouse */}
      <img
        src={specialistImg}
        alt="Luís Guedes"
        className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none"
        draggable={false}
      />
      {/* ASCII overlay canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      />
    </div>
  );
}
