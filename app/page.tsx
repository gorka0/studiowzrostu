import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { HeroSection } from "@/components/sections/hero-section";
import { AudienceSection } from "@/components/sections/audience-section";
import { ServicesBento } from "@/components/sections/services-bento";
import { GrowthChart } from "@/components/effects/growth-chart";
import { WhyUsSection } from "@/components/sections/why-us-section";
import { ProcessSection } from "@/components/sections/process-section";
import { PerformanceSection } from "@/components/sections/performance-section";
import { SeoAdvantageSection } from "@/components/sections/seo-advantage-section";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.home.title,
  description: routesSeo.home.description,
  path: "/",
});

export default function Home() {
  return (
    <main id="main-content" className="flex-1 flex flex-col w-full">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Dla kogo pracujemy */}
      <AudienceSection />

      {/* 4. Usługi w układzie Bento Grid */}
      <ServicesBento />

      {/* 5. Centralny wykres wzrostu z animacją scrolla */}
      <GrowthChart />

      {/* 6. Dlaczego Studio Wzrostu (Przewagi: 3–4 dni & Cena z góry) */}
      <WhyUsSection />

      {/* 7. Proces współpracy (4 etapy z osią czasu 3–4 dni) */}
      <ProcessSection />

      {/* 7. Dlaczego React i wydajność (Core Web Vitals) */}
      <PerformanceSection />

      {/* 8. Techniczne SEO jako przewaga rynkowa */}
      <SeoAdvantageSection />

      {/* 9. Realizacje i koncepcje (z transparentnymi placeholderami) */}
      <ProjectsPreview />

      {/* 10. Najczęściej zadawane pytania (FAQ) */}
      <FaqSection />

      {/* 11. Końcowe CTA */}
      <CtaSection />
    </main>
  );
}
