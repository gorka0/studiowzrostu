import { createOgImage, ogSize, ogContentType } from "@/components/seo/og-template";
import { projectsData } from "@/content/projects";

export const size = ogSize;
export const contentType = ogContentType;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  const title = project ? project.title : "Realizacje i projekty stron WWW";
  const description = project
    ? project.shortDescription
    : "Koncepcje wdrożeń w Next.js skupione na konwersji i bezkompromisowej szybkości.";

  return createOgImage({
    title,
    category: "CASE STUDY",
    description,
  });
}
