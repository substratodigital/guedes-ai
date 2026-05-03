import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import { EffectComposer } from "@react-three/postprocessing"
import { Vector2 } from "three"
import { AsciiEffect } from "./AsciiEffect"
import heroImg from "@assets/guedes_ai_hero_1777783220518.webp"

// ─────────────────────────────────────────────────────────────────────────────
// WebGL detection
// ─────────────────────────────────────────────────────────────────────────────
function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas")
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    )
  } catch {
    return false
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// THREE.js scene (uses WebGL — runs in production / real browsers)
// ─────────────────────────────────────────────────────────────────────────────
const mouseNorm = { x: 0, y: 0 }

function R3FScene({
  resolution,
  mousePixels,
}: {
  resolution: Vector2
  mousePixels: Vector2
}) {
  const texture = useTexture("/hero.webp")
  const { camera } = useThree()

  useFrame(() => {
    camera.position.x += (mouseNorm.x * 0.35 - camera.position.x) * 0.05
    camera.position.y += (mouseNorm.y * 0.22 - camera.position.y) * 0.05
  })

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <EffectComposer>
        <AsciiEffect
          style="standard"
          cellSize={4}
          invert={false}
          color={true}
          resolution={resolution}
          mousePos={mousePixels}
          postfx={{
            aberrationStrength: 0.0008,
            brightnessAdjust:   -0.03,
            contrastAdjust:     1.07,
            mouseGlowEnabled:   false,
            mouseGlowRadius:    0,
            mouseGlowIntensity: 0,
            vignetteIntensity:  0.55,
            vignetteRadius:     0.85,
            noiseIntensity:     0.04,
            noiseScale:         90,
            noiseSpeed:         0.5,
            scanlineIntensity:  0,
            jitterIntensity:    0,
            glitchIntensity:    0,
            waveAmplitude:      0,
            curvature:          0,
            colorPalette:       0,
          }}
        />
      </EffectComposer>
    </>
  )
}

function ThreeScene() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [mousePixels, setMousePixels] = useState(new Vector2(0, 0))
  const [resolution,  setResolution]  = useState(new Vector2(1280, 720))

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      setResolution(new Vector2(r.width, r.height))
    }
    update()
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = e.clientX - r.left
      const py = e.clientY - r.top
      setMousePixels(new Vector2(px, r.height - py))
      mouseNorm.x =  (px / r.width)  * 2 - 1
      mouseNorm.y = -((py / r.height) * 2 - 1)
    }
    window.addEventListener("resize", update)
    el.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("resize", update)
      el.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0 w-full h-full" style={{ background: "#000" }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        style={{ background: "#000" }}
      >
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <R3FScene resolution={resolution} mousePixels={mousePixels} />
        </Suspense>
      </Canvas>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Canvas 2D fallback (CPU rasteriser — mirrors the GLSL shader logic)
// Used in environments without WebGL (Replit sandbox preview)
// ─────────────────────────────────────────────────────────────────────────────
const CELL        = 6
const BRIGHT_ADJ  = -0.03
const CONT_ADJ    = 1.07
const VIG_INT     = 0.55
const VIG_RAD     = 0.85
const MOUSE_R     = 210
const MOUSE_I     = 0.55
const PARALLAX    = 0.075  // fraction of canvas size to shift (±7.5%)

function charVal(lum: number, lx: number, ly: number): number {
  const gx = Math.floor(lx * 4)
  const gy = Math.floor(ly * 4)
  if      (lum < 0.20) return (gx === 1 && gy === 1) ? 0.3 : 0.0
  else if (lum < 0.35) return (gx === 1 || gx === 2) && (gy === 1 || gy === 2) ? 1.0 : 0.0
  else if (lum < 0.50) return (gy === 1 || gy === 2) ? 1.0 : 0.0
  else if (lum < 0.65) return (gy === 0 || gy === 3) ? 1.0 : (gy === 1 || gy === 2) ? 0.5 : 0.0
  else if (lum < 0.80) return (gx === 0 || gx === 2 || gy === 0 || gy === 2) ? 1.0 : 0.3
  else                 return 1.0
}

function Canvas2DScene() {
  const wrapRef       = useRef<HTMLDivElement>(null)
  const displayRef    = useRef<HTMLCanvasElement>(null)
  const glowRef       = useRef<HTMLCanvasElement>(null)
  // static ASCII baked onto an oversized canvas (for parallax viewport)
  const staticCvs     = useRef<HTMLCanvasElement | null>(null)
  const noiseRef      = useRef<HTMLCanvasElement | null>(null)
  const mx            = useRef({ x: -1, y: -1 })     // pixel coords
  const norm          = useRef({ x: 0, y: 0 })        // -1..1
  const ready         = useRef(false)

  useEffect(() => {
    const wrap    = wrapRef.current
    const display = displayRef.current
    const glow    = glowRef.current
    if (!wrap || !display || !glow) return

    const dCtx = display.getContext("2d", { alpha: false })!
    const gCtx = glow.getContext("2d")!
    let animId: number

    // ── Build a tiny 64×64 noise canvas (fast, regenerated each frame)
    const noiseCvs = document.createElement("canvas")
    noiseCvs.width = noiseCvs.height = 64
    noiseRef.current = noiseCvs
    const buildNoise = () => {
      const nCtx = noiseCvs.getContext("2d")!
      const d    = nCtx.createImageData(64, 64)
      for (let i = 0; i < 64 * 64 * 4; i += 4) {
        const v  = Math.random() * 35
        d.data[i]   = d.data[i + 1] = d.data[i + 2] = v
        d.data[i+3] = 18
      }
      nCtx.putImageData(d, 0, 0)
    }

    // ── Build oversized static ASCII (1 + 2*PARALLAX) larger than display
    const buildStatic = (W: number, H: number) => {
      ready.current = false
      const sW = Math.ceil(W * (1 + 2 * PARALLAX))
      const sH = Math.ceil(H * (1 + 2 * PARALLAX))

      const src = document.createElement("canvas")
      src.width = sW; src.height = sH
      const sCtx = src.getContext("2d")!

      const img = new Image()
      img.src = heroImg
      const render = () => {
        const iA = img.naturalWidth / img.naturalHeight
        const cA = sW / sH
        let dw = sW, dh = sH, dx = 0, dy = 0
        if (iA > cA) { dw = sH * iA; dx = (sW - dw) / 2 }
        else          { dh = sW / iA; dy = (sH - dh) / 2 }
        sCtx.drawImage(img, dx, dy, dw, dh)
        const raw = sCtx.getImageData(0, 0, sW, sH).data

        const nc = Math.ceil(sW / CELL)
        const nr = Math.ceil(sH / CELL)
        type Cell = { r: number; g: number; b: number; lum: number }
        const cells: Cell[] = new Array(nc * nr)
        for (let cy = 0; cy < nr; cy++) {
          for (let cx = 0; cx < nc; cx++) {
            const px = Math.min((cx * CELL + CELL / 2) | 0, sW - 1)
            const py = Math.min((cy * CELL + CELL / 2) | 0, sH - 1)
            const i  = (py * sW + px) * 4
            let r = (raw[i]   / 255 - 0.5) * CONT_ADJ + 0.5 + BRIGHT_ADJ
            let g = (raw[i+1] / 255 - 0.5) * CONT_ADJ + 0.5 + BRIGHT_ADJ
            let b = (raw[i+2] / 255 - 0.5) * CONT_ADJ + 0.5 + BRIGHT_ADJ
            r = Math.max(0, Math.min(1, r))
            g = Math.max(0, Math.min(1, g))
            b = Math.max(0, Math.min(1, b))
            cells[cy * nc + cx] = { r, g, b, lum: r * 0.299 + g * 0.587 + b * 0.114 }
          }
        }

        const out  = new ImageData(sW, sH)
        const data = out.data
        for (let py = 0; py < sH; py++) {
          const uvy = (py / sH) * 2 - 1
          for (let px = 0; px < sW; px++) {
            const cx   = Math.min((px / CELL) | 0, nc - 1)
            const cy   = Math.min((py / CELL) | 0, nr - 1)
            const cell = cells[cy * nc + cx]
            const cv   = charVal(cell.lum, (px % CELL) / CELL, (py % CELL) / CELL)
            const uvx  = (px / sW) * 2 - 1
            const d2   = uvx * uvx + uvy * uvy
            const vig  = Math.max(0, 1 - d2 / VIG_RAD)
            const vf   = 1 - VIG_INT + VIG_INT * vig
            const i    = (py * sW + px) * 4
            data[i]   = Math.max(0, Math.min(255, cell.r * cv * vf * 255))
            data[i+1] = Math.max(0, Math.min(255, cell.g * cv * vf * 255))
            data[i+2] = Math.max(0, Math.min(255, cell.b * cv * vf * 255))
            data[i+3] = 255
          }
        }

        const out2 = document.createElement("canvas")
        out2.width = sW; out2.height = sH
        out2.getContext("2d")!.putImageData(out, 0, 0)
        staticCvs.current = out2
        ready.current = true
      }
      img.complete && img.naturalWidth > 0 ? render() : (img.onload = render)
    }

    const resize = () => {
      const W = wrap.offsetWidth
      const H = wrap.offsetHeight
      display.width = W; display.height = H
      glow.width = W;    glow.height = H
      buildStatic(W, H)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect()
      mx.current = { x: e.clientX - r.left, y: e.clientY - r.top }
      norm.current = {
        x:  (mx.current.x / r.width)  * 2 - 1,
        y: -((mx.current.y / r.height) * 2 - 1),
      }
    }
    const onLeave = () => { mx.current = { x: -1, y: -1 }; norm.current = { x: 0, y: 0 } }
    wrap.addEventListener("mousemove", onMove)
    wrap.addEventListener("mouseleave", onLeave)

    const draw = () => {
      const W = display.width
      const H = display.height
      if (ready.current && staticCvs.current) {
        const s   = staticCvs.current
        const sW  = s.width
        const sH  = s.height
        const ox  = (sW - W) * 0.5 + norm.current.x * (sW - W) * 0.5
        const oy  = (sH - H) * 0.5 - norm.current.y * (sH - H) * 0.5
        // Draw ASCII with parallax offset
        dCtx.drawImage(s, ox, oy, W, H, 0, 0, W, H)

        // Mouse glow disabled
        gCtx.clearRect(0, 0, W, H)
      } else {
        dCtx.fillStyle = "#080614"
        dCtx.fillRect(0, 0, W, H)
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      wrap.removeEventListener("mousemove", onMove)
      wrap.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0 w-full h-full" style={{ background: "#080614" }}>
      <canvas ref={displayRef} className="absolute inset-0 w-full h-full" aria-hidden />
      <canvas ref={glowRef}    className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Public export — auto-selects renderer
// ─────────────────────────────────────────────────────────────────────────────
export function EffectScene() {
  const [useWebGL, setUseWebGL] = useState<boolean | null>(null)

  useEffect(() => {
    setUseWebGL(supportsWebGL())
  }, [])

  if (useWebGL === null) {
    // SSR / first paint — dark background while detecting
    return <div className="absolute inset-0 w-full h-full" style={{ background: "#080614" }} />
  }

  return useWebGL ? <ThreeScene /> : <Canvas2DScene />
}
