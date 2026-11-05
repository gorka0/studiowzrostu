/**
 * Treści podstrony "O nas"
 * STATUS: Zespół Studio Wzrostu
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
  author: "Zespół Studio Wzrostu",
  heading: "Tworzymy serwisy, które bezpośrednio wspierają rozwój firm",
  subheading:
    "Studio Wzrostu powstało z prostego założenia: rozwijająca się firma zasługuje na szybką, dopracowaną stronę bez długu technologicznego i szablonowego chaosu.",
  paragraphs: [
    "Jesteśmy zespołem inżynierów i projektantów Studio Wzrostu. Pomagamy przedsiębiorcom w budowie niezależnych, szybkich serwisów firmowych w oparciu o czysty kod.",
    "Współczesny klient oczekuje błyskawicznej odpowiedzi. Każda sekunda opóźnienia w ładowaniu oferty na smartfonie zmniejsza szansę na pozyskanie zapytania.",
    "Dlatego tworzymy strony w oparciu o czysty, nowoczesny kod bez powolnych wtyczek. Łączymy stabilne technologie z przejrzystym projektem graficznym.",
  ],
  commitments: [
    "Brak pośredników – bezpośredni kontakt z inżynierami prowadzącymi projekt",
    "Rozliczenie etapowe po odbiorze kolejnych części serwisu",
    "Pełna własność kodu źródłowego i brak umów wiążących",
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
    "Nie zatrudniamy anonimowych podwykonawców. Bezpośrednio odpowiadamy za jakość architektury i kod każdego serwisu wychodzącego z naszego studia.",
};
