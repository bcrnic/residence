import ScrollReveal from "./ScrollReveal";
import { useEffect, useRef, useState } from "react";
import { HardHat, CheckCircle, Clock, Hammer } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const phaseData = [
  { percent: 100, icon: CheckCircle },
  { percent: 100, icon: CheckCircle },
  { percent: 85, icon: Hammer },
  { percent: 40, icon: Clock },
];

const overallProgress = 75;

const ProgressBar = ({ percent, started }: { percent: number; started: boolean }) => (
  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
    <div className="h-full rounded-full bg-primary transition-all duration-1500 ease-out"
      style={{ width: started ? `${percent}%` : "0%", transitionDuration: "1.5s" }} />
  </div>
);

const ConstructionProgress = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(el); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 section-dark" ref={ref}>
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">{t(tr.construction.badge)}</p>
            <h2 className="font-body text-[24px] font-medium text-white">
              {t(tr.construction.title)} <span className="gold-gradient-text">{t(tr.construction.titleHighlight)}</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HardHat className="text-primary" size={28} />
              <span className="text-white font-heading text-2xl font-bold">
                {started ? overallProgress : 0}% {t(tr.construction.completed)}
              </span>
            </div>
            <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden max-w-2xl mx-auto">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-gold-light transition-all ease-out"
                style={{ width: started ? `${overallProgress}%` : "0%", transitionDuration: "2s" }} />
            </div>
            <p className="text-white/50 text-sm mt-3 font-body">{t(tr.construction.deadline)}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {phaseData.map((phase, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-5 border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <phase.icon size={18} className={phase.percent === 100 ? "text-green-500" : "text-primary"} />
                    <span className="text-white font-medium text-sm font-body">{t(tr.construction.phases[i])}</span>
                  </div>
                  <span className="text-primary font-heading font-bold text-sm">{phase.percent}%</span>
                </div>
                <ProgressBar percent={phase.percent} started={started} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ConstructionProgress;
