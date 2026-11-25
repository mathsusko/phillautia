"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion, refreshScroll } from "@/lib/gsap";

/**
 * Scroll suave (Lenis) sincronizado com o ticker do GSAP,
 * para o ScrollTrigger ler sempre a mesma posição.
 * Também mantém as posições dos gatilhos em dia quando o layout muda
 * depois da montagem (fontes, imagens, Fast Refresh).
 */
export default function SmoothScroll() {
  // recálculo global: roda com ou sem "reduzir movimento"
  useEffect(() => {
    const onAssetLoad = (e: Event) => {
      if (e.target instanceof HTMLImageElement) refreshScroll(200);
    };
    const onLoad = () => refreshScroll(0);

    document.addEventListener("load", onAssetLoad, true); // captura o load de cada <img>
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(() => refreshScroll(0));
    refreshScroll();

    return () => {
      document.removeEventListener("load", onAssetLoad, true);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -40 } });
    lenis.on("scroll", ScrollTrigger.update);

    // quando o ScrollTrigger muda as alturas (pin-spacers), o Lenis precisa saber
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
