import { siteConfig } from "@/site.config";
import type { ServiceDetail } from "@/content/services";
import type { BlogPost } from "@/content/blog";
import type { BreadcrumbItem } from "@/components/ui/breadcrumbs";

/**
 * Rygorystyczny walidator eliminujący placeholdery z danych strukturalnych Google.
 * Wartości z nawiasami kwadratowymi ([...]) lub numerem testowym (000 000 000) są natychmiast odrzucane.
 */
export function isRealValue(val: string | undefined | null): val is string {
  if (!val) return false;
  const trimmed = val.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.includes("[") || trimmed.includes("]")) return false;
  if (trimmed.includes("000 000 000")) return false;
  return true;
}

/**
 * 1. Globalny graf Schema.org dla całej domeny (@graph: ProfessionalService + WebSite)
 */
export function buildGlobalGraphSchema(): Record<string, unknown> {
  const orgId = `${siteConfig.canonicalUrl}/#organization`;
  const websiteId = `${siteConfig.canonicalUrl}/#website`;

  const organization: Record<string, unknown> = {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": orgId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.canonicalUrl,
    logo: `${siteConfig.canonicalUrl}/icon.svg`,
    image: `${siteConfig.canonicalUrl}/opengraph-image`,
    email: siteConfig.contact.email,
    priceRange: "$$",
    founder: {
      "@type": "Person",
      name: siteConfig.owner,
      jobTitle: "Założyciel i Lead Developer",
      url: `${siteConfig.canonicalUrl}/o-nas`,
    },
    areaServed: [
      {
        "@type": "City",
        name: siteConfig.location.city,
      },
      {
        "@type": "AdministrativeArea",
        name: "Województwo kujawsko-pomorskie",
      },
      {
        "@type": "Country",
        name: "Polska",
      },
    ],
    knowsAbout: [
      "Tworzenie stron internetowych",
      "React",
      "Next.js",
      "Techniczne SEO",
      "Optymalizacja Core Web Vitals",
      "Rozwój biznesu online",
      "Projektowanie UX/UI",
      "Tworzenie stron internetowych Bydgoszcz",
      "Strony internetowe dla firm usługowych",
      "Tworzenie stron www dla małych firm",
      "Pozycjonowanie lokalne",
      "Web design Bydgoszcz",
    ],
  };

  organization.serviceType = [
    "Tworzenie stron internetowych",
    "Projektowanie stron www",
    "Pozycjonowanie SEO",
    "Landing page",
    "Redesign strony",
  ];

  organization.hasOfferCatalog = {
    "@type": "OfferCatalog",
    name: "Usługi tworzenia stron internetowych",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Strona internetowa dla firmy",
          areaServed: { "@type": "City", name: "Bydgoszcz" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Landing Page pod kampanie reklamowe",
          areaServed: { "@type": "Country", name: "Polska" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Techniczne SEO i pozycjonowanie",
          areaServed: { "@type": "Country", name: "Polska" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Przebudowa i modernizacja strony",
          areaServed: { "@type": "Country", name: "Polska" },
        },
      },
    ],
  };

  if (isRealValue(siteConfig.contact.phone)) {
    organization.telephone = siteConfig.contact.phone;
  }


  if (isRealValue(siteConfig.legalAddress)) {
    organization.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.legalAddress,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: "PL",
    };
  }

  const socialLinks = [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.x,
  ].filter(isRealValue);

  if (socialLinks.length > 0) {
    organization.sameAs = socialLinks;
  }

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.canonicalUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "pl-PL",
    publisher: {
      "@id": orgId,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };
}

/**
 * 2. Schemat dedykowanej usługi na podstronie /uslugi/[slug]
 */
export function buildServiceSchema(service: ServiceDetail): Record<string, unknown> {
  const orgId = `${siteConfig.canonicalUrl}/#organization`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    serviceType: "Tworzenie stron internetowych",
    provider: {
      "@id": orgId,
    },
    areaServed: [
      {
        "@type": "City",
        name: siteConfig.location.city,
      },
      {
        "@type": "AdministrativeArea",
        name: "Województwo kujawsko-pomorskie",
      },
      {
        "@type": "Country",
        name: "Polska",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.solution.heading,
      itemListElement: service.solution.deliverables.map((item, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
        },
        position: index + 1,
      })),
    },
  };
}

/**
 * 3. Schemat pytań i odpowiedzi FAQ (FAQPage)
 */
export function buildFaqSchema(
  faq: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * 4. Schemat artykułu blogowego (BlogPosting / Article)
 */
export function buildArticleSchema(post: BlogPost): Record<string, unknown> {
  const orgId = `${siteConfig.canonicalUrl}/#organization`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    inLanguage: "pl-PL",
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${siteConfig.canonicalUrl}/o-nas`,
    },
    publisher: {
      "@id": orgId,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.canonicalUrl}/blog/${post.slug}`,
    },
  };
}

/**
 * 5. Schemat ścieżki nawigacji (BreadcrumbList)
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Start",
        item: siteConfig.canonicalUrl,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: item.href
          ? `${siteConfig.canonicalUrl}${item.href.startsWith("/") ? item.href : `/${item.href}`}`
          : undefined,
      })),
    ],
  };
}
