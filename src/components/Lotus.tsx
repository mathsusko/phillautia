"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { petals } from "@/content/site";

/**
 * A lótus fecha à noite e se abre ao amanhecer.
 * Cada pétala é um ciclo do autoconhecimento; elas abrem de fora para dentro
 * e a pétala central (Conexão) fecha a jornada.
 */

// ângulo final de cada ciclo (ordem dos ciclos = ordem de abertura)
const ANGLES = [-78, 78, -52, 52, -26, 26, 0];
const LENGTHS = [0.78, 0.78, 0.9, 0.9, 0.98, 0.98, 1.05];

const PETAL = "M0 0 C 46 -38 52 -150 0 -230 C -52 -150 -46 -38 0 0 Z";
const VEIN = "M0 -8 C 6 -80 6 -150 0 -214";

export default function Lotus() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.motion, () => {
        const petalEls = q(".petal");
        const items = q(".lotus__item");
        const dots = q(".lotus__dot");

        // botão fechado: pétalas juntas e encolhidas
        gsap.set(petalEls, { rotate: 0, scaleY: 0.35, scaleX: 0.5, autoAlpha: 0.0, transformOrigin: "50% 100%" });
        gsap.set(items, { autoAlpha: 0, y: 30 });
        gsap.set(".lotus__core", { scale: 0, autoAlpha: 0, transformOrigin: "50% 50%" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: `+=${petals.length * 70 + 60}%`,
            scrub: 1,
            pin: ".lotus__stage",
          },
        });

        tl.from(".lotus__intro > *", { y: 30, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, 0)
          .from(".lotus__water", { scaleX: 0, autoAlpha: 0, duration: 0.6 }, 0)
          .to(petalEls, { autoAlpha: 0.55, scaleY: 0.4, duration: 0.4, stagger: 0.03 }, 0.2)
          .to(".lotus__intro", { autoAlpha: 0, y: -30, duration: 0.4 }, 0.8);

        petals.forEach((_, i) => {
          const at = 1 + i;
          tl.to(
            petalEls[i],
            {
              rotate: ANGLES[i],
              scaleY: LENGTHS[i],
              scaleX: 1,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power2.inOut",
            },
            at,
          )
            .to(".lotus__glow", { scale: 0.5 + (i + 1) * 0.12, autoAlpha: 0.25 + i * 0.1, duration: 0.8 }, at)
            .to(dots[i], { backgroundColor: "var(--gold)", scale: 1.4, duration: 0.3 }, at + 0.2)
            .to(items[i], { autoAlpha: 1, y: 0, duration: 0.4 }, at + 0.25);
          if (i < petals.length - 1) tl.to(items[i], { autoAlpha: 0, y: -30, duration: 0.3 }, at + 0.85);
          tl.to(dots[i], { scale: 1, duration: 0.2 }, at + 0.85);
        });

        tl.to(".lotus__core", { scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(2)" }, petals.length + 0.4).to(
          {},
          { duration: 0.5 },
        );
      });

      // menos movimento: flor aberta e lista completa
      mm.add(MQ.reduce, () => {
        petals.forEach((_, i) =>
          gsap.set(q(".petal")[i], { rotate: ANGLES[i], scaleY: LENGTHS[i], transformOrigin: "50% 100%" }),
        );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="lotus" className="lotus" aria-labelledby="lotus-title">
      <div className="lotus__stage">
        <div className="lotus__intro">
          <p className="eyebrow">A lótus</p>
          <h2 id="lotus-title" className="display">
            Nasce na lama, <em>abre com o sol.</em>
          </h2>
          <p className="lead">Sete pétalas, sete ciclos do autoconhecimento. Role para abrir a flor.</p>
        </div>

        <div className="lotus__art" aria-hidden="true">
          <div className="lotus__glow" />
          <svg viewBox="-285 -255 570 310" className="lotus__svg">
            <defs>
              <linearGradient id="petalFill" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#7A1FB8" stopOpacity="0.95" />
                <stop offset="0.55" stopColor="#D63A8F" stopOpacity="0.85" />
                <stop offset="1" stopColor="#FFD08A" stopOpacity="0.95" />
              </linearGradient>
              <radialGradient id="coreFill">
                <stop offset="0" stopColor="#FFF4E2" />
                <stop offset="1" stopColor="#E2A93B" />
              </radialGradient>
            </defs>
            <g transform="translate(0 40)">
              {/* desenhadas do fundo para a frente: a central por último */}
              {petals.map((p, i) => (
                <g key={p.name} className="petal" data-cycle={i + 1}>
                  <path d={PETAL} fill="url(#petalFill)" />
                  <path d={VEIN} className="petal__vein" />
                </g>
              ))}
              <circle className="lotus__core" r="16" fill="url(#coreFill)" />
            </g>
          </svg>
          <div className="lotus__water" />
        </div>

        <ol className="lotus__list">
          {petals.map((p, i) => (
            <li key={p.name} className="lotus__item">
              <span className="lotus__num">
                {String(i + 1).padStart(2, "0")} <span>/ 07</span>
              </span>
              <h3 className="lotus__name">{p.name}</h3>
              <p>{p.line}</p>
            </li>
          ))}
        </ol>

        <div className="lotus__dots" aria-hidden="true">
          {petals.map((p) => (
            <span key={p.name} className="lotus__dot" />
          ))}
        </div>
      </div>
    </section>
  );
}
