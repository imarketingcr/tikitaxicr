"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const ICON_COLORS = ["#D4A017", "#8B0000", "#D4A017", "#8B0000"];

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
      className="section-padding"
      style={{ background: "#1a1a1a" }}
    >
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Photo column */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #1B4332 0%, transparent 70%)" }}
              />
              <div
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl"
                style={{ border: "4px solid rgba(212,160,23,0.3)", boxShadow: "0 0 40px rgba(27,67,50,0.4)" }}
              >
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
                style={{ background: "#1B4332", color: "#D4A017" }}
              >
                🌴 {t.about.badge}
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <span
              className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "#D4A017" }}
            >
              {t.about.eyebrow}
            </span>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
              style={{ color: "#D4A017", fontFamily: "var(--font-righteous-var), cursive" }}
            >
              {t.about.heading}<br />
              <span style={{ color: "#D4A017" }}>{t.about.headingSub}</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(245,240,232,0.7)" }}>
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
                    <p className="font-semibold text-sm" style={{ color: "#F5F0E8" }}>
                      {point.label}
                    </p>
                    <p className="text-sm leading-snug" style={{ color: "rgba(245,240,232,0.6)" }}>
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
                className="text-white font-bold px-7 py-3.5 uppercase tracking-wide transition-all duration-300 hover:scale-105 shadow-md"
                style={{
                  background: "linear-gradient(135deg, #8B0000, #5a0000)",
                  borderRadius: "6px",
                  fontFamily: "var(--font-righteous-var), cursive",
                }}
              >
                {t.hero.cta}
              </button>
              <a
                href="https://wa.me/50660557155"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sm underline underline-offset-4 transition-colors"
                style={{ color: "#D4A017" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#e6b82a"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#D4A017"; }}
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
