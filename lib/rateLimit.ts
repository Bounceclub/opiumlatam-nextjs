// Simple rate limiting implementation using localStorage
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

interface RateLimitData {
  attempts: number;
  lastAttempt: number;
  lockUntil?: number;
}

export function checkRateLimit(identifier: string): { allowed: boolean; remainingAttempts: number; lockoutUntil?: number } {
  const key = `ratelimit_${identifier}`;
  const data = localStorage.getItem(key);

  if (!data) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  const rateLimitData: RateLimitData = JSON.parse(data);
  const now = Date.now();

  // Check if locked out
  if (rateLimitData.lockUntil && now < rateLimitData.lockUntil) {
    return {
      allowed: false,
      remainingAttempts: 0,
      lockoutUntil: rateLimitData.lockUntil,
    };
  }

  // Reset if lockout expired
  if (rateLimitData.lockUntil && now >= rateLimitData.lockUntil) {
    localStorage.removeItem(key);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // Check attempts
  if (rateLimitData.attempts >= MAX_ATTEMPTS) {
    const lockUntil = now + LOCKOUT_TIME;
    localStorage.setItem(key, JSON.stringify({
      attempts: rateLimitData.attempts,
      lastAttempt: now,
      lockUntil,
    }));
    return {
      allowed: false,
      remainingAttempts: 0,
      lockoutUntil: lockUntil,
    };
  }

  return {
    allowed: true,
    remainingAttempts: MAX_ATTEMPTS - rateLimitData.attempts,
  };
}

export function recordAttempt(identifier: string, success: boolean): void {
  const key = `ratelimit_${identifier}`;
  const now = Date.now();

  if (success) {
    // Reset on successful attempt
    localStorage.removeItem(key);
    return;
  }

  const data = localStorage.getItem(key);
  let rateLimitData: RateLimitData = data ? JSON.parse(data) : { attempts: 0, lastAttempt: now };

  rateLimitData.attempts += 1;
  rateLimitData.lastAttempt = now;

  localStorage.setItem(key, JSON.stringify(rateLimitData));
}

export function getLockoutTimeRemaining(identifier: string): number {
  const key = `ratelimit_${identifier}`;
  const data = localStorage.getItem(key);

  if (!data) return 0;

  const rateLimitData: RateLimitData = JSON.parse(data);
  if (!rateLimitData.lockUntil) return 0;

  const remaining = rateLimitData.lockUntil - Date.now();
  return Math.max(0, remaining);
}
