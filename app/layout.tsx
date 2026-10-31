import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsentProvider } from "@/components/ui/cookie-banner";
import { ConsentManager } from "@/components/analytics/consent-manager";
import { SkipLink } from "@/components/ui/skip-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCTA } from "@/components/layout/mobile-sticky-cta";
import { ScrollToTopOnReload } from "@/components/layout/scroll-to-top";
import { GlobalJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const fontHeading = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  display: "optional",
  preload: true,
});

const fontSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "optional",
  preload: true,
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      suppressHydrationWarning
      className={`${fontHeading.variable} ${fontSans.variable} font-sans h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');if(typeof window!=='undefined'){if('scrollRestoration' in history){history.scrollRestoration='manual';}if(!window.location.hash){window.scrollTo(0,0);}}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ScrollToTopOnReload />
          <ConsentManager />
          <GlobalJsonLd />
          <CookieConsentProvider>
            <SkipLink />
            <Header />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
            <MobileStickyCTA />
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
