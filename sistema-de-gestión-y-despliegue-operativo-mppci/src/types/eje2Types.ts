// Types for EJE 2: PLATAFORMAS DE COMUNICACIONES (Documento Oficial MPPCI)

export interface RedTVOperatividadMedioRow {
  medioEnte: string; // VTV, RNV, Radio del Sur, Correo del Orinoco, Infantiles (123/Vive), Ávila TVE, YVKE Mundial, ViVe TV, TVes, Telesur
  horasTransmision: number;
  operatividadPorc: number; // % de Operatividad
  estatusSenalServidoresPorc: number; // Estatus de Señal / Servidores (%)
  pasesEnVivoProduccion: number;
  observaciones: string;
}

export interface RedTVTdaKpiRow {
  codigo: string; // RTV-001 to RTV-005
  indicador: string;
  valor: number;
  totalRef?: number; // Para indicadores tipo X / Y (e.g. 8/8 o 22/25)
  meta: number;
  cumplimientoPorc: number; // Calculado automático
}

export interface RedTVSatelitalRow {
  codigo: string; // RTV-006 to RTV-010
  indicador: string;
  valor: number;
  totalRef?: number;
  unidad: string; // %, N°, min
  observaciones: string;
}

export interface RedTVTorreCriticaRow {
  infraestructura: string;
  ubicacion: string; // Zulia, Caracas, Carabobo, Lara, Monagas, Táchira
  estatus: 'OPERATIVA' | 'ALERTA' | 'FALLA_PARCIAL' | 'FUERA_DE_SERVICIO';
  observaciones: string;
}

export interface RedTVTransmisoresEquipamientoRow {
  codigo: string; // RTV-011 to RTV-015
  indicador: string;
  operativos: number;
  total: number;
  observaciones: string;
}

export interface RedTVCoberturaRegionRow {
  region: string; // Entidades federales (23 estados + Dto. Capital + Dependencias Federales)
  coberturaTdaPorc: number;
  coberturaFmAmPorc: number;
  coberturaTvAbiertaPorc: number;
  estacionesAfectadas: number;
}

// CONATEL (2.B)
export interface ConatelMonitoreoRow {
  codigo: string; // CON-001 to CON-008
  indicador: string;
  valor: number;
  varSemanaAnteriorPorc: number;
  observaciones: string;
}

export interface ConatelEspectroRow {
  codigo: string; // CON-009 to CON-013
  indicador: string;
  valor: number;
  totalRef?: number;
  observaciones: string;
}

export interface ConatelResorteRow {
  codigo: string; // CON-014 to CON-018
  indicador: string;
  valor: number;
  observaciones: string;
}

export interface ConatelTramiteSigestelRow {
  codigo: string; // CON-019 to CON-025
  tramite: string;
  solicitudesRecibidas: number;
  solicitudesProcesadas: number;
  tiempoPromedioDias: number;
}

export interface ConatelIncidenteRow {
  tipoIncidente: string; // Caídas de servicio, Interferencias, Afectaciones a infraestructura, Ciberataques, Solicitudes de emergencia, Reportes ciudadanos
  numReportes: number;
  resolucionPorc: number;
  tiempoPromedioHoras: number;
}

export interface ConatelPoliticaPublicaRow {
  tema: string; // Providencias administrativas, Resoluciones, Consultas públicas, Informes técnicos
  documentosPublicados: number;
  fecha: string;
  observaciones: string;
}

export interface Eje2InstrumentoData {
  redtv: {
    operatividadMedios: RedTVOperatividadMedioRow[];
    monitoreoTda: RedTVTdaKpiRow[];
    infraestructuraSatelital: RedTVSatelitalRow[];
    torresCriticas: RedTVTorreCriticaRow[];
    transmisoresEquipamiento: RedTVTransmisoresEquipamientoRow[];
    coberturaRegiones: RedTVCoberturaRegionRow[];
  };
  conatel: {
    monitoreoRegulatorio: ConatelMonitoreoRow[];
    monitoreoEspectro: ConatelEspectroRow[];
    cumplimientoResorte: ConatelResorteRow[];
    tramitesSigestel: ConatelTramiteSigestelRow[];
    incidentesContingencias: ConatelIncidenteRow[];
    politicasPublicas: ConatelPoliticaPublicaRow[];
  };
}
