/**
 * Baza danych realizacji (case studies)
 * STATUS: Szkic do autorskiej redakcji przez Tomasza Górkę
 */

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  clientIndustry: string;
  category: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  stack: string[];
  isPlaceholder: true;
  placeholderNotice: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "serwis-b2b-uslugi",
    slug: "serwis-b2b-uslugi",
    title: "Przykładowy projekt – do uzupełnienia (Serwis B2B)",
    seoTitle: "Case study: Serwis B2B | Studio Wzrostu",
    clientIndustry: "Usługi inżynieryjne i doradcze",
    category: "Strona firmowa",
    shortDescription:
      "Przykładowa realizacja strony firmowej dla sektora usług B2B zoptymalizowanej pod generowanie zapytań ofertowych.",
    challenge:
      "Klient posiadał przestarzałą stronę na ociężałym systemie CMS. Czas ładowania przekraczał 5 sekund, a użytkownicy mobilni nie mogli odnaleźć danych kontaktowych.",
    solution:
      "Wdrożono od zera autorski serwis w Next.js z architekturą Server Components. Zaprojektowano czytelną ścieżkę konwersji i prosty formularz z powiadomieniami.",
    results: [
      "Czas ładowania strony poniżej 0.8 sekundy (Core Web Vitals na zielono)",
      "Przejrzysta prezentacja oferty eliminująca pytania o podstawowy zakres",
      "Wzrost liczby zapytań od nowych klientów z wyszukiwarki mobilnej",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Resend"],
    isPlaceholder: true,
    placeholderNotice: "Przykładowy projekt – do uzupełnienia po publikacji pierwszych wdrożeń.",
  },
  {
    id: "kancelaria-doradcza",
    slug: "kancelaria-doradcza",
    title: "Przykładowy projekt – do uzupełnienia (Kancelaria doradcza)",
    seoTitle: "Case study: Kancelaria | Studio Wzrostu",
    clientIndustry: "Doradztwo prawne i podatkowe",
    category: "Strona wizerunkowa",
    shortDescription:
      "Przykładowy projekt serwisu o wysokim kontraście i czytelnej typografii, nastawiony na budowanie wiarygodności doradców.",
    challenge:
      "Brak spójnego wizerunku w sieci oraz konieczność budowania autorytetu przed spotkaniem handlowym z zarządami spółek.",
    solution:
      "Stworzono elegancki serwis oparty na szwajcarskiej typografii Bricolage Grotesque z dedykowanymi sekcjami specjalizacji i sylwetkami ekspertów.",
    results: [
      "Prestiżowy wizerunek marki odpowiadający randze świadczonych usług",
      "Bezbłędne renderowanie i wysoki kontrast ułatwiający czytanie na tabletach",
      "Zgodność ze standardami dostępności WCAG AA",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel Edge"],
    isPlaceholder: true,
    placeholderNotice: "Przykładowy projekt – do uzupełnienia po publikacji pierwszych wdrożeń.",
  },
  {
    id: "firma-techniczna",
    slug: "firma-techniczna",
    title: "Przykładowy projekt – do uzupełnienia (Firma inżynieryjna)",
    seoTitle: "Case study: Firma tech | Studio Wzrostu",
    clientIndustry: "Automatyka przemysłowa i montaż",
    category: "Katalog techniczny",
    shortDescription:
      "Przykładowa realizacja serwisu prezentującego ofertę inżynieryjną z natychmiastowym czasem ładowania na smartfonach.",
    challenge:
      "Rozbudowana oferta z dziesiątkami parametrów technicznych była nieczytelna na ekranach smartfonów pracowników na budowach.",
    solution:
      "Zbudowano modułowy katalog usług z dynamicznym filtrowaniem, natychmiastowym wyszukiwaniem i bezpośrednim przyciskiem szybkiego kontaktu.",
    results: [
      "Błyskawiczny dostęp do specyfikacji technicznych w terenie",
      "Wyeliminowanie zapytań o nieaktualne wersje kart katalogowych",
      "Pełne bezpieczeństwo kodu i zero kosztów abonamentowych",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Postgres"],
    isPlaceholder: true,
    placeholderNotice: "Przykładowy projekt – do uzupełnienia po publikacji pierwszych wdrożeń.",
  },
];
