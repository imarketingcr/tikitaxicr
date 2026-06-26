"use client";

import { useI18n } from "@/lib/i18n";
import Image from "next/image";

const TRIBE_IMAGES = [
  "brunca",
  "cabecar",
  "bribri",
  "ngabe",
  "guaymi",
  "maleku",
  "huetar",
  "chorotega",
  "terraba",
  "boruca",
];

export function TribesSection() {
  const { t } = useI18n();

  return (
    <section
      id="tribes"
      className="relative"
      style={{
        background: "radial-gradient(110% 70% at 50% 0%, rgba(28,38,21,0.7), rgba(10,13,8,1) 60%)",
      }}
    >
      <div className="container-max section-padding">
        {/* Heading */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-3">
            <span className="text-[#6CAE3B] text-xl">❧</span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl uppercase"
              style={{
                fontFamily: "var(--font-anton)",
                letterSpacing: "0.012em",
                color: "#ECE4D3",
                lineHeight: 0.98,
              }}
            >
              {t.tribes.title}
            </h2>
            <span className="text-[#6CAE3B] text-xl scale-x-[-1]">❧</span>
          </div>
        </div>

        {/* Intro */}
        <p
          className="text-base text-[#9A9483] text-center max-w-2xl mx-auto mb-12"
          style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.6 }}
        >
          {t.tribes.intro}
        </p>

        {/* Tribes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {t.tribes.list.map((tribe, i) => (
            <div
              key={i}
              className="bg-[#10150D] border border-white/7 rounded-2xl overflow-hidden hover:border-[#A4C93F]/40 hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className="aspect-square overflow-hidden bg-[#070A06]">
                <Image
                  src={`/images/masks/mask_${TRIBE_IMAGES[i]}.png`}
                  alt={tribe.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <div
                  className="text-lg uppercase mb-2"
                  style={{
                    fontFamily: "var(--font-anton)",
                    letterSpacing: "0.02em",
                    color: "#F3B71E",
                    lineHeight: 1,
                  }}
                >
                  {tribe.name}{" "}
                  {tribe.sub && (
                    <span className="text-xs text-[#7D776A] normal-case" style={{ letterSpacing: "0.04em" }}>
                      {tribe.sub}
                    </span>
                  )}
                </div>
                <p
                  className="text-xs sm:text-sm text-[#9A9483]"
                  style={{ fontFamily: "var(--font-hanken)", lineHeight: 1.5 }}
                >
                  {tribe.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="text-center mt-10 text-sm uppercase text-[#6CAE3B]"
          style={{ fontFamily: "var(--font-anton)", letterSpacing: "0.06em" }}
        >
          {t.tribes.footer}
        </div>
      </div>
    </section>
  );
}
