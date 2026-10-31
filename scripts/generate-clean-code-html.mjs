import { codeToHtml } from 'shiki';
import fs from 'fs';

const CODE_SNIPPET = `import type { Metadata } from "next";
import Image from "next/image";

// Precyzyjne metadane SEO generowane natywnie
export const metadata: Metadata = {
  title: "Studio Wzrostu | Szybkie strony dla firm",
  description: "Czysty kod nastawiony na wzrost biznesu.",
  alternates: { canonical: "https://studiowzrostu.pl" },
};

// Zero narzutu wizualnych kreatorów – natywny React
export default function HeroVisual() {
  return (
    <Image
      src="/brand/hero-chart.svg"
      alt="Wykres wzrostu biznesu"
      width={720}
      height={450}
      priority
    />
  );
}`;

async function main() {
  const html = await codeToHtml(CODE_SNIPPET, {
    lang: 'tsx',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  });

  const content = `// Plik generowany automatycznie przed buildem (Shiki build-time syntax highlighting)
export const HIGHLIGHTED_CODE_HTML = ${JSON.stringify(html)};
`;

  fs.writeFileSync('content/clean-code-html.ts', content, 'utf8');
  console.log('Successfully generated content/clean-code-html.ts');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
