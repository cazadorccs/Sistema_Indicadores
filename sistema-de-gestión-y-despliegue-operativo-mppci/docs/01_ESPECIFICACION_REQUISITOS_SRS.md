# Especificación de Requisitos de Software (SRS)
## Sistema de Gestión y Despliegue Operativo (SGDO-VSCC)
**Documento:** `01_ESPECIFICACION_REQUISITOS_SRS.md`  
**Conformidad:** Guía Maestra de Ingeniería de Software MIPPCI (Principio V)  
**Estándar:** IEEE 830 / Given-When-Then  

---

## 1. Requisitos Funcionales (Historias de Usuario)

### RF-01: Autenticación Segura y Control de Acceso RBAC
* **Historia:** Como funcionario público autorizado, quiero ingresar al sistema con mi cédula de identidad y credencial institucional, para acceder únicamente a los módulos autorizados según mi rol RACI.
* **Criterios de Aceptación (Given-When-Then):**
  - **Dado** que un operador de sala operativa (ej. REDTV) ingresa sus credenciales válidas,
  - **Cuando** inicia sesión en el sistema,
  - **Entonces** el sistema debe conceder acceso exclusivo al módulo de Captura y al Eje 2 (Plataformas), bloqueando y ocultando la visualización de Tableros C-Level y Gestión de Usuarios.
  - **Dado** que un usuario ingresa una cédula con formato variado (`13094821`, `V-13094821` o `v-13094821`),
  - **Cuando** presiona ingresar,
  - **Entonces** el sistema debe normalizar los dígitos numéricos y resolver la autenticación sin errores de formato.

### RF-02: Captura Semanal Parametrizada por Ente (SCIC - 267 Indicadores)
* **Historia:** Como operador de sala técnica de un Ente Adscrito, quiero visualizar en mi planilla de captura únicamente los indicadores asignados por norma oficial a mi institución, para evitar errores de llenado.
* **Criterios de Aceptación:**
  - **Dado** que el usuario pertenece al ente VTV,
  - **Cuando** accede a la planilla de captura por Ente,
  - **Entonces** se muestran únicamente los indicadores de televisión y medios audiovisuales activados en su checklist dinámico (`sgdo_ente_indicator_checklist_v1`).
  - **Dado** que el usuario intenta guardar el reporte semanal,
  - **Cuando** se valida la semana epidemiológica y el año,
  - **Entonces** el sistema comprueba la clave de idempotencia `semana_ano_enteId` para impedir sobreescrituras accidentales o registros duplicados.

### RF-03: Refrendo Ministerial C-Level con Sello Criptográfico Inmutable
* **Historia:** Como Ministro / Vicepresidente Sectorial, quiero refrendar formalmente el corte semanal con firma digital SHA-256, para generar el boletín ejecutivo oficial e inmutable.
* **Criterios de Aceptación:**
  - **Dado** que el Ministro visualiza el resumen ejecutivo semanal N° 35,
  - **Cuando** ejecuta la acción de "Refrendar Corte Semanal",
  - **Entonces** el backend genera un hash SHA-256 concatenando la fecha, la semana, los 8 macroindicadores y la identidad ministerial, registrándolo en la cadena inmutable de sellos históricos.

### RF-04: Cálculo Automatizado del Catálogo de Fórmulas SCIC
* **Historia:** Como analista estadístico, quiero que el sistema calcule automáticamente los indicadores compuestos (IAAE, TECP, RCVE, CAFM, ODNP, etc.) a partir de las variables primarias ingresadas.
* **Criterios de Aceptación:**
  - **Dado** un indicador con fórmula `IAAE = (NE / NT) * 100`,
  - **Cuando** el usuario ingresa `NE = 42` y `NT = 50`,
  - **Entonces** el motor de cálculo debe retornar exactamente `84.00%` con estatus `OPTIMO`.
  - **Dado** que `NT = 0`,
  - **Cuando** se evalúa la fórmula,
  - **Entonces** el sistema debe retornar `0` sin producir errores de división por cero ni excepciones de ejecución.

---

## 2. Requisitos No Funcionales (RNF)

| Identificador | Categoría | Métrica Objetivo | Verificación |
| :--- | :--- | :--- | :--- |
| **RNF-01** | Rendimiento (Latencia) | Tiempo de respuesta en API < 80ms (p95) en red local. | Pruebas de carga con suite de integración. |
| **RNF-02** | Resiliencia y Red | Capacidad de operar en modo desconectado (Offline-First). | PWA Cache + IndexedDB en desconexión. |
| **RNF-03** | Integridad Matemática | Claves de idempotencia y sellos SHA-256 verificables. | Suite unitaria `crypto-hash.test.ts`. |
| **RNF-04** | Accesibilidad Visual | Conformidad WCAG 2.2 AA (contraste mínimo 4.5:1, áreas de toque >= 44×44px). | Inspección de layout y CSS semántico. |
| **RNF-05** | Soberanía Tecnológica | 0 dependencias con APIs en nube fuera del territorio nacional. | Despliegue 100% local / Air-gapped. |

---

## 3. Casos Límite y Gestión de Contingencias (Edge Cases)

1. **Pérdida de Conectividad Durante la Captura:**  
   Si la red local o satelital falla mientras el operador carga datos, el formulario debe persistir el borrador en IndexedDB local y mostrar un indicador visual de "Operando Fuera de Línea", sincronizando automáticamente al restablecer la conexión.
2. **Cierre de Corte Semanal Extemporáneo:**  
   Si una sala operativa intenta cargar datos de una semana vencida, el sistema bloquea el guardado a menos que cuente con autorización explícita del `SUPER_ADMIN`.
3. **División por Cero o Datos Nulos:**  
   Cualquier métrica con denominador cero debe evaluarse de forma segura a `0` sin interrumpir la renderización del dashboard.
