import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { CookieSettingsButton } from "@/components/ui/cookie-settings-button";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/50 text-foreground transition-colors mt-auto pb-20 md:pb-0">
      <Container className="pt-4 pb-16 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start">
          
          {/* Lewa strona: Logo i kontakt w jednej linii */}
          <div className="md:col-span-6 space-y-4 text-left">
            <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
              <Logo size="sm" />
            </Link>

            {/* Kontakt w jednej linii */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] sm:text-[14px] text-muted-foreground pt-1">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-accent-text transition-colors py-1 inline-flex items-center"
              >
                {siteConfig.contact.email}
              </a>
              <span className="text-border select-none" aria-hidden="true">•</span>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="hover:text-accent-text transition-colors py-1 inline-flex items-center"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>

          {/* Prawa strona: 2 kolumny linków (Studio, Prawne) */}
          <div className="md:col-span-6 grid grid-cols-2 gap-6 text-left">
            
            {/* Kolumna 1: Studio */}
            <div className="space-y-2.5">
              <div className="text-[13px] font-semibold text-foreground font-heading">
                Studio
              </div>
              <ul className="space-y-1.5 text-[13px] sm:text-[14px] text-muted-foreground list-none p-0 m-0">
                <li>
                  <Link href="/uslugi" className="hover:text-accent-text transition-colors inline-flex items-center min-h-[36px] sm:min-h-[28px] py-1">
                    Usługi
                  </Link>
                </li>
                <li>
                  <Link href="/projekty" className="hover:text-accent-text transition-colors inline-flex items-center min-h-[36px] sm:min-h-[28px] py-1">
                    Projekty
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-accent-text transition-colors inline-flex items-center min-h-[36px] sm:min-h-[28px] py-1">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/o-nas" className="hover:text-accent-text transition-colors inline-flex items-center min-h-[36px] sm:min-h-[28px] py-1">
                    O nas
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="hover:text-accent-text transition-colors inline-flex items-center min-h-[36px] sm:min-h-[28px] py-1">
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolumna 2: Prawne */}
            <div className="space-y-2.5">
              <div className="text-[13px] font-semibold text-foreground font-heading">
                Prawne
              </div>
              <ul className="space-y-1.5 text-[13px] sm:text-[14px] text-muted-foreground list-none p-0 m-0">
                <li>
                  <Link
                    href="/polityka-prywatnosci"
                    className="hover:text-accent-text transition-colors inline-flex items-center min-h-[36px] sm:min-h-[28px] py-1"
                  >
                    Polityka prywatności
                  </Link>
                </li>
                <li>
                  <Link
                    href="/polityka-cookies"
                    className="hover:text-accent-text transition-colors inline-flex items-center min-h-[36px] sm:min-h-[28px] py-1"
                  >
                    Polityka cookies
                  </Link>
                </li>
                <li>
                  <CookieSettingsButton />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dolna belka */}
        <div className="mt-3.5 pt-2.5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-muted-foreground">
          <div>
            &copy; {siteConfig.copyrightYear} {siteConfig.name}. Wszelkie prawa zastrzeżone.
          </div>
          <div>
            Next.js & React • Dedykowane wdrożenie
          </div>
        </div>
      </Container>
    </footer>
  );
}
