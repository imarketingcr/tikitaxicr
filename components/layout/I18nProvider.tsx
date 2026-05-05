"use client";

import { useState, useEffect } from "react";
import { I18nContext, Locale, translations } from "@/lib/i18n";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("tikitaxi_locale") as Locale | null;
    if (stored === "en" || stored === "es") setLocaleState(stored);
  }, []);

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale);
    localStorage.setItem("tikitaxi_locale", newLocale);
  }

  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t: translations[locale] }}
    >
      {children}
    </I18nContext.Provider>
  );
}
