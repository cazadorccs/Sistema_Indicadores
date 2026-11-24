import React, { useState } from 'react';
import { 
  AlertTriangle, 
  RotateCcw, 
  Trash2, 
  X, 
  CheckCircle2, 
  Sparkles, 
  DatabaseZap, 
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { FullWeeklyReport } from '../types';

interface ResetDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmResetToZero: () => void;
  onRestoreDemoData: () => void;
  currentReport: FullWeeklyReport;
}

export const ResetDataModal: React.FC<ResetDataModalProps> = ({
  isOpen,
  onClose,
  onConfirmResetToZero,
  onRestoreDemoData,
  currentReport
}) => {
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 px-6 py-4.5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
              <DatabaseZap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold font-['Space_Grotesk'] leading-tight">
                Puesta a Cero de Indicadores Operativos
              </h2>
              <p className="text-[11px] text-rose-200">
                Preparación del sistema para despliegue y captura en producción
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-rose-200 hover:text-white hover:bg-rose-800/50 transition-colors cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs text-slate-600">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start space-x-3 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-amber-950 text-xs">
                ¿Desea restablecer todos los datos cargados a cero (0)?
              </p>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Actualmente el Dashboard muestra cifras y mediciones de <strong>ejemplo / simulación</strong>. 
                Al activar esta opción, todos los valores cuantitativos de medios impresos, radiales, televisivos, digitales, redes y plataformas técnicas se establecerán en <strong>cero (0)</strong> para dar inicio a la carga oficial real.
              </p>
            </div>
          </div>

          {/* Module summary pill list */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Alcance del Restablecimiento:</span>
              <span className="text-rose-600 font-mono text-[10px]">Valores a Cero</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-600">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span><strong>Eje 1 Medios Públicos:</strong> Impresos (IMP), Radios (RAD), TV (TV), Digitales (WEB), Redes (RED).</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span><strong>Eje 2 Plataformas Técnicas:</strong> REDTV (RTV) y CONATEL (CON).</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span><strong>Eje 4 Gestión Estratégica:</strong> Viceministerios, SEO y Cobertura.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span><strong>Variables de Control:</strong> Se preservan los datos de Ente ({currentReport.control.enteAdscrito}), Responsable y Semana {currentReport.control.semanaEpidemiologica}.</span>
              </li>
            </ul>
          </div>

          {/* Security confirmation checkbox */}
          <label className="flex items-center space-x-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={confirmCheckbox}
              onChange={(e) => setConfirmCheckbox(e.target.checked)}
              className="w-4 h-4 rounded text-rose-600 border-slate-300 focus:ring-rose-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-700 font-medium">
              Confirmo que deseo vaciar todos los datos de ejemplo e iniciar una planilla limpia.
            </span>
          </label>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => {
              onRestoreDemoData();
              onClose();
            }}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200 border border-slate-300 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            title="Restaurar datos de ejemplo precargados"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Restaurar Datos de Demostración</span>
          </button>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={!confirmCheckbox}
              onClick={() => {
                onConfirmResetToZero();
                onClose();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs ${
                confirmCheckbox
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Llevar a Cero (0)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
