"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const ICON_COLORS = ["#2D6A4F", "#FFB703", "#D00000", "#2D6A4F"];

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
      className="section-padding bg-[#023047]"
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
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/50 ring-1 ring-white/10">
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
                className="absolute -bottom-2 -right-2 text-xs font-bold px-4 py-2 rounded-full shadow-lg"
                style={{ background: "#2D6A4F", color: "#FFB703" }}
              >
                🌴 {t.about.badge}
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">
              {t.about.eyebrow}
            </span>
            <h2
              id="about-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            >
              {t.about.heading}<br />
              <span className="text-amber-400">{t.about.headingSub}</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {t.about.bio}
            </p>

            <ul className="space-y-5" aria-label={t.about.trust1Label}>
              {trustPoints.map((point, index) => (
                <li key={point.label} className="flex items-start gap-4">
                  <span
                    className="text-2xl mt-0.5 shrink-0"
                    aria-hidden="true"
                    style={{ color: ICON_COLORS[index % ICON_COLORS.length] }}
                  >
                    {point.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {point.label}
                    </p>
                    <p className="text-white/60 text-sm leading-snug">
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
                className="bg-[#D00000] hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 shadow-md focus-visible:outline-red-500"
              >
                {t.hero.cta}
              </button>
              <a
                href="https://wa.me/50660557155"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 font-semibold text-sm hover:text-amber-300 underline underline-offset-4 transition-colors"
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
