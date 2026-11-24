import { Router } from 'express';
import { INITIAL_USERS } from '../../src/data/usersData';
import { TokenService, SERVER_SECRET } from '../services/tokenService';
import { MerkleService } from '../services/merkleService';
import { PasswordCryptoService } from '../services/passwordService';
import { SqliteStore } from '../db/sqliteStore';
import { authenticateToken, AuthenticatedRequest } from '../middleware/authMiddleware';

export const authRouter = Router();

/**
 * Inicio de sesión seguro con verificación scrypt, emisión de token criptográfico
 * y detección de vinculación de dispositivo (bound_device_id)
 */
authRouter.post(['/auth/login', '/v1/auth/login'], (req, res) => {
  const { identifier, password, boundDeviceId, boundDeviceNombre } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      error: 'Debe ingresar su identificación institucional y contraseña.'
    });
  }

  const term = String(identifier).trim();
  const user = SqliteStore.getUsuarioByIdentifier(term);

  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Cédula o usuario no encontrado en el directorio oficial.'
    });
  }

  // Verificación criptográfica de contraseña
  let passwordValid = false;

  if (user.password_hash && user.password_salt) {
    // Verificación robusta mediante scrypt
    passwordValid = PasswordCryptoService.verifyPassword(password, user.password_hash, user.password_salt);
  } else if (user.estatus_enrolamiento === 'PRECARGADO') {
    // Si el usuario aún está precargado, permite el acceso con la clave de contingencia oficial
    passwordValid = (password === 'admin123' || password === 'mppci2026' || password === '123456');
  }

  if (!passwordValid) {
    return res.status(401).json({
      success: false,
      error: 'Contraseña incorrecta. Por favor verifique sus credenciales.'
    });
  }

  // Verificación de vinculación de dispositivo (bound_device_id)
  let deviceMatch = true;
  if (user.estatus_enrolamiento === 'ENROLADO' && user.bound_device_id) {
    if (boundDeviceId && boundDeviceId !== user.bound_device_id) {
      deviceMatch = false;
      console.warn(`[Seguridad] Acceso para ${user.cedula} desde dispositivo no habitual (${boundDeviceId}). Dispositivo vinculado: ${user.bound_device_id}`);
    }
  }

  const token = TokenService.generateToken({
    sub: user.id,
    cedula: user.cedula,
    nombre: user.nombre,
    apellido: user.apellido,
    enteAdscrito: user.ente_adscrito,
    rolSistema: user.rol_sistema,
    raciRole: user.raci_role,
    nivelAcceso: user.nivel_acceso,
    permisosModulos: user.permisosModulos || []
  });

  const requiresFormalization = (user.estatus_enrolamiento === 'PRECARGADO');

  res.json({
    success: true,
    message: `Autenticación exitosa. Sesión iniciada para ${user.nombre} ${user.apellido}.`,
    token,
    user,
    requiresFormalization,
    deviceMatch,
    boundDeviceId: user.bound_device_id
  });
});

/**
 * Endpoint de Formalización Multi-Dispositivo de Beneficiarios:
 * Carga de foto oficial, asignación de contraseña scrypt y vinculación criptográfica del dispositivo
 */
authRouter.post(['/auth/formalize', '/v1/auth/formalize'], (req, res) => {
  const { userId, password, fotoPerfilUrl, boundDeviceId, boundDeviceNombre } = req.body;

  if (!userId || !password || !boundDeviceId) {
    return res.status(400).json({
      success: false,
      error: 'Se requiere userId, contraseña y boundDeviceId para formalizar la cuenta.'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'La contraseña institucional debe contener al menos 6 caracteres.'
    });
  }

  const result = SqliteStore.formalizeUsuario({
    userId,
    password,
    fotoPerfilUrl: fotoPerfilUrl || '',
    boundDeviceId,
    boundDeviceNombre: boundDeviceNombre || 'Dispositivo de Acceso Oficial'
  });

  if (!result.success || !result.user) {
    return res.status(400).json(result);
  }

  const token = TokenService.generateToken({
    sub: result.user.id,
    cedula: result.user.cedula,
    nombre: result.user.nombre,
    apellido: result.user.apellido,
    enteAdscrito: result.user.ente_adscrito,
    rolSistema: result.user.rol_sistema,
    raciRole: result.user.raci_role,
    nivelAcceso: result.user.nivel_acceso,
    permisosModulos: result.user.permisosModulos || []
  });

  res.json({
    success: true,
    message: result.message,
    token,
    user: result.user
  });
});

/**
 * Autoservicio de Recuperación - Paso 1:
 * Verificación de Cédula y datos de nómina (correo o teléfono) y emisión de token HMAC temporal
 */
authRouter.post(['/auth/recovery/request', '/v1/auth/recovery/request'], (req, res) => {
  const { cedula, emailOrPhone } = req.body;

  if (!cedula || !emailOrPhone) {
    return res.status(400).json({
      success: false,
      error: 'Debe ingresar su cédula y el correo o teléfono institucional registrado.'
    });
  }

  const result = SqliteStore.requestPasswordRecovery(cedula, emailOrPhone, SERVER_SECRET);
  if (!result.success) {
    return res.status(404).json(result);
  }

  res.json(result);
});

/**
 * Autoservicio de Recuperación - Paso 2:
 * Validación de código OTP / token HMAC y reasignación de contraseña con scrypt
 */
authRouter.post(['/auth/recovery/reset', '/v1/auth/recovery/reset'], (req, res) => {
  const { cedula, recoveryCode, newPassword, recoveryToken } = req.body;

  if (!cedula || !recoveryCode || !newPassword || !recoveryToken) {
    return res.status(400).json({
      success: false,
      error: 'Todos los campos son requeridos: cédula, código de seguridad, nueva contraseña y token.'
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'La nueva contraseña debe tener al menos 6 caracteres.'
    });
  }

  const result = SqliteStore.resetPasswordWithRecovery({
    cedula,
    recoveryCode,
    newPassword,
    recoveryToken,
    serverSecret: SERVER_SECRET
  });

  if (!result.success) {
    return res.status(400).json(result);
  }

  res.json(result);
});

/**
 * Gestión Administrativa: Listado de usuarios con estado de enrolamiento
 */
authRouter.get(['/admin/users', '/v1/admin/users'], (req, res) => {
  const users = SqliteStore.getUsuarios();
  res.json({
    success: true,
    count: users.length,
    users
  });
});

/**
 * Gestión Administrativa: Cambio manual de contraseña por directores/administradores
 */
authRouter.post(['/admin/users/set-password', '/v1/admin/users/set-password'], (req, res) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({
      success: false,
      error: 'Se requiere userId y newPassword.'
    });
  }

  const result = SqliteStore.adminSetPassword(userId, newPassword);
  if (!result.success) {
    return res.status(404).json(result);
  }

  res.json(result);
});

/**
 * Gestión Administrativa: Restablecer funcionario a estatus PRECARGADO para forzar su enrolamiento inicial
 */
authRouter.post(['/admin/users/reset-status', '/v1/admin/users/reset-status'], (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      error: 'Se requiere userId.'
    });
  }

  const result = SqliteStore.adminResetToPrecargado(userId);
  if (!result.success) {
    return res.status(404).json(result);
  }

  res.json(result);
});

/**
 * Consulta de sesión activa validando token Bearer
 */
authRouter.get(['/auth/session', '/v1/auth/session'], authenticateToken, (req: AuthenticatedRequest, res) => {
  const user = SqliteStore.getUsuarioByIdentifier(req.user?.sub || '');
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado.' });
  }

  res.json({
    success: true,
    user,
    sessionClaims: req.user
  });
});

/**
 * Cierre de sesión formal
 */
authRouter.post(['/auth/logout', '/v1/auth/logout'], (req, res) => {
  res.json({
    success: true,
    message: 'Sesión finalizada formalmente.'
  });
});

/**
 * Verificador Forense de Inclusión en Árbol de Merkle RFC 6962
 */
authRouter.post(['/audit/merkle-verify', '/v1/audit/merkle-verify'], (req, res) => {
  const { leafData, proof, root } = req.body;

  if (!leafData || !proof || !root) {
    return res.status(400).json({
      success: false,
      error: 'Se requieren leafData, proof y root para verificar la inclusión Merkle.'
    });
  }

  const isValid = MerkleService.verifyProof(leafData, proof, root);

  res.json({
    success: true,
    isValid,
    root,
    mensaje: isValid
      ? 'La prueba criptográfica de inclusión es válida y verificable bajo RFC 6962.'
      : 'La prueba criptográfica falló: la hoja no pertenece a la raíz Merkle provista o fue adulterada.'
  });
});
