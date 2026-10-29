import { createOgImage, ogSize, ogContentType } from "@/components/seo/og-template";
import { blogPosts } from "@/content/blog";

export const size = ogSize;
export const contentType = ogContentType;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  const title = post ? post.title : "Wiedza i inżynieria web developmentu";
  const description = post
    ? post.excerpt
    : "Praktyczne analizy o tworzeniu stron www w Next.js i optymalizacji dla biznesu.";

  return createOgImage({
    title,
    category: "BLOG TECHNOLOGICZNY",
    description,
  });
}
