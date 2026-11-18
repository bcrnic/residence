import { useLayoutEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero-building.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";
import { gsap, onIntro, prefersReducedMotion } from "@/lib/motion";

const Hero = () => {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const benefits = [
    t(tr.hero.benefits.smart),
    t(tr.hero.benefits.premium),
    t(tr.hero.benefits.modern),
  ];

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    let off = () => {};

    const ctx = gsap.context(() => {
      // Hidden state until the preloader lifts
      gsap.set("[data-hero-line] > span", { yPercent: 110 });
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
      gsap.set(img.current, { scale: 1.25 });

      off = onIntro(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(img.current, { scale: 1.08, duration: 2.6 }, 0)
          .to("[data-hero-line] > span", { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0.15)
          .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.1 }, 0.6);
      });

      // Scroll: image drifts slower than the page, content lifts and fades out
      gsap.to(img.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(content.current, {
        yPercent: -30,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
      });
    }, root);

    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] min-h-[700px] flex items-end overflow-hidden bg-dark">
      <img
        ref={img}
        src={heroImg}
        alt="Premium stambeni objekat"
        className="absolute inset-0 w-full h-[115%] -top-[7%] object-cover will-change-transform"
      />
      <div className="hero-overlay absolute inset-0" />

      <div ref={content} className="relative z-10 w-full container mx-auto px-4 pb-16 md:pb-24">
        <p data-hero-fade className="eyebrow mb-8 !text-gold-light before:!bg-gold-light/70">{t(tr.hero.badge)}</p>

        <h1 className="font-heading text-[46px] sm:text-[64px] md:text-[88px] lg:text-[112px] font-light text-white leading-[0.95] tracking-[-0.01em] mb-8">
          <span data-hero-line className="line-mask"><span>{t(tr.hero.title1)}</span></span>
          <span data-hero-line className="line-mask"><span className="italic text-gold-light">{t(tr.hero.title2)}</span></span>
        </h1>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-xl">
            <p data-hero-fade className="font-body text-lg md:text-xl font-light text-white/75 mb-6">
              {t(tr.hero.subtitle)}
            </p>
            <ul data-hero-fade className="flex flex-wrap gap-x-6 gap-y-2 text-white/60 text-xs tracking-[0.2em] uppercase">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div data-hero-fade className="flex flex-col sm:flex-row gap-4">
            <a href="#stanovi" className="btn-gold rounded-full !text-sm !px-8 whitespace-nowrap text-center">
              {t(tr.hero.ctaView)}
            </a>
            <a href="#kontakt" className="btn-outline-light rounded-full !text-sm !px-8 !border whitespace-nowrap text-center">
              {t(tr.hero.ctaContact)}
            </a>
          </div>
        </div>
      </div>

      <a
        href="#prednosti"
        data-hero-fade
        aria-label="Scroll"
        className="hidden md:flex absolute right-8 bottom-10 z-10 w-12 h-12 rounded-full border border-white/30 items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-colors"
      >
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
