import React from 'react';
import { Newspaper, TrendingUp, AlertCircle, FileText, Truck, MapPin } from 'lucide-react';
import { ImpresoRowProduccion, ImpresoRowEditorial, ImpresoRowDistribucion } from '../../types';

interface ImpresosSectionProps {
  produccion: ImpresoRowProduccion[];
  editorial: ImpresoRowEditorial[];
  distribucion: ImpresoRowDistribucion[];
  onChangeProduccion: (index: number, field: keyof ImpresoRowProduccion, value: any) => void;
  onChangeEditorial: (index: number, field: keyof ImpresoRowEditorial, value: any) => void;
  onChangeDistribucion: (index: number, field: keyof ImpresoRowDistribucion, value: any) => void;
  readOnly?: boolean;
}

export const ImpresosSection: React.FC<ImpresosSectionProps> = ({
  produccion,
  editorial,
  distribucion,
  onChangeProduccion,
  onChangeEditorial,
  onChangeDistribucion,
  readOnly = false
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-semibold">
              EJE 1: MEDIOS DE COMUNICACIÓN E INFORMACIÓN
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              1.A MEDIOS IMPRESOS
            </h2>
          </div>
        </div>
        <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono">
          Códigos IMP-001 al IMP-017
        </span>
      </div>

      {/* Table 1: Producción y Distribución de Contenido Impreso */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Producción y Distribución de Contenido Impreso
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Frecuencia: Diaria / Semanal</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-28">Frecuencia</th>
                <th className="py-2.5 px-3 w-36 text-right">Meta Semanal</th>
                <th className="py-2.5 px-3 w-36 text-right">Logrado</th>
                <th className="py-2.5 px-3 w-36 text-right">Var % vs Semana Anterior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {produccion.map((row, idx) => {
                const isPercentageRow = row.codigo === 'IMP-004';
                return (
                  <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700 bg-blue-50/50">{row.codigo}</td>
                    <td className="py-2.5 px-3 text-slate-600">{row.frecuencia}</td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="relative inline-flex items-center w-full">
                        <input
                          type="number"
                          step={isPercentageRow ? "0.1" : "1"}
                          placeholder={isPercentageRow ? "_______%" : "_______"}
                          value={row.metaSemanal === 0 ? '' : row.metaSemanal}
                          onChange={(e) => onChangeProduccion(idx, 'metaSemanal', parseFloat(e.target.value) || 0)}
                          disabled={readOnly}
                          className="w-full px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold focus:bg-white focus:ring-1 focus:ring-blue-500"
                        />
                        {isPercentageRow && (
                          <span className="absolute right-2 text-[11px] font-bold text-slate-500 pointer-events-none">%</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="relative inline-flex items-center w-full">
                        <input
                          type="number"
                          step={isPercentageRow ? "0.1" : "1"}
                          placeholder={isPercentageRow ? "_______%" : "_______"}
                          value={row.logrado === 0 ? '' : row.logrado}
                          onChange={(e) => onChangeProduccion(idx, 'logrado', parseFloat(e.target.value) || 0)}
                          disabled={readOnly}
                          className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-blue-500"
                        />
                        {isPercentageRow && (
                          <span className="absolute right-2 text-[11px] font-bold text-blue-700 pointer-events-none">%</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          placeholder="_______%"
                          value={row.varSemanaAnterior === 0 ? '' : row.varSemanaAnterior}
                          onChange={(e) => onChangeProduccion(idx, 'varSemanaAnterior', parseFloat(e.target.value) || 0)}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Contenido Editorial y Temático */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-blue-600" />
            Contenido Editorial y Temático
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos IMP-006 al IMP-012</span>
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
              {editorial.map((row, idx) => (
                <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700 bg-blue-50/50">{row.codigo}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.frecuencia}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      placeholder="_______"
                      value={row.logrado === 0 ? '' : row.logrado}
                      onChange={(e) => onChangeEditorial(idx, 'logrado', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.observaciones}
                      onChange={(e) => onChangeEditorial(idx, 'observaciones', e.target.value)}
                      disabled={readOnly}
                      placeholder="Observaciones de la cobertura editorial..."
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 3: Distribución Física y Logística */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-600" />
            Distribución Física y Logística
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos IMP-013 al IMP-017</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-56 text-right">Valor</th>
                <th className="py-2.5 px-3 w-28">Unidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {distribucion.map((row, idx) => (
                <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700 bg-blue-50/50">{row.codigo}</td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <input
                        type="number"
                        placeholder="_______"
                        value={row.valor === 0 ? '' : row.valor}
                        onChange={(e) => onChangeDistribucion(idx, 'valor', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-blue-500"
                      />
                      {row.codigo === 'IMP-014' ? (
                        <span className="text-slate-500 font-mono text-xs font-bold">/ 335</span>
                      ) : row.codigo === 'IMP-017' ? (
                        <>
                          <span className="text-slate-500 font-mono text-xs font-bold">/</span>
                          <input
                            type="number"
                            placeholder="_______"
                            value={row.totalRef === 0 || !row.totalRef ? '' : row.totalRef}
                            onChange={(e) => onChangeDistribucion(idx, 'totalRef', parseFloat(e.target.value) || 0)}
                            disabled={readOnly}
                            className="w-20 px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-700 focus:bg-white focus:ring-1 focus:ring-blue-500"
                            title="Total de unidades de transporte"
                          />
                        </>
                      ) : row.totalRef !== undefined ? (
                        <span className="text-slate-500 font-mono text-xs">/ {row.totalRef}</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-600">{row.unidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
