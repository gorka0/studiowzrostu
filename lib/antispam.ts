import crypto from "crypto";

const SECRET = process.env.CONTACT_SECRET || "studio-wzrostu-default-anti-spam-secret-2026";
const MIN_FILL_TIME_MS = 3000; // 3 sekundy
const MAX_FILL_TIME_MS = 3600 * 1000; // 1 godzina

export function generateTimeToken(timestamp: number = Date.now()): string {
  const hmac = crypto
    .createHmac("sha256", SECRET)
    .update(timestamp.toString())
    .digest("hex");
  return `${timestamp}.${hmac}`;
}

export interface VerifyTokenResult {
  valid: boolean;
  code?: "TOO_FAST" | "EXPIRED" | "INVALID_SIGNATURE" | "MALFORMED";
  message?: string;
  elapsedMs?: number;
}

export function verifyTimeToken(token: string, now: number = Date.now()): VerifyTokenResult {
  if (!token || typeof token !== "string") {
    return {
      valid: false,
      code: "MALFORMED",
      message: "Brak lub nieprawidłowy format tokenu antyspamowego.",
    };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return {
      valid: false,
      code: "MALFORMED",
      message: "Nieprawidłowa struktura tokenu antyspamowego.",
    };
  }

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp)) {
    return {
      valid: false,
      code: "MALFORMED",
      message: "Nieprawidłowy znacznik czasu w tokenie.",
    };
  }

  const expectedHmac = crypto
    .createHmac("sha256", SECRET)
    .update(timestamp.toString())
    .digest("hex");

  // Bezpieczne stałoczasowe porównanie podpisów
  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedHmac, "hex");

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return {
      valid: false,
      code: "INVALID_SIGNATURE",
      message: "Nieprawidłowy podpis tokenu antyspamowego.",
    };
  }

  const elapsed = now - timestamp;

  if (elapsed < MIN_FILL_TIME_MS) {
    return {
      valid: false,
      code: "TOO_FAST",
      message: "Formularz został wysłany zbyt szybko. Odczekaj minimum 3 sekundy i spróbuj ponownie.",
      elapsedMs: elapsed,
    };
  }

  if (elapsed > MAX_FILL_TIME_MS) {
    return {
      valid: false,
      code: "EXPIRED",
      message: "Sesja formularza wygasła (ważność: 1 godzina). Odśwież stronę i wyślij ponownie.",
      elapsedMs: elapsed,
    };
  }

  return {
    valid: true,
    elapsedMs: elapsed,
  };
}
