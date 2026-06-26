"use client";

import { useI18n } from "@/lib/i18n";

export function WordsSection() {
  const { t } = useI18n();

  return (
    <section className="container-max section-padding">
      {/* Heading */}
      <div className="text-center mb-5">
        <div
          className="text-xs font-extrabold tracking-[0.26em] uppercase mb-3"
          style={{ color: "#C8842B", fontFamily: "var(--font-hanken)" }}
        >
          {t.words.eyebrow}
        </div>
        <h2
          className="text-4xl sm:text-5xl uppercase"
          style={{
            fontFamily: "var(--font-anton)",
            letterSpacing: "0.012em",
            color: "#F3B71E",
            lineHeight: 0.98,
          }}
        >
          {t.words.title}
        </h2>
      </div>

      {/* Intro */}
      <p
        className="text-base text-[#9A9483] text-center max-w-2xl mx-auto mb-10"
        style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.6 }}
      >
        {t.words.intro}
      </p>

      {/* Words Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.words.list.map((word, i) => (
          <div
            key={i}
            className="bg-[#11160D] border border-white/7 rounded-2xl p-6 text-center"
          >
            <div
              className="text-3xl mb-2"
              style={{
                fontFamily: "var(--font-anton)",
                letterSpacing: "0.01em",
                color: "#F3B71E",
                lineHeight: 1,
              }}
            >
              {word.cab}
            </div>
            <div
              className="text-xs font-extrabold tracking-[0.16em] uppercase text-[#6CAE3B] mb-3.5"
              style={{ fontFamily: "var(--font-hanken)" }}
            >
              {word.tr}
            </div>
            <p
              className="text-sm text-[#9A9483]"
              style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.55 }}
            >
              {word.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="text-center mt-9 text-base uppercase text-[#6CAE3B]"
        style={{
          fontFamily: "var(--font-anton)",
          letterSpacing: "0.05em",
          lineHeight: 1.3,
        }}
      >
        {t.words.footer}
      </div>
    </section>
  );
}
