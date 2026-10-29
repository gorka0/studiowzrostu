import * as React from "react";
import type { ServiceDetail } from "@/content/services";
import type { BlogPost } from "@/content/blog";
import type { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import {
  buildGlobalGraphSchema,
  buildServiceSchema,
  buildFaqSchema,
  buildArticleSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";

export function GlobalJsonLd() {
  const schema = buildGlobalGraphSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({ service }: { service: ServiceDetail }) {
  const serviceSchema = buildServiceSchema(service);
  const faqSchema = service.faq && service.faq.length > 0 ? buildFaqSchema(service.faq) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}

export function ArticleJsonLd({ post }: { post: BlogPost }) {
  const articleSchema = buildArticleSchema(post);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

export function BreadcrumbListJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = buildBreadcrumbSchema(items);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
