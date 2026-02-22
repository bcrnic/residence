import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, Calendar, Percent } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const formatEur = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const MortgageCalculator = () => {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(3.5);
  const [years, setYears] = useState(20);
  const { t } = useLanguage();

  const { monthly, totalPaid, totalInterest } = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    if (monthlyRate === 0) {
      const m = amount / n;
      return { monthly: m, totalPaid: amount, totalInterest: 0 };
    }
    const m = (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const tp = m * n;
    return { monthly: m, totalPaid: tp, totalInterest: tp - amount };
  }, [amount, rate, years]);

  return (
    <section className="py-20 md:py-28 section-dark" id="kalkulator">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 border border-primary/30 rounded-full">
              <Calculator size={14} className="text-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-body font-medium">
                {t(tr.calculator.badge)}
              </span>
            </div>
            <h2 className="text-[24px] font-body font-medium text-white mb-3">
              {t(tr.calculator.title)} <span className="gold-gradient-text">{t(tr.calculator.titleHighlight)}</span>
            </h2>
            <p className="text-white/50 font-body max-w-xl mx-auto">{t(tr.calculator.subtitle)}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-6 md:p-10">
            <div className="space-y-10 mb-10">
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-white/70 text-sm font-body flex items-center gap-2">
                    <TrendingUp size={14} className="text-primary" />
                    {t(tr.calculator.loanAmount)}
                  </label>
                  <span className="text-white font-heading font-bold text-lg">{formatEur(amount)}</span>
                </div>
                <Slider value={[amount]} onValueChange={(v) => setAmount(v[0])} min={20000} max={300000} step={5000}
                  className="[&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:bg-dark" />
                <div className="flex justify-between text-white/30 text-xs mt-2 font-body">
                  <span>20.000 €</span><span>300.000 €</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-white/70 text-sm font-body flex items-center gap-2">
                    <Percent size={14} className="text-primary" />
                    {t(tr.calculator.interestRate)}
                  </label>
                  <span className="text-white font-heading font-bold text-lg">{rate.toFixed(1)}%</span>
                </div>
                <Slider value={[rate * 10]} onValueChange={(v) => setRate(v[0] / 10)} min={10} max={100} step={1}
                  className="[&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:bg-dark" />
                <div className="flex justify-between text-white/30 text-xs mt-2 font-body">
                  <span>1.0%</span><span>10.0%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-white/70 text-sm font-body flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    {t(tr.calculator.repaymentPeriod)}
                  </label>
                  <span className="text-white font-heading font-bold text-lg">{years} {t(tr.calculator.years)}</span>
                </div>
                <Slider value={[years]} onValueChange={(v) => setYears(v[0])} min={5} max={30} step={1}
                  className="[&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:bg-dark" />
                <div className="flex justify-between text-white/30 text-xs mt-2 font-body">
                  <span>5 {t(tr.calculator.years)}</span><span>30 {t(tr.calculator.years)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-5 text-center">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-2 font-body">{t(tr.calculator.monthlyPayment)}</p>
                <p className="text-primary font-heading font-bold text-2xl md:text-3xl">{formatEur(monthly)}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 text-center">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-2 font-body">{t(tr.calculator.totalPaid)}</p>
                <p className="text-white font-heading font-bold text-xl">{formatEur(totalPaid)}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 text-center">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-2 font-body">{t(tr.calculator.totalInterest)}</p>
                <p className="text-white font-heading font-bold text-xl">{formatEur(totalInterest)}</p>
              </div>
            </div>

            <p className="text-white/30 text-xs text-center mt-6 font-body">{t(tr.calculator.disclaimer)}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MortgageCalculator;
