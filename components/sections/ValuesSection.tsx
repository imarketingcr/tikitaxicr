"use client";

import { useI18n } from "@/lib/i18n";

const values = [
  {
    key: "protection" as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8842B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 20 5v6c0 5-4 8.5-8 9-4-.5-8-4-8-9V5z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    key: "guidance" as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8842B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7l2.4 4.6L12 17l-2.4-5.4z"/>
      </svg>
    ),
  },
  {
    key: "connection" as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8842B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V11"/>
        <path d="M12 11C8 10 5 11 3 14"/>
        <path d="M12 11C16 10 19 11 21 14"/>
        <path d="M12 11C11 7 12 4 15 2"/>
        <path d="M12 11C12.5 8 11 5 8 4"/>
      </svg>
    ),
  },
  {
    key: "energy" as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8842B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>
      </svg>
    ),
  },
  {
    key: "adventure" as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8842B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20 9 7l4 7 3-4 6 10z"/>
      </svg>
    ),
  },
];

export function ValuesSection() {
  const { t } = useI18n();

  return (
    <section className="container-max section-padding" id="values">
      {/* Heading */}
      <div className="text-center mb-12">
        <div
          className="text-xs font-extrabold tracking-[0.26em] uppercase mb-3"
          style={{ color: "#C8842B", fontFamily: "var(--font-hanken)" }}
        >
          {t.values.eyebrow}
        </div>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl uppercase"
          style={{
            fontFamily: "var(--font-anton)",
            letterSpacing: "0.012em",
            color: "#ECE4D3",
            lineHeight: 0.96,
          }}
        >
          {t.values.title}
        </h2>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {values.map(({ key, icon }) => (
          <div
            key={key}
            className="bg-[#11160D] border border-white/7 rounded-2xl p-6 text-center hover:border-[#A4C93F]/40 hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 rounded-full bg-[#C8842B]/12 flex items-center justify-center mx-auto mb-4">
              {icon}
            </div>
            <div
              className="text-lg uppercase mb-2"
              style={{
                fontFamily: "var(--font-anton)",
                letterSpacing: "0.02em",
                color: "#A4C93F",
                lineHeight: 1.1,
              }}
            >
              {t.values[key].name}
            </div>
            <p
              className="text-sm text-[#9A9483]"
              style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.55 }}
            >
              {t.values[key].desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
