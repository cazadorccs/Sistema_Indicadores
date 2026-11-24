import React, { useEffect } from 'react';
import { Calendar, User, CreditCard, MapPin, Phone, Mail, Clock, ShieldCheck, AlertCircle, Sparkles, RefreshCw, Check } from 'lucide-react';
import { ControlVariables, EnteInfo } from '../../types';
import { calculateEpidemiologicalWeek, getDatesForEpiWeek } from '../../utils/epidemiologicalCalendar';

interface ControlVariablesSectionProps {
  control: ControlVariables;
  onChange: (updated: Partial<ControlVariables>) => void;
  readOnly?: boolean;
  enteInfo?: EnteInfo | null;
}

export const ControlVariablesSection: React.FC<ControlVariablesSectionProps> = ({
  control,
  onChange,
  readOnly = false,
  enteInfo
}) => {
  // Compute current epidemiological week for Caracas, Venezuela
  const currentEpi = calculateEpidemiologicalWeek();

  // On mount, if semanaEpidemiologica is default 35 or empty, automatically sync to SE 36
  useEffect(() => {
    if (!control.semanaEpidemiologica || control.semanaEpidemiologica === 35) {
      onChange({
        semanaEpidemiologica: currentEpi.semana,
        periodoDesde: currentEpi.periodoDesde,
        periodoHasta: currentEpi.periodoHasta,
        fechaReporte: currentEpi.fechaReporte,
        regionLocalidad: control.regionLocalidad?.includes('Caracas') 
          ? control.regionLocalidad 
          : 'Caracas, Venezuela - Distrito Capital'
      });
    }
  }, []);

  // Handler to auto-sync today's epidemiological week
  const handleAutoSyncToday = () => {
    const epi = calculateEpidemiologicalWeek();
    onChange({
      semanaEpidemiologica: epi.semana,
      periodoDesde: epi.periodoDesde,
      periodoHasta: epi.periodoHasta,
      fechaReporte: epi.fechaReporte,
      regionLocalidad: control.regionLocalidad?.trim() 
        ? control.regionLocalidad 
        : 'Caracas, Venezuela - Distrito Capital'
    });
  };

  // Handler when user types or changes the report date
  const handleFechaReporteChange = (newDate: string) => {
    const updates: Partial<ControlVariables> = { fechaReporte: newDate };
    try {
      if (newDate && (newDate.length === 10 || newDate.includes('-') || newDate.includes('/'))) {
        const epi = calculateEpidemiologicalWeek(newDate);
        if (epi && epi.semana >= 1 && epi.semana <= 53) {
          updates.semanaEpidemiologica = epi.semana;
          updates.periodoDesde = epi.periodoDesde;
          updates.periodoHasta = epi.periodoHasta;
        }
      }
    } catch {
      // Keep user input as is
    }
    onChange(updates);
  };

  // Handler when user manually changes the week number
  const handleWeekManualChange = (week: number) => {
    const updates: Partial<ControlVariables> = { semanaEpidemiologica: week };
    if (week >= 1 && week <= 53) {
      const dates = getDatesForEpiWeek(week, 2026);
      updates.periodoDesde = dates.periodoDesde;
      updates.periodoHasta = dates.periodoHasta;
    }
    onChange(updates);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      {/* Institutional Top Bar */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div>
          <div className="text-[11px] font-mono tracking-wider text-blue-400 uppercase font-semibold">
            INSTRUMENTO DE CAPTURA DE DATOS • MPPCI
          </div>
          <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
            <span>Variable de Control | Información de Registro</span>
          </h2>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <div className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-700/80 rounded-lg text-emerald-300 font-mono text-[11px] flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Caracas, Venezuela (VET UTC-4) • SE {control.semanaEpidemiologica || 36}</span>
          </div>
          <div className="px-2.5 py-1 bg-blue-950/80 border border-blue-800/80 rounded-lg text-blue-300 font-mono text-[11px]">
            Corte: Dom a Sáb • Lunes 10:00 AM
          </div>
          <div className="hidden sm:flex items-center text-slate-400 text-xs">
            <Mail className="w-3.5 h-3.5 mr-1 text-slate-300" />
            <span className="font-mono text-[11px]">vpscc.informacion.indicadores@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Control Variables Form Grid */}
      <div className="p-5 sm:p-6 bg-slate-50/50 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Fecha de Reporte */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Fecha de Reporte
            </label>
            <input
              type="text"
              value={control.fechaReporte}
              onChange={(e) => handleFechaReporteChange(e.target.value)}
              disabled={readOnly}
              placeholder="YYYY-MM-DD o DD/MM/YYYY"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-medium text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-500"
            />
          </div>

          {/* Semana Epidemiológica */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Semana Epidemiológica
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                Auto: SE 36
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-emerald-700">
                N°
              </span>
              <input
                type="number"
                value={control.semanaEpidemiologica}
                onChange={(e) => handleWeekManualChange(parseInt(e.target.value) || 0)}
                disabled={readOnly}
                min={1}
                max={53}
                className="w-full pl-8 pr-24 py-2 bg-emerald-50/50 border border-emerald-400 rounded-lg text-xs font-mono font-bold text-emerald-950 focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all disabled:bg-slate-100 shadow-xs ring-1 ring-emerald-400/30"
              />
              <button
                type="button"
                onClick={handleAutoSyncToday}
                disabled={readOnly}
                title="Sincronizar automáticamente con fecha actual de Caracas, Venezuela (SE 36)"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2 py-1 bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-bold rounded-md flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Hoy SE 36</span>
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 px-0.5">
              <span className="truncate flex items-center gap-1 text-emerald-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Caracas, VET (Dom - Sáb)
              </span>
              <button
                type="button"
                onClick={handleAutoSyncToday}
                className="text-blue-600 hover:text-blue-800 font-semibold underline cursor-pointer text-[10px]"
              >
                Actualizar
              </button>
            </div>
          </div>

          {/* Periodo Desde */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Periodo de Corte (Del)
            </label>
            <input
              type="text"
              value={control.periodoDesde}
              onChange={(e) => onChange({ periodoDesde: e.target.value })}
              disabled={readOnly}
              placeholder="YYYY-MM-DD"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-medium text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100"
            />
          </div>

          {/* Periodo Hasta */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Periodo de Corte (Al)
            </label>
            <input
              type="text"
              value={control.periodoHasta}
              onChange={(e) => onChange({ periodoHasta: e.target.value })}
              disabled={readOnly}
              placeholder="YYYY-MM-DD"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-medium text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100"
            />
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-200/80">
          
          {/* Responsable del Área / Ente Adscrito */}
          <div className="space-y-1.5 lg:col-span-2">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              Responsable del Área / Ente Adscrito
            </label>
            <input
              type="text"
              value={control.responsableEnte}
              onChange={(e) => onChange({ responsableEnte: e.target.value })}
              disabled={readOnly}
              placeholder="Nombre, Apellido y Cargo Oficial"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100"
            />
          </div>

          {/* Cédula de Identidad */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              Cédula de Identidad
            </label>
            <input
              type="text"
              value={control.cedulaIdentidad}
              onChange={(e) => onChange({ cedulaIdentidad: e.target.value })}
              disabled={readOnly}
              placeholder="V-00000000"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100"
            />
          </div>

          {/* Región / Localidad */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Región / Localidad
            </label>
            <input
              type="text"
              value={control.regionLocalidad}
              onChange={(e) => onChange({ regionLocalidad: e.target.value })}
              disabled={readOnly}
              placeholder="Ej: Caracas, Venezuela / Distrito Capital"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100"
            />
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200/80">
          
          {/* Teléfono de Contacto */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              Teléfono de Contacto
            </label>
            <input
              type="text"
              value={control.telefono}
              onChange={(e) => onChange({ telefono: e.target.value })}
              disabled={readOnly}
              placeholder="+58 412 0000000"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100"
            />
          </div>

          {/* Correo Electrónico */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              Correo Electrónico Institucional
            </label>
            <input
              type="email"
              value={control.correo}
              onChange={(e) => onChange({ correo: e.target.value })}
              disabled={readOnly}
              placeholder="usuario@mppci.gob.ve"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100"
            />
          </div>

        </div>
      </div>
    </div>
  );
};
