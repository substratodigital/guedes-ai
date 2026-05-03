import { forwardRef, useMemo } from "react"
import { Effect, BlendFunction } from "postprocessing"
import { Uniform, Vector2 } from "three"

const fragmentShader = `
uniform float cellSize;
uniform bool invert;
uniform bool colorMode;
uniform int asciiStyle;
uniform float time;
uniform vec2 resolution;
uniform vec2 mousePos;
uniform float scanlineIntensity;
uniform float scanlineCount;
uniform float targetFPS;
uniform float jitterIntensity;
uniform float jitterSpeed;
uniform bool mouseGlowEnabled;
uniform float mouseGlowRadius;
uniform float mouseGlowIntensity;
uniform float vignetteIntensity;
uniform float vignetteRadius;
uniform int colorPalette;
uniform float curvature;
uniform float aberrationStrength;
uniform float noiseIntensity;
uniform float noiseScale;
uniform float noiseSpeed;
uniform float waveAmplitude;
uniform float waveFrequency;
uniform float waveSpeed;
uniform float glitchIntensity;
uniform float glitchFrequency;
uniform float brightnessAdjust;
uniform float contrastAdjust;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec3 applyColorPalette(vec3 color, int palette) {
  if (palette == 1) {
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(0.1, lum * 0.9, 0.1);
  } else if (palette == 2) {
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(lum * 1.0, lum * 0.6, lum * 0.2);
  } else if (palette == 3) {
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(0.0, lum * 0.8, lum);
  } else if (palette == 4) {
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(0.1, 0.2, lum);
  }
  return color;
}

float getChar(float brightness, vec2 p, int style) {
  vec2 grid = floor(p * 4.0);
  float val = 0.0;
  if (style == 0) {
    if (brightness < 0.2)       val = (grid.x == 1.0 && grid.y == 1.0) ? 0.3 : 0.0;
    else if (brightness < 0.35) val = (grid.x == 1.0 || grid.x == 2.0) && (grid.y == 1.0 || grid.y == 2.0) ? 1.0 : 0.0;
    else if (brightness < 0.5)  val = (grid.y == 1.0 || grid.y == 2.0) ? 1.0 : 0.0;
    else if (brightness < 0.65) val = (grid.y == 0.0 || grid.y == 3.0) ? 1.0 : (grid.y == 1.0 || grid.y == 2.0) ? 0.5 : 0.0;
    else if (brightness < 0.8)  val = (grid.x == 0.0 || grid.x == 2.0 || grid.y == 0.0 || grid.y == 2.0) ? 1.0 : 0.3;
    else                         val = 1.0;
  }
  return val;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 workUV = uv;

  if (curvature > 0.0) {
    vec2 centered = workUV * 2.0 - 1.0;
    centered *= 1.0 + curvature * dot(centered, centered);
    workUV = centered * 0.5 + 0.5;
    if (workUV.x < 0.0 || workUV.x > 1.0 || workUV.y < 0.0 || workUV.y > 1.0) {
      outputColor = vec4(0.0);
      return;
    }
  }

  if (waveAmplitude > 0.0) {
    workUV.x += sin(workUV.y * waveFrequency + time * waveSpeed) * waveAmplitude;
    workUV.y += cos(workUV.x * waveFrequency + time * waveSpeed) * waveAmplitude;
  }

  vec4 sampledColor;
  if (aberrationStrength > 0.0) {
    float offset = aberrationStrength;
    sampledColor = vec4(
      texture(inputBuffer, workUV + vec2(offset, 0.0)).r,
      texture(inputBuffer, workUV).g,
      texture(inputBuffer, workUV - vec2(offset, 0.0)).b,
      1.0
    );
  } else {
    sampledColor = texture(inputBuffer, workUV);
  }

  sampledColor.rgb = (sampledColor.rgb - 0.5) * contrastAdjust + 0.5 + brightnessAdjust;

  if (noiseIntensity > 0.0) {
    float noiseVal = noise(workUV * noiseScale + time * noiseSpeed);
    sampledColor.rgb += (noiseVal - 0.5) * noiseIntensity;
  }

  vec2 cellCount = resolution / cellSize;
  vec2 cellCoord = floor(uv * cellCount);

  if (jitterIntensity > 0.0) {
    float jt = time * jitterSpeed;
    cellCoord += vec2(
      (random(vec2(cellCoord.y, floor(jt)))         - 0.5) * jitterIntensity * 2.0,
      (random(vec2(cellCoord.x, floor(jt + 1000.0))) - 0.5) * jitterIntensity * 2.0
    );
  }

  if (glitchIntensity > 0.0 && glitchFrequency > 0.0) {
    float gt = floor(time * glitchFrequency);
    if (random(vec2(gt, cellCoord.y)) < glitchIntensity) {
      cellCoord.x += (random(vec2(gt + 1.0, cellCoord.y)) - 0.5) * 20.0;
    }
  }

  vec2 cellUV   = (cellCoord + 0.5) / cellCount;
  vec4 cellColor = texture(inputBuffer, cellUV);
  float brightness = dot(cellColor.rgb, vec3(0.299, 0.587, 0.114));
  if (invert) brightness = 1.0 - brightness;

  vec2 localUV   = fract(uv * cellCount);
  float charValue = getChar(brightness, localUV, asciiStyle);

  vec3 finalColor = colorMode ? cellColor.rgb * charValue : vec3(brightness * charValue);
  finalColor = applyColorPalette(finalColor, colorPalette);

  if (mouseGlowEnabled) {
    float dist = length(uv * resolution - mousePos);
    finalColor += exp(-dist / mouseGlowRadius) * mouseGlowIntensity;
  }

  if (scanlineIntensity > 0.0) {
    float scanline = sin(uv.y * scanlineCount * 3.14159) * 0.5 + 0.5;
    finalColor *= 1.0 - scanline * scanlineIntensity;
  }

  if (vignetteIntensity > 0.0) {
    vec2 centered = uv * 2.0 - 1.0;
    float vignette = 1.0 - dot(centered, centered) / vignetteRadius;
    finalColor *= mix(1.0, vignette, vignetteIntensity);
  }

  outputColor = vec4(finalColor, cellColor.a);
}
`

// Module-level state (matches the efecto.app export pattern)
let _time = 0
let _deltaAccumulator = 0
let _cellSize = 4
let _invert = false
let _colorMode = true
let _asciiStyle = 0
let _resolution = new Vector2(1920, 1080)
let _mousePos = new Vector2(0, 0)

interface PostFXOptions {
  scanlineIntensity?: number
  scanlineCount?: number
  targetFPS?: number
  jitterIntensity?: number
  jitterSpeed?: number
  mouseGlowEnabled?: boolean
  mouseGlowRadius?: number
  mouseGlowIntensity?: number
  vignetteIntensity?: number
  vignetteRadius?: number
  colorPalette?: number
  curvature?: number
  aberrationStrength?: number
  noiseIntensity?: number
  noiseScale?: number
  noiseSpeed?: number
  waveAmplitude?: number
  waveFrequency?: number
  waveSpeed?: number
  glitchIntensity?: number
  glitchFrequency?: number
  brightnessAdjust?: number
  contrastAdjust?: number
}

interface AsciiEffectOptions {
  cellSize?: number
  invert?: boolean
  color?: boolean
  style?: number
  resolution?: Vector2
  mousePos?: Vector2
  postfx?: PostFXOptions
}

class AsciiEffectImpl extends Effect {
  constructor(options: AsciiEffectOptions = {}) {
    const {
      cellSize = 4,
      invert = false,
      color = true,
      style = 0,
      resolution = new Vector2(1920, 1080),
      mousePos = new Vector2(0, 0),
      postfx = {},
    } = options

    const u = (v: unknown) => new Uniform(v)
    super("AsciiEffect", fragmentShader, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map([
        ["cellSize",           u(cellSize)],
        ["invert",             u(invert)],
        ["colorMode",          u(color)],
        ["asciiStyle",         u(style)],
        ["time",               u(0)],
        ["resolution",         u(resolution)],
        ["mousePos",           u(mousePos)],
        ["scanlineIntensity",  u(postfx.scanlineIntensity  ?? 0)],
        ["scanlineCount",      u(postfx.scanlineCount      ?? 200)],
        ["targetFPS",          u(postfx.targetFPS          ?? 0)],
        ["jitterIntensity",    u(postfx.jitterIntensity    ?? 0)],
        ["jitterSpeed",        u(postfx.jitterSpeed        ?? 1)],
        ["mouseGlowEnabled",   u(postfx.mouseGlowEnabled   ?? false)],
        ["mouseGlowRadius",    u(postfx.mouseGlowRadius    ?? 200)],
        ["mouseGlowIntensity", u(postfx.mouseGlowIntensity ?? 1.5)],
        ["vignetteIntensity",  u(postfx.vignetteIntensity  ?? 0)],
        ["vignetteRadius",     u(postfx.vignetteRadius     ?? 0.8)],
        ["colorPalette",       u(postfx.colorPalette       ?? 0)],
        ["curvature",          u(postfx.curvature          ?? 0)],
        ["aberrationStrength", u(postfx.aberrationStrength ?? 0)],
        ["noiseIntensity",     u(postfx.noiseIntensity     ?? 0)],
        ["noiseScale",         u(postfx.noiseScale         ?? 1)],
        ["noiseSpeed",         u(postfx.noiseSpeed         ?? 1)],
        ["waveAmplitude",      u(postfx.waveAmplitude      ?? 0)],
        ["waveFrequency",      u(postfx.waveFrequency      ?? 10)],
        ["waveSpeed",          u(postfx.waveSpeed          ?? 1)],
        ["glitchIntensity",    u(postfx.glitchIntensity    ?? 0)],
        ["glitchFrequency",    u(postfx.glitchFrequency    ?? 0)],
        ["brightnessAdjust",   u(postfx.brightnessAdjust   ?? 0)],
        ["contrastAdjust",     u(postfx.contrastAdjust     ?? 1)],
      ]),
    })

    _cellSize = cellSize
    _invert = invert
    _colorMode = color
    _asciiStyle = style
    _resolution = resolution
    _mousePos = mousePos
  }

  update(_renderer: unknown, _inputBuffer: unknown, deltaTime: number) {
    const targetFPS = (this.uniforms.get("targetFPS") as Uniform<number>).value
    if (targetFPS > 0) {
      const fd = 1 / targetFPS
      _deltaAccumulator += deltaTime
      if (_deltaAccumulator >= fd) {
        _time += fd
        _deltaAccumulator %= fd
      }
    } else {
      _time += deltaTime
    }
    ;(this.uniforms.get("time")       as Uniform<number>).value  = _time
    ;(this.uniforms.get("cellSize")   as Uniform<number>).value  = _cellSize
    ;(this.uniforms.get("invert")     as Uniform<boolean>).value = _invert
    ;(this.uniforms.get("colorMode")  as Uniform<boolean>).value = _colorMode
    ;(this.uniforms.get("asciiStyle") as Uniform<number>).value  = _asciiStyle
    ;(this.uniforms.get("resolution") as Uniform<Vector2>).value = _resolution
    ;(this.uniforms.get("mousePos")   as Uniform<Vector2>).value = _mousePos
  }
}

interface AsciiEffectProps {
  style?: "standard" | "dense" | "minimal" | "blocks"
  cellSize?: number
  invert?: boolean
  color?: boolean
  postfx?: PostFXOptions
  resolution?: Vector2
  mousePos?: Vector2
}

export const AsciiEffect = forwardRef<AsciiEffectImpl, AsciiEffectProps>((props, ref) => {
  const {
    style = "standard",
    cellSize = 4,
    invert = false,
    color = true,
    postfx = {},
    resolution = new Vector2(1920, 1080),
    mousePos = new Vector2(0, 0),
  } = props

  const styleMap: Record<string, number> = { standard: 0, dense: 1, minimal: 2, blocks: 3 }
  const styleNum = styleMap[style] ?? 0

  // Update module-level state every render (mirrors efecto export)
  _cellSize   = cellSize
  _invert     = invert
  _colorMode  = color
  _asciiStyle = styleNum
  _resolution = resolution
  _mousePos   = mousePos

  const effect = useMemo(
    () => new AsciiEffectImpl({ cellSize, invert, color, style: styleNum, postfx, resolution, mousePos }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return <primitive ref={ref} object={effect} dispose={null} />
})

AsciiEffect.displayName = "AsciiEffect"
