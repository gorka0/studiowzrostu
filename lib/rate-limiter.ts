import { Redis } from "@upstash/redis";

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAtMs: number;
}

const WINDOW_MS = 10 * 60 * 1000; // 10 minut
const MAX_REQUESTS = 5; // Maksymalnie 5 zgłoszeń na 10 minut z jednego adresu IP

// In-memory fallback dla środowiska lokalnego / deweloperskiego
interface MemoryEntry {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, MemoryEntry>();

function cleanMemoryStore() {
  const now = Date.now();
  for (const [key, value] of memoryStore.entries()) {
    if (value.resetAt <= now) {
      memoryStore.delete(key);
    }
  }
}

// Inicjalizacja klienta Upstash Redis jeśli skonfigurowano w zmiennych środowiskowych
let upstashClient: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    upstashClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (e) {
    console.warn("Nie udało się zainicjalizować Upstash Redis, przełączam na in-memory:", e);
    upstashClient = null;
  }
}

export async function rateLimit(identifier: string): Promise<RateLimitResult> {
  const now = Date.now();

  // Ścieżka Upstash Redis
  if (upstashClient) {
    try {
      const key = `rl:contact:${identifier}`;
      const count = await upstashClient.incr(key);

      if (count === 1) {
        await upstashClient.expire(key, Math.ceil(WINDOW_MS / 1000));
      }

      const ttlSeconds = await upstashClient.ttl(key);
      const resetAtMs = now + (ttlSeconds > 0 ? ttlSeconds * 1000 : WINDOW_MS);
      const remaining = Math.max(0, MAX_REQUESTS - count);

      return {
        success: count <= MAX_REQUESTS,
        limit: MAX_REQUESTS,
        remaining,
        resetAtMs,
      };
    } catch (err) {
      console.warn("Błąd komunikacji z Upstash Redis, używam in-memory fallback:", err);
      // Przejście do fallbacku in-memory poniżej
    }
  }

  // Ścieżka in-memory fallback
  if (memoryStore.size > 1000) {
    cleanMemoryStore();
  }

  const existing = memoryStore.get(identifier);

  if (!existing || existing.resetAt <= now) {
    const newEntry: MemoryEntry = {
      count: 1,
      resetAt: now + WINDOW_MS,
    };
    memoryStore.set(identifier, newEntry);
    return {
      success: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS - 1,
      resetAtMs: newEntry.resetAt,
    };
  }

  existing.count += 1;
  const isAllowed = existing.count <= MAX_REQUESTS;
  const remaining = Math.max(0, MAX_REQUESTS - existing.count);

  return {
    success: isAllowed,
    limit: MAX_REQUESTS,
    remaining,
    resetAtMs: existing.resetAt,
  };
}
