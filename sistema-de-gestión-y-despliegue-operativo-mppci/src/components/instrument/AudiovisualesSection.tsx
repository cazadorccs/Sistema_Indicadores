import React from 'react';
import { Tv, Video, Layers, Film, Clapperboard, MonitorPlay, Activity } from 'lucide-react';
import { TVRowAlcance, TVRowProduccion, TVRowDesgloseProduccion, TVRowLogistica } from '../../types';

interface AudiovisualesSectionProps {
  alcance: TVRowAlcance[];
  produccion: TVRowProduccion[];
  desgloseProduccion: TVRowDesgloseProduccion[];
  logistica: TVRowLogistica[];
  onChangeAlcance: (index: number, field: keyof TVRowAlcance, value: any) => void;
  onChangeProduccion: (index: number, field: keyof TVRowProduccion, value: any) => void;
  onChangeDesgloseProduccion: (index: number, field: keyof TVRowDesgloseProduccion, value: any) => void;
  onChangeLogistica: (index: number, field: keyof TVRowLogistica, value: any) => void;
  readOnly?: boolean;
}

export const AudiovisualesSection: React.FC<AudiovisualesSectionProps> = ({
  alcance,
  produccion,
  desgloseProduccion,
  logistica,
  onChangeAlcance,
  onChangeProduccion,
  onChangeDesgloseProduccion,
  onChangeLogistica,
  readOnly = false
}) => {
  const totalPiezas = desgloseProduccion.reduce((acc, curr) => acc + (curr.numPiezas || 0), 0);
  const totalHoras = desgloseProduccion.reduce((acc, curr) => acc + (curr.duracionTotalHoras || 0), 0);
  const totalPorcentaje = desgloseProduccion.reduce((acc, curr) => acc + (curr.porcentajeParrilla || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-sky-600/20 text-sky-400 rounded-lg border border-sky-500/30">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
              EJE 1: MEDIOS DE COMUNICACIÓN E INFORMACIÓN
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              1.C MEDIOS AUDIOVISUALES
            </h2>
          </div>
        </div>
        <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono">
          Códigos TV-001 al TV-019
        </span>
      </div>

      {/* Table 1: Televisión Abierta y por Suscripción */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-600" />
            Televisión Abierta y por Suscripción
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos TV-001 al TV-005</span>
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
              {alcance.map((row, idx) => {
                const isPercentage = row.codigo === 'TV-002' || row.codigo === 'TV-003' || row.codigo === 'TV-004';
                return (
                  <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-sky-700 bg-sky-50/50">{row.codigo}</td>
                    <td className="py-2.5 px-3 text-slate-600">{row.frecuencia}</td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.metaSemanal === 0 ? '' : row.metaSemanal}
                          onChange={(e) => onChangeAlcance(idx, 'metaSemanal', parseFloat(e.target.value) || 0)}
                          disabled={readOnly}
                          placeholder="_______"
                          className="w-20 px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-sky-500"
                        />
                        <span
                          aria-hidden={!isPercentage}
                          className={`w-4 text-center text-xs font-bold text-slate-500 inline-block shrink-0 ${
                            isPercentage ? '' : 'invisible'
                          }`}
                        >
                          %
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.logrado === 0 ? '' : row.logrado}
                          onChange={(e) => onChangeAlcance(idx, 'logrado', parseFloat(e.target.value) || 0)}
                          disabled={readOnly}
                          placeholder="_______"
                          className="w-20 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                        />
                        <span
                          aria-hidden={!isPercentage}
                          className={`w-4 text-center text-xs font-bold text-slate-500 inline-block shrink-0 ${
                            isPercentage ? '' : 'invisible'
                          }`}
                        >
                          %
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.varSemanaAnterior === 0 ? '' : row.varSemanaAnterior}
                          onChange={(e) => onChangeAlcance(idx, 'varSemanaAnterior', parseFloat(e.target.value) || 0)}
                          disabled={readOnly}
                          placeholder="_______"
                          className={`w-20 px-2 py-1 text-right border rounded text-xs font-mono font-bold placeholder-slate-400 ${
                            row.varSemanaAnterior >= 0 
                              ? 'text-emerald-700 bg-emerald-50/50 border-emerald-200' 
                              : 'text-rose-700 bg-rose-50/50 border-rose-200'
                          }`}
                        />
                        <span className="w-4 text-center text-xs font-bold text-slate-500 inline-block shrink-0">%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Producción Audiovisual */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Video className="w-4 h-4 text-sky-600" />
            Producción Audiovisual
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos TV-006 al TV-013</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-28">Frecuencia</th>
                <th className="py-2.5 px-3 w-28 text-right">Logrado</th>
                <th className="py-2.5 px-3">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {produccion.map((row, idx) => (
                <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-sky-700 bg-sky-50/50">{row.codigo}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.frecuencia}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.logrado === 0 ? '' : row.logrado}
                      onChange={(e) => onChangeProduccion(idx, 'logrado', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      placeholder="_______"
                      className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.observaciones}
                      onChange={(e) => onChangeProduccion(idx, 'observaciones', e.target.value)}
                      disabled={readOnly}
                      placeholder="Detalles técnicos de emisión y producción..."
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 3: Desglose por Tipo de Producción Audiovisual */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Film className="w-4 h-4 text-sky-600" />
            Desglose por Tipo de Producción Audiovisual
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">7 Tipos de Contenido</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Tipo de Contenido</th>
                <th className="py-2.5 px-3 w-36 text-right">N° de Piezas</th>
                <th className="py-2.5 px-3 w-40 text-right">Duración Total (hrs)</th>
                <th className="py-2.5 px-3 w-36 text-right">% de Parrilla</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {desgloseProduccion.map((row, idx) => (
                <tr key={row.tipoContenido} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{row.tipoContenido}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.numPiezas === 0 ? '' : row.numPiezas}
                      onChange={(e) => onChangeDesgloseProduccion(idx, 'numPiezas', parseInt(e.target.value) || 0)}
                      disabled={readOnly}
                      placeholder="_______"
                      className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      step="0.5"
                      value={row.duracionTotalHoras === 0 ? '' : row.duracionTotalHoras}
                      onChange={(e) => onChangeDesgloseProduccion(idx, 'duracionTotalHoras', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      placeholder="_______"
                      className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <input
                        type="number"
                        step="0.1"
                        value={row.porcentajeParrilla === 0 ? '' : row.porcentajeParrilla}
                        onChange={(e) => onChangeDesgloseProduccion(idx, 'porcentajeParrilla', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        placeholder="_______"
                        className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-sky-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                      />
                      <span className="text-[11px] font-bold text-slate-500">%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-sky-50/70 border-t-2 border-sky-200 font-bold text-slate-900">
              <tr>
                <td className="py-2.5 px-3 text-sky-900">TOTALES CONSOLIDADOS</td>
                <td className="py-2.5 px-3 text-right font-mono text-sky-900">{totalPiezas}</td>
                <td className="py-2.5 px-3 text-right font-mono text-sky-900">{totalHoras.toFixed(1)} hrs</td>
                <td className="py-2.5 px-3 text-right font-mono text-sky-900">{totalPorcentaje.toFixed(1)}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Table 4: Equipamiento y Logística Audiovisual */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <MonitorPlay className="w-4 h-4 text-sky-600" />
            Equipamiento y Logística Audiovisual
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos TV-014 al TV-019</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-44 text-right">Valor Registrado</th>
                <th className="py-2.5 px-3">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {logistica.map((row, idx) => (
                <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-sky-700 bg-sky-50/50">{row.codigo}</td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <input
                        type="number"
                        value={row.valor === 0 ? '' : row.valor}
                        onChange={(e) => onChangeLogistica(idx, 'valor', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        placeholder="_______"
                        className="w-20 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                      />
                      {row.codigo !== 'TV-019' && (
                        <>
                          <span className="text-slate-400 font-bold">/</span>
                          <input
                            type="number"
                            value={row.totalRef === undefined || row.totalRef === 0 ? '' : row.totalRef}
                            onChange={(e) => onChangeLogistica(idx, 'totalRef', parseFloat(e.target.value) || 0)}
                            disabled={readOnly}
                            placeholder="_______"
                            className="w-20 px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-semibold text-slate-700 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-sky-500"
                          />
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.observaciones}
                      onChange={(e) => onChangeLogistica(idx, 'observaciones', e.target.value)}
                      disabled={readOnly}
                      placeholder="Disponibilidad técnica y operativa..."
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
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
