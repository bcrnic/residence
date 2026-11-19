import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const EASE_OUT = "expo.out";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fired once the preloader has finished, so intro animations can start. */
export const INTRO_EVENT = "residence:intro";

let introDone = false;

export const markIntroDone = () => {
  if (introDone) return;
  introDone = true;
  // Dispatch on a fresh call stack: if this runs from inside a GSAP timeline callback,
  // tweens created by listeners would otherwise join (and be reverted with) that timeline's context.
  setTimeout(() => window.dispatchEvent(new Event(INTRO_EVENT)), 0);
};

export const onIntro = (cb: () => void) => {
  if (introDone) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, cb);
};

export { gsap, ScrollTrigger };
