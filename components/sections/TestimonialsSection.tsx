"use client";

import { useI18n } from "@/lib/i18n";

const CLOUD = "djgv9sagr";

const VIDEOS: { id: string; version: string; name: string; origin: string }[] = [
  { id: "testimonial-1_dharkf", version: "v1778124303", name: "Florian",            origin: "Austria" },
  { id: "testimonial-2_kcllzk", version: "v1778124302", name: "Kassy",              origin: "Tennessee, USA" },
  { id: "testimonial-3_m2ox69", version: "v1778124302", name: "Jeff",               origin: "Canada" },
  { id: "testimonial-4_lkbf7k", version: "v1778124301", name: "Gonzalo & Patricia", origin: "Spain" },
];

function videoUrl(id: string, version: string) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${version}/${id}.mp4`;
}

function posterUrl(id: string) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/q_auto,f_jpg,so_0/${id}.jpg`;
}

export function TestimonialsSection() {
  const { t } = useI18n();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-20 md:py-28 bg-white"
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {t.testimonials.badge}
          </div>
          <h2
            id="testimonials-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-4"
          >
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-stone-500 max-w-xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEOS.map(({ id, version, name, origin }, index) => (
            <div
              key={id}
              className="group flex flex-col rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Video player */}
              <div className="relative bg-stone-900 aspect-video">
                <video
                  controls
                  preload="metadata"
                  poster={posterUrl(id)}
                  className="w-full h-full object-cover"
                  aria-label={`Client testimonial ${index + 1}`}
                >
                  <source src={videoUrl(id, version)} type="video/mp4" />
                </video>
              </div>

              {/* Card footer */}
              <div className="px-4 py-3 bg-stone-50 border-t border-stone-100">
                {/* Star rating */}
                <div className="flex items-center gap-0.5 mb-1.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FFB703" aria-hidden="true">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                {/* Name & origin — update these values in VIDEOS array above */}
                <p className="text-sm font-semibold text-stone-800 leading-tight">{name}</p>
                <p className="text-xs text-stone-400">{origin}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
