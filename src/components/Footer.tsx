import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { href: "#stanovi", label: t(tr.nav.apartments) },
    { href: "#prednosti", label: t(tr.nav.advantages) },
    { href: "#investicija", label: t(tr.nav.investment) },
    { href: "#kontakt", label: t(tr.nav.contact) },
  ];

  return (
    <footer className="bg-dark border-t border-white/5 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="font-heading text-xl font-bold text-primary tracking-wide">
            RESIDENCES
          </a>
          <div className="flex gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-white/40 text-sm hover:text-primary transition-colors font-body">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-white/30 text-xs font-body">
            © {new Date().getFullYear()} Residences. {t(tr.footer.rights)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
