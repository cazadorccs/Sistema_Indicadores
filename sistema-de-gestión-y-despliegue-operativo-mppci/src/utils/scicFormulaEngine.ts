import { SCIC_INDICATORS_DATA, ScicIndicator } from '../data/scicIndicators';

export interface EvaluatedFormulaResult {
  codigo: string;
  nombre: string;
  formula: string;
  variables: Record<string, number>;
  resultado: number;
  unidad: string;
  estatus: 'OPTIMO' | 'ALERTA' | 'CRITICO';
}

/**
 * Motor de Cálculo Matemático Seguro para Indicadores SCIC
 */
export function evaluateScicFormula(
  codigo: string,
  variables: Record<string, number>
): EvaluatedFormulaResult | null {
  const indicator = SCIC_INDICATORS_DATA.find(i => i.codigo.toUpperCase() === codigo.toUpperCase());
  if (!indicator) return null;

  let resultado = 0;
  const c = codigo.toUpperCase();

  // Fórmulas estándar parametrizadas
  switch (c) {
    case 'IAAE': {
      // (NE / NT) * 100
      const ne = variables.NE ?? variables.ne ?? 0;
      const nt = variables.NT ?? variables.nt ?? 1;
      resultado = nt > 0 ? (ne / nt) * 100 : 0;
      break;
    }
    case 'TECP': {
      // (MA / MC) * 100
      const ma = variables.MA ?? variables.ma ?? 0;
      const mc = variables.MC ?? variables.mc ?? 1;
      resultado = mc > 0 ? (ma / mc) * 100 : 0;
      break;
    }
    case 'RCVE': {
      // (EE / ES) * 100
      const ee = variables.EE ?? variables.ee ?? 0;
      const es = variables.ES ?? variables.es ?? 1;
      resultado = es > 0 ? (ee / es) * 100 : 0;
      break;
    }
    case 'CAFM': {
      // (FI / FT) * 100
      const fi = variables.FI ?? variables.fi ?? 0;
      const ft = variables.FT ?? variables.ft ?? 1;
      resultado = ft > 0 ? (fi / ft) * 100 : 0;
      break;
    }
    case 'ODNP': {
      // T_dif - T_rec
      const tdif = variables.T_dif ?? variables.tdif ?? 0;
      const trec = variables.T_rec ?? variables.trec ?? 0;
      resultado = Math.max(0, tdif - trec);
      break;
    }
    case 'CPMS':
    case 'TASS': {
      // (CS / CT) * 100
      const cs = variables.CS ?? variables.cs ?? 0;
      const ct = variables.CT ?? variables.ct ?? 1;
      resultado = ct > 0 ? (cs / ct) * 100 : 0;
      break;
    }
    case 'ETNG': {
      // (ND / NR) * 100
      const nd = variables.ND ?? variables.nd ?? 0;
      const nr = variables.NR ?? variables.nr ?? 1;
      resultado = nr > 0 ? (nd / nr) * 100 : 0;
      break;
    }
    case 'IRLG': {
      // LM / MT
      const lm = variables.LM ?? variables.lm ?? 0;
      const mt = variables.MT ?? variables.mt ?? 1;
      resultado = mt > 0 ? lm / mt : 0;
      break;
    }
    default: {
      // Evaluación genérica para ratios estándar A / B * 100
      const vals = Object.values(variables);
      if (vals.length >= 2 && vals[1] > 0) {
        resultado = (vals[0] / vals[1]) * 100;
      } else if (vals.length === 1) {
        resultado = vals[0];
      }
      break;
    }
  }

  // Redondear a 2 decimales
  resultado = Math.round(resultado * 100) / 100;

  // Semáforo institucional
  let estatus: 'OPTIMO' | 'ALERTA' | 'CRITICO' = 'OPTIMO';
  if (resultado < 60) estatus = 'CRITICO';
  else if (resultado < 75) estatus = 'ALERTA';

  return {
    codigo: indicator.codigo,
    nombre: indicator.nombre,
    formula: indicator.formula,
    variables,
    resultado,
    unidad: indicator.formula.includes('* 100') || indicator.formula.includes('%') ? '%' : 'unidades',
    estatus
  };
}
