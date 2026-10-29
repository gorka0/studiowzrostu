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
    title: "Nowoczesne strony internetowe dla firm | Studio Wzrostu",
    description:
      "Tworzymy nowoczesne strony internetowe dla firm z Bydgoszczy i całej Polski. Szybka realizacja, stała wycena z góry i pełna własność strony. Zamów bezpłatną wycenę!",
    keywords: [
      "nowoczesne strony dla firm",
      "strony internetowe dla firm",
      "rozwój biznesu w internecie",
      "tworzenie stron React",
      "szybka strona dla firmy",
      "optymalizacja Core Web Vitals",
      "strony internetowe Bydgoszcz",
      "tworzenie stron www Bydgoszcz",
      "strona internetowa dla firmy Bydgoszcz",
      "nowoczesna strona firmowa",
      "tworzenie stron www dla małych firm",
      "cena strony internetowej dla firmy",
    ],
    ogTitle: "Nowoczesne strony internetowe dla firm | Studio Wzrostu",
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
      "firma web design Bydgoszcz",
      "agencja internetowa Bydgoszcz",
      "strony www kujawsko-pomorskie",
      "zamów stronę internetową",
      "strona internetowa dla firmy usługowej",
    ],
    ogTitle: "Projektowanie i tworzenie stron www | Studio Wzrostu",
    ogDescription:
      "Dedykowane strony w React i Next.js, landing page pod kampanie oraz audyty techniczne SEO. Poznaj naszą ofertę.",
  },
  servicesWebsites: {
    title: "Nowoczesne strony internetowe – Next.js | Studio Wzrostu",
    description:
      "Szybkie strony firmowe B2B i B2C w React i Next.js. Tworzenie serwisów dla firm z całej Polski. Wdrożenie w 3–4 dni, cena z góry. Zamów wycenę!",
    keywords: [
      "nowoczesne strony internetowe w React i Next.js",
      "szybkie strony firmowe B2B B2C",
      "tworzenie stron www dla firm",
      "strona firmowa Next.js",
      "szybka strona internetowa",
      "strona www bez wordpress",
      "strona internetowa dla firmy B2B",
      "projektowanie stron Bydgoszcz",
    ],
    ogTitle: "Nowoczesne strony internetowe – Next.js | Studio Wzrostu",
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
      "strona pod kampanie Google Ads",
      "jak zwiększyć sprzedaż przez internet",
    ],
    ogTitle: "Skuteczne Landing Pages pod kampanie reklamowe | Studio Wzrostu",
    ogDescription:
      "Zwiększ rentowność kampanii Ads i Meta dzięki landing page ładowanemu w 0.5s zoptymalizowanemu pod konwersję.",
  },
  servicesSeo: {
    title: "Techniczne SEO i Pozycjonowanie stron | Studio Wzrostu",
    description:
      "Audyt techniczny SEO i optymalizacja Core Web Vitals. Pozycjonowanie stron dla firm z całej Polski. Zdobądź wyższe pozycje w Google!",
    keywords: [
      "techniczne SEO",
      "pozycjonowanie stron www",
      "audyt SEO",
      "indeksacja Google",
      "architektura informacji",
      "pozycjonowanie stron Bydgoszcz",
      "SEO Bydgoszcz",
      "widoczność w Google",
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
      "przebudowa strony Bydgoszcz",
      "przyspieszenie wolnej strony",
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
      "przykłady stron firmowych Bydgoszcz",
      "realizacje stron internetowych",
    ],
    ogTitle: "Koncepcje architektoniczne stron www | Studio Wzrostu",
    ogDescription:
      "Trzy autorskie koncepcje: serwis maszyn przemysłowych B2B, landing page aplikacji i interaktywne porównanie redesignu.",
  },
  about: {
    title: "O studiu – Tomasz Górka | Studio Wzrostu",
    description:
      "Poznaj Studio Wzrostu i założyciela Tomasza Górkę. Tworzymy dedykowane serwisy bez szablonów dla firm z całej Polski. Dowiedz się więcej!",
    keywords: [
      "studio web development",
      "Tomasz Górka",
      "tworzenie stron bez szablonów",
      "programista stron www",
      "webmaster Bydgoszcz",
      "studio web design Bydgoszcz",
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
      "jak pozyskać klientów przez internet",
      "strona internetowa dla małej firmy poradnik",
    ],
    ogTitle: "Blog inżynieryjno-biznesowy | Studio Wzrostu",
    ogDescription:
      "Praktyczna wiedza bez żargonu: szybkość stron, Core Web Vitals, konwersja i skuteczne pozyskiwanie zapytań ofertowych.",
  },
  contact: {
    title: "Kontakt i bezpłatna wycena strony | Studio Wzrostu",
    description:
      "Skontaktuj się ze Studiem Wzrostu. Porozmawiajmy o nowej stronie dla firmy. Otrzymaj bezpłatną wycenę z góry!",
    keywords: [
      "kontakt studio wzrostu",
      "wycena strony internetowej",
      "bezpłatna konsultacja",
      "tworzenie stron kontakt",
      "wycena strony Bydgoszcz",
      "strona firmowa Bydgoszcz cena",
      "ile kosztuje strona internetowa",
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
