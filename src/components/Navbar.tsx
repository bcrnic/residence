import { useState, useEffect } from "react";
import { Menu, X, Phone, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#stanovi", label: t(tr.nav.apartments) },
    { href: "#prednosti", label: t(tr.nav.advantages) },
    { href: "#investicija", label: t(tr.nav.investment) },
    { href: "#kontakt", label: t(tr.nav.contact) },
  ];

  const toggleLang = () => setLang(lang === "sr" ? "en" : "sr");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="#" className="font-heading text-2xl font-bold tracking-wide text-primary">
          RESIDENCES
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-widest uppercase text-white/80 hover:text-primary transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-white/70 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase"
            aria-label="Change language"
          >
            <Globe size={16} />
            {lang === "sr" ? "EN" : "SR"}
          </button>
          <a
            href="tel:+381601234567"
            className="flex items-center gap-2 btn-gold rounded"
          >
            <Phone size={16} />
            {t(tr.nav.callUs)}
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="text-white/70 hover:text-primary transition-colors text-sm font-medium flex items-center gap-1"
            aria-label="Change language"
          >
            <Globe size={16} />
            {lang === "sr" ? "EN" : "SR"}
          </button>
          <button
            className="text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-md border-t border-white/10 animate-fade-in">
          <div className="flex flex-col items-center gap-6 py-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium tracking-widest uppercase text-white/80 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a href="tel:+381601234567" className="btn-gold text-sm rounded mt-2">
              <Phone size={16} className="inline mr-2" />
              +381 60 123 4567
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
