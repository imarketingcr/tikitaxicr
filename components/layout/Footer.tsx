"use client";

import { useI18n } from "@/lib/i18n";

const TIKIS_LOGO = "https://res.cloudinary.com/djgv9sagr/image/upload/q_auto,f_auto/v1778334742/tikistaxi-lower_mjbvuc.png";
const FOOTER_BG = "https://res.cloudinary.com/djgv9sagr/image/upload/v1778466715/footer_etiash.webp";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: `url('${FOOTER_BG}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#121212",
      }}
    >
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "rgba(18,18,18,0.88)", zIndex: 0 }}
      />

      {/* Top border */}
      <div
        aria-hidden="true"
        className="relative w-full h-px"
        style={{ background: "rgba(212,160,23,0.25)", zIndex: 1 }}
      />

      <div className="relative container-max py-12 md:py-16" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={TIKIS_LOGO}
                alt="TikisTaxi CR"
                style={{ height: "40px", width: "auto" }}
              />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.7)" }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-semibold text-sm uppercase tracking-wider mb-3"
              style={{ color: "#D4A017" }}
            >
              {t.footer.contactHeading}
            </p>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(245,240,232,0.6)" }}>
              <li>
                <a
                  href="mailto:info@tikitaxicr.com"
                  className="transition-colors"
                  style={{ color: "rgba(245,240,232,0.6)" }}
                  aria-label="Email TikiTaxi CR"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#D4A017"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,232,0.6)"; }}
                >
                  info@tikitaxicr.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/50660557155"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "rgba(245,240,232,0.6)" }}
                  aria-label="WhatsApp TikiTaxi CR (opens in new tab)"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#D4A017"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,232,0.6)"; }}
                >
                  WhatsApp: +506 6055-7155
                </a>
              </li>
              <li style={{ color: "rgba(245,240,232,0.4)" }}>San José, Costa Rica</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <p
              className="font-semibold text-sm uppercase tracking-wider mb-3"
              style={{ color: "#D4A017" }}
            >
              {t.footer.servicesHeading}
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#services", label: t.nav.services },
                { href: "#about",    label: t.nav.about },
                { href: "#booking",  label: t.nav.booking },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="transition-colors"
                    style={{ color: "rgba(245,240,232,0.6)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#D4A017"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,232,0.6)"; }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: "1px solid rgba(212,160,23,0.25)", color: "#888" }}
        >
          <p>© {year} TikiTaxi CR. {t.footer.rights}</p>
          <p>Costa Rica 🌴</p>
        </div>
      </div>
    </footer>
  );
}
