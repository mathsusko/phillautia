"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ, refreshScroll } from "@/lib/gsap";
import { artist } from "@/content/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // abertura: o emblema gira até o lugar, o nome sobe, o arco cresce
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero__emblem", { rotate: -220, scale: 0.4, autoAlpha: 0, duration: 2.2 })
          .from(".hero__word", { yPercent: 110, duration: 1.6 }, 0.25)
          .fromTo(".hero__arch", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8 }, 0.35)
          .from(".hero__arch img", { scale: 1.35, duration: 2.4 }, 0.35)
          .from(".hero__meta > *", { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1.1 }, 0.9);

        gsap.to(".hero__emblem", { rotate: "+=360", duration: 60, ease: "none", repeat: -1, delay: 2.2 });

        // saída: tudo se afasta em profundidade
        gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        })
          .to(".hero__title", { yPercent: -35, autoAlpha: 0.15, ease: "none" }, 0)
          .to(".hero__arch", { yPercent: -18, scale: 0.92, ease: "none" }, 0)
          .to(".hero__arch img", { yPercent: 10, ease: "none" }, 0);
      });
      refreshScroll();
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="topo" className="hero" aria-labelledby="hero-title">
      <div className="hero__title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero__emblem" src="/brand/emblem-dourado.svg" alt="" width={120} height={120} />
        <h1 id="hero-title" className="hero__mask">
          <span className="sr-only">{artist.name}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__word" src="/brand/wordmark-luz.svg" alt="" width={1032} height={270} />
        </h1>
        <div className="hero__meta">
          <p className="eyebrow">{artist.genre}</p>
          <p className="hero__claim">
            Amor por si,<br />
            <em>energia em movimento.</em>
          </p>
        </div>
      </div>

      <figure className="hero__arch">
        <Image
          src="/images/giovanna-bracos.jpg"
          alt="Giovanna Polo, a Phillautia, de olhos fechados e braços erguidos"
          fill
          priority
          sizes="(min-width: 900px) 34vw, 80vw"
        />
      </figure>

      <a href="#manifesto" className="hero__scroll" aria-label="Rolar para o manifesto">
        <span>role</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
