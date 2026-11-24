import crypto from 'node:crypto';

export interface ScryptHashResult {
  hash: string;
  salt: string;
}

export interface RecoveryTokenResult {
  token: string;
  exp: number;
}

export class PasswordCryptoService {
  /**
   * Hashea una contraseña institucional usando scrypt nativo (Node.js) con sal criptográfica aleatoria
   * Parámetros recomendados por RFC 7914: N=16384, r=8, p=1, keylen=64
   */
  static hashPassword(password: string): ScryptHashResult {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = crypto.scryptSync(password, salt, 64, {
      N: 16384,
      r: 8,
      p: 1
    });
    return {
      hash: derivedKey.toString('hex'),
      salt
    };
  }

  /**
   * Verifica una contraseña ingresada contra el hash y sal almacenados en la base de datos
   * Utiliza timingSafeEqual para prevenir ataques de canal lateral (timing attacks)
   */
  static verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
    if (!password || !storedHash || !storedSalt) return false;
    try {
      const derivedKey = crypto.scryptSync(password, storedSalt, 64, {
        N: 16384,
        r: 8,
        p: 1
      });
      const hashBuffer = Buffer.from(storedHash, 'hex');
      if (hashBuffer.length !== derivedKey.length) {
        return false;
      }
      return crypto.timingSafeEqual(hashBuffer, derivedKey);
    } catch {
      return false;
    }
  }

  /**
   * Genera un código OTP criptográficamente seguro de 6 dígitos numéricos
   */
  static generateRecoveryOTP(): string {
    const num = crypto.randomInt(100000, 999999);
    return num.toString();
  }

  /**
   * Genera un token HMAC temporal para el flujo de recuperación de contraseña (validez por defecto: 15 min)
   */
  static generateRecoveryToken(cedula: string, secret: string, expiresInMinutes = 15): RecoveryTokenResult {
    const exp = Date.now() + expiresInMinutes * 60 * 1000;
    const hmac = crypto
      .createHmac('sha256', secret)
      .update(`${cedula}:${exp}`)
      .digest('hex');
    const token = `${cedula}.${exp}.${hmac}`;
    return { token, exp };
  }

  /**
   * Valida la firma HMAC y expiración temporal del token de recuperación
   */
  static verifyRecoveryToken(token: string, secret: string): { valid: boolean; cedula?: string; error?: string } {
    if (!token || typeof token !== 'string') {
      return { valid: false, error: 'Token de recuperación no provisto.' };
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Estructura de token de recuperación inválida.' };
    }

    const [cedula, expStr, signature] = parts;
    const exp = parseInt(expStr, 10);

    if (isNaN(exp)) {
      return { valid: false, error: 'Marca temporal del token inválida.' };
    }

    if (Date.now() > exp) {
      return { valid: false, error: 'El token de recuperación ha expirado. Solicite un nuevo código.' };
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${cedula}:${exp}`)
      .digest('hex');

    if (!/^[0-9a-fA-F]{64}$/.test(signature)) {
      return { valid: false, error: 'Firma criptográfica del token de recuperación inválida.' };
    }

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (expectedBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) {
      return { valid: false, error: 'Firma criptográfica del token de recuperación inválida.' };
    }

    return { valid: true, cedula };
  }

  /**
   * Genera o valida un identificador de dispositivo vinculado (bound_device_id)
   */
  static generateDeviceId(clientHint: string, clientRandom?: string): string {
    const randomSeed = clientRandom || crypto.randomBytes(16).toString('hex');
    return crypto
      .createHash('sha256')
      .update(`DEV:${clientHint}:${randomSeed}`)
      .digest('hex')
      .substring(0, 32);
  }
}
