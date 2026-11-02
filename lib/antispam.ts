import crypto from "crypto";

const SECRET = process.env.CONTACT_SECRET || "studio-wzrostu-default-anti-spam-secret-2026";
const MIN_FILL_TIME_MS = 3000; // 3 sekundy
const MAX_FILL_TIME_MS = 3600 * 1000; // 1 godzina

// Magazyn zużytych tokenów (zapobieganie atakom typu Replay Attack)
const consumedTokens = new Map<string, number>();

function cleanupConsumedTokens(now: number) {
  if (consumedTokens.size > 2000) {
    for (const [sig, expiry] of consumedTokens.entries()) {
      if (expiry <= now) {
        consumedTokens.delete(sig);
      }
    }
  }
}

export function generateTimeToken(timestamp: number = Date.now()): string {
  const nonce = crypto.randomBytes(8).toString("hex");
  const payload = `${timestamp}.${nonce}`;
  const hmac = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}.${hmac}`;
}

export interface VerifyTokenResult {
  valid: boolean;
  code?: "TOO_FAST" | "EXPIRED" | "INVALID_SIGNATURE" | "MALFORMED" | "REPLAYED";
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
  // Obsługa formatu 3-częściowego (timestamp.nonce.hmac) lub klasycznego 2-częściowego (timestamp.hmac)
  if (parts.length !== 2 && parts.length !== 3) {
    return {
      valid: false,
      code: "MALFORMED",
      message: "Nieprawidłowa struktura tokenu antyspamowego.",
    };
  }

  const timestampStr = parts[0];
  const signature = parts[parts.length - 1];
  const payloadToSign = parts.slice(0, -1).join(".");

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
    .update(payloadToSign)
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

  // Zapobieganie atakom powtórzeniowym (Replay Attack)
  cleanupConsumedTokens(now);
  if (consumedTokens.has(signature)) {
    return {
      valid: false,
      code: "REPLAYED",
      message: "Ten token formularza został już wykorzystany. Odśwież formularz.",
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

  // Oznacz token jako skonsumowany do momentu jego wygaśnięcia
  consumedTokens.set(signature, timestamp + MAX_FILL_TIME_MS);

  return {
    valid: true,
    elapsedMs: elapsed,
  };
}
