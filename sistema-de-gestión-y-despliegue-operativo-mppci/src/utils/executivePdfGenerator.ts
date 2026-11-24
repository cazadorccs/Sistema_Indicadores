import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PDFDocument } from 'pdf-lib';
import { CalculatedMasterKPIs } from '../types';
import { PLANTILLA_PDF_BASE64 } from './plantillaTemplateBase64';

export interface EnteSubmissionStatus {
  id: string;
  nombre: string;
  siglas: string;
  tipo: string;
  responsable: string;
  cedula: string;
  horaEntrega: string;
  esCargaTardia: boolean;
  estado: 'CUMPLIDO_A_TIEMPO' | 'EXTEMPORANEO' | 'ALERTA_CRITICA' | 'PENDIENTE';
  kpiPrincipal: string;
  hash: string;
}

export interface ExecutiveBulletinData {
  semanaEpidemiologica: number;
  anio: number;
  fechaEmision: string;
  periodoDesde: string;
  periodoHasta: string;
  hashIntegridad: string;
  kpis: CalculatedMasterKPIs;
  entes: EnteSubmissionStatus[];
  alertasEmitidas: Array<{
    tipo: string;
    ente: string;
    severidad: string;
    mensaje: string;
    canal: string;
  }>;
  sintesisDiagnostico: string;
  directricesEstrategicas: string[];
  firmasRaci: {
    responsable: { nombre: string; cargo: string; cedula: string; rol: string };
    aprobador: { nombre: string; cargo: string; cedula: string; rol: string };
    maximaAutoridad: { nombre: string; cargo: string; cedula: string; rol: string };
  };
}

export interface GeneratedExecutivePDF {
  save: (filename: string) => void;
  getBytes: () => Uint8Array;
  getBlob: () => Blob;
  getBlobUrl: () => string;
}

/**
 * Superpone el contenido dinámico generado por jsPDF sobre la plantilla oficial
 * gubernamental (Plantilla.pdf) de la VSCC utilizando pdf-lib.
 * Garantiza fidelidad vectorial inmutable de cabecera y pie de página.
 */
async function applyPlantillaTemplate(reportDoc: jsPDF): Promise<Uint8Array> {
  const jsPdfBytes = reportDoc.output('arraybuffer');

  let templateBytes: Uint8Array | ArrayBuffer | null = null;

  // 1. Intentar cargar desde las rutas públicas de Vite
  const publicUrls = ['/Plantilla.pdf', '/templates/Plantilla.pdf'];
  for (const url of publicUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        templateBytes = await res.arrayBuffer();
        break;
      }
    } catch {
      // Intentar siguiente recurso
    }
  }

  // 2. Fallback inmutable embebido si la petición fetch no estuviese disponible
  if (!templateBytes && PLANTILLA_PDF_BASE64) {
    try {
      const binaryString = atob(PLANTILLA_PDF_BASE64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      templateBytes = bytes;
    } catch (e) {
      console.warn('Error al decodificar fallback base64 de Plantilla.pdf:', e);
    }
  }

  if (!templateBytes) {
    return new Uint8Array(jsPdfBytes);
  }

  try {
    const templateDoc = await PDFDocument.load(templateBytes);
    const reportPdfDoc = await PDFDocument.load(jsPdfBytes);
    const finalDoc = await PDFDocument.create();

    const pageCount = reportPdfDoc.getPageCount();
    for (let i = 0; i < pageCount; i++) {
      // Copiar la página oficial de la plantilla gubernamental como capa base
      const [bgPage] = await finalDoc.copyPages(templateDoc, [0]);
      finalDoc.addPage(bgPage);

      // Superponer la capa de datos dinámicos generados
      const [embeddedReportPage] = await finalDoc.embedPages([reportPdfDoc.getPage(i)]);
      bgPage.drawPage(embeddedReportPage, {
        x: 0,
        y: 0,
        width: bgPage.getWidth(),
        height: bgPage.getHeight()
      });
    }

    return await finalDoc.save();
  } catch (err) {
    console.error('Error integrando plantilla oficial VSCC en el PDF:', err);
    return new Uint8Array(jsPdfBytes);
  }
}

/**
 * Generador Oficial del Boletín Ejecutivo Semanal Consolidado (VSCC)
 * Configurado estrictamente dentro de la plantilla institucional Plantilla.pdf:
 * - Formato: Carta (Letter 215.9 x 279.4 mm).
 * - Margen superior de seguridad: 38 mm (inicia confortablemente bajo la cabecera ministerial).
 * - Margen inferior de seguridad: 38 mm (termina antes del lazo tricolor y estrellas a 248.7 mm).
 */
export async function generateExecutiveBulletinPDF(data: ExecutiveBulletinData): Promise<GeneratedExecutivePDF> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const topMargin = 38;
  const bottomMargin = 38;
  const maxContentY = pageHeight - bottomMargin; // 241.4 mm

  // ========================================================
  // 1. SUB-CABECERA INSTITUCIONAL (Bajo el logo oficial de la plantilla)
  // ========================================================
  let cursorY = topMargin;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('SISTEMA DE GESTIÓN Y DESPLIEGUE OPERATIVO • SALA SITUACIONAL CENTRAL (SGDO-VSCC)', pageWidth / 2, cursorY, { align: 'center' });

  // ========================================================
  // 2. TÍTULO DEL BOLETÍN EJECUTIVO DE ALTA DIRECCIÓN
  // ========================================================
  cursorY += 3.5;
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(margin, cursorY, pageWidth - (margin * 2), 11, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text('BOLETÍN EJECUTIVO SEMANAL CONSOLIDADO DE ALTA DIRECCIÓN', pageWidth / 2, cursorY + 4.8, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(226, 232, 240); // slate-200
  doc.text(`SEMANA EPIDEMIOLÓGICA N° ${data.semanaEpidemiologica} / ${data.anio} • CORTE SEMANAL LUNES 10:00 AM`, pageWidth / 2, cursorY + 8.8, { align: 'center' });

  cursorY += 13.5;

  // ========================================================
  // 3. TARJETA DE METADATOS Y SELLO CRIPTOGRÁFICO SHA-256
  // ========================================================
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, cursorY, pageWidth - (margin * 2), 15, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(30, 41, 59);
  doc.text('Período Evaluado:', margin + 3, cursorY + 4.2);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.periodoDesde} al ${data.periodoHasta}`, margin + 28, cursorY + 4.2);

  doc.setFont('helvetica', 'bold');
  doc.text('Fecha/Hora Emisión:', margin + 92, cursorY + 4.2);
  doc.setFont('helvetica', 'normal');
  doc.text(data.fechaEmision, margin + 125, cursorY + 4.2);

  doc.setFont('helvetica', 'bold');
  doc.text('Destinatario Oficial:', margin + 3, cursorY + 8.2);
  doc.setFont('helvetica', 'normal');
  doc.text('Despacho del Vicepresidente Sectorial de Comunicación y Cultura', margin + 28, cursorY + 8.2);

  doc.setFont('helvetica', 'bold');
  doc.text('Dictamen General:', margin + 92, cursorY + 8.2);
  const estadoGeneral = data.kpis.iec >= 85 ? 'ÓPTIMO (VERDE)' : data.kpis.iec >= 70 ? 'ACEPTABLE (AMARILLO)' : 'CRÍTICO (ROJO)';
  doc.setFont('helvetica', 'bold');
  if (data.kpis.iec >= 85) {
    doc.setTextColor(22, 101, 52); // green-800
  } else if (data.kpis.iec >= 70) {
    doc.setTextColor(161, 98, 7); // amber-700
  } else {
    doc.setTextColor(185, 28, 28); // red-700
  }
  doc.text(estadoGeneral, margin + 125, cursorY + 8.2);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Sello SHA-256:', margin + 3, cursorY + 12.2);
  doc.setFont('courier', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(30, 41, 59);
  doc.text(data.hashIntegridad, margin + 28, cursorY + 12.2);

  cursorY += 17.5;

  // ========================================================
  // 4. TABLA DE INDICADORES AGREGADOS DE ALTO NIVEL (IEC, EE, IRT, ICD, IVI)
  // ========================================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('1. INDICADORES SINTÉTICOS Y KPI MAESTRO DE EFECTIVIDAD', margin, cursorY);
  cursorY += 2;

  const kpisTableBody = [
    [
      'Índice de Efectividad Comunicacional (IEC)',
      'KPI Maestro: (EE + ICD + IRT) / 3',
      `${data.kpis.iec}%`,
      '>= 85.0%',
      data.kpis.iec >= 85 ? 'ÓPTIMO' : data.kpis.iec >= 70 ? 'ACEPTABLE' : 'CRÍTICO'
    ],
    [
      'Tasa de Engagement Digital (EE)',
      '(Interacciones / Vistas Logradas) * 100',
      `${data.kpis.ee}%`,
      '>= 8.0%',
      data.kpis.ee >= 8 ? 'SUPERADO' : 'EN SEGUIMIENTO'
    ],
    [
      'Índice de Resiliencia Técnica (IRT)',
      '(% TDA + % Banda Ku + % Señal Medios) / 3',
      `${data.kpis.irt}%`,
      '>= 85.0%',
      data.kpis.irt >= 85 ? 'ESTABLE' : data.kpis.irt >= 70 ? 'ALERTA TÉCNICA' : 'CRÍTICO'
    ],
    [
      'Índice de Cobertura Digital (ICD)',
      '(Alcance Total Digital / Meta Programada) * 100',
      `${data.kpis.icd}%`,
      '>= 80.0%',
      data.kpis.icd >= 80 ? 'CUMPLIDO' : 'PARCIAL'
    ],
    [
      'Índice Vulnerabilidad Talento Humano (IVI)',
      '(Rojo*3 + Amarillo*1 + Verde*0) / Total Nómina',
      `${data.kpis.ivi.toFixed(3)}`,
      '< 0.300',
      data.kpis.ivi < 0.3 ? 'BAJO RIESGO' : data.kpis.ivi < 0.7 ? 'PREVENTIVO' : 'ALTO RIESGO'
    ]
  ];

  autoTable(doc, {
    startY: cursorY,
    margin: { top: topMargin, bottom: bottomMargin, left: margin, right: margin },
    head: [['Indicador Estratégico', 'Base Metodológica Oficial', 'Valor Logrado', 'Meta Mínima', 'Estado Operativo']],
    body: kpisTableBody,
    theme: 'grid',
    headStyles: {
      fillColor: [30, 41, 59], // slate-800
      textColor: [255, 255, 255],
      fontSize: 7.2,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: {
      fontSize: 6.8,
      cellPadding: 1.8,
      textColor: [30, 41, 59]
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 58 },
      1: { cellWidth: 62 },
      2: { fontStyle: 'bold', halign: 'center', cellWidth: 22 },
      3: { halign: 'center', cellWidth: 22 },
      4: { fontStyle: 'bold', halign: 'center', cellWidth: 23 }
    },
    didParseCell: (hookData) => {
      if (hookData.section === 'body' && hookData.column.index === 4) {
        const val = hookData.cell.raw;
        if (val === 'ÓPTIMO' || val === 'SUPERADO' || val === 'ESTABLE' || val === 'CUMPLIDO' || val === 'BAJO RIESGO') {
          hookData.cell.styles.textColor = [22, 101, 52]; // green-800
        } else if (val === 'ACEPTABLE' || val === 'EN SEGUIMIENTO' || val === 'PARCIAL' || val === 'PREVENTIVO') {
          hookData.cell.styles.textColor = [161, 98, 7]; // amber-700
        } else {
          hookData.cell.styles.textColor = [185, 28, 28]; // red-700
        }
      }
    }
  });

  cursorY = (doc as any).lastAutoTable.finalY + 5.5;

  // ========================================================
  // 5. TABLA DE RENDICIÓN Y CUMPLIMIENTO POR ENTE ESTRATÉGICO
  // ========================================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('2. ESTADO DE RENDICIÓN DE CORTES POR ENTE ESTRATÉGICO', margin, cursorY);
  cursorY += 2;

  const entesTableBody = data.entes.map(e => [
    `${e.siglas}\n(${e.nombre})`,
    e.tipo,
    `${e.responsable}\n${e.cedula}`,
    e.horaEntrega,
    e.kpiPrincipal,
    e.estado === 'CUMPLIDO_A_TIEMPO' ? 'A TIEMPO' : e.estado === 'EXTEMPORANEO' ? 'EXTEMPORÁNEO' : 'ALERTA'
  ]);

  autoTable(doc, {
    startY: cursorY,
    margin: { top: topMargin, bottom: bottomMargin, left: margin, right: margin },
    head: [['Ente Adscrito', 'Eje Rector', 'Responsable Operativo (R)', 'Recepción Corte', 'KPI Clave Reportado', 'Estatus RACI']],
    body: entesTableBody,
    theme: 'grid',
    headStyles: {
      fillColor: [51, 65, 85], // slate-700
      textColor: [255, 255, 255],
      fontSize: 7.2,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: {
      fontSize: 6.8,
      cellPadding: 1.8,
      textColor: [30, 41, 59]
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 44 },
      1: { cellWidth: 28 },
      2: { cellWidth: 44 },
      3: { halign: 'center', cellWidth: 24 },
      4: { cellWidth: 27 },
      5: { fontStyle: 'bold', halign: 'center', cellWidth: 20 }
    },
    didParseCell: (hookData) => {
      if (hookData.section === 'body' && hookData.column.index === 5) {
        const val = hookData.cell.raw;
        if (val === 'A TIEMPO') {
          hookData.cell.styles.textColor = [22, 101, 52];
        } else if (val === 'EXTEMPORÁNEO') {
          hookData.cell.styles.textColor = [194, 65, 12];
        } else {
          hookData.cell.styles.textColor = [185, 28, 28];
        }
      }
    }
  });

  cursorY = (doc as any).lastAutoTable.finalY + 5.5;

  // ========================================================
  // 6. ALERTAS EMITIDAS (SI HUBIESE)
  // ========================================================
  let sectionIndex = 3;
  if (data.alertasEmitidas && data.alertasEmitidas.length > 0) {
    const estimatedAlertsHeight = data.alertasEmitidas.length * 12 + 8;
    if (cursorY + estimatedAlertsHeight > maxContentY) {
      doc.addPage();
      cursorY = topMargin;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`${sectionIndex}. ALERTAS AUTOMÁTICAS ACTIVADAS (TELEGRAM & SMTP)`, margin, cursorY);
    sectionIndex++;
    cursorY += 4.5; // Espacio limpio entre el título y las tarjetas

    data.alertasEmitidas.forEach(alerta => {
      // Limpiar emojis (como ⚠️ o 🚨) y selectores de variación UTF que corrompen fuentes Helvetica estándar
      const cleanMsg = (alerta.mensaje || '')
        .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, '')
        .trim();

      const cardWidth = pageWidth - (margin * 2);
      const isCritica = alerta.severidad === 'CRITICA';

      doc.setFillColor(isCritica ? 254 : 255, isCritica ? 242 : 247, isCritica ? 242 : 237);
      doc.setDrawColor(isCritica ? 252 : 245, isCritica ? 165 : 158, isCritica ? 165 : 11);
      doc.setLineWidth(0.25);

      // Calcular altura dinámica según longitud del mensaje
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.4);
      const msgLines = doc.splitTextToSize(cleanMsg, cardWidth - 8);
      const cardHeight = Math.max(9.5, 4.8 + (msgLines.length * 3.2));

      if (cursorY + cardHeight > maxContentY) {
        doc.addPage();
        cursorY = topMargin;
      }

      doc.roundedRect(margin, cursorY, cardWidth, cardHeight, 1.2, 1.2, 'FD');

      // Línea 1: Encabezado de la Alerta (Severidad, Tipo, Ente y Canal)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.setTextColor(isCritica ? 153 : 180, isCritica ? 27 : 83, isCritica ? 27 : 9);
      doc.text(`[${alerta.severidad}] ${alerta.tipo} • Ente: ${alerta.ente} • Canal: ${alerta.canal}`, margin + 3, cursorY + 3.8);

      // Línea 2+: Mensaje descriptivo sin montarse sobre el encabezado
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.4);
      doc.setTextColor(51, 65, 85);
      doc.text(msgLines, margin + 3, cursorY + 7.2);

      cursorY += cardHeight + 2.5;
    });

    cursorY += 2;
  }

  // ========================================================
  // 7. DIRECTRICES ESTRATÉGICAS PRIORITARIAS
  // ========================================================
  const directricesHeight = (data.directricesEstrategicas.length * 4.2) + 5;
  if (cursorY + directricesHeight + 8 > maxContentY) {
    doc.addPage();
    cursorY = topMargin;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(`${sectionIndex}. DIRECTRICES ESTRATÉGICAS PRIORITARIAS PARA EL DESPACHO`, margin, cursorY);
  sectionIndex++;
  cursorY += 3;

  doc.setFillColor(241, 245, 249); // slate-100
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, cursorY, pageWidth - (margin * 2), directricesHeight, 1.5, 1.5, 'FD');

  doc.setFontSize(6.8);
  data.directricesEstrategicas.forEach((dir, i) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`• Directriz ${i + 1}:`, margin + 3, cursorY + 4 + (i * 4.2));
    doc.setFont('helvetica', 'normal');
    doc.text(dir, margin + 22, cursorY + 4 + (i * 4.2));
  });

  cursorY += directricesHeight + 5;

  // ========================================================
  // 8. MATRIZ DE GOBERNANZA RACI Y FIRMAS
  // ========================================================
  if (cursorY + 26 > maxContentY) {
    doc.addPage();
    cursorY = topMargin;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`${sectionIndex}. CERTIFICACIÓN DE INTEGRIDAD Y GOBERNANZA RACI`, margin, cursorY);
  cursorY += 3;

  const colWidth = (pageWidth - (margin * 2) - 8) / 3;

  // Firma 1: Responsable Operativo (R)
  const f1 = data.firmasRaci.responsable;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, cursorY + 10, margin + colWidth, cursorY + 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(30, 41, 59);
  doc.text(f1.nombre, margin + (colWidth / 2), cursorY + 13, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  doc.text(`${f1.cargo} • ${f1.cedula}`, margin + (colWidth / 2), cursorY + 15.8, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235);
  doc.text(`[ R ] ${f1.rol}`, margin + (colWidth / 2), cursorY + 18.5, { align: 'center' });

  // Firma 2: Viceministro Aprobador (A)
  const f2 = data.firmasRaci.aprobador;
  const x2 = margin + colWidth + 4;
  doc.line(x2, cursorY + 10, x2 + colWidth, cursorY + 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(30, 41, 59);
  doc.text(f2.nombre, x2 + (colWidth / 2), cursorY + 13, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  doc.text(`${f2.cargo} • ${f2.cedula}`, x2 + (colWidth / 2), cursorY + 15.8, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.text(`[ A ] ${f2.rol}`, x2 + (colWidth / 2), cursorY + 18.5, { align: 'center' });

  // Firma 3: Máxima Autoridad (I)
  const f3 = data.firmasRaci.maximaAutoridad;
  const x3 = x2 + colWidth + 4;
  doc.line(x3, cursorY + 10, x3 + colWidth, cursorY + 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(30, 41, 59);
  doc.text(f3.nombre, x3 + (colWidth / 2), cursorY + 13, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  doc.text(`${f3.cargo} • ${f3.cedula}`, x3 + (colWidth / 2), cursorY + 15.8, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text(`[ I ] ${f3.rol}`, x3 + (colWidth / 2), cursorY + 18.5, { align: 'center' });

  // ========================================================
  // 9. NÚMEROS DE PÁGINA Y NOTA DE SEGURIDAD EN CADA PÁGINA
  // (Ubicados a 242.5 mm, perfectamente por encima del lazo tricolor en 248.7 mm)
  // ========================================================
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(5.8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Vicepresidencia Sectorial de Comunicación y Cultura • SGDO-VSCC • Código Único: ${data.hashIntegridad}`,
      margin,
      242.5
    );
    doc.text(`Página ${p} de ${totalPages}`, pageWidth - margin, 242.5, { align: 'right' });
  }

  // ========================================================
  // 10. APLICAR PLANTILLA INSTITUCIONAL OFICIAL Plantilla.pdf
  // ========================================================
  const finalPdfBytes = await applyPlantillaTemplate(doc);

  return {
    save: (filename: string) => {
      const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    },
    getBytes: () => finalPdfBytes,
    getBlob: () => new Blob([finalPdfBytes], { type: 'application/pdf' }),
    getBlobUrl: () => URL.createObjectURL(new Blob([finalPdfBytes], { type: 'application/pdf' }))
  };
}
