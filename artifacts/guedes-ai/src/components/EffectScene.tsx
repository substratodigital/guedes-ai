import { useEffect, useRef } from "react";
import heroImg from "@assets/guedes_ai_hero_1777783220518.webp";

// ── Parameters (mirrors the efecto.app shader uniforms)
const CELL          = 8;    // pixels per ASCII cell
const BRIGHT_ADJ    = 0.08;
const CONTRAST_ADJ  = 1.15;
const NOISE_INT     = 0.045;
const VIGNETTE_INT  = 0.6;
const VIGNETTE_RAD  = 1.3;
const MOUSE_RADIUS  = 190;
const MOUSE_INT     = 0.55;

// ── Exact translation of the efecto.app fragment shader getChar(style=0)
function charVal(brightness: number, lx: number, ly: number): number {
  const gx = Math.floor(lx * 4); // 0-3 sub-grid x
  const gy = Math.floor(ly * 4); // 0-3 sub-grid y
  if      (brightness < 0.20) return (gx === 1 && gy === 1) ? 0.3 : 0.0;
  else if (brightness < 0.35) return (gx === 1 || gx === 2) && (gy === 1 || gy === 2) ? 1.0 : 0.0;
  else if (brightness < 0.50) return (gy === 1 || gy === 2) ? 1.0 : 0.0;
  else if (brightness < 0.65) return (gy === 0 || gy === 3) ? 1.0 : (gy === 1 || gy === 2) ? 0.5 : 0.0;
  else if (brightness < 0.80) return (gx === 0 || gx === 2 || gy === 0 || gy === 2) ? 1.0 : 0.3;
  else                         return 1.0;
}

interface CellSample { r: number; g: number; b: number; lum: number }

export function EffectScene() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -1, y: -1 });
  const staticRef = useRef<ImageData | null>(null);
  const ready     = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    const img = new Image();
    img.src = heroImg;

    // ── Pre-build the static ASCII ImageData (runs once per resize)
    const buildStatic = () => {
      const W = canvas.width;
      const H = canvas.height;
      if (W < 4 || H < 4) return;

      // Render source image → offscreen (cover)
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const octx = off.getContext("2d")!;
      const iA = img.naturalWidth / img.naturalHeight;
      const cA = W / H;
      let dw = W, dh = H, dx = 0, dy = 0;
      if (iA > cA) { dw = H * iA; dx = (W - dw) / 2; }
      else          { dh = W / iA; dy = (H - dh) / 2; }
      octx.drawImage(img, dx, dy, dw, dh);
      const src = octx.getImageData(0, 0, W, H).data;

      // Build cell lookup table
      const nc = Math.ceil(W / CELL);
      const nr = Math.ceil(H / CELL);
      const cells: CellSample[] = new Array(nc * nr);
      for (let cy = 0; cy < nr; cy++) {
        for (let cx = 0; cx < nc; cx++) {
          const px = Math.min((cx * CELL + CELL / 2) | 0, W - 1);
          const py = Math.min((cy * CELL + CELL / 2) | 0, H - 1);
          const i  = (py * W + px) * 4;
          // Apply brightness + contrast (mirroring the shader)
          let r = (src[i]   / 255 - 0.5) * CONTRAST_ADJ + 0.5 + BRIGHT_ADJ;
          let g = (src[i+1] / 255 - 0.5) * CONTRAST_ADJ + 0.5 + BRIGHT_ADJ;
          let b = (src[i+2] / 255 - 0.5) * CONTRAST_ADJ + 0.5 + BRIGHT_ADJ;
          r = Math.max(0, Math.min(1, r));
          g = Math.max(0, Math.min(1, g));
          b = Math.max(0, Math.min(1, b));
          const lum = r * 0.299 + g * 0.587 + b * 0.114;
          cells[cy * nc + cx] = { r, g, b, lum };
        }
      }

      // Rasterise every pixel
      const out  = ctx.createImageData(W, H);
      const data = out.data;

      for (let py = 0; py < H; py++) {
        const uvy = (py / H) * 2 - 1;
        for (let px = 0; px < W; px++) {
          const cx   = Math.min((px / CELL) | 0, nc - 1);
          const cy   = Math.min((py / CELL) | 0, nr - 1);
          const cell = cells[cy * nc + cx];

          const lx  = (px % CELL) / CELL;
          const ly  = (py % CELL) / CELL;
          const cv  = charVal(cell.lum, lx, ly);

          // Noise
          const n = (Math.random() - 0.5) * NOISE_INT;

          // Vignette (matches shader: 1 - dot(centered,centered) / vignetteRadius)
          const uvx  = (px / W) * 2 - 1;
          const d2   = uvx * uvx + uvy * uvy;
          const vig  = Math.max(0, 1 - d2 / VIGNETTE_RAD);
          const vf   = 1 - VIGNETTE_INT + VIGNETTE_INT * vig;

          const i = (py * W + px) * 4;
          data[i]   = Math.max(0, Math.min(255, (cell.r * cv + n) * vf * 255));
          data[i+1] = Math.max(0, Math.min(255, (cell.g * cv + n) * vf * 255));
          data[i+2] = Math.max(0, Math.min(255, (cell.b * cv + n) * vf * 255));
          data[i+3] = 255;
        }
      }

      staticRef.current = out;
      ready.current = true;
    };

    const resize = () => {
      ready.current = false;
      canvas.width  = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
      if (img.complete && img.naturalWidth > 0) buildStatic();
    };

    img.onload = () => resize();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onMove  = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -1, y: -1 }; };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    const draw = () => {
      if (ready.current && staticRef.current) {
        ctx.putImageData(staticRef.current, 0, 0);

        // Mouse glow (screen blend — no per-pixel loop)
        const { x: mx, y: my } = mouse.current;
        if (mx >= 0) {
          ctx.globalCompositeOperation = "screen";
          const g = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS);
          g.addColorStop(0,   `rgba(180,210,255,${MOUSE_INT})`);
          g.addColorStop(0.5, `rgba(100,140,255,${MOUSE_INT * 0.4})`);
          g.addColorStop(1,   "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalCompositeOperation = "source-over";
        }
      } else if (!ready.current) {
        // Background while building
        ctx.fillStyle = "#080614";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "#080614" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      />
    </div>
  );
}
