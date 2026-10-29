import { routesSeo } from "../content/seo.ts";
import { blogPosts } from "../content/blog.ts";
import { servicesList } from "../content/services.ts";
import {
  buildGlobalGraphSchema,
  buildServiceSchema,
  buildArticleSchema,
  buildBreadcrumbSchema,
} from "../lib/schema.ts";

console.log("=== ROZPOCZYNAM AUTOMATYCZNY AUDYT SEO & ARCHITEKTURY TREŚCI ===");
let hasError = false;

// 1. Audyt mapy routesSeo
console.log("\n--- KROK 1: Weryfikacja routesSeo ---");
const titles = new Set();
const descriptions = new Set();

for (const [key, cfg] of Object.entries(routesSeo)) {
  const titleLen = cfg.title.length;
  const descLen = cfg.description.length;

  console.log(`[${key}] Title: "${cfg.title}" (${titleLen} zn.), Desc: ${descLen} zn.`);

  if (titleLen < 30 || titleLen > 65) {
    console.error(`  ❌ BŁĄD: Title długość ${titleLen} poza zakresem 30-65 znaków: "${cfg.title}"`);
    hasError = true;
  }
  if (descLen < 120 || descLen > 165) {
    console.error(`  ❌ BŁĄD: Description długość ${descLen} poza zakresem 120-165 znaków: "${cfg.description}"`);
    hasError = true;
  }
  if (titles.has(cfg.title)) {
    console.error(`  ❌ BŁĄD: Zduplikowany title: "${cfg.title}"`);
    hasError = true;
  }
  if (descriptions.has(cfg.description)) {
    console.error(`  ❌ BŁĄD: Zduplikowany description: "${cfg.description}"`);
    hasError = true;
  }
  titles.add(cfg.title);
  descriptions.add(cfg.description);
}

// 2. Audyt artykułów blogowych
console.log("\n--- KROK 2: Weryfikacja Artykułów Blogowych (Topic Clusters) ---");
for (const post of blogPosts) {
  const seoTitleLen = (post.seoTitle || post.title).length;
  const seoDescLen = (post.seoDescription || post.excerpt).length;
  
  // Obliczenie liczby słów
  let wordCount = post.lead.split(/\s+/).length;
  for (const sec of post.sections) {
    wordCount += sec.heading.split(/\s+/).length;
    wordCount += sec.paragraphs.join(" ").split(/\s+/).length;
    if (sec.bullets) wordCount += sec.bullets.join(" ").split(/\s+/).length;
    if (sec.keyTakeaway) wordCount += sec.keyTakeaway.split(/\s+/).length;
  }

  console.log(`[blog: ${post.slug}] Słów: ${wordCount}, SeoTitle: ${seoTitleLen} zn., SeoDesc: ${seoDescLen} zn.`);

  if (wordCount < 600) {
    console.error(`  ❌ BŁĄD: Artykuł ${post.slug} ma za mało słów (${wordCount} < 600).`);
    hasError = true;
  }
  if (seoDescLen < 120 || seoDescLen > 165) {
    console.error(`  ❌ BŁĄD: SeoDesc artykułu ${post.slug} (${seoDescLen} zn.) poza zakresem 120-165.`);
    hasError = true;
  }
}

// 3. Audyt powiązań usług (Hub & Spoke)
console.log("\n--- KROK 3: Weryfikacja Linkowania Usług (Hub & Spoke) ---");
const validBlogSlugs = new Set(blogPosts.map((p) => p.slug));
for (const s of servicesList) {
  if (!validBlogSlugs.has(s.relatedBlogSlug)) {
    console.error(`  ❌ BŁĄD: Usługa ${s.slug} wskazuje na nieistniejący artykuł bloga: "${s.relatedBlogSlug}"`);
    hasError = true;
  } else {
    console.log(`[usługa: ${s.slug}] -> Blog: "${s.relatedBlogSlug}" (OK), Projekt: "${s.relatedProject.title}" (OK)`);
  }
}

// 4. Audyt Schema.org JSON-LD i filtracji placeholderów
console.log("\n--- KROK 4: Weryfikacja Schema.org JSON-LD ---");
const testSchemas = [
  { name: "GlobalGraph", data: buildGlobalGraphSchema() },
  ...servicesList.map((s) => ({ name: `Service_${s.slug}`, data: buildServiceSchema(s) })),
  ...blogPosts.map((p) => ({ name: `Article_${p.slug}`, data: buildArticleSchema(p) })),
  { name: "BreadcrumbTest", data: buildBreadcrumbSchema([{ label: "Usługi", href: "/uslugi" }, { label: "Test" }]) },
];

for (const { name, data } of testSchemas) {
  const jsonStr = JSON.stringify(data);
  // Sprawdzamy czy w wynikowym JSON pojawiają się niedozwolone placeholdery w wartościach
  if (jsonStr.includes("[Ulica") || jsonStr.includes("[Telefon") || jsonStr.includes("000 000 000") || jsonStr.includes("[NIP]")) {
    console.error(`  ❌ BŁĄD: Schemat ${name} zawiera surowe placeholdery!`);
    hasError = true;
  } else {
    console.log(`[Schema: ${name}] Prawidłowy JSON-LD bez placeholderów (Długość: ${jsonStr.length} B)`);
  }
}

if (hasError) {
  console.error("\n❌ Audyt zakończony BŁĘDAMI!");
  process.exit(1);
} else {
  console.log("\n✅ WSZYSTKIE TESTY SEO I ARCHITEKTURY ZAKOŃCZONE POWODZENIEM!");
}
