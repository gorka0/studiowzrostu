import { siteConfig } from "@/site.config";
import type { ServiceDetail } from "@/content/services";
import type { BlogPost } from "@/content/blog";
import type { BreadcrumbItem } from "@/components/ui/breadcrumbs";

/**
 * Rygorystyczny walidator eliminujący placeholdery z danych strukturalnych Google.
 * Wartości z nawiasami kwadratowymi ([...]) lub numerem testowym (000 000 000) są odrzucane.
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
    "@type": "ProfessionalService",
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
    knowsAbout: [
      "Tworzenie stron internetowych",
      "React",
      "Next.js",
      "Techniczne SEO",
      "Optymalizacja Core Web Vitals",
      "Rozwój biznesu online",
      "Projektowanie UX/UI",
      "Strony internetowe dla firm usługowych",
      "Tworzenie stron www dla małych firm",
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
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Landing Page pod kampanie reklamowe",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Techniczne SEO i optymalizacja",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Przebudowa i modernizacja strony",
        },
      },
    ],
  };

  if (isRealValue(siteConfig.contact.phone)) {
    organization.telephone = siteConfig.contact.phone;
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
    publisher: {
      "@id": orgId,
    },
    inLanguage: "pl-PL",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };
}

/**
 * 2. Schema dla pojedynczej podstrony usługi (Service)
 */
export function buildServiceSchema(service: ServiceDetail): Record<string, unknown> {
  const orgId = `${siteConfig.canonicalUrl}/#organization`;
  const serviceUrl = `${siteConfig.canonicalUrl}/uslugi/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}/#service`,
    url: serviceUrl,
    name: service.title,
    description: service.shortDescription,
    serviceType: "Tworzenie stron internetowych",
    provider: {
      "@id": orgId,
    },
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
 * 3. Schema dla artykułu na blogu (Article)
 */
export function buildArticleSchema(post: BlogPost): Record<string, unknown> {
  const postUrl = `${siteConfig.canonicalUrl}/blog/${post.slug}`;
  const orgId = `${siteConfig.canonicalUrl}/#organization`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${postUrl}/#article`,
    isPartOf: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    dateModified: post.lastModified,
    inLanguage: "pl-PL",
    mainEntityOfPage: postUrl,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${siteConfig.canonicalUrl}/o-nas`,
    },
    publisher: {
      "@id": orgId,
    },
  };
}

/**
 * 4. Schema dla sekcji FAQ (FAQPage)
 */
export function buildFaqSchema(
  items: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
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
 * 5. Schema dla ścieżki nawigacyjnej (BreadcrumbList)
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href
        ? item.href.startsWith("http")
          ? item.href
          : `${siteConfig.canonicalUrl}${item.href.startsWith("/") ? item.href : `/${item.href}`}`
        : undefined,
    })),
  };
}
