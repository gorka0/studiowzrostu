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
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { ArrowRight } from "lucide-react";

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
                className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
              >
                <span>Zobacz etapy prac</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 1. Problem klienta */}
          <div className="mt-16 p-8 rounded-2xl border border-line bg-surface space-y-4">
            <div className="font-mono text-xs uppercase tracking-wider text-accent-text font-semibold">
              Wyzwania i bariery wzrostu
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink">
              {service.problem.heading}
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl">
              {service.problem.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
              {service.problem.symptoms.map((symptom, idx) => (
                <div key={symptom} className="p-3.5 rounded-xl border border-line bg-surface-subtle text-xs sm:text-sm text-ink flex items-start gap-2.5">
                  <span className="font-mono text-xs text-accent-text font-semibold shrink-0">0{idx + 1}</span>
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Co robimy (Rozwiązanie) */}
          <div className="mt-16 space-y-8">
            <SectionHeader
              title={service.solution.heading}
              description={service.solution.description}
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.solution.deliverables.map((item, idx) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-5 rounded-xl border border-line bg-surface"
                >
                  <span className="font-mono text-xs text-accent-text font-semibold shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Proces wdrożenia */}
          <div id="proces" className="mt-20 scroll-mt-24 space-y-8">
            <SectionHeader
              title="Jak wygląda proces wdrożenia?"
              description="Pracujemy w przewidywalnym harmonogramie. Bez niespodzianek budżetowych."
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step) => (
                <div key={step.step} className="p-6 rounded-xl border border-line bg-surface space-y-3">
                  <span className="font-mono text-xl font-bold text-accent-text">{step.step}</span>
                  <h3 className="font-heading font-bold text-base text-ink">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Efekty biznesowe (jakościowo) */}
          <div className="mt-20 p-8 sm:p-10 rounded-2xl border border-line bg-surface space-y-6">
            <div className="font-mono text-xs uppercase tracking-wider text-accent-text font-semibold">
              Rezultaty wdrożenia dla firmy
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink">
              Jakościowe rezultaty po wdrożeniu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.businessBenefits.map((benefit, idx) => (
                <div key={benefit.title} className="p-5 rounded-xl border border-line bg-surface-subtle space-y-2">
                  <span className="font-mono text-xs text-accent-text font-semibold">0{idx + 1}</span>
                  <h3 className="font-heading font-bold text-base text-ink">{benefit.title}</h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. FAQ usługi */}
          <div className="mt-20 space-y-8 max-w-3xl">
            <SectionHeader
              title="Najczęstsze wątpliwości"
              align="left"
            />
            <Accordion
              items={service.faq.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))}
            />
          </div>

          {/* 6. Linkowanie wewnętrzne (Inne usługi, powiązany artykuł bloga, projekty) */}
          <div className="mt-20 pt-10 border-t border-line grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Inne usługi */}
            <div className="p-6 rounded-xl border border-line bg-surface space-y-3">
              <div className="font-mono text-xs uppercase tracking-wider text-ink-muted">
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

            {/* Powiązany artykuł na blogu */}
            <div className="p-6 rounded-xl border border-line bg-surface space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-accent-text font-semibold">
                  Wiedza z bloga
                </div>
                {relatedPost && (
                  <h3 className="font-heading font-bold text-sm sm:text-base text-ink line-clamp-2">
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

            {/* Realizacje / Projekty */}
            <div className="p-6 rounded-xl border border-line bg-surface space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-accent-text font-semibold">
                  Koncepcja wdrożenia
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-ink">
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

          {/* Końcowe CTA usługi */}
          <div className="mt-16 p-8 rounded-2xl border border-line bg-surface text-center space-y-4">
            <div className="font-mono text-xs uppercase tracking-wider text-accent-text font-semibold">
              Realizacja w 3–4 dni robocze • Stała wycena z góry
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink">
              Chcesz porozmawiać o wdrożeniu: {service.title}?
            </h2>
            <p className="text-sm text-ink-muted max-w-lg mx-auto">
              Napisz do nas lub zadzwoń. Wycenę otrzymasz przed startem prac, na podstawie ustalonego zakresu.
            </p>
            <div className="pt-2 flex justify-center">
              <Link href="/kontakt">
                <InteractiveHoverButton>
                  Rozpocznij bezpłatną konsultację
                </InteractiveHoverButton>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
