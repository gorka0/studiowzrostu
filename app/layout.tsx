import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsentProvider } from "@/components/ui/cookie-banner";
import { ConsentManager } from "@/components/analytics/consent-manager";
import { SkipLink } from "@/components/ui/skip-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const fontHeading = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const fontSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
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
      className={`${fontHeading.variable} ${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ConsentManager />
          <GlobalJsonLd />
          <CookieConsentProvider>
            <SkipLink />
            <Header />
            <div id="main-content" className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
