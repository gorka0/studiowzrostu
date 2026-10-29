import { siteConfig } from "@/site.config";

export interface LegalSection {
  id: string;
  title: string;
  content: string[];
}

export interface PrivacyPolicyData {
  version: string;
  lastUpdated: string;
  administrator: {
    name: string;
    firmName: string;
    email: string;
    phone: string;
  };
  sections: LegalSection[];
}

const LAST_UPDATED = "27 października 2026";

export const privacyPolicyContent: PrivacyPolicyData = {
  version: siteConfig.policyVersion,
  lastUpdated: LAST_UPDATED,
  administrator: {
    name: siteConfig.owner,
    firmName: siteConfig.name,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
  },
  sections: [
    {
      id: "administrator",
      title: "1. Kto jest Administratorem Twoich danych osobowych?",
      content: [
        `Administratorem danych osobowych zbieranych za pośrednictwem serwisu internetowego ${siteConfig.domain} jest ${siteConfig.owner}, prowadzący działalność pod marką ${siteConfig.name}, adres e-mail: ${siteConfig.contact.email}, telefon: ${siteConfig.contact.phone}.`,
        "Administrator dokłada szczególnej staranności w celu ochrony interesów osób, których dane dotyczą, a w szczególności zapewnia, że zbierane dane są przetwarzane zgodnie z prawem, rzetelnie i w sposób przejrzysty dla osoby, której dane dotyczą.",
      ],
    },
    {
      id: "cele-i-podstawy",
      title: "2. Cele i podstawy prawne przetwarzania danych",
      content: [
        "Twoje dane osobowe przetwarzane są wyłącznie w określonych celach:",
        "a) Obsługa zapytań przez formularz kontaktowy – dane takie jak imię, adres e-mail, opcjonalny numer telefonu, preferowany budżet oraz treść wiadomości przetwarzane są na podstawie art. 6 ust. 1 lit. b RODO (niezbędność do podjęcia działań przed zawarciem umowy) oraz art. 6 ust. 1 lit. a RODO (dobrowolna zgoda na kontakt).",
        "b) Bezpieczeństwo i zapobieganie spamowi – przetwarzanie adresów IP w nagłówkach HTTP oraz użycie mechanizmów antyspamowych (tokeny czasu HMAC, honeypot, rate-limiting) odbywa się na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora polegający na ochronie infrastruktury przed atakami i nadużyciami).",
        "c) Analityka i statystyka ruchu – za Twoją odrębną, dobrowolną zgodą (art. 6 ust. 1 lit. a RODO) zbieramy anonimowe dane o sposobie korzystania z serwisu z wykorzystaniem narzędzia Google Analytics 4 z wdrożonym trybem Consent Mode v2.",
        "d) Ustalenie, dochodzenie lub obrona roszczeń – na podstawie art. 6 ust. 1 lit. f RODO.",
      ],
    },
    {
      id: "odbiorcy-danych",
      title: "3. Odbiorcy danych",
      content: [
        "Twoje dane osobowe mogą być przekazywane podmiotom przetwarzającym je na zlecenie Administratora w celu prawidłowej realizacji usług:",
        "a) Dostawca infrastruktury hostingowej i sieci CDN (np. Vercel Inc., Cloudflare Inc.) – w zakresie serwowania strony i logów serwera.",
        "b) Dostawca usługi doręczania poczty elektronicznej (Resend Inc.) – w celu przesyłania powiadomień z formularza kontaktowego.",
        "c) Dostawcy narzędzi analitycznych (Google LLC) – wyłącznie po wyrażeniu przez Ciebie zgody na pliki cookies analityczne.",
        "Wszyscy dostawcy zapewniają odpowiednie środki techniczne i organizacyjne gwarantujące bezpieczeństwo danych osobowych.",
      ],
    },
    {
      id: "przekazywanie-poza-eog",
      title: "4. Przekazywanie danych poza Europejski Obszar Gospodarczy (EOG)",
      content: [
        "Niektórzy z naszych dostawców usług chmurowych (m.in. Vercel, Resend, Google) mają siedziby lub serwery poza EOG (w Stanach Zjednoczonych).",
        "Przekazywanie danych odbywa się wyłącznie na podstawie odpowiednich mechanizmów prawnych, w szczególności decyzji Komisji Europejskiej stwierdzających odpowiedni stopień ochrony (EU-US Data Privacy Framework) lub Standardowych Klauzul Umownych (SCC) zatwierdzonych przez Komisję Europejską.",
      ],
    },
    {
      id: "okresy-przechowywania",
      title: "5. Okres przechowywania danych",
      content: [
        "Twoje dane osobowe będą przechowywane przez okres niezbędny do realizacji celów:",
        "a) Dane z formularza kontaktowego: przez czas trwania korespondencji oraz przez okres 12 miesięcy od jej zakończenia na wypadek konieczności obrony przed roszczeniami.",
        "b) Logi serwera i wskaźniki rate-limitera IP: w pamięci podręcznej przez 10 minut do maksymalnie 30 dni w logach sieciowych hostingu.",
        "c) Dane analityczne: w narzędziu Google Analytics przez okres maksymalnie 14 miesięcy (zgodnie z konfiguracją przechowywania zdarzeń).",
        "d) Zgoda na pliki cookies: zapisana w pliku cookie przez maksymalnie 12 miesięcy (365 dni) lub do momentu jej wcześniejszego wycofania.",
      ],
    },
    {
      id: "prawa-osob",
      title: "6. Twoje prawa zgodnie z RODO",
      content: [
        "W związku z przetwarzaniem Twoich danych osobowych przysługują Ci następujące prawa:",
        "• Prawo dostępu do treści swoich danych oraz otrzymania ich kopii (art. 15 RODO)",
        "• Prawo do sprostowania (poprawiania) swoich danych (art. 16 RODO)",
        "• Prawo do usunięcia danych ('prawo do bycia zapomnianym', art. 17 RODO)",
        "• Prawo do ograniczenia przetwarzania danych (art. 18 RODO)",
        "• Prawo do przenoszenia danych (art. 20 RODO)",
        "• Prawo do wniesienia sprzeciwu wobec przetwarzania (art. 21 RODO)",
        "• Prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem.",
        `Aby skorzystać ze swoich praw, skontaktuj się z nami pod adresem: ${siteConfig.contact.email}.`,
      ],
    },
    {
      id: "skarga-uodo",
      title: "7. Prawo do wniesienia skargi do organu nadzorczego",
      content: [
        "Jeżeli uznasz, że przetwarzanie Twoich danych osobowych narusza przepisy RODO, masz prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (PUODO), ul. Stawki 2, 00-193 Warszawa, www.uodo.gov.pl.",
      ],
    },
    {
      id: "wersja",
      title: "8. Zmiany polityki prywatności i numer wersji",
      content: [
        `Niniejsza Polityka Prywatności obowiązuje w wersji ${siteConfig.policyVersion} od dnia ${LAST_UPDATED}.`,
        "Identyfikator wersji jest automatycznie rejestrowany w dowodzie zgody przesyłanym wraz z zapytaniem z formularza kontaktowego.",
      ],
    },
  ],
};

export const cookiesTableData = [
  {
    name: "sw_cookie_consent",
    provider: "Własny (Studio Wzrostu)",
    purpose: "Zapisuje decyzję użytkownika dotyczącą zgody na poszczególne kategorie plików cookies.",
    duration: "12 miesięcy (365 dni)",
    category: "Niezbędne",
    type: "HTTP Cookie (SameSite=Lax)",
  },
  {
    name: "theme",
    provider: "Własny (Studio Wzrostu)",
    purpose: "Zapamiętuje preferowany motyw interfejsu (jasny / ciemny) wybrany przez użytkownika.",
    duration: "Trwałe (do wyczyszczenia pamięci podręcznej)",
    category: "Funkcjonalne",
    type: "localStorage",
  },
  {
    name: "_ga, _ga_*",
    provider: "Google LLC (Google Analytics 4)",
    purpose: "Identyfikacja unikalnych użytkowników i analiza zachowań na stronie (tylko po wyrażeniu zgody).",
    duration: "Maksymalnie 2 lata",
    category: "Analityczne",
    type: "HTTP Cookie (Consent Mode v2)",
  },
];
