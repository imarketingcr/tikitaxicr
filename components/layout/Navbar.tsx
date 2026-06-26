"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n, Locale } from "@/lib/i18n";

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
    const sectionIds = ["services", "tribes", "culture", "reviews", "booking"];
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
    setMenuOpen(false);
  }, []);

  const navLinks = [
    { id: "services", label: t.nav.services },
    { id: "tribes", label: t.nav.tribes },
    { id: "culture", label: t.nav.about },
    { id: "reviews", label: t.nav.reviews },
  ];

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "rgba(10,13,8,0.86)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-max py-3 flex items-center gap-4 flex-wrap">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex flex-col leading-none cursor-pointer"
          style={{
            fontFamily: "var(--font-anton)",
            letterSpacing: "0.02em",
          }}
          aria-label="Go to top"
        >
          <span
            className="text-2xl md:text-3xl"
            style={{
              background: "linear-gradient(95deg, #6CAE3B 0%, #A4C93F 26%, #F3B71E 54%, #E0681B 78%, #D8261D 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            TIKIS
          </span>
          <span
            className="text-lg md:text-xl italic text-[#ECE4D3]"
            style={{
              transform: "skewX(-9deg)",
              transformOrigin: "left",
              marginLeft: "1px",
              letterSpacing: "0.05em",
            }}
          >
            TAXI
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 ml-3.5" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm md:text-base font-semibold text-[#CFC8B8] hover:text-[#F3B71E] transition-colors"
              style={{ fontFamily: "var(--font-hanken)" }}
              aria-current={activeSection === link.id ? "page" : undefined}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Lang + CTA */}
        <div className="ml-auto flex items-center gap-2.5 flex-wrap">
          {/* Language Switcher */}
          <div className="flex border border-white/12 rounded-full overflow-hidden">
            <button
              onClick={() => setLocale("es")}
              className="px-3.5 py-1.5 text-xs font-extrabold tracking-wide transition-all"
              style={{
                fontFamily: "var(--font-hanken)",
                background: locale === "es" ? "#6CAE3B" : "transparent",
                color: locale === "es" ? "#0A0D08" : "#9A9483",
              }}
            >
              ES
            </button>
            <button
              onClick={() => setLocale("en")}
              className="px-3.5 py-1.5 text-xs font-extrabold tracking-wide transition-all"
              style={{
                fontFamily: "var(--font-hanken)",
                background: locale === "en" ? "#6CAE3B" : "transparent",
                color: locale === "en" ? "#0A0D08" : "#9A9483",
              }}
            >
              EN
            </button>
          </div>

          {/* Book Now Button */}
          <button
            onClick={() => scrollTo("booking")}
            className="bg-[#D8261D] text-white text-xs md:text-sm font-extrabold tracking-wider uppercase px-4 md:px-5 py-2.5 md:py-3 rounded-lg shadow-lg hover:bg-[#ef3127] transition-all"
            style={{ fontFamily: "var(--font-hanken)" }}
          >
            {t.nav.booking}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#ECE4D3]"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Gradient Border */}
      <div
        className="h-0.5"
        style={{
          background: "linear-gradient(90deg, #6CAE3B, #A4C93F, #F3B71E, #E0681B, #D8261D)",
        }}
      ></div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          className="md:hidden bg-[#11160D] border-t border-white/10"
          aria-label="Mobile navigation"
        >
          <div className="container-max py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-base font-semibold text-[#CFC8B8] hover:text-[#F3B71E] py-2 transition-colors"
                style={{ fontFamily: "var(--font-hanken)" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
