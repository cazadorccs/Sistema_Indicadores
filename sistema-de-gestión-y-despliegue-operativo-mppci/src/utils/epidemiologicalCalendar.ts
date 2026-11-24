/**
 * Utilidad oficial para el cálculo y sincronización de Semanas Epidemiológicas
 * conforme al estándar OPS/OMS (Organización Panamericana de la Salud)
 * y el Ministerio del Poder Popular para la Salud (MPPS) de la República Bolivariana de Venezuela.
 * 
 * Reglas OPS/OMS:
 * - La semana epidemiológica inicia el Domingo a las 00:00:00 y finaliza el Sábado a las 23:59:59.
 * - La Semana 1 del año es la primera semana que contiene al menos 4 días del año en curso.
 * - En 2026 (el 1 de enero fue jueves), los días 1, 2 y 3 corresponden a la última semana de 2025.
 *   Por lo tanto, la Semana 1 de 2026 inició el Domingo 4 de Enero de 2026.
 * - Al 11 de Septiembre de 2026 en Caracas, Venezuela, corresponde exactamente la Semana Epidemiológica N° 36
 *   (Corte: Domingo 06/09/2026 al Sábado 12/09/2026).
 */

export interface EpidemiologicalWeekInfo {
  semana: number;
  ano: number;
  periodoDesde: string; // YYYY-MM-DD
  periodoHasta: string; // YYYY-MM-DD
  periodoDesdeFormato: string; // DD/MM/YYYY
  periodoHastaFormato: string; // DD/MM/YYYY
  fechaReporte: string; // YYYY-MM-DD
  fechaReporteFormato: string; // DD/MM/YYYY
  ubicacion: string;
  zonaHoraria: string;
  descripcionCorte: string;
  esSemanaEnCurso: boolean;
  diasParaCorte: number;
}

/**
 * Obtiene el inicio de la Semana 1 (primer domingo de la SE 1) para un año dado según OPS/OMS.
 */
export function getEpiWeek1StartDate(year: number): Date {
  const jan1 = new Date(year, 0, 1);
  const dayOfWeek = jan1.getDay(); // 0: Dom, 1: Lun, 2: Mar, 3: Mie, 4: Jue, 5: Vie, 6: Sab

  // Si Jan 1 es Dom (0), Lun (1), Mar (2) o Mie (3), esa semana tiene >= 4 días en el año.
  // El domingo de esa semana es Jan 1 - dayOfWeek.
  if (dayOfWeek <= 3) {
    const start = new Date(year, 0, 1 - dayOfWeek);
    return start;
  } else {
    // Jan 1 es Jueves (4), Viernes (5) o Sábado (6) -> Menos de 4 días en ese año.
    // La Semana 1 inicia el siguiente domingo.
    const start = new Date(year, 0, 1 + (7 - dayOfWeek));
    return start;
  }
}

/**
 * Calcula la semana epidemiológica para una fecha específica (o la fecha actual en Caracas).
 */
export function calculateEpidemiologicalWeek(targetDate?: Date | string): EpidemiologicalWeekInfo {
  let date: Date;
  if (!targetDate) {
    // Fecha actual del entorno de ejecución (Caracas, Venezuela: VET UTC-4)
    date = new Date();
  } else if (typeof targetDate === 'string') {
    // Si viene como YYYY-MM-DD o DD/MM/YYYY
    if (targetDate.includes('/')) {
      const parts = targetDate.split('/');
      if (parts.length === 3) {
        // DD/MM/YYYY
        date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]), 12, 0, 0);
      } else {
        date = new Date();
      }
    } else {
      const parts = targetDate.split('-');
      if (parts.length === 3) {
        // YYYY-MM-DD
        date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 12, 0, 0);
      } else {
        date = new Date(targetDate);
      }
    }
  } else {
    date = new Date(targetDate.getTime());
  }

  const currentYear = date.getFullYear();

  // Calcular el domingo de inicio de la semana de la fecha dada
  const dayOfWeek = date.getDay(); // 0 = Domingo
  const sundayOfCurrentWeek = new Date(date);
  sundayOfCurrentWeek.setHours(0, 0, 0, 0);
  sundayOfCurrentWeek.setDate(date.getDate() - dayOfWeek);

  const saturdayOfCurrentWeek = new Date(sundayOfCurrentWeek);
  saturdayOfCurrentWeek.setDate(sundayOfCurrentWeek.getDate() + 6);
  saturdayOfCurrentWeek.setHours(23, 59, 59, 999);

  // Determinar si la semana pertenece al año actual o al anterior/siguiente
  const epiStartCurrentYear = getEpiWeek1StartDate(currentYear);
  const epiStartNextYear = getEpiWeek1StartDate(currentYear + 1);

  let weekNumber: number;
  let epiYear = currentYear;

  if (sundayOfCurrentWeek.getTime() < epiStartCurrentYear.getTime()) {
    // Pertenece a la última semana del año anterior
    epiYear = currentYear - 1;
    const epiStartPrevYear = getEpiWeek1StartDate(epiYear);
    const diffMs = sundayOfCurrentWeek.getTime() - epiStartPrevYear.getTime();
    weekNumber = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1;
  } else if (sundayOfCurrentWeek.getTime() >= epiStartNextYear.getTime()) {
    // Pertenece a la Semana 1 del año siguiente
    epiYear = currentYear + 1;
    weekNumber = 1;
  } else {
    const diffMs = sundayOfCurrentWeek.getTime() - epiStartCurrentYear.getTime();
    weekNumber = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  const fmtYYYYMMDD = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const fmtDDMMYYYY = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

  const hoy = new Date();
  const esSemanaEnCurso = 
    hoy.getTime() >= sundayOfCurrentWeek.getTime() && 
    hoy.getTime() <= saturdayOfCurrentWeek.getTime();

  // Días para el cierre de la semana (Sábado a las 23:59)
  const diffDaysToSaturday = Math.max(0, 6 - dayOfWeek);

  return {
    semana: weekNumber,
    ano: epiYear,
    periodoDesde: fmtYYYYMMDD(sundayOfCurrentWeek),
    periodoHasta: fmtYYYYMMDD(saturdayOfCurrentWeek),
    periodoDesdeFormato: fmtDDMMYYYY(sundayOfCurrentWeek),
    periodoHastaFormato: fmtDDMMYYYY(saturdayOfCurrentWeek),
    fechaReporte: fmtYYYYMMDD(date),
    fechaReporteFormato: fmtDDMMYYYY(date),
    ubicacion: 'Caracas, Venezuela',
    zonaHoraria: 'America/Caracas (VET UTC-4)',
    descripcionCorte: `Semana Epidemiológica N° ${weekNumber} (${fmtDDMMYYYY(sundayOfCurrentWeek)} al ${fmtDDMMYYYY(saturdayOfCurrentWeek)})`,
    esSemanaEnCurso,
    diasParaCorte: diffDaysToSaturday
  };
}

/**
 * Obtiene el rango de fechas para una semana epidemiológica específica en un año dado.
 */
export function getDatesForEpiWeek(week: number, year: number = 2026) {
  const epiStart = getEpiWeek1StartDate(year);
  const sundayOfWeek = new Date(epiStart);
  sundayOfWeek.setDate(epiStart.getDate() + (week - 1) * 7);

  const saturdayOfWeek = new Date(sundayOfWeek);
  saturdayOfWeek.setDate(sundayOfWeek.getDate() + 6);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const fmtYYYYMMDD = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const fmtDDMMYYYY = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

  return {
    periodoDesde: fmtYYYYMMDD(sundayOfWeek),
    periodoHasta: fmtYYYYMMDD(saturdayOfWeek),
    periodoDesdeFormato: fmtDDMMYYYY(sundayOfWeek),
    periodoHastaFormato: fmtDDMMYYYY(saturdayOfWeek)
  };
}
