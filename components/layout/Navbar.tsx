"use client";

import { useState, useEffect } from "react";
import { useI18n, Locale } from "@/lib/i18n";

export function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#booking", label: t.nav.booking },
  ];

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="container-max flex items-center justify-between h-16 md:h-20"
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 group focus-visible:outline-offset-4"
          aria-label="TikiTaxi CR — Home"
        >
          <span
            className={`text-xl md:text-2xl font-serif font-bold transition-colors duration-300 ${
              scrolled ? "text-emerald-800" : "text-white"
            }`}
          >
            TikiTaxi
          </span>
          <span
            className={`text-xl md:text-2xl font-serif font-bold transition-colors duration-300 ${
              scrolled ? "text-amber-600" : "text-amber-300"
            }`}
          >
            CR
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-emerald-400 ${
                scrolled ? "text-stone-700" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Language switcher */}
          <LocaleSwitcher
            locale={locale}
            setLocale={setLocale}
            scrolled={scrolled}
          />

          <a
            href="#booking"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-emerald-500/30 hover:scale-105"
            aria-label={t.nav.booking}
          >
            {t.nav.booking}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <LocaleSwitcher
            locale={locale}
            setLocale={setLocale}
            scrolled={scrolled}
          />
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-stone-700 hover:bg-stone-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            {menuOpen ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden bg-white/97 backdrop-blur-md border-t border-stone-100 shadow-lg animate-fade-in"
        >
          <div className="container-max py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-stone-700 font-medium py-3 px-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold py-3 px-5 rounded-full transition-colors"
            >
              {t.nav.booking}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function LocaleSwitcher({
  locale,
  setLocale,
  scrolled,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
  scrolled: boolean;
}) {
  return (
    <div
      role="group"
      aria-label="Language selection"
      className="flex items-center rounded-full overflow-hidden border border-white/30"
    >
      {(["en", "es"] as Locale[]).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          aria-label={l === "en" ? "Switch to English" : "Cambiar a Español"}
          className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            locale === l
              ? "bg-emerald-600 text-white"
              : scrolled
              ? "text-stone-600 hover:bg-stone-100"
              : "text-white/80 hover:bg-white/10"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
