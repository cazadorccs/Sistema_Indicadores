import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  Hash, 
  Lock, 
  UserCheck, 
  Download, 
  Clock, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Filter,
  FileSpreadsheet
} from 'lucide-react';
import { AuditLogEntry, FullWeeklyReport, RACIRole } from '../types';

interface AuditRaciTrackerProps {
  auditLogs: AuditLogEntry[];
  currentReport: FullWeeklyReport;
  currentRole: RACIRole;
  onSignOffReport: (role: RACIRole, comments: string) => void;
}

export const AuditRaciTracker: React.FC<AuditRaciTrackerProps> = ({
  auditLogs,
  currentReport,
  currentRole,
  onSignOffReport
}) => {
  const [activeTab, setActiveTab] = useState<'LOGS' | 'RACI_MATRIX' | 'SIGN_OFF'>('LOGS');
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState('');
  const [signedSuccess, setSignedSuccess] = useState(false);

  const filteredLogs = auditLogs.filter(log => {
    const term = searchTerm.toLowerCase();
    const accion = log.accion ? log.accion.toLowerCase() : '';
    const usuario = log.usuario ? log.usuario.toLowerCase() : '';
    const detalles = (log.detalles || log.descripcion || '').toLowerCase();
    const modulo = (log.modulo || log.indicadorCodigo || '').toLowerCase();
    return accion.includes(term) || usuario.includes(term) || detalles.includes(term) || modulo.includes(term);
  });

  const handleSign = () => {
    onSignOffReport(currentRole, comments);
    setSignedSuccess(true);
    setTimeout(() => setSignedSuccess(false), 4000);
  };

  const raciIndicators = [
    { codigo: 'IMP-001/017', nombre: 'Medios Impresos', r: 'Director Editorial Correo del Orinoco', a: 'Viceministro de Medios', c: 'Auditoría Interna MPPCI', i: 'Ministro / Sala Situacional' },
    { codigo: 'RAD-001/018', nombre: 'Radiodifusión RNV/YVKE', r: 'Director General RNV', a: 'Viceministro de Medios', c: 'Auditoría Técnica', i: 'Ministro / Sala Situacional' },
    { codigo: 'TV-001/019', nombre: 'Televisión VTV/TVES', r: 'Vicepresidente de Operaciones VTV', a: 'Viceministro de Medios', c: 'Auditoría Contralora', i: 'Ministro / Sala Situacional' },
    { codigo: 'WEB/RED', nombre: 'Ecosistema Digital', r: 'Director de Medios Digitales MIPCCI', a: 'Viceministro de Planificación', c: 'Comité de Ciberseguridad', i: 'Ministro' },
    { codigo: 'RTV-001/015', nombre: 'Plataformas REDTV/TDA', r: 'Presidente de REDTV', a: 'Viceministro de Telecomunicaciones', c: 'Gerencia de Telecomunicaciones', i: 'Ministro / CONATEL' },
    { codigo: 'CON-001/025', nombre: 'Regulación CONATEL', r: 'Director General de CONATEL', a: 'Ministro MPPCI', c: 'Consultoría Jurídica', i: 'Presidente de la República' },
    { codigo: 'MON-001/008', nombre: 'Monitoreo & Matrices', r: 'Director General de Monitoreo', a: 'Viceministro de Estrategia', c: 'Sala Situacional', i: 'Ministro / Vocerías' },
    { codigo: 'IVI (Talento)', nombre: 'Vulnerabilidad RRHH', r: 'Director de Gestión Humana', a: 'Viceministro de Gestión', c: 'Salud Laboral / INPSASEL', i: 'Ministro' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-mono">
              GOBERNANZA & CONTRALORÍA
            </span>
            <span className="text-xs text-slate-400">Trazabilidad Criptográfica Inmutable</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1 font-['Space_Grotesk']">
            Sistema de Auditoría & Matriz RACI
          </h1>
          <p className="text-xs text-slate-300">
            Registro secuencial con hashes SHA-256, roles RACI definidos y libro de actas de aprobación ministerial.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => alert('Exportando registro de auditoría completo en formato CSV/JSON firmado...')}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Bitácora</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        {[
          { id: 'LOGS', label: 'Bitácora de Auditoría (Trazabilidad)', icon: FileCheck2 },
          { id: 'RACI_MATRIX', label: 'Matriz RACI por Indicador', icon: UserCheck },
          { id: 'SIGN_OFF', label: 'Firma y Refrendo Ministerial', icon: ShieldCheck },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: AUDIT LOGS */}
      {activeTab === 'LOGS' && (
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por usuario, acción, módulo o hash..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500 w-72"
              />
            </div>
            <span className="text-xs text-slate-400 font-mono">{filteredLogs.length} Registros Inmutables</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="p-3">Timestamp / Hash</th>
                  <th className="p-3">Usuario & Rol</th>
                  <th className="p-3">Acción Ejecutada</th>
                  <th className="p-3">Módulo</th>
                  <th className="p-3">Detalles</th>
                  <th className="p-3">IP / Origen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="p-3 space-y-0.5">
                      <div className="font-mono text-slate-300">{log.timestamp}</div>
                      <div className="font-mono text-[9px] text-amber-400/80 truncate max-w-[140px]" title={log.hash || log.hashTrazabilidad}>
                        {log.hash || log.hashTrazabilidad}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-white">{log.usuario}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{log.rol}</div>
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono font-medium">
                        {log.accion}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-slate-300">{log.modulo || log.indicadorCodigo || 'CONSOLIDADO'}</td>
                    <td className="p-3 text-slate-400 max-w-xs truncate" title={log.detalles || log.descripcion}>{log.detalles || log.descripcion}</td>
                    <td className="p-3 font-mono text-[10px] text-slate-500">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: RACI MATRIX */}
      {activeTab === 'RACI_MATRIX' && (
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
              Matriz de Asignación de Responsabilidades (RACI) por Indicador
            </h3>
            <p className="text-xs text-slate-400">
              <b>R:</b> Responsable de Captura | <b>A:</b> Aprobador (Accountable) | <b>C:</b> Consultado / Auditor | <b>I:</b> Informado (Máxima Autoridad)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="p-3">Código</th>
                  <th className="p-3">Componente / Eje</th>
                  <th className="p-3 text-blue-400">R (Responsable)</th>
                  <th className="p-3 text-emerald-400">A (Aprobador)</th>
                  <th className="p-3 text-purple-400">C (Consultado)</th>
                  <th className="p-3 text-amber-400">I (Informado)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {raciIndicators.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-amber-400">{row.codigo}</td>
                    <td className="p-3 font-bold text-white">{row.nombre}</td>
                    <td className="p-3 text-slate-300">{row.r}</td>
                    <td className="p-3 text-emerald-300 font-semibold">{row.a}</td>
                    <td className="p-3 text-purple-300">{row.c}</td>
                    <td className="p-3 text-amber-300">{row.i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SIGN OFF */}
      {activeTab === 'SIGN_OFF' && (
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-5 shadow-xl max-w-2xl mx-auto">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                Firma Digital y Refrendo Ministerial
              </h3>
              <p className="text-xs text-slate-400">Cierre de ciclo semanal y generación de hash criptográfico</p>
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Reporte Semanal Activo:</span>
              <span className="font-bold text-white">Semana N° {currentReport.control.semanaEpidemiologica} / 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">KPI Maestro (IEC):</span>
              <span className="font-bold text-amber-400 font-mono">{currentReport.kpisCalculados.iec}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Hash de Integridad Actual:</span>
              <span className="font-mono text-[10px] text-slate-300">{currentReport.hashIntegridad}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Perfil Firmante:</span>
              <span className="font-bold text-blue-400">{currentRole}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Observaciones y Dictamen Ministerial (Opcional):
            </label>
            <textarea
              rows={3}
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="Ingrese consideraciones técnicas o directrices estratégicas de despliegue..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {signedSuccess && (
            <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>¡Refrendo ministerial registrado exitosamente en el libro de actas!</span>
            </div>
          )}

          <button
            onClick={handleSign}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Firmar Digitalmente y Aprobar Reporte Semanal</span>
          </button>
        </div>
      )}
    </div>
  );
};
