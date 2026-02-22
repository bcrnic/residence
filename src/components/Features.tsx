import { Ruler, Gem, Home } from "lucide-react";
import interiorLiving from "@/assets/interior-living.jpg";
import interiorKitchen from "@/assets/interior-kitchen.jpg";
import interiorBedroom from "@/assets/interior-bedroom.jpg";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const icons = [Ruler, Gem, Home];

const Features = () => {
  const { t } = useLanguage();
  const images = [interiorLiving, interiorKitchen, interiorBedroom];

  return (
    <section id="prednosti" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">{t(tr.features.badge)}</p>
            <h2 className="font-body text-[24px] font-medium text-foreground">
              {t(tr.features.title)} <span className="gold-gradient-text">{t(tr.features.titleHighlight)}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {tr.features.items.map((f, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={i} delay={i * 150} direction={i === 0 ? "left" : i === 2 ? "right" : "up"}>
                <div className="group relative overflow-hidden rounded-lg card-hover">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={images[i]} alt={t(f.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Icon className="text-primary mb-3" size={28} />
                    <h3 className="font-heading text-xl font-semibold text-white mb-2">{t(f.title)}</h3>
                    <p className="text-white/70 text-sm leading-relaxed font-body">{t(f.desc)}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
