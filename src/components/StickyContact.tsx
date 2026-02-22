import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import tr from "@/i18n/translations";

const StickyContact = () => {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/381601234567?text=Zdravo, zainteresovan/a sam za stanove"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 hover:scale-110 transition-transform"
        aria-label={t(tr.sticky.whatsapp)}
      >
        <MessageCircle size={24} className="text-white" />
      </a>
      <a
        href="tel:+381601234567"
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
        aria-label={t(tr.sticky.call)}
      >
        <Phone size={24} className="text-primary-foreground" />
      </a>
    </div>
  );
};

export default StickyContact;
