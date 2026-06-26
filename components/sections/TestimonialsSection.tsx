"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n";

export function TestimonialsSection() {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const total = t.testimonials.list.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section
      id="reviews"
      className="bg-[#0C1109] border-t border-b border-white/5"
    >
      <div className="container-max section-padding">
        {/* Heading */}
        <div className="text-center mb-12">
          <div
            className="text-xs font-extrabold tracking-[0.26em] uppercase mb-3"
            style={{ color: "#C8842B", fontFamily: "var(--font-hanken)" }}
          >
            {t.testimonials.eyebrow}
          </div>
          <h2
            className="text-4xl sm:text-5xl uppercase"
            style={{
              fontFamily: "var(--font-anton)",
              letterSpacing: "0.012em",
              color: "#ECE4D3",
              lineHeight: 0.98,
            }}
          >
            {t.testimonials.title}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Review Card */}
          <div className="bg-[#11160D] border border-white/7 rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col justify-center">
            <p
              className="text-lg md:text-xl text-[#CFC8B8] mb-6 italic leading-relaxed"
              style={{ fontFamily: "var(--font-hanken)" }}
            >
              "{t.testimonials.list[current].text}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="text-base font-bold text-[#ECE4D3] mb-1"
                  style={{ fontFamily: "var(--font-hanken)" }}
                >
                  {t.testimonials.list[current].name}
                </div>
                <div
                  className="text-sm text-[#7D776A]"
                  style={{ fontFamily: "var(--font-hanken)" }}
                >
                  {t.testimonials.list[current].from}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-[#6CAE3B]/20 hover:bg-[#6CAE3B]/30 border border-[#6CAE3B]/40 flex items-center justify-center transition-all"
                  aria-label="Previous review"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#A4C93F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 12L6 8l4-4"/>
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-[#6CAE3B]/20 hover:bg-[#6CAE3B]/30 border border-[#6CAE3B]/40 flex items-center justify-center transition-all"
                  aria-label="Next review"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#A4C93F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 12l4-4-4-4"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {t.testimonials.list.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: i === current ? "#6CAE3B" : "rgba(164,201,63,0.3)",
                  width: i === current ? "24px" : "8px",
                }}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
