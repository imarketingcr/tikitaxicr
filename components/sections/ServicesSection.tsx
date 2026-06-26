"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const TAXI_PHOTOS = [
  {
    src: "https://res.cloudinary.com/djgv9sagr/image/upload/v1778199925/taxi-1_uu9h3w.jpg",
    alt: "TikiTaxi CR vehicle — exterior",
  },
  {
    src: "https://res.cloudinary.com/djgv9sagr/image/upload/v1778199892/taxi-2_yms2py.jpg",
    alt: "TikiTaxi CR vehicle — side view",
  },
  {
    src: "https://res.cloudinary.com/djgv9sagr/image/upload/v1778199936/taxi-3_cttwt5.jpg",
    alt: "TikiTaxi CR vehicle — interior",
  },
];

const SERVICE_COLORS = {
  airport: { border: "#6CAE3B", icon: "#6CAE3B" },
  tours: { border: "#F3B71E", icon: "#F3B71E" },
  hourly: { border: "#D8261D", icon: "#D8261D" },
};

export function ServicesSection() {
  const { t } = useI18n();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#0C1109] border-t border-b border-white/5"
    >
      <div className="container-max section-padding">
        {/* Heading */}
        <div className="text-center mb-12">
          <div
            className="text-xs font-extrabold tracking-[0.26em] uppercase mb-3"
            style={{ color: "#C8842B", fontFamily: "var(--font-hanken)" }}
          >
            {t.services.eyebrow}
          </div>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl md:text-6xl uppercase mb-3.5"
            style={{
              fontFamily: "var(--font-anton)",
              letterSpacing: "0.012em",
              color: "#ECE4D3",
              lineHeight: 0.96,
            }}
          >
            {t.services.title}
          </h2>
          <p
            className="text-base md:text-lg text-[#9A9483] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-hanken)" }}
          >
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Airport */}
          <div
            className="bg-[#11160D] border border-white/7 rounded-2xl p-7 relative"
            style={{ borderLeft: `3px solid ${SERVICE_COLORS.airport.border}` }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${SERVICE_COLORS.airport.icon}1F` }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SERVICE_COLORS.airport.icon} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 3 11 14"/>
                <path d="M22 3 15 21l-4-7-7-4z"/>
              </svg>
            </div>
            <h3
              className="text-xl md:text-2xl uppercase mb-3"
              style={{
                fontFamily: "var(--font-anton)",
                letterSpacing: "0.01em",
                color: "#F3B71E",
                lineHeight: 1.05,
              }}
            >
              {t.services.airport.name}
            </h3>
            <p
              className="text-sm md:text-base text-[#9A9483] mb-5"
              style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.6 }}
            >
              {t.services.airport.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.services.airport.chips.map((chip, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    fontFamily: "var(--font-hanken)",
                    color: "#A4C93F",
                    border: "1px solid rgba(164,201,63,0.32)",
                    background: "rgba(108,174,59,0.08)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Tours */}
          <div
            className="bg-[#11160D] border border-white/7 rounded-2xl p-7 relative"
            style={{ borderLeft: `3px solid ${SERVICE_COLORS.tours.border}` }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${SERVICE_COLORS.tours.icon}1F` }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SERVICE_COLORS.tours.icon} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 5h8a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h9"/>
                <circle cx="6" cy="5" r="1.7" fill={SERVICE_COLORS.tours.icon} stroke="none"/>
                <circle cx="18" cy="17" r="1.7" fill={SERVICE_COLORS.tours.icon} stroke="none"/>
              </svg>
            </div>
            <h3
              className="text-xl md:text-2xl uppercase mb-3"
              style={{
                fontFamily: "var(--font-anton)",
                letterSpacing: "0.01em",
                color: "#F3B71E",
                lineHeight: 1.05,
              }}
            >
              {t.services.tours.name}
            </h3>
            <p
              className="text-sm md:text-base text-[#9A9483] mb-5"
              style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.6 }}
            >
              {t.services.tours.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.services.tours.chips.map((chip, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    fontFamily: "var(--font-hanken)",
                    color: "#A4C93F",
                    border: "1px solid rgba(164,201,63,0.32)",
                    background: "rgba(108,174,59,0.08)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Hourly */}
          <div
            className="bg-[#11160D] border border-white/7 rounded-2xl p-7 relative"
            style={{ borderLeft: `3px solid ${SERVICE_COLORS.hourly.border}` }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${SERVICE_COLORS.hourly.icon}1F` }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SERVICE_COLORS.hourly.icon} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 7v5l4 2"/>
              </svg>
            </div>
            <h3
              className="text-xl md:text-2xl uppercase mb-3"
              style={{
                fontFamily: "var(--font-anton)",
                letterSpacing: "0.01em",
                color: "#F3B71E",
                lineHeight: 1.05,
              }}
            >
              {t.services.hourly.name}
            </h3>
            <p
              className="text-sm md:text-base text-[#9A9483] mb-5"
              style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.6 }}
            >
              {t.services.hourly.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.services.hourly.chips.map((chip, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    fontFamily: "var(--font-hanken)",
                    color: "#A4C93F",
                    border: "1px solid rgba(164,201,63,0.32)",
                    background: "rgba(108,174,59,0.08)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TAXI_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 hover:border-[#6CAE3B]/40 transition-all"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
