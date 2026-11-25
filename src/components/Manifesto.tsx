"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ, refreshScroll } from "@/lib/gsap";
import { artist, identity } from "@/content/site";

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="word">
          {w}{" "}
        </span>
      ))}
    </>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // as palavras acendem como luz atravessando o texto
        gsap.fromTo(
          ".manifesto__quote .word",
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: ".manifesto__quote", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );

        gsap.from(".manifesto__def > *", {
          y: 30,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".manifesto__def", start: "top 80%" },
        });

        gsap.fromTo(
          ".manifesto__photo img",
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: ".manifesto__bio", start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        gsap.from(".manifesto__bio p", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.15,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ".manifesto__bio", start: "top 70%" },
        });
      });
      refreshScroll();
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="manifesto" className="section manifesto" aria-labelledby="manifesto-title">
      <div className="manifesto__def">
        <p className="eyebrow">Manifesto</p>
        <h2 id="manifesto-title" className="manifesto__term">
          phil·lau·tia
        </h2>
        <p className="manifesto__greek">
          do grego <span lang="grc">{artist.greek}</span>, o amor por si
        </p>
      </div>

      <p className="manifesto__quote display">
        <Words text={identity.lead} /> <em><Words text={identity.contrast} /></em>
      </p>

      <div className="manifesto__bio">
        <figure className="manifesto__photo">
          <Image
            src="/images/giovanna-maos.jpg"
            alt="Retrato de Giovanna Polo com a mão sobre a cabeça"
            fill
            sizes="(min-width: 900px) 30vw, 90vw"
          />
        </figure>
        <div className="manifesto__text">
          <p className="lead">{identity.bio}</p>
          <p>{identity.concept}</p>
        </div>
      </div>
    </section>
  );
}
