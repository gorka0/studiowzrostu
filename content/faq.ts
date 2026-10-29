/**
 * Baza najczęściej zadawanych pytań (FAQ)
 * Odpowiedzi na kluczowe wątpliwości biznesowe, technologiczne i lokalne.
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: "jak-strona-wplywa-na-rozwoj",
    question: "Jak strona internetowa wpływa na rozwój biznesu i liczbę zapytań?",
    answer:
      "Profesjonalna strona eliminuje wątpliwości klienta w pierwszych sekundach wizyty. Zamiast chaotycznej wizytówki otrzymujesz narzędzie, które natychmiast wyjaśnia zakres usług, buduje wiarygodność techniczną i prowadzi użytkownika do bezpośredniego kontaktu. Błyskawiczny czas ładowania na telefonie zapobiega ucieczce potencjalnych klientów przed przeczytaniem oferty.",
  },
  {
    id: "ile-trwa-i-od-czego-zalezy-wycena",
    question: "Ile trwa stworzenie strony internetowej dla firmy i od czego zależy wycena?",
    answer:
      "Dla typowej strony firmowej lub landing page przygotowanie zajmuje nam zwykle 3–4 dni robocze od akceptacji założeń i dostarczenia kompletu materiałów (warunki orientacyjne – do potwierdzenia przed realizacją). Wycenę podajemy ze stałą kwotą z góry, zanim cokolwiek zaczniemy – jej wysokość zależy od liczby podstron, specyfikacji formularzy i wymaganych integracji.",
  },
  {
    id: "dlaczego-react-nextjs-zamiast-wordpress",
    question: "Dlaczego warto wybrać stronę w React/Next.js zamiast gotowego szablonu WordPress?",
    answer:
      "Tradycyjne szablony cierpią na nadmiar wtyczek, wolne ładowanie na smartfonach oraz ryzyko awarii po automatycznych aktualizacjach motywu. Next.js generuje lekki kod HTML na serwerze, który ładuje się w ułamku sekundy, osiąga maksymalne noty Google Core Web Vitals i nie wymaga opłat za licencje wtyczek ani drogiego hostingu.",
  },
  {
    id: "czy-pomagacie-w-seo-i-rozwoju",
    question: "Czy po wdrożeniu strony pomagacie w SEO i dalszym rozwoju?",
    answer:
      "Tak. Każda wdrażana przez nas strona posiada wbudowany fundament technicznego SEO: semantykę HTML5, automatyczną sitemapę, metadane OpenGraph i precyzyjne dane strukturalne JSON-LD. Oferujemy również audyty rozszerzone, rozbudowę architektury treści pod frazy kluczowe oraz wsparcie w skalowaniu serwisu.",
  },
  {
    id: "zasieg-i-wspolpraca-zdalna",
    question: "Jak wygląda współpraca zdalna i czy obsługujecie firmy spoza Bydgoszczy?",
    answer:
      "Obsługujemy klientów z Bydgoszczy i całego województwa kujawsko-pomorskiego, a także w 100% zdalnie firmy z całej Polski. Gwarantujemy przejrzysty proces, bezpośredni kontakt z inżynierem prowadzącym oraz regularne prezentacje postępów w działającym środowisku testowym.",
  },
  {
    id: "co-z-hostingiem",
    question: "Gdzie będzie utrzymywana strona i jak wygląda sprawa hostingu?",
    answer:
      "Stronę wdrażamy na nowoczesnej, bezserwerowej platformie hostingowej (np. Vercel lub Cloudflare), która zapewnia darmowy certyfikat SSL, globalny CDN i brak przestojów serwera. Pomagamy bezpłatnie skonfigurować Twoją domenę.",
  },
  {
    id: "czy-pomagacie-w-tresciach",
    question: "Czy muszę mieć przygotowane gotowe teksty przed rozpoczęciem prac?",
    answer:
      "Nie musisz. Pomożemy Ci ustrukturyzować ofertę i przygotować konkretne treści, które w prosty, techniczny sposób wyjaśnią Twoim klientom wartość Twoich usług i korzyści ze współpracy.",
  },
];
