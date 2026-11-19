import { useLayoutEffect, useRef, useState } from "react";
import { gsap, markIntroDone, prefersReducedMotion } from "@/lib/motion";

const SEEN_KEY = "residence:preloaded";

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

/** Counter + curtain intro, shown once per browser session. */
const Preloader = () => {
  const [done, setDone] = useState(() => alreadySeen() || prefersReducedMotion());
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (done) {
      markIntroDone();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const counter = { v: 0 };

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            try {
              sessionStorage.setItem(SEEN_KEY, "1");
            } catch {
              /* storage unavailable: fine, intro just shows again */
            }
            document.documentElement.style.overflow = "";
            setDone(true);
          },
        })
        .to(counter, {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
          },
        })
        .to(bar.current, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to("[data-pl-fade]", { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" })
        .add(markIntroDone, "-=0.1")
        .to(root.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.1");
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] bg-dark text-white flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      <p data-pl-fade className="font-heading text-3xl md:text-5xl font-light tracking-[0.25em] text-gold-light">
        RESIDENCES
      </p>
      <div data-pl-fade className="mt-8 w-48 md:w-64 h-px bg-white/10 overflow-hidden">
        <div ref={bar} className="h-full bg-primary origin-left scale-x-0" />
      </div>
      <p data-pl-fade className="mt-6 font-body text-sm tracking-[0.3em] text-white/60 tabular-nums">
        <span ref={count}>00</span>%
      </p>
    </div>
  );
};

export default Preloader;
