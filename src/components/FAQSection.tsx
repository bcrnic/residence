import ScrollReveal from "./ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const FAQSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">{t(tr.faq.badge)}</p>
            <h2 className="font-body text-[24px] font-medium text-foreground">
              {t(tr.faq.title)} <span className="gold-gradient-text">{t(tr.faq.titleHighlight)}</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Accordion type="single" collapsible className="space-y-3">
            {tr.faq.items.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="font-heading text-base font-semibold text-foreground hover:text-primary transition-colors">
                  {t(faq.q)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed font-body">
                  {t(faq.a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;
