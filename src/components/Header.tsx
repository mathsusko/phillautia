"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

const nav = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#simbolo", label: "Símbolo" },
  { href: "#lotus", label: "Lótus" },
  { href: "#som", label: "Som" },
  { href: "#galeria", label: "Galeria" },
];

export default function Header() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // esconde ao descer, volta ao subir
      const show = gsap.quickTo(ref.current, "yPercent", { duration: 0.45, ease: "power3.out" });
      ScrollTrigger.create({
        start: 200,
        end: "max",
        onUpdate: (self) => show(self.direction === 1 ? -110 : 0),
        onLeaveBack: () => show(0),
      });
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className="header">
      <a href="#topo" className="header__brand" aria-label="Phillautia, voltar ao início">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/emblem-dourado.svg" alt="" width={28} height={28} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/wordmark-luz.svg" alt="" width={124} height={32} className="header__word" />
      </a>
      <nav aria-label="Seções" className="header__nav">
        {nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <a href="#booking" className="btn btn--small">
        Booking
      </a>
    </header>
  );
}
