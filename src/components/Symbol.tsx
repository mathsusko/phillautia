"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ, refreshScroll, PIN_PRIORITY } from "@/lib/gsap";
import { symbol } from "@/content/site";
import { GreekColumn } from "@/components/art";

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
            anticipatePin: 1,
            refreshPriority: PIN_PRIORITY.symbol,
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

      refreshScroll();
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
                <GreekColumn className="col col--l" />
              </g>
              <g transform="translate(220 0)">
                <GreekColumn className="col col--r" />
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
