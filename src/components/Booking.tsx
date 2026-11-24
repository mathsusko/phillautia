"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { artist, links } from "@/content/site";

export default function Booking() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: "top 65%" } })
          .from(".booking__emblem", { rotate: -180, scale: 0.5, autoAlpha: 0, duration: 1.8, ease: "expo.out" })
          .from(".booking__title .line > span", { yPercent: 110, stagger: 0.12, duration: 1.4, ease: "expo.out" }, 0.1)
          .from(".booking__actions > *", { y: 30, autoAlpha: 0, stagger: 0.1, duration: 1, ease: "expo.out" }, 0.6);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="booking" className="section booking" aria-labelledby="booking-title">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="booking__emblem" src="/brand/emblem-dourado.svg" alt="" width={96} height={96} />
      <p className="eyebrow">Booking</p>
      <h2 id="booking-title" className="booking__title display">
        <span className="line">
          <span>Leve o amanhecer</span>
        </span>
        <span className="line">
          <span>
            <em>para a sua pista.</em>
          </span>
        </span>
      </h2>
      <p className="lead booking__lead">
        Festivais, festas e sunrise sets. Fale direto com a {artist.name} para datas, cachê e rider técnico.
      </p>

      <div className="booking__actions">
        {artist.bookingEmail ? (
          <a className="btn" href={`mailto:${artist.bookingEmail}?subject=Booking%20Phillautia`}>
            {artist.bookingEmail}
          </a>
        ) : null}
        <a className="btn" href={links.instagramDm} target="_blank" rel="noopener noreferrer">
          Solicitar data pelo Instagram
        </a>
        <a className="btn btn--ghost" href={links.presskit} target="_blank" rel="noopener noreferrer">
          Baixar presskit
        </a>
      </div>
    </section>
  );
}
