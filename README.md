# Sistema de Indicadores y Despliegue Operativo (SGDO - VSCC / MPPCI)

Plataforma unificada de gestión, telemetría institucional, procesamiento soberano de indicadores comunicacionales y refrendo criptográfico de la Vicepresidencia Sectorial de Comunicación y Cultura (VSCC) y el Ministerio del Poder Popular para la Comunicación y la Información (MPPCI).

---

## 🏛️ Estructura del Repositorio

- **sistema-de-gestión-y-despliegue-operativo-mppci/**
  - **Frontend:** Single Page Application (SPA) construida con React 19, TypeScript, Tailwind CSS y Lucide Icons.
  - **Backend Soberano:** API REST en Node 22 + Express con autenticación PBKDF2/scrypt, tokens de sesión HMAC-SHA256 y sellado inmutable mediante Árboles de Merkle RFC 6962.
  - **Persistencia Soberana:** Motor SQLite local en modo WAL (`backend/data/sgdo_soberano.db`) sin dependencias de servicios externos ni telemetría en la nube.
  - **Suites de Pruebas:** Pruebas automatizadas unitarias, de integración, seguridad criptográfica y segregación RBAC.
  - **Corpus Documental:** Especificaciones de requisitos (SRS), arquitectura técnica (TRD), modelo de datos, seguridad y manuales en `docs/`.

- **ARCHITECTURE.md**
  - Documento maestro de arquitectura según estándar C4 (Nivel 2 - Contenedores), grafo de dependencias de componentes, esquema relacional ERD y diagramas de secuencia Mermaid para flujos críticos.

- **Activos y Documentación Complementaria:**
  - `Actualización_matriz_Indicadores/`: Matrices oficiales de indicadores.
  - `logos/`: Identidad gráfica y logotipos vectoriales de la VSCC y entes adscritos.
  - `Pantallas/`: Capturas y especificaciones visuales de la interfaz de usuario.
  - `servicedoc_220630070224/`: Cartografía geoespacial oficial (shapefiles estadales y municipales).

---

## 🔒 Arquitectura de Seguridad y Privacidad

- **Almacenamiento Local Soberano:** Cero transmisión de telemetría a servicios en la nube privativos.
- **Protección Criptográfica de Credenciales:** Contraseñas hasheadas con `scrypt` y sales pseudoaleatorias criptográficamente seguras de 16 bytes.
- **Enrolamiento Multi-Dispositivo:** Verificación de primer ingreso, captura de fotografía oficial (`capture="user"`) y vinculación de huella digital del dispositivo (`bound_device_id`).
- **Autoservicio de Recuperación:** Verificación en dos pasos con nómina oficial y emisión de tokens temporales HMAC-SHA256 con ventana estricta de validez de 15 minutos.
- **Cabeceras de Protección Web:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(self), microphone=(), geolocation=()`.
- **Idempotencia y Trazabilidad:** Restricción matemática de capturas semanales y refrendo ministerial con raíz de Merkle RFC 6962.

---

## 🚀 Puesta en Marcha (Desarrollo Local)

### Requisitos Previos
- Node.js 20+ (recomendado Node.js 22 LTS).
- npm 10+.

### Instalación y Ejecución

```bash
# 1. Ingresar al directorio de la aplicación
cd sistema-de-gestión-y-despliegue-operativo-mppci

# 2. Instalar dependencias
npm install

# 3. Ejecutar suite de pruebas y Quality Gate
npm test
npm run quality-gate

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

---

## 📜 Licencia Institucional

Desarrollado para la Vicepresidencia Sectorial de Comunicación y Cultura (VSCC) y el Ministerio del Poder Popular para la Comunicación y la Información (MPPCI), República Bolivariana de Venezuela. Todos los derechos reservados.
