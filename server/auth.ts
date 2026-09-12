import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { getDatabase, saveDatabase } from './db';
import { hashPassword } from './defaultData';

// In-memory token store with 7-day expiration and role information
export interface Session {
  token: string;
  username: string;
  role: 'superadmin' | 'admin' | 'editor';
  createdAt: number;
  expiresAt: number;
}

const sessions = new Map<string, Session>();

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function createSession(username: string, role: 'superadmin' | 'admin' | 'editor' = 'superadmin'): string {
  const token = generateToken();
  const now = Date.now();
  const expiresAt = now + 7 * 24 * 60 * 60 * 1000; // 7 days
  sessions.set(token, { token, username, role, createdAt: now, expiresAt });
  return token;
}

export function getSession(token: string): Session | null {
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return session;
}

export function verifySession(token: string): boolean {
  return getSession(token) !== null;
}

export function deleteSession(token: string): void {
  sessions.delete(token);
}

export function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  const customHeader = req.headers['x-admin-token'];
  if (typeof customHeader === 'string' && customHeader.trim()) {
    return customHeader.trim();
  }
  return null;
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ 
      error: 'Unauthorized. Administrative credentials required.',
      code: 'UNAUTHORIZED' 
    });
  }

  const session = getSession(token);
  if (!session) {
    return res.status(401).json({ 
      error: 'Session expired or invalid. Please sign in again.',
      code: 'SESSION_EXPIRED' 
    });
  }

  // Attach session info to request
  (req as any).adminSession = session;
  next();
}

export function requireRole(allowedRoles: ('superadmin' | 'admin' | 'editor')[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized.', code: 'UNAUTHORIZED' });
    }
    const session = getSession(token);
    if (!session) {
      return res.status(401).json({ error: 'Session expired.', code: 'SESSION_EXPIRED' });
    }
    if (!allowedRoles.includes(session.role)) {
      return res.status(403).json({ 
        error: 'Forbidden. Your role does not have permission to perform this action.',
        code: 'FORBIDDEN' 
      });
    }
    (req as any).adminSession = session;
    next();
  };
}

