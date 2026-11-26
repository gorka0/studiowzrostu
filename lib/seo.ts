import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { isIndexingAllowed } from "@/lib/env";

export interface BuildMetadataParams {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  category?: string;
  keywords?: string[];
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndexOverride?: boolean;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image,
  category = "STUDIO WZROSTU",
  keywords,
  openGraphType = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndexOverride,
}: BuildMetadataParams = {}): Metadata {
  const allowIndexing = isIndexingAllowed() && !noIndexOverride;
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${siteConfig.canonicalUrl}${canonicalPath === "/" ? "" : canonicalPath}`;

  // Dbamy o to, by tytuł nie przekraczał ~60 znaków i nie powielał zbędnie nazwy studia
  let formattedTitle: string;
  if (!title) {
    formattedTitle = `${siteConfig.name} – Nowoczesne strony internetowe`;
  } else if (title.includes(siteConfig.name)) {
    formattedTitle = title;
  } else {
    formattedTitle = `${title} | ${siteConfig.name}`;
  }

  const ogImageUrl =
    image ||
    `${siteConfig.canonicalUrl}/api/og?title=${encodeURIComponent(
      formattedTitle
    )}&category=${encodeURIComponent(category)}`;

  const openGraph: NonNullable<Metadata["openGraph"]> =
    openGraphType === "article"
      ? {
          title: formattedTitle,
          description,
          url: canonicalUrl,
          siteName: siteConfig.name,
          locale: "pl_PL",
          type: "article",
          publishedTime,
          modifiedTime,
          authors,
          images: [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: formattedTitle,
            },
          ],
        }
      : {
          title: formattedTitle,
          description,
          url: canonicalUrl,
          siteName: siteConfig.name,
          locale: "pl_PL",
          type: "website",
          images: [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: formattedTitle,
            },
          ],
        };

  return {
    title: formattedTitle,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    metadataBase: new URL(siteConfig.canonicalUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: allowIndexing
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
      images: [ogImageUrl],
    },
  };
}
