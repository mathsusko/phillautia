"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/**
 * `?motion` na URL força as animações mesmo com "reduzir movimento"
 * ligado no sistema (útil para apresentar o site ao cliente).
 */
const forceMotion =
  typeof window !== "undefined" && new URLSearchParams(window.location.search).has("motion");
if (forceMotion) document.documentElement.classList.add("force-motion");
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  Object.assign(window, { ScrollTrigger, gsap });
}

/** Breakpoints/condições compartilhadas por todas as seções. */
export const MQ = {
  motion: forceMotion ? "all" : "(prefers-reduced-motion: no-preference)",
  reduce: forceMotion ? "not all" : "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 900px)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.reduce).matches;

/**
 * Ordem de cálculo dos pins (maior = calcula primeiro).
 * Pins precisam ser calculados de cima para baixo: o espaço que cada um
 * adiciona empurra tudo o que vem depois. Gatilhos comuns ficam em 0 e
 * são calculados depois de todos os pins.
 */
export const PIN_PRIORITY = { symbol: 30, lotus: 20, gallery: 10 } as const;

ScrollTrigger.config({ ignoreMobileResize: true });

let refreshTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Recalcula todos os gatilhos de uma vez, na ordem certa.
 * Chamado sempre que uma seção (re)monta, quando as fontes e as imagens
 * terminam de carregar: qualquer mudança de altura invalida as posições.
 */
export function refreshScroll(delay = 120) {
  if (typeof window === "undefined") return;
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }, delay);
}
