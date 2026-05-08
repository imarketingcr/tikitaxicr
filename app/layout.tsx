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

const OG_IMAGE =
  "https://res.cloudinary.com/djgv9sagr/image/upload/c_fill,w_1200,h_630,g_auto,q_auto/v1778200924/volcano_cr_zszooa.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://tikitaxicr.com"),
  title: "TikiTaxi CR — Private Driver & Tours in Costa Rica",
  description:
    "Bilingual private taxi and custom tour service in Costa Rica. Airport transfers, personalized tours, and executive transport. Book your free consultation today.",
  keywords:
    "Costa Rica taxi, private driver Costa Rica, Costa Rica tours, airport transfer Costa Rica, TikiTaxi, taxi Costa Rica, tours privados Costa Rica",
  openGraph: {
    title: "TikiTaxi CR — Private Driver & Tours in Costa Rica",
    description:
      "Bilingual. Reliable. Unforgettable experiences across Costa Rica.",
    type: "website",
    locale: "en_US",
    url: "https://tikitaxicr.com",
    siteName: "TikiTaxi CR",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "TikiTaxi CR — Private Driver & Tours in Costa Rica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TikiTaxi CR — Private Driver & Tours in Costa Rica",
    description:
      "Bilingual. Reliable. Unforgettable experiences across Costa Rica.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "https://tikitaxicr.com",
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
