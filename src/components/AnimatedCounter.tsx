import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: string;
  duration?: number;
}

const AnimatedCounter = ({ target, duration = 2000 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);

  // Extract numeric part and suffix (e.g. "150+" → 150, "+")
  const numericMatch = target.match(/^(\d+)(.*)$/);
  const endValue = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = numericMatch ? numericMatch[2] : target;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || endValue === 0) {
      if (started && endValue === 0) setDisplay(target);
      return;
    }

    let startTime: number | null = null;
    let animFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * endValue);
      setDisplay(`${current}${suffix}`);

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      }
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [started, endValue, suffix, duration, target]);

  return <span ref={ref}>{display}</span>;
};

export default AnimatedCounter;
