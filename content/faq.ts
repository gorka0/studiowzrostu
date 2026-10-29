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
    id: "ile-trwa-realizacja",
    question: "Ile czasu zajmuje wdrożenie nowej strony internetowej?",
    answer:
      "Standardowy czas realizacji strony firmowej wynosi zazwyczaj od 2 do 4 tygodni, w zależności od liczby podstron i stopnia przygotowania materiałów (tekstów, zdjęć). Na każdym etapie informujemy Cię o postępach i pracujemy w ustalonym harmonogramie.",
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
    id: "jak-wyglada-kontakt",
    question: "Jak wygląda proces współpracy i rozliczeń?",
    answer:
      "Zaczynamy od bezpłatnej rozmowy wstępnej i analizy Twoich potrzeb. Następnie przygotowujemy plan prac i przejrzystą wycenę. Rozliczamy się etapami po zatwierdzeniu kolejnych części projektu.",
  },
  {
    id: "czy-pomagacie-w-tresciach",
    question: "Czy muszę mieć przygotowane gotowe teksty przed rozpoczęciem prac?",
    answer:
      "Nie musisz. Pomożemy Ci ustrukturyzować ofertę i przygotować treści, które w prosty i czytelny sposób wyjaśnią Twoim klientom wartość Twoich usług.",
  },
];
