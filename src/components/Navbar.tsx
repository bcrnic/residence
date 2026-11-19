import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";
import { gsap, ScrollTrigger, onIntro, prefersReducedMotion } from "@/lib/motion";

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const bar = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  const links = [
    { href: "#stanovi", label: t(tr.nav.apartments) },
    { href: "#prednosti", label: t(tr.nav.advantages) },
    { href: "#investicija", label: t(tr.nav.investment) },
    { href: "#kontakt", label: t(tr.nav.contact) },
  ];

  const toggleLang = () => setLang(lang === "sr" ? "en" : "sr");

  // Intro drop-in, then hide on scroll down / show on scroll up
  useLayoutEffect(() => {
    const el = bar.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    let off = () => {};

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.set(el, { yPercent: -150, autoAlpha: 0 });
        off = onIntro(() => gsap.to(el, { yPercent: 0, autoAlpha: 1, duration: 1.2, delay: 0.5, ease: "expo.out" }));
      }

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setScrolled(self.scroll() > 60);
          if (reduced) return;
          const hide = self.direction === 1 && self.scroll() > 400;
          gsap.to(el, { yPercent: hide ? -150 : 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        },
      });
    }, el);

    return () => {
      off();
      ctx.revert();
    };
  }, []);

  // Fullscreen menu open/close
  useEffect(() => {
    const el = overlay.current;
    if (!el) return;
    if (menuOpen) {
      lenis()?.stop();
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" });
      gsap.fromTo(
        el.querySelectorAll("[data-menu-item] > span"),
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.07, delay: 0.35, ease: "expo.out" },
      );
    } else {
      lenis()?.start();
      gsap.to(el, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-4 inset-x-0 z-50 px-4 pointer-events-none">
        <div
          ref={bar}
          className={`pointer-events-auto mx-auto max-w-5xl flex items-center justify-between rounded-full border pl-6 pr-2 py-2 transition-colors duration-500 ${
            scrolled || menuOpen
              ? "bg-dark/85 border-white/10 backdrop-blur-xl shadow-2xl shadow-black/20"
              : "bg-white/5 border-white/15 backdrop-blur-md"
          }`}
        >
          <a href="#" className="font-heading text-xl tracking-[0.25em] text-gold-light" onClick={() => setMenuOpen(false)}>
            RESIDENCES
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-xs font-medium tracking-[0.2em] uppercase text-white/75 hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-primary after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-500"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="w-10 h-10 rounded-full text-white/70 hover:text-primary transition-colors text-xs font-medium tracking-widest"
              aria-label="Change language"
            >
              {lang === "sr" ? "EN" : "SR"}
            </button>
            <a
              href="tel:+381601234567"
              className="hidden sm:flex items-center gap-2 rounded-full bg-primary text-primary-foreground text-xs font-medium tracking-[0.2em] uppercase px-5 py-3 hover:brightness-110 transition"
            >
              <Phone size={14} />
              {t(tr.nav.callUs)}
            </a>
            <button
              className="lg:hidden flex flex-col justify-center gap-1.5 w-11 h-11 rounded-full bg-white/10 items-center"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span className={`block h-px w-5 bg-white transition-transform duration-500 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-white transition-transform duration-500 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={overlay}
        className="fixed inset-0 z-40 bg-dark hidden flex-col justify-center px-8"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <ul className="space-y-2">
          {links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-menu-item
                onClick={() => setMenuOpen(false)}
                className="line-mask font-heading text-5xl sm:text-6xl font-light text-white hover:text-gold-light transition-colors"
              >
                <span>
                  <sup className="text-xs font-body text-primary mr-3 align-top">0{i + 1}</sup>
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a href="tel:+381601234567" className="mt-12 text-white/60 font-body tracking-[0.2em] text-sm">
          +381 60 123 4567
        </a>
      </div>
    </>
  );
};

export default Navbar;
