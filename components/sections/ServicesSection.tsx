"use client";

import { useI18n } from "@/lib/i18n";

const SERVICE_ICONS = {
  airport: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#d0f3e4" />
      <path
        d="M8 24l5-2 7-10 3 3-5 4 8 5-2 2-8-3-3 3-2-2 3-3-6 3z"
        fill="#236b47"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  tours: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#d0f3e4" />
      <path d="M10 28c3-6 6-4 10-8s7-8 10-6" stroke="#236b47" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="17" r="4" stroke="#236b47" strokeWidth="2" />
      <path d="M20 21v7" stroke="#236b47" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  executive: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#d0f3e4" />
      <rect x="8" y="18" width="24" height="10" rx="3" stroke="#236b47" strokeWidth="2" />
      <path d="M12 18v-3a1 1 0 011-1h14a1 1 0 011 1v3" stroke="#236b47" strokeWidth="2" />
      <circle cx="13" cy="30" r="2" fill="#236b47" />
      <circle cx="27" cy="30" r="2" fill="#236b47" />
    </svg>
  ),
};

export function ServicesSection() {
  const { t } = useI18n();

  const services = [
    {
      key: "airport" as const,
      features: ["A/C & WiFi", "GPS Navigation", "Full Insurance", "Door-to-door"],
    },
    {
      key: "tours" as const,
      features: ["Custom Itinerary", "Any Budget", "Any Interest", "Bilingual Guide"],
    },
    {
      key: "executive" as const,
      features: ["Clean Vehicle", "Sober Driver", "Professional", "Punctual"],
    },
  ];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-padding bg-stone-50"
    >
      <div className="container-max">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-emerald-600 text-sm font-bold uppercase tracking-widest mb-3">
            What We Do
          </span>
          <h2
            id="services-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-4"
          >
            {t.services.title}
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const svc = t.services[service.key];
            return (
              <article
                key={service.key}
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-stone-100 overflow-hidden"
                aria-labelledby={`service-${service.key}-title`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Decorative corner */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at top right, #d0f3e4, transparent 70%)",
                  }}
                />

                {/* Icon */}
                <div className="mb-5">{SERVICE_ICONS[service.key]}</div>

                {/* Title */}
                <h3
                  id={`service-${service.key}-title`}
                  className="font-serif text-xl font-bold text-stone-900 mb-3"
                >
                  {svc.title}
                </h3>

                {/* Description */}
                <p className="text-stone-500 text-sm leading-relaxed mb-6">
                  {svc.desc}
                </p>

                {/* Feature tags */}
                <ul
                  className="flex flex-wrap gap-2"
                  aria-label={`Features of ${svc.title}`}
                >
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-16 rounded-3xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #133d2a, #177a8f)",
          }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-10 md:px-12 md:py-12">
            <div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-white mb-1">
                Ready to explore Costa Rica?
              </p>
              <p className="text-white/70 text-sm">
                Book a free 1-hour consultation with your personal travel expert.
              </p>
            </div>
            <a
              href="#booking"
              className="shrink-0 bg-white text-emerald-800 font-bold px-7 py-3.5 rounded-full hover:bg-amber-300 hover:text-stone-900 transition-all duration-300 shadow-lg hover:scale-105"
              aria-label="Scroll to booking form"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
