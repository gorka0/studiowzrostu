/**
 * Treści podstrony "O nas"
 * STATUS: Szkic do autorskiej redakcji przez Tomasza Górkę
 */

export interface AboutContent {
  status: "szkic_do_redakcji";
  author: string;
  heading: string;
  subheading: string;
  paragraphs: string[];
  commitments: string[];
  principles: {
    number: string;
    title: string;
    desc: string;
  }[];
  quote: string;
}

export const aboutContent: AboutContent = {
  status: "szkic_do_redakcji",
  author: "Tomasz Górka",
  heading: "Tworzymy serwisy, które bezpośrednio wspierają rozwój firm",
  subheading:
    "Studio Wzrostu powstało z prostego założenia: rozwijająca się firma zasługuje na szybką, dopracowaną stronę bez długu technologicznego i szablonowego chaosu.",
  paragraphs: [
    "Nazywam się Tomasz Górka i założyłem Studio Wzrostu, aby pomóc przedsiębiorcom w budowie niezależnych, szybkich serwisów w oparciu o czysty kod.",
    "Współczesny klient oczekuje błyskawicznej odpowiedzi. Każda sekunda opóźnienia w ładowaniu oferty na smartfonie zmniejsza szansę na pozyskanie zapytania.",
    "Dlatego wdrażamy serwisy w Next.js, React i TypeScript. Łączymy precyzyjne programowanie z czytelną, szwajcarską dyscypliną typograficzną.",
  ],
  commitments: [
    "Brak pośredników – bezpośredni kontakt z inżynierem prowadzącym projekt",
    "Rozliczenie etapowe po odbiorze kolejnych części serwisu",
    "100% własności kodu źródłowego i brak umów wiążących",
  ],
  principles: [
    {
      number: "01",
      title: "Autorski kod bez szablonów",
      desc: "Nie instalujemy masowych motywów z dziesiątkami zbędnych wtyczek. Piszemy dedykowany kod w React i TypeScript, który pozostaje szybki i bezpieczny.",
    },
    {
      number: "02",
      title: "Przejrzyste partnerstwo",
      desc: "Nie ukrywamy kosztów i nie uzależniamy Cię od stałych abonamentów. Po wdrożeniu otrzymujesz pełne repozytorium kodu na własność.",
    },
    {
      number: "03",
      title: "Konkretny cel biznesowy",
      desc: "Strona internetowa ma przynosić zapytania ofertowe i budować zaufanie. Funkcjonalność i szybkość są fundamentem każdego wdrożenia.",
    },
  ],
  quote:
    "Nie zatrudniamy anonimowych podwykonawców. Osobiście odpowiadam za jakość architektury i kod każdego serwisu wychodzącego ze studia.",
};
