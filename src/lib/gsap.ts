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

/** Breakpoints/condições compartilhadas por todas as seções. */
export const MQ = {
  motion: forceMotion ? "all" : "(prefers-reduced-motion: no-preference)",
  reduce: forceMotion ? "not all" : "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 900px)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.reduce).matches;
