export const siteConfig = {
  name: "Studio Wzrostu",
  legalName: "Studio Wzrostu – Tomasz Górka",
  tagline: "Nowoczesne strony internetowe w Next.js dla rozwijających się firm",
  description:
    "Tworzymy szybkie, nowoczesne strony internetowe w Next.js i React. Pomagamy firmom zdobywać klientów i budować zaufanie w sieci.",
  domain: "https://studiowzrostu.pl",
  canonicalUrl: "https://studiowzrostu.pl",
  owner: "Tomasz Górka",
  contact: {
    phone: "+48 000 000 000",
    email: "kontakt@studiowzrostu.pl",
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
