import { useEffect, useRef } from "react";
import specialistImg from "@assets/Especialista-hero_1777780763963.webp";

// Single dot character — all cells same shape, only color/opacity varies
const DOT   = "0";
const BGDOT = "·";
const CELL    = 9;    // portrait grid step (px)
const BGSTEP  = 21;   // background dot grid step (px)
const MIN_A   = 12;   // minimum pixel alpha to render a dot
const MIN_B   = 0.04; // minimum brightness to render
const SAT_BOOST = 1.7; // color saturation multiplier

// Reveal effect
const REVEAL_RADIUS = 105;
const LERP = 0.1;

interface PortraitCell {
  r: number; g: number; b: number;
  brightness: number;
  alpha: number; // 0-255 from source
}

function boostColor(r: number, g: number, b: number): [number, number, number] {
  const avg = (r + g + b) / 3;
  return [
    Math.min(255, Math.round(avg + (r - avg) * SAT_BOOST)),
    Math.min(255, Math.round(avg + (g - avg) * SAT_BOOST)),
    Math.min(255, Math.round(avg + (b - avg) * SAT_BOOST)),
  ];
}

export function AsciiPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouse  = useRef({ x: -1, y: -1 });
  const curR   = useRef(0);
  const targetR = useRef(0);
  const portrait = useRef<PortraitCell[]>([]);
  const cols = useRef(0);
  const rows = useRef(0);
  const offX = useRef(0); // offset where portrait starts (centered)
  const offY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    const img = new Image();
    img.src = specialistImg;

    const buildPortrait = () => {
      const CW = canvas.width;
      const CH = canvas.height;
      if (CW < 4 || CH < 4) return;

      // Render photo contained + centered into offscreen canvas
      const off = document.createElement("canvas");
      const iA = img.naturalWidth / img.naturalHeight;
      const cA = CW / CH;
      let dw = CW, dh = CH, dx = 0, dy = 0;
      if (iA > cA) { dh = CW / iA; dy = (CH - dh) / 2; }
      else          { dw = CH * iA; dx = (CW - dw) / 2; }
      off.width  = Math.round(dw);
      off.height = Math.round(dh);
      offX.current = Math.round(dx);
      offY.current = Math.round(dy);

      const octx = off.getContext("2d")!;
      octx.drawImage(img, 0, 0, off.width, off.height);
      const { data } = octx.getImageData(0, 0, off.width, off.height);

      const nc = Math.ceil(off.width  / CELL);
      const nr = Math.ceil(off.height / CELL);
      cols.current = nc;
      rows.current = nr;

      const list: PortraitCell[] = [];
      for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
          const px = Math.min(Math.floor(c * CELL + CELL / 2), off.width  - 1);
          const py = Math.min(Math.floor(r * CELL + CELL / 2), off.height - 1);
          const i  = (py * off.width + px) * 4;
          const [rr, gg, bb, aa] = [data[i], data[i+1], data[i+2], data[i+3]];
          const brightness = (rr * 0.299 + gg * 0.587 + bb * 0.114) / 255;
          list.push({ r: rr, g: gg, b: bb, brightness, alpha: aa });
        }
      }
      portrait.current = list;
    };

    const resize = () => {
      canvas.width  = container.offsetWidth;
      canvas.height = container.offsetHeight;
      if (img.complete && img.naturalWidth > 0) buildPortrait();
    };

    img.onload = () => resize();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      targetR.current = REVEAL_RADIUS;
    };
    const onLeave = () => { targetR.current = 0; };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      curR.current = lerp(curR.current, targetR.current, LERP);

      // Clear
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      // ── Background: solid near-black
      ctx.fillStyle = "rgb(5, 3, 12)";
      ctx.fillRect(0, 0, W, H);

      // ── Background dot grid (very faint, covers whole canvas)
      ctx.font = `${CELL - 1}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(255,255,255,0.045)";
      const bgCols = Math.ceil(W / BGSTEP);
      const bgRows = Math.ceil(H / BGSTEP);
      for (let r = 0; r < bgRows; r++) {
        for (let c = 0; c < bgCols; c++) {
          ctx.fillText(BGDOT, c * BGSTEP, r * BGSTEP);
        }
      }

      // ── Portrait dots (colored, sampled from photo)
      const cells = portrait.current;
      if (cells.length) {
        const nc  = cols.current;
        const nr  = rows.current;
        const ox  = offX.current;
        const oy  = offY.current;
        ctx.font = `${CELL}px "Geist Mono", ui-monospace, monospace`;

        for (let row = 0; row < nr; row++) {
          for (let col = 0; col < nc; col++) {
            const cell = cells[row * nc + col];
            if (!cell) continue;
            if (cell.alpha < MIN_A || cell.brightness < MIN_B) continue;

            const [br, bg, bb] = boostColor(cell.r, cell.g, cell.b);
            // Alpha: low brightness = more transparent dot
            const dotAlpha = Math.min(1, 0.25 + cell.brightness * 0.9);
            ctx.fillStyle = `rgba(${br},${bg},${bb},${dotAlpha.toFixed(3)})`;
            ctx.fillText(DOT, ox + col * CELL, oy + row * CELL);
          }
        }
      }

      // ── Spotlight reveal: punch hole to show photo beneath
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const radius = curR.current;
      if (mx >= 0 && radius > 0.5) {
        ctx.globalCompositeOperation = "destination-out";
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, radius);
        grad.addColorStop(0,    "rgba(0,0,0,1)");
        grad.addColorStop(0.5,  "rgba(0,0,0,0.92)");
        grad.addColorStop(0.82, "rgba(0,0,0,0.45)");
        grad.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(mx - radius, my - radius, radius * 2, radius * 2);
        ctx.globalCompositeOperation = "source-over";
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden"
      style={{ cursor: "crosshair" }}
    >
      {/* Real photo — hidden under canvas, revealed by mouse spotlight */}
      <img
        src={specialistImg}
        alt="Luís Guedes"
        className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none"
        draggable={false}
      />
      {/* Canvas — renders colored dot portrait + handles reveal */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      />
    </div>
  );
}
