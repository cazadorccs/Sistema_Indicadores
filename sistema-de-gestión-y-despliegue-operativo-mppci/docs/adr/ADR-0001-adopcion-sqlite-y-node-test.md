# ADR-0001: Adopción de SQLite Soberano y Node Test Runner Nativo
**Fecha:** 2026-11-20  
**Estado:** Aprobado  
**Contexto Institucional:** Vicepresidencia Sectorial de Comunicación y Cultura (VSCC) — MIPPCI  
**Autores:** Equipo de Arquitectura e Ingeniería de Software  

---

## 1. Contexto y Problema
El sistema **SGDO-VSCC** requería dos componentes fundamentales según la Guía Maestra Institucional:
1. Un motor de base de datos local soberano (Local-First), que no dependa de servidores externos pesados (evitando la fragilidad de configuraciones externas en contingencias) y que resista reinicios de la máquina sin perder datos (superando el modelo actual de estado en memoria).
2. Una suite de pruebas automatizadas obligatorias para habilitar el comando `npm test` y garantizar puertas de calidad estrictas en CI/CD.

## 2. Decisiones Evaluadas

### Persistencia Local:
* **Opción A: Servidor PostgreSQL externo.**  
  *Pros:* Robusto, estándar para grandes volúmenes.  
  *Contras:* Requiere dependencias pesadas, instalación de servicios externos, credenciales adicionales y fragilidad en despliegues portátiles o air-gapped.
* **Opción B: SQLite Soberano (Nativo en Node 22 / better-sqlite3).**  
  *Pros:* Base de datos embebida en un único archivo C++, rendimiento C++ ultrarrápido, modo WAL para alta concurrencia de lectura, transacciones ACID reales, cero configuración externa. **(Opción Seleccionada)**.

### Entorno de Testing:
* **Opción A: Jest.**  
  *Contras:* Configuración pesada de babel/ts-jest, conflictos frecuentes con módulos ESM y React 19.
* **Opción B: Runner Nativo de Node.js (`node:test` y `node:assert`) con `tsx`.**  
  *Pros:* Cero dependencias adicionales, ejecución ultrarrápida, soporte nativo de TypeScript mediante `tsx`, compatible al 100% con Node 22. **(Opción Seleccionada)**.

## 3. Consecuencias
* **Positivas:**
  - El sistema cuenta con persistencia transaccional inmediata con cero esfuerzo de infraestructura.
  - La ejecución de pruebas automatizadas es instantánea (< 2 segundos) y funciona en cualquier terminal con Node.js instalado.
  - Cumplimiento estricto del Principio I (Persistencia Local Soberana) y Principio VII (Puertas de Calidad) de la Guía Maestra.
* **Mitigaciones:**
  - En caso de requerir sincronización remota con una base centralizada nacional, SQLite puede replicar asíncronamente mediante réplicas lógicas o volcados periódicos firmados con SHA-256.
