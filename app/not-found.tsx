import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center py-20 px-4">
      <Container size="narrow" className="text-center space-y-6">
        <div className="flex justify-center">
          <Eyebrow variant="coral">Błąd 404</Eyebrow>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-foreground tracking-tight">
          Strona nie została odnaleziona
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          Adres, pod który próbujesz się dostać, nie istnieje lub został przeniesiony w trakcie modernizacji serwisu.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-10 px-6 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
          >
            <Home className="h-4 w-4" />
            <span>Strona główna</span>
          </Link>

          <Link
            href="/uslugi"
            className="inline-flex items-center gap-2 h-10 px-6 rounded-full font-semibold text-sm border border-border bg-background text-foreground hover:bg-muted/80 transition-colors shadow-xs"
          >
            <Compass className="h-4 w-4" />
            <span>Przeglądaj usługi</span>
          </Link>
        </div>

        <div className="pt-8 text-xs text-muted-foreground">
          Potrzebujesz pomocy? Skontaktuj się z nami bezpośrednio przez{" "}
          <Link href="/kontakt" className="text-primary underline underline-offset-2">
            formularz kontaktowy
          </Link>
          .
        </div>
      </Container>
    </main>
  );
}
