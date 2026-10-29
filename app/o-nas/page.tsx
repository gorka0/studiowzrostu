import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { aboutContent } from "@/content/about";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.about.title,
  description: routesSeo.about.description,
  path: "/o-nas",
});

export function generateStaticParams() {
  return [];
}

export default function AboutPage() {
  return (
    <main id="main-content" className="flex-1 pb-16">
      <Section spacing="sm">
        <Container>
          <Breadcrumbs items={[{ label: "O nas" }]} className="mb-8" />

          <SectionHeader
            as="h1"
            title={aboutContent.heading}
            description={aboutContent.subheading}
            align="left"
          />

          {/* O założycielu i filozofii studia */}
          <div className="max-w-3xl space-y-6 text-sm sm:text-base text-ink-muted leading-relaxed text-left mt-12">
            {aboutContent.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            <div className="pt-6 border-t border-line space-y-3 font-medium text-ink text-sm">
              {aboutContent.commitments.map((commitment, idx) => (
                <div key={idx} className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent-text font-bold">0{idx + 1}</span>
                  <span>{commitment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Zasady studia w układzie redakcyjnym */}
          <div className="mt-20 space-y-8 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink">
              Główne zasady studia
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aboutContent.principles.map((val) => (
                <div
                  key={val.title}
                  className="border-t border-line pt-6 space-y-3 text-left"
                >
                  <div className="font-mono text-xs font-semibold text-accent-text">
                    {val.number}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-ink">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dolne CTA */}
          <div className="mt-20 p-8 sm:p-12 rounded-xl border border-line bg-surface/50 text-left space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink">
              Porozmawiajmy o nowym serwisie dla Twojej firmy
            </h2>
            <p className="text-sm text-ink-muted max-w-xl">
              Napisz do nas lub zadzwoń. Chętnie przeanalizujemy obecne rozwiązanie i zaproponujemy optymalny kierunek technologiczny.
            </p>
            <div className="pt-2">
              <Link href="/kontakt">
                <InteractiveHoverButton>
                  Skontaktuj się ze studiem
                </InteractiveHoverButton>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
