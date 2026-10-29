import { NextRequest } from "next/server";
import { createOgImage, ogSize, ogContentType } from "@/components/seo/og-template";

export const size = ogSize;
export const contentType = ogContentType;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title =
    searchParams.get("title") ||
    "Nowoczesne strony internetowe dla rozwijających się firm";
  const category = searchParams.get("category") || "STUDIO WZROSTU";
  const description =
    searchParams.get("description") ||
    "Dedykowany kod w React i Next.js dla firm z Bydgoszczy i całej Polski.";

  return createOgImage({
    title,
    category,
    description,
  });
}
