"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n";

const MASK_URL = "https://res.cloudinary.com/djgv9sagr/image/upload/v1778334732/mascara-lower_qxlkvh.png";
const SLIDE2_IMG = "https://res.cloudinary.com/djgv9sagr/image/upload/v1778462820/guanacaste_dco6gb.webp";
const SLIDE3_IMG = "https://res.cloudinary.com/djgv9sagr/image/upload/v1778462654/volcan_qctsfo.webp";

const CTA_STYLE: React.CSSProperties = {
  background: "#8B0000",
  color: "white",
  padding: "14px 32px",
  borderRadius: "6px",
  fontFamily: "var(--font-righteous-var), cursive",
  fontSize: "1.1rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  border: "none",
  cursor: "pointer",
  display: "inline-block",
};

export function HeroSection() {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const TOTAL = 3;

  const next = useCallback(() => setCurrent((c) => (c + 1) % TOTAL), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + TOTAL) % TOTAL), []);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  function scrollToBooking() {
    const el = document.getElementById("booking");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }

  function CtaButton() {
    return (
      <button
        onClick={scrollToBooking}
        style={CTA_STYLE}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#5a0000";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#8B0000";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        }}
      >
        {t.hero.cta}
      </button>
    );
  }

  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* ── Slide 1 — Composited / no bg image ── */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        aria-hidden={current !== 0}
        style={{
          opacity: current === 0 ? 1 : 0,
          pointerEvents: current === 0 ? "auto" : "none",
          background: "radial-gradient(ellipse at 30% 50%, rgba(27,67,50,0.5) 0%, #121212 65%)",
          zIndex: 1,
        }}
      >
        <div className="h-full flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-6xl flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-center lg:gap-0">
            {/* Mask — 55% on desktop */}
            <div className="flex justify-center lg:w-[55%] mb-6 lg:mb-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MASK_URL}
                alt="TikiTaxi CR Tiki Mask"
                className="w-4/5 max-h-[40vh] object-contain lg:max-h-none lg:w-4/5"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(27,67,50,0.6))",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
            </div>

            {/* Text — 45% on desktop */}
            <div className="flex flex-col items-center gap-4 lg:w-[45%] lg:items-start lg:gap-6">
              <h1
                style={{
                  fontFamily: "var(--font-righteous-var), cursive",
                  color: "#D4A017",
                  fontSize: "clamp(2rem, 6vw, 4.5rem)",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                GOOD VIBES<br />GOOD RIDES
              </h1>
              <p style={{ color: "#F5F0E8", fontSize: "clamp(1rem, 2vw, 1.2rem)", margin: 0 }}>
                Costa Rica&#39;s Premier Experience 🌴
              </p>
              <CtaButton />
            </div>
          </div>
        </div>
      </div>

      {/* ── Slide 2 — Guanacaste ── */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        aria-hidden={current !== 1}
        style={{
          opacity: current === 1 ? 1 : 0,
          pointerEvents: current === 1 ? "auto" : "none",
          backgroundImage: `url('${SLIDE2_IMG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} aria-hidden="true" />
        <div className="relative h-full flex items-center justify-center px-4" style={{ zIndex: 2 }}>
          <div className="text-center">
            <h1
              style={{
                fontFamily: "var(--font-righteous-var), cursive",
                color: "white",
                fontSize: "clamp(1.6rem, 4vw, 3.5rem)",
                textTransform: "uppercase",
                textShadow: "2px 4px 12px rgba(0,0,0,0.9)",
                margin: "0 0 0.5rem",
              }}
            >
              NOSOTROS TE TRANSPORTAMOS
            </h1>
            <p
              style={{
                fontFamily: "var(--font-righteous-var), cursive",
                color: "#D4A017",
                fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
                textShadow: "2px 4px 12px rgba(0,0,0,0.9)",
                margin: "0 0 2rem",
              }}
            >
              WE RIDE YOU
            </p>
            <CtaButton />
          </div>
        </div>
      </div>

      {/* ── Slide 3 — Volcán ── */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        aria-hidden={current !== 2}
        style={{
          opacity: current === 2 ? 1 : 0,
          pointerEvents: current === 2 ? "auto" : "none",
          backgroundImage: `url('${SLIDE3_IMG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} aria-hidden="true" />
        <div className="relative h-full flex items-center justify-center px-4" style={{ zIndex: 2 }}>
          <div className="text-center">
            <h1
              style={{
                fontFamily: "var(--font-righteous-var), cursive",
                color: "white",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                textTransform: "uppercase",
                textShadow: "2px 4px 12px rgba(0,0,0,0.9)",
                margin: "0 0 0.5rem",
              }}
            >
              VIAJE TRANQUILO
            </h1>
            <p
              style={{
                fontFamily: "var(--font-righteous-var), cursive",
                color: "#D4A017",
                fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
                textShadow: "2px 4px 12px rgba(0,0,0,0.9)",
                margin: "0 0 2rem",
              }}
            >
              SMOOTH RIDE
            </p>
            <CtaButton />
          </div>
        </div>
      </div>

      {/* ── Diagonal bottom clip ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: "#121212",
          clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)",
          zIndex: 10,
        }}
      />

      {/* ── Prev arrow ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110"
        style={{
          left: "1rem",
          zIndex: 20,
          background: "rgba(18,18,18,0.75)",
          color: "#D4A017",
          border: "1px solid rgba(212,160,23,0.4)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Next arrow ── */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110"
        style={{
          right: "1rem",
          zIndex: 20,
          background: "rgba(18,18,18,0.75)",
          color: "#D4A017",
          border: "1px solid rgba(212,160,23,0.4)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Dot indicators ── */}
      <div
        className="absolute flex gap-2"
        style={{ bottom: "4.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 20 }}
        role="tablist"
        aria-label="Slide indicators"
      >
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={current === i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            style={{
              width: current === i ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: current === i ? "#D4A017" : "rgba(212,160,23,0.35)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
