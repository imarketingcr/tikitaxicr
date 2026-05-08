"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useI18n } from "@/lib/i18n";

const WHATSAPP_NUMBER = "50688888888"; // TODO: replace with client's real number

const SLIDES = [
  {
    src: "https://res.cloudinary.com/djgv9sagr/image/upload/v1778200924/volcano_cr_zszooa.jpg",
    alt: "Arenal Volcano, Costa Rica",
    subtitleKey: "slide1Subtitle" as const,
    cta: "booking",
  },
  {
    src: "https://res.cloudinary.com/djgv9sagr/image/upload/v1778200912/guanacaste_hcsosl.jpg",
    alt: "Guanacaste beach, Costa Rica",
    subtitleKey: "slide2Subtitle" as const,
    cta: "whatsapp",
  },
] as const;

const INTERVAL = 6000;

export function HeroSection() {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 350);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      goTo((current + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [current, goTo]);

  function scrollToBooking() {
    const el = document.getElementById("booking");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  }

  function openWhatsApp() {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener");
  }

  const slide = SLIDES[current];

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background slides */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-700"
        style={{ opacity: fading ? 0 : 1 }}
        aria-hidden="true"
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              className="object-cover object-center"
              priority={i === 0}
              quality={85}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(13,43,30,0.82) 0%, rgba(19,61,42,0.75) 40%, rgba(23,122,143,0.65) 100%)",
          }}
        />
      </div>

      {/* Diagonal bottom clip */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          background: "var(--color-stone-50, #fafaf9)",
          clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 container-max text-center py-32 md:py-40 flex flex-col items-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span aria-hidden="true">🌴</span>
          Costa Rica
        </div>

        {/* Headline */}
        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up max-w-4xl"
          style={{ animationDelay: "0.2s" }}
        >
          {t.hero.headline}
        </h1>

        {/* Per-slide subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-4 font-light tracking-wide animate-fade-in-up transition-opacity duration-500"
          style={{ animationDelay: "0.35s", opacity: fading ? 0 : 1 }}
        >
          {t.hero[slide.subtitleKey]}
        </p>

        {/* Subheadline */}
        <p
          className="text-base text-white/60 max-w-xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {t.hero.subheadline}
        </p>

        {/* Trust badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.45s" }}
          aria-label="Service highlights"
        >
          {[
            { icon: "✓", text: "Bilingual Service" },
            { icon: "✓", text: "Licensed & Insured" },
            { icon: "✓", text: "Free Consultation" },
          ].map((badge) => (
            <span
              key={badge.text}
              className="flex items-center gap-1.5 text-white/70 text-sm"
            >
              <span className="text-emerald-400 font-bold" aria-hidden="true">
                {badge.icon}
              </span>
              {badge.text}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.55s" }}
        >
          <button
            onClick={scrollToBooking}
            className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl shadow-emerald-900/50 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 group focus-visible:outline-white"
          >
            {t.hero.cta}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="group-hover:translate-y-0.5 transition-transform">
              <path d="M10 3v14M3 10l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 group focus-visible:outline-white"
          >
            {/* WhatsApp icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-green-400">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t.hero.ctaWhatsapp}
          </button>
        </div>

        {/* Slide dots */}
        <div
          className="flex items-center gap-2 mt-10 animate-fade-in-up"
          style={{ animationDelay: "0.65s" }}
          role="tablist"
          aria-label="Slide navigation"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 focus-visible:outline-white ${
                i === current
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 animate-bounce z-20" aria-hidden="true">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-white/40">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
