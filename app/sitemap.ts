import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { isIndexingAllowed } from "@/lib/env";
import { servicesList } from "@/content/services";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  // Jeśli indeksowanie jest wyłączone (np. w fazie stagingu z placeholderami), sitemap nie udostępnia wpisów
  if (!isIndexingAllowed()) {
    return [];
  }

  const baseUrl = siteConfig.canonicalUrl;
  // Stabilna data ostatniej weryfikacji zawartości (Google nie akceptuje dynamicznego new Date() przy każdym crawlu)
  const lastContentUpdate = new Date("2026-11-02T22:00:00.000Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastContentUpdate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/uslugi`,
      lastModified: lastContentUpdate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projekty`,
      lastModified: lastContentUpdate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastContentUpdate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: lastContentUpdate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: lastContentUpdate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: lastContentUpdate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/polityka-cookies`,
      lastModified: lastContentUpdate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = servicesList.map((service) => ({
    url: `${baseUrl}/uslugi/${service.slug}`,
    lastModified: lastContentUpdate,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Wpisy w statusie draft: true nie trafiają do sitemap
  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.lastModified),
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
