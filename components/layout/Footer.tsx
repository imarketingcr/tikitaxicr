"use client";

import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-stone-900 text-stone-300"
    >
      <div className="container-max py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-bold text-white mb-2">
              TikiTaxi<span className="text-amber-400">CR</span>
            </p>
            <p className="text-sm text-stone-400 leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-white text-sm uppercase tracking-wider mb-3">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a
                  href="mailto:info@tikitaxicr.com"
                  className="hover:text-emerald-400 transition-colors"
                  aria-label="Email TikiTaxi CR"
                >
                  info@tikitaxicr.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/50660557155"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                  aria-label="WhatsApp TikiTaxi CR (opens in new tab)"
                >
                  WhatsApp: +506 6055-7155
                </a>
              </li>
              <li className="text-stone-500">San José, Costa Rica</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold text-white text-sm uppercase tracking-wider mb-3">
              Services
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#services", label: t.nav.services },
                { href: "#booking", label: t.nav.booking },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-stone-400 hover:text-emerald-400 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <p>
            © {year} TikiTaxi CR. {t.footer.rights}
          </p>
          <p>Costa Rica 🌴</p>
        </div>
      </div>
    </footer>
  );
}
