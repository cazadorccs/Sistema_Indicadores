# Datos de Ejemplo para Carga Masiva Automatizada

Esta carpeta contiene archivos de prueba listos para ser cargados mediante el módulo **Carga Masiva Excel** del Sistema de Gestión y Despliegue Operativo del MPPCI:

1. **`Carga_Prueba_Semanal_VTV_2026.xlsx`**:
   - Libro de Microsoft Excel (.xlsx) estructurado con hojas:
     - `Indicadores_Operativos`: 60+ indicadores cuantitativos de VTV (Televisión, Redes, Digitales, Radios, TDA).
     - `Variables_Control`: Metadatos institucionales (Ente: VTV, Semana: 36, Responsable, Cédula).
     - `Instrucciones_Uso`: Guía rápida para el operador.

2. **`Carga_Prueba_Semanal_VTV_2026.csv`**:
   - Versión en texto plano delimitado por comas (.csv) de los indicadores operativos.

---

### Procedimiento de Prueba Recomendado:
1. En la aplicación web (Dashboard o Captura), haga clic en el botón **"Poner a Cero"** y confirme para dejar la planilla en blanco (0%).
2. Haga clic en **"Carga Masiva Excel"** (o **"Carga Excel"** en la barra superior).
3. Seleccione o arrastre el archivo `Carga_Prueba_Semanal_VTV_2026.xlsx` ubicado en esta carpeta.
4. Inspeccione la tabla interactiva de previsualización que muestra los indicadores mapeados y sus valores.
5. Presione **"Aplicar y Cargar al Sistema"**.
6. Observe cómo el Dashboard y los formularios se pueblan automáticamente y se recalculan los índices de efectividad (EE, IRT, ICD, IEC) en tiempo real.
