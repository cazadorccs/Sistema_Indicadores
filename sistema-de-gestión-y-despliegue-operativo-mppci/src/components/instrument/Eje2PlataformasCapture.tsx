import React, { useState } from 'react';
import { 
  Radio, 
  Satellite, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  Building2, 
  Gauge, 
  FileText,
  Save,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';
import { PlatformsTechnicalData, CriticalTowerStatus, ControlVariables, UserAccount, FullWeeklyReport, RACIRole } from '../../types';
import { FormularioRedTV } from '../FormularioRedTV';
import { FormularioConatel } from '../FormularioConatel';

interface Eje2PlataformasCaptureProps {
  plataformas: PlatformsTechnicalData;
  onChangePlataformas: (updated: PlatformsTechnicalData) => void;
  criticalTowers?: CriticalTowerStatus[];
  control: ControlVariables;
  currentUser?: UserAccount | null;
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentRole?: RACIRole;
}

export const Eje2PlataformasCapture: React.FC<Eje2PlataformasCaptureProps> = ({
  plataformas,
  onChangePlataformas,
  criticalTowers = [],
  control,
  currentUser,
  report,
  onSaveReport,
  currentRole
}) => {
  const isRedtvUser = currentUser?.enteAdscrito === 'REDTV';
  const isConatelUser = currentUser?.enteAdscrito === 'CONATEL';

  const [activeSection, setActiveSection] = useState<'REDTV' | 'CONATEL'>(
    isConatelUser ? 'CONATEL' : 'REDTV'
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Navigation Header Card for EJE 2 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  EJE 2 • PLATAFORMAS DE COMUNICACIONES
                </span>
                <span className="text-xs text-slate-500 font-medium">DOCUMENTO OFICIAL MPPCI</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
                Formularios Oficiales de Captura & Telemetría
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Seleccione el formulario correspondiente:</span>
          </div>
        </div>

        {/* Section Tabs (2.A REDTV vs 2.B CONATEL) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setActiveSection('REDTV')}
            className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeSection === 'REDTV'
                ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${activeSection === 'REDTV' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Satellite className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-900">2.A REDTV</span>
                  {isRedtvUser && (
                    <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono font-bold">
                      Su Ente
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  TDA, Banda Ku, 7 Torres Críticas, 24 Entidades Federales y Señales
                </p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${activeSection === 'REDTV' ? 'bg-blue-600 ring-4 ring-blue-100' : 'border-2 border-slate-300'}`} />
          </button>

          <button
            onClick={() => setActiveSection('CONATEL')}
            className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeSection === 'CONATEL'
                ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${activeSection === 'CONATEL' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-900">2.B CONATEL</span>
                  {isConatelUser && (
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono font-bold">
                      Su Ente
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Regulación, Espectro, Ley Resorte, SIGESTEL e Incidentes
                </p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${activeSection === 'CONATEL' ? 'bg-amber-600 ring-4 ring-amber-100' : 'border-2 border-slate-300'}`} />
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE FORM */}
      {activeSection === 'REDTV' ? (
        <FormularioRedTV
          report={report}
          onSaveReport={onSaveReport}
          currentUser={currentUser}
          currentRole={currentRole}
        />
      ) : (
        <FormularioConatel
          report={report}
          onSaveReport={onSaveReport}
          currentUser={currentUser}
          currentRole={currentRole}
        />
      )}
    </div>
  );
};
