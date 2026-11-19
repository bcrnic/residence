import { useLayoutEffect, useRef, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { apartments, formatPrice, type Apartment } from "@/data/apartments";
import ScrollReveal from "./ScrollReveal";
import Lightbox from "./Lightbox";
import FloorPlan from "./FloorPlan";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

const roomFilters = [0, 2, 2.5, 3, 4, 5];

const roomsLabel = (r: number) => String(r).replace(".", ",");

const ApartmentsGallery = () => {
  const [activeFilter, setActiveFilter] = useState(0);
  const [hovered, setHovered] = useState<Apartment>(apartments.find((a) => a.available) ?? apartments[0]);
  const [selectedApt, setSelectedApt] = useState<Apartment | null>(null);
  const [lightboxApt, setLightboxApt] = useState<Apartment | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { t } = useLanguage();
  const list = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  const filtered = (activeFilter === 0 ? apartments : apartments.filter((a) => a.rooms === activeFilter))
    .slice()
    .sort((a, b) => Number(b.available) - Number(a.available) || a.price - b.price);

  const availableCount = apartments.filter((a) => a.available).length;

  // Rows slide in on first view and again when the filter changes
  useLayoutEffect(() => {
    const el = list.current;
    if (!el || prefersReducedMotion()) return;
    const rows = el.querySelectorAll<HTMLElement>("[data-apt-row]");
    const ctx = gsap.context(() => {
      if (firstRun.current) {
        gsap.set(rows, { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(rows, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.05, ease: "expo.out" }),
        });
      } else {
        gsap.fromTo(rows, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.03, ease: "expo.out" });
        ScrollTrigger.refresh();
      }
    }, el);
    firstRun.current = false;
    return () => ctx.revert();
  }, [activeFilter]);

  const openLightbox = (apt: Apartment, index = 0) => {
    setLightboxApt(apt);
    setLightboxIndex(index);
  };

  return (
    <section id="stanovi" className="py-24 md:py-36 bg-secondary/60 border-y border-border">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="eyebrow mb-5">{t(tr.apartments.badge)}</p>
              <h2 className="font-heading text-[36px] md:text-[52px] font-light leading-[1.05] text-foreground">
                {t(tr.apartments.title)} {t(tr.apartments.titleHighlight)}
              </h2>
            </div>
            <p className="text-muted-foreground font-body">
              {availableCount} / {apartments.length} {t({ sr: "slobodno", en: "available" })}
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 border-b border-border pb-4" role="tablist">
          {roomFilters.map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={activeFilter === r}
              onClick={() => {
                setActiveFilter(r);
                const pool = r === 0 ? apartments : apartments.filter((a) => a.rooms === r);
                const first = pool.filter((a) => a.available).sort((a, b) => a.price - b.price)[0] ?? pool[0];
                if (first) setHovered(first);
              }}
              className={`text-sm tracking-wide transition-colors pb-1 border-b ${
                activeFilter === r ? "text-foreground border-foreground" : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {r === 0 ? t(tr.apartments.all) : `${roomsLabel(r)} ${t(tr.apartments.rooms)}`}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* List */}
          <div ref={list} className="lg:col-span-7">
            <div className="hidden md:grid grid-cols-[1.2fr_1fr_1fr_1fr_1.3fr_24px] gap-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground pb-3">
              <span>{t({ sr: "Stan", en: "Unit" })}</span>
              <span>{t({ sr: "Sobe", en: "Rooms" })}</span>
              <span>m²</span>
              <span>{t({ sr: "Sprat", en: "Floor" })}</span>
              <span className="text-right">{t({ sr: "Cena", en: "Price" })}</span>
              <span />
            </div>
            {filtered.map((apt) => (
              <button
                key={apt.id}
                data-apt-row
                type="button"
                disabled={!apt.available}
                onMouseEnter={() => setHovered(apt)}
                onFocus={() => setHovered(apt)}
                onClick={() => setSelectedApt(apt)}
                className={`group w-full text-left grid grid-cols-[1fr_auto] md:grid-cols-[1.2fr_1fr_1fr_1fr_1.3fr_24px] gap-x-4 gap-y-1 items-center py-5 border-t border-border transition-colors ${
                  apt.available ? "hover:bg-background/70 cursor-pointer" : "cursor-default"
                } ${hovered.id === apt.id ? "lg:bg-background/70" : ""}`}
              >
                <span className={`font-heading text-2xl ${apt.available ? "text-foreground" : "text-muted-foreground line-through decoration-1"}`}>
                  {apt.id}
                </span>
                <span className="md:hidden text-right font-body text-foreground">
                  {apt.available ? `${formatPrice(apt.price)} €` : t(tr.apartments.sold).toLowerCase()}
                </span>
                <span className="text-muted-foreground text-sm md:text-base">
                  <span className="md:hidden">{roomsLabel(apt.rooms)} {t(tr.apartments.rooms)} · {apt.size} m² · {apt.floor}. {t(tr.apartments.floor)}</span>
                  <span className="hidden md:inline">{roomsLabel(apt.rooms)}</span>
                </span>
                <span className="hidden md:inline text-muted-foreground">{apt.size}</span>
                <span className="hidden md:inline text-muted-foreground">{apt.floor}.</span>
                <span className="hidden md:inline text-right font-body text-foreground">
                  {apt.available ? `${formatPrice(apt.price)} €` : <span className="text-muted-foreground">{t(tr.apartments.sold).toLowerCase()}</span>}
                </span>
                <ArrowUpRight
                  size={18}
                  className={`hidden md:block text-primary transition-transform duration-300 ${apt.available ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : "opacity-0"}`}
                />
              </button>
            ))}
            <div className="border-t border-border" />
          </div>

          {/* Sticky plan preview (desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28 bg-background border border-border p-8">
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-heading text-3xl text-foreground">{hovered.id}</span>
                <span className="text-sm text-muted-foreground">
                  {hovered.size} m² · {hovered.floor}. {t(tr.apartments.floor)}
                </span>
              </div>
              <FloorPlan key={hovered.id} rooms={hovered.rooms} size={hovered.size} className="animate-fade-in-slow" />
              <p className="mt-6 text-xs text-muted-foreground">
                {t({ sr: "Šematski prikaz. Tačne mere su u projektu stana.", en: "Schematic only. Exact dimensions are in the unit's drawings." })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selectedApt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm animate-fade-in-slow"
          onClick={() => setSelectedApt(null)}
          data-lenis-prevent
        >
          <div
            className="bg-background max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedApt(null)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2 pr-8">
              <h3 className="font-heading text-4xl font-light text-foreground">{t({ sr: "Stan", en: "Unit" })} {selectedApt.id}</h3>
              <span className="font-heading text-3xl text-foreground">{formatPrice(selectedApt.price)} €</span>
            </div>
            <p className="text-muted-foreground mb-8">
              {roomsLabel(selectedApt.rooms)} {t(tr.apartments.rooms)} · {selectedApt.size} m² · {selectedApt.floor}. {t(tr.apartments.floor)} · {selectedApt.features.join(", ")}
            </p>

            <FloorPlan rooms={selectedApt.rooms} size={selectedApt.size} />

            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {t({ sr: "Vizualizacija enterijera", en: "Interior visualisation" })}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {selectedApt.gallery.slice(0, 4).map((g, i) => (
                  <button key={i} onClick={() => openLightbox(selectedApt, i)} className="aspect-[4/3] overflow-hidden">
                    <img src={g.src} alt={g.label} className="photo-grade w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <a href="tel:+381601234567" className="flex-1 btn-gold rounded-full !text-sm text-center">
                {t(tr.apartments.callUs)}
              </a>
              <a
                href={`https://wa.me/381601234567?text=${encodeURIComponent(`Zanima me stan ${selectedApt.id}, ${selectedApt.size} m²`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-foreground/30 text-foreground text-sm tracking-wider uppercase px-6 py-4 text-center hover:bg-foreground hover:text-background transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {lightboxApt && (
        <Lightbox
          images={lightboxApt.gallery.map((g) => g.src)}
          labels={lightboxApt.gallery.map((g) => g.label)}
          isOpen={!!lightboxApt}
          onClose={() => setLightboxApt(null)}
          startIndex={lightboxIndex}
        />
      )}
    </section>
  );
};

export default ApartmentsGallery;
