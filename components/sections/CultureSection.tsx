"use client";

import { useI18n } from "@/lib/i18n";
import Image from "next/image";

export function CultureSection() {
  const { t } = useI18n();

  return (
    <section
      id="culture"
      className="bg-[#0C1109] border-t border-b border-white/5"
    >
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative flex justify-center order-2 lg:order-1">
            <div
              className="absolute w-3/4 aspect-square rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(243,183,30,0.14), transparent 68%)",
              }}
            ></div>
            <div className="relative max-w-sm">
              <Image
                src="https://res.cloudinary.com/djgv9sagr/image/upload/v1782467882/mask_lkd849.png"
                alt="Tiki Mask"
                width={340}
                height={340}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div
              className="text-xs font-extrabold tracking-[0.26em] uppercase mb-3"
              style={{ color: "#C8842B", fontFamily: "var(--font-hanken)" }}
            >
              {t.culture.eyebrow}
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl uppercase mb-5"
              style={{
                fontFamily: "var(--font-anton)",
                letterSpacing: "0.01em",
                color: "#ECE4D3",
                lineHeight: 1.02,
              }}
            >
              {t.culture.title}
            </h2>
            <p
              className="text-base text-[#B3AC9C] mb-3.5"
              style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.65 }}
            >
              {t.culture.p1}
            </p>
            <p
              className="text-base text-[#9A9483] mb-7"
              style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.65 }}
            >
              {t.culture.p2}
            </p>

            {/* Features */}
            <div className="flex flex-col gap-3.5">
              <div className="flex gap-3.5 items-start">
                <div className="flex-none w-11 h-11 rounded-xl bg-[#F3B71E]/12 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F3B71E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M12 12v9M8 17l4 4 4-4"/>
                  </svg>
                </div>
                <div>
                  <div
                    className="text-base font-bold text-[#F3B71E] mb-1"
                    style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.2 }}
                  >
                    {t.culture.guide.name}
                  </div>
                  <div
                    className="text-sm text-[#9A9483]"
                    style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.5 }}
                  >
                    {t.culture.guide.desc}
                  </div>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="flex-none w-11 h-11 rounded-xl bg-[#6CAE3B]/12 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6CAE3B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2 20 5v6c0 5-4 8.5-8 9-4-.5-8-4-8-9V5z"/>
                  </svg>
                </div>
                <div>
                  <div
                    className="text-base font-bold text-[#6CAE3B] mb-1"
                    style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.2 }}
                  >
                    {t.culture.protector.name}
                  </div>
                  <div
                    className="text-sm text-[#9A9483]"
                    style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.5 }}
                  >
                    {t.culture.protector.desc}
                  </div>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="flex-none w-11 h-11 rounded-xl bg-[#D8261D]/12 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D8261D" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21C7 17 3 13 3 8.5 3 6 5 4 7.5 4 9.5 4 11 5.5 12 7c1-1.5 2.5-3 4.5-3C19 4 21 6 21 8.5 21 13 17 17 12 21z"/>
                  </svg>
                </div>
                <div>
                  <div
                    className="text-base font-bold text-[#D8261D] mb-1"
                    style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.2 }}
                  >
                    {t.culture.energy.name}
                  </div>
                  <div
                    className="text-sm text-[#9A9483]"
                    style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.5 }}
                  >
                    {t.culture.energy.desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
