import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { HeroSection } from "@/components/sections/hero-section";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { AudienceSection } from "@/components/sections/audience-section";
import { ServicesBento } from "@/components/sections/services-bento";
import { CleanCodeSection } from "@/components/sections/clean-code-section";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { BlogPreviewSection } from "@/components/sections/blog-preview";
const WhyUsSection = dynamic(() =>
  import("@/components/sections/why-us-section").then((mod) => mod.WhyUsSection)
);
const ProcessSection = dynamic(() =>
  import("@/components/sections/process-section").then((mod) => mod.ProcessSection)
);
const PerformanceSection = dynamic(() =>
  import("@/components/sections/performance-section").then((mod) => mod.PerformanceSection)
);
const SeoAdvantageSection = dynamic(() =>
  import("@/components/sections/seo-advantage-section").then((mod) => mod.SeoAdvantageSection)
);
const FaqSection = dynamic(() =>
  import("@/components/sections/faq-section").then((mod) => mod.FaqSection)
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((mod) => mod.CtaSection)
);

const GrowthChart = dynamic(
  () => import("@/components/effects/growth-chart").then((mod) => mod.GrowthChart),
  {
    loading: () => (
      <div className="w-full py-16 md:py-24 bg-surface/30 border-b border-line min-h-[520px]" />
    ),
  }
);

export const metadata: Metadata = buildMetadata({
  title: routesSeo.home.title,
  description: routesSeo.home.description,
  path: "/",
});

export default function Home() {
  return (
    <main id="main-content" className="flex-1 flex flex-col w-full">
      {/* 1. Hero (tło bazowe, asymetria 7:5) */}
      <HeroSection />

      {/* 2. Pasek technologii (CSS marquee z maską zanikania) */}
      <TechMarquee />

      {/* 3. Dla kogo projektujemy (powierzchnia, zakładki tablist z makietami CSS wireframe) */}
      <AudienceSection />

      {/* 4. Jak możemy pomóc (tło bazowe, wiersze z unikalnymi ilustracjami liniowymi SVG) */}
      <ServicesBento />

      {/* 5. Centralny wykres wzrostu (powierzchnia, pojedynczy czysty komponent SVG) */}
      <GrowthChart />

      {/* 6. Dlaczego Studio Wzrostu (CIEMNY PAS: 3–4 dni z mini osią + Cena z góry z kartą specyfikacji) */}
      <WhyUsSection />

      {/* 7. Proces współpracy w 4 etapach (tło bazowe, pozioma oś czasu na desktopie, pionowa na mobile) */}
      <ProcessSection />

      {/* 8. Dlaczego szybka strona (powierzchnia, ilustracja ładowania klatka po klatce Wolna vs Szybka) */}
      <PerformanceSection />

      {/* 9. Techniczne SEO (tło bazowe, makieta wyników wyszukiwania z płynnym ruchem FLIP na 1. miejsce) */}
      <SeoAdvantageSection />

      {/* 10. Czysty kod (powierzchnia, krótki szkic copy + podświetlony kod w Shiki generowany w buildzie) */}
      <CleanCodeSection />

      {/* 11. Realizacje i koncepcje (tło bazowe, transparentne makiety) */}
      <ProjectsPreview />

      {/* 12. Wiedza dla rosnących firm (powierzchnia, typograficzne okładki SVG/CSS bez zdjęć stockowych) */}
      <BlogPreviewSection />

      {/* 13. Najczęściej zadawane pytania - FAQ (tło bazowe, sticky lewa kolumna + prawy akordeon) */}
      <FaqSection />

      {/* 14. Końcowe CTA (CIEMNY PAS z kratką, krzywą wykresu przy przycisku i formularzem) */}
      <CtaSection />
    </main>
  );
}
