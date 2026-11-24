"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { symbol } from "@/content/site";

/** Coluna dórica em traço fino: ábaco, equino, fuste canelado e base. */
function Column({ className }: { className: string }) {
  const flutes = [-26, -17, -8.5, 0, 8.5, 17, 26];
  return (
    <g className={className}>
      <rect x="8" y="16" width="104" height="14" rx="1" />
      <path d="M18 30 Q60 50 102 30" />
      <path d="M22 30 C24 44 34 52 60 52 C86 52 96 44 98 30" />
      <rect x="24" y="52" width="72" height="8" />
      <path d="M26 60 L22 356 M94 60 L98 356" />
      {flutes.map((f) => (
        <path key={f} d={`M${60 + f * 0.95} 64 L${60 + f * 1.1} 352`} className="flute" />
      ))}
      <rect x="16" y="356" width="88" height="10" rx="5" />
      <rect x="6" y="366" width="108" height="16" />
    </g>
  );
}

export default function Symbol() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const disp = ref.current!.querySelector("feDisplacementMap");
        const turb = ref.current!.querySelector("feTurbulence");
        const noise = { scale: 0, freq: 0.003 };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=220%",
            scrub: 1,
            pin: ".symbol__stage",
          },
        });

        tl.from(".symbol__copy > *", { y: 40, autoAlpha: 0, stagger: 0.1, duration: 0.4 }, 0)
          .from(".col", { yPercent: 30, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, 0)
          // a pedra começa a fluir
          .to(
            noise,
            {
              scale: 34,
              freq: 0.009,
              duration: 1.2,
              onUpdate: () => {
                disp?.setAttribute("scale", String(noise.scale));
                turb?.setAttribute("baseFrequency", `${noise.freq} ${noise.freq * 2.2}`);
              },
            },
            0.5,
          )
          .to(".col--l", { x: 90, rotate: -28, transformOrigin: "50% 100%", duration: 1.2 }, 0.5)
          .to(".col--r", { x: -90, rotate: 28, transformOrigin: "50% 100%", duration: 1.2 }, 0.5)
          // e se resolve no emblema
          .to(".symbol__cols", { autoAlpha: 0, scale: 0.6, duration: 0.6 }, 1.4)
          .fromTo(
            ".symbol__emblem",
            { autoAlpha: 0, scale: 0.3, rotate: -270 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.9, ease: "power2.out" },
            1.45,
          )
          .from(".symbol__halo", { scale: 0.2, autoAlpha: 0, duration: 0.9 }, 1.5)
          .to({}, { duration: 0.4 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="simbolo" className="symbol" aria-labelledby="simbolo-title">
      <div className="symbol__stage">
        <div className="symbol__copy">
          <p className="eyebrow">O símbolo</p>
          <h2 id="simbolo-title" className="display">
            {symbol.title}
          </h2>
          <p className="lead">{symbol.text}</p>
        </div>

        <div className="symbol__art" aria-hidden="true">
          <div className="symbol__halo" />
          <svg className="symbol__cols" viewBox="0 0 360 400">
            <defs>
              <filter id="distort" x="-30%" y="-10%" width="160%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.004 0.012" numOctaves="1" seed="7" />
                <feDisplacementMap in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            <g filter="url(#distort)">
              <g transform="translate(20 0)">
                <Column className="col col--l" />
              </g>
              <g transform="translate(220 0)">
                <Column className="col col--r" />
              </g>
            </g>
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="symbol__emblem" src="/brand/emblem-dourado.svg" alt="" width={320} height={320} />
        </div>
      </div>
    </section>
  );
}
