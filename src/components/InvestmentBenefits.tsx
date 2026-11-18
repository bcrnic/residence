import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const InvestmentBenefits = () => {
  const { t } = useLanguage();

  return (
    <section id="investicija" className="py-24 md:py-36 bg-background">
      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12">
        <ScrollReveal className="lg:col-span-4">
          <p className="eyebrow mb-5">{t(tr.investment.badge)}</p>
          <h2 className="font-heading text-[36px] md:text-[52px] font-light leading-[1.05] text-foreground">
            {t(tr.investment.title)} {t(tr.investment.titleHighlight)}
          </h2>
        </ScrollReveal>

        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12">
          {tr.investment.items.map((b, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="border-t border-border pt-6 pb-10">
                <span className="text-xs text-muted-foreground tabular-nums">0{i + 1}</span>
                <h3 className="font-heading text-2xl md:text-3xl font-normal text-foreground mt-3 mb-3">{t(b.title)}</h3>
                <p className="text-muted-foreground leading-relaxed font-body font-light">{t(b.desc)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentBenefits;
