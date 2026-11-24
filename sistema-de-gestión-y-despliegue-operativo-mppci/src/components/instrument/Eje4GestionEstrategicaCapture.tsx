import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  MapPin, 
  BookOpen, 
  Cpu, 
  Award, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  Layers,
  Sparkles,
  Info,
  FileSpreadsheet
} from 'lucide-react';
import { 
  StrategicMIPCCIData, 
  MunicipalityData, 
  ControlVariables, 
  UserAccount,
  FullWeeklyReport,
  RACIRole
} from '../../types';
import { FormularioGestionViceministerios } from '../FormularioGestionViceministerios';

interface Eje4GestionEstrategicaCaptureProps {
  strategic: StrategicMIPCCIData;
  onChangeStrategic: (updated: StrategicMIPCCIData) => void;
  municipalities?: MunicipalityData[];
  control: ControlVariables;
  currentUser?: UserAccount | null;
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentRole?: RACIRole;
}

export const Eje4GestionEstrategicaCapture: React.FC<Eje4GestionEstrategicaCaptureProps> = ({
  strategic,
  onChangeStrategic,
  municipalities = [],
  control,
  currentUser,
  report,
  onSaveReport,
  currentRole
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'FORMULARIO_OFICIAL' | 'DESPLIEGUE_335' | 'VISTA_RAPIDA'>(
    'FORMULARIO_OFICIAL'
  );
  const [activeSubTab, setActiveSubTab] = useState<'TERRITORIAL' | 'SEO_TRAFICO' | 'SOBERANIA_FORMACION'>('TERRITORIAL');

  const handleNumericChange = (field: keyof StrategicMIPCCIData, value: string) => {
    const num = parseFloat(value) || 0;
    onChangeStrategic({
      ...strategic,
      [field]: num
    });
  };

  // Municipality stats
  const totalMun = municipalities.length || 335;
  const munOptimos = municipalities.filter(m => m.coberturaGeneralPorc >= 75).length;
  const munMedios = municipalities.filter(m => m.coberturaGeneralPorc >= 50 && m.coberturaGeneralPorc < 75).length;
  const munCriticos = municipalities.filter(m => m.coberturaGeneralPorc < 50).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Card for Eje 4 with Switcher */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                  EJE 4 • GESTIÓN DE VICEMINISTERIOS
                </span>
                <span className="text-xs text-slate-500 font-medium">DOCUMENTO OFICIAL MPPCI</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
                Instrumento de Captura de Indicadores de Viceministerios (MIPCCI)
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-slate-600">Municipios Evaluados:</span>
            <span className="font-bold text-slate-900 font-mono text-sm">{totalMun}</span>
            <span className="text-slate-400">|</span>
            <span className="font-bold text-emerald-700 font-mono text-xs">{munOptimos} óptimos</span>
          </div>
        </div>

        {/* Navigation Selector for Eje 4 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveMainTab('FORMULARIO_OFICIAL')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMainTab === 'FORMULARIO_OFICIAL'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Formulario Oficial Completo (4 Viceministerios)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('DESPLIEGUE_335')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMainTab === 'DESPLIEGUE_335'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Despliegue Territorial en 335 Municipios</span>
          </button>

          <button
            onClick={() => setActiveMainTab('VISTA_RAPIDA')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMainTab === 'VISTA_RAPIDA'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Vista Rápida Indicadores Resumen</span>
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeMainTab === 'FORMULARIO_OFICIAL' && (
        <FormularioGestionViceministerios
          report={report}
          onSaveReport={onSaveReport}
          currentUser={currentUser}
          currentRole={currentRole}
        />
      )}

      {activeMainTab === 'DESPLIEGUE_335' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                Balance de Cobertura en los 335 Municipios de la República
              </h3>
              <p className="text-xs text-slate-500">
                Monitoreo de penetración de radio, televisión y medios digitales por región geográfica.
              </p>
            </div>
            <span className="text-xs font-mono bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg">
              {munCriticos} municipios en alerta (&lt;50%)
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Estado / Región</th>
                  <th className="p-3">Municipio</th>
                  <th className="p-3 text-center">Radio & TV (%)</th>
                  <th className="p-3 text-center">Internet (%)</th>
                  <th className="p-3 text-center">Telefonía Móvil (%)</th>
                  <th className="p-3 text-center">Cobertura General</th>
                  <th className="p-3 text-center">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {municipalities.slice(0, 15).map(m => {
                  const statusColor = 
                    m.coberturaGeneralPorc >= 75 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : m.coberturaGeneralPorc >= 50 
                      ? 'bg-amber-100 text-amber-800 border-amber-300' 
                      : 'bg-rose-100 text-rose-800 border-rose-300';
                  
                  return (
                    <tr key={m.municipioId} className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-800">{m.estado}</td>
                      <td className="p-3 font-semibold text-slate-900">{m.municipio}</td>
                      <td className="p-3 text-center font-mono">{m.coberturaEfectivaRadioTV}%</td>
                      <td className="p-3 text-center font-mono">{m.penetracionInternet}%</td>
                      <td className="p-3 text-center font-mono">{m.penetracionTelefoniaMovil}%</td>
                      <td className="p-3 text-center font-mono font-bold text-slate-900">
                        {m.coberturaGeneralPorc}%
                      </td>
                      <td className="p-3 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusColor}`}>
                          {m.estatusAlerta}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeMainTab === 'VISTA_RAPIDA' && (
        <div className="space-y-6">
          <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveSubTab('TERRITORIAL')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'TERRITORIAL'
                  ? 'bg-white text-amber-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>4.A Indicadores de Despliegue</span>
            </button>

            <button
              onClick={() => setActiveSubTab('SEO_TRAFICO')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'SEO_TRAFICO'
                  ? 'bg-white text-amber-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>4.B Posicionamiento SEO & Tráfico Web</span>
            </button>

            <button
              onClick={() => setActiveSubTab('SOBERANIA_FORMACION')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'SOBERANIA_FORMACION'
                  ? 'bg-white text-amber-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>4.C Soberanía Tecnológica & Formación</span>
            </button>
          </div>

          {/* SUBTAB 4.A: TERRITORIAL */}
          {activeSubTab === 'TERRITORIAL' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                Parámetros de Acceso Digital y Cobertura Territorial
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="text-xs font-bold text-slate-800 block">Hogares con Acceso a Internet (THAI):</label>
                  <input
                    type="number"
                    value={strategic.hogaresInternetActivoTHAI}
                    onChange={(e) => handleNumericChange('hogaresInternetActivoTHAI', e.target.value)}
                    className="w-full mt-1.5 px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Universo: {strategic.universoHogaresNacional.toLocaleString()} hogares</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="text-xs font-bold text-slate-800 block">Líneas de Banda Ancha Móvil (TPBAM):</label>
                  <input
                    type="number"
                    value={strategic.lineasBandaAnchaMovilTPBAM}
                    onChange={(e) => handleNumericChange('lineasBandaAnchaMovilTPBAM', e.target.value)}
                    className="w-full mt-1.5 px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Población total estimada: {strategic.poblacionTotalEstimada.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 4.B: SEO */}
          {activeSubTab === 'SEO_TRAFICO' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                Métricas de Búsqueda y Tráfico Orgánico
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Tráfico Orgánico:</span>
                  <input
                    type="number"
                    value={strategic.traficoOrganicoTotal}
                    onChange={(e) => handleNumericChange('traficoOrganicoTotal', e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900 text-sm"
                  />
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Impresiones Buscadores:</span>
                  <input
                    type="number"
                    value={strategic.impresionesBuscadores}
                    onChange={(e) => handleNumericChange('impresionesBuscadores', e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900 text-sm"
                  />
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">CTR Orgánico (%):</span>
                  <input
                    type="number"
                    step="0.1"
                    value={strategic.ctrOrganico}
                    onChange={(e) => handleNumericChange('ctrOrganico', e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 4.C: SOBERANIA & FORMACION */}
          {activeSubTab === 'SOBERANIA_FORMACION' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                Capacitación y Formación Popular
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Trabajadores SNMP Capacitados:</span>
                  <input
                    type="number"
                    value={strategic.trabajadoresSNMPCapacitados}
                    onChange={(e) => handleNumericChange('trabajadoresSNMPCapacitados', e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900 text-sm"
                  />
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">PNI Formados:</span>
                  <input
                    type="number"
                    value={strategic.pniFormadosMarcoEtico}
                    onChange={(e) => handleNumericChange('pniFormadosMarcoEtico', e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900 text-sm"
                  />
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Voceros Comunales Formados:</span>
                  <input
                    type="number"
                    value={strategic.vocerosComunitariosCapacitados3_0}
                    onChange={(e) => handleNumericChange('vocerosComunitariosCapacitados3_0', e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900 text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
