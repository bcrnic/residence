import { MapPin, ShieldCheck, TrendingUp, Award } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const icons = [MapPin, ShieldCheck, TrendingUp, Award];

const InvestmentBenefits = () => {
  const { t } = useLanguage();

  return (
    <section id="investicija" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">{t(tr.investment.badge)}</p>
            <h2 className="font-body text-[24px] font-medium text-foreground">
              {t(tr.investment.title)} <span className="gold-gradient-text">{t(tr.investment.titleHighlight)}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tr.investment.items.map((b, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={i} delay={i * 120} direction="scale">
                <div className="text-center p-8 rounded-lg border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 bg-card">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{t(b.title)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">{t(b.desc)}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { num: "20", label: t(tr.investment.stats.apartments) },
              { num: "10+", label: t(tr.investment.stats.experience) },
              { num: "150+", label: t(tr.investment.stats.clients) },
              { num: "A", label: t(tr.investment.stats.energy) },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-4xl font-bold text-primary">
                  <AnimatedCounter target={s.num} />
                </p>
                <p className="text-muted-foreground text-sm mt-1 font-body">{s.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default InvestmentBenefits;
