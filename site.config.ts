export const siteConfig = {
  name: "Studio Wzrostu",
  legalName: "Studio Wzrostu – Tomasz Górka",
  tagline: "Nowoczesne strony internetowe dla rozwijających się firm",
  description:
    "Tworzymy szybkie, nowoczesne strony internetowe dla firm. Pomagamy zdobywać klientów i budować zaufanie w sieci.",
  domain: "https://studiowzrostu.pl",
  canonicalUrl: "https://studiowzrostu.pl",
  owner: "Tomasz Górka",
  contact: {
    phone: "+48 736 943 002",
    email: "kontakt@studiowzrostu.pl",
  },
  location: {
    city: "Bydgoszcz",
    region: "kujawsko-pomorskie",
    serviceArea: [
      "Bydgoszcz",
      "Toruń",
      "Województwo kujawsko-pomorskie",
      "Cała Polska (zdalnie)",
    ],
  },
  legalAddress: "[ADRES DO UZUPEŁNIENIA]",
  registry: {
    nip: "[DO UZUPEŁNIENIA]",
    regon: "[DO UZUPEŁNIENIA]",
  },
  social: {
    github: "",
    linkedin: "",
    x: "",
  },
  copyrightYear: 2026,
  policyVersion: "v1.0",
} as const;

export type SiteConfig = typeof siteConfig;
