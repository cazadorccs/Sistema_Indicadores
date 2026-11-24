import React, { useState } from 'react';
import { 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  Mail, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

interface PasswordRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecoverySuccess: (cedula: string) => void;
}

export const PasswordRecoveryModal: React.FC<PasswordRecoveryModalProps> = ({
  isOpen,
  onClose,
  onRecoverySuccess
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  
  // Step 1: Verification fields
  const [cedula, setCedula] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  
  // Recovery Token & Code
  const [recoveryToken, setRecoveryToken] = useState<string | null>(null);
  const [recoveryCodeReceived, setRecoveryCodeReceived] = useState<string | null>(null);
  
  // Step 2: Reset fields
  const [inputCode, setInputCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Paso 1: Solicitar código de recuperación
  const handleRequestRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/auth/recovery/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cedula: cedula.trim(),
          emailOrPhone: emailOrPhone.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoading(false);
        setRecoveryToken(data.recoveryToken);
        setRecoveryCodeReceived(data.recoveryCode);
        setInputCode(data.recoveryCode || ''); // Auto-rellenar para comodidad operativa
        setStep(2);
      } else {
        setIsLoading(false);
        setErrorMsg(data.message || data.error || 'No se pudo verificar la identidad con los datos de nómina.');
      }
    } catch {
      setIsLoading(false);
      setErrorMsg('Error de conectividad al procesar la solicitud de recuperación.');
    }
  };

  // Paso 2: Reasignar contraseña con scrypt
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (newPassword.length < 6) {
      setErrorMsg('La nueva contraseña debe contener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden. Por favor verifíquelas.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/auth/recovery/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cedula: cedula.trim(),
          recoveryCode: inputCode.trim(),
          newPassword: newPassword.trim(),
          recoveryToken
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoading(false);
        setSuccessMsg('¡Contraseña institucional reasignada exitosamente! Ya puede iniciar sesión.');
        setTimeout(() => {
          onRecoverySuccess(cedula);
          onClose();
        }, 1500);
      } else {
        setIsLoading(false);
        setErrorMsg(data.message || data.error || 'Código incorrecto o token expirado.');
      }
    } catch {
      setIsLoading(false);
      setErrorMsg('Error de conectividad al reasignar la contraseña.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="recovery-modal-title"
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 id="recovery-modal-title" className="text-sm sm:text-base font-bold text-white font-['Space_Grotesk']">
                Autoservicio de Recuperación
              </h3>
              <p className="text-[11px] text-slate-400">
                Paso {step} de 2 • Sin soporte técnico requerido
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-xs text-rose-200 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-xs text-emerald-200 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* PASO 1: VERIFICACIÓN DE NÓMINA */}
          {step === 1 && (
            <form onSubmit={handleRequestRecovery} className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Ingrese su Cédula de Identidad y el correo o teléfono institucional registrado en su ficha de nómina para generar un token criptográfico temporal.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cédula de Identidad Oficial
                </label>
                <input
                  type="text"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="Ej: V-13537582"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Correo Institucional o Teléfono Registrado
                </label>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Ej: sfranco@mppci.gob.ve o 04128920194"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-mono"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Verificar Identidad y Emitir Código</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* PASO 2: CÓDIGO OTP Y NUEVA CONTRASEÑA */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {recoveryCodeReceived && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs space-y-1">
                  <div className="text-amber-300 font-bold flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Código de Recuperación Generado:</span>
                  </div>
                  <div className="text-2xl font-mono font-extrabold tracking-widest text-amber-200 text-center py-1">
                    {recoveryCodeReceived}
                  </div>
                  <p className="text-[10px] text-slate-400 text-center">
                    Token criptográfico HMAC-SHA256 emitido con vigencia de 15 minutos.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Código de Seguridad de 6 Dígitos
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-center text-lg font-mono font-bold text-white tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nueva Contraseña Institucional
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres..."
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Reingrese la nueva contraseña..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 font-mono"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Volver al paso 1
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="py-2.5 px-5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all shadow-md flex items-center space-x-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Actualizar Contraseña con scrypt</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
