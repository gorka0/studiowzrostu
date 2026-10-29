"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { useCookieConsent } from "@/components/ui/cookie-banner";
import { CopyEmailButton } from "@/components/ui/copy-email-button";

export function Footer() {
  const { openPreferencesModal } = useCookieConsent();

  return (
    <footer className="w-full border-t border-border bg-card/50 text-foreground transition-colors mt-auto">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Kolumna 1: Marka & Misja */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="text-xs text-muted-foreground pt-2">
              Właściciel: <span className="font-medium text-foreground">{siteConfig.owner}</span>
            </div>
          </div>

          {/* Kolumna 2: Nawigacja */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground font-heading">
              Studio
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/uslugi" className="hover:text-accent-text transition-colors">
                  Usługi
                </Link>
              </li>
              <li>
                <Link href="/projekty" className="hover:text-accent-text transition-colors">
                  Projekty
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent-text transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="hover:text-accent-text transition-colors">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-accent-text transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolumna 3: Kontakt (wyłącznie z site.config) */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground font-heading">
              Kontakt
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="pt-0.5">
                <CopyEmailButton />
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-accent-text transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Kolumna 4: Informacje prawne i cookies */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground font-heading">
              Prawne
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/polityka-prywatnosci"
                  className="hover:text-accent-text transition-colors"
                >
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link
                  href="/polityka-cookies"
                  className="hover:text-accent-text transition-colors"
                >
                  Polityka cookies
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openPreferencesModal}
                  className="hover:text-accent-text transition-colors text-left cursor-pointer"
                >
                  Ustawienia cookies
                </button>
              </li>
              <li className="text-xs text-muted-foreground pt-2">
                NIP: {siteConfig.registry.nip}
              </li>
              <li className="text-xs text-muted-foreground">
                REGON: {siteConfig.registry.regon}
              </li>
            </ul>
          </div>
        </div>

        {/* Dolna belka: Prawa autorskie */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            &copy; {siteConfig.copyrightYear} {siteConfig.name}. Wszelkie prawa zastrzeżone.
          </div>
          <div className="font-mono text-[11px] text-muted-foreground">
            Next.js & React • Projekt i wdrożenie dedykowane
          </div>
        </div>
      </Container>
    </footer>
  );
}
