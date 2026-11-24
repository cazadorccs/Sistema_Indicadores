import { Request, Response, NextFunction } from 'express';
import { TokenService, UserSessionPayload } from '../services/tokenService';

export interface AuthenticatedRequest extends Request {
  user?: UserSessionPayload;
}

/**
 * Middleware que verifica la validez del token de sesión Bearer
 */
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Acceso no autorizado: Token de sesión requerido.'
    });
  }

  const verification = TokenService.verifyToken(token);
  if (!verification.valid || !verification.payload) {
    return res.status(401).json({
      success: false,
      error: verification.error || 'Token de sesión inválido.'
    });
  }

  req.user = verification.payload;
  next();
}

/**
 * Middleware que exige uno o más roles de sistema o RACI autorizados
 */
export function requireRoles(...allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Usuario no autenticado.' });
    }

    const { rolSistema, raciRole } = req.user;

    // Super Admin siempre tiene acceso
    if (rolSistema === 'SUPER_ADMIN') {
      return next();
    }

    const hasRole = allowedRoles.includes(rolSistema) || allowedRoles.includes(raciRole);
    if (!hasRole) {
      return res.status(403).json({
        success: false,
        error: `Acceso denegado: El rol '${rolSistema} / ${raciRole}' no posee los privilegios requeridos (${allowedRoles.join(', ')}).`
      });
    }

    next();
  };
}

/**
 * Middleware que exige permiso específico sobre un módulo del sistema
 */
export function requireModulePermission(moduleCode: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Usuario no autenticado.' });
    }

    if (req.user.rolSistema === 'SUPER_ADMIN') {
      return next();
    }

    if (!req.user.permisosModulos || !req.user.permisosModulos.includes(moduleCode)) {
      return res.status(403).json({
        success: false,
        error: `Acceso denegado al módulo '${moduleCode}'.`
      });
    }

    next();
  };
}
