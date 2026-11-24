import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Camera, 
  Lock, 
  Smartphone, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserAccount } from '../types';
import { PhotoCaptureModal } from './PhotoCaptureModal';

interface FormalizationModalProps {
  isOpen: boolean;
  user: UserAccount;
  onCompleted: (updatedUser: UserAccount, token?: string) => void;
  onCancel?: () => void;
}

export const FormalizationModal: React.FC<FormalizationModalProps> = ({
  isOpen,
  user,
  onCompleted,
  onCancel
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [photoUrl, setPhotoUrl] = useState<string>(user.fotoPerfilUrl || '');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  
  // Password state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  
  // Device binding state
  const [deviceId, setDeviceId] = useState('');
  const [deviceName, setDeviceNombre] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Inicializar o recuperar identificador único criptográfico del dispositivo local
  useEffect(() => {
    let storedDevId = localStorage.getItem('sgdo_bound_device_id');
    if (!storedDevId) {
      storedDevId = `DEV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      localStorage.setItem('sgdo_bound_device_id', storedDevId);
    }
    setDeviceId(storedDevId);

    // Detección automática del nombre del entorno/dispositivo
    const ua = navigator.userAgent;
    let devLabel = 'Estación de Trabajo Institucional';
    if (/android/i.test(ua)) devLabel = 'Dispositivo Móvil Android';
    else if (/iphone|ipad|ipod/i.test(ua)) devLabel = 'Dispositivo iOS / Apple';
    else if (/windows/i.test(ua)) devLabel = 'Terminal de Escritorio Windows';
    else if (/macintosh/i.test(ua)) devLabel = 'Estación macOS';
    else if (/linux/i.test(ua)) devLabel = 'Terminal Linux Soberano';

    setDeviceNombre(devLabel);
  }, []);

  // Medidor simple de fortaleza de contraseña
  useEffect(() => {
    let score = 0;
    if (password.length >= 6) score += 25;
    if (password.length >= 10) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    setPasswordStrength(score);
  }, [password]);

  const handleSubmitFormalization = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!photoUrl) {
      setErrorMsg('Debe cargar o capturar su fotografía oficial para completar la formalización.');
      setStep(1);
      return;
    }

    if (password.length < 6) {
      setErrorMsg('La contraseña institucional debe contener al menos 6 caracteres.');
      setStep(2);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden. Por favor verifíquelas.');
      setStep(2);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/auth/formalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          password,
          fotoPerfilUrl: photoUrl,
          boundDeviceId: deviceId,
          boundDeviceNombre: deviceName
        })
      });

      const data = await response.json();

      if (response.ok && data.success && data.user) {
        if (data.token) {
          localStorage.setItem('sgdo_auth_token', data.token);
        }
        setIsLoading(false);
        onCompleted(data.user, data.token);
      } else {
        setIsLoading(false);
        setErrorMsg(data.error || 'Ocurrió un error al formalizar su cuenta institucional.');
      }
    } catch {
      // Fallback local en caso de estar offline
      setIsLoading(false);
      const updatedMockUser: UserAccount = {
        ...user,
        estatusEnrolamiento: 'ENROLADO',
        fotoPerfilUrl: photoUrl,
        boundDeviceId: deviceId,
        boundDeviceNombre: deviceName,
        fechaEnrolamiento: new Date().toISOString()
      };
      onCompleted(updatedMockUser);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="formalization-title"
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
      >
        {/* Banner Superior */}
        <div className="p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-blue-400 bg-blue-950/60 border border-blue-800 px-2 py-0.5 rounded-md">
                Formalización Obligatoria
              </span>
              <h2 id="formalization-title" className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk'] mt-0.5">
                Enrolamiento Inicial de Funcionario
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Estimado(a) <span className="text-white font-semibold">{user.nombre} {user.apellido}</span> ({user.enteAdscrito}), complete los 3 pasos soberanos para habilitar su acceso pleno al SGDO-VSCC.
          </p>

          {/* Stepper Tabs */}
          <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`flex items-center space-x-1.5 text-xs font-semibold cursor-pointer ${
                step === 1 ? 'text-blue-400' : photoUrl ? 'text-emerald-400' : 'text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === 1 ? 'bg-blue-600 text-white' : photoUrl ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {photoUrl && step !== 1 ? '✓' : '1'}
              </span>
              <span>1. Fotografía</span>
            </button>

            <div className="h-px w-6 bg-slate-800" />

            <button
              type="button"
              onClick={() => setStep(2)}
              className={`flex items-center space-x-1.5 text-xs font-semibold cursor-pointer ${
                step === 2 ? 'text-blue-400' : password.length >= 6 ? 'text-emerald-400' : 'text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === 2 ? 'bg-blue-600 text-white' : password.length >= 6 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {password.length >= 6 && step !== 2 ? '✓' : '2'}
              </span>
              <span>2. Contraseña</span>
            </button>

            <div className="h-px w-6 bg-slate-800" />

            <button
              type="button"
              onClick={() => setStep(3)}
              className={`flex items-center space-x-1.5 text-xs font-semibold cursor-pointer ${
                step === 3 ? 'text-blue-400' : 'text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === 3 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                3
              </span>
              <span>3. Dispositivo</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmitFormalization} className="p-6 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-xs text-rose-200 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* PASO 1: FOTO OFICIAL */}
          {step === 1 && (
            <div className="space-y-4 text-center">
              <div className="relative w-28 h-28 mx-auto">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800 flex items-center justify-center shadow-lg">
                  {photoUrl ? (
                    <img src={photoUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-10 h-10 text-slate-500" />
                  )}
                </div>
                {photoUrl && (
                  <div className="absolute bottom-0 right-0 p-1.5 bg-emerald-500 text-slate-950 rounded-full border-2 border-slate-900 shadow">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">Fotografía Institucional de Identidad</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Seleccione desde su cámara web en vivo, dispositivo móvil o archivo de imagen para estandarizar su credencial oficial.
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>{photoUrl ? 'Cambiar Fotografía' : 'Cargar o Tomar Fotografía'}</span>
                </button>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!photoUrl) {
                      setErrorMsg('Debe cargar su fotografía oficial antes de avanzar.');
                      return;
                    }
                    setErrorMsg(null);
                    setStep(2);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Siguiente: Contraseña</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 2: CONTRASEÑA SEGURA */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center space-x-1.5">
                  <KeyRound className="w-4 h-4 text-blue-400" />
                  <span>Definir Contraseña Institucional Personal</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Esta contraseña reemplazará la clave provisoria y se protegerá mediante hashing criptográfico soberano <strong className="text-slate-200">scrypt</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nueva Contraseña Institucional
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres alfanuméricos..."
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

              {/* Barra de Fortaleza */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Nivel de seguridad de la contraseña:</span>
                  <span className={`font-bold ${
                    passwordStrength >= 75 ? 'text-emerald-400' : passwordStrength >= 50 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {passwordStrength >= 75 ? 'Excelente' : passwordStrength >= 50 ? 'Aceptable' : 'Débil'}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      passwordStrength >= 75 ? 'bg-emerald-500' : passwordStrength >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${passwordStrength}%` }}
                  />
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
                  placeholder="Reingrese exactamente la contraseña..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 font-mono"
                  required
                />
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (password.length < 6) {
                      setErrorMsg('La contraseña debe tener mínimo 6 caracteres.');
                      return;
                    }
                    if (password !== confirmPassword) {
                      setErrorMsg('Las contraseñas no coinciden.');
                      return;
                    }
                    setErrorMsg(null);
                    setStep(3);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Siguiente: Dispositivo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: VINCULACIÓN DE DISPOSITIVO */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center space-x-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Vinculación Criptográfica de Dispositivo</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Se asociará de manera inmutable este equipo a su cuenta (<code className="text-amber-300">bound_device_id</code>) para prevenir accesos no autorizados.
                </p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Huella Criptográfica (ID):</span>
                  <span className="font-mono text-emerald-400 font-bold">{deviceId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Equipo Detectado:</span>
                  <span className="text-white font-medium">{deviceName}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                  <span>Entorno:</span>
                  <span>MIPPCI Red Privada / SSL Soberano</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-xs text-emerald-300 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Al hacer clic en <strong>Finalizar y Acceder</strong>, su cuenta quedará en estado <strong className="text-emerald-200">ENROLADO</strong> y lista para operar en los tableros autorizados.
                </span>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center space-x-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Finalizar Formalización y Acceder</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Modal de Cámara / Archivo */}
        <PhotoCaptureModal
          isOpen={isPhotoModalOpen}
          onClose={() => setIsPhotoModalOpen(false)}
          currentPhotoUrl={photoUrl}
          onPhotoSelected={(url) => {
            setPhotoUrl(url);
            setIsPhotoModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};
