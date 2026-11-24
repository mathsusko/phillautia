"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Efeito-assinatura: "luz líquida".
 * Um shader de mármore fluido (eco do fundo do presskit) que atravessa
 * a noite violeta até o amanhecer dourado conforme a página rola —
 * a tradução visual do Full On Morning e da lótus que abre com o sol.
 */

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uDawn;
uniform vec2 uPointer;

vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 3; i++){ v += a * snoise(p); p = p * 1.9 + 17.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.04;

  // domain warping suave: mármore líquido em formas grandes
  vec2 q = vec2(fbm(p * 0.65 + vec2(0.0, t)), fbm(p * 0.65 + vec2(5.2, -t)));
  q += (uPointer - 0.5) * 0.25;
  vec2 r = vec2(fbm(p * 0.8 + 1.1 * q + vec2(1.7, 9.2) + t * 0.5),
                fbm(p * 0.8 + 1.1 * q + vec2(8.3, 2.8) - t * 0.35));
  float f = fbm(p * 0.7 + 1.2 * r);

  // um único veio luminoso, como tinta escorrendo
  float vein = smoothstep(0.06, 0.0, abs(f - 0.12)) * smoothstep(-0.2, 0.5, r.y);

  // paletas: noite violeta -> amanhecer
  vec3 nA = vec3(0.035, 0.016, 0.095);   // #090418
  vec3 nB = vec3(0.200, 0.050, 0.460);   // #330D75
  vec3 nC = vec3(0.640, 0.100, 0.560);   // #A3198F
  vec3 dA = vec3(0.120, 0.035, 0.180);   // #1F092E
  vec3 dB = vec3(0.560, 0.150, 0.330);   // #8F2654
  vec3 dC = vec3(1.000, 0.700, 0.380);   // #FFB361

  float d = smoothstep(0.0, 1.0, uDawn);
  vec3 A = mix(nA, dA, d);
  vec3 B = mix(nB, dB, d);
  vec3 C = mix(nC, dC, d);

  vec3 col = mix(A, B, smoothstep(-0.45, 0.45, f));
  col = mix(col, C, smoothstep(0.35, 0.85, length(r)) * 0.35);
  col += C * vein * 0.18;

  // o sol nasce no horizonte
  float sunY = mix(-1.05, -0.55, d);
  float dist = length((p - vec2(0.0, sunY)) * vec2(0.55, 1.0));
  vec3 sun = mix(vec3(0.9, 0.35, 0.55), vec3(1.0, 0.78, 0.5), d);
  col += sun * exp(-dist * 2.6) * (0.1 + 0.75 * d);

  // vinheta: centro mais escuro preserva a leitura
  float vig = smoothstep(1.3, 0.2, length(p * vec2(0.8, 1.0)));
  col *= mix(0.55, 1.0, vig);
  col *= 0.8;

  // grão
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + uTime) * 43758.5453);
  col += (g - 0.5) * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

export default function DawnSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uDawn = gl.getUniformLocation(prog, "uDawn");
    const uPointer = gl.getUniformLocation(prog, "uPointer");

    const reduce = prefersReducedMotion();
    // o shader é orgânico/desfocado por natureza: meia resolução basta
    const scale = Math.min(window.devicePixelRatio, 1.5) * 0.5;

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * scale));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const state = { dawn: 0, dawnTarget: 0, px: 0.5, py: 0.5, tx: 0.5, ty: 0.5 };

    // progresso do amanhecer = quanto da página já foi percorrido
    const readScroll = () => {
      const max = ScrollTrigger.maxScroll(window) || 1;
      state.dawnTarget = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const onScroll = () => {
      readScroll();
      if (reduce) draw(0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    readScroll();

    const onPointer = (e: PointerEvent) => {
      state.tx = e.clientX / window.innerWidth;
      state.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    function draw(time: number) {
      state.dawn += (state.dawnTarget - state.dawn) * (reduce ? 1 : 0.06);
      state.px += (state.tx - state.px) * 0.04;
      state.py += (state.ty - state.py) * 0.04;
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, reduce ? 12 : time / 1000);
      gl!.uniform1f(uDawn, state.dawn);
      gl!.uniform2f(uPointer, state.px, state.py);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    let raf = 0;
    let visible = true;
    const loop = (time: number) => {
      if (visible) draw(time);
      raf = requestAnimationFrame(loop);
    };
    if (reduce) draw(0);
    else raf = requestAnimationFrame(loop);
    canvas.dataset.ready = "true";

    const onVis = () => (visible = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      // não destruir o contexto: o canvas pode ser remontado (StrictMode/HMR)
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} className="sky" aria-hidden="true" />;
}
