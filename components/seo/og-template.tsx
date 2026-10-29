import { ImageResponse } from "next/og";

export const ogSize = {
  width: 1200,
  height: 630,
};

export const ogContentType = "image/png";

export interface OgImageOptions {
  title: string;
  category?: string;
  description?: string;
}

export function createOgImage({
  title,
  category = "STUDIO WWW",
  description = "Dedykowane wdrożenia w React, Next.js i TypeScript dla rozwijających się firm.",
}: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 70,
          backgroundColor: "#0B1410",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(74, 222, 156, 0.14), transparent 45%), radial-gradient(circle at 15% 85%, rgba(255, 122, 69, 0.08), transparent 40%)",
          color: "#FBFAF6",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* 3 rosnące słupki z koralową kropką */}
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="18" width="6" height="10" rx="3" fill="#FBFAF6" opacity="0.4" />
              <rect x="13" y="12" width="6" height="16" rx="3" fill="#188755" />
              <rect x="22" y="5" width="6" height="23" rx="3" fill="#FBFAF6" />
              <circle cx="25" cy="5" r="2.5" fill="#FF7A45" />
            </svg>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em" }}>
              Studio <span style={{ color: "#4ADE9C", marginLeft: 8 }}>Wzrostu</span>
            </div>
          </div>

          <div
            style={{
              padding: "8px 20px",
              borderRadius: 9999,
              backgroundColor: "rgba(74, 222, 156, 0.12)",
              border: "1px solid rgba(74, 222, 156, 0.35)",
              color: "#4ADE9C",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
        </div>

        {/* Centralny blok: Tytuł i opis */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 1020 }}>
          <div
            style={{
              fontSize: title.length > 55 ? 48 : 56,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#FBFAF6",
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 22,
                color: "#9EB3A6",
                lineHeight: 1.45,
                maxWidth: 900,
              }}
            >
              {description}
            </div>
          )}
        </div>

        {/* Dolna stopka: Domena, założyciel i badge technologiczny */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: 24,
            width: "100%",
            color: "#849E8F",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ color: "#FBFAF6", fontWeight: 600 }}>studiowzrostu.pl</span>
            <span>•</span>
            <span>Tomasz Górka</span>
            <span>•</span>
            <span>React / Next.js / TypeScript</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#4ADE9C",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#4ADE9C",
              }}
            />
            <span>Core Web Vitals 95+</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
    }
  );
}
