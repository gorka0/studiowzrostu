import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_ALLOW_INDEXING: z.string().optional().default("false"),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().email().optional().default("kontakt@studiowzrostu.pl"),
  CONTACT_FROM_EMAIL: z.string().optional().default("formularz@studiowzrostu.pl"),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  CONTACT_SECRET: z.string().optional().default("studio-wzrostu-dev-hmac-secret-2026"),
});

export const isIndexingAllowed = (): boolean => {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";
};

export const getEnv = () => {
  const result = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_ALLOW_INDEXING: process.env.NEXT_PUBLIC_ALLOW_INDEXING,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    CONTACT_SECRET: process.env.CONTACT_SECRET,
  });

  if (!result.success) {
    console.error("Błąd walidacji zmiennych środowiskowych:", result.error.format());
    throw new Error("Nieprawidłowa konfiguracja zmiennych środowiskowych");
  }

  return result.data;
};

export const env = getEnv();
