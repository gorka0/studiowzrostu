import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { privacyPolicyContent } from "@/content/legal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Calendar, Info } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.privacy.title,
  description: routesSeo.privacy.description,
  path: "/polityka-prywatnosci",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 pb-20">
      <Section spacing="sm">
        <Container>
          <Breadcrumbs items={[{ label: "Polityka prywatności" }]} className="mb-8" />

          {/* Nagłówek dokumentu */}
          <div className="max-w-3xl space-y-4 border-b border-border pb-8">
            <div className="text-xs font-mono text-primary font-semibold tracking-wider">
              STANDARD RODO / GDPR • WERSJA {privacyPolicyContent.version}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight">
              Polityka Prywatności
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed">
              Zasady przetwarzania danych osobowych oraz prawa przysługujące osobom odwiedzającym serwis Studio Wzrostu.
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
              <Calendar className="h-4 w-4" />
              <span>Ostatnia aktualizacja: {privacyPolicyContent.lastUpdated}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
            {/* Spis treści (Sticky Sidebar na desktopie - 4 kolumny) */}
            <aside className="lg:col-span-4 sticky top-24 rounded-2xl border border-border bg-card p-5 space-y-3 hidden lg:block">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-heading flex items-center gap-1.5">
                <Info className="h-4 w-4 text-primary" />
                <span>Spis treści</span>
              </div>
              <nav className="space-y-1.5 text-xs">
                {privacyPolicyContent.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1 text-muted-foreground hover:text-primary transition-colors leading-snug"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Treść dokumentu (8 kolumn) */}
            <div className="lg:col-span-8 space-y-10 text-sm sm:text-base text-foreground/90 leading-relaxed">
              {privacyPolicyContent.sections.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-24 space-y-3 p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-xs"
                >
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                    {sec.title}
                  </h2>
                  <div className="space-y-3 text-muted-foreground">
                    {sec.content.map((p, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <div className="p-6 rounded-2xl border border-border/80 bg-muted/40 text-xs text-muted-foreground">
                Zobacz także:{" "}
                <Link
                  href="/polityka-cookies"
                  className="text-foreground font-medium underline underline-offset-2 hover:text-primary transition-colors"
                >
                  Polityka Plików Cookies i wykaz znaczników
                </Link>
                .
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
