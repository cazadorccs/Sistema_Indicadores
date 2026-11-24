import { test, describe } from 'node:test';
import assert from 'node:assert';
import { PasswordCryptoService } from '../../backend/services/passwordService';
import { SqliteStore } from '../../backend/db/sqliteStore';
import { SERVER_SECRET } from '../../backend/services/tokenService';

describe('Suites de Seguridad: Formalización Multi-Dispositivo y Hashing scrypt', () => {

  test('scrypt Hashing: Generación de clave derivada y sal criptográfica aleatoria', () => {
    const password = 'ClaveSoberanaMippci2026*';
    const result1 = PasswordCryptoService.hashPassword(password);

    assert.ok(result1.hash, 'El hash derivado no debe ser nulo');
    assert.strictEqual(result1.hash.length, 128, 'La clave derivada scrypt debe tener 64 bytes (128 caracteres hex)');
    assert.ok(result1.salt, 'La sal criptográfica no debe ser nula');
    assert.strictEqual(result1.salt.length, 32, 'La sal aleatoria debe tener 16 bytes (32 caracteres hex)');

    // Unicidad de sal: la misma contraseña genera hashes y sales completamente distintos
    const result2 = PasswordCryptoService.hashPassword(password);
    assert.notStrictEqual(result1.salt, result2.salt, 'Cada invocación debe generar una sal aleatoria única');
    assert.notStrictEqual(result1.hash, result2.hash, 'Sal distinta debe producir un hash hex diferente');
  });

  test('scrypt Verificación: Validación timing-safe de contraseñas correctas e incorrectas', () => {
    const password = 'PatriaSoberana2026!';
    const { hash, salt } = PasswordCryptoService.hashPassword(password);

    // Contraseña correcta
    const valid = PasswordCryptoService.verifyPassword(password, hash, salt);
    assert.strictEqual(valid, true, 'La contraseña legítima debe verificarse exitosamente');

    // Contraseña incorrecta
    const invalid = PasswordCryptoService.verifyPassword('ClaveErrada123', hash, salt);
    assert.strictEqual(invalid, false, 'Una contraseña incorrecta debe ser rechazada');

    // Detección de adulteración en el hash
    const tamperedHash = hash.substring(0, hash.length - 2) + (hash.endsWith('a') ? 'b' : 'a');
    const tamperedCheck = PasswordCryptoService.verifyPassword(password, tamperedHash, salt);
    assert.strictEqual(tamperedCheck, false, 'Un hash manipulado debe ser rechazado inmediatamente');
  });

  test('Vinculación Criptográfica de Dispositivo (bound_device_id)', () => {
    const devId1 = PasswordCryptoService.generateDeviceId('Linux x86_64 - Firefox');
    assert.ok(devId1, 'Debe generar un identificador de dispositivo');
    assert.strictEqual(devId1.length, 32, 'El bound_device_id debe tener 32 caracteres');

    // Generación determinista con semilla provista
    const fixedSeed = 'test-device-seed-12345';
    const devId2 = PasswordCryptoService.generateDeviceId('Android 14 - Chrome', fixedSeed);
    const devId3 = PasswordCryptoService.generateDeviceId('Android 14 - Chrome', fixedSeed);
    assert.strictEqual(devId2, devId3, 'Con la misma semilla y cliente debe ser determinista');
  });
});

describe('Suites de Recuperación: Autoservicio en Dos Pasos y Tokens HMAC', () => {

  test('Generación de Código OTP de 6 dígitos numéricos', () => {
    const otp = PasswordCryptoService.generateRecoveryOTP();
    assert.match(otp, /^\d{6}$/, 'El código de seguridad debe tener exactamente 6 dígitos numéricos');
  });

  test('Tokens HMAC de Recuperación: Emisión y validación temporal estricta', () => {
    const cedula = 'V-13537582';
    const { token, exp } = PasswordCryptoService.generateRecoveryToken(cedula, SERVER_SECRET, 15);

    assert.ok(token.startsWith(`${cedula}.`), 'El token debe comenzar con la cédula del funcionario');
    assert.ok(exp > Date.now(), 'La expiración debe ser futura');

    // Verificación válida
    const checkValid = PasswordCryptoService.verifyRecoveryToken(token, SERVER_SECRET);
    assert.strictEqual(checkValid.valid, true);
    assert.strictEqual(checkValid.cedula, cedula);

    // Detección de token adulterado
    const tamperedToken = token + 'manipulado';
    const checkTampered = PasswordCryptoService.verifyRecoveryToken(tamperedToken, SERVER_SECRET);
    assert.strictEqual(checkTampered.valid, false, 'Un token con firma manipulada debe ser rechazado');

    // Detección de token expirado
    const expiredExp = Date.now() - 10000;
    const expiredToken = `${cedula}.${expiredExp}.fakesig`;
    const checkExpired = PasswordCryptoService.verifyRecoveryToken(expiredToken, SERVER_SECRET);
    assert.strictEqual(checkExpired.valid, false);
    assert.match(checkExpired.error || '', /expirado/i);
  });
});

describe('Suites de Integración SQLite: Formalización y Gestión Administrativa de Credenciales', () => {

  test('Formalización Inicial de Funcionario: Foto, scrypt hash y vinculación de dispositivo', () => {
    // Tomamos un usuario para formalización
    const testUserId = 'USR-003';
    const newPass = 'NuevaClaveSegura2026#';
    const mockPhoto = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...';
    const mockDeviceId = 'DEV-MOBILE-TEST-XYZ-01';

    const formalizeRes = SqliteStore.formalizeUsuario({
      userId: testUserId,
      password: newPass,
      fotoPerfilUrl: mockPhoto,
      boundDeviceId: mockDeviceId,
      boundDeviceNombre: 'iPhone 15 Pro - Safari Móvil'
    });

    assert.strictEqual(formalizeRes.success, true);
    assert.strictEqual(formalizeRes.user.estatusEnrolamiento, 'ENROLADO');
    assert.strictEqual(formalizeRes.user.boundDeviceId, mockDeviceId);
    assert.strictEqual(formalizeRes.user.fotoPerfilUrl, mockPhoto);

    // Verificar que la nueva contraseña scrypt funciona
    const userFromDb = SqliteStore.getUsuarioByIdentifier(testUserId);
    assert.ok(userFromDb.password_hash, 'El usuario debe tener hash de contraseña en SQLite');
    assert.ok(userFromDb.password_salt, 'El usuario debe tener sal en SQLite');
    const isPassOk = PasswordCryptoService.verifyPassword(newPass, userFromDb.password_hash, userFromDb.password_salt);
    assert.strictEqual(isPassOk, true, 'La contraseña scrypt guardada en SQLite debe verificar con éxito');
  });

  test('Autoservicio de Recuperación: Flujo completo paso 1 (nómina) y paso 2 (scrypt reset)', () => {
    const user = SqliteStore.getUsuarioByIdentifier('USR-001');
    assert.ok(user, 'Usuario USR-001 debe existir');

    // Paso 1: Verificación con datos oficiales de nómina
    const step1 = SqliteStore.requestPasswordRecovery(user.cedula, user.email, SERVER_SECRET);
    assert.strictEqual(step1.success, true);
    assert.ok(step1.recoveryCode, 'Debe emitir código OTP');
    assert.ok(step1.recoveryToken, 'Debe emitir token HMAC');

    // Paso 1 con datos no coincidentes debe ser rechazado
    const step1Fail = SqliteStore.requestPasswordRecovery(user.cedula, 'correo_falso@gmail.com', SERVER_SECRET);
    assert.strictEqual(step1Fail.success, false, 'No debe emitir código si el contacto no coincide con nómina');

    // Paso 2: Reasignación de contraseña
    const restoredPass = 'ContrasenaRestaurada2026$';
    const step2 = SqliteStore.resetPasswordWithRecovery({
      cedula: user.cedula,
      recoveryCode: step1.recoveryCode!,
      newPassword: restoredPass,
      recoveryToken: step1.recoveryToken!,
      serverSecret: SERVER_SECRET
    });
    assert.strictEqual(step2.success, true);

    // Verificar que la contraseña restablecida autentica correctamente con scrypt
    const updatedUser = SqliteStore.getUsuarioByIdentifier(user.id);
    const passMatches = PasswordCryptoService.verifyPassword(restoredPass, updatedUser.password_hash, updatedUser.password_salt);
    assert.strictEqual(passMatches, true, 'La contraseña restablecida mediante autoservicio debe autenticar');
  });

  test('Gestión Administrativa: Asignación manual de clave y restablecimiento a PRECARGADO', () => {
    const targetUserId = 'USR-004';

    // 1. Asignación manual de contraseña por un Director
    const adminPass = 'ClaveDirectorAsignada2026!';
    const assignRes = SqliteStore.adminSetPassword(targetUserId, adminPass);
    assert.strictEqual(assignRes.success, true);

    const userWithNewPass = SqliteStore.getUsuarioByIdentifier(targetUserId);
    const validPass = PasswordCryptoService.verifyPassword(adminPass, userWithNewPass.password_hash, userWithNewPass.password_salt);
    assert.strictEqual(validPass, true, 'La contraseña manual asignada por el Director debe ser válida con scrypt');

    // 2. Restablecer al funcionario al estatus PRECARGADO para forzar su enrolamiento
    const resetRes = SqliteStore.adminResetToPrecargado(targetUserId);
    assert.strictEqual(resetRes.success, true);

    const userReset = SqliteStore.getUsuarioByIdentifier(targetUserId);
    assert.strictEqual(userReset.estatusEnrolamiento, 'PRECARGADO', 'El estatus debe ser PRECARGADO');
    assert.strictEqual(userReset.boundDeviceId, null, 'El bound_device_id debe haberse desvinculado');
    assert.strictEqual(userReset.password_hash, null, 'El password_hash debe haberse limpiado');
  });
});
