import { test, describe } from 'node:test';
import assert from 'node:assert';
import { TokenService, UserSessionPayload } from '../../backend/services/tokenService';

describe('Suites de Seguridad: Tokens de Sesión Criptográficos HMAC-SHA256', () => {

  const usuarioPrueba: UserSessionPayload = {
    sub: 'USR-001',
    cedula: 'V-13537582',
    nombre: 'Sahib',
    apellido: 'Franco',
    enteAdscrito: 'VSCC',
    rolSistema: 'SUPER_ADMIN',
    raciRole: 'AUDITOR_CONTRALOR',
    nivelAcceso: 'ADMIN_TOTAL',
    permisosModulos: ['DASHBOARD', 'CAPTURA', 'GESTION_USUARIOS']
  };

  test('Generación de token con formato estándar Header.Payload.Signature', () => {
    const token = TokenService.generateToken(usuarioPrueba, 3600);
    assert.ok(token);

    const parts = token.split('.');
    assert.strictEqual(parts.length, 3, 'El token debe contener exactamente 3 partes delimitadas por punto');
  });

  test('Verificación exitosa de token legítimo', () => {
    const token = TokenService.generateToken(usuarioPrueba, 3600);
    const result = TokenService.verifyToken(token);

    assert.strictEqual(result.valid, true);
    assert.ok(result.payload);
    assert.strictEqual(result.payload.sub, 'USR-001');
    assert.strictEqual(result.payload.rolSistema, 'SUPER_ADMIN');
    assert.strictEqual(result.payload.cedula, 'V-13537582');
  });

  test('Detección y rechazo inmediato de tokens adulterados en el payload', () => {
    const token = TokenService.generateToken(usuarioPrueba, 3600);
    const parts = token.split('.');

    // Adulterar un carácter en el payload
    const payloadAdulterado = parts[1].slice(0, -1) + (parts[1].endsWith('A') ? 'B' : 'A');
    const tokenFalsificado = `${parts[0]}.${payloadAdulterado}.${parts[2]}`;

    const result = TokenService.verifyToken(tokenFalsificado);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.error, 'Firma criptográfica inválida o adulterada');
  });

  test('Detección y rechazo de tokens con firma manipulada', () => {
    const token = TokenService.generateToken(usuarioPrueba, 3600);
    const parts = token.split('.');

    const firmaFalsificada = parts[2].slice(0, -2) + '00';
    const tokenFalsificado = `${parts[0]}.${parts[1]}.${firmaFalsificada}`;

    const result = TokenService.verifyToken(tokenFalsificado);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.error, 'Firma criptográfica inválida o adulterada');
  });

  test('Expiración temporal estricta de tokens de sesión', () => {
    // Generar un token con tiempo de vida negativo (-10 segundos)
    const tokenExpirado = TokenService.generateToken(usuarioPrueba, -10);
    const result = TokenService.verifyToken(tokenExpirado);

    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.error, 'Token de sesión expirado');
  });
});
