/**
 * Baza danych usług studia
 * STATUS: Szkic do autorskiej redakcji przez Tomasza Górkę
 */

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  problem: {
    heading: string;
    description: string;
    symptoms: string[];
  };
  solution: {
    heading: string;
    description: string;
    deliverables: string[];
  };
  process: {
    step: string;
    title: string;
    desc: string;
  }[];
  businessBenefits: {
    title: string;
    desc: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  relatedServices: {
    slug: string;
    title: string;
  }[];
  relatedBlogSlug: string;
}

export const servicesList: ServiceDetail[] = [
  {
    slug: "strony-internetowe",
    title: "Nowoczesne strony firmowe",
    tagline: "Strony w Next.js i React, które budują autorytet i zdobywają klientów",
    shortDescription:
      "Dedykowane serwisy internetowe zaprojektowane od zera. Bez ociężałych motywów, z natychmiastowym czasem ładowania na smartfonach.",
    problem: {
      heading: "Dlaczego typowa strona firmowa nie przynosi zapytań?",
      description:
        "Większość stron powstaje na masowych szablonach z dziesiątkami zbędnych wtyczek. Ładują się po 4–6 sekund, rozjeżdżają się na telefonach i nie odpowiadają na kluczowe pytania potencjalnego klienta.",
      symptoms: [
        "Wysoki współczynnik odrzuceń – użytkownicy wychodzą przed załadowaniem oferty",
        "Trudności z edycją i strach przed aktualizacją wtyczek",
        "Brak wyróżnienia na tle lokalnej i branżowej konkurencji",
      ],
    },
    solution: {
      heading: "Co konkretnie dla Ciebie robimy?",
      description:
        "Tworzymy autorski serwis w Next.js, dopasowany w 100% do specyfiki Twojej branży. Każdy element układu ma jeden cel: przekonać odwiedzającego do kontaktu z Twoją firmą.",
      deliverables: [
        "Indywidualny projekt graficzny w szwajcarskiej, czytelnej estetyce",
        "Architektura Next.js 16 z czasem renderowania poniżej 1 sekundy",
        "Zabezpieczony formularz kontaktowy z powiadomieniami e-mail",
        "Pełne wdrożenie na Twojej domenie z darmowym certyfikatem SSL",
      ],
    },
    process: [
      { step: "01", title: "Brief i analiza oferty", desc: "Poznajemy Twoich klientów i definiujemy strukturę strony." },
      { step: "02", title: "Projekt makiety", desc: "Układamy teksty i hierarchię wizualną pod kątem konwersji." },
      { step: "03", title: "Kodowanie w Next.js", desc: "Piszemy czysty, semantyczny kod produkcyjny." },
      { step: "04", title: "Testy i publikacja", desc: "Weryfikujemy działanie na 5 szerokościach i podpinamy domenę." },
    ],
    businessBenefits: [
      { title: "Zaufanie od pierwszej sekundy", desc: "Profesjonalny wizerunek sprawia, że klienci traktują Cię jako lidera w swojej branży." },
      { title: "Więcej zapytań ofertowych", desc: "Intuicyjna ścieżka prowadzi użytkownika prosto do formularza lub telefonu." },
      { title: "Święty spokój technologiczny", desc: "Brak podatnych wtyczek oznacza zero obaw o awarie po automatycznych aktualizacjach." },
    ],
    faq: [
      {
        question: "Ile trwa wdrożenie nowej strony firmowej?",
        answer: "Standardowy czas realizacji wynosi od 2 do 4 tygodni od momentu akceptacji założeń i struktury.",
      },
      {
        question: "Czy po wdrożeniu otrzymuję kod na własność?",
        answer: "Tak. Otrzymujesz pełne repozytorium kodu bez żadnych ukrytych opłat licencyjnych czy abonamentów.",
      },
    ],
    relatedServices: [
      { slug: "seo-techniczne", title: "SEO techniczne i widoczność" },
      { slug: "redesign-i-wydajnosc", title: "Przebudowa istniejącego serwisu" },
    ],
    relatedBlogSlug: "dlaczego-szybkosc-strony-decyduje-o-sprzedazy",
  },
  {
    slug: "landing-page",
    title: "Landing Pages nastawione na konwersję",
    tagline: "Jednostronicowe serwisy kampanijne, które maksymalizują zwrot z reklam",
    shortDescription:
      "Strony docelowe zoptymalizowane pod płatne kampanie (Google Ads, Meta Ads) oraz premiery nowych usług i produktów.",
    problem: {
      heading: "Przepalasz budżet reklamowy na wolnej stronie?",
      description:
        "Kierowanie płatnego ruchu na stronę główną z wieloma rozpraszaczami lub wolno ładujący się landing page obniża wynik jakości w Google Ads i drastycznie podnosi koszt pozyskania leada.",
      symptoms: [
        "Wysoki koszt pojedynczego kliknięcia (CPC) przez słaby Quality Score",
        "Użytkownicy klikają reklamę, ale nie wypełniają formularza",
        "Rozproszona uwaga – zbyt wiele linków odciągających od celu",
      ],
    },
    solution: {
      heading: "Jak projektujemy skuteczny Landing Page?",
      description:
        "Usuwamy wszelki szum informacyjny. Budujemy jednolitą narrację od nagłówka, przez dowody wartości, aż po prosty formularz zintegrowany z Twoją skrzynką.",
      deliverables: [
        "Struktura zorientowana na jedno, konkretne działanie użytkownika (CTA)",
        "Błyskawiczne ładowanie pod kątem ruchu mobilnego z reklam",
        "Przygotowanie pod narzędzia analityczne (Google Tag Manager, Meta Pixel)",
        "Dopracowane warianty pod kampanie lokalne i ogólnokrajowe",
      ],
    },
    process: [
      { step: "01", title: "Cel kampanii", desc: "Definiujemy pożądaną akcję: telefon, formularz lub zapis." },
      { step: "02", title: "Copywriting i struktura", desc: "Układamy sekcje perswazyjne: ból klienta, rozwiązanie, dowód." },
      { step: "03", title: "Wdrożenie Next.js", desc: "Kodujemy stronę z naciskiem na wynik 100/100 w PageSpeed." },
      { step: "04", title: "Podpięcie analityki", desc: "Konfigurujemy zdarzenia konwersji i uruchamiamy testy." },
    ],
    businessBenefits: [
      { title: "Niższy koszt pozyskania klienta", desc: "Szybka strona osiąga wyższy wynik jakości reklam, co obniża stawki za kliknięcie." },
      { title: "Większy procent konwersji", desc: "Brak menu rozpraszającego uwagę zatrzymuje użytkownika na ścieżce zakupu." },
      { title: "Błyskawiczne uruchomienie", desc: "Prosty landing page jesteśmy w stanie wdrożyć już w 7–10 dni roboczych." },
    ],
    faq: [
      {
        question: "Czy landing page może być na mojej obecnej domenie?",
        answer: "Tak, możemy uruchomić go na subdomenie (np. oferta.twojadomena.pl) lub w podkatalogu bez ingerencji w stary serwis.",
      },
      {
        question: "Czy pomagacie z tekstami na landing page?",
        answer: "Tak, redagujemy nagłówki i sekcje korzyści w oparciu o informacje o Twojej ofercie.",
      },
    ],
    relatedServices: [
      { slug: "strony-internetowe", title: "Nowoczesne strony firmowe" },
      { slug: "seo-techniczne", title: "SEO techniczne" },
    ],
    relatedBlogSlug: "ile-kosztuje-nowoczesna-strona-www",
  },
  {
    slug: "seo-techniczne",
    title: "Techniczne SEO i audyt architektury",
    tagline: "Solidny fundament pod wysokie pozycje w organicznych wynikach Google",
    shortDescription:
      "Optymalizacja kodu, struktury danych Schema.org i indeksowania SSR. Eliminujemy bariery, przez które roboty Google pomijają Twoją treść.",
    problem: {
      heading: "Piszesz świetne artykuły, ale Google ich nie docenia?",
      description:
        "Nawet najlepsze treści nie przyniosą ruchu, jeśli bot wyszukiwarki napotka błędy w kodzie, zablokowane zasoby, zduplikowane adresy URL lub zbyt wolne renderowanie po stronie klienta.",
      symptoms: [
        "Spadek pozycji po aktualizacjach algorytmów Google",
        "Strony nie chcą się zaindeksować w Google Search Console",
        "Brak widoczności w wynikach z rozszerzeniami (Rich Snippets)",
      ],
    },
    solution: {
      heading: "Co optymalizujemy w kodzie strony?",
      description:
        "Wdrażamy architekturę Server-Side Rendering w Next.js. Sprawiamy, że każda strona ma unikalny kanoniczny adres, idealną strukturę nagłówków i precyzyjne metadane.",
      deliverables: [
        "Audyt techniczny i usunięcie wąskich gardeł indeksowania",
        "Wdrożenie danych strukturalnych JSON-LD (Schema.org)",
        "Optymalizacja sitemap.xml, robots.txt i tagów kanonicznych",
        "Wyeliminowanie błędów w raportach Core Web Vitals",
      ],
    },
    process: [
      { step: "01", title: "Audyt Search Console", desc: "Sprawdzamy stan indeksowania i błędy raportowane przez Google." },
      { step: "02", title: "Plan naprawczy", desc: "Identyfikujemy krytyczne błędy blokujące pozycjonowanie." },
      { step: "03", title: "Wdrożenie poprawek", desc: "Modyfikujemy kod szablonu, nagłówki HTTP i znaczniki meta." },
      { step: "04", title: "Weryfikacja w Google", desc: "Zgłaszamy poprawki i monitorujemy wzrost zaindeksowanych podstron." },
    ],
    businessBenefits: [
      { title: "Darmowy, stabilny ruch z Google", desc: "Dobre techniczne SEO pracuje na Twoją firmę miesiącami bez płacenia za każde kliknięcie." },
      { title: "Lepszy podgląd w social media", desc: "Starannie sformatowane tagi OpenGraph zwiększają klikalność linków udostępnianych w sieci." },
      { title: "Zgodność z wytycznymi Google", desc: "Strona oparta na standardach webowych jest odporna na nagłe zmiany algorytmów." },
    ],
    faq: [
      {
        question: "Czym różni się SEO techniczne od pozycjonowania treści?",
        answer: "SEO techniczne przygotowuje silnik strony, by roboty mogły go bezbłędnie czytać. Bez tego nawet najlepsze teksty nie osiągną wysokich pozycji.",
      },
      {
        question: "Czy gwarantujecie 1. miejsce w Google?",
        answer: "Nie składamy fałszywych obietnic. Gwarantujemy natomiast bezbłędny fundament techniczny zgodny z oficjalnymi wytycznymi Google Search Central.",
      },
    ],
    relatedServices: [
      { slug: "redesign-i-wydajnosc", title: "Przebudowa i wydajność" },
      { slug: "strony-internetowe", title: "Nowoczesne strony firmowe" },
    ],
    relatedBlogSlug: "dlaczego-szybkosc-strony-decyduje-o-sprzedazy",
  },
  {
    slug: "redesign-i-wydajnosc",
    title: "Przebudowa i optymalizacja wydajności",
    tagline: "Nowe życie dla Twojego obecnego serwisu bez utraty pozycji w Google",
    shortDescription:
      "Zastępujemy przestarzałe, wolno działające strony nowoczesnym rozwiązaniem w Next.js. Przenosimy wypracowany ruch i pozycje.",
    problem: {
      heading: "Twoja obecna strona powstała kilka lat temu i wstyd ją pokazać?",
      description:
        "Internet rozwija się błyskawicznie. Strona zaprojektowana 5 lat temu często nie spełnia współczesnych standardów responsywności, działa ociężale i budzi wątpliwości u wymagających klientów.",
      symptoms: [
        "Przestarzały design, który nie oddaje obecnej skali Twojej firmy",
        "Obawa, że wdrożenie nowej strony spowoduje spadek widoczności w Google",
        "Ciągłe problemy techniczne i powolne ładowanie na telefonach",
      ],
    },
    solution: {
      heading: "Bezpieczna modernizacja krok po kroku",
      description:
        "Przeprowadzamy migrację z zachowaniem wszystkich dotychczasowych adresów URL lub przygotowaniem precyzyjnych przekierowań 301. Zyskujesz nowoczesny wizerunek bez ryzyka.",
      deliverables: [
        "Pełne mapowanie istniejących adresów URL pod kątem zachowania SEO",
        "Nowy, świeży projekt graficzny zgodny ze współczesnymi trendami",
        "Skrócenie czasu ładowania strony z kilku sekund do poniżej 1 sekundy",
        "Przeniesienie i uporządkowanie dotychczasowych treści ofertowych",
      ],
    },
    process: [
      { step: "01", title: "Audyt obecnego serwisu", desc: "Inwentaryzujemy wszystkie podstrony i wypracowane pozycje w Google." },
      { step: "02", title: "Nowy projekt wizualny", desc: "Tworzymy estetykę, która odpowiada obecnej renomie Twojej marki." },
      { step: "03", title: "Migracja treści i przekierowania", desc: "Przenosimy materiały i konfigurujemy przekierowania 301." },
      { step: "04", title: "Przełączenie bez przestojów", desc: "Zmieniamy serwery w godzinach najmniejszego ruchu bez przerw w działaniu." },
    ],
    businessBenefits: [
      { title: "Brak utraty klientów z Google", desc: "Dzięki mapowaniu URL zachowujesz dotychczasowe pozycje i historię domeny." },
      { title: "Zastrzyk zaufania dla marki", desc: "Nowoczesny serwis pozwala śmielej oferować droższe usługi i produkty premium." },
      { title: "Drastyczna poprawa szybkości", desc: "Koniec z czekaniem na otwarcie podstron – wszystko działa płynnie." },
    ],
    faq: [
      {
        question: "Czy strona przestanie działać w trakcie przebudowy?",
        answer: "Nie. Nową stronę budujemy w odizolowanym środowisku testowym. Twój stary serwis działa bez zakłóceń aż do momentu ostatecznego przełączenia.",
      },
      {
        question: "Co stanie się ze starymi linkami?",
        answer: "Konfigurujemy trwałe przekierowania 301, dzięki czemu każdy stary link z wyszukiwarki lub zakładek klientów bezpiecznie trafi na nową podstronę.",
      },
    ],
    relatedServices: [
      { slug: "strony-internetowe", title: "Nowoczesne strony firmowe" },
      { slug: "landing-page", title: "Landing Pages" },
    ],
    relatedBlogSlug: "ile-kosztuje-nowoczesna-strona-www",
  },
];

// Zachowujemy kompatybilność z poprzednim interfejsem dla Bento Grid
export const servicesData = servicesList.map((s) => ({
  id: s.slug,
  title: s.title,
  shortDescription: s.shortDescription,
  businessBenefit: s.businessBenefits[0]?.desc || "",
  scope: s.solution.deliverables,
}));
