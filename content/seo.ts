export interface RouteSeoConfig {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
}

/**
 * Główna konfiguracja SEO serwisu Studio Wzrostu.
 * Silnie typowana mapa metadanych dla każdej trasy w serwisie.
 * Zasady: title ≤ 55–60 znaków, description 130–155 znaków.
 */
export const routesSeo: Record<string, RouteSeoConfig> = {
  home: {
    title: "Strony internetowe dla firm – Bydgoszcz | Studio Wzrostu",
    description:
      "Nowoczesne strony www dla firm z Bydgoszczy i całej Polski. Czysty kod w Next.js, realizacja w 3–4 dni i stała wycena z góry. Zbuduj przewagę!",
    keywords: [
      "strony internetowe Bydgoszcz",
      "nowoczesne strony dla firm",
      "rozwój biznesu w internecie",
      "tworzenie stron React",
      "szybka strona dla firmy",
      "optymalizacja Core Web Vitals",
    ],
    ogTitle: "Strony internetowe dla firm – Bydgoszcz | Studio Wzrostu",
    ogDescription:
      "Nowoczesne strony www w Next.js. Realizacja w 3–4 dni, stała wycena z góry i kod nastawiony na pozyskiwanie klientów.",
  },
  services: {
    title: "Projektowanie i tworzenie stron www | Studio Wzrostu",
    description:
      "Kompleksowe usługi web development dla firm: dedykowane serwisy Next.js, landing page pod kampanie, audyty SEO oraz modernizacja stron. Sprawdź ofertę!",
    keywords: [
      "tworzenie stron www oferta",
      "projektowanie stron dla biznesu",
      "usługi web development",
      "tworzenie stron Bydgoszcz",
    ],
    ogTitle: "Projektowanie i tworzenie stron www | Studio Wzrostu",
    ogDescription:
      "Dedykowane strony w React i Next.js, landing page pod kampanie oraz audyty techniczne SEO. Poznaj naszą ofertę.",
  },
  servicesWebsites: {
    title: "Strony internetowe Bydgoszcz – Next.js | Studio Wzrostu",
    description:
      "Szybkie strony firmowe B2B i B2C w React i Next.js. Tworzenie stron w Bydgoszczy i zdalnie w Polsce. Wdrożenie w 3–4 dni, cena z góry. Zamów wycenę!",
    keywords: [
      "nowoczesne strony internetowe w React i Next.js",
      "szybkie strony firmowe B2B B2C",
      "tworzenie stron Bydgoszcz",
      "strona firmowa Next.js",
    ],
    ogTitle: "Strony internetowe Bydgoszcz – Next.js | Studio Wzrostu",
    ogDescription:
      "Dedykowane strony firmowe bez masowych szablonów. Czas realizacji 3–4 dni, wycena z góry i pełna własność kodu.",
  },
  servicesLandingPage: {
    title: "Landing Page pod kampanie Ads i Meta | Studio Wzrostu",
    description:
      "Projektujemy skuteczne landing pages pod kampanie Google Ads i Meta. Zwiększ konwersję z reklam dzięki błyskawicznemu ładowaniu. Zyskaj więcej leadów!",
    keywords: [
      "projektowanie landing page",
      "strona lądująca pod kampanie Google Ads Meta",
      "jak zwiększyć konwersję z reklam",
      "landing page Bydgoszcz",
    ],
    ogTitle: "Skuteczne Landing Pages pod kampanie reklamowe | Studio Wzrostu",
    ogDescription:
      "Zwiększ rentowność kampanii Ads i Meta dzięki landing page ładowanemu w 0.5s zoptymalizowanemu pod konwersję.",
  },
  servicesSeo: {
    title: "Techniczne SEO i Pozycjonowanie Bydgoszcz | Studio Wzrostu",
    description:
      "Audyt techniczny SEO i optymalizacja Core Web Vitals. Pozycjonowanie stron dla firm z Bydgoszczy i całej Polski. Zdobądź wyższe pozycje w Google!",
    keywords: [
      "techniczne SEO",
      "pozycjonowanie stron Bydgoszcz",
      "audyt SEO",
      "indeksacja Google",
      "architektura informacji",
    ],
    ogTitle: "Techniczne SEO i audyt Core Web Vitals | Studio Wzrostu",
    ogDescription:
      "Optymalizacja architektury kodu pod wytyczne Google. Zielone wskaźniki Core Web Vitals i wyższa widoczność w wyszukiwarce.",
  },
  servicesRedesign: {
    title: "Redesign stron i modernizacja wydajności | Studio Wzrostu",
    description:
      "Przebudowa przestarzałych serwisów na nowoczesny stos Next.js. Poprawiamy konwersję, skracamy czas ładowania i eliminujemy dług technologiczny. Sprawdź!",
    keywords: [
      "przebudowa strony internetowej",
      "modernizacja starej strony",
      "optymalizacja szybkości strony",
      "poprawa Core Web Vitals",
    ],
    ogTitle: "Modernizacja i przebudowa stron firmowych | Studio Wzrostu",
    ogDescription:
      "Zamień wolną, przestarzałą stronę na nowoczesny serwis w Next.js. Wyższa sprzedaż, zero długu technologicznego.",
  },
  projects: {
    title: "Projekty stron internetowych dla firm | Studio Wzrostu",
    description:
      "Autorskie koncepcje stron www i landing page od Studio Wzrostu. Zobacz, jak projektujemy nowoczesny układ, czytelność i szybkość. Poznaj nasze podejście!",
    keywords: [
      "projekty stron internetowych",
      "nowoczesny design www",
      "przykłady stron dla firm",
      "portfolio stron Next.js",
    ],
    ogTitle: "Koncepcje architektoniczne stron www | Studio Wzrostu",
    ogDescription:
      "Trzy autorskie koncepcje: serwis maszyn przemysłowych B2B, landing page aplikacji i interaktywne porównanie redesignu.",
  },
  about: {
    title: "O studiu – Tomasz Górka, Bydgoszcz | Studio Wzrostu",
    description:
      "Poznaj Studio Wzrostu i założyciela Tomasza Górkę. Tworzymy dedykowane serwisy bez szablonów dla firm z Bydgoszczy i całej Polski. Dowiedz się więcej!",
    keywords: [
      "studio web development Bydgoszcz",
      "Tomasz Górka",
      "tworzenie stron bez szablonów",
      "programista stron Bydgoszcz",
    ],
    ogTitle: "O Studio Wzrostu i Tomaszu Górce | Studio Wzrostu",
    ogDescription:
      "Niezależne studio tworzące szybkie serwisy internetowe w oparciu o React, Next.js i TypeScript bez zbędnego narzutu.",
  },
  blog: {
    title: "Blog o technologii i rozwoju biznesu | Studio Wzrostu",
    description:
      "Praktyczne poradniki o tworzeniu stron www, pozyskiwaniu klientów z sieci, SEO technicznym i Core Web Vitals. Zbuduj przewagę rynkową swojej firmy!",
    keywords: [
      "rozwój biznesu online",
      "jak zdobyć więcej klientów z internetu",
      "wzrost sprzedaży przez stronę www",
      "dlaczego strona nie sprzedaje",
    ],
    ogTitle: "Blog inżynieryjno-biznesowy | Studio Wzrostu",
    ogDescription:
      "Praktyczna wiedza bez żargonu: szybkość stron, Core Web Vitals, konwersja i skuteczne pozyskiwanie zapytań ofertowych.",
  },
  contact: {
    title: "Kontakt i bezpłatna wycena strony | Studio Wzrostu",
    description:
      "Skontaktuj się ze Studiem Wzrostu. Porozmawiajmy o nowej stronie dla firmy stacjonarnie w Bydgoszczy lub zdalnie. Otrzymaj bezpłatną wycenę z góry!",
    keywords: [
      "kontakt studio wzrostu",
      "wycena strony internetowej",
      "bezpłatna konsultacja",
      "strony internetowe Bydgoszcz kontakt",
    ],
    ogTitle: "Kontakt i bezpłatna wycena wdrożenia | Studio Wzrostu",
    ogDescription:
      "Porozmawiajmy o nowej stronie w Next.js. Bezpłatna analiza techniczna i konkretna wycena ze stałą stawką przed startem prac.",
  },
  privacy: {
    title: "Polityka prywatności | Studio Wzrostu",
    description:
      "Zasady przetwarzania danych osobowych (RODO) oraz prawa osób korzystających z serwisu internetowego Studio Wzrostu. Sprawdź szczegóły ochrony danych.",
    keywords: ["polityka prywatności", "rodo studio wzrostu"],
  },
  cookies: {
    title: "Polityka plików cookies | Studio Wzrostu",
    description:
      "Szczegółowy wykaz plików cookies oraz technologii pamięci lokalnej w serwisie Studio Wzrostu. Dowiedz się, jak chronimy Twoją prywatność.",
    keywords: ["polityka cookies", "pliki cookies studio wzrostu"],
  },
};
