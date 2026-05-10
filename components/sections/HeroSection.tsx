"use client";

import { useI18n } from "@/lib/i18n";

const HERO_IMAGE = "https://res.cloudinary.com/djgv9sagr/image/upload/v1778376768/hero-banner-1_olx4y6.png";
const WHATSAPP_NUMBER = "50660557155";

export function HeroSection() {
  const { t } = useI18n();

  function scrollToBooking() {
    const el = document.getElementById("booking");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  }

  function openWhatsApp() {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener");
  }

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Gradient only on RIGHT side so left side (logo/mask in image) stays clear */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 40%, transparent 65%)",
          }}
        />
      </div>

      {/* Diagonal bottom clip */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          background: "#023047",
          clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Content — pushed to the right half */}
      <div className="relative z-20 w-full container-max py-32 md:py-40 flex flex-col items-end">
        <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col items-start">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.1s", background: "#2D6A4F", color: "#FFB703" }}
          >
            <span aria-hidden="true">🌴</span>
            {t.hero.badge}
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t.hero.headline}
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl text-white/80 mb-10 font-light tracking-wide animate-fade-in-up"
            style={{ animationDelay: "0.35s" }}
          >
            {t.hero.subheadline}
          </p>

          {/* Trust badges */}
          <div
            className="flex flex-wrap items-center gap-3 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.45s" }}
            aria-label="Service highlights"
          >
            {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map((text) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,183,3,0.15)",
                  border: "1px solid #FFB703",
                  color: "#FFB703",
                }}
              >
                ✓ {text}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.55s" }}
          >
            <button
              onClick={scrollToBooking}
              className="inline-flex items-center gap-2 font-bold text-lg px-8 py-4 rounded-full text-white transition-all duration-300 hover:scale-105 shadow-2xl"
              style={{ background: "#D00000" }}
            >
              {t.hero.cta}
            </button>

            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-3 font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              style={{ border: "2px solid #FFB703", color: "#FFB703", background: "transparent" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.hero.ctaWhatsapp}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
