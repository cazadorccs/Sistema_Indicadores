import os
import zipfile
import io
import shutil
from PIL import Image
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

BASE_DIR = r"D:\Documents\Mippci\VSCC"
ORIGINAL_DOCX = os.path.join(BASE_DIR, "SISTEMA DE INTELIGENCIA COMUNICACIONAL Y GESTIÓN ESTRATÉGICA_ORIGINAL.docx")
TARGET_DOCX = os.path.join(BASE_DIR, "SISTEMA DE INTELIGENCIA COMUNICACIONAL Y GESTIÓN ESTRATÉGICA.docx")
TARGET_PDF_VSCC = os.path.join(BASE_DIR, "SISTEMA DE INTELIGENCIA COMUNICACIONAL Y GESTIÓN ESTRATÉGICA.pdf")

DOCS_DIR = os.path.join(BASE_DIR, r"Sistema_Indicadores\sistema-de-gestión-y-despliegue-operativo-mppci\documentos\documentación")
TARGET_PDF_REPO = os.path.join(DOCS_DIR, "SISTEMA DE INTELIGENCIA COMUNICACIONAL Y GESTIÓN ESTRATÉGICA.pdf")
TARGET_MD = os.path.join(DOCS_DIR, "MANUAL_METODOLOGICO_SGDO_VSCC.md")

print("Iniciando generación de documentación actualizada...")

# 1. Extraer imágenes del docx original para reutilizar encabezados, diagramas y logos
with zipfile.ZipFile(ORIGINAL_DOCX) as z:
    img1_data = z.read('word/media/image1.png')  # Diagrama validación 3 niveles
    img2_raw = z.read('word/media/image2.jpeg')  # Diagrama KPIs (vamos a recortar la caja duplicada)
    img3_data = z.read('word/media/image3.jpeg')  # Diagrama Matriz RACI
    img4_data = z.read('word/media/image4.jpeg')  # Diagrama Flujo de Estados
    img5_data = z.read('word/media/image5.png')   # Logo MPPCI
    img6_data = z.read('word/media/image6.png')   # Logo Bicentenario
    img7_data = z.read('word/media/image7.png')   # Cinta tricolor pie de página

# Recortar imagen 2 para eliminar la caja duplicada 'MASTER'
img2_pil = Image.open(io.BytesIO(img2_raw))
cropped_img2 = img2_pil.crop((0, 0, 1095, 870))
buf2 = io.BytesIO()
cropped_img2.save(buf2, format='JPEG', quality=95)
img2_data = buf2.getvalue()

# Guardar imágenes temporales para python-docx
temp_dir = os.path.join(DOCS_DIR, "temp_assets")
os.makedirs(temp_dir, exist_ok=True)
p_img1 = os.path.join(temp_dir, "diagram_validacion.png")
p_img2 = os.path.join(temp_dir, "diagram_kpis.jpeg")
p_img3 = os.path.join(temp_dir, "diagram_raci.jpeg")
p_img4 = os.path.join(temp_dir, "diagram_flujo.jpeg")
p_logo_mppci = os.path.join(temp_dir, "logo_mppci.png")
p_logo_bicentenario = os.path.join(temp_dir, "logo_bicentenario.png")
p_cinta_footer = os.path.join(temp_dir, "cinta_footer.png")

with open(p_img1, 'wb') as f: f.write(img1_data)
with open(p_img2, 'wb') as f: f.write(img2_data)
with open(p_img3, 'wb') as f: f.write(img3_data)
with open(p_img4, 'wb') as f: f.write(img4_data)
with open(p_logo_mppci, 'wb') as f: f.write(img5_data)
with open(p_logo_bicentenario, 'wb') as f: f.write(img6_data)
with open(p_cinta_footer, 'wb') as f: f.write(img7_data)

print("Imágenes procesadas y optimizadas.")

# Crear nuevo documento Word
doc = docx.Document()

# Configuración de página A4 con márgenes oficiales
section = doc.sections[0]
section.page_width = Inches(8.27)
section.page_height = Inches(11.69)
section.top_margin = Inches(0.9)
section.bottom_margin = Inches(0.9)
section.left_margin = Inches(0.75)
section.right_margin = Inches(0.75)

# Configurar Encabezado oficial (Logos MPPCI y Bicentenario en tabla transparente de 1 fila x 2 cols)
header = section.header
header.is_linked_to_previous = False
tbl_header = header.add_table(rows=1, cols=2, width=Inches(6.77))
tbl_header.alignment = WD_TABLE_ALIGNMENT.CENTER
for row in tbl_header.rows:
    for cell in row.cells:
        tcPr = cell._tc.get_or_add_tcPr()
        tcBorders = parse_xml(r'<w:tcBorders %s><w:top w:val="none"/><w:left w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/></w:tcBorders>' % nsdecls('w'))
        tcPr.append(tcBorders)

c0 = tbl_header.rows[0].cells[0]
c0.width = Inches(4.5)
p_h0 = c0.paragraphs[0]
p_h0.alignment = WD_ALIGN_PARAGRAPH.LEFT
r_h0 = p_h0.add_run()
r_h0.add_picture(p_logo_mppci, width=Inches(2.5))

c1 = tbl_header.rows[0].cells[1]
c1.width = Inches(2.27)
p_h1 = c1.paragraphs[0]
p_h1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
r_h1 = p_h1.add_run()
r_h1.add_picture(p_logo_bicentenario, width=Inches(1.0))

# Configurar Pie de página oficial (Cinta tricolor en el borde)
footer = section.footer
footer.is_linked_to_previous = False
p_f = footer.paragraphs[0]
p_f.alignment = WD_ALIGN_PARAGRAPH.CENTER
r_f = p_f.add_run()
r_f.add_picture(p_cinta_footer, width=Inches(6.77))

# Colores y fuentes de diseño
COLOR_PRIMARY = RGBColor(15, 23, 42)      # Slate 900
COLOR_SECONDARY = RGBColor(30, 58, 138)   # Blue 900
COLOR_ACCENT = RGBColor(220, 38, 38)     # Red 600
COLOR_MUTED = RGBColor(71, 85, 105)      # Slate 600
FONT_FAMILY = "Georama"

def add_title(text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(4)
    run = p.add_run(text)
    run.font.name = FONT_FAMILY
    run.font.size = Pt(17)
    run.font.bold = True
    run.font.color.rgb = COLOR_SECONDARY
    return p

def add_subtitle(text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(14)
    run = p.add_run(text)
    run.font.name = FONT_FAMILY
    run.font.size = Pt(11)
    run.font.bold = True
    run.font.color.rgb = COLOR_MUTED
    return p

def add_heading_1(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = FONT_FAMILY
    run.font.size = Pt(13)
    run.font.bold = True
    run.font.color.rgb = COLOR_SECONDARY
    return p

def add_heading_2(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = FONT_FAMILY
    run.font.size = Pt(11.5)
    run.font.bold = True
    run.font.color.rgb = COLOR_PRIMARY
    return p

def add_heading_3(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = FONT_FAMILY
    run.font.size = Pt(10.5)
    run.font.bold = True
    run.font.color.rgb = COLOR_MUTED
    return p

def add_body(text, bold_prefix=None, space_after=4):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = FONT_FAMILY
        r_pre.font.size = Pt(10)
        r_pre.font.bold = True
        r_pre.font.color.rgb = COLOR_PRIMARY
    run = p.add_run(text)
    run.font.name = FONT_FAMILY
    run.font.size = Pt(10)
    run.font.color.rgb = COLOR_PRIMARY
    return p

def add_bullet(text, bold_prefix=None):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.12
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = FONT_FAMILY
        r_pre.font.size = Pt(9.5)
        r_pre.font.bold = True
        r_pre.font.color.rgb = COLOR_PRIMARY
    run = p.add_run(text)
    run.font.name = FONT_FAMILY
    run.font.size = Pt(9.5)
    run.font.color.rgb = COLOR_PRIMARY
    return p

def add_formula_box(formula_text, description=None):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    
    r = p.add_run(f"    {formula_text}    ")
    r.font.name = "Consolas"
    r.font.size = Pt(10.5)
    r.font.bold = True
    r.font.color.rgb = COLOR_SECONDARY
    
    # Shading gris claro / azulado
    pPr = p._p.get_or_add_pPr()
    shd = parse_xml(r'<w:shd %s w:fill="F1F5F9"/>' % nsdecls('w'))
    pPr.append(shd)
    
    if description:
        p_desc = doc.add_paragraph()
        p_desc.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_desc.paragraph_format.space_before = Pt(0)
        p_desc.paragraph_format.space_after = Pt(6)
        r_desc = p_desc.add_run(description)
        r_desc.font.name = FONT_FAMILY
        r_desc.font.size = Pt(8.5)
        r_desc.font.italic = True
        r_desc.font.color.rgb = COLOR_MUTED

def add_image_page(image_path, width_in=6.2, caption=None):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run()
    r.add_picture(image_path, width=Inches(width_in))
    if caption:
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(0)
        p_cap.paragraph_format.space_after = Pt(8)
        r_cap = p_cap.add_run(caption)
        r_cap.font.name = FONT_FAMILY
        r_cap.font.size = Pt(8.5)
        r_cap.font.italic = True
        r_cap.font.color.rgb = COLOR_MUTED

def style_table(table, col_widths, headers, data, align_cols=None):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    header_tr = table.rows[0]._tr.get_or_add_trPr()
    header_tr.append(parse_xml(r'<w:tblHeader %s/>' % nsdecls('w')))
    
    # Header row
    for col_idx, h_text in enumerate(headers):
        cell = table.cell(0, col_idx)
        cell.width = Inches(col_widths[col_idx])
        cell.text = h_text
        shd = parse_xml(r'<w:shd %s w:fill="1E3A8A"/>' % nsdecls('w'))
        cell._tc.get_or_add_tcPr().append(shd)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(4)
        for r in p.runs:
            r.font.name = FONT_FAMILY
            r.font.size = Pt(8.5)
            r.font.bold = True
            r.font.color.rgb = RGBColor(255, 255, 255)
            
    # Data rows
    for r_idx, row_values in enumerate(data):
        row = table.rows[r_idx + 1]
        bg_color = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for col_idx, val in enumerate(row_values):
            cell = row.cells[col_idx]
            cell.width = Inches(col_widths[col_idx])
            cell.text = str(val)
            shd = parse_xml(r'<w:shd %s w:fill="%s"/>' % (nsdecls('w'), bg_color))
            cell._tc.get_or_add_tcPr().append(shd)
            p = cell.paragraphs[0]
            align = WD_ALIGN_PARAGRAPH.LEFT
            if align_cols and col_idx in align_cols:
                align = align_cols[col_idx]
            p.alignment = align
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(2)
            for r in p.runs:
                r.font.name = FONT_FAMILY
                r.font.size = Pt(8.5)
                r.font.color.rgb = COLOR_PRIMARY
                
    # Table borders
    tblPr = table._tbl.tblPr
    borders = parse_xml(r'<w:tblBorders %s><w:top w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/><w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/><w:left w:val="none"/><w:right w:val="none"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/><w:insideV w:val="none"/></w:tblBorders>' % nsdecls('w'))
    tblPr.append(borders)

print("Escribiendo contenido técnico y metodológico...")

# ----------------- CONTENIDO OFICIAL ACTUALIZADO -----------------

add_title("SISTEMA DE GESTIÓN Y DESPLIEGUE OPERATIVO (SGDO - VSCC)\nSISTEMA DE INTELIGENCIA COMUNICACIONAL Y GESTIÓN ESTRATÉGICA")
add_subtitle("MANUAL METODOLÓGICO Y NORMA TÉCNICA OFICIAL: BASES DE CÁLCULO, VARIABLES DE CONTROL, CHECKLIST POR ENTE, MODOS DE CONTINGENCIA Y MATRIZ DE GOBERNANZA RACI")

# 1. INTRODUCCIÓN Y ALCANCE METODOLÓGICO
add_heading_1("1. INTRODUCCIÓN Y ALCANCE METODOLÓGICO")
add_body(
    "El presente documento constituye la norma técnica y metodológica oficial y de obligatorio cumplimiento para la captura, procesamiento, validación matemática, cálculo compuesto, auditoría y certificación de los indicadores de gestión operativa y estratégica de la Vicepresidencia Sectorial de Comunicación y Cultura (VSCC), el Ministerio del Poder Popular para la Comunicación e Información (MPPCI) y sus veinte (20) Entes Adscritos, agrupados en el Sistema Centralizado de Información Comunicacional (SCIC).",
    bold_prefix="Marco Institucional y Alcance Rector: "
)

add_heading_2("1.1 Objetivos Estratégicos del Sistema")
add_bullet("Establecer una metodología cuantitativa estandarizada para medir con precisión científica la cobertura territorial, operatividad técnica, impacto digital, resiliencia y oportunidad del mensaje público en la República Bolivariana de Venezuela.", bold_prefix="1. Unificación Universal de Criterios: ")
add_bullet("Facilitar la toma de decisiones informadas de la Alta Dirección ante contingencias operativas, planes de defensa de la infraestructura crítica, emergencias climáticas y operaciones psicológicas o de desinformación.", bold_prefix="2. Monitoreo en Tiempo Cuasi-Real y Gestión Situacional: ")
add_bullet("Garantizar la inmutabilidad y no repudio de la información cargada mediante un motor de validación en tres niveles de rigor y generación de sellado criptográfico determinista SHA-256.", bold_prefix="3. Trazabilidad Criptográfica Inmutable: ")
add_bullet("Fijar con precisión jurídica y administrativa el papel de cada funcionario en la cadena de mando (Responsible, Accountable, Consulted, Informed).", bold_prefix="4. Gobernanza y Rendición de Cuentas RACI: ")
add_bullet("Proveer a cada organismo adscrito la flexibilidad de activar indicadores específicos del catálogo general de 267 indicadores acordes a su despliegue operativo o asignación coyuntural.", bold_prefix="5. Check List Dinámico y Personalizable: ")

add_heading_2("1.2 Marco Normativo y Estándares Internacionales")
add_bullet("Artículos 57 (libertad de pensamiento), 58 (derecho a la información oportuna, veraz e imparcial) y 108 (función social primordial de los medios y las TIC).", bold_prefix="Constitución de la República Bolivariana de Venezuela (CRBV): ")
add_bullet("Control estricto de franjas horarias (Todo Usuario, Supervisado, Adulto), cuotas de producción nacional y aportes al Fondo RESORTE.", bold_prefix="Ley de Responsabilidad Social en Radio, Televisión y Medios Electrónicos (Ley RESORTE): ")
add_bullet("Administración y fiscalización soberana del espectro radioeléctrico y certificación de estaciones transmisoras.", bold_prefix="Ley Orgánica de Telecomunicaciones (LOTEL): ")
add_bullet("Pluralidad, diversidad informativa y resiliencia de los medios de servicio público.", bold_prefix="UNESCO - Indicadores de Desarrollo Mediático (MDI): ")
add_bullet("Medición estandarizada de acceso a internet en hogares (THAI) y penetración de banda ancha móvil (TPBAM).", bold_prefix="Unión Internacional de Telecomunicaciones (UIT) - ICT Development Index: ")
add_bullet("Prioridades 1 y 4 sobre alertas tempranas y comunicación multirriesgo.", bold_prefix="Marco de Sendai para la Reducción del Riesgo de Desastres (UNDRR): ")
add_bullet("Indicadores Específicos (Specific), Medibles (Measurable), Alcanzables (Achievable), Relevantes (Relevant) y con Límite Temporal de Corte (Time-bound).", bold_prefix="Criterios SMART / OCDE: ")

doc.add_page_break()

# 2. VARIABLES DE CONTROL DEL SISTEMA
add_heading_1("2. VARIABLES DE CONTROL DEL SISTEMA")
add_body(
    "Las Variables de Control constituyen la cabecera obligatoria de identificación legal, técnica y cronológica de cada reporte semanal. Ningún registro puede ser procesado o incorporado al Tablero Maestro sin la validación previa y estricta de estos metadatos."
)

tbl_vars = doc.add_table(rows=11, cols=4)
headers_v = ["Variable de Control", "Tipo de Dato", "Formato / Rango", "Descripción y Propósito Oficial"]
widths_v = [1.5, 1.1, 1.3, 2.87]
data_v = [
    ["fechaReporte", "Cadena (Fecha)", "AAAA-MM-DD", "Fecha exacta en la que se genera o finaliza la captura del reporte semanal."],
    ["semanaEpidemiologica", "Numérico Entero", "1 a 53", "Semana del calendario epidemiológico estandarizado para seguimiento anual continuo."],
    ["responsableEnte", "Texto", "3 a 120 caracteres", "Nombre y apellido del funcionario titular que certifica la captura de los datos primarios."],
    ["cedulaIdentidad", "Texto RegEx", "^(V|E)-\\d{6,9}$", "Cédula de identidad con prefijo oficial (V- para venezolanos, E- para extranjeros)."],
    ["enteAdscrito", "Alfanumérico", "Catálogo 20 Entes", "Identificador institucional único normalizado del organismo declarante."],
    ["cargoResponsable", "Texto", "3 a 100 caracteres", "Denominación del cargo formal del declarante dentro de la estructura organizativa."],
    ["telefonoContacto", "Texto RegEx", "^04\\d{9}$", "Número de telefonía móvil institucional para verificación y doble factor."],
    ["correo", "Texto Email", "usuario@ente.gob.ve", "Buzón institucional oficial del declarante para acuses y alertas automáticas."],
    ["periodoDesde", "Cadena (Fecha)", "AAAA-MM-DD", "Inicio formal del ciclo evaluado (Lunes 00:00:00)."],
    ["periodoHasta", "Cadena (Fecha)", "AAAA-MM-DD", "Cierre formal del ciclo semanal evaluado (Domingo 23:59:59)."]
]
style_table(tbl_vars, widths_v, headers_v, data_v)

add_heading_2("2.1 Ciclo de Captura y Regla del Corte Semanal (Lunes 10:00 AM)")
add_body(
    "1. Período de Medición: De lunes a domingo continuo.\n"
    "2. Ventana de Carga: La captura se realiza de forma consolidada entre el domingo en la tarde y el lunes a las 10:00 AM.\n"
    "3. Corte Irrevocable de Carga: Toda información remitida posterior al lunes a las 10:00 AM es clasificada automáticamente por el sistema como Extemporánea (esCargaTardia = true).\n"
    "4. Disparo Automático de Alertas de Incumplimiento: El motor de reglas remite de forma inmediata notificaciones de severidad ALTA vía Bot de Telegram y Correo SMTP a la Sala Situacional y al Despacho del Viceministerio rector."
)

add_heading_2("2.2 Motor de Validación en Tres Niveles de Rigor")
add_body(
    "El sistema aplica consecutivamente tres barreras de control algorítmico antes de admitir un reporte en la base de datos de auditoría:"
)
add_bullet("Verificación de campos requeridos, formato de cédula, rango de semana (1 a 53) y porcentajes acotados entre 0% y 100%.", bold_prefix="Nivel 1 - Integridad de Entrada: ")
add_bullet("Consistencia aritmética interna. Ejemplares distribuidos <= tiraje; suma de matriz de vulnerabilidad == nómina activa; horas propias <= horas totales de transmisión.", bold_prefix="Nivel 2 - Consistencia Lógica y Cuadre Interno: ")
add_bullet("Auditoría cruzada contra telemetría de otros módulos. Señal de TV/Radio declarada vs. telemetría REDTV (Delta <= 35%); alcance digital <= población con internet; transmisores declarados vs. catastro del Eje 4.", bold_prefix="Nivel 3 - Validación Cruzada Inter-Módulo: ")

add_image_page(p_img1, width_in=5.8, caption="Figura 1: Arquitectura del Motor de Validación en Tres Niveles y Sellado Criptográfico.")

# 3. BASES DE CÁLCULO POR EJE TEMÁTICO
add_heading_1("3. BASES DE CÁLCULO POR EJE TEMÁTICO")
add_body("Comprende la formulación matemática explícita de los 267 indicadores que integran los cuatro (4) Ejes Estratégicos del Sistema SCIC.")

add_heading_2("EJE 1: MEDIOS PÚBLICOS (OPERATIVA Y DIFUSIÓN)")

add_heading_3("1.A Medios Impresos (IMP-001 al IMP-017)")
add_body("Audita la producción y distribución física de prensa (Correo del Orinoco, Ciudad CCS, etc.):")
add_bullet("Volumen físico de periódicos efectivamente entregados en quioscos, puntos comunales e instituciones.", bold_prefix="IMP-001 (Ejemplares Impresos y Distribuidos): ")
add_bullet("Volumen total de periódicos salidos de rotativa.", bold_prefix="IMP-002 (Tiraje Total): ")
add_bullet("Unidades asignadas a zonas con declaratoria de contingencia o afectación especial.", bold_prefix="IMP-003 (Ejemplares en Zonas Afectadas): ")
add_formula_box(
    "Eficiencia de Distribución (%) = (IMP-001 / IMP-002) * 100",
    "Estándar óptimo: Eficiencia >= 92.0%. Una merma superior al 8.0% genera alerta de logística."
)
add_formula_box(
    "Variación Semanal (%) = ((Ejemplares_Semana_Actual - Ejemplares_Semana_Anterior) / Ejemplares_Semana_Anterior) * 100",
    "Monitoreo de tendencia de circulación territorial."
)

add_heading_3("1.B Radiodifusión Pública (RAD-001 al RAD-018)")
add_body("Evalúa la cadena de emisoras sonoras del Estado (RNV, YVKE Mundial, Radio Miraflores, Radio del Sur):")
add_bullet("Horas efectivas al aire de la señal matriz y repetidoras (máximo teórico 168 horas semanales por circuito).", bold_prefix="RAD-001 (Horas de Transmisión Semanal): ")
add_formula_box(
    "Operatividad de Señal (%) = (Horas_Efectivas_Transmisión / (168 * N_Emisoras)) * 100",
    "Estándar de calidad ministerial: Operatividad >= 95.0%."
)
add_bullet("Horas de contenido original producido por la emisora. Cumplimiento obligatorio de cuota de producción nacional según Ley RESORTE.", bold_prefix="RAD-007 (Horas de Programación Propia): ")
add_formula_box(
    "Operatividad de Transmisores (%) = (Transmisores_Activos / Transmisores_Instalados) * 100",
    "Cálculo directo sobre el parque de transmisión AM y FM."
)

add_heading_3("1.C Televisión Pública (TV-001 al TV-019)")
add_body("Supervisa la operatividad de los canales del Estado (VTV, TVES, ViVe TV, Telesur, Ávila TV):")
add_bullet("Horas de emisión efectiva en parrilla semanal (máximo continuo 168 horas).", bold_prefix="TV-001 (Horas de Transmisión Semanal): ")
add_bullet("Disponibilidad técnica del enlace matriz hacia el telepuerto y la red de distribución primaria.", bold_prefix="TV-002 (Operatividad de Señal TV %): ")
add_formula_box(
    "Operatividad TDA (%) = (Horas_Al_Aire_TDA / 168) * 100",
    "Medición del multiplex digital nacional en coordinación con REDTV."
)
add_formula_box(
    "Disponibilidad de Unidades Móviles (%) = (Móviles_Operativas / Móviles_Totales) * 100",
    "Capacidad de despliegue para transmisiones de campo en vivo."
)

add_heading_3("1.D Portales Digitales Web (WEB-001 al WEB-018)")
add_body("Monitorea el tráfico y retención de las plataformas informativas digitales (AVN, portales ministeriales y medios públicos):")
add_bullet("Sesiones globales registradas en el período evaluado.", bold_prefix="WEB-001 (Visitas al Portal Web): ")
add_bullet("Visitantes no duplicados identificados mediante telemetría.", bold_prefix="WEB-002 (Usuarios Únicos): ")
add_formula_box(
    "Tasa de Rebote (%) = (Sesiones_de_Una_Sola_Página / Total_Sesiones) * 100",
    "Estándar: Rebote <= 45.0%. Valores superiores a 60% indican necesidad de reestructuración de contenidos."
)
add_formula_box(
    "Páginas Vistas por Sesión = Total_Páginas_Vistas / Total_Sesiones",
    "Profundidad de navegación y engagement editorial digital."
)

add_heading_3("1.E Redes Sociales y Plataformas Interactivas (RED-001 al RED-025)")
add_body("Evalúa el alcance orgánico e interacción en X, Facebook, Instagram, TikTok, YouTube y canales de Telegram:")
add_formula_box(
    "Tasa de Crecimiento de Audiencia (TCA %) = ((Seguidores_Actuales - Seguidores_Previos) / Seguidores_Previos) * 100",
    "Velocidad de expansión de la comunidad digital institucional."
)
add_formula_box(
    "Engagement Rate Individual (TE %) = ((Interacciones_Totales) / Alcance_Total_Visualizaciones) * 100",
    "Interacciones = Likes + Reposts/Shares + Comentarios + Guardados."
)

doc.add_page_break()

add_heading_2("EJE 2: PLATAFORMAS DE COMUNICACIONES (INFRAESTRUCTURA Y REGULACIÓN)")

add_heading_3("2.A Empresa de Telecomunicaciones del Estado (REDTV)")
add_bullet("Disponibilidad técnica de los 24 estados.", bold_prefix="RTV-001 (Operatividad Nacional TDA %): ")
add_formula_box(
    "Operatividad Nacional TDA (%) = (Estaciones_TDA_Activas / Estaciones_TDA_Instaladas) * 100",
    "Umbral crítico: Caída por debajo del 85% exige despliegue de cuadrillas técnicas en 24h."
)
add_bullet("Porcentaje de continuidad y estabilidad del enlace con satélites geoestacionarios de cobertura soberana.", bold_prefix="RTV-006 (Potencia y Disponibilidad Banda Ku %): ")
add_formula_box(
    "Disponibilidad de Torres Críticas (%) = (Torres_Operativas / Torres_Críticas_Totales) * 100",
    "Audita las 6 torres estratégicas de Waraira Repano/Mecedores, Zulia, Carabobo, Lara, Monagas y Táchira."
)

add_heading_3("2.B Comisión Nacional de Telecomunicaciones (CONATEL)")
add_bullet("Detección de emisiones no autorizadas e interferencias perjudiciales.", bold_prefix="CON-001 al CON-008 (Fiscalización Radioeléctrica): ")
add_formula_box(
    "Cumplimiento Ley RESORTE (%) = (Inspecciones_Conformes / Total_Inspecciones_Ejecutadas) * 100",
    "Supervisión estricta de franjas horarias y cuotas legales de producción nacional."
)
add_formula_box(
    "Eficiencia Trámites SIGESTEL (%) = (Trámites_Cerrados_en_Plazo / Total_Solicitudes) * 100",
    "Celeridad en autorizaciones y títulos administrativos del sector telecomunicaciones."
)

add_heading_2("EJE 3: GESTIÓN DE COMUNICACIONES (NARRATIVA, OPINIÓN Y TALENTO)")

add_heading_3("3.A Gestión de Narrativa y Monitoreo de Medios")
add_bullet("Detección sistemática de operaciones psicológicas y noticias falsas.", bold_prefix="MON-001 (Matrices de Desinformación Detectadas): ")
add_formula_box(
    "Tasa de Neutralización Comunicacional (%) = (Matrices_Neutralizadas / Total_Matrices_Detectadas) * 100",
    "Capacidad de contraofensiva comunicacional oportuna."
)
add_formula_box(
    "Índice de Balance de Sentimiento Neto (IBS) = ((Menciones_Positivas - Menciones_Negativas) / Total_Menciones) * 100",
    "IBS > 0 refleja balance favorable. IBS < 0 activa directrices prioritarias de contranarrativa."
)

add_heading_3("3.B Índice de Vulnerabilidad Institucional del Talento Humano (IVI)")
add_body("Audita el nivel de riesgo y afectación del personal operativo ante contingencias de salud, transporte y condiciones sociolaborales:")
add_bullet("Personal con afectación severa o baja médica. Ponderador = 3.", bold_prefix="Nivel Rojo: ")
add_bullet("Personal con afectación parcial o riesgo moderado. Ponderador = 1.", bold_prefix="Nivel Amarillo: ")
add_bullet("Personal operativo en condiciones óptimas. Ponderador = 0.", bold_prefix="Nivel Verde: ")
add_formula_box(
    "IVI = ((N_Rojo * 3) + (N_Amarillo * 1) + (N_Verde * 0)) / Nómina_Total_Auditada",
    "Rango de 0.00 a 3.00."
)
add_body(
    "Escala Oficial de Interpretación del IVI:\n"
    "• 0.00 <= IVI < 0.50 (Nivel Verde): Bajo Riesgo / Operatividad Óptima.\n"
    "• 0.50 <= IVI < 1.20 (Nivel Amarillo): Riesgo Moderado / Atención Preventiva.\n"
    "• IVI >= 1.20 (Nivel Rojo): ALERTA CRÍTICA / Activación de Contingencia de Recursos Humanos."
)

doc.add_page_break()

add_heading_2("EJE 4: GESTIÓN DE VICEMINISTERIOS (DESPACHOS Y MACROINDICADORES)")
add_body("Consolida las competencias rectoras de los despachos ministeriales y macroindicadores de país:")

add_heading_3("4.1 Despacho de Comunicación e Información")
add_bullet("Clasificación por formato (Video, Audio, Texto, Mensajería) e impacto potencial estimado de audiencia.", bold_prefix="Monitoreo de Tendencias Virales: ")
add_formula_box(
    "CTR Orgánico (%) = (Clics_Orgánicos / Total_Impresiones_Buscadores) * 100",
    "Efectividad de posicionamiento SEO de las noticias de la Revolución."
)
add_formula_box(
    "Tasa de Conversión de Suscriptores (%) = (Nuevos_Suscriptores / Total_Visitantes_Únicos) * 100",
    "Fidelización en boletines y canales oficiales informativos."
)

add_heading_3("4.2 Despacho de Gestión Comunicacional")
add_formula_box(
    "Tasa de Capacitación Tecnológica SNMP (%) = (Trabajadores_Capacitados / Nómina_Técnica) * 100",
    "Actualización continua en herramientas transmedia e inteligencia artificial aplicada."
)
add_formula_box(
    "Despliegue Popular Transmedia (%) = (Medios_Comunitarios_Articulados / Total_Medios_Registrados) * 100",
    "Integración activa con las Mesas Técnicas de Comunicación y Comunas."
)

add_heading_3("4.3 Viceministerio de Planificación y Estrategia Comunicacional")
add_bullet("Tiempo transcurrido desde el acaecimiento noticioso hasta la publicación definitiva del producto.", bold_prefix="Lead Time Audiovisual: ")
add_formula_box(
    "Tasa de Aprovechamiento Audiovisual (TAA %) = (Horas_Emitidas / Horas_Brutas_Grabadas) * 100",
    "Eficiencia en postproducción y rodaje."
)
add_body("Gestión de Narrativa y Monitoreo de Medios: Publicación semanal de informes de narrativa, resúmenes de vocerías y reportes de primeras planas.")

add_heading_3("4.4 Viceministerio de Soporte de Plataforma Comunicacional (Macroindicadores)")
add_formula_box(
    "Índice de Cobertura Territorial (ICT %) = (Municipios_con_Señal_Pública / 335) * 100",
    "Meta Soberana: Cobertura en los 335 municipios del país."
)
add_formula_box(
    "Tasa de Hogares con Acceso a Internet (THAI %) = (Hogares_Conectados / Total_Hogares_Censo) * 100",
    "Monitoreo de conectividad universal en articulación con Cantv y CONATEL."
)
add_formula_box(
    "Tasa de Penetración Banda Ancha Móvil (TPBAM %) = (Líneas_Móviles_4G_5G / Población_Total) * 100",
    "Despliegue de conectividad celular de alta velocidad."
)
add_formula_box(
    "Índice de Penetración de Medios Digitales (IPMD %) = (Usuarios_Activos_Digitales / Población_Nacional) * 100",
    "Alcance efectivo de la comunicación digital en el país."
)

doc.add_page_break()

# 4. SISTEMA DE KPIS SINTÉTICOS Y EL KPI MAESTRO (IEC)
add_heading_1("4. SISTEMA DE KPIS SINTÉTICOS Y EL KPI MAESTRO (IEC)")
add_body(
    "Para resumir la gestión integral de la comunicación soberana en una métrica ejecutiva de alto nivel, el motor matemático consolida tres (3) pilares sintéticos en el Índice de Efectividad Comunicacional (IEC):"
)

add_image_page(p_img2, width_in=5.8, caption="Figura 2: Estructura de Integración de los KPIs Sintéticos hacia el Master KPI (IEC).")

add_heading_2("4.1 Fórmulas Detalladas de los KPIs Sintéticos")

add_heading_3("1. Tasa de Engagement Ponderada (TEP / EE)")
add_body("Mide la capacidad de conexión emocional, fidelización e impacto de los mensajes institucionales en plataformas digitales:")
add_formula_box(
    "TEP (%) = (Interacciones_Ponderadas_Totales / Vistas_o_Alcance_Total) * 100",
    "Ponderador: Likes (1x), Comentarios (2x), Reposts/Shares (3x), Guardados (4x)."
)

add_heading_3("2. Índice de Cobertura Digital (ICD)")
add_body("Mide el porcentaje de cumplimiento del alcance real frente a las metas de visibilidad fijadas por el Despacho:")
add_formula_box(
    "ICD (%) = min( 100.0, (Alcance_Real_Alcanzado / Meta_Alcance_Institucional) * 100 )",
    "Acotado al 100% para evitar distorsiones por sobrecumplimiento aislado."
)

add_heading_3("3. Índice de Resiliencia Técnica (IRT)")
add_body("Refleja la robustez y continuidad operativa de la infraestructura ante fallas de energía o contingencias:")
add_formula_box(
    "IRT (%) = (Operatividad_TDA + Disponibilidad_Banda_Ku + Disponibilidad_Señal_Medios) / 3",
    "Promedio aritmético del soporte técnico de transmisión."
)

add_heading_3("4. KPI Maestro: Índice de Efectividad Comunicacional (IEC)")
add_body("Promedio aritmético balanceado de los tres pilares de gestión comunicacional (Interacción, Alcance y Soporte Técnico):")
add_formula_box(
    "IEC (%) = (TEP + ICD + IRT) / 3",
    "Puntuación global de desempeño comunicacional y operativo nacional."
)

add_heading_2("4.2 Umbrales de Rendimiento y Disparo Automático de Alertas")
add_bullet("Desempeño estratégico sobresaliente. Metas alcanzadas y alta estabilidad de las señales nacionales.", bold_prefix="• IEC >= 85.0% (Nivel Verde / Óptimo): ")
add_bullet("Operación normal con áreas de optimización en retención de audiencias o mantenimiento preventivo.", bold_prefix="• 70.0% <= IEC < 85.0% (Nivel Amarillo / Aceptable): ")
add_bullet("Alerta Crítica Institucional:\n"
           "  a) Disparo Automático Inmediato: Notificación cifrada remitida vía Telegram y Correo SMTP a la Sala Situacional y al Ministro.\n"
           "  b) Exigencia de Plan de Regularización: Obligatoriedad formal de consignar un plan técnico-editorial en un plazo no mayor a 24 horas.",
           bold_prefix="• IEC < 70.0% (Nivel Rojo / CRÍTICO): ")

doc.add_page_break()

# 5. GESTIÓN DINÁMICA DE CHECKLIST POR ENTE (NUEVA CAPACIDAD OPERATIVA)
add_heading_1("5. GESTIÓN DINÁMICA DE CHECKLIST POR ENTE (CHECK LIST OPERATIVO)")
add_body(
    "En la práctica operativa del Sistema Nacional de Medios Públicos y las telecomunicaciones del Estado, se presentan circunstancias coyunturales donde un organismo adscrito debe reportar sobre indicadores distintos a los inicialmente configurados en su matriz base (por ejemplo, cobertura especial en zonas de frontera, campañas transmedia extraordinarias o contingencias técnicas)."
)

add_heading_2("5.1 Vista Dedicada por Ente y Activación de Indicadores No Marcados")
add_body(
    "Para garantizar la máxima flexibilidad operativa sin perder la gobernanza técnica, el SGDO incorpora el módulo 'Checklist por Ente' (módulo CHECKLIST_ENTES), el cual provee:"
)
add_bullet("Selector desplegable que abarca la totalidad de los 20 Entes Adscritos (VTV, TVES, REDTV, RNV, CONATEL, AVN, etc.).", bold_prefix="1. Selector Universal de Organismos: ")
add_bullet("Filtro prioritario que aísla de inmediato todos los indicadores del catálogo de 267 que NO han sido marcados o asignados al ente, permitiendo su incorporación con un solo clic.", bold_prefix="2. Pestaña Primaria 'No Marcados (Disponibles para Activar)': ")
add_bullet("Panel de auditoría que exhibe los indicadores actualmente operativos que serán exigidos en la hoja de carga semanal.", bold_prefix="3. Pestaña 'Marcados en Checklist': ")
add_bullet("Búsqueda instantánea por código de indicador, nombre, fórmula matemática y eje estratégico.", bold_prefix="4. Búsqueda y Filtros Multidimensionales: ")
add_bullet("Interruptores directos '[ + Activar para {SIGLAS} ]' y '[ - Desactivar ]', junto a comandos masivos de activación de visibles y restablecimiento a la matriz estándar SCIC.", bold_prefix="5. Acciones Inmediatas y en Lote: ")

add_heading_2("5.2 Persistencia Local y Sincronización en Tiempo Real")
add_body(
    "1. Persistencia Inmutable por Ente: Las modificaciones se resguardan de forma independiente bajo la clave de almacenamiento SGDO_CUSTOM_CHECKLIST_ENTE_{enteId}, sobreviviendo a recargas de sesión y reinicios de navegador sin alterar a otros organismos.\n"
    "2. Evento Reactivo de Sincronización: Cada cambio dispara el evento global 'sgdo-checklist-updated', lo que asegura que la hoja de captura semanal (EnteCaptureModule) actualice instantáneamente sus campos de entrada sin requerir refrescar la aplicación.\n"
    "3. Acceso Rápido desde la Hoja de Captura: Los operadores pueden hacer clic en el botón 'Personalizar Checklist' situado en la barra de herramientas de carga semanal para habilitar indicadores coyunturales al instante mediante una ventana modal asistida."
)

# 6. SUBSISTEMA DE ESTADOS SIMULABLES Y CONTINGENCIA
add_heading_1("6. SUBSISTEMA DE ESTADOS SIMULABLES Y CONTINGENCIA OPERATIVA")
add_body(
    "El sistema incorpora un motor de simulación de escenarios extremos que permite anticipar y evaluar la respuesta comunicacional del Estado ante perturbaciones severas:"
)
add_bullet("Operación estándar de tiempo de paz con exigencia del 100% de metas fijadas.", bold_prefix="1. Modo Normal (Estándar): ")
add_bullet("Pondera prioritariamente la disponibilidad de grupos electrógenos de respaldo en plantas transmisoras, enlace satelital Ku y radioenlaces analógicos ante interrupciones del Sistema Eléctrico Nacional (SEN).", bold_prefix="2. Modo Contingencia Eléctrica: ")
add_bullet("Activa protocolos de emergencia para alertas tempranas de Protección Civil y difusión a través de radios comunitarias en cuencas y zonas vulnerables.", bold_prefix="3. Modo Contingencia Climática / Ambiental: ")
add_bullet("Máxima alerta de defensa nacional. Monitoreo 24/7 de operaciones psicológicas, neutralización intensiva de noticias falsas y control centralizado de cadenas y vocerías del Despacho de la Presidencia de la República.", bold_prefix="4. Modo Conmoción / Alerta Máxima: ")
add_body(
    "Gobernanza de Activación: La función de Estados Simulables puede ser habilitada o deshabilitada centralizadamente desde el módulo de Configuración General mediante la variable allowSimulationModes, impidiendo manipulaciones no autorizadas durante auditorías oficiales."
)

doc.add_page_break()

# 7. SUBSISTEMA DE EMISIÓN DEL BOLETÍN EJECUTIVO DE ALTA DIRECCIÓN
add_heading_1("7. SUBSISTEMA DE EMISIÓN DEL BOLETÍN EJECUTIVO DE ALTA DIRECCIÓN")
add_body(
    "El Boletín Ejecutivo constituye el instrumento oficial de despacho mediante el cual la Vicepresidencia Sectorial de Comunicación y Cultura sintetiza semanalmente el estado integral de la comunicación pública para la Alta Dirección del Estado."
)

add_heading_2("7.1 Características del Boletín Oficial en PDF")
add_bullet("El informe se renderiza y descarga en formato PDF de alta resolución, insertándose rigurosamente dentro de la plantilla ministerial institucional (Plantilla.pdf) respetando los márgenes de cabecera y pie de página de 72 pt y 50 pt respectivamente.", bold_prefix="1. Enmarcado en Plantilla Institucional: ")
add_bullet("El boletín incorpora el rótulo oficial: 'Vicepresidencia Sectorial de Comunicación y Cultura • SGDO-VSCC • Código Único: MPPCI-AUTH-XXXXXX-YYYYYY'.", bold_prefix="2. Encabezado Oficial Inmutable: ")
add_bullet("El operador o Viceministro dispone de una caja de texto interactiva en la pantalla modal previa a la descarga para redactar o ajustar las prioridades de la semana (despliegue fronterizo, contraofensiva transmedia, inspecciones técnicas, etc.) garantizando una redacción impecable y cuidando la ortografía oficial.", bold_prefix="3. Directrices Estratégicas Prioritarias Editables: ")
add_bullet("Sintetiza las notificaciones de alta severidad disparadas durante el ciclo semanal hacia los canales de Telegram y correo electrónico.", bold_prefix="4. Integración de Alertas Automáticas (Telegram & SMTP): ")

# 8. EL MÉTODO RACI Y LA GOBERNANZA MINISTERIAL
add_heading_1("8. EL MÉTODO RACI Y LA GOBERNANZA MINISTERIAL")
add_body(
    "El sistema adopta la metodología internacional RACI para erradicar la ambigüedad en la captura y validación de las cifras oficiales del Estado venezolano."
)

add_image_page(p_img3, width_in=5.6, caption="Figura 3: Matriz de Roles y Responsabilidades RACI aplicada al Ecosistema MPPCI / VSCC.")

add_heading_2("8.1 Definición Formal de Roles")
add_bullet("Directores de Operaciones, Jefes de Redacción, Directores Técnicos o Coordinadores Estadísticos del Ente. Recopilan los datos de telemetría y bitácoras y realizan la carga antes del corte del lunes a las 10:00 AM.", bold_prefix="1. R - Responsible (Responsable / Capturador Operativo): ")
add_bullet("Viceministros(as) del área rectora, Director General de CONATEL o Presidente de REDTV. Revisa la consistencia política y técnica y emite el dictamen final: APROBADO o remitido a corrección (OBSERVADO). Regla de Oro: Existe estrictamente UN SOLO funcionario con rol 'A' por indicador o reporte.", bold_prefix="2. A - Accountable (Aprobador / Garante Institucional): ")
add_bullet("Consultoría Jurídica, Ciberseguridad, Médicos de Salud Laboral (INPSASEL) y Auditoría Interna. Proveen peritajes especializados en Nivel 3.", bold_prefix="3. C - Consulted (Consultado / Soporte Experto): ")
add_bullet("Ministro(a) del Poder Popular para la Comunicación e Información, Despacho de la Vicepresidencia Sectorial de Comunicación y Cultura y Sala Situacional de la Presidencia de la República. Consumen tableros y boletines ejecutivos en tiempo real.", bold_prefix="4. I - Informed (Informado / Destinatario Estratégico): ")

add_heading_2("8.2 Trazabilidad Criptográfica Inmutable (Hash Determinista)")
add_body(
    "Cada reporte refrendado genera un código hash criptográfico determinista SHA-256 a partir del payload canónico de los datos capturados y las firmas digitales de los funcionarios intervinientes:\n"
    "    Formato Oficial: MPPCI-AUTH-[HASH8]-[SALT8]\n"
    "    Ejemplo: MPPCI-AUTH-5FE822C0-MV7DGKG4\n"
    "Este sello es inmutable, se graba en el libro de auditoría digital y se estampa en el Boletín Ejecutivo Oficial."
)

add_image_page(p_img4, width_in=5.4, caption="Figura 4: Flujo de Estados del Reporte Semanal (Borrador -> En Revisión -> Aprobado / Observado -> Corregido).")

doc.add_page_break()

# 9. CATÁLOGO CONSOLIDADO: LOS 20 ENTES ADSCRITOS Y 267 INDICADORES SCIC
add_heading_1("9. CATÁLOGO CONSOLIDADO: LOS 20 ENTES ADSCRITOS Y 267 INDICADORES SCIC")
add_body(
    "A continuación se presenta la nómina oficial y normalizada de los veinte (20) organismos adscritos que conforman el ecosistema de reporte del Sistema Centralizado de Información Comunicacional (SCIC):"
)

tbl_entes = doc.add_table(rows=21, cols=4)
headers_e = ["Siglas Oficiales", "Nombre Institucional del Ente", "Eje Primario", "Tipo de Medio / Competencia"]
widths_e = [1.2, 2.5, 1.2, 1.87]
data_e = [
    ["VTV", "Venezolana de Televisión C.A.", "Eje 1", "Televisión Pública Matriz"],
    ["TVES", "Corporación Venezolana de Telecomunicaciones", "Eje 1", "Televisión Generalista y Producción"],
    ["VIVE", "ViVe Televisión (Visión Venezuela)", "Eje 1", "Televisión Cultural y Poder Popular"],
    ["AVILA", "Fundación Ávila TV", "Eje 1", "Televisión Juvenil y Urbana"],
    ["TELESUR", "Nueva Televisión del Sur (TeleSUR)", "Eje 1", "Televisión Informativa Internacional"],
    ["RNV", "Radio Nacional de Venezuela", "Eje 1", "Circuito Radial Informativo Matriz"],
    ["YVKE", "YVKE Mundial Radio", "Eje 1", "Circuito Radial Popular"],
    ["MIRAFLORES", "Radio Miraflores (La Voz de la Verdad)", "Eje 1", "Radiodifusión de Despacho"],
    ["SUR", "Radio del Sur", "Eje 1", "Radiodifusión Internacional del Sur"],
    ["CORREO", "Fundación Correo del Orinoco", "Eje 1", "Prensa Impresa y Edición Digital"],
    ["CIUDAD_CCS", "Fundación Ciudad Caracas (Ciudad CCS)", "Eje 1", "Prensa Impresa y Portales Locales"],
    ["AVN", "Agencia Venezolana de Noticias", "Eje 1", "Agencia Matriz de Información"],
    ["REDTV", "Empresa de Telecomunicaciones del Estado", "Eje 2", "Infraestructura TDA y Banda Ku"],
    ["CONATEL", "Comisión Nacional de Telecomunicaciones", "Eje 2", "Regulación y Espectro Radioeléctrico"],
    ["CANTV", "Compañía Anónima Nacional Teléfonos de Venezuela", "Eje 2", "Conectividad e Internet en Hogares"],
    ["MOVILNET", "Telecomunicaciones Movilnet C.A.", "Eje 2", "Telefonía Móvil y Banda Ancha Celular"],
    ["CEBAC", "Centro de Comunicación y Batería Comunicacional", "Eje 3", "Monitoreo y Despliegue de Redes"],
    ["CNDIS", "Centro Nacional del Disco", "Eje 3", "Producción Fonográfica Soberana"],
    ["ABAE", "Agencia Bolivariana para Actividades Espaciales", "Eje 2", "Operación y Telemetría Satelital"],
    ["MAC", "Dirección General de Medios Comunitarios", "Eje 4", "Articulación con Medios Alternativos"]
]
style_table(tbl_entes, widths_e, headers_e, data_e)

add_body(
    "Distribución de los 267 Indicadores SCIC por Eje Estratégico:\n"
    "• Eje 1 (Medios Públicos): 112 Indicadores (Televisión, Radio, Prensa Impresa, Portales Web y Redes Sociales).\n"
    "• Eje 2 (Plataformas y Telecomunicaciones): 54 Indicadores (TDA, Satélite Banda Ku, Espectro, Banda Ancha e Internet).\n"
    "• Eje 3 (Gestión Comunicacional y Talento Humano): 46 Indicadores (Monitoreo de Matrices, Alertas Tempranas, IVI y Redes).\n"
    "• Eje 4 (Despachos y Viceministerios): 55 Indicadores (Políticas Rectoras, Capacitación SNMP, Cobertura Territorial y Macroindicadores de País)."
)

# 10. REFRENDO Y FIRMA OFICIAL
add_heading_1("10. VALIDACIÓN TÉCNICA Y FIRMA OFICIAL")
add_body(
    "El presente Manual Metodológico ha sido revisado, auditado y validado en sus bases de cálculo, variables de control, gobernanza RACI y herramientas informáticas para su aplicación estricta en todos los módulos de captura, validación, cálculo de telemetría y auditoría del SGDO - VSCC / MPPCI.",
    space_after=14
)

p_sign = doc.add_paragraph()
p_sign.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_sign.paragraph_format.space_before = Pt(16)
p_sign.paragraph_format.space_after = Pt(2)
r_sign1 = p_sign.add_run("SAHIB ALEXANDER FRANCO VILLANUEVA\n")
r_sign1.font.name = FONT_FAMILY
r_sign1.font.size = Pt(11)
r_sign1.font.bold = True
r_sign1.font.color.rgb = COLOR_SECONDARY

r_sign2 = p_sign.add_run(
    "Director General de la Oficina de Tecnología de la Comunicación y la Información\n"
    "Ministerio del Poder Popular para la Comunicación e Información (MPPCI)\n"
    "Vicepresidencia Sectorial de Comunicación y Cultura (VSCC)\n"
    "Gaceta Oficial de la República Bolivariana de Venezuela N° 43.333 de fecha 11/03/2026"
)
r_sign2.font.name = FONT_FAMILY
r_sign2.font.size = Pt(9.5)
r_sign2.font.color.rgb = COLOR_MUTED

# Guardar el documento DOCX actualizado
doc.save(TARGET_DOCX)
print(f"Documento DOCX generado exitosamente: {TARGET_DOCX}")

# 2. Compilar DOCX a PDF usando Word 16 COM
print("Compilando PDF oficial mediante Microsoft Word COM...")
import win32com.client

word = win32com.client.Dispatch("Word.Application")
word.Visible = False
try:
    doc_com = word.Documents.Open(TARGET_DOCX)
    # Guardar en VSCC y en el repositorio del proyecto
    doc_com.SaveAs(TARGET_PDF_VSCC, FileFormat=17) # 17 = wdFormatPDF
    doc_com.SaveAs(TARGET_PDF_REPO, FileFormat=17)
    doc_com.Close()
    print("PDFs compilados exitosamente!")
    print(f"  - VSCC: {TARGET_PDF_VSCC} ({os.path.getsize(TARGET_PDF_VSCC)} bytes)")
    print(f"  - Repositorio: {TARGET_PDF_REPO} ({os.path.getsize(TARGET_PDF_REPO)} bytes)")
finally:
    word.Quit()

# 3. Generar la versión completa en Markdown para lectura inmediata en el repositorio
print("Generando versión en Markdown...")
md_content = f"""# SISTEMA DE GESTIÓN Y DESPLIEGUE OPERATIVO (SGDO - VSCC)
## SISTEMA DE INTELIGENCIA COMUNICACIONAL Y GESTIÓN ESTRATÉGICA
### MANUAL METODOLÓGICO Y NORMA TÉCNICA OFICIAL
**Bases de Cálculo, Variables de Control, Check List por Ente, Modos de Contingencia y Matriz de Gobernanza RACI**

---

## 1. INTRODUCCIÓN Y ALCANCE METODOLÓGICO
El presente documento constituye la norma técnica y metodológica oficial y de obligatorio cumplimiento para la captura, procesamiento, validación matemática, cálculo compuesto, auditoría y certificación de los indicadores de gestión operativa y estratégica de la **Vicepresidencia Sectorial de Comunicación y Cultura (VSCC)**, el **Ministerio del Poder Popular para la Comunicación e Información (MPPCI)** y sus **veinte (20) Entes Adscritos**, agrupados en el **Sistema Centralizado de Información Comunicacional (SCIC)**.

### 1.1 Objetivos Estratégicos del Sistema
1. **Unificación Universal de Criterios:** Metodología cuantitativa estandarizada para medir cobertura territorial, operatividad técnica, impacto digital y resiliencia comunicacional.
2. **Monitoreo en Tiempo Cuasi-Real y Gestión Situacional:** Toma de decisiones informadas de la Alta Dirección ante contingencias, alertas climáticas y operaciones de desinformación.
3. **Trazabilidad Criptográfica Inmutable:** Tres niveles de rigor de validación matemática y sellado criptográfico determinista SHA-256 (`MPPCI-AUTH-XXXXXX-YYYYYY`).
4. **Gobernanza RACI:** Delimitación formal de responsabilidades en la cadena de mando (*Responsible, Accountable, Consulted, Informed*).
5. **Check List Dinámico y Personalizable:** Flexibilidad para activar indicadores coyunturales del catálogo general de 267 indicadores para cada ente adscrito.

### 1.2 Marco Normativo y Estándares
* **Constitución de la República Bolivariana de Venezuela (CRBV):** Artículos 57, 58 y 108.
* **Ley RESORTE:** Franjas horarias (Todo Usuario, Supervisado, Adulto), producción nacional y Fondo RESORTE.
* **Ley Orgánica de Telecomunicaciones (LOTEL):** Administración soberana del espectro radioeléctrico.
* **UNESCO (MDI):** Indicadores de pluralidad y desarrollo de medios públicos.
* **UIT (IDI):** Acceso universal a internet en hogares (THAI) y penetración de banda ancha móvil (TPBAM).
* **Marco de Sendai (UNDRR):** Alertas tempranas y comunicación multirriesgo.

---

## 2. VARIABLES DE CONTROL DEL SISTEMA
Ficha técnica obligatoria de cada reporte semanal:

| Variable de Control | Tipo de Dato | Formato / Rango | Descripción y Propósito Oficial |
| :--- | :--- | :--- | :--- |
| `fechaReporte` | Cadena (Fecha) | AAAA-MM-DD | Fecha de generación o finalización de la captura del reporte. |
| `semanaEpidemiologica` | Numérico Entero | 1 a 53 | Semana epidemiológica/calendario estandarizada. |
| `responsableEnte` | Texto | 3 a 120 caracteres | Funcionario titular que certifica los datos primarios. |
| `cedulaIdentidad` | Texto RegEx | `^(V\|E)-\\d{{6,9}}$` | Cédula de identidad oficial (V- venezolanos, E- extranjeros). |
| `enteAdscrito` | Alfanumérico | Catálogo 20 Entes | Identificador institucional normalizado del organismo. |
| `cargoResponsable` | Texto | 3 a 100 caracteres | Cargo formal del declarante dentro de la estructura institucional. |
| `telefonoContacto` | Texto RegEx | `^04\\d{{9}}$` | Número móvil para verificación y doble factor de autenticación. |
| `correo` | Texto Email | `usuario@ente.gob.ve` | Buzón oficial para recepción de acuses y alertas automáticas. |
| `periodoDesde` | Cadena (Fecha) | AAAA-MM-DD | Inicio formal del ciclo evaluado (Lunes 00:00:00). |
| `periodoHasta` | Cadena (Fecha) | AAAA-MM-DD | Cierre formal del ciclo semanal evaluado (Domingo 23:59:59). |

### 2.1 Ciclo de Captura y Regla del Corte Semanal
* **Período de Medición:** Lunes a domingo.
* **Ventana de Carga:** Domingo por la tarde al **lunes a las 10:00 AM**.
* **Corte Irrevocable:** Cargas posteriores a las 10:00 AM se clasifican como **Extemporáneas** (`esCargaTardia = true`).
* **Alertas de Incumplimiento:** Notificación automática de severidad ALTA vía Telegram y Correo SMTP a la Sala Situacional y al Despacho del Viceministerio.

### 2.2 Motor de Validación en Tres Niveles
1. **Nivel 1 (Integridad de Entrada):** Campos requeridos, formato de cédula, semana (1 a 53) y porcentajes entre 0% y 100%.
2. **Nivel 2 (Consistencia Lógica y Cuadre Interno):** Ejemplares distribuidos <= tiraje total; suma IVI == nómina auditada; horas propias <= horas totales de transmisión.
3. **Nivel 3 (Validación Cruzada Inter-Módulo):** Señal TV/Radio declarada vs. telemetría REDTV (Delta <= 35%); alcance digital orgánico <= población con internet; transmisores censados en Eje 4.

---

## 3. BASES DE CÁLCULO POR EJE TEMÁTICO (FÓRMULAS OFICIALES)

### EJE 1: MEDIOS PÚBLICOS (OPERATIVA Y DIFUSIÓN)
* **Medios Impresos (IMP-001 al IMP-017):**
  $$\\text{{Eficiencia de Distribución (\\%)}} = \\left(\\frac{{\\text{{Ejemplares Distribuidos}}}}{{\\text{{Tiraje Total}}}}\\right) \\times 100$$
  $$\\text{{Variación Semanal (\\%)}} = \\left(\\frac{{\\text{{Ejemplares Actuales}} - \\text{{Ejemplares Semana Anterior}}}}{{\\text{{Ejemplares Semana Anterior}}}}\\right) \\times 100$$
* **Radiodifusión Pública (RAD-001 al RAD-018):**
  $$\\text{{Operatividad de Señal (\\%)}} = \\left(\\frac{{\\text{{Horas Efectivas al Aire}}}}{{168 \\times N_{{\\text{{Emisoras}}}}}}\\right) \\times 100$$
  $$\\text{{Operatividad de Transmisores (\\%)}} = \\left(\\frac{{\\text{{Transmisores Activos}}}}{{\\text{{Transmisores Instalados}}}}\\right) \\times 100$$
* **Televisión Pública (TV-001 al TV-019):**
  $$\\text{{Operatividad TDA (\\%)}} = \\left(\\frac{{\\text{{Horas al Aire TDA}}}}{{168}}\\right) \\times 100$$
  $$\\text{{Disponibilidad Unidades Móviles (\\%)}} = \\left(\\frac{{\\text{{Móviles Operativas}}}}{{\\text{{Móviles Totales}}}}\\right) \\times 100$$
* **Portales Web (WEB-001 al WEB-018):**
  $$\\text{{Tasa de Rebote (\\%)}} = \\left(\\frac{{\\text{{Sesiones de Una Sola Página}}}}{{\\text{{Total Sesiones}}}}\\right) \\times 100$$
  $$\\text{{Páginas Vistas por Sesión}} = \\frac{{\\text{{Total Páginas Vistas}}}}{{\\text{{Total Sesiones}}}}$$
* **Redes Sociales (RED-001 al RED-025):**
  $$TCA (\\%) = \\left(\\frac{{\\text{{Seguidores Actuales}} - \\text{{Seguidores Previos}}}}{{\\text{{Seguidores Previos}}}}\\right) \\times 100$$
  $$TE (\\%) = \\left(\\frac{{\\text{{Likes + Shares + Comentarios + Guardados}}}}{{\\text{{Alcance / Vistas}}}}\\right) \\times 100$$

### EJE 2: PLATAFORMAS DE COMUNICACIONES (INFRAESTRUCTURA Y REGULACIÓN)
* **REDTV:**
  $$RTV\\text{{-}}001 (\\text{{Operatividad TDA \\%}}) = \\left(\\frac{{\\text{{Estaciones TDA Activas}}}}{{\\text{{Estaciones TDA Instaladas}}}}\\right) \\times 100$$
  $$\\text{{Disponibilidad Torres Críticas (\\%)}} = \\left(\\frac{{\\text{{Torres Operativas}}}}{{6}}\\right) \\times 100$$
* **CONATEL:**
  $$\\text{{Cumplimiento Ley RESORTE (\\%)}} = \\left(\\frac{{\\text{{Inspecciones Conformes}}}}{{\\text{{Total Inspecciones}}}}\\right) \\times 100$$
  $$\\text{{Eficiencia SIGESTEL (\\%)}} = \\left(\\frac{{\\text{{Trámites Cerrados a Tiempo}}}}{{\\text{{Total Solicitudes}}}}\\right) \\times 100$$

### EJE 3: GESTIÓN DE COMUNICACIONES (NARRATIVA, OPINIÓN Y TALENTO)
* **Gestión de Narrativa:**
  $$\\text{{Tasa de Neutralización (\\%)}} = \\left(\\frac{{\\text{{Matrices Neutralizadas}}}}{{\\text{{Total Matrices Detectadas}}}}\\right) \\times 100$$
  $$IBS = \\left(\\frac{{\\text{{Menciones Favorables}} - \\text{{Menciones Desfavorables}}}}{{\\text{{Total Menciones}}}}\\right) \\times 100$$
* **Índice de Vulnerabilidad Institucional del Talento Humano (IVI):**
  $$IVI = \\frac{{(N_{{\\text{{Rojo}}}} \\times 3) + (N_{{\\text{{Amarillo}}}} \\times 1) + (N_{{\\text{{Verde}}}} \\times 0)}}{{\\text{{Nómina Total Auditada}}}}$$
  * Escala: `0.00 <= IVI < 0.50` (Verde / Óptimo); `0.50 <= IVI < 1.20` (Amarillo / Preventivo); `IVI >= 1.20` (Rojo / Contingencia de RRHH).

### EJE 4: GESTIÓN DE VICEMINISTERIOS (DESPACHOS Y MACROINDICADORES)
* **SEO Editorial:** $CTR (\\%) = (\\text{{Clics Orgánicos}} / \\text{{Impresiones Buscadores}}) \\times 100$
* **Aprovechamiento Audiovisual:** $TAA (\\%) = (\\text{{Horas Emitidas}} / \\text{{Horas Brutas Grabadas}}) \\times 100$
* **Cobertura Territorial:** $ICT (\\%) = (\\text{{Municipios con Señal Pública}} / 335) \\times 100$
* **Hogares con Internet:** $THAI (\\%) = (\\text{{Hogares Conectados}} / \\text{{Total Hogares}}) \\times 100$
* **Banda Ancha Móvil:** $TPBAM (\\%) = (\\text{{Líneas Móviles 4G/5G}} / \\text{{Población Total}}) \\times 100$

---

## 4. SISTEMA DE KPIS SINTÉTICOS Y EL KPI MAESTRO (IEC)
* **Tasa de Engagement Ponderada (TEP / EE):** $((\\text{{Interacciones Ponderadas}}) / \\text{{Alcance Total}}) \\times 100$
* **Índice de Cobertura Digital (ICD):** $\\min(100.0, (\\text{{Alcance Real}} / \\text{{Meta Institucional}}) \\times 100)$
* **Índice de Resiliencia Técnica (IRT):** $(\\%\\text{{TDA}} + \\%\\text{{Banda Ku}} + \\%\\text{{Señal Medios}}) / 3$
* **KPI Maestro (IEC):**
  $$IEC = \\frac{{TEP + ICD + IRT}}{{3}}$$

### Umbrales de Rendimiento y Disparo Automático:
* **Verde ($\ge 85.0\\%$):** Desempeño óptimo. Metas alcanzadas y alta estabilidad de las señales.
* **Amarillo ($70.0\\% \\le IEC < 85.0\\%$):** Operación aceptable con áreas de optimización.
* **Rojo ($IEC < 70.0\\%$):** Alerta Crítica Institucional. Disparo automático de alertas vía Telegram/SMTP al Despacho del Ministro y consignación obligatoria de Plan de Regularización Técnica en menos de 24 horas.

---

## 5. GESTIÓN DINÁMICA DE CHECKLIST POR ENTE (CHECK LIST OPERATIVO)
* **Vista Dedicada por Ente (`CHECKLIST_ENTES`):** Permite explorar y activar indicadores que inicialmente no estaban asignados a un organismo.
* **Pestañas:** *'No Marcados (Disponibles para Activar)'*, *'Marcados en Checklist'* y *'Todos (Catálogo 267)'*.
* **Persistencia:** Almacenamiento independiente por ente (`SGDO_CUSTOM_CHECKLIST_ENTE_{{enteId}}`).
* **Sincronización:** Evento global reactivo `sgdo-checklist-updated` e integración directa con la planilla de carga semanal (`EnteCaptureModule`).

---

## 6. SUBSISTEMA DE ESTADOS SIMULABLES Y CONTINGENCIA
* **Modos de Simulación:** Normal, Contingencia Eléctrica (Plan SEN), Contingencia Climática / Ambiental y Conmoción / Alerta Máxima.
* **Gobernanza:** Activación y desactivación centralizada desde Configuración General (`allowSimulationModes`).

---

## 7. EMISIÓN DEL BOLETÍN EJECUTIVO DE ALTA DIRECCIÓN
* **Formato Oficial:** Descargable en PDF insertado en la plantilla institucional (`Plantilla.pdf`).
* **Encabezado Inmutable:** *\"Vicepresidencia Sectorial de Comunicación y Cultura • SGDO-VSCC • Código Único: MPPCI-AUTH-XXXXXX-YYYYYY\"*.
* **Directrices Estratégicas Editables:** Campo editable en pantalla para que el operador o Viceministro ajuste las prioridades de despacho antes de la emisión del documento.

---

## 8. MATRIZ RACI Y GOBERNANZA MINISTERIAL
* **R (Responsible):** Operador técnico o estadístico que carga la información primaria.
* **A (Accountable):** Viceministro(a) rector(a) del área o Director General de Ente Regulador. Único refrendador oficial.
* **C (Consulted):** Consultoría Jurídica, Seguridad de Redes, Auditoría Interna e INPSASEL.
* **I (Informed):** Ministro(a) MPPCI, Vicepresidencia Sectorial de Comunicación y Cultura y Presidencia de la República.
* **Sello Inmutable:** Hash determinista SHA-256 (`MPPCI-AUTH-[HASH8]-[SALT8]`).
* **Ciclo de Estados:** Borrador $\\to$ En Revisión $\\to$ Aprobado / Observado $\\to$ Corregido.

---

## 9. CATÁLOGO DE LOS 20 ENTES ADSCRITOS Y 267 INDICADORES SCIC
1. **VTV** - Venezolana de Televisión C.A.
2. **TVES** - Corporación Venezolana de Telecomunicaciones
3. **VIVE** - ViVe Televisión (Visión Venezuela)
4. **AVILA** - Fundación Ávila TV
5. **TELESUR** - Nueva Televisión del Sur
6. **RNV** - Radio Nacional de Venezuela
7. **YVKE** - YVKE Mundial Radio
8. **MIRAFLORES** - Radio Miraflores (La Voz de la Verdad)
9. **SUR** - Radio del Sur
10. **CORREO** - Fundación Correo del Orinoco
11. **CIUDAD_CCS** - Fundación Ciudad Caracas (Ciudad CCS)
12. **AVN** - Agencia Venezolana de Noticias
13. **REDTV** - Empresa de Telecomunicaciones del Estado
14. **CONATEL** - Comisión Nacional de Telecomunicaciones
15. **CANTV** - Compañía Anónima Nacional Teléfonos de Venezuela
16. **MOVILNET** - Telecomunicaciones Movilnet C.A.
17. **CEBAC** - Centro de Comunicación y Batería Comunicacional
18. **CNDIS** - Centro Nacional del Disco
19. **ABAE** - Agencia Bolivariana para Actividades Espaciales
20. **MAC** - Dirección General de Medios Comunitarios y Alternativos

---

## 10. REFRENDO Y FIRMA OFICIAL
**SAHIB ALEXANDER FRANCO VILLANUEVA**  
Director General de la Oficina de Tecnología de la Comunicación y la Información  
Ministerio del Poder Popular para la Comunicación e Información (MPPCI)  
Vicepresidencia Sectorial de Comunicación y Cultura (VSCC)  
*Gaceta Oficial de la República Bolivariana de Venezuela N° 43.333 de fecha 11/03/2026*
"""

with open(TARGET_MD, 'w', encoding='utf-8') as f:
    f.write(md_content)

print(f"Versión Markdown generada exitosamente: {TARGET_MD}")

# Limpiar directorio temporal
shutil.rmtree(temp_dir, ignore_errors=True)
print("Archivos temporales eliminados. Proceso finalizado con éxito.")
