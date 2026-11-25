import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { aboutContent } from "@/content/about";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";
import { SubpageDarkCta } from "@/components/sections/subpage-dark-cta";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.about.title,
  description: routesSeo.about.description,
  path: "/o-nas",
});

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

          {/* Dwukolumnowy układ redakcyjny: historia i standardy współpracy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-10">
            <Reveal className="lg:col-span-7 space-y-5 text-[15px] sm:text-base text-ink-muted leading-[1.65] text-left">
              {aboutContent.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7 space-y-5 text-left shadow-xs">
                <div className="eyebrow-line">Deklaracje wdrożeniowe</div>
                <div className="divide-y divide-line/70 border-t border-line/70">
                  {aboutContent.commitments.map((commitment, idx) => (
                    <div key={idx} className="py-3.5 flex items-baseline gap-3 text-sm text-ink font-medium">
                      <span className="font-sans text-xs text-accent-text font-bold tabular-nums shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="leading-snug">{commitment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Zasady studia w szwajcarskiej siatce */}
          <div className="mt-20 space-y-8 text-left">
            <div className="space-y-2">
              <div className="eyebrow-line">Fundamenty pracy</div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink pt-1">
                Główne zasady studia
              </h2>
            </div>

            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {aboutContent.principles.map((val) => (
                  <div
                    key={val.title}
                    className="border-t-2 border-line hover:border-accent transition-colors pt-6 space-y-3 text-left"
                  >
                    <div className="font-sans text-xs font-bold text-accent-text tabular-nums">
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
            </Reveal>
          </div>

          <SubpageDarkCta
            className="mt-20"
            heading="Porozmawiajmy o nowym serwisie dla Twojej firmy"
            description="Napisz do nas lub zadzwoń. Chętnie przeanalizujemy obecne rozwiązanie i zaproponujemy prostszy, szybszy kierunek technologiczny."
            ctaLabel="Skontaktuj się ze studiem"
            secondaryLabel="Zobacz usługi"
            secondaryHref="/uslugi"
          />
        </Container>
      </Section>
    </main>
  );
}
