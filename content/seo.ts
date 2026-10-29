import { siteConfig } from "@/site.config";

export interface RouteSeoConfig {
  title: string;
  description: string;
  keywords?: string[];
}

/**
 * Główna mapa SEO serwisu Studio Wzrostu.
 * Plik przeznaczony do bezpośredniej edycji przez właściciela serwisu.
 * Zasady: title ≤ ~60 znaków, description ≤ ~155 znaków.
 */
export const routesSeo: Record<string, RouteSeoConfig> = {
  home: {
    title: `${siteConfig.name} – Nowoczesne strony w Next.js`,
    description:
      "Projektujemy i wdrażamy szybkie strony internetowe w React i Next.js. Pomagamy firmom zdobywać klientów i budować zaufanie w sieci.",
    keywords: [
      "tworzenie stron www",
      "strony next.js",
      "strony react",
      "studio wzrostu",
      "nowoczesne strony internetowe",
      "optymalizacja stron www",
      "strony internetowe dla firm",
    ],
  },
  services: {
    title: `Usługi tworzenia stron | ${siteConfig.name}`,
    description:
      "Projektowanie i programowanie stron w Next.js, audyty Core Web Vitals, landing page i optymalizacja konwersji. Sprawdź naszą ofertę.",
    keywords: [
      "usługi web development",
      "tworzenie stron react",
      "strony firmowe next.js",
      "audyt wydajności strony",
      "kodowanie stron www",
    ],
  },
  servicesWebsites: {
    title: `Strony internetowe Next.js | ${siteConfig.name}`,
    description:
      "Dedykowane strony firmowe w React i Next.js. Błyskawiczne ładowanie, czysty kod i pełna własność bez uzależnienia od abonamentów.",
    keywords: ["strony internetowe next.js", "nowoczesna strona www", "tworzenie stron react"],
  },
  servicesLandingPage: {
    title: `Skuteczne landing page | ${siteConfig.name}`,
    description:
      "Jednostronicowe serwisy nastawione na maksymalną konwersję kampanii reklamowych. Szybkie ładowanie i bezbłędna responsywność.",
    keywords: ["landing page next.js", "tworzenie landing page", "strona docelowa", "konwersja strony"],
  },
  servicesSeo: {
    title: `SEO techniczne i Core Web Vitals | ${siteConfig.name}`,
    description:
      "Optymalizacja techniczna stron pod kątem Google: semantyka HTML, Core Web Vitals, indeksacja i struktura danych bez tanich trików.",
    keywords: ["seo techniczne", "optymalizacja core web vitals", "szybkość strony google", "audyt seo"],
  },
  servicesRedesign: {
    title: `Redesign i optymalizacja stron | ${siteConfig.name}`,
    description:
      "Przebudowa przestarzałych serwisów na nowoczesny stos Next.js. Poprawiamy konwersję, skracamy czas ładowania i eliminujemy dług technologiczny.",
    keywords: ["redesign strony", "modernizacja strony www", "przebudowa serwisu", "migracja na next.js"],
  },
  projects: {
    title: `Realizacje stron internetowych | ${siteConfig.name}`,
    description:
      "Zobacz koncepcje wdrożeń i architekturę stron internetowych stworzonych w React i Next.js z naciskiem na konwersję i wydajność.",
    keywords: ["portfolio stron internetowych", "realizacje next.js", "case study www", "projekty stron"],
  },
  about: {
    title: `O studiu i Tomaszu Górce | ${siteConfig.name}`,
    description:
      "Poznaj Studio Wzrostu i założyciela Tomasza Górkę. Tworzymy nowoczesne serwisy internetowe w Next.js dla rozwijających się firm.",
    keywords: ["o studiu wzrostu", "tomasz górka", "twórca stron next.js", "studio www"],
  },
  blog: {
    title: `Blog o technologii i stronach | ${siteConfig.name}`,
    description:
      "Praktyczne analizy o tworzeniu stron www w Next.js, Core Web Vitals, SEO technicznym i optymalizacji sprzedaży bez żargonu.",
    keywords: ["blog o tworzeniu stron", "wiedza next.js", "poradnik core web vitals", "technologia stron"],
  },
  contact: {
    title: `Kontakt i bezpłatna wycena | ${siteConfig.name}`,
    description:
      "Porozmawiajmy o nowej stronie internetowej dla Twojej firmy. Skontaktuj się ze Studiem Wzrostu i otrzymaj bezpłatną kalkulację.",
    keywords: ["kontakt studio wzrostu", "wycena strony www", "zamów stronę next.js", "brief strony"],
  },
  privacy: {
    title: `Polityka prywatności | ${siteConfig.name}`,
    description:
      "Zasady przetwarzania danych osobowych (RODO) oraz prawa osób korzystających z serwisu internetowego Studio Wzrostu.",
  },
  cookies: {
    title: `Polityka plików cookies | ${siteConfig.name}`,
    description:
      "Szczegółowy wykaz plików cookies oraz technologii pamięci lokalnej (localStorage) wykorzystywanych w serwisie Studio Wzrostu.",
  },
};
