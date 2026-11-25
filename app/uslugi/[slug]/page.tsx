import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { servicesList, ServiceDetail } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ServiceJsonLd } from "@/components/seo/json-ld";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { ArrowRight } from "lucide-react";
import { ServiceSpeedFeature } from "@/components/sections/service-speed-feature";
import { ServiceSeoFeature } from "@/components/sections/service-seo-feature";
import { SubpageDarkCta } from "@/components/sections/subpage-dark-cta";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesList.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesList.find((s) => s.slug === slug);

  if (!service) {
    return buildMetadata({ title: "Nie znaleziono usługi" });
  }

  const routeMap: Record<string, keyof typeof routesSeo> = {
    "strony-internetowe": "servicesWebsites",
    "strony-internetowe-bydgoszcz": "servicesBydgoszcz",
    "landing-page": "servicesLandingPage",
    "seo-techniczne": "servicesSeo",
    "redesign-i-wydajnosc": "servicesRedesign",
  };
  const seoConfig = routeMap[slug] ? routesSeo[routeMap[slug]] : null;

  return buildMetadata({
    title: seoConfig ? seoConfig.title : `${service.title} – Studio Wzrostu`,
    description: seoConfig ? seoConfig.description : service.shortDescription,
    path: `/uslugi/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service: ServiceDetail | undefined = servicesList.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedPost = blogPosts.find((p) => p.slug === service.relatedBlogSlug);

  return (
    <main id="main-content" className="flex-1 pb-16">
      <ServiceJsonLd service={service} />
      <Section spacing="sm">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Usługi", href: "/uslugi" },
              { label: service.title },
            ]}
            className="mb-8"
          />

          {/* Hero Usługi */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight">
              {service.title}
            </h1>
            <p className="text-lg sm:text-xl text-accent-text font-medium">
              {service.tagline}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {service.shortDescription}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/kontakt">
                <InteractiveHoverButton>
                  Wycena wdrożenia
                </InteractiveHoverButton>
              </Link>
              <Link
                href="#proces"
                className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-4 py-2 link-underline"
              >
                <span>Zobacz etapy prac</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 1. Problem klienta — układ redakcyjny bez pudełek matrioszek */}
          <Reveal className="mt-16">
            <div className="p-6 sm:p-8 lg:p-10 rounded-2xl border border-line bg-surface space-y-6">
              <div className="space-y-3 max-w-2xl">
                <div className="eyebrow-line">Wyzwania i bariery wzrostu</div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink pt-1">
                  {service.problem.heading}
                </h2>
                <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                  {service.problem.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-line/70">
                {service.problem.symptoms.map((symptom, idx) => (
                  <div
                    key={symptom}
                    className="border-l-2 border-accent/40 pl-3.5 text-xs sm:text-sm text-ink leading-relaxed space-y-1"
                  >
                    <span className="font-sans text-xs text-accent-text font-bold block tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="block">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 2. Zakres wdrożenia */}
          <div className="mt-16 space-y-8">
            <SectionHeader
              title={service.solution.heading}
              description={service.solution.description}
              align="left"
            />

            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.solution.deliverables.map((item, idx) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-5 rounded-xl border border-line bg-surface hover:border-accent/45 transition-colors"
                  >
                    <span className="font-sans text-xs text-accent-text font-bold shrink-0 mt-0.5 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Interaktywny moduł techniczny usługi */}
          {slug === "redesign-i-wydajnosc" && <ServiceSpeedFeature />}
          {slug === "seo-techniczne" && <ServiceSeoFeature />}

          {/* 3. Proces wdrożenia */}
          <div id="proces" className="mt-20 scroll-mt-24 space-y-8">
            <SectionHeader
              title="Jak wygląda proces wdrożenia?"
              description="Pracujemy w przewidywalnym harmonogramie. Bez niespodzianek budżetowych."
              align="left"
            />

            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.process.map((step) => (
                  <div
                    key={step.step}
                    className="border-t-2 border-line hover:border-accent transition-colors pt-5 space-y-2.5 text-left"
                  >
                    <span className="font-sans text-lg font-bold text-accent-text tabular-nums block">
                      {step.step}
                    </span>
                    <h3 className="font-heading font-bold text-base text-ink">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* 4. Efekty biznesowe */}
          <Reveal className="mt-20">
            <div className="p-6 sm:p-10 rounded-2xl border border-line bg-surface space-y-6">
              <div className="space-y-2">
                <div className="eyebrow-line">Rezultaty wdrożenia dla firmy</div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink pt-1">
                  Jakościowe rezultaty po wdrożeniu
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-line/70">
                {service.businessBenefits.map((benefit, idx) => (
                  <div key={benefit.title} className="space-y-2 text-left">
                    <span className="font-sans text-xs text-accent-text font-bold tabular-nums">
                      0{idx + 1}
                    </span>
                    <h3 className="font-heading font-bold text-base text-ink">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 5. FAQ usługi */}
          <div className="mt-20 space-y-8 max-w-3xl">
            <SectionHeader title="Najczęstsze wątpliwości" align="left" />
            <Accordion
              items={service.faq.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))}
            />
          </div>

          {/* 6. Linkowanie wewnętrzne */}
          <div className="mt-20 pt-10 border-t border-line grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-line bg-surface space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Zobacz także
              </div>
              <div className="space-y-2">
                {service.relatedServices.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/uslugi/${rel.slug}`}
                    className="block text-sm font-semibold text-ink hover:text-accent-text transition-colors"
                  >
                    → {rel.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-line bg-surface space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="eyebrow-line">Wiedza z bloga</div>
                {relatedPost && (
                  <h3 className="font-heading font-bold text-sm sm:text-base text-ink line-clamp-2 pt-1">
                    <Link href={`/blog/${relatedPost.slug}`} className="hover:text-accent-text transition-colors">
                      {relatedPost.title}
                    </Link>
                  </h3>
                )}
                <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                  {relatedPost?.excerpt || "Przeczytaj nasz artykuł omawiający kulisy technologiczne i biznesowe tego rozwiązania."}
                </p>
              </div>
              <Link
                href={`/blog/${service.relatedBlogSlug}`}
                className="inline-flex items-center text-xs font-semibold text-accent-text hover:text-accent-text/80 transition-colors pt-2 group"
              >
                <span>Przeczytaj artykuł ekspercki</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="p-6 rounded-xl border border-line bg-surface space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="eyebrow-line">Koncepcja wdrożenia</div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-ink pt-1">
                  <Link href={service.relatedProject.href} className="hover:text-accent-text transition-colors">
                    {service.relatedProject.title}
                  </Link>
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                  {service.relatedProject.description}
                </p>
              </div>
              <Link
                href={service.relatedProject.href}
                className="inline-flex items-center text-xs font-semibold text-accent-text hover:text-accent-text/80 transition-colors pt-2 group"
              >
                <span>Zobacz koncepcję projektu</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Spójny ciemny pas CTA usługi */}
          <SubpageDarkCta
            className="mt-16"
            eyebrow="Realizacja w tydzień · Stała wycena z góry"
            heading={`Chcesz porozmawiać o wdrożeniu: ${service.title}?`}
            description="Napisz do nas lub zadzwoń. Wycenę otrzymasz przed startem prac, na podstawie ustalonego zakresu."
            ctaLabel="Rozpocznij bezpłatną konsultację"
          />
        </Container>
      </Section>
    </main>
  );
}
