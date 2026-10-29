import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.projects.title,
  description: routesSeo.projects.description,
  path: "/projekty",
});

export default function ProjectsPage() {
  return (
    <main id="main-content" className="flex-1 pb-16">
      <div className="pt-6 sm:pt-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Projekty" },
            ]}
          />
        </Container>
      </div>

      <ProjectsPreview isStandalonePage />

      <CtaSection />
    </main>
  );
}
