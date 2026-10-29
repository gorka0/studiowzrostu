/**
 * Baza danych autorskich koncepcji projektowych Studio Wzrostu
 * Firmy i treści są fikcyjne. Projekty prezentują podejście do układu, czytelności i szybkości.
 */

export interface ConceptProject {
  id: string;
  title: string;
  shortDescription: string;
  modalDescription: string;
  tags: string[];
  serviceUrl: string;
  serviceLabel: string;
  desktopImage: string;
  desktopAlt: string;
  mobileImage?: string;
  mobileAlt?: string;
  beforeImage?: string;
  beforeAlt?: string;
  afterImage?: string;
  afterAlt?: string;
  disclaimer: string;
}

export const conceptProjects: ConceptProject[] = [
  {
    id: "serwis-maszyn",
    title: "Koncepcja: serwis maszyn przemysłowych",
    shortDescription:
      "Strona firmowa B2B z formularzem zapytania ofertowego już na pierwszym ekranie.",
    modalDescription:
      "Projekt serwisu B2B dla branży przemysłowej kładzie nacisk na natychmiastowe przejście do działania. Formularz zgłoszenia awarii i zapytania ofertowego jest dostępny bezpośrednio w pierwszym ekranie, a kluczowe parametry operacyjne (diagnoza 24h, części z magazynu) natychmiast eliminują wątpliwości techniczne decydentów.",
    tags: ["Strona firmowa", "B2B", "Formularz zapytań"],
    serviceUrl: "/uslugi/strony-internetowe",
    serviceLabel: "Strony internetowe",
    desktopImage: "/concepts/a-desktop.webp",
    desktopAlt:
      "Koncepcja strony serwisu maszyn przemysłowych: techniczny nagłówek, parametry realizacji i formularz zapytania na pierwszym ekranie",
    mobileImage: "/concepts/a-mobile.webp",
    mobileAlt:
      "Widok mobilny koncepcji serwisu maszyn: zwarty układ formularza i natychmiastowy dostęp do telefonu alarmowego",
    disclaimer: "Firma i treści fikcyjne. Projekt koncepcyjny Studio Wzrostu.",
  },
  {
    id: "aplikacja-grafik",
    title: "Koncepcja: aplikacja do grafików pracy",
    shortDescription:
      "Landing page jednej funkcji: jedno hasło, interfejs od razu na wierzchu, jeden przycisk.",
    modalDescription:
      "Strona produktowa typu single-feature koncentruje całą uwagę odbiorcy na jednym, konkretnym zadaniu. Zamiast abstrakcyjnych ilustracji użytkownik od razu widzi rzeczywisty fragment interfejsu z planowaniem zmian oraz jednoznaczne wezwanie do wypróbowania bez konieczności zakładania konta.",
    tags: ["Landing page", "Produkt", "Jeden CTA"],
    serviceUrl: "/uslugi/landing-page",
    serviceLabel: "Landing page",
    desktopImage: "/concepts/b-desktop.webp",
    desktopAlt:
      "Koncepcja landing page aplikacji grafikowej: wyrazisty nagłówek, podgląd interfejsu grafiku i pojedynczy przycisk akcji",
    mobileImage: "/concepts/b-mobile.webp",
    mobileAlt:
      "Widok mobilny landing page aplikacji grafikowej: responsywny podgląd zmian i czytelny przycisk wypróbowania",
    disclaimer: "Firma i treści fikcyjne. Projekt koncepcyjny Studio Wzrostu.",
  },
  {
    id: "redesign-serwis-auto",
    title: "Koncepcja: redesign serwisu samochodowego",
    shortDescription:
      "Ta sama oferta, przebudowana pod czytelność i szybkość. Przesuń suwak, żeby zobaczyć różnicę.",
    modalDescription:
      "Porównanie prezentuje przebudowę chaotycznej i wolno działającej strony warsztatu w przejrzysty serwis zorientowany na szybki kontakt. Zastąpiliśmy przeładowany układ i agresywne elementy czytelnym zestawieniem specjalizacji, jasną informacją o gwarancji oraz bezpośrednią rezerwacją terminu.",
    tags: ["Redesign", "Przed i po", "Czytelność"],
    serviceUrl: "/uslugi/redesign-i-wydajnosc",
    serviceLabel: "Redesign i wydajność",
    desktopImage: "/concepts/c-po.webp",
    desktopAlt: "Koncepcja redesignu serwisu samochodowego po optymalizacji układu i typografii",
    beforeImage: "/concepts/c-przed.webp",
    beforeAlt: "Stara wersja strony serwisu samochodowego przed modernizacją (chaotyczny układ)",
    afterImage: "/concepts/c-po.webp",
    afterAlt: "Nowa wersja serwisu po redesignie: czysta typografia, wyrazisty nagłówek i natychmiastowy kontakt",
    disclaimer: "Firma i treści fikcyjne. Projekt koncepcyjny Studio Wzrostu.",
  },
];
