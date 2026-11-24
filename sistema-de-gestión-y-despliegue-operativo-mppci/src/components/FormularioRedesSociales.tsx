import React, { useState } from 'react';
import { 
  Share2, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Download, 
  Calculator, 
  Sparkles, 
  Building2, 
  Calendar, 
  UserCheck, 
  AlertCircle, 
  Activity, 
  BarChart2, 
  Users, 
  Video, 
  MessageSquare, 
  Radio, 
  ShieldAlert, 
  Flame, 
  Plus, 
  Trash2,
  TrendingUp,
  FileSpreadsheet,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  ShieldCheck
} from 'lucide-react';
import { 
  RedesRowKpisCanales, 
  RedesRowAlcanceAudiencia, 
  RedesRowProduccionTactica, 
  RedesRowEntrevista, 
  RedesRowCreadores, 
  RedesRowCanalActivo, 
  RedesRowEngagementContenido,
  FullWeeklyReport, 
  MediaOperationalData, 
  UserAccount, 
  RACIRole 
} from '../types';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from '../utils/engine';

interface FormularioRedesSocialesProps {
  initialKpisCanales?: RedesRowKpisCanales[];
  initialAlcanceAudiencia?: RedesRowAlcanceAudiencia[];
  initialProduccionTactica?: RedesRowProduccionTactica[];
  initialEntrevistas?: RedesRowEntrevista[];
  initialCreadoresAliados?: RedesRowCreadores[];
  initialCanalesActivos?: RedesRowCanalActivo[];
  initialEngagementPorContenido?: RedesRowEngagementContenido[];
  mediosData?: MediaOperationalData;
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onSuccessSave?: (message: string) => void;
}

const DEFAULT_KPIS_CANALES: RedesRowKpisCanales[] = [
  {
    plataforma: 'Facebook',
    metaSemanalVistas: 450000,
    vistasLogradas: 485000,
    varSemanaAnterior: 7.7,
    interaccionesTotales: 34200,
    impresionesNetas: 620000,
    tasaEngagement: 7.05
  },
  {
    plataforma: 'Instagram',
    metaSemanalVistas: 650000,
    vistasLogradas: 720000,
    varSemanaAnterior: 10.7,
    interaccionesTotales: 68400,
    impresionesNetas: 950000,
    tasaEngagement: 9.50
  },
  {
    plataforma: 'TikTok',
    metaSemanalVistas: 900000,
    vistasLogradas: 1120000,
    varSemanaAnterior: 24.4,
    interaccionesTotales: 135000,
    impresionesNetas: 1450000,
    tasaEngagement: 12.05
  },
  {
    plataforma: 'X (Twitter)',
    metaSemanalVistas: 550000,
    vistasLogradas: 580000,
    varSemanaAnterior: 5.4,
    interaccionesTotales: 49300,
    impresionesNetas: 820000,
    tasaEngagement: 8.50
  },
  {
    plataforma: 'YouTube',
    metaSemanalVistas: 350000,
    vistasLogradas: 390000,
    varSemanaAnterior: 11.4,
    interaccionesTotales: 29250,
    impresionesNetas: 510000,
    tasaEngagement: 7.50
  },
  {
    plataforma: 'Threads',
    metaSemanalVistas: 120000,
    vistasLogradas: 135000,
    varSemanaAnterior: 12.5,
    interaccionesTotales: 9450,
    impresionesNetas: 175000,
    tasaEngagement: 7.00
  },
  {
    plataforma: 'WhatsApp / Telegram',
    metaSemanalVistas: 280000,
    vistasLogradas: 310000,
    varSemanaAnterior: 10.7,
    interaccionesTotales: 27900,
    impresionesNetas: 380000,
    tasaEngagement: 9.00
  }
];

const DEFAULT_ALCANCE_AUDIENCIA: RedesRowAlcanceAudiencia[] = [
  {
    plataforma: 'Facebook',
    seguidoresTotales: 850000,
    nuevosSeguidores: 4200,
    crecimientoPorc: 0.5,
    alcanceOrganico: 390000,
    alcancePagado: 95000
  },
  {
    plataforma: 'Instagram',
    seguidoresTotales: 1200000,
    nuevosSeguidores: 14500,
    crecimientoPorc: 1.2,
    alcanceOrganico: 580000,
    alcancePagado: 140000
  },
  {
    plataforma: 'TikTok',
    seguidoresTotales: 980000,
    nuevosSeguidores: 28400,
    crecimientoPorc: 2.9,
    alcanceOrganico: 950000,
    alcancePagado: 170000
  },
  {
    plataforma: 'X (Twitter)',
    seguidoresTotales: 1450000,
    nuevosSeguidores: 8200,
    crecimientoPorc: 0.6,
    alcanceOrganico: 510000,
    alcancePagado: 70000
  },
  {
    plataforma: 'YouTube',
    seguidoresTotales: 420000,
    nuevosSeguidores: 5600,
    crecimientoPorc: 1.3,
    alcanceOrganico: 340000,
    alcancePagado: 50000
  },
  {
    plataforma: 'Threads',
    seguidoresTotales: 110000,
    nuevosSeguidores: 3800,
    crecimientoPorc: 3.5,
    alcanceOrganico: 115000,
    alcancePagado: 20000
  },
  {
    plataforma: 'WhatsApp / Telegram',
    seguidoresTotales: 340000,
    nuevosSeguidores: 12100,
    crecimientoPorc: 3.6,
    alcanceOrganico: 310000,
    alcancePagado: 0
  }
];

const DEFAULT_PRODUCCION_TACTICA: RedesRowProduccionTactica[] = [
  {
    codigo: 'RED-001',
    tipoContenido: 'Contenido total publicado',
    unidades: 845,
    observaciones: 'Volumen total consolidado en todas las cuentas oficiales'
  },
  {
    codigo: 'RED-002',
    tipoContenido: 'Formato video (Reels/TikTok/Shorts)',
    unidades: 260,
    observaciones: 'Formatos verticales optimizados para alta retención'
  },
  {
    codigo: 'RED-004',
    tipoContenido: 'Formato publicación (imagen/texto) / Formato estático (Infografías, flyers, carruseles)',
    unidades: 450,
    observaciones: 'Notas de prensa, comunicados, flyers y carruseles educativos'
  },
  {
    codigo: 'RED-005',
    tipoContenido: 'Contenido radial digitalizado',
    unidades: 65,
    observaciones: 'Cortes en onda sonora de programas de RNV y YVKE'
  },
  {
    codigo: 'RED-006',
    tipoContenido: 'Pases en vivo',
    unidades: 38,
    observaciones: 'Transmisiones en vivo por YouTube, TikTok y X'
  },
  {
    codigo: 'RED-007',
    tipoContenido: 'Producción propia',
    unidades: 620,
    observaciones: '73.3% generado internamente por equipos del SNMP'
  },
  {
    codigo: 'RED-008',
    tipoContenido: 'Cobertura en campamentos transitorios',
    unidades: 24,
    observaciones: 'Monitoreo humanitario y atención médica integral'
  },
  {
    codigo: 'RED-009',
    tipoContenido: 'Cobertura en operaciones de rescate',
    unidades: 18,
    observaciones: 'Despliegue conjunto con FANB y Protección Civil'
  },
  {
    codigo: 'RED-010',
    tipoContenido: 'Piezas pautadas (Ley Resorte)',
    unidades: 42,
    observaciones: 'Difusión de mensajes cívicos y prevención de desastres'
  },
  {
    codigo: 'RED-011',
    tipoContenido: 'Investigaciones especiales',
    unidades: 12,
    observaciones: 'Verificación de hechos y combate a la desinformación'
  }
];

const DEFAULT_ENTREVISTAS: RedesRowEntrevista[] = [
  {
    tipoEntrevistado: 'Sobrevivientes',
    numEntrevistas: 14,
    plataformaPrincipal: 'TikTok / Instagram',
    alcanceEstimado: 420000
  },
  {
    tipoEntrevistado: 'Autoridades/Militares',
    numEntrevistas: 26,
    plataformaPrincipal: 'YouTube / X',
    alcanceEstimado: 890000
  },
  {
    tipoEntrevistado: 'Especialistas/Psicólogos',
    numEntrevistas: 18,
    plataformaPrincipal: 'Instagram / WhatsApp',
    alcanceEstimado: 340000
  },
  {
    tipoEntrevistado: 'Ingenieros/Estructuristas',
    numEntrevistas: 12,
    plataformaPrincipal: 'YouTube / X',
    alcanceEstimado: 280000
  },
  {
    tipoEntrevistado: 'Geólogos/Sismólogos',
    numEntrevistas: 15,
    plataformaPrincipal: 'YouTube / Podcasts',
    alcanceEstimado: 510000
  },
  {
    tipoEntrevistado: 'Epidemiólogos/Salud',
    numEntrevistas: 16,
    plataformaPrincipal: 'Instagram / TikTok',
    alcanceEstimado: 460000
  },
  {
    tipoEntrevistado: 'Voceros Comunitarios',
    numEntrevistas: 32,
    plataformaPrincipal: 'Facebook / Telegram',
    alcanceEstimado: 630000
  }
];

const DEFAULT_CREADORES: RedesRowCreadores[] = [
  {
    codigo: 'RED-012',
    indicador: 'Creadores activos',
    valor: 45,
    observaciones: 'Influencers y comunicadores digitales en red articulada'
  },
  {
    codigo: 'RED-013',
    indicador: 'Vistas generadas por difusión en redes aliadas',
    valor: 1850000,
    observaciones: 'Multiplicación orgánica mediante co-publicaciones y reposteos'
  },
  {
    codigo: 'RED-014',
    indicador: 'Articulación con medios privados',
    valor: 16,
    observaciones: 'Compartición de feeds de video institucional limpio'
  },
  {
    codigo: 'RED-015',
    indicador: 'Campañas colaborativas',
    valor: 8,
    observaciones: 'Campañas #PrevencionEsVida y #VenezuelaUnida'
  },
  {
    codigo: 'RED-016',
    indicador: 'Hashtags monitorizados',
    valor: 34,
    observaciones: 'Monitoreo de tendencias y detección de matrices de opinión'
  }
];

const DEFAULT_CANALES_ACTIVOS: RedesRowCanalActivo[] = [
  {
    canalCuenta: '@Mippcivzla',
    plataforma: 'X (Twitter)',
    seguidores: 1450000,
    crecimientoPorc: 0.6,
    contenidoDestacado: 'Minuto a minuto de medidas gubernamentales y comunicados'
  },
  {
    canalCuenta: '@MippciOficial',
    plataforma: 'Instagram',
    seguidores: 1200000,
    crecimientoPorc: 1.2,
    contenidoDestacado: 'Reels explicativos y carruseles de prevención'
  },
  {
    canalCuenta: '@MippciTik',
    plataforma: 'TikTok',
    seguidores: 980000,
    crecimientoPorc: 2.9,
    contenidoDestacado: 'Videos virales de recomendaciones ciudadanas'
  },
  {
    canalCuenta: 'MIPPCI Canal Oficial',
    plataforma: 'YouTube',
    seguidores: 420000,
    crecimientoPorc: 1.3,
    contenidoDestacado: 'Transmisiones en vivo HD y ruedas de prensa'
  },
  {
    canalCuenta: 'MIPPCI Informa',
    plataforma: 'Telegram',
    seguidores: 340000,
    crecimientoPorc: 3.6,
    contenidoDestacado: 'Alertas en tiempo real y descarga de infografías'
  }
];

const DEFAULT_ENGAGEMENT_CONTENIDO: RedesRowEngagementContenido[] = [
  {
    tipoContenido: 'Video Corto',
    publicaciones: 260,
    interacciones: 185000,
    comentarios: 18400,
    compartidos: 32500,
    guardados: 24100,
    eePromedio: 12.8
  },
  {
    tipoContenido: 'Video Largo',
    publicaciones: 45,
    interacciones: 32000,
    comentarios: 3800,
    compartidos: 5900,
    guardados: 4200,
    eePromedio: 8.2
  },
  {
    tipoContenido: 'Imagen/Foto',
    publicaciones: 220,
    interacciones: 48000,
    comentarios: 5200,
    compartidos: 8100,
    guardados: 6900,
    eePromedio: 6.9
  },
  {
    tipoContenido: 'Infografía',
    publicaciones: 90,
    interacciones: 39000,
    comentarios: 4100,
    compartidos: 14200,
    guardados: 16800,
    eePromedio: 9.8
  },
  {
    tipoContenido: 'Carrusel',
    publicaciones: 50,
    interacciones: 28500,
    comentarios: 3600,
    compartidos: 7400,
    guardados: 11200,
    eePromedio: 10.4
  },
  {
    tipoContenido: 'Enlace/Artículo',
    publicaciones: 140,
    interacciones: 14200,
    comentarios: 1800,
    compartidos: 3900,
    guardados: 1500,
    eePromedio: 4.8
  },
  {
    tipoContenido: 'Encuesta/Interacción',
    publicaciones: 40,
    interacciones: 35000,
    comentarios: 6800,
    compartidos: 2100,
    guardados: 950,
    eePromedio: 14.5
  }
];

export const FormularioRedesSociales: React.FC<FormularioRedesSocialesProps> = ({
  initialKpisCanales,
  initialAlcanceAudiencia,
  initialProduccionTactica,
  initialEntrevistas,
  initialCreadoresAliados,
  initialCanalesActivos,
  initialEngagementPorContenido,
  mediosData,
  report,
  onSaveReport,
  currentUser,
  currentRole,
  onSuccessSave
}) => {
  // State for the 7 sections
  const [kpisCanales, setKpisCanales] = useState<RedesRowKpisCanales[]>(() => {
    if (initialKpisCanales && initialKpisCanales.length > 0) return initialKpisCanales;
    if (report?.eje1Data?.redesSociales?.kpisCanales && report.eje1Data.redesSociales.kpisCanales.length > 0) {
      return report.eje1Data.redesSociales.kpisCanales;
    }
    return DEFAULT_KPIS_CANALES;
  });

  const [alcanceAudiencia, setAlcanceAudiencia] = useState<RedesRowAlcanceAudiencia[]>(() => {
    if (initialAlcanceAudiencia && initialAlcanceAudiencia.length > 0) return initialAlcanceAudiencia;
    if (report?.eje1Data?.redesSociales?.alcanceAudiencia && report.eje1Data.redesSociales.alcanceAudiencia.length > 0) {
      return report.eje1Data.redesSociales.alcanceAudiencia;
    }
    return DEFAULT_ALCANCE_AUDIENCIA;
  });

  const [produccionTactica, setProduccionTactica] = useState<RedesRowProduccionTactica[]>(() => {
    if (initialProduccionTactica && initialProduccionTactica.length > 0) return initialProduccionTactica;
    if (report?.eje1Data?.redesSociales?.produccionTactica && report.eje1Data.redesSociales.produccionTactica.length > 0) {
      return report.eje1Data.redesSociales.produccionTactica;
    }
    return DEFAULT_PRODUCCION_TACTICA;
  });

  const [entrevistas, setEntrevistas] = useState<RedesRowEntrevista[]>(() => {
    if (initialEntrevistas && initialEntrevistas.length > 0) return initialEntrevistas;
    if (report?.eje1Data?.redesSociales?.entrevistas && report.eje1Data.redesSociales.entrevistas.length > 0) {
      return report.eje1Data.redesSociales.entrevistas;
    }
    return DEFAULT_ENTREVISTAS;
  });

  const [creadoresAliados, setCreadoresAliados] = useState<RedesRowCreadores[]>(() => {
    if (initialCreadoresAliados && initialCreadoresAliados.length > 0) return initialCreadoresAliados;
    if (report?.eje1Data?.redesSociales?.creadoresAliados && report.eje1Data.redesSociales.creadoresAliados.length > 0) {
      return report.eje1Data.redesSociales.creadoresAliados;
    }
    return DEFAULT_CREADORES;
  });

  const [canalesActivos, setCanalesActivos] = useState<RedesRowCanalActivo[]>(() => {
    if (initialCanalesActivos && initialCanalesActivos.length > 0) return initialCanalesActivos;
    if (report?.eje1Data?.redesSociales?.canalesActivos && report.eje1Data.redesSociales.canalesActivos.length > 0) {
      return report.eje1Data.redesSociales.canalesActivos;
    }
    return DEFAULT_CANALES_ACTIVOS;
  });

  const [engagementPorContenido, setEngagementPorContenido] = useState<RedesRowEngagementContenido[]>(() => {
    if (initialEngagementPorContenido && initialEngagementPorContenido.length > 0) return initialEngagementPorContenido;
    if (report?.eje1Data?.redesSociales?.engagementPorContenido && report.eje1Data.redesSociales.engagementPorContenido.length > 0) {
      return report.eje1Data.redesSociales.engagementPorContenido;
    }
    return DEFAULT_ENGAGEMENT_CONTENIDO;
  });

  // Metadata controls
  const [enteInformante, setEnteInformante] = useState<string>(
    report?.control?.ente || 'Dirección General de Redes Sociales / MIPPCI'
  );
  const [responsableCarga, setResponsableCarga] = useState<string>(
    currentUser?.nombre || report?.control?.responsable || 'Lic. Alejandro Silva'
  );
  const [cedulaResponsable, setCedulaResponsable] = useState<string>(
    currentUser?.cedula || report?.control?.cedula || 'V-18.492.301'
  );
  const [semanaReporte, setSemanaReporte] = useState<string>(
    report?.control?.semana || 'Semana 38 - 2026'
  );
  const [fechaCorte, setFechaCorte] = useState<string>(
    report?.control?.fechaCorte || '2026-09-20'
  );

  // Subtab filtering
  const [subTab, setSubTab] = useState<
    'TODOS' | 'KPIS_CANALES' | 'AUDIENCIA' | 'TACTICA' | 'ENTREVISTAS' | 'CREADORES' | 'CANALES_ACTIVOS' | 'ENGAGEMENT'
  >('TODOS');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  // Totals for KPIs Canales
  const totalMetaVistas = kpisCanales.reduce((acc, c) => acc + (c.metaSemanalVistas || 0), 0);
  const totalVistasLogradas = kpisCanales.reduce((acc, c) => acc + (c.vistasLogradas || 0), 0);
  const totalInteracciones = kpisCanales.reduce((acc, c) => acc + (c.interaccionesTotales || 0), 0);
  const totalImpresiones = kpisCanales.reduce((acc, c) => acc + (c.impresionesNetas || 0), 0);
  const totalVarSemana = totalMetaVistas > 0
    ? Number((((totalVistasLogradas - totalMetaVistas) / totalMetaVistas) * 100).toFixed(1))
    : 0;
  const totalEngagementRate = totalVistasLogradas > 0 
    ? Number(((totalInteracciones / totalVistasLogradas) * 100).toFixed(2)) 
    : 0;

  // Totals for Audiencia
  const totalSeguidores = alcanceAudiencia.reduce((acc, c) => acc + (c.seguidoresTotales || 0), 0);
  const totalNuevosSeguidores = alcanceAudiencia.reduce((acc, c) => acc + (c.nuevosSeguidores || 0), 0);
  const totalAlcanceOrganico = alcanceAudiencia.reduce((acc, c) => acc + (c.alcanceOrganico || 0), 0);
  const totalAlcancePagado = alcanceAudiencia.reduce((acc, c) => acc + (c.alcancePagado || 0), 0);

  // Totals for Entrevistas
  const totalEntrevistas = entrevistas.reduce((acc, c) => acc + (c.numEntrevistas || 0), 0);
  const totalAlcanceEntrevistas = entrevistas.reduce((acc, c) => acc + (c.alcanceEstimado || 0), 0);

  // Totals for Engagement por Contenido
  const totalPublicaciones = engagementPorContenido.reduce((acc, c) => acc + (c.publicaciones || 0), 0);
  const totalInteraccionesContenido = engagementPorContenido.reduce((acc, c) => acc + (c.interacciones || 0), 0);
  const totalComentarios = engagementPorContenido.reduce((acc, c) => acc + (c.comentarios || 0), 0);
  const totalCompartidos = engagementPorContenido.reduce((acc, c) => acc + (c.compartidos || 0), 0);
  const totalGuardados = engagementPorContenido.reduce((acc, c) => acc + (c.guardados || 0), 0);
  const promedioEEContenido = engagementPorContenido.length > 0
    ? (engagementPorContenido.reduce((acc, c) => acc + (c.eePromedio || 0), 0) / engagementPorContenido.length).toFixed(1)
    : '0.0';

  // Handlers
  const handleUpdateKpisCanales = (index: number, field: keyof RedesRowKpisCanales, value: any) => {
    setKpisCanales(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleUpdateAlcanceAudiencia = (index: number, field: keyof RedesRowAlcanceAudiencia, value: any) => {
    setAlcanceAudiencia(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleUpdateProduccionTactica = (index: number, field: keyof RedesRowProduccionTactica, value: any) => {
    setProduccionTactica(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleUpdateEntrevistas = (index: number, field: keyof RedesRowEntrevista, value: any) => {
    setEntrevistas(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleUpdateCreadoresAliados = (index: number, field: keyof RedesRowCreadores, value: any) => {
    setCreadoresAliados(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleUpdateCanalesActivos = (index: number, field: keyof RedesRowCanalActivo, value: any) => {
    setCanalesActivos(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddCanalActivo = () => {
    setCanalesActivos(prev => [
      ...prev,
      {
        canalCuenta: '@NuevaCuenta',
        plataforma: 'Instagram',
        seguidores: 0,
        crecimientoPorc: 0,
        contenidoDestacado: 'Transmisión o cobertura destacada'
      }
    ]);
  };

  const handleRemoveCanalActivo = (index: number) => {
    setCanalesActivos(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateEngagementContenido = (index: number, field: keyof RedesRowEngagementContenido, value: any) => {
    setEngagementPorContenido(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Auto-calculate Var % and EE
  const handleAutoCalculateVarAndEE = () => {
    setKpisCanales(prev =>
      prev.map(row => {
        let varPct = row.varSemanaAnterior;
        if (row.metaSemanalVistas > 0 && row.vistasLogradas > 0) {
          varPct = Number((((row.vistasLogradas - row.metaSemanalVistas) / row.metaSemanalVistas) * 100).toFixed(1));
        }
        let eePct = row.tasaEngagement;
        if (row.vistasLogradas > 0 && row.interaccionesTotales > 0) {
          eePct = Number(((row.interaccionesTotales / row.vistasLogradas) * 100).toFixed(2));
        }
        return {
          ...row,
          varSemanaAnterior: varPct,
          tasaEngagement: eePct
        };
      })
    );

    setAlcanceAudiencia(prev =>
      prev.map(row => {
        if (row.seguidoresTotales > 0 && row.nuevosSeguidores > 0) {
          const anterior = row.seguidoresTotales - row.nuevosSeguidores;
          const crecPct = anterior > 0 ? Number(((row.nuevosSeguidores / anterior) * 100).toFixed(1)) : 0;
          return { ...row, crecimientoPorc: crecPct };
        }
        return row;
      })
    );

    setFeedbackMsg('Tasas de Engagement (EE %) y Variaciones calculadas automáticamente.');
    setTimeout(() => setFeedbackMsg(''), 4500);
  };

  // Restore defaults
  const handleRestoreDefaults = () => {
    if (window.confirm('¿Desea restaurar los valores de referencia del instrumento 1.E Redes Sociales?')) {
      setKpisCanales(DEFAULT_KPIS_CANALES);
      setAlcanceAudiencia(DEFAULT_ALCANCE_AUDIENCIA);
      setProduccionTactica(DEFAULT_PRODUCCION_TACTICA);
      setEntrevistas(DEFAULT_ENTREVISTAS);
      setCreadoresAliados(DEFAULT_CREADORES);
      setCanalesActivos(DEFAULT_CANALES_ACTIVOS);
      setEngagementPorContenido(DEFAULT_ENGAGEMENT_CONTENIDO);
      setFeedbackMsg('Valores estándar de referencia de Redes Sociales restaurados.');
      setTimeout(() => setFeedbackMsg(''), 4000);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'INSTRUMENTO OFICIAL DE RECOLECCION TECNICA - 1.E REDES SOCIALES\n';
    csvContent += `Ente Informante:,"${enteInformante}"\n`;
    csvContent += `Responsable:,"${responsableCarga}",Cedula:,"${cedulaResponsable}"\n`;
    csvContent += `Semana:,"${semanaReporte}",Fecha Corte:,"${fechaCorte}"\n\n`;

    // Tabla 1: KPIs Canales
    csvContent += 'TABLA 1: MATRIZ DE ECOSISTEMA DIGITAL - KPIS DE CANALES\n';
    csvContent += 'Plataforma,Meta Semanal de Vistas,Vistas Logradas,Var % vs Sem Anterior,Interacciones Totales,Impresiones Netas,Tasa de Engagement (%)\n';
    kpisCanales.forEach(row => {
      csvContent += `"${row.plataforma}",${row.metaSemanalVistas},${row.vistasLogradas},${row.varSemanaAnterior}%,${row.interaccionesTotales},${row.impresionesNetas},${row.tasaEngagement}%\n`;
    });
    csvContent += `TOTALES,${totalMetaVistas},${totalVistasLogradas},${totalVarSemana}%,${totalInteracciones},${totalImpresiones},${totalEngagementRate}%\n\n`;

    // Tabla 2: Audiencia
    csvContent += 'TABLA 2: DESGLOSE DE ALCANCE POR RED SOCIAL - AUDIENCIA\n';
    csvContent += 'Plataforma,Seguidores Totales,Nuevos Seguidores,Crecimiento %,Alcance Organico,Alcance Pagado\n';
    alcanceAudiencia.forEach(row => {
      csvContent += `"${row.plataforma}",${row.seguidoresTotales},${row.nuevosSeguidores},${row.crecimientoPorc}%,${row.alcanceOrganico},${row.alcancePagado}\n`;
    });
    csvContent += `TOTALES,${totalSeguidores},${totalNuevosSeguidores},-,${totalAlcanceOrganico},${totalAlcancePagado}\n\n`;

    // Tabla 3: Producción Táctica
    csvContent += 'TABLA 3: GESTION DE CONTENIDOS Y PRODUCCION TACTICA EN REDES\n';
    csvContent += 'Tipo de Contenido,Codigo,Unidades,Observaciones\n';
    produccionTactica.forEach(row => {
      csvContent += `"${row.tipoContenido}","${row.codigo}",${row.unidades},"${row.observaciones}"\n`;
    });
    csvContent += '\n';

    // Tabla 4: Entrevistas
    csvContent += 'TABLA 4: DESGLOSE DE ENTREVISTAS REALIZADAS\n';
    csvContent += 'Tipo de Entrevistado,N de Entrevistas,Plataforma Principal,Alcance Estimado\n';
    entrevistas.forEach(row => {
      csvContent += `"${row.tipoEntrevistado}",${row.numEntrevistas},"${row.plataformaPrincipal}",${row.alcanceEstimado}\n`;
    });
    csvContent += `TOTAL,${totalEntrevistas},-,${totalAlcanceEntrevistas}\n\n`;

    // Tabla 5: Creadores Aliados
    csvContent += 'TABLA 5: RED DE CREADORES ALIADOS\n';
    csvContent += 'Indicador,Codigo,Valor,Observaciones\n';
    creadoresAliados.forEach(row => {
      csvContent += `"${row.indicador}","${row.codigo}",${row.valor},"${row.observaciones}"\n`;
    });
    csvContent += '\n';

    // Tabla 6: Canales Activos
    csvContent += 'TABLA 6: PRINCIPALES CANALES ACTIVOS EN LA SEMANA\n';
    csvContent += 'Canal / Cuenta,Plataforma,Seguidores,Crecimiento %,Contenido Destacado\n';
    canalesActivos.forEach(row => {
      csvContent += `"${row.canalCuenta}","${row.plataforma}",${row.seguidores},${row.crecimientoPorc}%,"${row.contenidoDestacado}"\n`;
    });
    csvContent += '\n';

    // Tabla 7: Engagement por Contenido
    csvContent += 'TABLA 7: ANALISIS DE ENGAGEMENT POR TIPO DE CONTENIDO\n';
    csvContent += 'Tipo de Contenido,Publicaciones,Interacciones,Comentarios,Compartidos,Guardados,EE Promedio (%)\n';
    engagementPorContenido.forEach(row => {
      csvContent += `"${row.tipoContenido}",${row.publicaciones},${row.interacciones},${row.comentarios},${row.compartidos},${row.guardados},${row.eePromedio}%\n`;
    });
    csvContent += `TOTALES / PROMEDIO,${totalPublicaciones},${totalInteraccionesContenido},${totalComentarios},${totalCompartidos},${totalGuardados},${promedioEEContenido}%\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `1E_Redes_Sociales_${semanaReporte.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setFeedbackMsg('Archivo CSV de Redes Sociales generado y descargado con éxito.');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  // Master Save Handler
  const handleSave = () => {
    if (report && onSaveReport) {
      const updatedControl = {
        ...report.control,
        enteAdscrito: enteInformante,
        responsableEnte: responsableCarga,
        cedulaIdentidad: cedulaResponsable,
        semanaEpidemiologica: typeof semanaReporte === 'number' ? semanaReporte : (report?.control?.semanaEpidemiologica || 35),
        fechaReporte: fechaCorte,
        fechaUltimaModificacion: new Date().toISOString()
      };

      const updatedEje1Data = {
        ...report.eje1Data,
        redesSociales: {
          kpisCanales,
          alcanceAudiencia,
          produccionTactica,
          entrevistas,
          creadoresAliados,
          canalesActivos,
          engagementPorContenido
        }
      };

      const updatedMediosData: MediaOperationalData = {
        ...report.mediosData,
        vistasLogradasDigital: totalVistasLogradas,
        metaVistasDigital: totalMetaVistas,
        interaccionesTotalesDigital: totalInteracciones,
        tasaEngagementDigital: totalEngagementRate,
        articulosPublicadosDigital: report.mediosData.articulosPublicadosDigital || 485,
        ...(mediosData || {})
      };

      const computedKPIs = calculateMasterKPIs(
        updatedMediosData,
        report.plataformasData,
        report.strategicData,
        report.vulnerabilityRows
      );

      const computedValidations = runThreeLevelValidation(
        updatedControl,
        updatedMediosData,
        report.plataformasData,
        report.strategicData,
        report.vulnerabilityRows
      );

      const newHash = generateIntegrityHash(
        report.codigoReporte,
        new Date().toISOString(),
        computedKPIs
      );

      const updatedReport: FullWeeklyReport = {
        ...report,
        control: updatedControl,
        eje1Data: updatedEje1Data,
        mediosData: updatedMediosData,
        kpisCalculados: computedKPIs,
        integrityHash: newHash,
        validations: computedValidations,
        fechaUltimaModificacion: new Date().toISOString()
      };

      onSaveReport(updatedReport);
    }

    setSaveSuccess(true);
    setFeedbackMsg('Datos de 1.E Redes Sociales guardados y sincronizados con éxito en el sistema.');
    if (onSuccessSave) {
      onSuccessSave('Datos de 1.E Redes Sociales sincronizados correctamente.');
    }
    setTimeout(() => {
      setSaveSuccess(false);
      setFeedbackMsg('');
    }, 4500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-pink-950 to-slate-900 text-white p-5 rounded-xl border border-pink-800/40 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3.5">
            <div className="p-3 bg-pink-500/20 text-pink-400 rounded-xl border border-pink-500/30 shadow-inner">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-pink-300 font-bold bg-pink-950/80 px-2 py-0.5 rounded border border-pink-700/50">
                  EJE 1: MEDIOS DE COMUNICACIÓN E INFORMACIÓN
                </span>
                <span className="text-[10px] font-mono text-slate-300 bg-slate-800/90 px-2 py-0.5 rounded">
                  Códigos RED-001 al RED-016
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                1.E REDES SOCIALES & ECOSISTEMA DIGITAL — AUDIENCIA, TÁCTICA & ENGAGEMENT
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Instrumento de recolección de KPIs de canales, audiencia, formatos, entrevistas a sobrevivientes y creadores aliados.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAutoCalculateVarAndEE}
              title="Calcular automáticamente tasas de engagement y variaciones porcentuales"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-pink-300 hover:text-pink-200 border border-slate-700 rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calcular Var % y EE</span>
            </button>

            <button
              onClick={handleExportCSV}
              title="Descargar plantilla y datos actuales en CSV"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>

            <button
              onClick={handleRestoreDefaults}
              title="Restaurar valores predeterminados"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 rounded-lg text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-pink-500/20 active:scale-95"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white animate-bounce" />
                  <span>¡Guardado!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-white" />
                  <span>Guardar Formulario</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live metric summary ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3.5 border-t border-pink-800/40 text-xs">
          <div className="bg-slate-800/60 p-2.5 rounded-lg border border-pink-900/50">
            <span className="text-[10px] text-pink-300 font-mono block">Vistas Totales Logradas</span>
            <div className="text-base font-bold font-mono text-white mt-0.5">
              {totalVistasLogradas.toLocaleString()} vistas
            </div>
            <span className="text-[10px] text-slate-400">Meta: {totalMetaVistas.toLocaleString()}</span>
          </div>

          <div className="bg-slate-800/60 p-2.5 rounded-lg border border-pink-900/50">
            <span className="text-[10px] text-pink-300 font-mono block">Interacciones Netas</span>
            <div className="text-base font-bold font-mono text-pink-400 mt-0.5">
              {totalInteracciones.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400">En 7 plataformas oficiales</span>
          </div>

          <div className="bg-slate-800/60 p-2.5 rounded-lg border border-pink-900/50">
            <span className="text-[10px] text-pink-300 font-mono block">Tasa de Engagement (EE %)</span>
            <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
              {totalEngagementRate}%
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Fórmula: (Int / Vistas) × 100</span>
          </div>

          <div className="bg-slate-800/60 p-2.5 rounded-lg border border-pink-900/50">
            <span className="text-[10px] text-pink-300 font-mono block">Seguidores en Ecosistema</span>
            <div className="text-base font-bold font-mono text-amber-300 mt-0.5">
              {totalSeguidores.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400">+{totalNuevosSeguidores.toLocaleString()} nuevos</span>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div className="flex items-center space-x-2 bg-pink-50 border border-pink-300 text-pink-900 px-4 py-2.5 rounded-lg text-xs font-medium animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-pink-600 flex-shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Metadata & Responsibility Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-pink-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Control y Trazabilidad Institucional del Instrumento
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-pink-600" />
            <span>Validación RACI Nivel 1 & 2 Activa</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Ente Informante / Unidad
            </label>
            <select
              value={enteInformante}
              onChange={(e) => setEnteInformante(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-800 font-medium focus:bg-white focus:ring-1 focus:ring-pink-500 text-xs"
            >
              <option value="Dirección General de Redes Sociales / MIPPCI">Dirección General de Redes Sociales / MIPPCI</option>
              <option value="MIPPCI Digital Central">MIPPCI Digital Central</option>
              <option value="Sala de Guerra y Monitoreo Digital">Sala de Guerra y Monitoreo Digital</option>
              <option value="Unidad de Producción Táctica Multiplataforma">Unidad de Producción Táctica Multiplataforma</option>
              <option value="Red de Creadores y Comunicadores Aliados">Red de Creadores y Comunicadores Aliados</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Responsable de Carga
            </label>
            <input
              type="text"
              value={responsableCarga}
              onChange={(e) => setResponsableCarga(e.target.value)}
              placeholder="Nombre y Apellido"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-medium focus:ring-1 focus:ring-pink-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Cédula de Identidad
            </label>
            <input
              type="text"
              value={cedulaResponsable}
              onChange={(e) => setCedulaResponsable(e.target.value)}
              placeholder="V-00.000.000"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-mono font-medium focus:ring-1 focus:ring-pink-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Semana del Reporte
            </label>
            <input
              type="text"
              value={semanaReporte}
              onChange={(e) => setSemanaReporte(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-medium focus:ring-1 focus:ring-pink-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Fecha de Corte
            </label>
            <input
              type="date"
              value={fechaCorte}
              onChange={(e) => setFechaCorte(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-medium focus:ring-1 focus:ring-pink-500 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex flex-wrap border-b border-slate-200 gap-1 bg-slate-100/75 p-1 rounded-lg text-xs font-semibold">
        <button
          onClick={() => setSubTab('TODOS')}
          className={`px-3 py-1.5 rounded-md transition-all ${
            subTab === 'TODOS'
              ? 'bg-white text-pink-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          Vista Integral (Todos)
        </button>
        <button
          onClick={() => setSubTab('KPIS_CANALES')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
            subTab === 'KPIS_CANALES'
              ? 'bg-white text-pink-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5 text-pink-600" />
          <span>Matriz de KPIs Canales</span>
        </button>
        <button
          onClick={() => setSubTab('AUDIENCIA')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
            subTab === 'AUDIENCIA'
              ? 'bg-white text-pink-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-pink-600" />
          <span>Audiencia & Crecimiento</span>
        </button>
        <button
          onClick={() => setSubTab('TACTICA')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
            subTab === 'TACTICA'
              ? 'bg-white text-pink-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-pink-600" />
          <span>Producción Táctica (RED-001/011)</span>
        </button>
        <button
          onClick={() => setSubTab('ENTREVISTAS')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
            subTab === 'ENTREVISTAS'
              ? 'bg-white text-pink-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-pink-600" />
          <span>Entrevistas Realizadas</span>
        </button>
        <button
          onClick={() => setSubTab('CREADORES')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
            subTab === 'CREADORES'
              ? 'bg-white text-pink-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>Creadores Aliados</span>
        </button>
        <button
          onClick={() => setSubTab('CANALES_ACTIVOS')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
            subTab === 'CANALES_ACTIVOS'
              ? 'bg-white text-pink-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-pink-600" />
          <span>Canales Activos</span>
        </button>
        <button
          onClick={() => setSubTab('ENGAGEMENT')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
            subTab === 'ENGAGEMENT'
              ? 'bg-white text-pink-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Video className="w-3.5 h-3.5 text-pink-600" />
          <span>Engagement por Formato</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* BLOQUE 1: MATRIZ DE ECOSISTEMA DIGITAL - KPIS DE CANALES                  */}
      {/* ========================================================================= */}
      {(subTab === 'TODOS' || subTab === 'KPIS_CANALES') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-pink-600" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Matriz de Ecosistema Digital - KPIs de Canales
                </h3>
                <p className="text-[11px] text-slate-500">
                  Desempeño de vistas, variación porcentual vs semana anterior, interacciones, impresiones y tasa de engagement
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-pink-700 bg-pink-50 px-2.5 py-1 rounded border border-pink-200 font-bold">
              EE = (Interacciones / Vistas) × 100
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Plataforma</th>
                  <th className="py-2.5 px-3 w-32 text-right">Meta Semanal de Vistas</th>
                  <th className="py-2.5 px-3 w-32 text-right">Vistas Logradas</th>
                  <th className="py-2.5 px-3 w-32 text-right">Var % vs Semana Anterior</th>
                  <th className="py-2.5 px-3 w-32 text-right">Interacciones Totales</th>
                  <th className="py-2.5 px-3 w-32 text-right">Impresiones Netas</th>
                  <th className="py-2.5 px-3 w-32 text-right">Tasa de Engagement (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {kpisCanales.map((row, idx) => (
                  <tr key={row.plataforma} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{row.plataforma}</td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.metaSemanalVistas === 0 ? '' : row.metaSemanalVistas}
                        onChange={(e) => handleUpdateKpisCanales(idx, 'metaSemanalVistas', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-full px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.vistasLogradas === 0 ? '' : row.vistasLogradas}
                        onChange={(e) => handleUpdateKpisCanales(idx, 'vistasLogradas', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.varSemanaAnterior === 0 ? '' : row.varSemanaAnterior}
                          onChange={(e) => handleUpdateKpisCanales(idx, 'varSemanaAnterior', parseFloat(e.target.value) || 0)}
                          placeholder="_______"
                          className={`w-20 px-2 py-1 text-right border rounded text-xs font-mono font-bold placeholder-slate-400 ${
                            row.varSemanaAnterior >= 0 
                              ? 'text-emerald-700 bg-emerald-50/50 border-emerald-200' 
                              : 'text-rose-700 bg-rose-50/50 border-rose-200'
                          }`}
                        />
                        <span className="text-[11px] font-bold text-slate-500">%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.interaccionesTotales === 0 ? '' : row.interaccionesTotales}
                        onChange={(e) => handleUpdateKpisCanales(idx, 'interaccionesTotales', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.impresionesNetas === 0 ? '' : row.impresionesNetas}
                        onChange={(e) => handleUpdateKpisCanales(idx, 'impresionesNetas', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.01"
                          value={row.tasaEngagement === 0 ? '' : row.tasaEngagement}
                          onChange={(e) => handleUpdateKpisCanales(idx, 'tasaEngagement', parseFloat(e.target.value) || 0)}
                          placeholder="_______"
                          className="w-20 px-2 py-1 text-right bg-pink-50/60 border border-pink-200 rounded text-xs font-mono font-bold text-pink-700 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-pink-500"
                        />
                        <span className="text-[11px] font-bold text-slate-500">%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-pink-50/80 border-t-2 border-pink-200 font-bold text-slate-900">
                <tr>
                  <td className="py-2.5 px-3 text-pink-950 font-black">TOTALES</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-800">{totalMetaVistas.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalVistasLogradas.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-800">{totalVarSemana}%</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-900">{totalInteracciones.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-800">{totalImpresiones.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalEngagementRate}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BLOQUE 2: DESGLOSE DE ALCANCE POR RED SOCIAL - AUDIENCIA                  */}
      {/* ========================================================================= */}
      {(subTab === 'TODOS' || subTab === 'AUDIENCIA') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-pink-600" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Desglose de Alcance por Red Social - Audiencia
                </h3>
                <p className="text-[11px] text-slate-500">
                  Comunidad activa de seguidores, nuevos ingresos semanales, tasa de crecimiento y alcance orgánico vs pagado
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded font-semibold">
              Total Ecosistema: {totalSeguidores.toLocaleString()} seguidores
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Plataforma</th>
                  <th className="py-2.5 px-3 w-36 text-right">Seguidores Totales</th>
                  <th className="py-2.5 px-3 w-36 text-right">Nuevos Seguidores</th>
                  <th className="py-2.5 px-3 w-32 text-right">Crecimiento %</th>
                  <th className="py-2.5 px-3 w-36 text-right">Alcance Orgánico</th>
                  <th className="py-2.5 px-3 w-36 text-right">Alcance Pagado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {alcanceAudiencia.map((row, idx) => (
                  <tr key={row.plataforma} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{row.plataforma}</td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.seguidoresTotales === 0 ? '' : row.seguidoresTotales}
                        onChange={(e) => handleUpdateAlcanceAudiencia(idx, 'seguidoresTotales', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.nuevosSeguidores === 0 ? '' : row.nuevosSeguidores}
                        onChange={(e) => handleUpdateAlcanceAudiencia(idx, 'nuevosSeguidores', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-emerald-700 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.crecimientoPorc === 0 ? '' : row.crecimientoPorc}
                          onChange={(e) => handleUpdateAlcanceAudiencia(idx, 'crecimientoPorc', parseFloat(e.target.value) || 0)}
                          placeholder="_______"
                          className="w-20 px-2 py-1 text-right border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                        />
                        <span className="text-[11px] font-bold text-slate-500">%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.alcanceOrganico === 0 ? '' : row.alcanceOrganico}
                        onChange={(e) => handleUpdateAlcanceAudiencia(idx, 'alcanceOrganico', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.alcancePagado === 0 ? '' : row.alcancePagado}
                        onChange={(e) => handleUpdateAlcanceAudiencia(idx, 'alcancePagado', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-700 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-pink-50/80 border-t-2 border-pink-200 font-bold text-slate-900">
                <tr>
                  <td className="py-2.5 px-3 text-pink-950 font-black">TOTALES</td>
                  <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalSeguidores.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-800">+{totalNuevosSeguidores.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-500">-</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-900">{totalAlcanceOrganico.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-800">{totalAlcancePagado.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BLOQUE 3: GESTION DE CONTENIDOS Y PRODUCCION TACTICA EN REDES             */}
      {/* ========================================================================= */}
      {(subTab === 'TODOS' || subTab === 'TACTICA') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-pink-600" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Gestión de Contenidos y Producción Táctica en Redes
                </h3>
                <p className="text-[11px] text-slate-500">
                  Volúmenes por formato vertical, notas institucionales, radio digitalizada, coberturas y pautados oficiales
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-pink-700 bg-pink-50 px-2.5 py-1 rounded border border-pink-200 font-bold">
              Códigos RED-001 al RED-011
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Tipo de Contenido</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-32 text-right">Unidades</th>
                  <th className="py-2.5 px-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {produccionTactica.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{row.tipoContenido}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-pink-700 bg-pink-50/50">{row.codigo}</td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.unidades === 0 ? '' : row.unidades}
                        onChange={(e) => handleUpdateProduccionTactica(idx, 'unidades', parseInt(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={(e) => handleUpdateProduccionTactica(idx, 'observaciones', e.target.value)}
                        placeholder="Observaciones operativas..."
                        className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BLOQUE 4: DESGLOSE DE ENTREVISTAS REALIZADAS                              */}
      {/* ========================================================================= */}
      {(subTab === 'TODOS' || subTab === 'ENTREVISTAS') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-pink-600" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Desglose de Entrevistas Realizadas
                </h3>
                <p className="text-[11px] text-slate-500">
                  Testimonios de sobrevivientes, autoridades, especialistas sismológicos, psicólogos y voceros comunitarios
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded font-semibold">
              Total: {totalEntrevistas} entrevistas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Tipo de Entrevistado</th>
                  <th className="py-2.5 px-3 w-36 text-right">N° de Entrevistas</th>
                  <th className="py-2.5 px-3 w-48">Plataforma Principal</th>
                  <th className="py-2.5 px-3 w-44 text-right">Alcance Estimado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {entrevistas.map((row, idx) => (
                  <tr key={row.tipoEntrevistado} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{row.tipoEntrevistado}</td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.numEntrevistas === 0 ? '' : row.numEntrevistas}
                        onChange={(e) => handleUpdateEntrevistas(idx, 'numEntrevistas', parseInt(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.plataformaPrincipal}
                        onChange={(e) => handleUpdateEntrevistas(idx, 'plataformaPrincipal', e.target.value)}
                        placeholder="_______"
                        className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.alcanceEstimado === 0 ? '' : row.alcanceEstimado}
                        onChange={(e) => handleUpdateEntrevistas(idx, 'alcanceEstimado', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-32 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-pink-50/80 border-t-2 border-pink-200 font-bold text-slate-900">
                <tr>
                  <td className="py-2.5 px-3 text-pink-950 font-black">TOTAL</td>
                  <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalEntrevistas}</td>
                  <td className="py-2.5 px-3 text-slate-500">-</td>
                  <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalAlcanceEntrevistas.toLocaleString()} personas</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BLOQUE 5: RED DE CREADORES ALIADOS                                        */}
      {/* ========================================================================= */}
      {(subTab === 'TODOS' || subTab === 'CREADORES') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Red de Creadores Aliados
                </h3>
                <p className="text-[11px] text-slate-500">
                  Creadores de contenido activos, vistas en redes aliadas, articulación con medios privados y hashtags monitorizados
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-pink-700 bg-pink-50 px-2.5 py-1 rounded border border-pink-200 font-bold">
              Códigos RED-012 al RED-016
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-36 text-right">Valor</th>
                  <th className="py-2.5 px-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {creadoresAliados.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-pink-700 bg-pink-50/50">{row.codigo}</td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.valor === 0 ? '' : row.valor}
                        onChange={(e) => handleUpdateCreadoresAliados(idx, 'valor', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={(e) => handleUpdateCreadoresAliados(idx, 'observaciones', e.target.value)}
                        placeholder="Observaciones de colaboración..."
                        className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BLOQUE 6: PRINCIPALES CANALES ACTIVOS EN LA SEMANA                        */}
      {/* ========================================================================= */}
      {(subTab === 'TODOS' || subTab === 'CANALES_ACTIVOS') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-pink-600" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Principales Canales Activos en la Semana
                </h3>
                <p className="text-[11px] text-slate-500">
                  Cuentas y canales oficiales de vocería con mayor tracción, masa crítica y contenido de impacto
                </p>
              </div>
            </div>
            <button
              onClick={handleAddCanalActivo}
              className="flex items-center space-x-1 px-2.5 py-1 bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 rounded text-xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Canal</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 w-44">Canal / Cuenta</th>
                  <th className="py-2.5 px-3 w-40">Plataforma</th>
                  <th className="py-2.5 px-3 w-32 text-right">Seguidores</th>
                  <th className="py-2.5 px-3 w-28 text-right">Crecimiento</th>
                  <th className="py-2.5 px-3">Contenido Destacado</th>
                  <th className="py-2.5 px-2 w-10 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {canalesActivos.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.canalCuenta}
                        onChange={(e) => handleUpdateCanalesActivos(idx, 'canalCuenta', e.target.value)}
                        placeholder="_______"
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.plataforma}
                        onChange={(e) => handleUpdateCanalesActivos(idx, 'plataforma', e.target.value)}
                        placeholder="_______"
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.seguidores === 0 ? '' : row.seguidores}
                        onChange={(e) => handleUpdateCanalesActivos(idx, 'seguidores', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.crecimientoPorc === 0 ? '' : row.crecimientoPorc}
                          onChange={(e) => handleUpdateCanalesActivos(idx, 'crecimientoPorc', parseFloat(e.target.value) || 0)}
                          placeholder="_______"
                          className="w-16 px-2 py-1 text-right border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                        />
                        <span className="text-[11px] font-bold text-slate-500">%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.contenidoDestacado}
                        onChange={(e) => handleUpdateCanalesActivos(idx, 'contenidoDestacado', e.target.value)}
                        placeholder="_______"
                        className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => handleRemoveCanalActivo(idx)}
                        title="Eliminar fila"
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BLOQUE 7: ANALISIS DE ENGAGEMENT POR TIPO DE CONTENIDO                     */}
      {/* ========================================================================= */}
      {(subTab === 'TODOS' || subTab === 'ENGAGEMENT') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="w-4 h-4 text-pink-600" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Análisis de Engagement por Tipo de Contenido
                </h3>
                <p className="text-[11px] text-slate-500">
                  Desglose por formato: publicaciones, interacciones, comentarios, compartidos, guardados y EE promedio
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-pink-700 bg-pink-50 px-2.5 py-1 rounded border border-pink-200 font-bold">
              7 Formatos Analizados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Tipo de Contenido</th>
                  <th className="py-2.5 px-3 w-28 text-right">Publicaciones</th>
                  <th className="py-2.5 px-3 w-32 text-right">Interacciones</th>
                  <th className="py-2.5 px-3 w-28 text-right">Comentarios</th>
                  <th className="py-2.5 px-3 w-28 text-right">Compartidos</th>
                  <th className="py-2.5 px-3 w-28 text-right">Guardados</th>
                  <th className="py-2.5 px-3 w-32 text-right">EE Promedio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {engagementPorContenido.map((row, idx) => (
                  <tr key={row.tipoContenido} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{row.tipoContenido}</td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.publicaciones === 0 ? '' : row.publicaciones}
                        onChange={(e) => handleUpdateEngagementContenido(idx, 'publicaciones', parseInt(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-20 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.interacciones === 0 ? '' : row.interacciones}
                        onChange={(e) => handleUpdateEngagementContenido(idx, 'interacciones', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.comentarios === 0 ? '' : row.comentarios}
                        onChange={(e) => handleUpdateEngagementContenido(idx, 'comentarios', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-20 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.compartidos === 0 ? '' : row.compartidos}
                        onChange={(e) => handleUpdateEngagementContenido(idx, 'compartidos', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-20 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.guardados === 0 ? '' : row.guardados}
                        onChange={(e) => handleUpdateEngagementContenido(idx, 'guardados', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-20 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.eePromedio === 0 ? '' : row.eePromedio}
                          onChange={(e) => handleUpdateEngagementContenido(idx, 'eePromedio', parseFloat(e.target.value) || 0)}
                          placeholder="_______"
                          className="w-20 px-2 py-1 text-right bg-pink-50/60 border border-pink-200 rounded text-xs font-mono font-bold text-pink-700 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-pink-500"
                        />
                        <span className="text-[11px] font-bold text-slate-500">%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-pink-50/80 border-t-2 border-pink-200 font-bold text-slate-900">
                <tr>
                  <td className="py-2.5 px-3 text-pink-950 font-black">TOTALES / PROMEDIO</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-900">{totalPublicaciones}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalInteraccionesContenido.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-900">{totalComentarios.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-900">{totalCompartidos.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-900">{totalGuardados.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-pink-900">{promedioEEContenido}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
