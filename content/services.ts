/**
 * Baza danych usług studia
 * Precyzyjne, rzetelne opisy usług bez agresywnego marketingu i nierealistycznych gwarancji.
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
  relatedProject: {
    title: string;
    description: string;
    href: string;
  };
}

export const servicesList: ServiceDetail[] = [
  {
    slug: "strony-internetowe",
    title: "Nowoczesne strony internetowe dla firm",
    tagline: "Dedykowane strony firmowe, które budują wiarygodność i ułatwiają kontakt",
    shortDescription:
      "Dedykowane serwisy firmowe od zera, z szybkim ładowaniem na smartfonach.",
    problem: {
      heading: "Dlaczego typowa strona firmowa nie przynosi zapytań?",
      description:
        "Wiele stron powstaje na masowych motywach z dziesiątkami zbędnych wtyczek. Ładują się powoli, rozjeżdżają na telefonach i nie odpowiadają wprost na pytania klientów.",
      symptoms: [
        "Wysoki współczynnik odrzuceń – użytkownicy wychodzą przed zapoznaniem się z ofertą",
        "Trudności z edycją i obawa przed awariami po aktualizacji wtyczek",
        "Brak wyróżnienia na tle konkurencji w branży",
      ],
    },
    solution: {
      heading: "Co konkretnie dla Ciebie robimy?",
      description:
        "Tworzymy autorski serwis w Next.js, dopasowany do specyfiki Twojej branży. Każdy element układu ma jeden cel: czytelnie przedstawić ofertę i ułatwić kontakt.",
      deliverables: [
        "Indywidualny projekt graficzny w czytelnej estetyce",
        "Architektura Next.js z szybkim renderowaniem po stronie serwera",
        "Zabezpieczony formularz kontaktowy z powiadomieniami e-mail",
        "Pełne wdrożenie na Twojej domenie z certyfikatem SSL",
      ],
    },
    process: [
      { step: "01", title: "Brief i analiza oferty", desc: "Poznajemy Twoich klientów i definiujemy strukturę strony." },
      { step: "02", title: "Projekt makiety", desc: "Układamy teksty i hierarchię wizualną pod kątem czytelności." },
      { step: "03", title: "Kodowanie w Next.js", desc: "Piszemy czysty, semantyczny kod produkcyjny." },
      { step: "04", title: "Testy i publikacja", desc: "Weryfikujemy działanie na różnych ekranach i podpinamy domenę." },
    ],
    businessBenefits: [
      { title: "Zaufanie od pierwszej sekundy", desc: "Profesjonalny wizerunek sprawia, że klienci traktują firmę jako rzetelnego partnera." },
      { title: "Więcej wartościowych zapytań", desc: "Przejrzysta ścieżka prowadzi użytkownika prosto do formularza lub telefonu." },
      { title: "Stabilność technologiczna", desc: "Czysty kod bez podatnych wtyczek oznacza spokój przy aktualizacjach." },
    ],
    faq: [
      {
        question: "Ile trwa wdrożenie nowej strony firmowej?",
        answer: "Dla typowej strony firmowej wdrożenie zajmuje zwykle 1 tydzień (7 dni) od momentu akceptacji założeń i dostarczenia kompletu materiałów.",
      },
      {
        question: "Gdzie utrzymywana jest strona i jak wygląda hosting?",
        answer: "Stronę wdrażamy na platformie bezserwerowej (Vercel lub Cloudflare) z darmowym certyfikatem SSL i globalnym CDN. Pomagamy bezpłatnie podpiąć domenę.",
      },
      {
        question: "Czy po wdrożeniu otrzymuję kod na własność?",
        answer: "Tak. Otrzymujesz pełne repozytorium kodu bez ukrytych opłat licencyjnych czy abonamentów.",
      },
    ],
    relatedServices: [
      { slug: "seo-techniczne", title: "SEO techniczne i widoczność" },
      { slug: "redesign-i-wydajnosc", title: "Przebudowa istniejącego serwisu" },
    ],
    relatedBlogSlug: "strona-internetowa-a-rozwoj-biznesu",
    relatedProject: {
      title: "Koncepcja serwisu maszyn B2B",
      description: "Strona firmowa z formularzem zapytań bezpośrednio na pierwszym ekranie.",
      href: "/projekty",
    },
  },
  {
    slug: "landing-page",
    title: "Strony docelowe (Landing Page) pod reklamy",
    tagline: "Jednostronicowe serwisy kampanijne zaprojektowane pod ruch z płatnych reklam",
    shortDescription:
      "Jednostronicowe serwisy docelowe zoptymalizowane pod płatne kampanie i pozyskiwanie zapytań.",
    problem: {
      heading: "Przepalasz budżet reklamowy na wolnej stronie?",
      description:
        "Kierowanie płatnego ruchu na ogólną stronę główną z wieloma rozpraszaczami lub wolno ładujący się szablon obniża skuteczność kampanii i podnosi koszt pozyskania zapytania.",
      symptoms: [
        "Wysoki koszt pojedynczego kliknięcia przez słaby wskaźnik jakości",
        "Użytkownicy klikają reklamę, ale nie przechodzą do kontaktu",
        "Rozproszona uwaga – zbyt wiele linków odciągających od oferty",
      ],
    },
    solution: {
      heading: "Jak projektujemy skuteczny Landing Page?",
      description:
        "Usuwamy zbędny szum informacyjny. Budujemy spójną narrację od nagłówka, przez dowody wartości, aż po prosty formularz zintegrowany z Twoją skrzynką.",
      deliverables: [
        "Struktura zorientowana na jedno, konkretne działanie użytkownika",
        "Błyskawiczne ładowanie pod kątem ruchu mobilnego z reklam",
        "Przygotowanie pod narzędzia analityczne",
        "Przejrzysty układ dopasowany do specyfiki kampanii",
      ],
    },
    process: [
      { step: "01", title: "Cel kampanii", desc: "Definiujemy pożądaną akcję: telefon lub formularz." },
      { step: "02", title: "Struktura i treść", desc: "Układamy sekcje oferty: potrzeba klienta, rozwiązanie, kontakt." },
      { step: "03", title: "Wdrożenie Next.js", desc: "Kodujemy stronę z naciskiem na szybkie ładowanie na telefonach." },
      { step: "04", title: "Podpięcie analityki", desc: "Konfigurujemy zdarzenia kontaktu i uruchamiamy testy." },
    ],
    businessBenefits: [
      { title: "Lepsze wykorzystanie budżetu", desc: "Szybka strona ułatwia użytkownikowi dotarcie do formularza bez zbędnego czekania." },
      { title: "Większa czytelność przekazu", desc: "Brak menu rozpraszającego uwagę zatrzymuje użytkownika na ofercie." },
      { title: "Sprawne uruchomienie", desc: "Przygotowanie typowego landing page zajmuje zwykle do 1 tygodnia." },
    ],
    faq: [
      {
        question: "Czy landing page może być na mojej obecnej domenie?",
        answer: "Tak, możemy uruchomić go na subdomenie lub w dedykowanym katalogu bez ingerencji w obecny serwis.",
      },
      {
        question: "Czy pomagacie z tekstami na landing page?",
        answer: "Tak, pomagamy ułożyć nagłówki i sekcje korzyści w oparciu o informacje o Twojej ofercie.",
      },
    ],
    relatedServices: [
      { slug: "strony-internetowe", title: "Nowoczesne strony firmowe" },
      { slug: "seo-techniczne", title: "SEO techniczne" },
    ],
    relatedBlogSlug: "jak-zdobyc-wiecej-klientow-ze-strony-internetowej",
    relatedProject: {
      title: "Koncepcja landing page aplikacji",
      description: "Układ produktowy typu single-feature z natychmiastowym interfejsem grafiku.",
      href: "/projekty",
    },
  },
  {
    slug: "seo-techniczne",
    title: "Pozycjonowanie i techniczne SEO",
    tagline: "Solidny fundament pod stabilną widoczność w wyszukiwarce",
    shortDescription:
      "Optymalizacja kodu i semantyki HTML, aby wyszukiwarki bezbłędnie czytały ofertę.",
    problem: {
      heading: "Dobra oferta, ale wyszukiwarka jej nie docenia?",
      description:
        "Nawet najlepsze treści nie przyniosą ruchu, jeśli bot wyszukiwarki napotka błędy w kodzie, zablokowane zasoby, zduplikowane adresy URL lub powolne renderowanie.",
      symptoms: [
        "Trudności z indeksowaniem podstron w Google Search Console",
        "Niska czytelność struktury strony dla algorytmów",
        "Słabe wyniki w raportach Core Web Vitals",
      ],
    },
    solution: {
      heading: "Co optymalizujemy w kodzie strony?",
      description:
        "Wdrażamy architekturę Server-Side Rendering w Next.js. Dbamy o jednoznaczne adresy kanoniczne, logiczną hierarchię nagłówków i precyzyjne metadane.",
      deliverables: [
        "Audyt techniczny i usunięcie wąskich gardeł indeksowania",
        "Wdrożenie danych strukturalnych JSON-LD (Schema.org)",
        "Optymalizacja sitemapy, robots.txt i tagów kanonicznych",
        "Uporządkowanie architektury nagłówków pod kątem czytelności",
      ],
    },
    process: [
      { step: "01", title: "Audyt Search Console", desc: "Sprawdzamy stan indeksowania i błędy raportowane przez narzędzia." },
      { step: "02", title: "Plan naprawczy", desc: "Identyfikujemy kwestie blokujące sprawne odczytywanie serwisu." },
      { step: "03", title: "Wdrożenie poprawek", desc: "Modyfikujemy strukturę kodu, nagłówki HTTP i znaczniki meta." },
      { step: "04", title: "Weryfikacja", desc: "Zgłaszamy poprawki i monitorujemy stan zaindeksowania serwisu." },
    ],
    businessBenefits: [
      { title: "Stabilny ruch z wyszukiwarki", desc: "Dobre techniczne SEO wspiera długofalową obecność firmy w organicznych wynikach." },
      { title: "Czytelny podgląd w sieci", desc: "Prawidłowo skonfigurowane tagi OpenGraph ułatwiają udostępnianie linków." },
      { title: "Zgodność ze standardami webowymi", desc: "Kod oparty na oficjalnych standardach jest bezpieczniejszy przy zmianach algorytmów." },
    ],
    faq: [
      {
        question: "Czym różni się SEO techniczne od pozycjonowania treści?",
        answer: "SEO techniczne przygotowuje kod i strukturę serwisu, by roboty mogły go bezbłędnie czytać. To fundament pod wszelkie działania z treścią.",
      },
      {
        question: "Gdzie utrzymywana jest strona i jak wygląda hosting?",
        answer: "Stronę wdrażamy na bezpiecznej infrastrukturze bezserwerowej z siecią CDN i certyfikatem SSL. Pomagamy bezpłatnie podpiąć domenę.",
      },
      {
        question: "Czy gwarantujecie 1. miejsce w Google?",
        answer: "Nie składamy nierealistycznych obietnic. Zapewniamy bezbłędny fundament techniczny zgodny z oficjalnymi wytycznymi Google Search Central.",
      },
    ],
    relatedServices: [
      { slug: "redesign-i-wydajnosc", title: "Przebudowa i wydajność" },
      { slug: "strony-internetowe", title: "Nowoczesne strony firmowe" },
    ],
    relatedBlogSlug: "strona-internetowa-a-rozwoj-biznesu",
    relatedProject: {
      title: "Koncepcja redesignu i optymalizacji",
      description: "Porównanie czytelności i parametrów technicznych przed i po modernizacji.",
      href: "/projekty",
    },
  },
  {
    slug: "redesign-i-wydajnosc",
    title: "Przebudowa i przyspieszenie starej strony",
    tagline: "Nowe życie dla obecnego serwisu z dbałością o dotychczasową strukturę adresów",
    shortDescription:
      "Przebudowa starej witryny z dbałością o przekierowania i dotychczasowe pozycje.",
    problem: {
      heading: "Obecna strona powstała lata temu i nie budzi zaufania?",
      description:
        "Strona zaprojektowana kilka lat temu często nie spełnia współczesnych standardów responsywności, działa ociężale i nie buduje profesjonalnego wizerunku.",
      symptoms: [
        "Przestarzały układ, który nie oddaje obecnej skali Twojej firmy",
        "Obawa, że wdrożenie nowej strony zaburzy obecny ruch z wyszukiwarki",
        "Powolne ładowanie i niewygodna nawigacja na smartfonach",
      ],
    },
    solution: {
      heading: "Bezpieczna modernizacja krok po kroku",
      description:
        "Przeprowadzamy migrację z zachowaniem dotychczasowych adresów URL lub przygotowaniem precyzyjnych przekierowań 301. Nowy wizerunek bez niepotrzebnego ryzyka.",
      deliverables: [
        "Zachowanie dotychczasowych struktur URL lub mapa przekierowań 301",
        "Nowy, czytelny projekt graficzny dopasowany do współczesnych ekranów",
        "Skrócenie czasu ładowania strony do ułamka sekundy",
        "Uporządkowanie i przeniesienie kluczowych treści ofertowych",
      ],
    },
    process: [
      { step: "01", title: "Audyt obecnego serwisu", desc: "Inwentaryzujemy podstrony, strukturę adresów i stan indeksowania." },
      { step: "02", title: "Nowy projekt wizualny", desc: "Tworzymy estetykę, która odpowiada obecnej renomie Twojej marki." },
      { step: "03", title: "Migracja treści i przekierowania", desc: "Przenosimy materiały i konfigurujemy trwałe przekierowania 301." },
      { step: "04", title: "Przełączenie bez przestojów", desc: "Zmieniamy serwery w godzinach najmniejszego ruchu bez przerw w działaniu." },
    ],
    businessBenefits: [
      { title: "Dbałość o historię domeny", desc: "Dzięki mapowaniu URL dbamy o zachowanie wypracowanego autorytetu i ciągłości ruchu." },
      { title: "Większe zaufanie do marki", desc: "Przejrzysty, nowoczesny serwis ułatwia klientom podjęcie decyzji o kontakcie." },
      { title: "Płynne działanie na telefonach", desc: "Strona otwiera się szybko i wygodnie przegląda na małych ekranach." },
    ],
    faq: [
      {
        question: "Czy strona przestanie działać w trakcie przebudowy?",
        answer: "Nie. Nową stronę przygotowujemy w środowisku testowym. Obecny serwis działa bez zakłóceń aż do momentu ostatecznego przełączenia.",
      },
      {
        question: "Gdzie utrzymywana jest nowa strona?",
        answer: "Wdrażamy ją na bezserwerowym hostingu (np. Vercel) z darmowym certyfikatem SSL i globalnym CDN, co eliminuje koszty ciężkich serwerów.",
      },
      {
        question: "Co stanie się ze starymi linkami?",
        answer: "Konfigurujemy trwałe przekierowania 301, dzięki czemu stare linki z wyszukiwarki bezpiecznie prowadzą na odpowiednie podstrony.",
      },
    ],
    relatedServices: [
      { slug: "strony-internetowe", title: "Nowoczesne strony firmowe" },
      { slug: "landing-page", title: "Landing Pages" },
    ],
    relatedBlogSlug: "strona-internetowa-a-rozwoj-biznesu",
    relatedProject: {
      title: "Interaktywne porównanie przed i po redesignie",
      description: "Porównanie układu przed i po modernizacji.",
      href: "/projekty",
    },
  },
];

export const servicesData = servicesList.map((s) => ({
  id: s.slug,
  title: s.title,
  shortDescription: s.shortDescription,
  businessBenefit: s.businessBenefits[0]?.desc || "",
  scope: s.solution.deliverables,
}));
