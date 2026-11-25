"use client";

import { useId, useRef } from "react";
import { gsap, useGSAP, MQ, refreshScroll, PIN_PRIORITY } from "@/lib/gsap";
import { artist, opening } from "@/content/site";
import { GreekColumn, LOTUS_ANGLES, LOTUS_LENGTHS, PETAL_PATH, VEIN_PATH } from "@/components/art";

/**
 * Abertura "O Despertar" — a rolagem toca o filme.
 * Coreografia (em % da rolagem, ver briefs/decupagem-abertura.md):
 *   0–15  Guardiões     colunas nos cantos, botão de lótus fechado
 *  15–35  Primeira luz  wordmark entra, pétalas externas abrem, sol nasce
 *  35–55  Florescer     lótus aberta, tagline
 *  55–80  Torção        colunas se torcem e convergem, texto sai
 *  80–100 O símbolo     colunas se resolvem no emblema real (SVG)
 *
 * Com `opening.frames` preenchido, um canvas toca os frames do vídeo e a
 * prévia procedural (colunas/lótus em SVG) sai de cena. Os overlays são os mesmos.
 */

type Frames = NonNullable<typeof opening.frames>;

/** Toca uma sequência de imagens num canvas, em "cover", carregando em segundo plano. */
function createFramePlayer(canvas: HTMLCanvasElement, frames: Frames) {
  const ctx = canvas.getContext("2d")!;
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const pattern = mobile ? frames.mobile : frames.desktop;
  const src = (i: number) => pattern.replace("{n}", String(i + 1).padStart(4, "0"));
  const images: HTMLImageElement[] = new Array(frames.total);
  const state = { frame: 0 };

  const draw = () => {
    let i = Math.round(state.frame);
    while (i > 0 && !images[i]?.complete) i--; // usa o frame carregado mais próximo
    const img = images[i];
    if (!img?.complete || !img.naturalWidth) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    draw();
  };

  // primeiros 30 frames com prioridade; o resto em seguida
  const load = (i: number) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src(i);
    img.onload = () => i === Math.round(state.frame) && draw();
    images[i] = img;
  };
  for (let i = 0; i < Math.min(30, frames.total); i++) load(i);
  const rest = () => {
    for (let i = 30; i < frames.total; i++) load(i);
  };
  if ("requestIdleCallback" in window) requestIdleCallback(rest);
  else setTimeout(rest, 300);

  resize();
  window.addEventListener("resize", resize);
  return { state, draw, destroy: () => window.removeEventListener("resize", resize) };
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uid = useId().replace(/:/g, "");
  const frames = opening.frames;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=420%",
            scrub: 0.8,
            pin: ".opening__stage",
            anticipatePin: 1,
            refreshPriority: PIN_PRIORITY.opening,
          },
        });
        tl.to({}, { duration: 100 }, 0); // a linha do tempo mede 100 = 100% da rolagem

        let player: ReturnType<typeof createFramePlayer> | undefined;

        if (frames && canvasRef.current) {
          // ---- filme real: frame a frame ----
          player = createFramePlayer(canvasRef.current, frames);
          tl.to(player.state, { frame: frames.total - 1, duration: 100, onUpdate: player.draw }, 0);
        } else {
          // ---- prévia procedural com a mesma coreografia ----
          const petalEls = q(".op-petal");
          const disps = q("feDisplacementMap");
          const noise = { scale: 0 };
          gsap.set(petalEls, { rotate: 0, scaleY: 0.32, scaleX: 0.45, transformOrigin: "50% 100%" });

          // entrada no carregamento (não depende da rolagem): os guardiões já estão lá
          gsap.from(".op-col--l", { xPercent: -40, autoAlpha: 0, duration: 2.2, ease: "expo.out", delay: 0.2 });
          gsap.from(".op-col--r", { xPercent: 40, autoAlpha: 0, duration: 2.2, ease: "expo.out", delay: 0.2 });
          gsap.from(".opening__lotus, .opening__water", { autoAlpha: 0, y: 30, duration: 2, ease: "expo.out", delay: 0.6 });

          tl.fromTo(".opening__sun", { yPercent: 70, scale: 0.5, autoAlpha: 0.15 }, { yPercent: 0, scale: 1, autoAlpha: 1, duration: 45 }, 8);

          petalEls.forEach((p, i) => {
            tl.to(p, { rotate: LOTUS_ANGLES[i], scaleY: LOTUS_LENGTHS[i], scaleX: 1, duration: 7, ease: "power2.inOut" }, 15 + i * 5);
          });

          tl.fromTo(".op-core", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 6, ease: "back.out(2)" }, 48)
            // torção: a pedra vira líquido e as colunas convergem
            .to(
              noise,
              {
                scale: 38,
                duration: 25,
                ease: "power1.in",
                onUpdate: () => disps.forEach((d) => d.setAttribute("scale", String(noise.scale))),
              },
              55,
            )
            .to(".op-col--l", { x: "30vw", rotate: 26, scale: 0.7, duration: 25, ease: "power1.inOut" }, 55)
            .to(".op-col--r", { x: "-30vw", rotate: -26, scale: 0.7, duration: 25, ease: "power1.inOut" }, 55)
            .to(".op-col", { autoAlpha: 0, scale: 0.35, y: "-14vh", duration: 10 }, 80)
            .to(".opening__sun", { scale: 1.35, duration: 20 }, 80);
        }

        // ---- overlays (iguais nos dois modos) ----
        tl.to(".opening__hint", { autoAlpha: 0, duration: 6 }, 2)
          .fromTo(".opening__word", { yPercent: 110 }, { yPercent: 0, duration: 14, ease: "power2.out" }, 15)
          .fromTo(".opening__tag > *", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 3, duration: 8 }, 35)
          .to(".opening__copy", { autoAlpha: 0, filter: "blur(10px)", duration: 12 }, 60)
          .fromTo(
            ".opening__emblem",
            { autoAlpha: 0, scale: 0.55, rotate: -40 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 15, ease: "power2.out" },
            82,
          );

        return () => player?.destroy();
      });

      // menos movimento: o quadro final, parado
      mm.add(MQ.reduce, () => {
        q(".op-petal").forEach((p, i) =>
          gsap.set(p, { rotate: LOTUS_ANGLES[i], scaleY: LOTUS_LENGTHS[i], transformOrigin: "50% 100%" }),
        );
        gsap.set(".op-col, .opening__hint", { autoAlpha: 0 });
        gsap.set(".opening__emblem", { autoAlpha: 1 });
        if (frames && canvasRef.current) {
          const player = createFramePlayer(canvasRef.current, frames);
          player.state.frame = frames.total - 1;
          return () => player.destroy();
        }
      });

      refreshScroll();
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="topo" className="opening" aria-labelledby="hero-title">
      <div className="opening__stage">
        {frames ? (
          <canvas ref={canvasRef} className="opening__frames" aria-hidden="true" />
        ) : (
          <div className="opening__preview" aria-hidden="true">
            <div className="opening__sun" />
            {(["l", "r"] as const).map((side) => (
              <svg key={side} className={`op-col op-col--${side}`} viewBox="0 0 120 400" overflow="visible">
                <defs>
                  <filter id={`${uid}-${side}`} x="-40%" y="-10%" width="180%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.006 0.014" numOctaves="1" seed={side === "l" ? 3 : 9} />
                    <feDisplacementMap in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <linearGradient id={`${uid}-marble-${side}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#FFF4E2" stopOpacity="0.16" />
                    <stop offset="1" stopColor="#E2A93B" stopOpacity="0.04" />
                  </linearGradient>
                </defs>
                <g filter={`url(#${uid}-${side})`} fill={`url(#${uid}-marble-${side})`}>
                  <GreekColumn />
                </g>
              </svg>
            ))}
            <svg className="opening__lotus" viewBox="-285 -255 570 300">
              <defs>
                <linearGradient id={`${uid}-petal`} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="#7A1FB8" stopOpacity="0.95" />
                  <stop offset="0.55" stopColor="#D63A8F" stopOpacity="0.88" />
                  <stop offset="1" stopColor="#FFD08A" stopOpacity="0.95" />
                </linearGradient>
                <radialGradient id={`${uid}-core`}>
                  <stop offset="0" stopColor="#FFF4E2" />
                  <stop offset="1" stopColor="#E2A93B" />
                </radialGradient>
              </defs>
              <g transform="translate(0 30)">
                {LOTUS_ANGLES.map((a) => (
                  <g key={a} className="op-petal petal">
                    <path d={PETAL_PATH} fill={`url(#${uid}-petal)`} />
                    <path d={VEIN_PATH} className="petal__vein" />
                  </g>
                ))}
                <circle className="op-core" r="15" fill={`url(#${uid}-core)`} />
              </g>
            </svg>
            <div className="opening__water" />
          </div>
        )}

        <div className="opening__veil" aria-hidden="true" />

        <div className="opening__copy">
          <h1 id="hero-title" className="opening__mask">
            <span className="sr-only">
              {artist.name} — {artist.genre}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="opening__word" src="/brand/wordmark-luz.svg" alt="" width={1032} height={270} />
          </h1>
          <div className="opening__tag">
            <p className="eyebrow">{artist.genre}</p>
            <p className="opening__claim">
              {opening.tagline.a} <em>{opening.tagline.b}</em>
            </p>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="opening__emblem" src="/brand/emblem-dourado.svg" alt="" width={320} height={320} />

        <a href="#manifesto" className="opening__hint" aria-label="Rolar para o manifesto">
          <span>role para despertar</span>
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
