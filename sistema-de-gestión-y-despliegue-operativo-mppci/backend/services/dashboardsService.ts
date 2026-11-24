import crypto from 'node:crypto';
import { SqliteStore } from '../db/sqliteStore';
import { MerkleService } from './merkleService';

export class DashboardsService {
  /**
   * Obtiene la vista Ciberdefensa desde SQLite
   */
  static getCiberdefensa() {
    const store = SqliteStore.getCentralStore();
    return {
      success: true,
      timestamp: new Date().toISOString(),
      ...store.ciberdefensa
    };
  }

  /**
   * Registra una nueva amenaza viral en Ciberdefensa
   */
  static registrarAmenaza(data: {
    titulo?: string;
    tematica?: string;
    nivelRiesgo?: string;
    origenPlataforma?: string;
    impactoEstimadoVistas?: number;
    volumenMenciones?: number;
    estadoAfectado?: string;
    municipioAfectado?: string;
  }) {
    const store = SqliteStore.getCentralStore();
    const id = `AMZ-2026-${String(store.ciberdefensa.amenazas.length + 1).padStart(3, '0')}`;

    const nuevaAmenaza = {
      id,
      codigo: 'DA-01',
      titulo: data.titulo || 'Amenaza Viral Registrada por Monitoreo',
      tematica: data.tematica || 'POLITICA',
      nivelRiesgo: data.nivelRiesgo || 'ALTO',
      origenPlataforma: data.origenPlataforma || 'X',
      impactoEstimadoVistas: Number(data.impactoEstimadoVistas) || 50000,
      volumenMenciones: Number(data.volumenMenciones) || 1200,
      estadoAfectado: data.estadoAfectado || 'Distrito Capital',
      municipioAfectado: data.municipioAfectado || 'Libertador',
      coordenadas: [10.4806, -66.9036],
      estadoNeutralizacion: 'EN_ANALISIS',
      horaDeteccion: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
      tiempoRespuestaMinutos: 15
    };

    store.ciberdefensa.amenazas.unshift(nuevaAmenaza);
    store.ciberdefensa.resumen.amenazasActivas++;
    if (data.nivelRiesgo === 'CRITICO') store.ciberdefensa.resumen.amenazasCriticas++;

    SqliteStore.saveCentralStore(store);
    return nuevaAmenaza;
  }

  /**
   * Aprueba una contranarrativa oficial
   */
  static aprobarContranarrativa(amenazaId: string, contranarrativa: string, aprobadorNombre?: string, cargo?: string) {
    const store = SqliteStore.getCentralStore();
    const amz = store.ciberdefensa.amenazas.find((a: any) => a.id === amenazaId);
    if (!amz) return null;

    amz.estadoNeutralizacion = 'CONTRANARRATIVA_EN_DESPLIEGUE';
    amz.contranarrativaActiva = contranarrativa || 'Contranarrativa oficial aprobada para despliegue por la máxima autoridad rectora.';

    SqliteStore.saveCentralStore(store);
    return {
      amenazaId,
      timestamp: new Date().toISOString(),
      aprobadoPor: `${aprobadorNombre || 'Viceministro'} (${cargo || 'Rol A'})`,
      mensaje: `Contranarrativa aprobada y puesta en despliegue institucional para ${amenazaId}.`
    };
  }

  /**
   * Marca una amenaza como neutralizada
   */
  static neutralizarAmenaza(amenazaId: string) {
    const store = SqliteStore.getCentralStore();
    const amz = store.ciberdefensa.amenazas.find((a: any) => a.id === amenazaId);
    if (amz) {
      amz.estadoNeutralizacion = 'NEUTRALIZADA';
      if (store.ciberdefensa.resumen.amenazasActivas > 0) {
        store.ciberdefensa.resumen.amenazasActivas--;
      }
      SqliteStore.saveCentralStore(store);
    }
    return {
      amenazaId,
      timestamp: new Date().toISOString(),
      mensaje: `Amenaza ${amenazaId} declarada formalmente como NEUTRALIZADA.`
    };
  }

  /**
   * Obtiene la vista de NOC
   */
  static getNoc() {
    const store = SqliteStore.getCentralStore();
    return {
      success: true,
      timestamp: new Date().toISOString(),
      ...store.noc
    };
  }

  /**
   * Reporta o actualiza una incidencia NOC
   */
  static reportarIncidenciaNoc(data: {
    estacion?: string;
    estado?: string;
    tipoFalla?: string;
    cuadrillaAsignada?: string;
    mttrMinutos?: number;
    accion?: string;
  }) {
    const store = SqliteStore.getCentralStore();

    if (data.accion === 'RESOLVER') {
      const target = store.noc.timelineMTTR.find((inc: any) => inc.estacion.includes(data.estacion || ''));
      if (target) {
        target.estatus = 'RESUELTO';
        target.horaRecuperacion = new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });
        SqliteStore.saveCentralStore(store);
      }
      return { success: true, mensaje: `Incidencia en ${data.estacion} marcada como RESUELTA.` };
    }

    const id = `INC-2026-${String(store.noc.timelineMTTR.length + 441)}`;
    const nuevaIncidencia = {
      id,
      estacion: data.estacion || 'Torre Estratégica',
      estado: data.estado || 'Carabobo',
      horaFalla: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
      mttrMinutos: Number(data.mttrMinutos) || 90,
      tipoFalla: data.tipoFalla || 'ENERGIA',
      cuadrillaAsignada: data.cuadrillaAsignada || 'Cuadrilla de Respuesta Rápida REDTV',
      estatus: 'EN_ATENCION'
    };

    store.noc.timelineMTTR.unshift(nuevaIncidencia);
    SqliteStore.saveCentralStore(store);
    return {
      success: true,
      incidencia: nuevaIncidencia,
      mensaje: `Incidencia ${id} registrada en el centro de telemetría NOC.`
    };
  }

  /**
   * Obtiene el dashboard Digital
   */
  static getDigital() {
    const store = SqliteStore.getCentralStore();
    return {
      success: true,
      timestamp: new Date().toISOString(),
      ...store.digital
    };
  }

  /**
   * Obtiene el dashboard de Medios
   */
  static getMedios() {
    const store = SqliteStore.getCentralStore();
    return {
      success: true,
      timestamp: new Date().toISOString(),
      ...store.medios
    };
  }

  /**
   * Registra producción en el Muro Eje 1
   */
  static registrarProduccionMedios(tipo: string, cantidad: number, enteEmisor?: string) {
    const store = SqliteStore.getCentralStore();
    const item = store.medios.muroProduccion.find((p: any) => p.tipo === tipo);
    if (item) {
      item.cantidadDia += Number(cantidad) || 1;
      if (enteEmisor) item.enteEmisor = enteEmisor;
      store.medios.resumen.totalPiezasProducidasHoy += Number(cantidad) || 1;
      SqliteStore.saveCentralStore(store);
    }
    return {
      item,
      totalHoy: store.medios.resumen.totalPiezasProducidasHoy
    };
  }

  /**
   * Obtiene el dashboard C-Level Ejecutivo
   */
  static getCLevel() {
    const store = SqliteStore.getCentralStore();
    return {
      success: true,
      timestamp: new Date().toISOString(),
      ...store.cLevel
    };
  }

  /**
   * Sincronización bidireccional desde reportes de captura
   */
  static syncDashboards(report: any, criticalTowers?: any[], opinionAlerts?: any[]) {
    const store = SqliteStore.getCentralStore();
    const kpis = report.kpisCalculados || {};

    // 1. C-Level
    store.cLevel.resumenEjecutivo.semanaEpidemiologica = report.control?.semanaEpidemiologica || 35;
    store.cLevel.resumenEjecutivo.fechaCorte = report.control?.fechaReporte || new Date().toLocaleDateString('es-VE');

    store.cLevel.macroIndicadores = store.cLevel.macroIndicadores.map((m: any) => {
      if (m.codigo === 'IEC' && kpis.iec !== undefined) m.valor = kpis.iec;
      if (m.codigo === 'IRT' && kpis.irt !== undefined) m.valor = kpis.irt;
      if (m.codigo === 'ICD' && kpis.icd !== undefined) m.valor = kpis.icd;
      if (m.codigo === 'EE' && kpis.ee !== undefined) m.valor = kpis.ee;
      if (m.codigo === 'IVI' && kpis.ivi !== undefined) m.valor = kpis.ivi;
      return m;
    });

    // 2. Ciberdefensa
    if (Array.isArray(opinionAlerts) && opinionAlerts.length > 0) {
      store.ciberdefensa.resumen.amenazasActivas = opinionAlerts.filter((a: any) => a.estado !== 'NEUTRALIZADA').length;
      store.ciberdefensa.resumen.amenazasCriticas = opinionAlerts.filter((a: any) => a.severidad === 'CRITICA' || a.nivelRiesgo === 'CRITICO').length;
    }

    // 3. NOC
    if (report.plataformasData?.redtv) {
      const redtv = report.plataformasData.redtv;
      if (redtv.operatividadTdaNacional !== undefined) {
        store.noc.resumen.operatividadNacionalTDA = redtv.operatividadTdaNacional;
      }
      if (redtv.enlaceSatelitalKu !== undefined) {
        store.noc.resumen.disponibilidadSatelitalGlobal = redtv.enlaceSatelitalKu;
        store.noc.estabilidadMaster.disponibilidadSatelitalKu = redtv.enlaceSatelitalKu;
      }
    }

    // 4. Medios
    if (report.mediosData) {
      const med = report.mediosData;
      let totalHoy = 0;

      if (med.television && med.television.pasesEnVivoCampo !== undefined) {
        store.medios.resumen.pasesEnVivoHoy = med.television.pasesEnVivoCampo;
        const pasesItem = store.medios.muroProduccion.find((item: any) => item.tipo === 'AUDIOVISUAL_PASES_EN_VIVO');
        if (pasesItem) pasesItem.cantidadDia = med.television.pasesEnVivoCampo;
      }

      if (med.impresos && med.impresos.notasPrensaImpresas !== undefined) {
        const notasItem = store.medios.muroProduccion.find((item: any) => item.tipo === 'ESCRITO_NOTAS_PRENSA');
        if (notasItem) notasItem.cantidadDia = med.impresos.notasPrensaImpresas;
      }

      store.medios.muroProduccion.forEach((item: any) => {
        totalHoy += item.cantidadDia || 0;
      });
      store.medios.resumen.totalPiezasProducidasHoy = totalHoy;
    }

    SqliteStore.saveCentralStore(store);
    return {
      success: true,
      timestamp: new Date().toISOString(),
      mensaje: 'Sincronización persistida en SQLite completada exitosamente.',
      iecActual: kpis.iec || 84.2
    };
  }

  /**
   * Refrendo Ministerial y generación de Sello Criptográfico Inmutable
   */
  static refrendoMinisterial(data: {
    ministroNombre?: string;
    cedula?: string;
    cargo?: string;
    observaciones?: string;
  }) {
    const store = SqliteStore.getCentralStore();
    const iecMacro = store.cLevel.macroIndicadores.find((m: any) => m.codigo === 'IEC')?.valor || 84.2;
    const irtMacro = store.cLevel.macroIndicadores.find((m: any) => m.codigo === 'IRT')?.valor || 96.1;
    const icdMacro = store.cLevel.macroIndicadores.find((m: any) => m.codigo === 'ICD')?.valor || 72.8;
    const eeMacro = store.cLevel.macroIndicadores.find((m: any) => m.codigo === 'EE')?.valor || 8.7;
    const semana = store.cLevel.resumenEjecutivo.semanaEpidemiologica || 35;

    const timestamp = new Date().toISOString();
    const canonicalPayload = `SEMANA-${semana}|IEC-${iecMacro}|IRT-${irtMacro}|ICD-${icdMacro}|EE-${eeMacro}|TIME-${timestamp}|CED-${data.cedula || 'V-11029384'}`;

    const hashHex = crypto.createHash('sha256').update(canonicalPayload).digest('hex').toUpperCase();
    const shortHash = hashHex.substring(0, 8);
    const timeBase36 = Date.now().toString(36).toUpperCase();
    const officialSealId = `MPPCI-AUTH-${shortHash}-${timeBase36}`;

    // Merkle Root computada bajo RFC 6962 sobre los macroindicadores sellados
    const leavesData = [
      `IEC:${iecMacro}`,
      `IRT:${irtMacro}`,
      `ICD:${icdMacro}`,
      `EE:${eeMacro}`
    ];
    const tree = MerkleService.buildTree(leavesData);
    const merkleRoot = tree.root;

    const selloData = {
      selloId: officialSealId,
      hashCompletoSha256: hashHex,
      merkleRoot,
      timestamp,
      semanaEpidemiologica: semana,
      ministro: data.ministroNombre || 'Ministro del Poder Popular para la Comunicación e Información',
      cedula: data.cedula || 'V-11029384',
      cargo: data.cargo || 'Máxima Autoridad (Rol I / A)',
      observaciones: data.observaciones || 'Aprobado sin objeciones para distribución a Presidencia de la República.',
      estado: 'APROBADO_Y_SELLADO',
      kpisSellados: {
        iec: iecMacro,
        irt: irtMacro,
        icd: icdMacro,
        ee: eeMacro
      }
    };

    // Guardar inmutablemente en SQLite
    SqliteStore.addSelloCriptografico(selloData);

    return {
      success: true,
      sello: selloData,
      mensaje: `Corte semanal N° ${semana} refrendado con firma ministerial inmutable ${officialSealId}.`
    };
  }

  /**
   * Obtiene la cadena histórica de sellos criptográficos
   */
  static getSellosHistoricos() {
    const sellos = SqliteStore.getSellosCriptograficos();
    return {
      success: true,
      total: sellos.length,
      sellos
    };
  }
}
