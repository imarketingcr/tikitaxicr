"use client";

import { useI18n } from "@/lib/i18n";
import Image from "next/image";

export function HeroSection() {
  const { t } = useI18n();

  function scrollToBooking() {
    const el = document.getElementById("booking");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "radial-gradient(125% 95% at 50% -12%, rgba(33,45,25,0.92), rgba(10,13,8,1) 58%), radial-gradient(58% 48% at 76% 42%, rgba(108,174,59,0.12), transparent 70%)",
      }}
    >
      <div className="container-max py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-0.5 bg-[#C8842B]"></span>
              <span
                className="text-xs font-extrabold tracking-[0.26em] uppercase"
                style={{ color: "#C8842B", fontFamily: "var(--font-hanken)" }}
              >
                {t.hero.eyebrow}
              </span>
            </div>

            {/* Logo/Title */}
            <div className="mb-6" style={{ fontFamily: "var(--font-anton)", lineHeight: 0.84, letterSpacing: "0.015em" }}>
              <div
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
                style={{
                  background: "linear-gradient(95deg, #6CAE3B 0%, #A4C93F 24%, #F3B71E 52%, #E0681B 76%, #D8261D 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                TIKIS
              </div>
              <div
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic"
                style={{
                  color: "#ECE4D3",
                  transform: "skewX(-9deg)",
                  transformOrigin: "left",
                  letterSpacing: "0.04em",
                }}
              >
                TAXI
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#ECE4D3] mb-4 max-w-[520px] leading-tight" style={{ fontFamily: "var(--font-hanken)" }}>
              {t.hero.tagline}
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-[#9A9483] mb-8 max-w-[500px]" style={{ fontFamily: "var(--font-hanken)" }}>
              {t.hero.desc}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={scrollToBooking}
                className="bg-[#D8261D] text-white font-extrabold text-sm tracking-wider uppercase px-7 py-4 rounded-xl hover:bg-[#ef3127] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-hanken)" }}
              >
                {t.hero.cta}
              </button>
              <a
                href="https://wa.me/50660557155"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent text-[#A4C93F] font-extrabold text-sm tracking-wider uppercase px-7 py-4 rounded-xl border-2 border-[#A4C93F]/45 hover:bg-[#6CAE3B]/10 hover:border-[#A4C93F] transition-all flex items-center gap-3"
                style={{ fontFamily: "var(--font-hanken)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A4C93F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/>
                </svg>
                {t.hero.ctaWhatsapp}
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-normal text-[#F3B71E]" style={{ fontFamily: "var(--font-anton)" }}>
                  {t.hero.stat1}
                </div>
                <div className="text-sm font-medium text-[#7D776A] mt-1.5" style={{ fontFamily: "var(--font-hanken)" }}>
                  {t.hero.stat1Label}
                </div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div>
                <div className="text-3xl font-normal text-[#F3B71E]" style={{ fontFamily: "var(--font-anton)" }}>
                  {t.hero.stat2}
                </div>
                <div className="text-sm font-medium text-[#7D776A] mt-1.5" style={{ fontFamily: "var(--font-hanken)" }}>
                  {t.hero.stat2Label}
                </div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div>
                <div className="text-3xl font-normal text-[#F3B71E]" style={{ fontFamily: "var(--font-anton)" }}>
                  {t.hero.stat3}
                </div>
                <div className="text-sm font-medium text-[#7D776A] mt-1.5" style={{ fontFamily: "var(--font-hanken)" }}>
                  {t.hero.stat3Label}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tiki Mask */}
          <div className="order-1 lg:order-2 relative flex justify-center items-center">
            {/* Glow background */}
            <div
              className="absolute w-3/4 aspect-square rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(108,174,59,0.22), transparent 68%)",
              }}
            ></div>

            {/* Mask image */}
            <div className="relative w-full max-w-md animate-floaty animate-glow-pulse">
              <Image
                src="/images/masks/mask_hero.png"
                alt="Tiki Mask"
                width={420}
                height={420}
                priority
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
