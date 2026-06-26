"use client";

import { useI18n } from "@/lib/i18n";
import { BookingForm } from "@/components/forms/BookingForm";

export function BookingSection() {
  const { t } = useI18n();

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="section-padding relative overflow-hidden"
      style={{
        background: "radial-gradient(120% 80% at 50% 0%, rgba(30,40,22,0.7), rgba(10,13,8,1) 62%)",
      }}
    >
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: info panel */}
          <div className="lg:col-span-2">
            <span
              className="inline-block text-xs font-extrabold tracking-[0.26em] uppercase mb-3"
              style={{ color: "#C8842B", fontFamily: "var(--font-hanken)" }}
            >
              {t.booking.eyebrow}
            </span>
            <h2
              id="booking-heading"
              className="text-3xl sm:text-4xl md:text-5xl uppercase mb-4 leading-tight"
              style={{
                color: "#ECE4D3",
                fontFamily: "var(--font-anton)",
                letterSpacing: "0.012em",
                lineHeight: 0.96,
              }}
            >
              {t.booking.title}
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: "#9A9483", fontFamily: "var(--font-hanken)", maxWidth: "420px" }}
            >
              {t.booking.subtitle}
            </p>

            {/* What to expect */}
            <div className="flex flex-col gap-4">
              {[
                { title: t.booking.point1Title, desc: t.booking.point1Desc },
                { title: t.booking.point2Title, desc: t.booking.point2Desc },
                { title: t.booking.point3Title, desc: t.booking.point3Desc },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span
                    className="flex-none w-7 h-7 rounded-full bg-[#6CAE3B]/14 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6CAE3B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#ECE4D3] mb-0.5" style={{ fontFamily: "var(--font-hanken)" }}>
                      {item.title}
                    </p>
                    <p className="text-sm text-[#9A9483]" style={{ fontFamily: "var(--font-hanken)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp direct link */}
            <div
              className="mt-8 p-4 rounded-2xl"
              style={{ background: "#11160D", border: "1px solid rgba(108,174,59,0.3)" }}
            >
              <p className="text-sm mb-2" style={{ color: "#9A9483", fontFamily: "var(--font-hanken)" }}>
                {t.booking.chatDirect}
              </p>
              <a
                href="https://wa.me/50660557155"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-sm transition-colors"
                style={{ color: "#A4C93F", fontFamily: "var(--font-hanken)" }}
                aria-label="Chat on WhatsApp (opens in new tab)"
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#6CAE3B"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#A4C93F"; }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 2C5.58 2 2 5.58 2 10c0 1.57.43 3.04 1.18 4.3L2 18l3.82-1.16A8 8 0 1010 2z" fill="#25D366" />
                  <path d="M7.5 6.5c-.28 0-.72.1-.87.7-.2.77.13 2.4 1.87 3.93 1.53 1.35 3.2 1.82 4 1.67.7-.13.87-.7.87-.87v-.73c0-.2-.13-.33-.3-.4l-1.3-.53c-.17-.07-.37-.03-.5.1l-.5.5c-.1.1-.27.13-.4.07a4.93 4.93 0 01-2.4-2.37c-.07-.13-.03-.3.07-.4l.5-.5c.13-.13.17-.33.1-.5l-.53-1.3C8.1 6.63 7.97 6.5 7.77 6.5H7.5z" fill="white" />
                </svg>
                {t.booking.chatWhatsapp}
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-3xl p-6 md:p-8"
              style={{
                background: "#11160D",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
              }}
            >
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
