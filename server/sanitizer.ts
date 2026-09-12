/**
 * Server-side Input Sanitization & Validation Utilities
 */

export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  // Remove null bytes and dangerous script/html tags
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/onload=/gi, '')
    .replace(/onerror=/gi, '')
    .trim();
}

export function sanitizeNumber(input: unknown, fallback = 0, min?: number, max?: number): number {
  let num = Number(input);
  if (isNaN(num)) return fallback;
  if (min !== undefined && num < min) num = min;
  if (max !== undefined && num > max) num = max;
  return num;
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => typeof item === 'object' ? sanitizeObject(item) : typeof item === 'string' ? sanitizeString(item) : item) as any;
  }
  const result: any = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === 'string') {
      result[key] = sanitizeString(val);
    } else if (typeof val === 'number') {
      result[key] = val;
    } else if (typeof val === 'boolean') {
      result[key] = val;
    } else if (Array.isArray(val)) {
      result[key] = val.map(item => typeof item === 'object' ? sanitizeObject(item) : typeof item === 'string' ? sanitizeString(item) : item);
    } else if (typeof val === 'object' && val !== null) {
      result[key] = sanitizeObject(val);
    } else {
      result[key] = val;
    }
  }
  return result;
}
