import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T extends Record<Lang, string>>(obj: T) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const getStoredLang = (): Lang => {
  try {
    const stored = localStorage.getItem("lang");
    if (stored === "sr" || stored === "en") return stored;
  } catch {}
  return "sr";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(getStoredLang);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try { localStorage.setItem("lang", newLang); } catch {}
  };

  const t = <T extends Record<Lang, string>>(obj: T): string => obj[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
