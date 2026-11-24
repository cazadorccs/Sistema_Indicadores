import { test, describe } from 'node:test';
import assert from 'node:assert';
import { 
  isUserAuthorizedForCaptureModule, 
  getAuthorizedCaptureModules,
  getDefaultCaptureModuleForUser
} from '../../src/utils/capturePermissions';
import { INITIAL_USERS } from '../../src/data/usersData';

describe('Suites de Seguridad: Segregación Estricta de Privilegios RBAC', () => {

  const usuarioSuperAdmin = INITIAL_USERS.find(u => u.id === 'USR-001')!;
  const usuarioRedtv = INITIAL_USERS.find(u => u.id === 'USR-005')!;
  const usuarioVtv = INITIAL_USERS.find(u => u.id === 'USR-004')!;

  test('Usuarios base existen en el directorio institucional', () => {
    assert.ok(usuarioSuperAdmin, 'Super Admin debe existir');
    assert.ok(usuarioRedtv, 'Usuario REDTV debe existir');
    assert.ok(usuarioVtv, 'Usuario VTV debe existir');
  });

  test('Super Administrador tiene acceso irrestricto a todos los módulos de captura', () => {
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioSuperAdmin, 'SCIC_ENTE'), true);
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioSuperAdmin, 'CONTROL'), true);
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioSuperAdmin, 'EJE_1'), true);
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioSuperAdmin, 'EJE_2'), true);
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioSuperAdmin, 'EJE_3'), true);
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioSuperAdmin, 'EJE_4'), true);
  });

  test('Operador de REDTV solo puede acceder a Eje 2 (Plataformas) y sus planillas', () => {
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioRedtv, 'EJE_2'), true, 'Debe acceder a Eje 2');
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioRedtv, 'SCIC_ENTE'), true, 'Debe acceder a su planilla SCIC');
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioRedtv, 'EJE_1'), false, 'REDTV NO debe acceder a Eje 1 (Medios)');
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioRedtv, 'EJE_3'), false, 'REDTV NO debe acceder a Eje 3 (Gestión/Inteligencia)');
  });

  test('Operador de VTV solo puede acceder a Eje 1 (Medios) y NO a telecomunicaciones Eje 2', () => {
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioVtv, 'EJE_1'), true, 'Debe acceder a Eje 1 (Medios)');
    assert.strictEqual(isUserAuthorizedForCaptureModule(usuarioVtv, 'EJE_2'), false, 'VTV NO debe acceder a Eje 2 (Plataformas REDTV/CONATEL)');
  });

  test('Módulo por defecto asignado congruentemente por Ente', () => {
    assert.strictEqual(getDefaultCaptureModuleForUser(usuarioRedtv), 'EJE_2');
    assert.strictEqual(getDefaultCaptureModuleForUser(usuarioVtv), 'EJE_1');
    assert.strictEqual(getDefaultCaptureModuleForUser(null), 'CONTROL');
  });

  test('Usuario nulo o no autenticado no recibe permisos de captura', () => {
    const authorized = getAuthorizedCaptureModules(null);
    assert.deepStrictEqual(authorized, []);
  });
});
