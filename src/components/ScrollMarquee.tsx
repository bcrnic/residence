import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/** Oversized line of type that slides sideways as the page scrolls. */
const ScrollMarquee = ({ text }: { text: string }) => {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(track.current, { xPercent: 0 }, {
        xPercent: -35,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const item = (
    <span className="flex items-center gap-10 pr-10">
      {text}
      <span className="inline-block w-3 h-3 md:w-4 md:h-4 rotate-45 bg-primary" />
    </span>
  );

  return (
    <div ref={root} className="overflow-hidden bg-background py-14 md:py-20 border-b border-border" aria-hidden="true">
      <div
        ref={track}
        className="flex whitespace-nowrap font-heading font-light italic text-[64px] md:text-[140px] leading-none text-foreground/90"
      >
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );
};

export default ScrollMarquee;
