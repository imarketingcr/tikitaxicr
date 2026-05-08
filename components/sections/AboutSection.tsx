"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export function AboutSection() {
  const { t } = useI18n();

  const trustPoints = [
    { icon: "🗣️", label: t.about.trust1Label, detail: t.about.trust1Detail },
    { icon: "🛡️", label: t.about.trust2Label, detail: t.about.trust2Detail },
    { icon: "📍", label: t.about.trust3Label, detail: t.about.trust3Detail },
    { icon: "⭐", label: t.about.trust4Label, detail: t.about.trust4Detail },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding bg-white"
    >
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Photo column */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative">
              {/* Decorative ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-full opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, #023047 0%, transparent 70%)",
                }}
              />
              {/* Caricature image */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-emerald-900/20 ring-1 ring-emerald-100">
                <Image
                  src="https://res.cloudinary.com/djgv9sagr/image/upload/v1778199872/caricatura_vr5by5.jpg"
                  alt="Luis Núñez — TikiTaxi CR driver and tour expert"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 256px, 320px"
                  quality={90}
                />
              </div>

              {/* Floating badge */}
              <div
                aria-hidden="true"
                className="absolute -bottom-2 -right-2 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
              >
                🌴 {t.about.badge}
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">
              {t.about.eyebrow}
            </span>
            <h2
              id="about-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight"
            >
              {t.about.heading}<br />
              <span className="text-emerald-700">{t.about.headingSub}</span>
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-8">
              {t.about.bio}
            </p>

            <ul className="space-y-5" aria-label={t.about.trust1Label}>
              {trustPoints.map((point) => (
                <li key={point.label} className="flex items-start gap-4">
                  <span
                    className="text-2xl mt-0.5 shrink-0"
                    aria-hidden="true"
                  >
                    {point.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-stone-800 text-sm">
                      {point.label}
                    </p>
                    <p className="text-stone-500 text-sm leading-snug">
                      {point.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("booking");
                  if (!el) return;
                  const top = el.getBoundingClientRect().top + window.scrollY - 88;
                  window.scrollTo({ top, behavior: "smooth" });
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 shadow-md focus-visible:outline-emerald-600"
              >
                {t.hero.cta}
              </button>
              <a
                href="https://wa.me/50660557155"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold text-sm hover:text-emerald-500 underline underline-offset-4 transition-colors"
              >
                {t.hero.ctaWhatsapp} →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
