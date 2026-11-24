import React, { useState, useRef } from 'react';
import { 
  FileSpreadsheet, 
  UploadCloud, 
  Download, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Check, 
  HelpCircle,
  FileCheck,
  RefreshCw,
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { FullWeeklyReport } from '../types';
import { 
  downloadExcelTemplate, 
  parseUploadedExcelFile, 
  applyParsedDataToReport, 
  ParsedImportResult 
} from '../utils/excelImportExportEngine';

interface ExcelBulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentReport: FullWeeklyReport;
  onApplyImport: (updatedReport: FullWeeklyReport, importSummary: { fileName: string; mappedCount: number }) => void;
}

export const ExcelBulkImportModal: React.FC<ExcelBulkImportModalProps> = ({
  isOpen,
  onClose,
  currentReport,
  onApplyImport
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseResult, setParseResult] = useState<ParsedImportResult | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'TODOS' | 'CON_VALOR' | 'DISCREPANTES'>('TODOS');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setErrorMessage(null);
    setIsParsing(true);

    try {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!['xlsx', 'xls', 'csv'].includes(extension || '')) {
        throw new Error('Formato no soportado. Por favor suba un archivo con extensión .xlsx, .xls o .csv');
      }

      const result = await parseUploadedExcelFile(file);
      setParseResult(result);
    } catch (err: any) {
      console.error('Error parseando archivo Excel:', err);
      setErrorMessage(err.message || 'No se pudo leer el archivo Excel.');
      setParseResult(null);
    } finally {
      setIsParsing(false);
    }
  };

  const handleConfirmImport = () => {
    if (!parseResult) return;
    const updated = applyParsedDataToReport(currentReport, parseResult);
    onApplyImport(updated, {
      fileName: parseResult.fileName,
      mappedCount: parseResult.mappedCount
    });
    onClose();
  };

  // Filtered rows for the preview table
  const filteredItems = (parseResult?.items || []).filter(item => {
    const query = searchQuery.toLowerCase();
    const matchSearch = !query || 
      item.codigo.toLowerCase().includes(query) || 
      item.indicador.toLowerCase().includes(query) ||
      item.eje.toLowerCase().includes(query);

    if (!matchSearch) return false;

    if (filterType === 'CON_VALOR') {
      return item.valor > 0 || item.meta > 0;
    }
    if (filterType === 'DISCREPANTES') {
      return item.status !== 'MAPPEADO';
    }
    return true;
  });

  const withValueCount = (parseResult?.items || []).filter(i => i.valor > 0 || i.meta > 0).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 px-6 py-4.5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold font-['Space_Grotesk'] leading-tight flex items-center gap-2">
                <span>Carga Automatizada vía Excel / CSV</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.2 rounded-full font-normal">
                  Importación Masiva
                </span>
              </h2>
              <p className="text-[11px] text-emerald-200">
                Puebla automáticamente los formularios del sistema importando una hoja de cálculo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/50 transition-colors cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto text-xs text-slate-700 flex-1">
          
          {/* Step 1: Template Download Toolbar */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                Paso 1: Descargar Plantilla Oficial Pre-estructurada
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Descargue el formato con los códigos oficiales SCIC (IMP, RAD, TV, WEB, RED, RTV, CON, EST) listos para llenar.
              </p>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={() => downloadExcelTemplate('xlsx', currentReport)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                title="Descargar libro Excel con hojas de indicadores y control"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Plantilla Excel (.xlsx)</span>
              </button>
              <button
                type="button"
                onClick={() => downloadExcelTemplate('csv', currentReport)}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                title="Descargar archivo delimitado por comas (.csv)"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          {/* Step 2: Drag & Drop Zone */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-2 flex items-center gap-1.5">
              <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
              Paso 2: Subir Archivo Excel o CSV con los Datos
            </h4>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileInputChange}
              className="hidden"
            />

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                dragActive 
                  ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01]' 
                  : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50/80 bg-slate-50/40'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2.5 shadow-xs">
                {isParsing ? (
                  <RefreshCw className="w-6 h-6 animate-spin" />
                ) : (
                  <UploadCloud className="w-6 h-6" />
                )}
              </div>
              <p className="font-semibold text-slate-800 text-xs sm:text-sm">
                {isParsing 
                  ? 'Procesando y correlacionando indicadores...' 
                  : 'Arrastre su archivo Excel aquí o haga clic para examinar'
                }
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Soporta archivos <strong>.xlsx</strong>, <strong>.xls</strong> y <strong>.csv</strong> de cualquier ente adscrito
              </p>
            </div>
          </div>

          {/* Error alert */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-center space-x-2 text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Step 3: Parse Results & Interactive Preview */}
          {parseResult && (
            <div className="space-y-3 pt-1 border-t border-slate-200 animate-in fade-in duration-150">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5">
                  <div className="text-[10px] text-emerald-800 font-semibold uppercase">Indicadores Mapeados</div>
                  <div className="text-xl font-bold font-mono text-emerald-700">{parseResult.mappedCount}</div>
                  <div className="text-[10px] text-emerald-600 mt-0.5">de {parseResult.totalRows} filas</div>
                </div>

                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-2.5">
                  <div className="text-[10px] text-blue-800 font-semibold uppercase">Con Valor Reportado</div>
                  <div className="text-xl font-bold font-mono text-blue-700">{withValueCount}</div>
                  <div className="text-[10px] text-blue-600 mt-0.5">Indicadores con datos</div>
                </div>

                <div className="bg-slate-100 border border-slate-200 rounded-xl p-2.5">
                  <div className="text-[10px] text-slate-600 font-semibold uppercase">Archivo Procesado</div>
                  <div className="text-xs font-bold text-slate-800 truncate" title={parseResult.fileName}>
                    {parseResult.fileName}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                    {(parseResult.fileSize / 1024).toFixed(1)} KB
                  </div>
                </div>

                <div className="bg-slate-100 border border-slate-200 rounded-xl p-2.5">
                  <div className="text-[10px] text-slate-600 font-semibold uppercase">Ente / Periodo</div>
                  <div className="text-xs font-bold text-slate-800">
                    {parseResult.controlVariables?.enteAdscrito || currentReport.control.enteAdscrito}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Semana {parseResult.controlVariables?.semanaEpidemiologica || currentReport.control.semanaEpidemiologica}
                  </div>
                </div>
              </div>

              {/* Table Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setFilterType('TODOS')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                      filterType === 'TODOS' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Todos ({parseResult.items.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType('CON_VALOR')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                      filterType === 'CON_VALOR' ? 'bg-white shadow-xs text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Con Datos ({withValueCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType('DISCREPANTES')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                      filterType === 'DISCREPANTES' ? 'bg-white shadow-xs text-amber-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    No Mapeados ({parseResult.unmappedCount})
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por código o indicador..."
                    className="pl-8 pr-3 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-emerald-500 w-full sm:w-64"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3 w-24">Código</th>
                      <th className="py-2 px-3">Indicador</th>
                      <th className="py-2 px-3 w-32">Eje</th>
                      <th className="py-2 px-3 w-20 text-right">Meta</th>
                      <th className="py-2 px-3 w-28 text-right">Valor Logrado</th>
                      <th className="py-2 px-3 w-16 text-center">Unidad</th>
                      <th className="py-2 px-3 w-24 text-center">Estatus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-slate-400">
                          No se encontraron indicadores con los filtros actuales.
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item, idx) => (
                        <tr key={`${item.codigo}-${idx}`} className="hover:bg-slate-50">
                          <td className="py-1.5 px-3 font-mono font-bold text-sky-700">
                            {item.codigo}
                          </td>
                          <td className="py-1.5 px-3 font-medium text-slate-900">
                            {item.indicador}
                          </td>
                          <td className="py-1.5 px-3 text-slate-500 text-[11px]">
                            {item.eje}
                          </td>
                          <td className="py-1.5 px-3 text-right font-mono text-slate-600">
                            {item.meta > 0 ? item.meta.toLocaleString('es-VE') : '—'}
                          </td>
                          <td className="py-1.5 px-3 text-right font-mono font-bold text-emerald-700">
                            {item.valor > 0 ? item.valor.toLocaleString('es-VE') : '0'}
                          </td>
                          <td className="py-1.5 px-3 text-center text-slate-500 text-[11px]">
                            {item.unidad}
                          </td>
                          <td className="py-1.5 px-3 text-center">
                            {item.status === 'MAPPEADO' ? (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Mapeado
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                                Sin clave
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="text-[11px] text-slate-500">
            {parseResult ? (
              <span>
                ¿Listo para aplicar? Se actualizarán <strong>{parseResult.mappedCount} indicadores</strong> y se recalcularán los KPIs automáticamente.
              </span>
            ) : (
              <span>Seleccione un archivo Excel para habilitar la importación masiva.</span>
            )}
          </div>

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
              disabled={!parseResult || parseResult.mappedCount === 0}
              onClick={handleConfirmImport}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs ${
                parseResult && parseResult.mappedCount > 0
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Aplicar y Cargar al Sistema</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
