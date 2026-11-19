import { Ruler, Gem, Home } from "lucide-react";
import interiorLiving from "@/assets/interior-living.jpg";
import interiorKitchen from "@/assets/interior-kitchen.jpg";
import interiorBedroom from "@/assets/interior-bedroom.jpg";
import ScrollReveal from "./ScrollReveal";
import RevealImage from "./RevealImage";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const icons = [Ruler, Gem, Home];
const images = [interiorLiving, interiorKitchen, interiorBedroom];

const Features = () => {
  const { t } = useLanguage();

  return (
    <section id="prednosti" className="py-24 md:py-36 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-3xl mb-20 md:mb-32">
            <p className="eyebrow mb-5">{t(tr.features.badge)}</p>
            <h2 className="font-heading text-[36px] md:text-[52px] font-light leading-[1.05] text-foreground">
              {t(tr.features.title)} {t(tr.features.titleHighlight)}
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-24 md:space-y-40">
          {tr.features.items.map((f, i) => {
            const Icon = icons[i];
            const flip = i % 2 === 1;
            return (
              <div key={i} className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                <RevealImage
                  src={images[i]}
                  alt={t(f.title)}
                  className={`md:col-span-7 aspect-[4/3] md:aspect-[5/4] rounded-sm ${flip ? "md:order-2" : ""}`}
                />
                <ScrollReveal
                  delay={150}
                  className={`md:col-span-5 ${flip ? "md:order-1 md:pl-8" : "md:pr-8"}`}
                >
                  <span className="block font-heading text-7xl md:text-8xl font-light text-primary/25 leading-none mb-6">
                    0{i + 1}
                  </span>
                  <Icon className="text-primary mb-4" size={26} strokeWidth={1.25} />
                  <h3 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">{t(f.title)}</h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body font-light">{t(f.desc)}</p>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
