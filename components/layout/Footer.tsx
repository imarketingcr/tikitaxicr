"use client";

import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-[#070A06] border-t border-white/6" role="contentinfo">
      {/* Gradient Border */}
      <div
        className="h-0.5"
        style={{
          background: "linear-gradient(90deg, #6CAE3B, #A4C93F, #F3B71E, #E0681B, #D8261D)",
        }}
      ></div>

      <div className="container-max py-14">
        <div className="flex flex-wrap gap-8 items-center justify-between mb-8">
          {/* Logo */}
          <div
            className="inline-flex flex-col leading-none"
            style={{
              fontFamily: "var(--font-anton)",
              letterSpacing: "0.02em",
            }}
          >
            <span
              className="text-4xl"
              style={{
                background: "linear-gradient(95deg, #6CAE3B 0%, #A4C93F 26%, #F3B71E 54%, #E0681B 78%, #D8261D 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              TIKIS
            </span>
            <span
              className="text-2xl italic text-[#ECE4D3]"
              style={{
                transform: "skewX(-9deg)",
                transformOrigin: "left",
                letterSpacing: "0.05em",
              }}
            >
              TAXI
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>
            <a
              href="https://www.tikitaxicr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CFC8B8] hover:text-[#F3B71E] transition-colors"
            >
              TIKITAXICR.com
            </a>
            <a
              href="#"
              className="text-[#CFC8B8] hover:text-[#F3B71E] transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-[#CFC8B8] hover:text-[#F3B71E] transition-colors"
            >
              Google Maps
            </a>
            <a
              href="https://wa.me/50660557155"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CFC8B8] hover:text-[#F3B71E] transition-colors"
            >
              WhatsApp 24/7
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pt-5 border-t border-white/5">
          <div
            className="text-lg uppercase text-[#6CAE3B] mb-2.5"
            style={{
              fontFamily: "var(--font-anton)",
              letterSpacing: "0.05em",
              lineHeight: 1.3,
            }}
          >
            {t.footer.tagline}
          </div>
          <div
            className="text-xs text-[#5E5950]"
            style={{ fontFamily: "var(--font-hanken)" }}
          >
            {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
