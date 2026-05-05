"use client";

import { useI18n } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background — tropical gradient with overlay */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, #0d2b1e 0%, #133d2a 30%, #177a8f 70%, #0f5e6e 100%)",
        }}
      />

      {/* Animated decorative circles */}
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #3da373, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-10 -left-20 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #2ebad7, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #f59e0b, transparent 70%)",
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
        {/* Pre-headline badge */}
        <div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span aria-hidden="true">🌴</span>
          Costa Rica
        </div>

        {/* Main headline */}
        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up max-w-4xl"
          style={{ animationDelay: "0.2s" }}
        >
          {t.hero.headline}
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 font-light tracking-wide animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
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
              <span
                className="text-emerald-400 font-bold"
                aria-hidden="true"
              >
                {badge.icon}
              </span>
              {badge.text}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.55s" }}
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl shadow-emerald-900/50 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 group focus-visible:outline-white"
            aria-label={t.hero.cta}
          >
            {t.hero.cta}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="group-hover:translate-y-0.5 transition-transform"
            >
              <path
                d="M10 3v14M3 10l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-36 left-1/2 -translate-x-1/2 animate-bounce"
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="text-white/40"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
