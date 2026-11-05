export const siteConfig = {
  name: "Studio Wzrostu",
  legalName: "Studio Wzrostu",
  tagline: "Nowoczesne strony internetowe dla rozwijających się firm",
  description:
    "Tworzymy szybkie, nowoczesne strony internetowe dla firm. Pomagamy zdobywać klientów i budować zaufanie w sieci.",
  domain: "https://studiowzrostu.pl",
  canonicalUrl: "https://studiowzrostu.pl",
  owner: "Zespół Studio Wzrostu",
  contact: {
    phone: "+48 736 943 002",
    email: "kontakt@studiowzrostu.pl",
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
