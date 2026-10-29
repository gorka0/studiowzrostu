import * as React from "react";
import { siteConfig } from "@/site.config";
import type { ServiceDetail } from "@/content/services";
import type { BlogPost } from "@/content/blog";
import type { BreadcrumbItem } from "@/components/ui/breadcrumbs";

/**
 * Bezpieczny helper odrzucający wartości tymczasowe.
 * Zapobiega emisji nieuzupełnionych danych kontaktowych i rejestrowych do Google Schema.
 */
function isRealValue(val: string | undefined): val is string {
  if (!val) return false;
  return !val.includes("[") && !val.includes("000 000 000");
}

export function GlobalJsonLd() {
  const orgSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.canonicalUrl,
    logo: `${siteConfig.canonicalUrl}/icon.svg`,
    email: siteConfig.contact.email,
    founder: {
      "@type": "Person",
      name: siteConfig.owner,
    },
    ...(siteConfig.social.github || siteConfig.social.linkedin || siteConfig.social.x
      ? {
          sameAs: [
            siteConfig.social.github,
            siteConfig.social.linkedin,
            siteConfig.social.x,
          ].filter(Boolean),
        }
      : {}),
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Core Web Vitals",
      "Tworzenie stron internetowych",
      "SEO techniczne",
      "Dostępność WCAG",
    ],
    priceRange: "$$",
  };

  if (isRealValue(siteConfig.contact.phone)) {
    orgSchema.telephone = siteConfig.contact.phone;
  }

  if (isRealValue(siteConfig.registry.nip)) {
    orgSchema.taxID = siteConfig.registry.nip;
    orgSchema.vatID = `PL${siteConfig.registry.nip}`;
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.canonicalUrl,
    inLanguage: "pl-PL",
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export function ServiceJsonLd({ service }: { service: ServiceDetail }) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    serviceType: "Tworzenie stron internetowych",
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.canonicalUrl,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.solution.heading,
      itemListElement: service.solution.deliverables.map((d, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: d,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  );
}

export function ArticleJsonLd({ post }: { post: BlogPost }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.canonicalUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.canonicalUrl}/icon.svg`,
      },
    },
    datePublished: post.date,
    inLanguage: "pl-PL",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.canonicalUrl}/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

export function BreadcrumbListJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = {
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
          ? `${siteConfig.canonicalUrl}${item.href}`
          : undefined,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
