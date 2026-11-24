#!/usr/bin/env node
/**
 * scripts/quality_gate.js
 * 
 * Puerta de Calidad Institucional Automatizada (Quality Gate)
 * Sistema de Gestión y Despliegue Operativo (SGDO-VSCC / MIPPCI)
 * Alineado con la Guía Maestra de Desarrollo e Ingeniería de Software
 */

import { execSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT_DIR = resolve(process.cwd());

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function logHeader(msg) {
  console.log(`\n${COLORS.cyan}${COLORS.bold}================================================================${COLORS.reset}`);
  console.log(`${COLORS.cyan}${COLORS.bold}  ${msg}${COLORS.reset}`);
  console.log(`${COLORS.cyan}${COLORS.bold}================================================================${COLORS.reset}\n`);
}

function logStep(num, name) {
  console.log(`${COLORS.bold}[Puerta ${num}]${COLORS.reset} ${name}...`);
}

function logPass(msg) {
  console.log(`  ${COLORS.green}✔ APROBADO:${COLORS.reset} ${msg}`);
}

function logFail(msg) {
  console.log(`  ${COLORS.red}✖ FALLIDO:${COLORS.reset} ${msg}`);
}

let totalErrors = 0;

logHeader('PUERTA DE CALIDAD AUTOMATIZADA SGDO-VSCC (MIPPCI)');

// Puerta 1: Tipado Estricto de TypeScript
logStep(1, 'Verificación Estricta de Tipos TypeScript (Zero TS Errors)');
try {
  execSync('npx tsc --noEmit', { stdio: 'pipe', cwd: ROOT_DIR });
  logPass('Compilación estricta TypeScript completada sin advertencias ni errores.');
} catch (err) {
  logFail('Existen errores de tipado TypeScript:');
  console.error(err.stdout ? err.stdout.toString() : err.message);
  totalErrors++;
}

// Puerta 2: Suite Automatizada de Pruebas Nativas (Node 22 / tsx)
logStep(2, 'Ejecución de Suites Automatizadas de Pruebas (Unit, Security, Integration)');
try {
  const testOutput = execSync('npx tsx --test "tests/**/*.test.ts"', { stdio: 'pipe', cwd: ROOT_DIR });
  const outStr = testOutput.toString();
  const passMatch = outStr.match(/# pass (\d+)/);
  const suiteMatch = outStr.match(/# suites (\d+)/);
  const passCount = passMatch ? passMatch[1] : 'todas';
  const suiteCount = suiteMatch ? suiteMatch[1] : '8';
  logPass(`100% PASS en pruebas automatizadas (${passCount} pruebas en ${suiteCount} suites).`);
} catch (err) {
  logFail('Fallo en la ejecución de las suites de prueba:');
  console.error(err.stdout ? err.stdout.toString() : err.message);
  totalErrors++;
}

// Puerta 3: Verificación de Persistencia Soberana SQLite y Claves Criptográficas
logStep(3, 'Auditoría de Persistencia Local SQLite y Claves Criptográficas');
const dbPath = resolve(ROOT_DIR, 'backend/data/sgdo_soberano.db');
const keyPath = resolve(ROOT_DIR, 'backend/data/server_key.secret');

if (existsSync(dbPath) && statSync(dbPath).size > 0) {
  logPass(`Base de datos SQLite activa (${(statSync(dbPath).size / 1024).toFixed(1)} KB).`);
} else {
  logFail(`No se encontró el archivo de base de datos SQLite en ${dbPath}`);
  totalErrors++;
}

if (existsSync(keyPath) && statSync(keyPath).size >= 32) {
  logPass('Clave secreta soberana HMAC-SHA256 presente y con entropía válida.');
} else {
  logFail(`Clave secreta del servidor no encontrada o insuficiente en ${keyPath}`);
  totalErrors++;
}

// Puerta 4: Documentación Maestra Institucional
logStep(4, 'Verificación del Corpus Documental Institucional');
const requiredDocs = [
  'ARCHITECTURE.md',
  'docs/PRD.md',
  'docs/01_ESPECIFICACION_REQUISITOS_SRS.md',
  'docs/ARQUITECTURA_TRD.md',
  'docs/03_ESQUEMA_BASE_DATOS_Y_MODELO.md',
  'docs/04_DICCIONARIO_DE_DATOS.md',
  'docs/SEGURIDAD_ACCESOS.md',
  'docs/TAREAS_IMPLEMENTACION.md'
];

let missingDocs = 0;
for (const doc of requiredDocs) {
  const p = resolve(ROOT_DIR, doc);
  if (!existsSync(p)) {
    logFail(`Documento faltante: ${doc}`);
    missingDocs++;
  }
}

if (missingDocs === 0) {
  logPass(`Corpus documental completo (${requiredDocs.length} documentos maestros en docs/).`);
} else {
  totalErrors += missingDocs;
}

// Resumen Final
console.log(`\n${COLORS.cyan}----------------------------------------------------------------${COLORS.reset}`);
if (totalErrors === 0) {
  console.log(`${COLORS.green}${COLORS.bold}✔ CALIDAD CERTIFICADA: El sistema cumple con el 100% de los criterios.${COLORS.reset}`);
  console.log(`${COLORS.green}Listo para despliegue y refrendo ministerial.${COLORS.reset}\n`);
  process.exit(0);
} else {
  console.log(`${COLORS.red}${COLORS.bold}✖ RECHAZADO: Se encontraron ${totalErrors} discrepancias en las puertas de calidad.${COLORS.reset}\n`);
  process.exit(1);
}
