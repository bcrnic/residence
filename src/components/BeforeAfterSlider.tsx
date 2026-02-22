import { useState, useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import beforeImg from "@/assets/construction-before.jpg";
import afterImg from "@/assets/construction-after.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const { t } = useLanguage();

  const updatePosition = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    };
    const handleUp = () => { isDragging.current = false; };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">{t(tr.beforeAfter.badge)}</p>
            <h2 className="font-body text-[24px] font-medium text-foreground">
              {t(tr.beforeAfter.title)} <span className="gold-gradient-text">{t(tr.beforeAfter.titleHighlight)}</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div ref={containerRef} className="relative aspect-[3/2] rounded-lg overflow-hidden cursor-col-resize select-none border border-border"
            onMouseDown={(e) => { isDragging.current = true; updatePosition(e.clientX); }}
            onTouchStart={(e) => { isDragging.current = true; updatePosition(e.touches[0].clientX); }}>
            <img src={afterImg} alt={t(tr.beforeAfter.after)} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
              <img src={beforeImg} alt={t(tr.beforeAfter.before)} className="absolute inset-0 w-full h-full object-cover"
                style={{ width: containerRef.current?.offsetWidth || "100%", maxWidth: "none" }} />
            </div>
            <div className="absolute top-0 bottom-0 w-0.5 bg-primary z-10" style={{ left: `${sliderPos}%` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary-foreground">
                  <path d="M6 10L2 10M2 10L5 7M2 10L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 10L18 10M18 10L15 7M18 10L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-dark/70 backdrop-blur-sm text-white text-xs font-body font-medium px-3 py-1.5 rounded z-20">
              {t(tr.beforeAfter.before)}
            </div>
            <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-body font-medium px-3 py-1.5 rounded z-20">
              {t(tr.beforeAfter.after)}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
