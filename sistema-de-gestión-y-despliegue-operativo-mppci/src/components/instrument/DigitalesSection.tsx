import React from 'react';
import { Globe, MousePointerClick, Users, FileCheck, Layers, Activity } from 'lucide-react';
import { DigitalRowPortales, DigitalRowTematico, DigitalRowSuscripciones, DigitalRowTramites } from '../../types';

interface DigitalesSectionProps {
  portales: DigitalRowPortales[];
  contenidoTematico: DigitalRowTematico[];
  suscripciones: DigitalRowSuscripciones[];
  tramitesServicios: DigitalRowTramites[];
  onChangePortales: (index: number, field: keyof DigitalRowPortales, value: any) => void;
  onChangeContenidoTematico: (index: number, field: keyof DigitalRowTematico, value: any) => void;
  onChangeSuscripciones: (index: number, field: keyof DigitalRowSuscripciones, value: any) => void;
  onChangeTramitesServicios: (index: number, field: keyof DigitalRowTramites, value: any) => void;
  readOnly?: boolean;
}

export const DigitalesSection: React.FC<DigitalesSectionProps> = ({
  portales,
  contenidoTematico,
  suscripciones,
  tramitesServicios,
  onChangePortales,
  onChangeContenidoTematico,
  onChangeSuscripciones,
  onChangeTramitesServicios,
  readOnly = false
}) => {
  const totalArticulos = contenidoTematico.reduce((acc, curr) => acc + (curr.articulosPublicados || 0), 0);
  const totalVisitas = contenidoTematico.reduce((acc, curr) => acc + (curr.visitasGeneradas || 0), 0);
  const promedioTiempoMin = contenidoTematico.length > 0 
    ? (contenidoTematico.reduce((acc, curr) => acc + (curr.tiempoPromedioMin || 0), 0) / contenidoTematico.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-600/20 text-teal-400 rounded-lg border border-teal-500/30">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-semibold">
              EJE 1: MEDIOS DE COMUNICACIÓN E INFORMACIÓN
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              1.D MEDIOS DIGITALES
            </h2>
          </div>
        </div>
        <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono">
          Códigos WEB-001 al WEB-018
        </span>
      </div>

      {/* Table 1: Plataformas Web y Portales */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" />
            Plataformas Web y Portales
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos WEB-001 al WEB-007</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-28">Frecuencia</th>
                <th className="py-2.5 px-3 w-32 text-right">Meta Semanal</th>
                <th className="py-2.5 px-3 w-32 text-right">Logrado</th>
                <th className="py-2.5 px-3 w-36 text-right">Var % vs Sem Anterior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {portales.map((row, idx) => (
                <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-teal-700 bg-teal-50/50">{row.codigo}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.frecuencia}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      step="0.1"
                      value={row.metaSemanal}
                      onChange={(e) => onChangePortales(idx, 'metaSemanal', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold focus:bg-white focus:ring-1 focus:ring-teal-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      step="0.1"
                      value={row.logrado}
                      onChange={(e) => onChangePortales(idx, 'logrado', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-teal-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <input
                        type="number"
                        step="0.1"
                        value={row.varSemanaAnterior}
                        onChange={(e) => onChangePortales(idx, 'varSemanaAnterior', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        className={`w-20 px-2 py-1 text-right border rounded text-xs font-mono font-bold ${
                          row.varSemanaAnterior >= 0 
                            ? 'text-emerald-700 bg-emerald-50/50 border-emerald-200' 
                            : 'text-rose-700 bg-rose-50/50 border-rose-200'
                        }`}
                      />
                      <span className="text-[11px] font-bold text-slate-500">%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Contenido Web por Temática */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            Contenido Web por Temática
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">7 Categorías Oficiales</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Categoría</th>
                <th className="py-2.5 px-3 w-40 text-right">Artículos Publicados</th>
                <th className="py-2.5 px-3 w-44 text-right">Visitas Generadas</th>
                <th className="py-2.5 px-3 w-44 text-right">Tiempo Promedio (min)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {contenidoTematico.map((row, idx) => (
                <tr key={row.categoria} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{row.categoria}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.articulosPublicados}
                      onChange={(e) => onChangeContenidoTematico(idx, 'articulosPublicados', parseInt(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-teal-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.visitasGeneradas}
                      onChange={(e) => onChangeContenidoTematico(idx, 'visitasGeneradas', parseInt(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-32 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-teal-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      step="0.1"
                      value={row.tiempoPromedioMin}
                      onChange={(e) => onChangeContenidoTematico(idx, 'tiempoPromedioMin', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-teal-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-teal-50/70 border-t-2 border-teal-200 font-bold text-slate-900">
              <tr>
                <td className="py-2.5 px-3 text-teal-900">TOTALES CONSOLIDADOS</td>
                <td className="py-2.5 px-3 text-right font-mono text-teal-900">{totalArticulos} arts</td>
                <td className="py-2.5 px-3 text-right font-mono text-teal-900">{totalVisitas.toLocaleString()} visitas</td>
                <td className="py-2.5 px-3 text-right font-mono text-teal-900">{promedioTiempoMin} min prom</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Table 3: Suscripciones y Base de Usuarios */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-600" />
            Suscripciones y Base de Usuarios
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos WEB-008 al WEB-012</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-40 text-right">Valor Registrado</th>
                <th className="py-2.5 px-3">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {suscripciones.map((row, idx) => (
                <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-teal-700 bg-teal-50/50">{row.codigo}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.valor}
                      onChange={(e) => onChangeSuscripciones(idx, 'valor', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-teal-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.observaciones}
                      onChange={(e) => onChangeSuscripciones(idx, 'observaciones', e.target.value)}
                      disabled={readOnly}
                      placeholder="Métricas de suscripción y alcance push..."
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-teal-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 4: Trámites y Servicios Digitales */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-teal-600" />
            Trámites y Servicios Digitales
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos WEB-013 al WEB-018</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-40 text-right">Valor Registrado</th>
                <th className="py-2.5 px-3">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {tramitesServicios.map((row, idx) => (
                <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-teal-700 bg-teal-50/50">{row.codigo}</td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <input
                        type="number"
                        step="0.1"
                        value={row.valor}
                        onChange={(e) => onChangeTramitesServicios(idx, 'valor', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-teal-500"
                      />
                      {row.totalRef !== undefined && (
                        <span className="text-slate-500 font-mono text-xs">/ {row.totalRef}</span>
                      )}
                      {row.unidad === '%' && (
                        <span className="text-slate-500 font-bold text-xs">%</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.observaciones}
                      onChange={(e) => onChangeTramitesServicios(idx, 'observaciones', e.target.value)}
                      disabled={readOnly}
                      placeholder="Gestión y tiempos de respuesta de trámites..."
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-teal-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
