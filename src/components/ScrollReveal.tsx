import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, EASE_OUT, prefersReducedMotion } from "@/lib/motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds. */
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
}

const fromVars: Record<NonNullable<ScrollRevealProps["direction"]>, gsap.TweenVars> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: -60 },
  right: { x: 60 },
  scale: { scale: 0.92 },
};

const ScrollReveal = ({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...fromVars[direction],
        autoAlpha: 0,
        duration: 1.4,
        delay: delay / 1000,
        ease: EASE_OUT,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
