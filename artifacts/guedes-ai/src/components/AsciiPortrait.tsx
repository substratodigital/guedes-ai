import { useEffect, useRef } from "react";
import specialistImg from "@assets/Especialista-hero_1777780763963.webp";

// ── Palette (matching efecto.app ink preset)
const BG_COLOR   = "#0c0b1a"; // deep navy
const DOT_COLOR  = "#f0e8d2"; // warm cream

// ── Grid
const CELL        = 8;    // px per halftone cell
const DOT_SCALE   = 0.92; // max dot radius as fraction of CELL/2
const MIN_BRIGHT  = 0.055; // skip very dark pixels (near-black photo bg)
const MIN_ALPHA   = 12;    // skip transparent pixels

// ── Mouse interaction
const MOUSE_RADIUS = 85;
const MOUSE_BOOST  = 0.35; // extra radius fraction near cursor
const LERP_SPD     = 0.1;

// ── Grain texture
const GRAIN_DENSITY = 0.022; // fraction of canvas pixels with grain
const GRAIN_ALPHA   = "0.038";

interface HCell { brightness: number; hasContent: boolean }

export function AsciiPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouse   = useRef({ x: -1, y: -1 });
  const smoothM = useRef({ x: -1, y: -1 });
  const cells   = useRef<HCell[]>([]);
  const cols    = useRef(0);
  const rows    = useRef(0);
  const offX    = useRef(0);
  const offY    = useRef(0);
  const grain   = useRef<[number, number][]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    const img = new Image();
    img.src = specialistImg;

    const buildData = () => {
      const CW = canvas.width;
      const CH = canvas.height;
      if (CW < 4 || CH < 4) return;

      // ── Build halftone cell data
      const iA = img.naturalWidth / img.naturalHeight;
      const cA = CW / CH;
      let dw = CW, dh = CH, dx = 0, dy = 0;
      if (iA > cA) { dh = CW / iA; dy = (CH - dh) / 2; }
      else          { dw = CH * iA; dx = (CW - dw) / 2; }

      const off = document.createElement("canvas");
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

      const list: HCell[] = [];
      for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
          const px = Math.min(Math.floor(c * CELL + CELL / 2), off.width  - 1);
          const py = Math.min(Math.floor(r * CELL + CELL / 2), off.height - 1);
          const i  = (py * off.width + px) * 4;
          const aa = data[i + 3];
          if (aa < MIN_ALPHA) { list.push({ brightness: 0, hasContent: false }); continue; }
          const brightness = (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114) / 255;
          list.push({ brightness, hasContent: brightness > MIN_BRIGHT });
        }
      }
      cells.current = list;

      // ── Pre-generate grain positions
      const count = Math.floor(CW * CH * GRAIN_DENSITY);
      const pts: [number, number][] = [];
      for (let i = 0; i < count; i++) {
        pts.push([Math.random() * CW | 0, Math.random() * CH | 0]);
      }
      grain.current = pts;
    };

    const resize = () => {
      canvas.width  = container.offsetWidth;
      canvas.height = container.offsetHeight;
      if (img.complete && img.naturalWidth > 0) buildData();
    };

    img.onload = () => resize();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -1, y: -1 }; };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Smooth mouse
      const tx = mouse.current.x;
      const ty = mouse.current.y;
      if (tx < 0) {
        smoothM.current = { x: -1, y: -1 };
      } else {
        smoothM.current.x = smoothM.current.x < 0 ? tx : lerp(smoothM.current.x, tx, LERP_SPD);
        smoothM.current.y = smoothM.current.y < 0 ? ty : lerp(smoothM.current.y, ty, LERP_SPD);
      }

      // ── Background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, W, H);

      // ── Halftone dots
      const list  = cells.current;
      const nc    = cols.current;
      const nr    = rows.current;
      const ox    = offX.current;
      const oy    = offY.current;
      const mx    = smoothM.current.x;
      const my    = smoothM.current.y;
      const hasM  = mx >= 0;
      const maxR  = (CELL / 2) * DOT_SCALE;

      ctx.fillStyle = DOT_COLOR;
      for (let row = 0; row < nr; row++) {
        for (let col = 0; col < nc; col++) {
          const cell = list[row * nc + col];
          if (!cell?.hasContent) continue;

          const cx = ox + col * CELL + CELL / 2;
          const cy = oy + row * CELL + CELL / 2;

          // Mouse boost: dots near cursor grow slightly
          let boost = 0;
          if (hasM) {
            const dx = cx - mx;
            const dy = cy - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS) {
              boost = MOUSE_BOOST * (1 - dist / MOUSE_RADIUS);
              boost *= boost; // quadratic ease
            }
          }

          const r = cell.brightness * maxR * (1 + boost);
          if (r < 0.3) continue;

          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Grain texture
      ctx.fillStyle = `rgba(240,232,210,${GRAIN_ALPHA})`;
      for (const [x, y] of grain.current) {
        ctx.fillRect(x, y, 1, 1);
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
      style={{ cursor: "crosshair", background: BG_COLOR }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      />
    </div>
  );
}
