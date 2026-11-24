import { Eje2InstrumentoData } from '../types/eje2Types';

export const INITIAL_EJE2_DATA: Eje2InstrumentoData = {
  redtv: {
    operatividadMedios: [
      { medioEnte: 'VTV', horasTransmision: 168, operatividadPorc: 99.2, estatusSenalServidoresPorc: 98.8, pasesEnVivoProduccion: 54, observaciones: 'Operatividad estable en red TDA y fibra óptica' },
      { medioEnte: 'RNV', horasTransmision: 168, operatividadPorc: 98.4, estatusSenalServidoresPorc: 97.5, pasesEnVivoProduccion: 42, observaciones: 'Emisiones continuas en Informativa, Clásica y Musical' },
      { medioEnte: 'Radio del Sur', horasTransmision: 168, operatividadPorc: 97.9, estatusSenalServidoresPorc: 96.0, pasesEnVivoProduccion: 28, observaciones: 'Enlace satelital internacional activo' },
      { medioEnte: 'Correo del Orinoco', horasTransmision: 168, operatividadPorc: 99.5, estatusSenalServidoresPorc: 99.1, pasesEnVivoProduccion: 16, observaciones: 'Servidores web y distribución digital sin cortes' },
      { medioEnte: 'Infantiles (123/Vive)', horasTransmision: 168, operatividadPorc: 98.0, estatusSenalServidoresPorc: 97.0, pasesEnVivoProduccion: 12, observaciones: 'Señal en canal TDA 25.04' },
      { medioEnte: 'Ávila TVE', horasTransmision: 168, operatividadPorc: 97.5, estatusSenalServidoresPorc: 96.8, pasesEnVivoProduccion: 20, observaciones: 'Producción juvenil y comunitaria en Caracas' },
      { medioEnte: 'YVKE Mundial', horasTransmision: 168, operatividadPorc: 98.7, estatusSenalServidoresPorc: 98.0, pasesEnVivoProduccion: 36, observaciones: 'Potencia AM/FM en Distrito Capital y Zulia' },
      { medioEnte: 'ViVe TV', horasTransmision: 168, operatividadPorc: 97.8, estatusSenalServidoresPorc: 96.5, pasesEnVivoProduccion: 24, observaciones: 'Enlace satelital comunitario activo' },
      { medioEnte: 'TVes', horasTransmision: 168, operatividadPorc: 98.9, estatusSenalServidoresPorc: 98.2, pasesEnVivoProduccion: 30, observaciones: 'Programación nacional y deportiva' },
      { medioEnte: 'Telesur', horasTransmision: 168, operatividadPorc: 99.8, estatusSenalServidoresPorc: 99.5, pasesEnVivoProduccion: 68, observaciones: 'Transmisión multiplataforma HD global' }
    ],
    monitoreoTda: [
      { codigo: 'RTV-001', indicador: '% de Operatividad Nacional TDA', valor: 98.2, meta: 98.0, cumplimientoPorc: 100.2 },
      { codigo: 'RTV-002', indicador: 'N° de Servicios de TV activos', valor: 16, totalRef: 16, meta: 16, cumplimientoPorc: 100.0 },
      { codigo: 'RTV-003', indicador: 'N° de Servicios de Radio activos', valor: 12, totalRef: 12, meta: 12, cumplimientoPorc: 100.0 },
      { codigo: 'RTV-004', indicador: 'Estaciones TDA operativas', valor: 23, totalRef: 25, meta: 25, cumplimientoPorc: 92.0 },
      { codigo: 'RTV-005', indicador: '% de cobertura geográfica TDA', valor: 68.5, meta: 70.0, cumplimientoPorc: 97.9 }
    ],
    infraestructuraSatelital: [
      { codigo: 'RTV-006', indicador: '% de Potencia Banda Ku (Satelital)', valor: 94.8, unidad: '%', observaciones: 'Telepuerto El Sombrero con enlace estable' },
      { codigo: 'RTV-007', indicador: 'N° de Canales Satelitales Reactivados', valor: 3, unidad: 'Canales', observaciones: 'Reincorporación de señales regionales al mux' },
      { codigo: 'RTV-008', indicador: 'Canales satelitales totales operativos', valor: 18, totalRef: 18, unidad: 'Canales', observaciones: '100% de la grilla satelital pública activa' },
      { codigo: 'RTV-009', indicador: '% de disponibilidad de enlace satelital', valor: 99.6, unidad: '%', observaciones: 'Transpondedores en órbita geoestacionaria' },
      { codigo: 'RTV-010', indicador: 'Tiempo de caída de señal satelital (min)', valor: 18, unidad: 'min', observaciones: 'Mantenimiento preventivo en Guárico' }
    ],
    torresCriticas: [
      { infraestructura: 'Torre Maracaibo', ubicacion: 'Zulia', estatus: 'OPERATIVA', observaciones: 'Operando con planta eléctrica auxiliar por racionamiento' },
      { infraestructura: 'Estación Mecedores', ubicacion: 'Caracas', estatus: 'OPERATIVA', observaciones: 'Nodo central maestro sin fallas en transmisores TDA' },
      { infraestructura: 'Torre Puerto Cabello', ubicacion: 'Carabobo', estatus: 'ALERTA', observaciones: 'Revisión preventiva de balizaje y aterramiento' },
      { infraestructura: 'Torre Valencia', ubicacion: 'Carabobo', estatus: 'OPERATIVA', observaciones: 'Potencia normal al 100%' },
      { infraestructura: 'Torre Barquisimeto', ubicacion: 'Lara', estatus: 'OPERATIVA', observaciones: 'Enlace microondas alineado con El Tocuyo' },
      { infraestructura: 'Torre Maturín', ubicacion: 'Monagas', estatus: 'OPERATIVA', observaciones: 'Señal TDA y FM operando en estándares óptimos' },
      { infraestructura: 'Torre San Cristóbal', ubicacion: 'Táchira', estatus: 'ALERTA', observaciones: 'Fluctuación eléctrica atendida con banco de baterías' }
    ],
    transmisoresEquipamiento: [
      { codigo: 'RTV-011', indicador: 'Transmisores de TV operativos', operativos: 28, total: 30, observaciones: '2 en calibración de válvulas y filtros' },
      { codigo: 'RTV-012', indicador: 'Transmisores de Radio operativos', operativos: 44, total: 46, observaciones: 'Cobertura nacional en AM/FM' },
      { codigo: 'RTV-013', indicador: 'Enlaces de microondas operativos', operativos: 36, total: 38, observaciones: 'Enlaces punto a punto redundantes' },
      { codigo: 'RTV-014', indicador: 'Plantas de energía de respaldo', operativos: 24, total: 26, observaciones: 'Mantenimiento de generadores diésel' },
      { codigo: 'RTV-015', indicador: '% de capacidad de transmisión disponible', operativos: 94, total: 100, observaciones: 'Reserva de potencia técnica lista ante emergencias' }
    ],
    coberturaRegiones: [
      { region: 'Distrito Capital', coberturaTdaPorc: 98.5, coberturaFmAmPorc: 99.0, coberturaTvAbiertaPorc: 99.2, estacionesAfectadas: 0 },
      { region: 'Amazonas', coberturaTdaPorc: 62.0, coberturaFmAmPorc: 75.0, coberturaTvAbiertaPorc: 72.0, estacionesAfectadas: 0 },
      { region: 'Anzoátegui', coberturaTdaPorc: 85.0, coberturaFmAmPorc: 91.0, coberturaTvAbiertaPorc: 90.0, estacionesAfectadas: 0 },
      { region: 'Apure', coberturaTdaPorc: 68.0, coberturaFmAmPorc: 80.0, coberturaTvAbiertaPorc: 78.0, estacionesAfectadas: 0 },
      { region: 'Aragua', coberturaTdaPorc: 86.5, coberturaFmAmPorc: 90.0, coberturaTvAbiertaPorc: 90.0, estacionesAfectadas: 0 },
      { region: 'Barinas', coberturaTdaPorc: 76.0, coberturaFmAmPorc: 83.5, coberturaTvAbiertaPorc: 81.0, estacionesAfectadas: 0 },
      { region: 'Bolívar', coberturaTdaPorc: 74.0, coberturaFmAmPorc: 82.0, coberturaTvAbiertaPorc: 80.0, estacionesAfectadas: 0 },
      { region: 'Carabobo', coberturaTdaPorc: 88.0, coberturaFmAmPorc: 92.0, coberturaTvAbiertaPorc: 91.5, estacionesAfectadas: 1 },
      { region: 'Cojedes', coberturaTdaPorc: 78.5, coberturaFmAmPorc: 86.0, coberturaTvAbiertaPorc: 84.0, estacionesAfectadas: 0 },
      { region: 'Delta Amacuro', coberturaTdaPorc: 60.0, coberturaFmAmPorc: 74.0, coberturaTvAbiertaPorc: 70.0, estacionesAfectadas: 0 },
      { region: 'Falcón', coberturaTdaPorc: 80.0, coberturaFmAmPorc: 86.0, coberturaTvAbiertaPorc: 85.0, estacionesAfectadas: 0 },
      { region: 'Guárico', coberturaTdaPorc: 74.5, coberturaFmAmPorc: 83.0, coberturaTvAbiertaPorc: 82.0, estacionesAfectadas: 0 },
      { region: 'La Guaira', coberturaTdaPorc: 92.0, coberturaFmAmPorc: 95.0, coberturaTvAbiertaPorc: 96.0, estacionesAfectadas: 0 },
      { region: 'Lara', coberturaTdaPorc: 86.0, coberturaFmAmPorc: 91.0, coberturaTvAbiertaPorc: 89.0, estacionesAfectadas: 0 },
      { region: 'Mérida', coberturaTdaPorc: 75.0, coberturaFmAmPorc: 84.0, coberturaTvAbiertaPorc: 82.0, estacionesAfectadas: 0 },
      { region: 'Miranda', coberturaTdaPorc: 90.5, coberturaFmAmPorc: 94.2, coberturaTvAbiertaPorc: 95.0, estacionesAfectadas: 0 },
      { region: 'Monagas', coberturaTdaPorc: 83.0, coberturaFmAmPorc: 89.0, coberturaTvAbiertaPorc: 88.0, estacionesAfectadas: 0 },
      { region: 'Nueva Esparta', coberturaTdaPorc: 88.0, coberturaFmAmPorc: 93.0, coberturaTvAbiertaPorc: 92.0, estacionesAfectadas: 0 },
      { region: 'Portuguesa', coberturaTdaPorc: 79.0, coberturaFmAmPorc: 87.0, coberturaTvAbiertaPorc: 85.0, estacionesAfectadas: 0 },
      { region: 'Sucre', coberturaTdaPorc: 79.0, coberturaFmAmPorc: 85.0, coberturaTvAbiertaPorc: 83.0, estacionesAfectadas: 0 },
      { region: 'Táchira', coberturaTdaPorc: 78.0, coberturaFmAmPorc: 85.0, coberturaTvAbiertaPorc: 84.0, estacionesAfectadas: 1 },
      { region: 'Trujillo', coberturaTdaPorc: 76.5, coberturaFmAmPorc: 84.0, coberturaTvAbiertaPorc: 82.5, estacionesAfectadas: 0 },
      { region: 'Yaracuy', coberturaTdaPorc: 82.0, coberturaFmAmPorc: 88.5, coberturaTvAbiertaPorc: 87.0, estacionesAfectadas: 0 },
      { region: 'Zulia', coberturaTdaPorc: 82.0, coberturaFmAmPorc: 88.0, coberturaTvAbiertaPorc: 87.0, estacionesAfectadas: 1 },
      { region: 'Dependencias Federales', coberturaTdaPorc: 65.0, coberturaFmAmPorc: 78.0, coberturaTvAbiertaPorc: 75.0, estacionesAfectadas: 0 }
    ]
  },
  conatel: {
    monitoreoRegulatorio: [
      { codigo: 'CON-001', indicador: 'Reportes de primeras planas (agenda regulatoria)', valor: 24, varSemanaAnteriorPorc: 4.3, observaciones: 'Análisis de matrices de prensa nacional' },
      { codigo: 'CON-002', indicador: 'Concesiones de radio y televisión otorgadas', valor: 8, varSemanaAnteriorPorc: 0.0, observaciones: 'Procesos de renovación y habilitación' },
      { codigo: 'CON-003', indicador: 'Habilitaciones administrativas procesadas', valor: 15, varSemanaAnteriorPorc: 7.1, observaciones: 'Servicios de telecomunicaciones e internet' },
      { codigo: 'CON-004', indicador: 'Homologaciones de equipos realizadas', valor: 32, varSemanaAnteriorPorc: 10.3, observaciones: 'Certificación técnica de transceptores y routers' },
      { codigo: 'CON-005', indicador: 'Inspecciones técnicas realizadas', valor: 19, varSemanaAnteriorPorc: -5.0, observaciones: 'Fiscalizaciones in situ a radioeléctricos' },
      { codigo: 'CON-006', indicador: 'Multas y sanciones aplicadas', valor: 3, varSemanaAnteriorPorc: 0.0, observaciones: 'Sanciones por uso indebido de frecuencias' },
      { codigo: 'CON-007', indicador: 'Consultas públicas de providencias', valor: 2, varSemanaAnteriorPorc: 0.0, observaciones: 'Borradores de normas técnicas para 5G' },
      { codigo: 'CON-008', indicador: 'Denuncias de interferencia procesadas', valor: 11, varSemanaAnteriorPorc: -15.4, observaciones: 'Atención a reportes de operadores en VHF' }
    ],
    monitoreoEspectro: [
      { codigo: 'CON-009', indicador: 'Estaciones de monitoreo operativas', valor: 18, totalRef: 20, observaciones: 'Estaciones fijas y móviles de radiolocalización' },
      { codigo: 'CON-010', indicador: '% de espectro radioeléctrico monitoreado', valor: 89.5, observaciones: 'Supervisión en bandas críticas aeronáuticas y broadcast' },
      { codigo: 'CON-011', indicador: 'Interferencias detectadas', valor: 7, observaciones: '4 resueltas de inmediato, 3 en mitigación técnica' },
      { codigo: 'CON-012', indicador: 'Operadores irregulares identificados', valor: 4, observaciones: 'Transmisiones clandestinas notificadas a fiscalía' },
      { codigo: 'CON-013', indicador: 'Servicios de telecomunicaciones afectados', valor: 2, observaciones: 'Canales locales con modulación corregida' }
    ],
    cumplimientoResorte: [
      { codigo: 'CON-014', indicador: 'Medios monitoreados por cumplimiento de cuotas', valor: 85, observaciones: 'Supervisión de emisoras y canales nacionales' },
      { codigo: 'CON-015', indicador: '% de cumplimiento de contenido nacional', valor: 78.4, observaciones: 'PNI cumple umbral estipulado en Ley Resorte' },
      { codigo: 'CON-016', indicador: '% de cumplimiento de contenido educativo', valor: 24.2, observaciones: 'Franja educativa y cultural respetada' },
      { codigo: 'CON-017', indicador: '% de cumplimiento de franja infantil', valor: 22.8, observaciones: 'Horario todo usuario protegido' },
      { codigo: 'CON-018', indicador: 'Reportes de contenido emitidos', valor: 42, observaciones: 'Informes técnicos de fiscalización audiovisual' }
    ],
    tramitesSigestel: [
      { codigo: 'CON-019', tramite: 'Concesiones', solicitudesRecibidas: 12, solicitudesProcesadas: 10, tiempoPromedioDias: 14 },
      { codigo: 'CON-020', tramite: 'Habilitaciones', solicitudesRecibidas: 18, solicitudesProcesadas: 16, tiempoPromedioDias: 8 },
      { codigo: 'CON-021', tramite: 'Homologaciones', solicitudesRecibidas: 35, solicitudesProcesadas: 32, tiempoPromedioDias: 5 },
      { codigo: 'CON-022', tramite: 'Visas / Permisos', solicitudesRecibidas: 8, solicitudesProcesadas: 8, tiempoPromedioDias: 3 },
      { codigo: 'CON-023', tramite: 'Registro de operadores', solicitudesRecibidas: 22, solicitudesProcesadas: 20, tiempoPromedioDias: 6 },
      { codigo: 'CON-024', tramite: 'Certificaciones técnicas', solicitudesRecibidas: 14, solicitudesProcesadas: 13, tiempoPromedioDias: 7 },
      { codigo: 'CON-025', tramite: 'Recursos y apelaciones', solicitudesRecibidas: 5, solicitudesProcesadas: 4, tiempoPromedioDias: 18 }
    ],
    incidentesContingencias: [
      { tipoIncidente: 'Caídas de servicio', numReportes: 14, resolucionPorc: 92.8, tiempoPromedioHoras: 4.2 },
      { tipoIncidente: 'Interferencias', numReportes: 8, resolucionPorc: 87.5, tiempoPromedioHoras: 6.5 },
      { tipoIncidente: 'Afectaciones a infraestructura', numReportes: 5, resolucionPorc: 80.0, tiempoPromedioHoras: 12.0 },
      { tipoIncidente: 'Ciberataques', numReportes: 3, resolucionPorc: 100.0, tiempoPromedioHoras: 1.8 },
      { tipoIncidente: 'Solicitudes de emergencia', numReportes: 9, resolucionPorc: 100.0, tiempoPromedioHoras: 0.8 },
      { tipoIncidente: 'Reportes ciudadanos', numReportes: 45, resolucionPorc: 95.5, tiempoPromedioHoras: 3.5 }
    ],
    politicasPublicas: [
      { tema: 'Providencias administrativas', documentosPublicados: 2, fecha: '2026-09-15', observaciones: 'Actualización del cuadro nacional de atribución de bandas (CNAF)' },
      { tema: 'Resoluciones', documentosPublicados: 1, fecha: '2026-09-17', observaciones: 'Tarifas tope para enlaces troncalizados de emergencia' },
      { tema: 'Consultas públicas', documentosPublicados: 1, fecha: '2026-09-18', observaciones: 'Convocatoria abierta para operadores de fibra óptica comunal' },
      { tema: 'Informes técnicos', documentosPublicados: 4, fecha: '2026-09-19', observaciones: 'Balance semestral de calidad de servicio y resiliencia en contingencia' }
    ]
  }
};
