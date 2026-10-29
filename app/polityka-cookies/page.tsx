import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { cookiesTableData } from "@/content/legal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CookieSettingsTrigger } from "@/components/legal/cookie-settings-trigger";
import { Cookie, Calendar, ShieldCheck } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.cookies.title,
  description: routesSeo.cookies.description,
  path: "/polityka-cookies",
});

export default function CookiesPolicyPage() {
  return (
    <main className="flex-1 pb-20">
      <Section spacing="sm">
        <Container>
          <Breadcrumbs items={[{ label: "Polityka cookies" }]} className="mb-8" />

          {/* Nagłówek dokumentu */}
          <div className="max-w-3xl space-y-4 border-b border-border pb-8">
            <div className="text-xs font-mono text-primary font-semibold tracking-wider">
              STANDARD EPRIVACY & CONSENT MODE V2
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight">
              Polityka Plików Cookies
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed">
              Szczegółowe zestawienie plików cookies oraz pamięci lokalnej (localStorage) wykorzystywanych w serwisie Studio Wzrostu.
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
              <Calendar className="h-4 w-4" />
              <span>Ostatnia aktualizacja: 27 października 2026</span>
            </div>
          </div>

          <div className="mt-12 space-y-12">
            {/* Przycisk do zmiany decyzji cookies (interaktywny komponent klienta) */}
            <div className="p-6 rounded-2xl border border-primary/30 bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-heading font-bold text-base text-foreground flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-primary" />
                  <span>Twoje bieżące preferencje</span>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Możesz w każdej chwili zmienić lub wycofać wyrażoną wcześniej zgodę na pliki analityczne i marketingowe.
                </div>
              </div>

              <CookieSettingsTrigger />
            </div>

            {/* Wyjaśnienie zasad */}
            <div className="prose max-w-none text-sm sm:text-base text-muted-foreground space-y-4 leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                1. Czym są pliki cookies i technologie lokalne?
              </h2>
              <p>
                Pliki cookies (tzw. ciasteczka) to niewielkie pliki tekstowe wysyłane przez serwer www i zapisywane po stronie przeglądarki internetowej. Obok plików cookies korzystamy z mechanizmu pamięci lokalnej (localStorage), który umożliwia przechowywanie prostych wartości konfiguracyjnych w urządzeniu użytkownika bez przesyłania ich w każdym nagłówku żądania HTTP.
              </p>
              <p>
                Stosujemy rygorystyczną politykę minimalizacji danych: <strong>żadne skrypty analityczne ani marketingowe nie są uruchamiane przed uzyskaniem Twojej świadomej zgody</strong>.
              </p>
            </div>

            {/* TABELA COOKIES */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                2. Wykaz stosowanych plików cookies i magazynu lokalnego
              </h2>

              <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-muted/60 border-b border-border text-foreground font-heading font-semibold">
                      <tr>
                        <th className="p-4 sm:px-6">Nazwa identyfikatora</th>
                        <th className="p-4 sm:px-6">Kategoria</th>
                        <th className="p-4 sm:px-6">Cel i funkcja</th>
                        <th className="p-4 sm:px-6">Czas przechowywania</th>
                        <th className="p-4 sm:px-6">Dostawca</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-muted-foreground">
                      {cookiesTableData.map((row) => (
                        <tr key={row.name} className="hover:bg-muted/30 transition-colors">
                          <td className="p-4 sm:px-6 font-mono font-medium text-foreground">
                            {row.name}
                          </td>
                          <td className="p-4 sm:px-6">
                            <span
                              className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold border ${
                                row.category === "Niezbędne"
                                  ? "bg-primary/10 text-primary border-primary/20"
                                  : row.category === "Funkcjonalne"
                                  ? "bg-secondary text-secondary-foreground border-border"
                                  : "bg-coral/10 text-coral border-coral/30"
                              }`}
                            >
                              {row.category}
                            </span>
                          </td>
                          <td className="p-4 sm:px-6 leading-relaxed">{row.purpose}</td>
                          <td className="p-4 sm:px-6 whitespace-nowrap">{row.duration}</td>
                          <td className="p-4 sm:px-6">{row.provider}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Zgodność i bezpieczeństwo */}
            <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-2 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground font-semibold font-heading text-base">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Zgodność z Consent Mode v2 i wytycznymi UODO</span>
              </div>
              <p className="leading-relaxed">
                Nasz baner cookies nie stosuje agresywnych technik wymuszania zgody (brak tzw. dark patterns). Przyciski „Akceptuj wszystkie” i „Odrzuć wszystkie” posiadają równorzędną wagę wizualną. Odrzucenie cookies nie ogranicza dostępu do treści merytorycznych serwisu.
              </p>
              <div className="pt-2">
                Zobacz również naszą pełną{" "}
                <Link
                  href="/polityka-prywatnosci"
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  Politykę Prywatności (RODO)
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
