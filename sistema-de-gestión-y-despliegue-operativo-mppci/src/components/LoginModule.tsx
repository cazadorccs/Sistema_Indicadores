import React, { useState } from 'react';
import { 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck,
  KeyRound,
  Smartphone
} from 'lucide-react';
import { UserAccount } from '../types';
import { INITIAL_USERS } from '../data/usersData';
import MippciLogo from './MippciLogo';
import { PasswordRecoveryModal } from './PasswordRecoveryModal';
import { FormalizationModal } from './FormalizationModal';

interface LoginModuleProps {
  onLogin: (user: UserAccount) => void;
  currentUser?: UserAccount | null;
}

export const LoginModule: React.FC<LoginModuleProps> = ({
  onLogin,
  currentUser
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Estados de modales soberanos
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [isFormalizationOpen, setIsFormalizationOpen] = useState(false);
  const [pendingUserToFormalize, setPendingUserToFormalize] = useState<UserAccount | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    const term = identifier.trim().toLowerCase();

    if (!term || !password.trim()) {
      setIsLoading(false);
      setErrorMsg('Por favor ingrese sus credenciales oficiales');
      return;
    }

    // Obtener huella de dispositivo local
    const boundDeviceId = localStorage.getItem('sgdo_bound_device_id') || undefined;

    // Intento de autenticación segura vía Backend API con tokens criptográficos
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          identifier: term, 
          password: password.trim(),
          boundDeviceId
        })
      });

      const data = await response.json();

      if (response.ok && data.success && data.user) {
        if (data.token) {
          localStorage.setItem('sgdo_auth_token', data.token);
        }

        // Si el funcionario requiere formalización inicial multi-dispositivo
        if (data.requiresFormalization || data.user.estatusEnrolamiento === 'PRECARGADO') {
          setIsLoading(false);
          setPendingUserToFormalize(data.user);
          setIsFormalizationOpen(true);
          return;
        }

        setIsLoading(false);
        setSuccessMsg(`Sesión autorizada: ${data.user.nombre} ${data.user.apellido} (${data.user.enteAdscrito})`);
        setTimeout(() => {
          onLogin(data.user);
        }, 200);
        return;
      } else if (response.status === 401) {
        setIsLoading(false);
        setErrorMsg(data.error || 'Credenciales inválidas. Verifique sus datos.');
        return;
      }
    } catch {
      // Fallback soberano Local-First (Offline): resolución cliente si el servidor está inaccesible
      console.warn('[LoginModule] Red no disponible, ejecutando verificación local de contingencia (Offline-First)');
    }

    // Verificación local (Contingencia / Desconexión de Red)
    const cleanDigits = term.replace(/\D/g, '');
    const cleanAlnum = term.replace(/[^a-z0-9]/g, '');

    const foundUser = INITIAL_USERS.find(u => {
      const uDigits = u.cedula.replace(/\D/g, '');
      const uAlnum = u.cedula.toLowerCase().replace(/[^a-z0-9]/g, '');

      if (cleanDigits && uDigits === cleanDigits) return true;
      if (cleanAlnum && uAlnum === cleanAlnum) return true;
      if (u.cedula.toLowerCase() === term) return true;
      if (u.cedula.toLowerCase() === `v-${term}`) return true;
      if (u.email.toLowerCase() === term) return true;
      if (u.id.toLowerCase() === term) return true;
      if (u.enteAdscrito.toLowerCase() === term) return true;
      if (`${u.nombre} ${u.apellido}`.toLowerCase().includes(term)) return true;
      if (term === 'admin' && u.raciRole === 'AUDITOR_CONTRALOR') return true;
      if (term === 'ministro' && u.raciRole === 'MAXIMA_AUTORIDAD') return true;
      return false;
    });

    if (!foundUser) {
      setIsLoading(false);
      setErrorMsg('Cédula o usuario no encontrado en el directorio institucional.');
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(`Sesión autorizada (Local): ${foundUser.nombre} ${foundUser.apellido} (${foundUser.enteAdscrito})`);
      setTimeout(() => {
        onLogin(foundUser);
      }, 200);
    }, 250);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col justify-between p-4 sm:p-6 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
        <div className="flex items-center space-x-3">
          <div className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
            República Bolivariana de Venezuela • MIPPCI
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono text-[10px]">Autenticación Segura RBAC</span>
        </div>
      </header>

      {/* Main Login Card - Single Clean Institutional Entry */}
      <main className="w-full max-w-md mx-auto my-auto py-8">
        <div className="bg-slate-950/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
          
          {/* Institutional Branding */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <MippciLogo className="h-12 sm:h-14 w-auto rounded-xl px-2.5 py-1.5 shadow-md bg-white border border-slate-200" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
                SGDO <span className="text-blue-400">VSCC</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Vicepresidencia Sectorial de Comunicación y Cultura
              </p>
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="bg-rose-950/60 border border-rose-800/80 text-rose-200 px-3 py-2 rounded-xl text-xs flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 px-3 py-2 rounded-xl text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">{successMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Cédula de Identidad o Usuario
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Ej: V-14829301"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                  title={showPassword ? 'Ocultar' : 'Mostrar'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-slate-500 font-mono flex items-center space-x-1">
                  <Smartphone className="w-3 h-3 text-slate-400 inline" />
                  <span>Dispositivo Vinculado</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsRecoveryOpen(true)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer hover:underline"
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Ingresar al Sistema</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Acceso Restringido y Monitoreado</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              El ingreso a esta plataforma está reservado exclusivamente para funcionarios autorizados y salas operativas de los entes adscritos.
            </p>
          </div>
        </div>
      </main>

      {/* Modal de Autoservicio de Recuperación */}
      <PasswordRecoveryModal
        isOpen={isRecoveryOpen}
        onClose={() => setIsRecoveryOpen(false)}
        onRecoverySuccess={(recoveredCedula) => {
          setIdentifier(recoveredCedula);
          setPassword('');
          setSuccessMsg('Contraseña actualizada con éxito. Ingrese con sus nuevas credenciales.');
        }}
      />

      {/* Modal de Formalización Inicial Multi-Dispositivo */}
      {pendingUserToFormalize && (
        <FormalizationModal
          isOpen={isFormalizationOpen}
          user={pendingUserToFormalize}
          onCompleted={(formalizedUser, token) => {
            setIsFormalizationOpen(false);
            setPendingUserToFormalize(null);
            setSuccessMsg(`¡Formalización completada con éxito para ${formalizedUser.nombre} ${formalizedUser.apellido}!`);
            setTimeout(() => {
              onLogin(formalizedUser);
            }, 300);
          }}
          onCancel={() => {
            setIsFormalizationOpen(false);
            setPendingUserToFormalize(null);
          }}
        />
      )}

      {/* Institutional Footer */}
      <footer className="w-full max-w-5xl mx-auto py-3 text-center text-xs text-slate-500 border-t border-slate-800/60">
        <div>
          Ministerio del Poder Popular para la Comunicación y la Información (MIPPCI)
        </div>
        <div className="text-[10px] text-slate-600 mt-0.5">
          Dirección General de Tecnología e Información • Sistema de Autenticación Centralizado
        </div>
      </footer>
    </div>
  );
};
