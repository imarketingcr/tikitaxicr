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

const CARD_BORDER_COLORS = ["#2D6A4F", "#FFB703", "#D00000"];

const SERVICE_ICONS = {
  airport: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="rgba(45,106,79,0.3)" />
      <path
        d="M8 24l5-2 7-10 3 3-5 4 8 5-2 2-8-3-3 3-2-2 3-3-6 3z"
        fill="#2D6A4F"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  tours: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="rgba(45,106,79,0.3)" />
      <path d="M10 28c3-6 6-4 10-8s7-8 10-6" stroke="#2D6A4F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="17" r="4" stroke="#2D6A4F" strokeWidth="2" />
      <path d="M20 21v7" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  executive: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="rgba(45,106,79,0.3)" />
      <rect x="8" y="18" width="24" height="10" rx="3" stroke="#2D6A4F" strokeWidth="2" />
      <path d="M12 18v-3a1 1 0 011-1h14a1 1 0 011 1v3" stroke="#2D6A4F" strokeWidth="2" />
      <circle cx="13" cy="30" r="2" fill="#2D6A4F" />
      <circle cx="27" cy="30" r="2" fill="#2D6A4F" />
    </svg>
  ),
};

export function ServicesSection() {
  const { t } = useI18n();

  const services = (["airport", "tours", "executive"] as const);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-padding bg-[#023047]"
    >
      <div className="container-max">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">
            {t.services.eyebrow}
          </span>
          <h2
            id="services-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-4"
          >
            {t.services.title}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((key, i) => {
            const svc = t.services[key];
            return (
              <article
                key={key}
                className="group relative rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                aria-labelledby={`service-${key}-title`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  background: "linear-gradient(135deg, #0D1B2A, #023047)",
                  borderLeft: `4px solid ${CARD_BORDER_COLORS[i]}`,
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle at top right, rgba(255,183,3,0.1), transparent 70%)" }}
                />
                <div className="mb-5">{SERVICE_ICONS[key]}</div>
                <h3 id={`service-${key}-title`} className="font-serif text-xl font-bold text-amber-400 mb-3">
                  {svc.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{svc.desc}</p>
                <ul className="flex flex-wrap gap-2" aria-label={`Features of ${svc.title}`}>
                  {svc.features.map((f) => (
                    <li key={f} className="text-xs font-medium bg-emerald-900/40 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800">
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Vehicle photo strip */}
        <div className="mt-14 mb-14">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-white/40 mb-6">
            {t.services.vehicleLabel}
          </p>
          <div className="grid grid-cols-3 gap-3 md:gap-5 rounded-3xl overflow-hidden">
            {TAXI_PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 33vw, 30vw"
                  quality={80}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-16 rounded-3xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #023047, #2D6A4F)",
          }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-10 md:px-12 md:py-12">
            <div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-white mb-1">
                {t.services.ctaTitle}
              </p>
              <p className="text-white/70 text-sm">{t.services.ctaSubtitle}</p>
            </div>
            <a
              href="#booking"
              className="shrink-0 bg-amber-400 text-stone-900 font-bold px-7 py-3.5 rounded-full hover:bg-amber-300 transition-all duration-300 shadow-lg hover:scale-105"
              aria-label="Scroll to booking form"
            >
              {t.services.ctaButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
