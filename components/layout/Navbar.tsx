"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n, Locale } from "@/lib/i18n";

const TIKIS_LOGO = "https://res.cloudinary.com/djgv9sagr/image/upload/q_auto,f_auto/v1778334742/tikistaxi-lower_mjbvuc.png";

export function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sectionIds = ["services", "about", "testimonials", "booking"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = window.innerWidth >= 768 ? 80 : 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 8;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const navLinks = [
    { id: "services",     label: t.nav.services },
    { id: "about",        label: locale === "en" ? "About" : "Nosotros" },
    { id: "testimonials", label: locale === "en" ? "Reviews" : "Opiniones" },
  ];

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "rgba(18,18,18,0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "2px solid #D4A017" : "2px solid transparent",
      }}
    >
      <nav
        aria-label="Main navigation"
        className="container-max flex items-center justify-between h-16 md:h-20"
      >
        {/* Logo — TIKIS TAXI only */}
        <a
          href="/"
          className="flex items-center focus-visible:outline-offset-4"
          aria-label="TikiTaxi CR — Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={TIKIS_LOGO}
            alt="TikisTaxi CR"
            style={{ height: "40px", width: "auto" }}
            className="md:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={TIKIS_LOGO}
            alt="TikisTaxi CR"
            style={{ height: "48px", width: "auto" }}
            className="hidden md:block"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium transition-colors duration-200 relative"
              style={{
                color: activeSection === link.id ? "#D4A017" : "#F5F0E8",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#D4A017"; }}
              onMouseLeave={(e) => {
                if (activeSection !== link.id)
                  (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8";
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "#D4A017" }}
                />
              )}
            </button>
          ))}

          <LocaleSwitcher locale={locale} setLocale={setLocale} />

          {/* Book Now CTA */}
          <button
            onClick={() => scrollTo("booking")}
            className="text-white text-sm font-bold px-5 py-2.5 uppercase tracking-wide transition-all duration-200 shadow-md"
            style={{
              background: "#8B0000",
              borderRadius: "6px",
              fontFamily: "var(--font-righteous-var), cursive",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#5a0000"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#8B0000"; }}
          >
            {t.nav.booking}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <LocaleSwitcher locale={locale} setLocale={setLocale} />
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "#F5F0E8" }}
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
          className="md:hidden border-t animate-fade-in"
          style={{ background: "#1a1a1a", borderColor: "rgba(212,160,23,0.2)" }}
        >
          <div className="container-max py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { scrollTo(link.id); setMenuOpen(false); }}
                className="text-left font-medium py-3 px-3 rounded-lg transition-colors text-sm"
                style={{
                  color: activeSection === link.id ? "#D4A017" : "#F5F0E8",
                  background: activeSection === link.id ? "rgba(27,67,50,0.3)" : "transparent",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(27,67,50,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "#D4A017"; }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.id) {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8";
                  }
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { scrollTo("booking"); setMenuOpen(false); }}
              className="mt-2 text-white text-center font-bold py-3 px-5 uppercase tracking-wide text-sm transition-colors"
              style={{
                background: "#8B0000",
                borderRadius: "6px",
                fontFamily: "var(--font-righteous-var), cursive",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#5a0000"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#8B0000"; }}
            >
              {t.nav.booking}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function LocaleSwitcher({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Language selection"
      className="flex items-center rounded-full overflow-hidden"
      style={{ border: "1px solid rgba(212,160,23,0.4)" }}
    >
      {(["en", "es"] as Locale[]).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          aria-label={l === "en" ? "Switch to English" : "Cambiar a Español"}
          className="px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200"
          style={{
            background: locale === l ? "#1B4332" : "transparent",
            color: locale === l ? "#D4A017" : "rgba(245,240,232,0.7)",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
