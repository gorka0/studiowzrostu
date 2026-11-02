import { Redis } from "@upstash/redis";

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAtMs: number;
}

const WINDOW_MS = 10 * 60 * 1000; // 10 minut
const MAX_REQUESTS = 5; // Maksymalnie 5 zgłoszeń na 10 minut z jednego IP
const MAX_STORE_ENTRIES = 5000; // Górny limit pamięci operacyjnej chroniący przed atakiem OOM

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

  // Jeśli po wyczyszczeniu wygasłych wpisów magazyn nadal przekracza limit, usuń najstarsze wpisy
  if (memoryStore.size >= MAX_STORE_ENTRIES) {
    const keysToDelete = Array.from(memoryStore.keys()).slice(0, Math.floor(MAX_STORE_ENTRIES * 0.2));
    for (const key of keysToDelete) {
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
  // Sanityzacja identyfikatora (blokada wstrzykiwania nadmiernych lub złośliwych ciągów znaków do klucza cache)
  const safeIdentifier = (identifier || "127.0.0.1")
    .replace(/[^a-zA-Z0-9:._-]/g, "")
    .slice(0, 64);

  // Ścieżka Upstash Redis
  if (upstashClient) {
    try {
      const key = `rl:contact:${safeIdentifier}`;
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

  // Ścieżka in-memory fallback z aktywnym czyszczeniem i zabezpieczeniem OOM
  if (memoryStore.size >= MAX_STORE_ENTRIES * 0.8) {
    cleanMemoryStore();
  }

  const existing = memoryStore.get(safeIdentifier);

  if (!existing || existing.resetAt <= now) {
    const newEntry: MemoryEntry = {
      count: 1,
      resetAt: now + WINDOW_MS,
    };
    memoryStore.set(safeIdentifier, newEntry);
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
