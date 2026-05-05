import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ServicesSection />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
