import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { isIndexingAllowed } from "@/lib/env";

export interface BuildMetadataParams {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndexOverride?: boolean;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image,
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

  return {
    title: formattedTitle,
    description,
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
    openGraph: {
      title: formattedTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "pl_PL",
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
      images: image ? [image] : undefined,
    },
  };
}
