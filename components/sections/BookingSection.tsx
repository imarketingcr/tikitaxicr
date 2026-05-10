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
        background: "linear-gradient(180deg, #023047 0%, #0A0A0A 100%)",
      }}
    >
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: info panel */}
          <div className="lg:col-span-2">
            <span className="inline-block text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">
              {t.booking.eyebrow}
            </span>
            <h2
              id="booking-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
            >
              {t.booking.title}
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
              {t.booking.subtitle}
            </p>

            {/* What to expect */}
            <div className="space-y-4">
              {[
                { icon: "📅", title: t.booking.point1Title, desc: t.booking.point1Desc },
                { icon: "🗺️", title: t.booking.point2Title, desc: t.booking.point2Desc },
                { icon: "✅", title: t.booking.point3Title, desc: t.booking.point3Desc },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-0.5 text-amber-400" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp direct link */}
            <div
              className="mt-8 p-4 rounded-2xl"
              style={{ background: "#023047", border: "1px solid rgba(255,183,3,0.3)" }}
            >
              <p className="text-sm text-white/70 mb-2">
                {t.booking.chatDirect}
              </p>
              <a
                href="https://wa.me/50660557155"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors"
                aria-label="Chat on WhatsApp (opens in new tab)"
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
              style={{ background: "rgba(2,48,71,0.8)", border: "1px solid rgba(255,183,3,0.3)" }}
            >
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
