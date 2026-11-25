"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP, MQ, refreshScroll } from "@/lib/gsap";
import { artist, identity, links } from "@/content/site";

// curva de energia de um set: envolvente -> melódico -> explosão
const CURVE =
  "M0 150 C 40 146 60 132 90 138 S 150 120 190 124 S 250 96 290 104 S 340 70 380 60 C 410 52 420 18 440 14 C 455 12 462 40 478 30 S 510 6 540 10 S 590 24 620 20";

export default function Sound() {
  const ref = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const path = ref.current!.querySelector<SVGPathElement>(".journey__line")!;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ".journey", start: "top 75%", end: "bottom 40%", scrub: 1 },
        });
        tl.to(path, { strokeDashoffset: 0, duration: 1 }, 0)
          .from(".journey__fill", { autoAlpha: 0, duration: 0.6 }, 0.4)
          .from(".journey__label", { autoAlpha: 0, y: 14, stagger: 0.3, duration: 0.2 }, 0.1);

        gsap.from(".sound__media > *", {
          y: 60,
          autoAlpha: 0,
          stagger: 0.15,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ".sound__media", start: "top 80%" },
        });
      });
      refreshScroll();
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="som" className="section sound" aria-labelledby="som-title">
      <div className="sound__head">
        <p className="eyebrow">O som</p>
        <h2 id="som-title" className="display">
          {artist.genre}
        </h2>
        <p className="lead">{identity.sound}</p>
      </div>

      <figure className="journey">
        <svg viewBox="0 0 620 170" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="journeyStroke" x1="0" x2="1">
              <stop offset="0" stopColor="#8B5CF6" />
              <stop offset="0.6" stopColor="#E0458F" />
              <stop offset="1" stopColor="#FFC26B" />
            </linearGradient>
            <linearGradient id="journeyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFC26B" stopOpacity="0.28" />
              <stop offset="1" stopColor="#FFC26B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="journey__fill" d={`${CURVE} L620 170 L0 170 Z`} fill="url(#journeyFill)" />
          <path className="journey__line" d={CURVE} stroke="url(#journeyStroke)" />
        </svg>
        <ul className="journey__labels">
          <li className="journey__label">atmosferas envolventes</li>
          <li className="journey__label">melodia</li>
          <li className="journey__label">explosão energética</li>
        </ul>
        <figcaption className="sr-only">
          A jornada de um set: começa em atmosferas envolventes, cresce pela melodia e chega à explosão energética.
        </figcaption>
      </figure>

      <div className="sound__media">
        <div className="video">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${links.youtubeId}?autoplay=1&rel=0`}
              title="Phillautia no YouTube"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button type="button" className="video__facade" onClick={() => setPlaying(true)} aria-label="Assistir ao set da Phillautia no YouTube">
              <Image
                src={`https://i.ytimg.com/vi/${links.youtubeId}/hqdefault.jpg`}
                alt=""
                fill
                sizes="(min-width: 900px) 60vw, 100vw"
              />
              <span className="video__play" aria-hidden="true" />
              <span className="video__label">Assistir set</span>
            </button>
          )}
        </div>

        <div className="channels">
          <a className="channel" href={links.soundcloud} target="_blank" rel="noopener noreferrer">
            <span className="channel__k">SoundCloud</span>
            <span className="channel__v">Sets e mixes</span>
            <span className="channel__arrow" aria-hidden="true">↗</span>
          </a>
          <a className="channel" href={links.youtube} target="_blank" rel="noopener noreferrer">
            <span className="channel__k">YouTube</span>
            <span className="channel__v">Sets em vídeo</span>
            <span className="channel__arrow" aria-hidden="true">↗</span>
          </a>
          <a className="channel" href={links.instagram} target="_blank" rel="noopener noreferrer">
            <span className="channel__k">Instagram</span>
            <span className="channel__v">@phillautia.music</span>
            <span className="channel__arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
