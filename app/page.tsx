import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TribesSection } from "@/components/sections/TribesSection";
import { CultureSection } from "@/components/sections/CultureSection";
import { WordsSection } from "@/components/sections/WordsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://tikitaxicr.com/#business",
  name: "TikiTaxi CR",
  description:
    "Bilingual private driver and custom tour service in Costa Rica. Airport transfers, personalized tours, and executive transport.",
  url: "https://tikitaxicr.com",
  telephone: "+50660557155",
  email: "info@tikitaxicr.com",
  image:
    "https://res.cloudinary.com/djgv9sagr/image/upload/c_fill,w_1200,h_630,g_auto,q_auto/v1778200924/volcano_cr_zszooa.jpg",
  priceRange: "$$",
  currenciesAccepted: "USD, CRC",
  paymentAccepted: "Cash, Credit Card",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San José",
    addressCountry: "CR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 9.9281,
    longitude: -84.0907,
  },
  areaServed: {
    "@type": "Country",
    name: "Costa Rica",
  },
  serviceType: [
    "Private Airport Transfer",
    "Custom Tours",
    "Executive Transport",
  ],
  availableLanguage: ["English", "Spanish"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
    ],
    opens: "06:00",
    closes: "20:00",
  },
  sameAs: ["https://wa.me/50660557155"],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <hr className="section-divider" aria-hidden="true" />
        <ValuesSection />
        <hr className="section-divider" aria-hidden="true" />
        <ServicesSection />
        <hr className="section-divider" aria-hidden="true" />
        <TribesSection />
        <hr className="section-divider" aria-hidden="true" />
        <CultureSection />
        <hr className="section-divider" aria-hidden="true" />
        <WordsSection />
        <hr className="section-divider" aria-hidden="true" />
        <TestimonialsSection />
        <hr className="section-divider" aria-hidden="true" />
        <BookingSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
