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
      "Dla standardowej strony wdrożenie trwa 3–4 dni robocze. Pracujemy w ustalonym harmonogramie bez przestojów.",
  },
  {
    id: "od-czego-zalezy-cena",
    question: "Od czego zależy ostateczna cena wdrożenia?",
    answer:
      "Cenę ustalamy z góry przed startem prac. Zależy wyłącznie od liczby podstron i wymaganych funkcji.",
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
