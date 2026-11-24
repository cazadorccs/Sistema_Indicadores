import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  RotateCw, 
  Check, 
  X, 
  AlertCircle, 
  Sparkles,
  Smartphone
} from 'lucide-react';

interface PhotoCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoSelected: (dataUrl: string) => void;
  currentPhotoUrl?: string;
}

export const PhotoCaptureModal: React.FC<PhotoCaptureModalProps> = ({
  isOpen,
  onClose,
  onPhotoSelected,
  currentPhotoUrl
}) => {
  const [mode, setMode] = useState<'CHOICE' | 'LIVE_CAMERA' | 'PREVIEW'>('CHOICE');
  const [capturedImage, setCapturedImage] = useState<string | null>(currentPhotoUrl || null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mobileCameraInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Iniciar flujo de cámara WebRTC
  const startCamera = async (facing: 'user' | 'environment' = 'user') => {
    stopCamera();
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width: { ideal: 640 },
          height: { ideal: 640 }
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraActive(true);
      }
      setMode('LIVE_CAMERA');
    } catch (err: any) {
      console.warn('[Camera] No se pudo acceder a la cámara WebRTC:', err);
      setCameraError('No se pudo activar la cámara web directa. Puede usar el selector de cámara nativo o cargar una foto.');
      setMode('CHOICE');
    }
  };

  // Detener cámara
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Capturar fotograma actual del vídeo en canvas
  const handleCaptureSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const size = Math.min(video.videoWidth, video.videoHeight) || 400;

    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Recorte central cuadrado
    const startX = (video.videoWidth - size) / 2;
    const startY = (video.videoHeight - size) / 2;

    ctx.drawImage(video, startX, startY, size, size, 0, 0, 400, 400);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    stopCamera();
    setCapturedImage(dataUrl);
    setMode('PREVIEW');
  };

  // Procesar archivo cargado (desde galería o captura de móvil)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Redimensionar a cuadrado 400x400 para optimización
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const minDim = Math.min(img.width, img.height);
          const sx = (img.width - minDim) / 2;
          const sy = (img.height - minDim) / 2;
          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, 400, 400);
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setCapturedImage(optimizedDataUrl);
          setMode('PREVIEW');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleToggleFacingMode = () => {
    const nextFacing = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextFacing);
    startCamera(nextFacing);
  };

  const handleConfirmPhoto = () => {
    if (capturedImage) {
      onPhotoSelected(capturedImage);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-capture-title"
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
              <Camera className="w-4 h-4" />
            </div>
            <h3 id="photo-capture-title" className="text-sm font-bold text-white font-['Space_Grotesk']">
              Fotografía Oficial del Funcionario
            </h3>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hidden inputs */}
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange} 
        />
        <input 
          ref={mobileCameraInputRef}
          type="file" 
          accept="image/*" 
          capture="user"
          className="hidden" 
          onChange={handleFileChange} 
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {cameraError && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/70 rounded-xl text-xs text-rose-300 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Modo 1: Elección de método */}
          {mode === 'CHOICE' && (
            <div className="space-y-4 text-center">
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-slate-700 bg-slate-800/60 flex items-center justify-center overflow-hidden">
                {capturedImage ? (
                  <img src={capturedImage} alt="Foto actual" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-slate-500" />
                )}
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Seleccione el método de captura fotográfica para formalizar su perfil multi-dispositivo en el SGDO-VSCC.
              </p>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {/* Opción A: Cámara WebRTC en vivo */}
                <button
                  type="button"
                  onClick={() => startCamera('user')}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-md"
                >
                  <Camera className="w-4 h-4" />
                  <span>Tomar Foto con Cámara en Vivo</span>
                </button>

                {/* Opción B: Cámara nativa del dispositivo móvil (capture="user") */}
                <button
                  type="button"
                  onClick={() => mobileCameraInputRef.current?.click()}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>Dispositivo Móvil / Cámara Rápida</span>
                </button>

                {/* Opción C: Subir archivo / Galería */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>Cargar desde Galería o Archivo</span>
                </button>
              </div>
            </div>
          )}

          {/* Modo 2: Cámara Web en Vivo */}
          {mode === 'LIVE_CAMERA' && (
            <div className="space-y-4">
              <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden bg-black border border-slate-700 shadow-inner flex items-center justify-center">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover mirror"
                  style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
                />
                {/* Guía visual circular */}
                <div className="absolute inset-4 rounded-full border-2 border-white/40 pointer-events-none" />
              </div>

              <div className="flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={handleToggleFacingMode}
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                  title="Cambiar Cámara Frontal / Trasera"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCaptureSnapshot}
                  className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg flex items-center justify-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capturar Fotografía</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    stopCamera();
                    setMode('CHOICE');
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                  title="Cancelar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Modo 3: Previsualización de la foto */}
          {mode === 'PREVIEW' && capturedImage && (
            <div className="space-y-4 text-center">
              <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-blue-500/40 shadow-xl bg-slate-800">
                <img 
                  src={capturedImage} 
                  alt="Fotografía capturada" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div>
                <h4 className="text-xs font-bold text-white">¿Desea usar esta fotografía institucional?</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Se optimizará para su credencial y registro soberano.
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMode('CHOICE')}
                  className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-medium cursor-pointer"
                >
                  Repetir / Otra
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPhoto}
                  className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Aceptar y Usar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
