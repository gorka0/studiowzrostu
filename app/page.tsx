import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { HeroSection } from "@/components/sections/hero-section";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { ServicesBento } from "@/components/sections/services-bento";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import dynamic from "next/dynamic";

const GrowthChart = dynamic(
  () => import("@/components/effects/growth-chart").then((m) => m.GrowthChart),
  { ssr: true }
);
import { WhyUsSection } from "@/components/sections/why-us-section";
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
      {/* 1. Hero (tło bazowe, asymetria 7:5) */}
      <HeroSection />

      {/* 2. Pasek technologii (CSS marquee z maską zanikania) */}
      <TechMarquee />

      {/* 3. Usługi */}
      <ServicesBento />

      {/* 4. Projekty */}
      <ProjectsPreview />

      {/* 5. Rozdział "Jak rośnie firma" */}
      <GrowthChart />

      {/* 6. Dlaczego Studio Wzrostu */}
      <WhyUsSection />

      {/* 7. FAQ */}
      <FaqSection />

      {/* 8. Końcowe CTA / Kontakt */}
      <CtaSection />
    </main>
  );
}
