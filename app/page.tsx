import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { HeroSection } from "@/components/sections/hero-section";
import { SocialProofStrip } from "@/components/sections/social-proof-strip";
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
import { FounderStrip } from "@/components/sections/founder-strip";
import { Reveal } from "@/components/ui/reveal";

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

      {/* 2. Social proof — liczniki count-up */}
      <SocialProofStrip />

      {/* 3. Usługi */}
      <ServicesBento />

      {/* 4. Projekty */}
      <ProjectsPreview />

      {/* 4b. Założyciel — humanizacja marki */}
      <Reveal>
        <FounderStrip />
      </Reveal>

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
