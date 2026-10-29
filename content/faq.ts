/**
 * Baza najczęściej zadawanych pytań (FAQ)
 * STATUS: Szkic do autorskiej redakcji przez Tomasza Górkę
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: "ile-trwa-zrobienie-strony",
    question: "Ile trwa zrobienie strony?",
    answer:
      "Dla typowej strony firmowej lub landing page przygotowanie zajmuje nam zwykle 3–4 dni robocze od momentu akceptacji wyceny i dostarczenia kompletu materiałów (warunki orientacyjne – do potwierdzenia przed realizacją).",
  },
  {
    id: "skad-wiem-ile-zaplace",
    question: "Skąd wiem, ile zapłacę?",
    answer:
      "Wycenę otrzymujesz z góry, zanim cokolwiek zaczniemy, więc wiesz dokładnie, za co płacisz. Zakres prac i specyfikacja elementów ustalane są przed przystąpieniem do realizacji.",
  },
  {
    id: "dlaczego-nextjs",
    question: "Dlaczego tworzycie strony w Next.js i React, a nie na popularnych szablonach?",
    answer:
      "Strony oparte na Next.js działają błyskawicznie, nie są obciążone zbędnymi wtyczkami i są znacznie bezpieczniejsze od typowych systemów CMS. Zapewniają lepsze wyniki w Google (Core Web Vitals) i wyższą konwersję z odwiedzających na klientów.",
  },
  {
    id: "co-z-hostingiem",
    question: "Gdzie będzie utrzymywana strona i jak wygląda sprawa hostingu?",
    answer:
      "Stronę wdrażamy na nowoczesnej, bezserwerowej platformie hostingowej (np. Vercel lub Cloudflare), która zapewnia wysoką dostępność, darmowy certyfikat SSL i globalny CDN. Pomagamy skonfigurować Twoją domenę bez zbędnych formalności.",
  },
  {
    id: "czy-pomagacie-w-tresciach",
    question: "Czy muszę mieć przygotowane gotowe teksty przed rozpoczęciem prac?",
    answer:
      "Nie musisz. Pomożemy Ci ustrukturyzować ofertę i przygotować treści, które w prosty i czytelny sposób wyjaśnią Twoim klientom wartość Twoich usług.",
  },
];
