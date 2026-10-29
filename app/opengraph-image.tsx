import { createOgImage, ogSize, ogContentType } from "@/components/seo/og-template";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    title: "Nowoczesne strony internetowe w Next.js dla rozwijających się firm",
    category: "STUDIO WZROSTU",
    description: "Tworzymy szybkie, nowoczesne strony w React i Next.js. Zdobywaj więcej klientów i buduj prestiż dzięki inżynierskiej jakości.",
  });
}
