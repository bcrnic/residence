import { useState } from "react";
import { apartments, formatPrice, type Apartment } from "@/data/apartments";
import { BedDouble, Maximize2, Building, ArrowRight, X, Images } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import Lightbox from "./Lightbox";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const roomFilters = [0, 2, 2.5, 3, 4, 5];

const ApartmentsGallery = () => {
  const [activeFilter, setActiveFilter] = useState(0);
  const [selectedApt, setSelectedApt] = useState<Apartment | null>(null);
  const [lightboxApt, setLightboxApt] = useState<Apartment | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { t } = useLanguage();

  const filtered = activeFilter === 0
    ? apartments
    : apartments.filter((a) => a.rooms === activeFilter);

  const openLightbox = (apt: Apartment, index = 0) => {
    setLightboxApt(apt);
    setLightboxIndex(index);
  };

  const availableCount = apartments.filter(a => a.available).length;

  return (
    <section id="stanovi" className="py-24 section-dark">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-body">{t(tr.apartments.badge)}</p>
            <h2 className="font-body text-[24px] font-medium text-white">
              {t(tr.apartments.title)} <span className="gold-gradient-text">{t(tr.apartments.titleHighlight)}</span>
            </h2>
            <p className="text-white/50 mt-4 font-body">
              {t(tr.apartments.only)} <span className="text-primary font-semibold">{availableCount} {t(tr.apartments.apartments)}</span> {t(tr.apartments.available)}
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {roomFilters.map((r) => (
            <button
              key={r}
              onClick={() => setActiveFilter(r)}
              className={`px-5 py-2 rounded text-sm font-medium tracking-wide transition-all duration-300 ${
                activeFilter === r
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {r === 0 ? t(tr.apartments.all) : `${r} ${t(tr.apartments.rooms)}`}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((apt) => (
            <div
              key={apt.id}
              className={`group rounded-lg overflow-hidden card-hover bg-dark-lighter border border-white/5 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 ${
                !apt.available ? "opacity-60" : ""
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden relative cursor-pointer"
                   onClick={() => apt.available && openLightbox(apt)}>
                <img src={apt.thumbnail} alt={apt.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                {!apt.available && (
                  <div className="absolute inset-0 bg-dark/70 flex items-center justify-center">
                    <span className="text-white font-heading text-lg font-bold tracking-wide">{t(tr.apartments.sold)}</span>
                  </div>
                )}
                {apt.available && (
                  <div className="absolute bottom-2 right-2 bg-dark/60 backdrop-blur-sm rounded px-2 py-1 flex items-center gap-1 text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <Images size={12} /> {apt.gallery.length} {t(tr.apartments.photo)}
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-heading text-lg font-semibold text-white">{apt.name}</h3>
                  <span className="text-primary font-heading font-bold text-lg">{formatPrice(apt.price)}€</span>
                </div>
                <div className="flex gap-4 text-white/50 text-sm mb-4">
                  <span className="flex items-center gap-1"><BedDouble size={14} /> {apt.rooms} {t(tr.apartments.rooms)}</span>
                  <span className="flex items-center gap-1"><Maximize2 size={14} /> {apt.size}m²</span>
                  <span className="flex items-center gap-1"><Building size={14} /> {apt.floor}. {t(tr.apartments.floor)}</span>
                </div>
                {apt.available && (
                  <button
                    onClick={() => setSelectedApt(apt)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded font-body font-medium text-base tracking-wide bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {t(tr.apartments.viewDetails)} <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm animate-fade-in-slow"
             onClick={() => setSelectedApt(null)}>
          <div className="bg-dark-lighter border border-white/10 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedApt.thumbnail} alt={selectedApt.name} className="w-full aspect-video object-cover cursor-pointer"
                   onClick={() => openLightbox(selectedApt)} />
              <button onClick={() => setSelectedApt(null)} className="absolute top-3 right-3 bg-dark/60 rounded-full p-2 text-white hover:bg-dark transition-colors">
                <X size={20} />
              </button>
              <div className="absolute bottom-3 left-3 flex gap-1.5">
                {selectedApt.gallery.slice(0, 5).map((g, i) => (
                  <button key={i} onClick={() => openLightbox(selectedApt, i)} className="w-10 h-10 rounded overflow-hidden border border-white/30 hover:border-primary transition-colors">
                    <img src={g.src} alt={g.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-heading text-2xl font-bold text-white">{selectedApt.name}</h3>
                <span className="text-primary font-heading font-bold text-2xl">{formatPrice(selectedApt.price)}€</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded bg-white/5">
                  <BedDouble className="mx-auto text-primary mb-1" size={20} />
                  <p className="text-white text-sm font-semibold">{selectedApt.rooms} {t(tr.apartments.rooms)}</p>
                </div>
                <div className="text-center p-3 rounded bg-white/5">
                  <Maximize2 className="mx-auto text-primary mb-1" size={20} />
                  <p className="text-white text-sm font-semibold">{selectedApt.size}m²</p>
                </div>
                <div className="text-center p-3 rounded bg-white/5">
                  <Building className="mx-auto text-primary mb-1" size={20} />
                  <p className="text-white text-sm font-semibold">{selectedApt.floor}. {t(tr.apartments.floor)}</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-white/50 text-xs uppercase tracking-widest mb-2">{t(tr.apartments.perks)}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApt.features.map((f) => (
                    <span key={f} className="bg-primary/10 text-primary text-xs px-3 py-1 rounded font-medium">{f}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <a href="tel:+381601234567" className="flex-1 btn-gold rounded text-sm text-center">{t(tr.apartments.callUs)}</a>
                <a href={`https://wa.me/381601234567?text=${encodeURIComponent(`Zainteresovan/a sam za ${selectedApt.name}, ${selectedApt.size}m²`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-green-600 text-white font-semibold tracking-wider uppercase px-6 py-4 rounded text-sm text-center hover:bg-green-700 transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxApt && (
        <Lightbox
          images={lightboxApt.gallery.map(g => g.src)}
          labels={lightboxApt.gallery.map(g => g.label)}
          isOpen={!!lightboxApt}
          onClose={() => setLightboxApt(null)}
          startIndex={lightboxIndex}
        />
      )}
    </section>
  );
};

export default ApartmentsGallery;
