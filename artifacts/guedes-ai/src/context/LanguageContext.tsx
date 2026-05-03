import { createContext, useContext, useState } from "react";
import { translations } from "@/i18n/translations";

export type Language = "pt" | "en" | "es";

type Translations = typeof translations.pt;

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "pt",
  setLang: () => {},
  t: translations.pt,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Language) ?? "pt";
    }
    return "pt";
  });

  const handleSetLang = (l: Language) => {
    localStorage.setItem("lang", l);
    setLang(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
