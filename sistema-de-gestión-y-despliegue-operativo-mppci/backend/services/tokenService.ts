import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const SECRET_FILE = path.join(process.cwd(), 'backend', 'data', 'server_key.secret');

function getOrGenerateSecret(): string {
  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32) {
    return process.env.SESSION_SECRET;
  }

  const dir = path.dirname(SECRET_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(SECRET_FILE)) {
    return fs.readFileSync(SECRET_FILE, 'utf8').trim();
  }

  const generated = crypto.randomBytes(48).toString('hex');
  fs.writeFileSync(SECRET_FILE, generated, 'utf8');
  return generated;
}

export const SERVER_SECRET = getOrGenerateSecret();

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

export interface UserSessionPayload {
  sub: string;
  cedula: string;
  nombre: string;
  apellido: string;
  enteAdscrito: string;
  rolSistema: string;
  raciRole: string;
  nivelAcceso: string;
  permisosModulos: string[];
  iat?: number;
  exp?: number;
}

export class TokenService {
  /**
   * Genera un token de sesión criptográfico con firma HMAC-SHA256
   */
  static generateToken(payload: UserSessionPayload, expiresInSeconds = 86400): string {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'HS256', typ: 'JWT' };
    const fullPayload = {
      ...payload,
      iat: now,
      exp: now + expiresInSeconds
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

    const signature = crypto
      .createHmac('sha256', SERVER_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Verifica la firma y vigencia del token de sesión
   */
  static verifyToken(token: string): { valid: boolean; payload?: UserSessionPayload; error?: string } {
    if (!token || typeof token !== 'string') {
      return { valid: false, error: 'Token no provisto' };
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Estructura de token inválida' };
    }

    const [encodedHeader, encodedPayload, signature] = parts;

    // Verificar firma criptográfica
    const expectedSignature = crypto
      .createHmac('sha256', SERVER_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    const expectedBuffer = Buffer.from(expectedSignature);
    const actualBuffer = Buffer.from(signature);

    if (expectedBuffer.length !== actualBuffer.length || !crypto.timingSafeEqual(expectedBuffer, actualBuffer)) {
      return { valid: false, error: 'Firma criptográfica inválida o adulterada' };
    }

    try {
      const payload: UserSessionPayload = JSON.parse(base64UrlDecode(encodedPayload));
      const now = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < now) {
        return { valid: false, error: 'Token de sesión expirado' };
      }

      return { valid: true, payload };
    } catch {
      return { valid: false, error: 'Carga útil corrupta o ilegible' };
    }
  }
}
