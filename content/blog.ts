/**
 * Wpisy na blogu inżynieryjnym
 * STATUS: Szkic do autorskiej redakcji przez Tomasza Górkę
 */

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  seoDescription?: string;
  date: string;
  formattedDate: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
  };
  isDraft: true;
  draftNotice: string;
  category: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      paragraphs: string[];
      keyTakeaway?: string;
    }[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "dlaczego-szybkosc-strony-decyduje-o-sprzedazy",
    title: "Dlaczego szybkość strony decyduje o sprzedaży bardziej niż sam wygląd?",
    seoTitle: "Szybkość strony a sprzedaż | Studio Wzrostu",
    excerpt:
      "Nawet najpiękniejszy projekt graficzny nie przyniesie klientów, jeśli strona ładuje się dłużej niż 3 sekundy. Dowiedz się, dlaczego Google Core Web Vitals to dziś kluczowy wskaźnik rentowności.",
    seoDescription:
      "Nawet najpiękniejsza strona nie sprzedaje, jeśli ładuje się ponad 3 sekundy. Zobacz, dlaczego Core Web Vitals to dziś kluczowy wskaźnik rentowności.",
    date: "2026-10-15",
    formattedDate: "15 października 2026",
    readingTime: "4 min czytania",
    author: {
      name: "Tomasz Górka",
      role: "Właściciel Studia Wzrostu",
    },
    isDraft: true,
    draftNotice: "Szkic artykułu – wersja robocza przygotowana do publikacji.",
    category: "Wydajność & Biznes",
    content: {
      lead:
        "Wielu przedsiębiorców skupia się wyłącznie na kolorach, animacjach i zdjęciach w sekcji hero. Tymczasem badania zachowań konsumentów pokazują bezwzględną zależność: każda sekunda opóźnienia w ładowaniu strony drastycznie obniża współczynnik konwersji.",
      sections: [
        {
          heading: "Złudzenie 'ładnej' strony, która nie sprzedaje",
          paragraphs: [
            "Wyobraź sobie sklep stacjonarny, do którego drzwi otwierają się dopiero po 5 sekundach szarpania za klamkę. Ilu klientów poczeka na wejście, a ilu przejdzie do lokalu obok? W internecie ten mechanizm działa jeszcze brutalniej.",
            "Większość tradycyjnych witryn cierpi na nadmiar zbędnych skryptów śledzących, ciężkich bibliotek i nieoptymalizowanych zdjęć. Użytkownik widzi biały ekran, podczas gdy procesor jego telefonu próbuje rozpakować megabajty zbędnego kodu.",
          ],
          keyTakeaway: "Klient nie oceni Twojej oferty, jeśli zamknie kartę przed jej załadowaniem.",
        },
        {
          heading: "Oficjalny wskaźnik Google: Core Web Vitals",
          paragraphs: [
            "Od kilku lat szybkość strony nie jest jedynie subiektywnym odczuciem, lecz oficjalnym czynnikiem rankingowym w wyszukiwarce Google. Metryki takie jak LCP (Largest Contentful Paint) oraz INP (Interaction to Next Paint) decydują o tym, jak wysoko Twoja strona wyświetla się w wynikach wyszukiwania.",
            "Gdy Twoja strona osiąga zielone wyniki w testach PageSpeed, roboty Google częściej ją odwiedzają, a koszt płatnych kampanii reklamowych Google Ads spada dzięki wyższemu Wynikowi Jakości.",
          ],
        },
        {
          heading: "Jak Next.js rozwiązuje problem raz na zawsze?",
          paragraphs: [
            "Nowoczesne podejście oparte na Next.js przesyła do przeglądarki gotowy, lekki kod HTML wygenerowany na serwerze (Server-Side Rendering). Użytkownik widzi treść natychmiast – w ułamku sekundy, nawet na słabym zasięgu LTE.",
            "Dzięki temu nie musisz rezygnować z nowoczesnej estetyki na rzecz szybkości. Zyskujesz jedno i drugie: profesjonalny design i bezkonkurencyjny czas reakcji.",
          ],
          keyTakeaway: "Server-side rendering łączy elegancję z natychmiastowym ładowaniem.",
        },
      ],
    },
  },
  {
    slug: "ile-kosztuje-nowoczesna-strona-www",
    title: "Ile naprawdę kosztuje strona internetowa dla firmy w 2026 roku?",
    seoTitle: "Ile kosztuje strona w Next.js? | Studio Wzrostu",
    excerpt:
      "Od tanich szablonów z ukrytymi kosztami po dedykowane serwisy w React. Przejrzyste zestawienie modeli rozliczeń, ryzyk i realnych kosztów utrzymania.",
    date: "2026-10-22",
    formattedDate: "22 października 2026",
    readingTime: "6 min czytania",
    author: {
      name: "Tomasz Górka",
      role: "Właściciel Studia Wzrostu",
    },
    isDraft: true,
    draftNotice: "Szkic artykułu – wersja robocza przygotowana do publikacji.",
    category: "Strategia & Koszty",
    content: {
      lead:
        "Ceny stron firmowych w Polsce wahają się od kilkuset złotych do kilkudziesięciu tysięcy. Skąd biorą się tak ogromne rozbieżności i dlaczego najtańsza oferta na starcie bywa najdroższa w perspektywie dwóch lat?",
      sections: [
        {
          heading: "Pozorne oszczędności na szablonach",
          paragraphs: [
            "Kupienie gotowego szablonu za 200 zł wydaje się kuszącą opcją. Problem pojawia się, gdy trzeba dostosować go do realnych potrzeb firmy. Okazuje się, że szablon wymaga 15 różnych wtyczek, z których każda po roku przechodzi na płatny abonament.",
            "Co gorsza, masowe szablony zawierają gigantyczne ilości uniwersalnego kodu, którego Twoja firma nigdy nie użyje, a który skutecznie spowalnia ładowanie serwisu.",
          ],
          keyTakeaway: "Tani szablon to często początek niekończących się wydatków na poprawki i wtyczki.",
        },
        {
          heading: "Dedykowany kod w React / Next.js – jak to działa?",
          paragraphs: [
            "W przypadku dedykowanego wdrożenia płacisz wyłącznie za to, czego potrzebuje Twój biznes. Każda linijka kodu powstaje z myślą o Twojej ofercie i Twoich klientach. Strona jest lżejsza o 80–90% od typowego serwisu na WordPressie.",
            "Koszty hostingu nowoczesnej strony w architekturze serverless są praktycznie zerowe w porównaniu do tradycyjnych serwerów dedykowanych, a bezpieczeństwo jest nieporównywalnie wyższe.",
          ],
        },
        {
          heading: "Na co zwrócić uwagę przed podpisaniem umowy?",
          paragraphs: [
            "Zawsze sprawdzaj, czy po wdrożeniu otrzymujesz pełne prawa majątkowe i dostęp do kodu źródłowego, czy też jesteś 'uwiązany' w autorskim systemie agencji. Uczciwy wykonawca daje Ci pełną niezależność od pierwszego dnia.",
            "W Studio Wzrostu rozliczamy się etapami po zatwierdzeniu kolejnych części prac i przekazujemy Ci 100% praw do repozytorium.",
          ],
          keyTakeaway: "Pełna własność kodu to bezpieczeństwo i niezależność Twojego biznesu.",
        },
      ],
    },
  },
];
