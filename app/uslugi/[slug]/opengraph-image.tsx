import { createOgImage, ogSize, ogContentType } from "@/components/seo/og-template";
import { servicesList } from "@/content/services";

export const size = ogSize;
export const contentType = ogContentType;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const service = servicesList.find((s) => s.slug === slug);

  const title = service ? service.title : "Usługi tworzenia stron internetowych";
  const description = service
    ? service.shortDescription
    : "Dedykowane wdrożenia w React i Next.js dla rozwijających się firm.";

  return createOgImage({
    title,
    category: "OFERTA USŁUG",
    description,
  });
}
