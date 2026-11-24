# REGISTRO DE CAMBIOS, GOBERNANZA RBAC Y MEJORAS DE SEGURIDAD
## Sistema de Gestión y Despliegue Operativo (SGDO) — VSCC MIPPCI
**Fecha de Actualización:** 21 de Octubre de 2026  
**Entorno:** Rectoría Vicepresidencia Sectorial de Comunicación y Cultura (VSCC)  
**Versión de Despliegue:** 2.4.0 (Build RBAC & Security Hardening)

---

## 1. Resumen Ejecutivo de Intervenciones
El presente documento consolida las modificaciones arquitectónicas, de control de acceso basado en roles (RBAC), correcciones de seguridad, sincronización del Catálogo SCIC y refinamientos de interfaz de usuario aplicados al sistema.

---

## 2. Detalle de Modificaciones por Componente

### 2.1. Seguridad y Gobernanza de Acceso (RBAC)
* **Archivo intervenido:** `src/data/usersData.ts`
  - **Reconfiguración de Salas Operativas de Entes (`SALA_OPERATIVA_ENTE`):**
    - Se revocó el acceso al **Dashboard Principal (`DASHBOARD`)**, a la **Gestión de Usuarios (`GESTION_USUARIOS`)** y a los **5 Tableros Especializados C-Level** para los 20 operadores adscritos.
    - Se limitó su alcance estrictamente a:
      1. Su formulario de recolección semanal (`CAPTURA` / `SCIC_ENTE`).
      2. Su Eje técnico institucional asignado (ej. `EJE_2_PLATAFORMAS` para REDTV y CONATEL; `EJE_1_MEDIOS` para VTV, RNV, YVKE; `EJE_3_GESTION` para DGMIR; `EJE_4_MIPCCI` para entes territoriales).
      3. El visor inmutable de trazabilidad (`AUDITORIA_RACI`).
* **Archivo intervenido:** `src/App.tsx`
  - **Ocultamiento del menú desplegable "Tablero de Control":** Si el usuario en sesión (o simulado) no posee dashboards ejecutivos autorizados, el menú desplegable de tableros se oculta completamente de la barra lateral, eliminando opciones vacías o denegadas.
  - **Página de Acceso Denegado Institucional:** Si un usuario intenta forzar la navegación hacia una URL/módulo no autorizado, se despliega una pantalla de bloqueo con el código de su rol, su nivel de acceso y el botón de cierre de sesión.

---

### 2.2. Restricción de Funciones Críticas al Super Administrador (`SUPER_ADMIN`)
Se implementó la regla de negocio que reserva las acciones destructivas o de carga masiva exclusivamente a la cuenta del **Super Administrador**:

* **Botón "Carga Masiva Excel":**
  - **`DataCaptureModule.tsx`:** Protegido con `isSuperAdmin && onOpenExcelImportModal`.
  - **`ExecutiveDashboard.tsx`:** Protegido con `isSuperAdmin && onOpenExcelImportModal`.
  - **`EnteCaptureModule.tsx`:** Oculto para operadores; solo visible si `isSuperAdmin`.
* **Botón "Poner a Cero (0)":**
  - **`DataCaptureModule.tsx`:** Oculto para operadores; reservado a `SUPER_ADMIN`.
  - **`ExecutiveDashboard.tsx`:** Oculto para usuarios ordinarios; reservado a `SUPER_ADMIN`.
  - **Barra Superior Header (`App.tsx`):** El icono de reinicio a cero (`DatabaseZap`) fue condicionado a `isSuperAdmin`, desapareciendo para cualquier otro rol.
* **Botón "Exportar JSON":**
  - **`DataCaptureModule.tsx`:** Oculto para operadores de entes; exclusivo para `SUPER_ADMIN`.
* **Botón "Personalizar Checklist":**
  - **`EnteCaptureModule.tsx`:** Oculto para operadores de sala operativa, evitando que modifiquen de forma no autorizada la asignación oficial de indicadores normados de su ente.
* **Herramienta "Simulador RBAC":**
  - **`DataCaptureModule.tsx`:** Oculto para operadores ordinarios; reservado estrictamente al `SUPER_ADMIN` para auditoría interna.
* **Configuración Global del Sistema (`Settings`):**
  - **`App.tsx`:** Icono en la barra de navegación superior restringido exclusivamente al Super Administrador.

---

### 2.3. Autenticación y Corrección en Login (`LoginModule.tsx`)
* **Normalización de Cédula de Identidad:**
  - El campo de identificación ahora procesa cadenas numéricas puras (`cedula.replace(/\D/g, '')`), permitiendo que funcionarios inicien sesión ingresando tanto `13094821` como `V-13094821`.
* **Eliminación de Fallback Peligroso:**
  - Se eliminó la instrucción de desarrollo que asignaba automáticamente la sesión de Sahib (Super Admin) cuando las credenciales no coincidían exactamente.
  - Ahora se exige coincidencia estricta de cédula y contraseña (`123456` por defecto en entorno de pruebas), mostrando una alerta de credenciales inválidas si los datos son incorrectos.
* **Identidad Visual del Emblema Oficial:**
  - Se configuró el contenedor de `MippciLogo` en el formulario de inicio de sesión con fondo blanco sólido (`bg-white border border-slate-200 shadow-md`), corrigiendo la apariencia translúcida oscura y asegurando máxima legibilidad del logotipo de la VSCC.

---

### 2.4. Sincronización Dinámica del Catálogo SCIC y Checklists por Ente
* **Archivos intervenidos:** `src/App.tsx`, `src/components/ScicCatalogModule.tsx`, `src/components/EnteChecklistManager.tsx`.
* **Acceso Directo Permanente:** Se agregó el módulo `CHECKLIST_ENTES` ("Checklist por Ente") en la barra de navegación lateral con su respectivo badge dinámico.
* **Navegación Cruzada Fluida:**
  - En el **Catálogo SCIC (267 Indicadores)** se integró el botón `"Gestionar Checklists por Ente"`.
  - En el **Gestor de Checklists Dinámicos** se integró el botón `"Ver Catálogo Maestro (267)"` y el botón `"Ir a Captura por Ente"`.
* **Persistencia Inmediata:**
  - La activación o desactivación de indicadores por Ente se guarda automáticamente en `localStorage` bajo la clave `sgdo_ente_indicator_checklist_v1`.
  - Se despacha el evento global `sgdo-checklist-updated` en tiempo real, actualizando instantáneamente la planilla oficial sin necesidad de recargar la página.

---

### 2.5. Optimización de Interfaz y Eliminación de Elementos Redundantes
* **Barra Lateral (`App.tsx`):** Se eliminó el bloque estático de texto `"Codificación Técnica"` (`IMP-001`, `RAD-005`, `TV-008`, `RED-016`, `TDA-002`, `CON-001`) que generaba sobrecarga visual innecesaria.
* **Tablero C-Level (`ExecutiveSinglePaneDashboard.tsx`):** Se eliminó la barra superior informativa de RACI para otorgar 100% de protagonismo a las 8 Macro-Métricas de Impacto Presidencial.

---

### 2.6. Generación del Directorio Maestro de Credenciales (`usuarios.md`)
* Se documentaron las 23 cuentas activas del sistema en el archivo raíz [usuarios.md](file:///d:/Documents/Mippci/VSCC/Sistema_Indicadores/sistema-de-gestión-y-despliegue-operativo-mppci/usuarios.md), clasificadas por:
  - **Nivel Estratégico Ministerial / C-Level (3 usuarios):** Sahib (Super Admin), Ministro, Viceministro.
  - **Nivel Táctico de Supervisión (2 usuarios):** Director General de Medios, Auditora Contralora.
  - **Nivel Operativo de Entes Adscritos (18 usuarios):** Representantes de VTV, RNV, YVKE, Vive TV, Telesur, Radio del Sur, REDTV, CONATEL, AVN, Agencia Venezolana de Noticias, Correo del Orinoco, Ciudad CCS, DGMIR, etc.

---

## 3. Matriz Resumen de Archivos Modificados

| Componente / Archivo | Tipo de Intervención | Impacto Principal |
| :--- | :--- | :--- |
| [`src/App.tsx`](file:///d:/Documents/Mippci/VSCC/Sistema_Indicadores/sistema-de-gesti%C3%B3n-y-despliegue-operativo-mppci/src/App.tsx) | Control de Acceso & Layout | Restricción de encabezado a Super Admin, navegación Checklist y remoción de bloque de códigos. |
| [`src/components/LoginModule.tsx`](file:///d:/Documents/Mippci/VSCC/Sistema_Indicadores/sistema-de-gesti%C3%B3n-y-despliegue-operativo-mppci/src/components/LoginModule.tsx) | Seguridad & Estilos | Normalización de cédulas sin prefijo, bloqueo de fallback y logo con fondo blanco sólido. |
| [`src/components/DataCaptureModule.tsx`](file:///d:/Documents/Mippci/VSCC/Sistema_Indicadores/sistema-de-gesti%C3%B3n-y-despliegue-operativo-mppci/src/components/DataCaptureModule.tsx) | Restricción Funcional | Protección estricta de Carga Masiva Excel, Poner a Cero, Exportar JSON y Simulador RBAC. |
| [`src/components/ExecutiveDashboard.tsx`](file:///d:/Documents/Mippci/VSCC/Sistema_Indicadores/sistema-de-gesti%C3%B3n-y-despliegue-operativo-mppci/src/components/ExecutiveDashboard.tsx) | Restricción Funcional | Ocultamiento de Carga Masiva Excel y Poner a Cero para usuarios que no sean Super Admin. |
| [`src/components/EnteCaptureModule.tsx`](file:///d:/Documents/Mippci/VSCC/Sistema_Indicadores/sistema-de-gesti%C3%B3n-y-despliegue-operativo-mppci/src/components/EnteCaptureModule.tsx) | Gobernanza Operativa | Ocultamiento de Cargar Excel y Personalizar Checklist para operadores de entes. |
| [`src/data/usersData.ts`](file:///d:/Documents/Mippci/VSCC/Sistema_Indicadores/sistema-de-gesti%C3%B3n-y-despliegue-operativo-mppci/src/data/usersData.ts) | Seguridad RBAC | Limitación de módulos autorizados para salas operativas a su formulario y Eje asignado. |
| [`src/components/ScicCatalogModule.tsx`](file:///d:/Documents/Mippci/VSCC/Sistema_Indicadores/sistema-de-gesti%C3%B3n-y-despliegue-operativo-mppci/src/components/ScicCatalogModule.tsx) | Navegación | Botón de redirección hacia el Checklist por Ente. |
| [`src/components/EnteChecklistManager.tsx`](file:///d:/Documents/Mippci/VSCC/Sistema_Indicadores/sistema-de-gesti%C3%B3n-y-despliegue-operativo-mppci/src/components/EnteChecklistManager.tsx) | Navegación & Eventos | Botones de retorno hacia Catálogo SCIC y Captura oficial. |
| [`src/components/dashboards/ExecutiveSinglePaneDashboard.tsx`](file:///d:/Documents/Mippci/VSCC/Sistema_Indicadores/sistema-de-gesti%C3%B3n-y-despliegue-operativo-mppci/src/components/dashboards/ExecutiveSinglePaneDashboard.tsx) | Limpieza Visual | Remoción del cintillo RACI en el tablero de presidencia. |
| [`usuarios.md`](file:///d:/Documents/Mippci/VSCC/Sistema_Indicadores/sistema-de-gesti%C3%B3n-y-despliegue-operativo-mppci/usuarios.md) | Documentación | Matriz integral de credenciales y perfiles de los 23 usuarios para pruebas operativas. |
