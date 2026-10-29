import { siteConfig } from "@/site.config";

export interface RouteSeoConfig {
  title: string;
  description: string;
  keywords?: string[];
}

/**
 * Główna konfiguracja SEO serwisu Studio Wzrostu.
 * Plik przeznaczony do bezpośredniej edycji przez właściciela serwisu.
 * Zasady: title ≤ ~60 znaków, description ≤ ~155 znaków.
 */
export const routesSeo: Record<string, RouteSeoConfig> = {
  home: {
    title: `${siteConfig.name} – Strona w 3–4 dni | Cena z góry`,
    description:
      "Nowoczesne strony internetowe w Next.js. Strona w 3–4 dni, stała cena z góry, czysty kod i pełna własność. Sprawdź naszą ofertę.",
    keywords: [
      "tworzenie stron www",
      "strona w 3-4 dni",
      "cena z góry strony",
      "strony next.js",
      "strony react",
      "studio wzrostu",
      "nowoczesne strony internetowe",
      "strony internetowe dla firm",
    ],
  },
  services: {
    title: `Usługi tworzenia stron w 3–4 dni | ${siteConfig.name}`,
    description:
      "Projektowanie i programowanie stron w Next.js. Realizacja w 3–4 dni, stała cena z góry, wysoka wydajność i pełna własność serwisu.",
    keywords: [
      "usługi web development",
      "strona w 3-4 dni",
      "cena z góry",
      "tworzenie stron react",
      "strony firmowe next.js",
      "audyt wydajności strony",
    ],
  },
  servicesWebsites: {
    title: `Strony internetowe Next.js w 3–4 dni | ${siteConfig.name}`,
    description:
      "Dedykowane strony firmowe w React i Next.js. Czas wdrożenia 3–4 dni, wycena z góry, błyskawiczne ładowanie i brak abonamentów.",
    keywords: ["strony internetowe next.js", "strona w 3-4 dni", "cena z góry", "tworzenie stron react"],
  },
  servicesLandingPage: {
    title: `Landing Page w 3–4 dni | Cena z góry | ${siteConfig.name}`,
    description:
      "Skuteczne landing pages pod kampanie reklamowe. Realizacja w 3–4 dni, stała cena z góry i optymalizacja pod konwersję.",
    keywords: ["landing page next.js", "landing page w 3-4 dni", "cena z góry", "konwersja strony"],
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
