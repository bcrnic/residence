import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Inner image drifts vertically as the page scrolls. */
  parallax?: boolean;
}

/** Image that opens with a clip-path curtain on scroll, with optional parallax. */
const RevealImage = ({ src, alt, className, imgClassName, parallax = true }: RevealImageProps) => {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!wrap.current || !img.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: { trigger: wrap.current, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(img.current, { scale: 1.35 }, {
        scale: 1.12,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: { trigger: wrap.current, start: "top 85%", once: true },
      });
      if (parallax) {
        gsap.fromTo(img.current, { yPercent: -6 }, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, wrap);

    return () => ctx.revert();
  }, [parallax]);

  return (
    <div ref={wrap} className={cn("overflow-hidden", className)}>
      <img ref={img} src={src} alt={alt} loading="lazy" className={cn("w-full h-full object-cover scale-110", imgClassName)} />
    </div>
  );
};

export default RevealImage;
