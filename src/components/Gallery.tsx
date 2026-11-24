"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { gallery } from "@/content/site";

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // desktop: trilho horizontal preso à rolagem
      mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
        const track = ref.current!.querySelector<HTMLElement>(".gallery__track")!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".gallery__pin",
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        // cada foto respira dentro do próprio arco
        gsap.utils.toArray<HTMLElement>(".gallery__item img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6, scale: 1.15 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });

      mm.add(`${MQ.motion} and (max-width: 899px)`, () => {
        gsap.utils.toArray<HTMLElement>(".gallery__item").forEach((el) => {
          gsap.from(el, {
            y: 60,
            autoAlpha: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="galeria" className="gallery" aria-labelledby="galeria-title">
      <div className="gallery__pin">
        <div className="gallery__track">
          <div className="gallery__intro">
            <p className="eyebrow">Galeria</p>
            <h2 id="galeria-title" className="display">
              Cor, <em>corpo</em> e <em>cosmos.</em>
            </h2>
          </div>
          {gallery.map((g, i) => (
            <figure key={g.src} className={`gallery__item gallery__item--${i % 3}`}>
              <Image src={g.src} alt={g.alt} fill sizes="(min-width: 900px) 30vw, 90vw" />
              <figcaption>{String(i + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
