import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { generateTimeToken, verifyTimeToken } from "@/lib/antispam";
import { rateLimit } from "@/lib/rate-limiter";
import { sendContactEmail } from "@/lib/email";

// GET /api/contact - Zwraca wygenerowany, podpisany token czasu dla formularza
export async function GET() {
  const token = generateTimeToken();
  return NextResponse.json({
    success: true,
    timeToken: token,
  });
}

// POST /api/contact - Główny handler formularza kontaktowego
export async function POST(req: NextRequest) {
  // 1. Ekstrakcja IP i Rate Limiting
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

  const rateLimitResult = await rateLimit(ip);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Zbyt wiele prób wysłania formularza. Spróbuj ponownie za 10 minut.",
        remaining: rateLimitResult.remaining,
        resetAtMs: rateLimitResult.resetAtMs,
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rateLimitResult.resetAtMs - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // 2. Parsowanie zawartości żądania
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Nieprawidłowy format danych JSON.",
      },
      { status: 400 }
    );
  }

  // 3. Walidacja schematu Zod
  const validation = contactFormSchema.safeParse(rawBody);

  if (!validation.success) {
    const formattedErrors = validation.error.flatten().fieldErrors;
    
    // Sprawdzenie czy wypełniono pole honeypot
    if (formattedErrors.honeypot) {
      return NextResponse.json(
        {
          success: false,
          error: "Wykryto próbę wysłania spamu (honeypot).",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "W formularzu znajdują się błędy. Popraw wskazane pola.",
        fieldErrors: formattedErrors,
      },
      { status: 400 }
    );
  }

  const data = validation.data;

  // 4. Antyspam: Weryfikacja tokenu czasu (minimum 3s, maksimum 1h)
  const tokenCheck = verifyTimeToken(data.timeToken);
  if (!tokenCheck.valid) {
    return NextResponse.json(
      {
        success: false,
        error: tokenCheck.message || "Błąd weryfikacji tokenu antyspamowego.",
        code: tokenCheck.code,
      },
      { status: 400 }
    );
  }

  // 5. Wysyłka e-mail przez Resend
  const emailResult = await sendContactEmail(data);

  if (!emailResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: emailResult.error || "Wystąpił problem podczas doręczania wiadomości. Spróbuj ponownie później.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: emailResult.message || "Dziękujemy za kontakt! Wiadomość została przesłana. Odpowiemy najszybciej jak to możliwe.",
      devMode: emailResult.devMode || false,
    },
    { status: 200 }
  );
}
