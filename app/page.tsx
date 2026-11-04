import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { HeroSection } from "@/components/sections/hero-section";
import { TechMarquee } from "@/components/sections/tech-marquee";

const ServicesBento = dynamic(() =>
  import("@/components/sections/services-bento").then((mod) => mod.ServicesBento)
);
const ProjectsPreview = dynamic(() =>
  import("@/components/sections/projects-preview").then((mod) => mod.ProjectsPreview)
);
const GrowthChart = dynamic(() =>
  import("@/components/effects/growth-chart").then((mod) => mod.GrowthChart)
);
const WhyUsSection = dynamic(() =>
  import("@/components/sections/why-us-section").then((mod) => mod.WhyUsSection)
);
const AboutPreviewSection = dynamic(() =>
  import("@/components/sections/about-preview-section").then((mod) => mod.AboutPreviewSection)
);
const FaqSection = dynamic(() =>
  import("@/components/sections/faq-section").then((mod) => mod.FaqSection)
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((mod) => mod.CtaSection)
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

      {/* 3. Usługi (akordeon na mobile, układ asymetryczny 7:5 na desktopie) */}
      <ServicesBento />

      {/* 4. Projekty (dowód wcześniej: horyzontalna karuzela ze scroll-snap na mobile, siatka na desktopie) */}
      <ProjectsPreview />

      {/* 5. Rozdział "Jak rośnie firma" (monotniczny wykres wzrostu + 4 etapy z mini-wizualizacjami i linkami) */}
      <GrowthChart />

      {/* 6. Dlaczego Studio Wzrostu (CIEMNY PAS: 1 tydzień + Cena z góry + oś czasu Dzień 1–7) */}
      <WhyUsSection />

      {/* 7. Kto za tym stoi (blok z ramką zdjęcia TG i zarysem sylwetki) */}
      <AboutPreviewSection />

      {/* 8. FAQ (4 zwięzłe pytania z odpowiedziami ≤ 2 zdania) */}
      <FaqSection />

      {/* 9. Końcowe CTA / Kontakt (CIEMNY PAS z kratką i formularzem) */}
      <CtaSection />
    </main>
  );
}
