import { NextRequest } from "next/server";
import { createOgImage, ogSize, ogContentType } from "@/components/seo/og-template";

export const size = ogSize;
export const contentType = ogContentType;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Ograniczenie długości i sanityzacja parametrów zapobiegające DoS i nadużyciom generatora
  const rawTitle = searchParams.get("title");
  const rawCategory = searchParams.get("category");
  const rawDescription = searchParams.get("description");

  const title = (rawTitle || "Nowoczesne strony internetowe dla rozwijających się firm")
    .slice(0, 100)
    .replace(/[\r\n\t]/g, " ")
    .trim();

  const category = (rawCategory || "STUDIO WZROSTU")
    .slice(0, 32)
    .replace(/[\r\n\t]/g, " ")
    .trim();

  const description = (rawDescription || "Dedykowany kod w React i Next.js dla rozwijających się firm.")
    .slice(0, 200)
    .replace(/[\r\n\t]/g, " ")
    .trim();

  const response = await createOgImage({
    title,
    category,
    description,
  });

  response.headers.set(
    "Cache-Control",
    "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
  );

  return response;
}
