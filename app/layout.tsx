import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/components/layout/I18nProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TikiTaxi CR — Private Driver & Tours in Costa Rica",
  description:
    "Bilingual private taxi and custom tour service in Costa Rica. Airport transfers, personalized tours, and executive transport. Book your free consultation today.",
  keywords:
    "Costa Rica taxi, private driver Costa Rica, Costa Rica tours, airport transfer Costa Rica, TikiTaxi",
  openGraph: {
    title: "TikiTaxi CR — Private Driver & Tours in Costa Rica",
    description:
      "Bilingual. Reliable. Unforgettable experiences across Costa Rica.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-emerald-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
