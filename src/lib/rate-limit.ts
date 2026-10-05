interface RateLimitStore {
  [key: string]: { count: number; expiresAt: number };
}

const store: RateLimitStore = {};

// Clean up expired tokens periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      if (store[key].expiresAt < now) {
        delete store[key];
      }
    }
  }, 60000);
}

/**
 * Basic in-memory rate limiter for serverless route handlers
 * @param ip Client IP address or unique identifier
 * @param limit Max allowed requests within window
 * @param windowMs Time window in milliseconds
 */
export function rateLimit(ip: string, limit: number = 10, windowMs: number = 60000): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = store[ip];

  if (!record || record.expiresAt < now) {
    store[ip] = { count: 1, expiresAt: now + windowMs };
    return { success: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count };
}
