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

const CARD_BORDER_COLORS = ["#1B4332", "#D4A017", "#8B0000"];
const ICON_COLORS = ["#D4A017", "#8B0000", "#D4A017"];

function ServiceIcon({ color, type }: { color: string; type: "airport" | "tours" | "executive" }) {
  const bg = `${color}33`;
  if (type === "airport") return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill={bg} />
      <path d="M8 24l5-2 7-10 3 3-5 4 8 5-2 2-8-3-3 3-2-2 3-3-6 3z" fill={color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (type === "tours") return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill={bg} />
      <path d="M10 28c3-6 6-4 10-8s7-8 10-6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="17" r="4" stroke={color} strokeWidth="2" />
      <path d="M20 21v7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill={bg} />
      <rect x="8" y="18" width="24" height="10" rx="3" stroke={color} strokeWidth="2" />
      <path d="M12 18v-3a1 1 0 011-1h14a1 1 0 011 1v3" stroke={color} strokeWidth="2" />
      <circle cx="13" cy="30" r="2" fill={color} />
      <circle cx="27" cy="30" r="2" fill={color} />
    </svg>
  );
}

export function ServicesSection() {
  const { t } = useI18n();
  const services = (["airport", "tours", "executive"] as const);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-padding"
      style={{ background: "#121212" }}
    >
      <div className="container-max">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "#D4A017" }}
          >
            {t.services.eyebrow}
          </span>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#D4A017", fontFamily: "var(--font-righteous-var), cursive" }}
          >
            {t.services.title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,240,232,0.7)" }}>
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
                className="group relative rounded-3xl p-8 shadow-sm overflow-hidden transition-all duration-500"
                aria-labelledby={`service-${key}-title`}
                style={{
                  background: "linear-gradient(160deg, #1a1a1a, #0d0d0d)",
                  borderLeft: `4px solid ${CARD_BORDER_COLORS[i]}`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderLeftColor = "#D4A017";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 8px 24px rgba(212,160,23,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderLeftColor = CARD_BORDER_COLORS[i];
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <div className="mb-5">
                  <ServiceIcon type={key} color={ICON_COLORS[i]} />
                </div>
                <h3
                  id={`service-${key}-title`}
                  className="text-xl font-bold mb-3"
                  style={{ color: "#D4A017", fontFamily: "var(--font-righteous-var), cursive" }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(245,240,232,0.7)" }}>
                  {svc.desc}
                </p>
                <ul className="flex flex-wrap gap-2" aria-label={`Features of ${svc.title}`}>
                  {svc.features.map((f) => (
                    <li
                      key={f}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(27,67,50,0.3)",
                        color: "#F5F0E8",
                        border: "1px solid #1B4332",
                      }}
                    >
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
          <p
            className="text-center text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: "rgba(245,240,232,0.4)" }}
          >
            {t.services.vehicleLabel}
          </p>
          <div className="grid grid-cols-3 gap-3 md:gap-5 rounded-3xl overflow-hidden">
            {TAXI_PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className="relative overflow-hidden rounded-2xl shadow-md"
                style={{ aspectRatio: "4/3" }}
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
          className="mt-16 rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #121212, #1B4332)" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-10 md:px-12 md:py-12">
            <div>
              <p
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "#F5F0E8", fontFamily: "var(--font-righteous-var), cursive" }}
              >
                {t.services.ctaTitle}
              </p>
              <p className="text-sm" style={{ color: "rgba(245,240,232,0.7)" }}>
                {t.services.ctaSubtitle}
              </p>
            </div>
            <a
              href="#booking"
              className="shrink-0 font-bold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:scale-105 text-sm uppercase tracking-wide"
              style={{ background: "#D4A017", color: "#121212", fontFamily: "var(--font-righteous-var), cursive" }}
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
