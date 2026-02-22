import { CheckCircle } from "lucide-react";
import heroImg from "@/assets/hero-building.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const Hero = () => {
  const { t } = useLanguage();

  const benefits = [
    t(tr.hero.benefits.smart),
    t(tr.hero.benefits.premium),
    t(tr.hero.benefits.modern),
  ];

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <img src={heroImg} alt="Premium stambeni objekat" className="absolute inset-0 w-full h-full object-cover" />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in opacity-0"
           style={{ animationDelay: "0.2s" }}>
          {t(tr.hero.badge)}
        </p>
        <h1 className="font-heading text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-light text-white leading-tight mb-6 animate-fade-in opacity-0"
            style={{ animationDelay: "0.4s" }}>
          {t(tr.hero.title1)}
          <br />
          <span className="gold-gradient-text">{t(tr.hero.title2)}</span>
        </h1>
        <h2 className="font-heading text-[20px] sm:text-[24px] md:text-[32px] font-normal text-white/70 mb-10 animate-fade-in opacity-0"
           style={{ animationDelay: "0.6s" }}>
          {t(tr.hero.subtitle)}
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in opacity-0"
             style={{ animationDelay: "0.8s" }}>
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2 text-white/90">
              <CheckCircle size={18} className="text-primary" />
              <span className="text-sm font-medium tracking-wide">{b}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0"
             style={{ animationDelay: "1s" }}>
          <a href="#stanovi" className="btn-gold rounded font-body font-medium text-lg">
            {t(tr.hero.ctaView)}
          </a>
          <a href="#kontakt" className="btn-outline-light rounded font-body font-medium text-lg">
            {t(tr.hero.ctaContact)}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
