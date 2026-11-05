/**
 * Baza najczęściej zadawanych pytań (FAQ) na stronie głównej
 * Dokładnie 4 kluczowe pytania biznesowe i technologiczne (odpowiedzi ≤ 2 zdania).
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: "czas-realizacji",
    question: "Ile trwa stworzenie strony internetowej dla firmy?",
    answer:
      "Dla standardowej strony wdrożenie trwa 1 tydzień (7 dni). Pracujemy w ustalonym harmonogramie bez przestojów.",
  },
  {
    id: "od-czego-zalezy-cena",
    question: "Od czego zależy ostateczna cena wdrożenia?",
    answer:
      "Cenę ustalamy z góry przed startem prac (projekty od 900 zł netto). Otrzymujesz wiążącą specyfikację bez ukrytych opłat.",
  },
  {
    id: "dlaczego-react-nextjs-zamiast-szablonu",
    question: "Dlaczego warto wybrać stronę w React i Next.js zamiast gotowego szablonu?",
    answer:
      "Next.js generuje lekki kod bez ociężałych wtyczek. Strona ładuje się błyskawicznie i jest czytelna dla wyszukiwarek.",
  },
  {
    id: "materialy-i-teksty",
    question: "Czy przed rozpoczęciem prac muszę mieć gotowe teksty i zdjęcia?",
    answer:
      "Nie musisz mieć gotowych materiałów. Pomożemy ułożyć strukturę oferty i przygotować czytelne teksty.",
  },
];
