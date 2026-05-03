import { useEffect, useRef } from "react";
import specialistImg from "@assets/Especialista-hero_1777780763963.webp";

// Ordered light → dense (high brightness = light char)
const CHARS = " ··::!!||IAIA01φψαβλ∇∑ωΩ∈∀∃##@@";
const CELL = 7;
const MASK_ALPHA = 0.93;   // canvas darkness — photo is hidden beneath
const MAX_RADIUS = 100;    // spotlight radius px
const LERP_SPEED = 0.11;

interface Cell { ch: string; brightness: number }

export function AsciiPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1, y: -1 });
  const curR = useRef(0);
  const targetR = useRef(0);
  const cellsRef = useRef<Cell[]>([]);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);

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
      if (W < 4 || H < 4) return;

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d")!;

      // Contain the image (same framing as the CSS img tag)
      const iA = img.naturalWidth / img.naturalHeight;
      const cA = W / H;
      let dw = W, dh = H, dx = 0, dy = 0;
      if (iA > cA) { dh = W / iA; dy = (H - dh) / 2; }
      else          { dw = H * iA; dx = (W - dw) / 2; }
      octx.drawImage(img, dx, dy, dw, dh);

      const { data } = octx.getImageData(0, 0, W, H);
      const cols = Math.ceil(W / CELL);
      const rows = Math.ceil(H / CELL);
      colsRef.current = cols;
      rowsRef.current = rows;

      const list: Cell[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = Math.min(Math.floor(c * CELL + CELL / 2), W - 1);
          const py = Math.min(Math.floor(r * CELL + CELL / 2), H - 1);
          const i = (py * W + px) * 4;
          const a = data[i + 3];
          if (a < 10) { list.push({ ch: " ", brightness: 0 }); continue; }
          const brightness = (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114) / 255;
          const ci = Math.min(CHARS.length - 1, Math.floor((1 - brightness) * CHARS.length));
          list.push({ ch: CHARS[ci], brightness });
        }
      }
      cellsRef.current = list;
    };

    const resize = () => {
      canvas.width  = container.offsetWidth;
      canvas.height = container.offsetHeight;
      if (img.complete && img.naturalWidth > 0) buildCells();
    };

    img.onload = () => resize();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      targetR.current = MAX_RADIUS;
    };
    const onLeave = () => { targetR.current = 0; };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = () => {
      const list = cellsRef.current;
      const W = canvas.width;
      const H = canvas.height;

      curR.current = lerp(curR.current, targetR.current, LERP_SPEED);

      // Reset frame
      ctx.clearRect(0, 0, W, H);

      // ── Layer 1: near-black mask (hides photo)
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(6, 4, 16, ${MASK_ALPHA})`;
      ctx.fillRect(0, 0, W, H);

      // ── Layer 2: ASCII texture drawn on top of mask
      if (list.length) {
        const cols = colsRef.current;
        const rows = rowsRef.current;
        ctx.font = `${CELL}px "Geist Mono", ui-monospace, monospace`;
        ctx.textBaseline = "top";

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cell = list[r * cols + c];
            if (!cell || cell.ch === " ") continue;
            // Dim violet — visible against dark bg but not distracting
            const a = 0.15 + cell.brightness * 0.3;
            ctx.fillStyle = `rgba(160,130,255,${a.toFixed(3)})`;
            ctx.fillText(cell.ch, c * CELL, r * CELL);
          }
        }
      }

      // ── Layer 3: destination-out spotlight (erases mask → reveals photo)
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const radius = curR.current;

      if (mx >= 0 && radius > 0.5) {
        ctx.globalCompositeOperation = "destination-out";
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, radius);
        grad.addColorStop(0,    "rgba(0,0,0,1)");    // fully erased → photo visible
        grad.addColorStop(0.55, "rgba(0,0,0,0.9)");
        grad.addColorStop(0.85, "rgba(0,0,0,0.4)");
        grad.addColorStop(1,    "rgba(0,0,0,0)");    // mask intact
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
      {/* Photo — fully visible underneath, revealed by spotlight */}
      <img
        src={specialistImg}
        alt="Luís Guedes"
        className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none"
        draggable={false}
      />
      {/* Canvas mask + ASCII layer on top */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      />
    </div>
  );
}
