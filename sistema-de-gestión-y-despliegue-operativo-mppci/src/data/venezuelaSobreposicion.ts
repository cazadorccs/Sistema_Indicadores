// Zonas de Sobreposición de Jurisdicción Limítrofe entre Estados
// Registradas formalmente con cod_ent: "00" en la capa oficial estadal IGVSB 1:250.000 (ba_4189_dpt_estadal_de_venezuela_250000_20150707)
// Total: 50 polígonos representados en color rojo según especificación cartográfica.

import { StateVectorGeo } from "./venezuelaOfficialVectors";

export const TOTAL_SOBREPOSICION_POLIGONOS = 50;

export const VENEZUELA_SOBREPOSICION_VECTORS: StateVectorGeo[] = [
  {
    "id": "ZS-01",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Merida-Táchira",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Merida-Táchira",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Merida-Táchira",
    "path": "M 169.5 255.9 L 169.2 256.3 L 168.6 256.6 L 168.6 257 L 168.2 257.5 L 167.9 257.7 L 167.9 258.1 L 167.7 258.5 L 167.6 258.5 L 167.4 258.7 L 167.4 258.9 L 167.4 258.9 L 167.4 259.1 L 167.2 259.2 L 167 259 L 166.4 259 L 166.7 258.4 L 166.7 258.3 L 166.9 258.2 L 166.9 258.1 L 166.8 257.5 L 166.8 257 L 166.5 256.7 L 166.7 256.6 L 166.8 256.4 L 166.8 255.9 L 167 255.7 L 166.6 255.4 L 166.7 255.1 L 166.7 254.9 L 166.5 254.9 L 166.1 254.7 L 165.9 254.6 L 165.8 254.5 L 165.7 254.4 L 165.9 254.2 L 165.7 254.1 L 165.7 253.8 L 165.7 253.3 L 165.9 253.1 L 166 252.7 L 166.1 252.7 L 166.2 252.5 L 166.7 252.2 L 167.2 252 L 167.3 251.6 L 167.2 251.5 L 167.3 251.3 L 167.5 251.1 L 167.5 251 L 167.6 250.7 L 167.6 250 L 167.8 249.7 L 168.3 249.6 L 168.6 249.7 L 168.5 249.3 L 168.8 249.5 L 168.8 249.9 L 169.1 250.1 L 169.3 251.1 L 169.8 251.8 L 169.6 253.3 L 169.7 253.5 L 169.6 253.7 L 169.6 254.2 L 169.6 254.3 L 169.3 254.4 L 169.2 254.6 L 169.3 255.4 L 169.2 255.6 L 169.4 255.8 L 169.5 255.9 Z",
    "centroid": [
      167.6,
      254.6
    ],
    "latLng": [
      7.8672,
      -71.5534
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 113.53,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-02",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Táchira-Zulia",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Táchira-Zulia",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Táchira-Zulia",
    "path": "M 146.7 216.6 L 146.6 216.9 L 146.5 217.1 L 146.6 217.3 L 146.8 217.5 L 146.6 218.1 L 146.7 218.1 L 146.7 218.4 L 146.8 218.5 L 146.9 218.5 L 147.1 218.7 L 147.1 218.8 L 147.2 218.8 L 147.2 218.9 L 147.1 218.9 L 147.1 219.3 L 147 219.6 L 146.7 220 L 146.6 220.3 L 146.6 220.4 L 146.7 220.4 L 146.7 220.5 L 146.6 221.1 L 146.9 221.5 L 146.8 221.8 L 147.1 222.5 L 147.2 222.8 L 147.2 223.2 L 142.5 227.2 L 138.2 227.2 L 135.4 227.6 L 130.9 229.8 L 130.9 229.1 L 130.4 228.4 L 130.3 227.2 L 130.3 226.4 L 130.1 225.7 L 129.7 225 L 129.2 223.7 L 129.1 223.7 L 130.4 222.2 L 130.5 222.2 L 130.6 222.2 L 130.6 221.9 L 130.7 221.8 L 136.5 220.5 L 136.7 220.3 L 136.7 220.3 L 136.8 220.3 L 136.8 220.5 L 136.9 220.4 L 136.9 220.3 L 137.2 220.2 L 137.7 220.2 L 138.1 219.8 L 138.2 219.9 L 138.4 219.8 L 138.6 219.9 L 138.7 219.8 L 138.7 219.8 L 138.7 219.7 L 138.8 219.8 L 138.8 219.7 L 138.9 219.8 L 138.9 219.7 L 139 219.7 L 139 219.9 L 139.1 219.7 L 139.2 219.7 L 139.1 219.6 L 139 219.6 L 139 219.5 L 139.1 219.4 L 139.4 219.4 L 139.4 219.3 L 139.6 219.3 L 139.5 219.2 L 139.7 219.1 L 139.6 219 L 139.7 219 L 139.6 218.9 L 139.8 219 L 139.8 218.9 L 139.9 218.8 L 139.9 218.7 L 140 218.7 L 139.9 218.6 L 139.9 218.5 L 140 218.6 L 140 218.5 L 140.1 218.4 L 140.1 218.5 L 140.2 218.4 L 140.5 218.4 L 140.4 218.3 L 140.5 218.2 L 140.6 218.5 L 140.8 218.4 L 141 218.2 L 141.3 218.2 L 141.6 218.1 L 141.9 218.1 L 142 218.1 L 142 218.2 L 142.3 218.3 L 142.4 218 L 142.5 218 L 142.6 217.9 L 142.6 217.6 L 142.5 217.6 L 142.4 217.5 L 142.4 217.4 L 142.5 217.3 L 143.6 217.3 L 143.8 217.1 L 144.1 217.1 L 144.3 216.9 L 144.3 216.7 L 144.8 216.6 L 144.9 216.3 L 144.9 215.9 L 145.1 215.9 L 145.1 215.9 L 145.5 216 L 146 215.7 L 146.2 215.5 L 146.4 215.5 L 146.4 215.3 L 146.2 215.3 L 146 215 L 146.2 215 L 146.3 214.9 L 146.6 214.9 L 146.5 215.1 L 146.8 215.1 L 146.7 215.3 L 146.6 215.3 L 146.6 215.4 L 146.7 215.4 L 146.7 215.5 L 146.7 215.6 L 146.7 215.7 L 146.8 215.7 L 146.7 215.7 L 146.8 215.8 L 146.7 215.9 L 146.8 216 L 146.7 216.1 L 146.6 216.1 L 146.5 216.2 L 146.6 216.4 L 146.6 216.6 L 146.6 216.7 L 146.7 216.6 Z",
    "centroid": [
      141.8,
      219
    ],
    "latLng": [
      8.5978,
      -72.085
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 694.11,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-03",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Anzoátegui-Monagas",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Anzoátegui-Monagas",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Anzoátegui-Monagas",
    "path": "M 595.5 226.2 L 579.4 221.3 L 579.7 219.7 L 580 214.1 L 580.2 214 L 580.2 213.9 L 580.1 215.6 L 595.5 226.2 Z",
    "centroid": [
      582.2,
      217.8
    ],
    "latLng": [
      8.6216,
      -63.005
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 248.49,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-04",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Barinas-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Barinas-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Barinas-Portuguesa",
    "path": "M 282.2 224 L 281.8 223.8 L 281.6 223.9 L 281.3 223.3 L 281.4 223 L 281.1 223 L 280.9 222.8 L 280.7 222.8 L 280.6 222.2 L 280.2 222.2 L 280 222 L 279.8 222.1 L 279.6 222 L 279.1 222.2 L 278.7 222.1 L 278.5 222 L 278.1 222.2 L 277.8 222.2 L 277.5 222.4 L 277.2 222.3 L 276.9 222.4 L 276.6 222.1 L 276.3 222.3 L 273.9 222.3 L 273.8 222.4 L 273.7 222.2 L 273.4 222.2 L 273.3 222.1 L 273.1 222.1 L 272.7 222.2 L 272.1 222.1 L 272 222 L 271.8 221.7 L 271.6 221.7 L 271.7 221.4 L 271.6 221.2 L 271.7 221 L 271.4 221 L 271.2 220.3 L 270.8 220.2 L 270.6 219.9 L 270.5 220 L 270.5 219.6 L 270.1 219.2 L 270.1 219 L 269.8 219 L 269.6 218.9 L 269.5 219.1 L 269.5 218.9 L 269.4 218.9 L 269.1 219.1 L 268.8 219 L 268.7 219.3 L 268.5 219.4 L 267.8 219.2 L 267.7 218.7 L 267.8 218.3 L 267.7 218.1 L 267.4 217.8 L 267.2 217.6 L 266.9 217.3 L 266.7 217.4 L 266.5 217.4 L 266.5 217.1 L 266.2 216.8 L 266 216.5 L 265.8 216.5 L 265.2 215.9 L 264.9 215.8 L 265 215.6 L 264.9 215.4 L 264.8 215.3 L 264.9 214.9 L 264.5 214.6 L 263.9 214.3 L 263.7 214.1 L 263.7 213.7 L 263.5 213.3 L 263.6 213 L 263.9 213.2 L 264.2 213.2 L 264.2 213.3 L 264.1 214.3 L 264.5 214.1 L 264.8 214.4 L 265.3 214.4 L 265.5 214.2 L 265.6 213.9 L 265.7 213.9 L 265.8 214.2 L 265.5 214.5 L 265.6 214.9 L 265.7 214.9 L 265.8 214.6 L 266 214.5 L 266 214.6 L 265.9 214.8 L 266 214.8 L 266 214.9 L 266.5 215.1 L 266.5 215.2 L 266.8 215.4 L 267.3 215.4 L 267.4 215.6 L 268.1 215.6 L 268.5 215.6 L 268.9 215.5 L 269.5 215.5 L 270.1 215.6 L 270.6 215.7 L 270.9 215.9 L 271.2 216 L 271.6 216.5 L 271.8 216.6 L 272 216.8 L 272.2 216.9 L 272.5 217 L 272.6 217.4 L 272.8 217.3 L 273.1 217.6 L 273.3 217.6 L 273.4 217.3 L 274.1 217 L 274.7 217 L 274.7 217.1 L 274.9 217.1 L 275 217 L 275.2 217 L 275.6 217.2 L 275.9 217.1 L 276.1 217.2 L 276.3 217.2 L 276.4 217 L 276.5 217 L 276.7 217.2 L 276.7 217.4 L 277 217.4 L 277.2 217.5 L 277.4 217.6 L 277.7 217.7 L 277.5 218 L 277.6 218.1 L 277.4 218.4 L 277.5 218.6 L 277.7 218.6 L 278.1 218.7 L 278.4 219.3 L 278.7 219.5 L 278.8 219.6 L 279.1 219.4 L 279.2 219.4 L 279.4 219.8 L 279.4 220.1 L 279.6 220.2 L 279.7 220.6 L 279.9 220.6 L 279.9 220.9 L 280.1 221 L 280.9 221 L 281 221.3 L 281.1 221.4 L 281.1 221.8 L 281.2 222 L 281.9 222.1 L 282.2 222.9 L 282 223.3 L 282.2 223.6 L 282.2 224 Z",
    "centroid": [
      272.6,
      218.4
    ],
    "latLng": [
      8.609,
      -69.3884
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 312.56,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-05",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Barinas-Mérida",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Barinas-Mérida",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Barinas-Mérida",
    "path": "M 192.7 235.8 L 192.5 235.7 L 192.4 235.3 L 192.1 235.1 L 192 234.8 L 191.9 234.4 L 191.9 234.3 L 191.9 234 L 191.2 233.3 L 191 232.9 L 191.1 232.8 L 191 232.5 L 191.1 232.1 L 190.9 231.9 L 191 231.6 L 190.7 231.2 L 190.9 230.9 L 190.6 230.6 L 190.6 230.3 L 190.4 230 L 190.5 229.7 L 191.1 229.4 L 191.1 229 L 191.5 228.8 L 191.9 228.8 L 192.5 228.5 L 192.3 228.2 L 192.2 227.9 L 192.3 227.6 L 192.4 227.5 L 192.4 226.9 L 192.9 226.6 L 193.7 226.6 L 194.3 226.4 L 194.2 225.8 L 194.3 225.6 L 194.2 225.4 L 194.5 225.1 L 194.5 224.9 L 195 224.4 L 194.9 224.2 L 195.3 223.5 L 195.4 223.2 L 195.2 222.5 L 195.1 221.8 L 194.7 221.4 L 194.5 221.3 L 194.7 221 L 194.8 220.7 L 194.7 220.4 L 194.7 220.1 L 194.4 219.4 L 194.6 219.3 L 195.3 219 L 195.5 218.8 L 196 218.8 L 196.4 218.4 L 196.3 218.1 L 196.8 217.8 L 197 217.6 L 197.2 217.3 L 197.6 217.4 L 197.6 217.6 L 197.9 217.6 L 198.1 217.6 L 198.5 217.4 L 198.5 217.1 L 199 216.7 L 199.1 216.5 L 199.5 216.3 L 199.4 215.8 L 199.5 215.7 L 199.6 215.6 L 200 215.5 L 200.3 215.3 L 200.5 215.5 L 200.7 215.4 L 201 214.9 L 201.2 214.8 L 201.4 214.6 L 201.6 214.6 L 201.5 214.2 L 201.6 214.2 L 202 214.1 L 203.2 213.7 L 203.5 213.2 L 204 213.3 L 204.1 213.6 L 204.2 213.7 L 204.2 213.9 L 204.4 214 L 205.2 213.3 L 205.9 213.3 L 206 213.1 L 206.2 213 L 206.4 213.2 L 206.4 213.4 L 206.7 213.7 L 206.8 213.8 L 207.3 213.8 L 207.4 213.9 L 207.7 214 L 208.3 214.8 L 208.7 215.1 L 208.2 215.7 L 208.2 216.3 L 208 216.9 L 207.8 217 L 207.7 217.3 L 207.2 217.3 L 206.8 217.5 L 206.3 218.1 L 206.2 218.2 L 205.8 218.2 L 205.1 218.5 L 204.9 218.5 L 204.6 218.3 L 204.5 218.3 L 204.3 218.6 L 203.8 218.8 L 203.7 218.9 L 203.3 218.9 L 203.1 218.7 L 202.7 218.8 L 202.5 219 L 202.4 219.2 L 202.2 219.3 L 201.9 219.4 L 202 220.6 L 202.2 221.1 L 202.3 221.3 L 202.2 222.4 L 202.5 223 L 202.9 223.2 L 203 223.5 L 203.2 223.8 L 202.8 224.1 L 202.5 224.6 L 202.5 225.5 L 202.7 226 L 202.3 226.7 L 202.3 226.9 L 202.3 227 L 202.1 227.2 L 201.8 228 L 201.7 228.1 L 201.8 228.3 L 201.8 228.5 L 201.4 228.9 L 201 229.4 L 201 229.8 L 200.3 230.1 L 200 230.2 L 199.8 230.2 L 199.6 230.4 L 199.6 231 L 199.1 231.1 L 198.9 231.3 L 198.9 232 L 198.8 232.3 L 198.7 232.8 L 198.9 233 L 198.9 233.5 L 198.7 234.1 L 199 234.7 L 198.8 234.9 L 198.3 234.9 L 198.1 235 L 197.9 235 L 197.7 235.2 L 197.4 235.3 L 197.3 235.7 L 196.7 235.9 L 196.1 235.9 L 196 235.8 L 196.1 235.5 L 195.9 235.2 L 195.5 234.8 L 195.1 234.9 L 194.8 234.9 L 194.3 235.3 L 193.9 235.9 L 193.7 236.1 L 193.2 236.1 L 192.9 235.9 L 192.7 235.8 Z",
    "centroid": [
      198.8,
      224
    ],
    "latLng": [
      8.4947,
      -70.9088
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 913.84,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-06",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Cojedes-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Cojedes-Portuguesa",
    "path": "M 309.1 209.4 L 308.8 209.5 L 308.8 210 L 308.7 210.2 L 308.5 210.3 L 308.4 210.2 L 308.2 210.2 L 308.1 210.3 L 308.1 210.4 L 307.9 210.5 L 307.9 210.6 L 307.7 210.6 L 307.5 210.8 L 307.2 210.7 L 307.2 210.8 L 306.9 210.8 L 306.6 210.9 L 306.5 211.2 L 306.4 211.3 L 306.5 211.6 L 306.3 211.8 L 306.1 211.9 L 305.4 211.9 L 305.1 212.1 L 304.8 212.2 L 304.6 212.1 L 304.6 211.9 L 304.6 211.8 L 304.3 211.8 L 304.3 212.1 L 304.1 211.7 L 303.8 211.9 L 303.9 211.7 L 303.8 211.7 L 303.7 211.7 L 303.6 212.1 L 303.5 211.8 L 302.9 212.3 L 302.5 212.2 L 301.6 212.5 L 304.7 211 L 304.9 210.6 L 304.9 210.5 L 304.8 210.5 L 304.7 210.2 L 305 210.3 L 305.2 210.2 L 305 210 L 305 209.8 L 305.1 209.8 L 305.3 210.2 L 305.4 210.1 L 305.4 209.9 L 305.6 209.8 L 305.5 210.1 L 305.7 210.4 L 306 210.4 L 306.1 210.2 L 306.1 210.4 L 306.2 210.5 L 306.5 210.4 L 306.7 210.1 L 306.9 210 L 307.1 210.2 L 307.1 209.9 L 306.8 209.8 L 306.9 209.7 L 307.5 209.8 L 307.6 209.7 L 307.4 209.6 L 307.4 209.4 L 307.9 209.6 L 307.9 209.5 L 308.3 209.1 L 308.4 209.2 L 308.6 209.1 L 308.7 209.2 L 308.8 209.1 L 308.9 209.2 L 309.1 209.4 Z",
    "centroid": [
      306.2,
      210.6
    ],
    "latLng": [
      8.7698,
      -68.6947
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 33.26,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-07",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Cojedes-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Cojedes-Portuguesa",
    "path": "M 310.9 208.2 L 311 208.1 L 311.1 207.9 L 311.3 207.7 L 311.4 207.8 L 311.4 208 L 311.4 208 L 311.6 207.5 L 311.7 207.3 L 312.3 207.3 L 312.7 207.5 L 313 207.2 L 313.2 207.2 L 312.8 206.9 L 313.3 207.1 L 313.3 207.3 L 313.1 207.6 L 312.2 208.1 L 311.5 208.3 L 311 208.3 L 310.9 208.2 Z",
    "centroid": [
      312,
      207.7
    ],
    "latLng": [
      8.8298,
      -68.5753
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 7.1,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-08",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Cojedes-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Cojedes-Portuguesa",
    "path": "M 312.8 206.9 L 312.4 206.9 L 312.4 206.7 L 312.8 206.9 Z",
    "centroid": [
      312.5,
      206.8
    ],
    "latLng": [
      8.8467,
      -68.5642
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 0.2,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-09",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Cojedes-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Cojedes-Portuguesa",
    "path": "M 312.4 206.7 L 312.3 206.6 L 312.4 206.6 L 312.4 206.7 Z",
    "centroid": [
      312.3,
      206.6
    ],
    "latLng": [
      8.8511,
      -68.5682
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 0.04,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-10",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Cojedes-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Cojedes-Portuguesa",
    "path": "M 312.3 206.6 L 312.2 206.7 L 312.1 206.6 L 311.9 206.6 L 311.9 206.4 L 312.3 206.6 Z",
    "centroid": [
      312.1,
      206.6
    ],
    "latLng": [
      8.8523,
      -68.5739
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 0.26,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-11",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Anzoátegui-Guárico",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Anzoátegui-Guárico",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Anzoátegui-Guárico",
    "path": "M 461.1 172.1 L 454.1 172.1 L 454 168.5 L 451.8 165.8 L 456.4 169.6 L 461.1 172.1 Z",
    "centroid": [
      455.5,
      169.6
    ],
    "latLng": [
      9.61,
      -65.6168
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 76.29,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-12",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Portuguesa",
    "path": "M 261.2 172.2 L 261.1 172.2 L 262 171.7 L 262.4 171.6 L 262.9 171.1 L 263.8 171.1 L 264.3 170.9 L 264.4 170.8 L 264.2 170.5 L 264.2 170.4 L 264.5 170.2 L 264.7 170 L 265.3 169.6 L 265.6 169.5 L 265.9 169.6 L 266.6 168.5 L 268.1 168.8 L 268.8 168.3 L 269.1 168.3 L 269.3 168 L 269.8 168.1 L 270.1 168 L 270.6 168.1 L 271.2 168 L 271.9 167.4 L 272.1 167 L 272.4 166.9 L 272.6 166.7 L 272.9 166 L 273.4 165.6 L 273.3 166.1 L 273.6 166.4 L 273.7 166.6 L 273.4 167.4 L 273.4 167.6 L 273.2 168 L 273.3 168.3 L 273.1 168.3 L 273 168.5 L 272.3 168.9 L 272.1 169.2 L 272.2 169.6 L 272.7 169.8 L 272.8 170.1 L 272.7 170.4 L 271 170.2 L 270.9 170 L 270 170.6 L 270 170.9 L 270.1 171.1 L 270 171.3 L 270.1 171.8 L 270 171.9 L 270.1 172 L 270 172 L 270 172.1 L 269.9 172.5 L 269.5 172.6 L 269.4 172.5 L 269.1 172.7 L 268.6 172.6 L 268.4 172.7 L 268.2 172.7 L 268.2 172.8 L 268 172.7 L 267.5 172.8 L 267.5 172.7 L 267.3 172.7 L 267.3 172.5 L 267.2 172.5 L 267.1 172.2 L 267 172.6 L 266.9 172.5 L 266.7 172.8 L 266.8 173 L 266.5 172.9 L 266.2 173.1 L 266.1 173 L 265.9 173 L 265.7 173.2 L 265.4 173.1 L 265.2 173.4 L 265.1 173.3 L 264.9 173.3 L 264.5 173.2 L 264.2 173.3 L 264.2 173.5 L 264 173.8 L 263.7 173.9 L 263.5 173.7 L 263.4 173.7 L 263.3 173.6 L 263.2 173.7 L 263.2 173.6 L 262.3 173.4 L 262.2 173.2 L 262.1 172.8 L 261.8 172.4 L 261.5 172.2 L 261.2 172.2 Z",
    "centroid": [
      267.8,
      170.9
    ],
    "latLng": [
      9.5825,
      -69.4868
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 187.52,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-13",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Mérida-Trujillo",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Mérida-Trujillo",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Mérida-Trujillo",
    "path": "M 207.8 197.5 L 207.2 197 L 207.5 196.6 L 207.8 197.5 Z",
    "centroid": [
      207.5,
      197
    ],
    "latLng": [
      9.0474,
      -70.7306
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 0.87,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-14",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Mérida-Trujillo",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Mérida-Trujillo",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Mérida-Trujillo",
    "path": "M 206.8 196.6 L 206.5 196.6 L 206.4 196.8 L 206 197 L 205.8 197 L 205.8 196.9 L 205.3 196.7 L 205.1 196.5 L 204.9 196.2 L 204.8 195.7 L 204.9 195.5 L 204.5 195.3 L 204.9 195.2 L 205.5 195.4 L 205.9 195.6 L 206 195.8 L 206.2 195.8 L 206.8 196.6 Z",
    "centroid": [
      205.6,
      196.2
    ],
    "latLng": [
      9.0655,
      -70.7686
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 10.53,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-15",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Portuguesa-Trujillo",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Portuguesa-Trujillo",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Portuguesa-Trujillo",
    "path": "M 241 181 L 241.1 180.1 L 241 179.9 L 241 179.6 L 241.2 179.2 L 241.6 180.3 L 241.3 180.8 L 241 181 Z",
    "centroid": [
      241.2,
      180.1
    ],
    "latLng": [
      9.3943,
      -70.0354
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 2.91,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-16",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Trujillo",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Trujillo",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Trujillo",
    "path": "M 241.9 178.5 L 241.2 179.2 L 240.8 178.5 L 240.4 178.5 L 239.9 178.4 L 239.3 178.5 L 239.1 178.4 L 239 178.3 L 239.3 178.4 L 239.8 178.3 L 240.3 178.3 L 240.8 177.8 L 241.8 177.9 L 242 177.8 L 242 178.1 L 241.9 178.5 Z",
    "centroid": [
      240.5,
      178.3
    ],
    "latLng": [
      9.4312,
      -70.0494
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 7.51,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-17",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Mérida-Trujillo",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Mérida-Trujillo",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Mérida-Trujillo",
    "path": "M 204.1 195.4 L 203.8 195.8 L 203.6 195.8 L 202.7 195.1 L 201.9 195.1 L 201.9 195 L 201.1 193 L 200.8 192.6 L 200.9 192.4 L 200.7 192.3 L 200.8 192.2 L 200.8 192 L 200.2 192.1 L 199.7 191.8 L 199.6 191.5 L 199.7 191.3 L 199.3 190.7 L 199.4 190.5 L 199.3 190.1 L 199.4 190.2 L 199.5 190.8 L 200.1 191 L 200.2 191.3 L 200.4 191.4 L 200.8 191.4 L 201.1 191.3 L 202 191.4 L 202.1 191.5 L 202.2 191.8 L 202.9 192.5 L 202.4 193.6 L 202.7 194.1 L 202.8 194.6 L 203.8 195.2 L 204.1 195.4 Z",
    "centroid": [
      201.3,
      192.5
    ],
    "latLng": [
      9.1396,
      -70.8586
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 35.77,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-18",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Mérida-Zulia",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Mérida-Zulia",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Mérida-Zulia",
    "path": "M 145.1 208.3 L 145.3 208.1 L 145.5 208 L 145.6 208.2 L 145.7 208.3 L 145.9 208.5 L 145.9 208.2 L 146.1 208 L 146 207.9 L 146.2 207.8 L 146.6 207.4 L 146.8 207.2 L 147.1 207.4 L 147.4 207 L 147.3 206.7 L 147.2 206.2 L 146.9 205.9 L 146.5 205.9 L 146.3 205.4 L 146.2 204.9 L 146.4 204.7 L 146.4 204.4 L 146.6 204.6 L 146.7 204.4 L 146.9 204.3 L 147 203.8 L 146.9 203.6 L 147.1 203 L 147 203 L 147.2 202.7 L 147.1 202.4 L 147.3 202.2 L 147.3 202 L 146.9 201.7 L 146.6 201 L 146.7 200.9 L 147 201 L 147.1 200.9 L 147.1 200.5 L 147.2 200.4 L 147.1 200 L 147.3 199.9 L 147.3 199.7 L 147.5 199.5 L 147.5 199.3 L 147.6 199.3 L 147.8 199.2 L 148.1 199.4 L 148.2 199.7 L 148.6 200 L 148.9 199.9 L 149.2 199.6 L 149.7 199.5 L 149.7 199.2 L 149.6 199 L 149.6 198.7 L 150 198.1 L 149.8 197.9 L 149.9 197.5 L 149.8 197.1 L 149.6 197 L 149.5 196.8 L 149.5 196.4 L 149.6 196.2 L 149.6 196.1 L 149.7 195.5 L 149.9 195.4 L 150.1 195.1 L 150.8 194.9 L 151.2 194.5 L 151.6 194.4 L 152 194 L 152.3 194.1 L 153 194.1 L 153.1 194.2 L 153.6 194.2 L 153.8 194.1 L 154 193.9 L 154.6 193.7 L 154.8 193.7 L 155 193.8 L 155.3 193.3 L 155.1 192.9 L 155.3 192.8 L 155.7 192.4 L 155.1 192 L 155.3 191.9 L 155.5 191.5 L 155.4 191 L 155.5 190.9 L 156 191.1 L 156.2 191 L 156.6 191 L 156.6 190.9 L 156.4 190.8 L 156.5 190.5 L 156.7 190.6 L 157 190.5 L 157.3 190.7 L 157.3 190.4 L 157.1 190.3 L 157.5 189.6 L 157.7 189.7 L 157.9 190 L 158 190.2 L 157.8 190 L 157.8 190 L 157.6 189.8 L 157.7 190.2 L 158.6 191.5 L 158.5 192.1 L 158.2 192.5 L 158.1 192.9 L 158 193 L 157.8 192.9 L 157.6 193.1 L 157.7 193.1 L 157.7 193.2 L 157.7 193.2 L 157.8 193.3 L 157.6 193.4 L 157.4 193.4 L 157.6 193.5 L 157.5 193.6 L 157.6 193.7 L 157.5 193.8 L 157.4 193.9 L 157.6 194 L 157.9 193.6 L 158.1 193.9 L 158.2 194.3 L 158.6 194.6 L 159 194.8 L 159.4 194.9 L 159.6 194.9 L 159.8 194.7 L 159.9 194.8 L 159.7 195 L 159.6 195.4 L 159.5 195.4 L 159.7 195.5 L 160.1 196 L 160.1 196.1 L 160.5 196.5 L 161 196.7 L 161.6 196.8 L 161.9 196.8 L 162.5 197.2 L 164.2 197.5 L 165.7 197.6 L 168 197.5 L 168.9 197.4 L 168.9 197.5 L 169 197.4 L 170.4 197.2 L 170.3 197.2 L 170.4 197.2 L 170.5 197.1 L 172.7 196.5 L 175.8 195.5 L 176.8 195.4 L 178.1 194.9 L 180.5 193.3 L 180.7 193 L 181.1 193.1 L 181.6 193 L 182 192.7 L 182.1 192.5 L 182.1 192.5 L 182.2 192.6 L 182.8 192.1 L 183.2 191.8 L 183.5 191.4 L 183.7 191.4 L 183.9 191.6 L 184.1 191.8 L 184.3 192.2 L 184.5 192.4 L 184.5 192.7 L 184.7 192.8 L 184.7 193.1 L 184.8 193.1 L 184.9 193.3 L 185.1 193.3 L 185.1 193.4 L 185.3 193.6 L 185.9 193.7 L 186 193.6 L 186.1 193.7 L 186.3 193.6 L 186.3 193.7 L 186.3 193.7 L 186.5 193.7 L 186.6 194 L 186.8 193.9 L 187 194 L 187.1 194.2 L 187.2 194.2 L 187.5 194.6 L 187.7 194.5 L 188 194.6 L 188.1 194.8 L 188.3 194.8 L 188.4 194.9 L 188.7 195.2 L 189 195.4 L 189.1 195.7 L 189.7 196.6 L 189.7 196.9 L 189.5 197.1 L 189.6 197.2 L 179.4 204.2 L 179.4 204 L 179.2 203.7 L 178.6 203.3 L 178.4 203.2 L 177.8 203.3 L 177.8 203.4 L 177.6 203.6 L 177.4 203.5 L 176.7 203 L 176.6 202.8 L 176.4 202.7 L 176.5 202.6 L 176.4 202.4 L 176.1 202.4 L 163.2 212.3 L 160.4 215.1 L 152.4 215.2 L 152.2 215.3 L 152.2 215.5 L 152.1 215.6 L 152.1 215.7 L 151.4 216.1 L 151.3 216.2 L 151.4 216.3 L 151.3 216.3 L 151.3 216.4 L 150.4 216.8 L 150.2 216.9 L 150.2 217.1 L 150 217.2 L 150 217.3 L 149.6 217.4 L 149.6 217.5 L 149.5 217.6 L 149.4 217.8 L 149.4 217.8 L 149.3 217.8 L 149.1 218 L 149 218.1 L 149 218 L 148.9 218 L 148.9 217.9 L 148.8 218.1 L 148.7 218.1 L 148.7 218.1 L 148.6 218.1 L 148.3 218 L 148.3 218.1 L 147.9 218 L 147.9 218 L 147.8 217.9 L 147.9 217.7 L 147.8 217.6 L 147.7 217.7 L 147.7 217.6 L 147.6 217.6 L 147.7 217.5 L 147.6 217.4 L 147.7 217.3 L 147.8 217.4 L 147.8 217.3 L 148 217.3 L 147.9 217.1 L 147.7 217.1 L 147.6 217.2 L 147.5 217 L 147.4 217 L 147.3 216.9 L 147.3 216.7 L 147.2 216.7 L 147.1 216.5 L 147.1 216.6 L 147.1 216.5 L 146.9 216.7 L 146.9 216.6 L 146.6 216.7 L 146.6 216.6 L 146.6 216.4 L 146.5 216.2 L 146.6 216.1 L 146.7 216.1 L 146.8 216 L 146.7 215.9 L 146.8 215.8 L 146.7 215.7 L 146.8 215.7 L 146.7 215.7 L 146.7 215.6 L 146.7 215.5 L 146.7 215.4 L 146.6 215.4 L 146.6 215.3 L 146.7 215.2 L 146.8 215.1 L 146.5 215.1 L 146.6 215 L 146.4 214.9 L 146.3 214.9 L 146.2 215 L 145.9 215 L 145.8 214.8 L 145.8 214.5 L 145.7 214.3 L 145.8 214.1 L 145.7 214 L 145.8 213.8 L 145.9 213.8 L 146.1 213.6 L 146 213.6 L 146.1 213.3 L 146 213.3 L 146.2 213.1 L 146.1 213 L 146.2 212.9 L 146.3 213 L 146.4 212.9 L 146.2 212.7 L 146.3 212.6 L 146.2 212.5 L 146.1 212.4 L 146 212.3 L 146 212.5 L 145.9 212.5 L 146 212.3 L 146 212.2 L 145.8 211.9 L 145.7 212.1 L 145.6 212.1 L 145.5 211.9 L 145.7 211.5 L 145.8 211.7 L 145.9 211.6 L 145.8 211.3 L 145.6 211.3 L 145.7 211.2 L 145.8 211.2 L 145.9 211.1 L 145.7 211.1 L 145.7 211 L 145.7 210.8 L 145.6 210.7 L 145.6 210.6 L 145.6 210.5 L 145.5 210.4 L 145.6 210.3 L 145.5 210.4 L 145.3 210.2 L 145.5 209.7 L 145.6 209.7 L 145.7 209.5 L 146 209.2 L 145.9 209.2 L 145.9 209 L 145.8 208.9 L 145.8 208.7 L 145.5 208.5 L 145.4 208.6 L 145.3 208.4 L 145.1 208.4 L 145.1 208.3 Z",
    "centroid": [
      156.7,
      203.8
    ],
    "latLng": [
      8.9093,
      -71.7777
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 2964.03,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-19",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Cojedes-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Cojedes-Portuguesa",
    "path": "M 311.9 206.4 L 307.5 203.6 L 303.6 186.5 L 303.8 186.5 L 303.9 186.7 L 304 186.6 L 304.1 186.7 L 304.4 186.5 L 304.6 186.6 L 304.7 186.7 L 304.7 186.8 L 304.6 186.8 L 304.7 186.9 L 304.7 186.9 L 304.8 186.9 L 304.9 187 L 304.9 186.9 L 305 187 L 305 187.1 L 305.1 187.1 L 305.1 187 L 305.2 187.1 L 305.3 187 L 305.3 187.1 L 305.3 187.2 L 305.5 187.1 L 305.5 187.1 L 305.5 187.1 L 305.7 187.3 L 305.8 187.2 L 305.6 186.8 L 305.8 186.9 L 305.8 187.1 L 306 187.1 L 305.9 187.1 L 305.9 187.2 L 306 187.2 L 306 187.3 L 306.1 187.3 L 306.1 187.3 L 306.3 187.3 L 306.2 187.4 L 306.3 187.5 L 306.3 187.6 L 306.3 187.7 L 306.6 187.8 L 306.6 187.5 L 306.7 187.5 L 307 187.8 L 306.9 188 L 307 187.9 L 307.1 188 L 307.3 188.2 L 307.5 188.1 L 307.5 188.3 L 307.6 188.3 L 307.5 188.4 L 307.5 188.4 L 307.6 188.4 L 307.6 188.5 L 307.7 188.6 L 307.8 188.5 L 307.8 188.2 L 308 188.1 L 308.2 188.3 L 308.3 188.2 L 308.4 188.2 L 308.5 188.4 L 308.7 188.7 L 308.6 188.8 L 308.8 188.8 L 308.8 188.7 L 308.9 188.7 L 308.8 188.6 L 308.9 188.5 L 309.1 188.6 L 309.2 188.5 L 309.3 188.8 L 309.5 188.7 L 309.7 188.8 L 309.8 188.9 L 307.9 200 L 308.1 200 L 308 200.5 L 308.2 200.7 L 308 201.1 L 308.2 201.4 L 308.5 201.4 L 308.6 201.7 L 308.8 201.7 L 309.3 202 L 309.3 202.1 L 309.3 202.4 L 309.3 202.3 L 309.4 202.4 L 309.5 202.4 L 309.5 202.5 L 309.6 202.5 L 309.7 202.8 L 309.8 202.8 L 309.9 203 L 309.8 203.2 L 309.8 203.5 L 309.8 203.7 L 309.9 203.8 L 309.8 203.9 L 310 204 L 310 204.2 L 310 204.4 L 310.2 204.4 L 310.3 204.2 L 310.4 204.5 L 310.7 204.6 L 310.7 204.8 L 310.6 204.8 L 310.6 204.9 L 310.6 204.9 L 310.7 204.8 L 310.8 205 L 311 205 L 311 205.4 L 311.1 205.4 L 311.2 205.3 L 311.4 205.3 L 311.4 205.5 L 311.5 205.5 L 311.5 205.8 L 311.6 206 L 311.8 205.9 L 311.8 206 L 312 206.1 L 311.9 206.4 Z",
    "centroid": [
      307.9,
      194
    ],
    "latLng": [
      9.11,
      -68.6594
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 281.95,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-20",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Cojedes-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Cojedes-Portuguesa",
    "path": "M 303.6 186.5 L 303.6 186.4 L 303.6 186.4 L 303.6 186.5 Z",
    "centroid": [
      303.6,
      186.4
    ],
    "latLng": [
      9.2647,
      -68.7478
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 0,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-21",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Cojedes-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Cojedes-Portuguesa",
    "path": "M 303.6 186.4 L 303.6 186.3 L 303.7 186.3 L 303.6 186.4 Z",
    "centroid": [
      303.6,
      186.3
    ],
    "latLng": [
      9.267,
      -68.7478
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 0.02,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-22",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Cojedes-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Cojedes-Portuguesa",
    "path": "M 303.6 186.3 L 303.5 186.2 L 303.6 186.2 L 303.6 186.3 Z",
    "centroid": [
      303.6,
      186.2
    ],
    "latLng": [
      9.269,
      -68.749
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 0,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-23",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Portuguesa",
    "path": "M 255.8 179 L 256.2 179.2 L 256.6 179.5 L 257.2 179.6 L 257.7 179.5 L 258.1 179.7 L 258.5 179.8 L 258.8 179.7 L 258.9 179.6 L 259.1 179.8 L 259.3 179.7 L 259.4 179.5 L 259.7 179.9 L 259.7 179.9 L 259.7 179.8 L 259.8 179.5 L 259.9 179.5 L 259.9 179.4 L 260.3 178.9 L 260.3 178.4 L 260.7 177.5 L 261 178.5 L 260.9 179.2 L 260.7 180 L 260.6 180.2 L 259.7 180.4 L 259.4 180.6 L 258.8 180.3 L 258.5 180.2 L 257.9 180.4 L 257.3 180.8 L 257.1 180.8 L 256.9 180.7 L 256.4 180.3 L 255.9 179.6 L 255.8 179.3 L 255.8 179 Z",
    "centroid": [
      258.7,
      179.7
    ],
    "latLng": [
      9.4032,
      -69.6745
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 25.98,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-24",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Aragua-Carabobo",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Aragua-Carabobo",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Aragua-Carabobo",
    "path": "M 354.6 149.5 L 354.7 149.3 L 355.1 148.9 L 355.3 148.6 L 355.2 148.4 L 355.1 147.9 L 354.9 147.6 L 354.9 147.4 L 355 147.2 L 355.4 147.2 L 355.5 146.8 L 355.9 146.7 L 356.2 146.4 L 356.3 147.7 L 354.6 149.5 Z",
    "centroid": [
      355.3,
      147.8
    ],
    "latLng": [
      10.0559,
      -67.6826
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 9.36,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-25",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Aragua-Guárico",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Aragua-Guárico",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Aragua-Guárico",
    "path": "M 408.3 180.2 L 408.3 180.4 L 408 180.5 L 408.1 180.7 L 408 180.8 L 408 181 L 407.9 180.8 L 407.6 181.1 L 407.3 181.1 L 407.7 181.3 L 407.3 181.7 L 407.4 181.8 L 407.4 182 L 407.3 181.9 L 407 182 L 406.9 182 L 406.8 182.3 L 406.5 182.3 L 406.3 182.6 L 406.1 182.6 L 406.1 182.7 L 406.3 182.7 L 406.2 182.9 L 405.9 182.9 L 405.9 183 L 406.1 183.1 L 406 183.2 L 406.2 183.3 L 406.2 183.4 L 405.9 183.6 L 405.8 183.6 L 405.9 183.8 L 405.8 183.8 L 405.8 184.1 L 405.7 183.9 L 405.6 184 L 405.7 184.1 L 405.5 184.1 L 405.5 184.5 L 405.3 184.7 L 405.1 185.2 L 404.8 185.3 L 404.7 185.5 L 404.5 185.5 L 404.3 185.8 L 404 185.9 L 403.9 186.1 L 404 186.1 L 403.9 186.2 L 403.9 186.3 L 403.7 186.4 L 403.8 186.5 L 403.3 186.8 L 403.2 187 L 402.8 187.2 L 402.3 186.9 L 402 186.3 L 401.6 186.1 L 401.5 185.7 L 400.3 184.7 L 400.2 184.6 L 400 184.8 L 399.7 184.7 L 399.6 184.9 L 399.1 184.9 L 398.9 184.8 L 397.6 184.2 L 397.2 183.8 L 396.6 183.5 L 396.5 183.3 L 396.4 182.9 L 396.2 182.7 L 395.8 182.6 L 395.2 182.9 L 393.6 182.9 L 389.2 178.1 L 388.9 178.4 L 388.5 179.3 L 388.2 179.2 L 388.1 179.3 L 388.1 179.2 L 387.9 179.2 L 387.7 179.1 L 387.9 178.9 L 387.9 178.8 L 387.7 178.9 L 387.7 178.8 L 387.8 178.8 L 387.7 178.6 L 387.9 178.5 L 388 178.2 L 387.8 178.2 L 387.6 178 L 387.7 178 L 387.8 178.1 L 388 177.9 L 387.8 177.7 L 387.9 177.5 L 388.2 177.7 L 388.2 177.3 L 388.3 177.5 L 388.5 177.4 L 388.2 177 L 391 177 L 391.2 177.1 L 392.1 177.6 L 392.2 177.7 L 392.1 177.9 L 392 178.2 L 391.8 178.3 L 391.9 179.1 L 392.2 179.4 L 392.7 179.9 L 393 179.8 L 393.2 180 L 393.3 180.6 L 395.5 180.5 L 402.6 180.4 L 404.5 180.3 L 405.3 180.5 L 408.3 180.2 Z",
    "centroid": [
      398.9,
      181.8
    ],
    "latLng": [
      9.3596,
      -66.7837
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 351.9,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-26",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Portuguesa",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Portuguesa",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Portuguesa",
    "path": "M 290.1 162.6 L 290.8 162.2 L 291.1 162.2 L 291.4 162.3 L 291.5 162.3 L 291.7 161.9 L 291.6 162.4 L 291.3 162.7 L 290.9 162.7 L 290.7 162.6 L 290.3 162.6 L 290.1 162.6 Z",
    "centroid": [
      291,
      162.4
    ],
    "latLng": [
      9.7572,
      -69.0073
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 2.25,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-27",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Anzoátegui-Guárico",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Anzoátegui-Guárico",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Anzoátegui-Guárico",
    "path": "M 450.6 154.9 L 450.4 154.7 L 450.4 154.6 L 450.3 154.6 L 449.9 154.6 L 449.6 154.5 L 449.6 154.4 L 449.4 154.4 L 449.3 154.1 L 449.1 154 L 449 153.8 L 449.2 153.6 L 449.1 153.5 L 449.2 153.4 L 449.1 153.3 L 449.3 153.1 L 449.2 152.6 L 450.7 152.4 L 450.7 154.3 L 450.8 154.7 L 450.8 154.7 L 450.6 154.9 Z",
    "centroid": [
      449.8,
      154
    ],
    "latLng": [
      9.9293,
      -65.7342
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 15.69,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-28",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Anzoátegui-Monagas",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Anzoátegui-Monagas",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Anzoátegui-Monagas",
    "path": "M 532.1 154 L 531.2 154.3 L 531.2 154.2 L 531.1 153.9 L 531.1 153.4 L 531.3 153.4 L 531.2 153.2 L 531.3 153 L 531.1 152.8 L 531.3 152.4 L 531.4 152 L 531.6 151.9 L 531.7 152.6 L 531.8 153.3 L 532.1 153.6 L 532 153.9 L 532.1 154 Z",
    "centroid": [
      531.5,
      153.3
    ],
    "latLng": [
      9.9448,
      -64.0503
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 7.18,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-29",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Yaracuy",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Yaracuy",
    "path": "M 293.5 156.1 L 293.5 156 L 293.5 156 L 293.5 155.9 L 293.5 155.8 L 293.6 155.8 L 293.9 155.6 L 293.8 155.2 L 294 155.1 L 293.9 155 L 293.5 154.8 L 293.5 154.6 L 293.3 154.3 L 293.3 154.2 L 293.6 153.8 L 293.6 153.6 L 293.6 153.4 L 293.3 153.2 L 293.4 153.1 L 293.5 153.1 L 293.4 153 L 293.4 152.9 L 293.5 152.4 L 293.3 152 L 293.4 151.8 L 293.3 151.7 L 293.3 151.5 L 293.3 151.3 L 293.3 150.9 L 293.1 150.2 L 293.2 149.9 L 293.1 149.7 L 295 148.6 L 300.8 150.2 L 300.7 150.2 L 300.6 150.2 L 300.3 150.3 L 300.4 150.3 L 300.3 150.6 L 300.5 150.6 L 300.3 150.7 L 300.3 151 L 300.1 151.5 L 299.9 151.4 L 299.7 151.5 L 299.7 151.7 L 299.6 151.6 L 299.5 151.7 L 299.6 151.8 L 299.5 152.2 L 299.4 152.2 L 299.2 152 L 299.1 152.1 L 299.2 152.4 L 299.1 152.6 L 299.2 152.6 L 299.3 152.8 L 299.2 152.9 L 299.3 153.3 L 299.3 153.5 L 299.6 154.1 L 299.5 154.1 L 299.4 154.2 L 299 154.2 L 298.8 154.5 L 298.9 154.7 L 298.8 154.8 L 298.1 154.8 L 297.9 155.2 L 297.7 155.2 L 297.6 155.4 L 297.5 155.4 L 297.4 155.5 L 297.3 155.5 L 297.1 155.7 L 296.5 155.9 L 296.1 156.5 L 296 156.5 L 295.8 156.5 L 295.8 156.4 L 295.5 156.3 L 295.6 155.7 L 295.1 155.9 L 295 155.6 L 294.9 155.7 L 294.6 155.7 L 294.5 155.8 L 294.3 155.8 L 294.1 156 L 293.9 156 L 293.8 156.1 L 293.8 156.1 L 293.5 156.1 Z",
    "centroid": [
      296.4,
      153.6
    ],
    "latLng": [
      9.9378,
      -68.8968
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 202.46,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-30",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Yaracuy",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Yaracuy",
    "path": "M 284 150.3 L 282.4 148.8 L 283 148.6 L 283.6 148.6 L 283.6 148.9 L 284 149.5 L 284.1 149.9 L 284 150.3 Z",
    "centroid": [
      283.5,
      149.2
    ],
    "latLng": [
      10.0272,
      -69.1622
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 6.68,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-31",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Trujillo",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Trujillo",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Trujillo",
    "path": "M 214.3 152 L 214.3 152.5 L 214.5 152.8 L 214.6 152.9 L 215.2 152.8 L 215.4 152.7 L 216 152.7 L 216.1 152.8 L 216.2 153 L 216.5 153.1 L 216.8 153.7 L 216.5 154.3 L 216.6 154.5 L 217 155.2 L 217.4 155.6 L 217.7 155.8 L 217.8 156.1 L 218.4 156.3 L 218.6 156.3 L 218.7 156.1 L 219.1 155.8 L 219.4 156.2 L 219.3 156.5 L 219.3 156.7 L 219.7 156.7 L 220 157 L 220.3 157 L 220.6 156.8 L 221 156.3 L 221.5 156.5 L 221.8 156.5 L 222.3 156 L 222.4 155.6 L 222.6 155.1 L 222.8 155.1 L 222.9 155.1 L 223.4 155.4 L 223.6 155.3 L 224.3 155.3 L 225 155.1 L 225.6 155.2 L 225.7 155.7 L 226.2 156.4 L 226.3 156.9 L 227.3 157.7 L 227.4 158 L 227.2 158.5 L 227.2 158.9 L 226.9 159.2 L 226.5 159 L 225.8 159 L 223.6 159.9 L 212.6 165.3 L 212.1 165.5 L 211.9 165.3 L 211.8 165 L 211.4 164.6 L 211.1 164.5 L 210.9 164.3 L 210.9 164.1 L 211 163.8 L 210.9 163.5 L 210.6 163.4 L 209.6 162.4 L 209.6 162 L 209.5 161.7 L 209.6 161.1 L 209.6 160.6 L 209.8 160.1 L 210.4 159.8 L 210.5 159.3 L 210.5 159.1 L 210.3 158.7 L 210.3 158.1 L 209.9 157.6 L 209.8 157.3 L 209.6 156.9 L 208.9 156.3 L 209.3 155.9 L 209.5 155.7 L 209.4 154.8 L 209.2 154.4 L 209.3 154 L 209.2 153.8 L 209.3 153.5 L 209.2 153.2 L 209.5 152.9 L 209.8 152.7 L 209.7 152.3 L 210 152 L 209.9 151.5 L 209.7 151.1 L 209.8 150.8 L 210.6 149.8 L 211.4 149.2 L 211.6 148.7 L 211.9 148.6 L 212.2 148.7 L 212.5 149.1 L 213.3 149.7 L 213.3 150.3 L 213.6 150.8 L 213.9 150.8 L 214.1 151.6 L 214.3 152 Z",
    "centroid": [
      215.7,
      156.2
    ],
    "latLng": [
      9.885,
      -70.5614
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 744.19,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-32",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Yaracuy",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Yaracuy",
    "path": "M 282.4 148.8 L 282.2 148.7 L 282 148.5 L 281.3 146.3 L 281.6 146.4 L 282.4 148.8 Z",
    "centroid": [
      281.9,
      147.7
    ],
    "latLng": [
      10.0583,
      -69.1958
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 3.46,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-33",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Anzoátegui-Monagas",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Anzoátegui-Monagas",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Anzoátegui-Monagas",
    "path": "M 535.9 146.5 L 536 146.9 L 535.8 147.3 L 536 147.6 L 536 147.8 L 534.9 148.2 L 534.4 148.3 L 534.1 148.2 L 534.1 148.4 L 533.9 148.5 L 533.5 148.5 L 533.3 148.7 L 532.4 148.4 L 531.6 148 L 531 148 L 531.1 147.7 L 531.5 147.5 L 531.6 147.4 L 531.5 147.1 L 531.6 147.1 L 531.8 146.8 L 532 146.8 L 532.2 146.7 L 532.3 146.3 L 532.7 146 L 533.3 145.9 L 533.7 146 L 533.8 145.9 L 534.2 146 L 534.5 145.8 L 535.1 145.7 L 535.2 146 L 535.4 146.1 L 535.4 146.4 L 535.9 146.5 Z",
    "centroid": [
      533.6,
      147.1
    ],
    "latLng": [
      10.0701,
      -64.0066
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 49.38,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-34",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Yaracuy",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Yaracuy",
    "path": "M 281.3 146.3 L 280.8 146.6 L 280.6 146.6 L 280.5 146.8 L 279.8 147 L 279.8 145.1 L 279.9 144.9 L 279.7 144.5 L 279.7 144.1 L 279.5 144.1 L 279.6 143.9 L 279.7 143.2 L 280.1 143.1 L 280.4 142.9 L 280.8 143 L 281.2 142.8 L 281.4 142.8 L 281.8 142.5 L 286.7 140.1 L 286.6 140.5 L 285.9 141.1 L 285.8 141.7 L 285.5 142.3 L 285.7 142.6 L 285.4 143.1 L 285.4 143.8 L 285.5 143.9 L 280.5 144.3 L 280.7 145.2 L 280.9 145.5 L 281 145.8 L 281.2 146 L 281.3 146.3 Z",
    "centroid": [
      282,
      143.9
    ],
    "latLng": [
      10.1356,
      -69.1942
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 79.16,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-35",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Yaracuy",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Yaracuy",
    "path": "M 287.6 139.7 L 288.4 139.3 L 288.1 139.5 L 287.9 139.8 L 287.6 139.8 L 287.6 139.7 Z",
    "centroid": [
      287.9,
      139.6
    ],
    "latLng": [
      10.2247,
      -69.072
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 0.56,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-36",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Yaracuy",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Yaracuy",
    "path": "M 288.6 139.1 L 288.4 139.3 L 288.5 139.1 L 288.6 139.1 Z",
    "centroid": [
      288.5,
      139.2
    ],
    "latLng": [
      10.2334,
      -69.0594
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 0.04,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-37",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Yaracuy",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Yaracuy",
    "path": "M 287.6 139.7 L 286.7 140.1 L 287 138.9 L 287.1 138.8 L 287.3 138.9 L 287.7 138.8 L 287.8 138.8 L 287.8 139.1 L 287.6 139.7 Z",
    "centroid": [
      287.4,
      139.1
    ],
    "latLng": [
      10.2341,
      -69.0828
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 4.2,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-38",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Yaracuy",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Yaracuy",
    "path": "M 290.5 139 L 290.1 138.9 L 289.5 139 L 289.3 139.4 L 289.2 140 L 289 140.1 L 289 140 L 289.1 139.3 L 288.6 139.1 L 289.9 138.5 L 290.5 139 Z",
    "centroid": [
      289.4,
      139.3
    ],
    "latLng": [
      10.2302,
      -69.0409
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 3.34,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-39",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Monagas-Sucre",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Monagas-Sucre",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Monagas-Sucre",
    "path": "M 550.6 139.8 L 549.7 140.3 L 548.7 140.7 L 548.6 140.9 L 547.8 141 L 547.2 141.4 L 547 141.4 L 545.8 141.9 L 545.4 141.8 L 545.1 141.8 L 545.2 141.2 L 545.7 141.2 L 546 141 L 546 140.9 L 546.2 140.7 L 546.5 140.9 L 546.7 140.9 L 546.8 140.9 L 546.9 140.8 L 547 140.8 L 547.1 140.6 L 548 140.6 L 548.1 140.3 L 548.1 140 L 548.3 140.1 L 548.7 139.8 L 549.2 139.6 L 549.8 139.2 L 549.9 139 L 550 139.1 L 550.3 139.1 L 550.4 139.2 L 550.6 139.5 L 550.6 139.8 Z",
    "centroid": [
      547.8,
      140.5
    ],
    "latLng": [
      10.2062,
      -63.7136
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 22.38,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-40",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Monagas-Sucre",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Monagas-Sucre",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Monagas-Sucre",
    "path": "M 553.1 139.9 L 553.3 139.7 L 554.2 139.3 L 554.5 139.4 L 554.7 139.5 L 554.8 139.3 L 555.2 139.2 L 555.4 139 L 555.5 139.3 L 555.3 139.5 L 555.3 140.1 L 554.9 140.7 L 554.4 140.7 L 554 141 L 553.5 140.7 L 553.3 140.2 L 553.1 139.9 Z",
    "centroid": [
      554.5,
      139.8
    ],
    "latLng": [
      10.2195,
      -63.5759
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 13.49,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-41",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Yaracuy",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Yaracuy",
    "path": "M 290.5 139 L 290.2 138.4 L 290.2 137.9 L 290.4 137.5 L 290.4 137.2 L 290.6 136.6 L 290.5 136.4 L 290.4 136.3 L 290.3 136 L 290.8 136.5 L 291 136.9 L 290.9 137.3 L 290.9 137.8 L 290.6 138.4 L 290.7 138.9 L 290.5 139 Z",
    "centroid": [
      290.6,
      137.4
    ],
    "latLng": [
      10.2696,
      -69.0172
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 6.53,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-42",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Zulia",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Zulia",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Zulia",
    "path": "M 211.1 135.2 L 211.1 135.4 L 211.2 135.7 L 210.7 136.1 L 210.7 136.3 L 210.4 136.9 L 210.2 137.4 L 211 137.8 L 211.5 138.2 L 211.7 138.2 L 212 138 L 212.2 138.1 L 212.3 138.3 L 212.9 138.8 L 212.8 139.4 L 212.9 139.6 L 213.2 139.5 L 213.8 139.5 L 214.4 139.7 L 214.6 140 L 214.8 141 L 214.9 141.7 L 215 141.9 L 215.4 142 L 215.5 142.2 L 215.5 142.4 L 215.7 143 L 215.6 143.8 L 215.7 144.1 L 215.6 144.3 L 215.7 144.5 L 215.7 144.7 L 215.3 144.8 L 215.2 145 L 215.4 145.2 L 215 146.1 L 215.3 146.4 L 214.9 147 L 215.1 147.3 L 215.2 147.3 L 215.3 147.8 L 215.3 147.9 L 215.8 148.4 L 215.5 149 L 215.3 149.4 L 215.7 150.2 L 215.7 150.7 L 215.6 150.8 L 215.3 150.8 L 215.3 151.3 L 214.9 151.4 L 214.9 151.6 L 214.3 152 L 214.1 151.6 L 213.9 150.8 L 213.6 150.8 L 213.3 150.3 L 213.3 149.7 L 212.5 149.1 L 212.2 148.7 L 211.9 148.6 L 211.8 148.6 L 211.4 149.2 L 210.6 149.8 L 209.8 150.8 L 209.7 151.1 L 209.9 151.5 L 210 152 L 209.7 152.3 L 209.8 152.7 L 209.5 152.9 L 209.2 153.2 L 209.3 153.5 L 209.2 153.8 L 209.3 154 L 209.2 154.4 L 209.4 154.8 L 209.4 155.7 L 209.2 156 L 208.9 156.2 L 208.7 156.3 L 207.1 155.7 L 206.7 155.4 L 206.8 154.9 L 206.7 154.8 L 206.3 154.5 L 205.5 154.4 L 204.6 154.6 L 200.2 148.3 L 200.1 148.1 L 200.3 147.8 L 200.7 147.6 L 201.1 147.1 L 201.6 147.1 L 202 146.9 L 202.1 146.4 L 202.1 146 L 202.2 145.8 L 204.7 144.6 L 205.3 144 L 206 144 L 206.8 143.5 L 207.1 143.2 L 207.3 142.9 L 207.3 142.3 L 207.6 141.9 L 207.5 141.7 L 207.5 141.6 L 207.9 141.1 L 208.4 140.9 L 208.7 140.7 L 208.8 140.5 L 208.6 140 L 208.6 139.6 L 209.1 138.3 L 209.2 137.7 L 209.2 137.3 L 209.4 136.2 L 209.4 135.9 L 209.9 135.9 L 210.7 135.2 L 210.8 135.1 L 211.1 135.2 Z",
    "centroid": [
      210.6,
      145.7
    ],
    "latLng": [
      10.1002,
      -70.6653
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 805.28,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-43",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Lara-Yaracuy",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Lara-Yaracuy",
    "path": "M 290.3 136 L 290 135.7 L 289.8 130.4 L 289.9 130.5 L 290.3 136 Z",
    "centroid": [
      290,
      133.2
    ],
    "latLng": [
      10.3566,
      -69.0285
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 4.77,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-44",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Falcón-Lara",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Falcón-Lara",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Falcón-Lara",
    "path": "M 211.1 135.2 L 210.8 135.1 L 210.7 135.2 L 209.9 135.9 L 209.4 135.9 L 209 135.7 L 207.7 135.7 L 207.5 135.6 L 207 135 L 206.8 134.8 L 206.4 134.7 L 206.2 134.7 L 206 134.7 L 205.8 134.3 L 206 134.1 L 206 133.4 L 205.9 133.2 L 205.7 133 L 205.8 132.7 L 206.1 132.2 L 206.1 131.3 L 205.5 130.6 L 205.4 130.2 L 205.4 129.9 L 205 129.6 L 204.9 129.3 L 204.5 128.8 L 204.1 127.7 L 203.9 127.6 L 204.2 127 L 211.3 126.8 L 212.8 126.8 L 214.6 125.6 L 224.9 124 L 224.9 124.2 L 224.7 124.5 L 224.4 124.6 L 224.2 124.6 L 224 124.8 L 223.7 125 L 223.7 125.2 L 223.9 125.3 L 224 125.6 L 223.9 125.8 L 223.6 126.3 L 223.5 127 L 223.3 127.2 L 222.9 127.3 L 222.4 128 L 222.3 128 L 222.2 128.2 L 222.1 128.4 L 221.7 128.6 L 221.2 128.3 L 220.7 127.9 L 220.6 127.7 L 220.5 127.7 L 220 127.8 L 219.6 128.2 L 219.5 128.2 L 219.4 128 L 218.9 128 L 218.6 128.4 L 217.6 129 L 217.3 130 L 216.8 130.6 L 216.9 131.1 L 216.5 132.8 L 216.1 133.3 L 216 133.7 L 215.4 134.4 L 215.2 134.7 L 214.8 134.8 L 213.3 134.5 L 212.7 134.5 L 212.2 134.7 L 211.4 134.9 L 211.2 135.1 L 211.1 135.2 Z",
    "centroid": [
      214.5,
      130.3
    ],
    "latLng": [
      10.4152,
      -70.5858
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 620.02,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-45",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Falcón-Lara",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Falcón-Lara",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Falcón-Lara",
    "path": "M 269.7 116.4 L 269.6 116.4 L 269.4 116.4 L 269.2 116.7 L 268.9 116.8 L 267.7 116.8 L 267.4 116.7 L 266.8 116.7 L 266.5 116.8 L 266.3 117.1 L 266.3 117.5 L 266.1 117.6 L 265.9 117.3 L 266.3 116.8 L 266.3 116.4 L 266.1 115.7 L 266 115.5 L 266.2 115.3 L 266.3 115.2 L 266.3 115.1 L 266.4 115 L 266.4 114.9 L 266.3 114.7 L 266.4 114.4 L 266.4 114.3 L 266.6 114.3 L 267.1 114.5 L 267.6 114.3 L 267.7 114.4 L 268.2 114.5 L 268.5 114.8 L 268.8 114.8 L 269.3 114.6 L 269.7 114.9 L 270 114.9 L 271 114.5 L 271.2 114.6 L 271.3 114.9 L 271.2 115.1 L 271 115.3 L 271 115.4 L 270.7 115.5 L 270.6 116 L 269.7 116.4 Z",
    "centroid": [
      268.1,
      115.6
    ],
    "latLng": [
      10.7168,
      -69.4811
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 48.18,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-46",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Falcón-Yaracuy",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Falcón-Yaracuy",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Falcón-Yaracuy",
    "path": "M 328.5 122.4 L 314.7 121.5 L 308.3 120.4 L 309.9 112.8 L 315.8 120 L 328.5 122.4 Z",
    "centroid": [
      315.4,
      119.4
    ],
    "latLng": [
      10.6386,
      -68.5046
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 223.47,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-47",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Mérida-Zulia",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Mérida-Zulia",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Mérida-Zulia",
    "path": "M 183.8 189.7 L 183.8 189.6 L 184 189.6 L 184.2 189.5 L 185.2 188.1 L 185.5 187.8 L 185.9 187.5 L 186 187.5 L 186.5 187.1 L 187.8 186 L 188 186 L 188.4 185.7 L 189.4 185.3 L 190.2 184.7 L 191.2 184.2 L 191.6 183.8 L 191.8 183.2 L 191.9 182.7 L 191.8 182 L 191.9 181.9 L 192.1 181.8 L 192.3 182.2 L 192.5 182.2 L 192.6 182.3 L 193.1 182.3 L 193.2 182.5 L 193.4 182.5 L 193.4 182.7 L 193.6 182.8 L 193.7 182.9 L 193.8 182.8 L 194 183 L 194.2 183 L 194.2 183.1 L 194.3 183.1 L 194.7 182.9 L 195.1 183.1 L 195.4 183.5 L 196.2 184.1 L 196.5 184.4 L 196.7 184.5 L 196.7 184.6 L 196.8 184.7 L 196.9 185.2 L 197.1 185.3 L 197.2 185.4 L 197.5 185.6 L 197.9 185.6 L 198.6 185.9 L 198.9 186.4 L 199.1 186.5 L 199.3 187.1 L 199.3 187.5 L 199.6 188.2 L 199.4 188.4 L 199 188.7 L 198.9 188.8 L 199.1 189.3 L 199.3 189.3 L 199.2 189.7 L 199.3 190 L 192.9 195.2 L 192.6 194.7 L 192.6 194.6 L 192.3 194.3 L 191.3 194 L 190.7 193.6 L 190.6 193.3 L 190.5 192.6 L 190.1 192.1 L 189.9 192.1 L 189.8 191.9 L 189.2 191.9 L 189 192 L 189 191.9 L 188.8 191.9 L 188.5 191.9 L 188.3 191.8 L 188 191.9 L 188 192 L 187.9 191.9 L 187.8 192 L 187.7 191.9 L 187.7 192 L 187.5 192 L 187.5 192.1 L 187.3 192 L 187.2 192 L 187 191.8 L 186.9 191.9 L 186.7 191.8 L 186.7 191.6 L 186.6 191.7 L 186.6 191.5 L 186.4 191.4 L 186.3 191.5 L 186.2 191.5 L 186.2 191.4 L 186.1 191.4 L 186.2 191.2 L 186.1 190.9 L 185.8 190.8 L 185.7 190.6 L 185.6 190.7 L 185.6 190.5 L 185.4 190.6 L 185.3 190.5 L 185.4 190.4 L 185.2 190.4 L 185.2 190.3 L 185.1 190.4 L 185 190.3 L 184.9 190.4 L 184.8 190.2 L 184.6 190 L 184.3 190.1 L 184.1 189.8 L 183.9 189.8 L 183.8 189.7 Z",
    "centroid": [
      190.6,
      188.4
    ],
    "latLng": [
      9.2247,
      -71.0793
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 563.46,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-48",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Trujillo-Zulia",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Trujillo-Zulia",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Trujillo-Zulia",
    "path": "M 192.1 162.7 L 192 162.6 L 192.4 162.4 L 192.6 162.4 L 193 162 L 193.1 161.9 L 193.5 161.9 L 193.7 162 L 194.3 161.9 L 194.5 162 L 194.8 161.9 L 195.1 161.9 L 195.5 162 L 195.6 162.1 L 195.7 162.6 L 195.8 162.6 L 196.1 162.4 L 196.3 162.3 L 196.5 162.3 L 196.8 162.5 L 196.7 162.6 L 196.8 163 L 197 163 L 197.2 162.9 L 197.5 162.9 L 197.5 163 L 197.7 163.2 L 198 163.5 L 198.4 163.7 L 199.1 164.6 L 199.2 164.5 L 199.4 164.4 L 199.7 164.3 L 200 163.9 L 200.2 163.9 L 200.7 163.8 L 200.8 163.7 L 201.2 164.1 L 201.9 164.4 L 201.9 164.5 L 201.9 164.5 L 202.1 164.8 L 202.5 164.8 L 202.7 164.7 L 202.8 164.8 L 202.9 164.8 L 203 164.9 L 203.7 165 L 204 165.4 L 204.2 165.3 L 204.5 165.4 L 204.5 165.5 L 204.4 165.6 L 204.6 165.7 L 203.9 167.3 L 201.9 170.8 L 201.5 170.7 L 201.4 170.6 L 201.2 170.5 L 200.8 170.7 L 200 170.7 L 199.5 170.5 L 198.9 170.8 L 198.9 171 L 199 171 L 198.9 171.1 L 198.8 170.9 L 198.9 170.6 L 198.6 170.5 L 198.7 170.2 L 198.6 170.2 L 198.5 170.2 L 198.3 170.6 L 198.1 170.7 L 198 170.6 L 197.8 170.3 L 197.3 170.4 L 197.2 170.6 L 197 170.5 L 196.6 170.5 L 195 170.2 L 194.5 170.3 L 194.3 170.1 L 194 170.1 L 193.9 170.1 L 193.8 170.1 L 193 169.9 L 192.6 169.9 L 191.6 169.5 L 191.5 169.3 L 191.5 168.9 L 191.9 168.4 L 192 167.2 L 192.3 166.6 L 192 165.9 L 192.2 165.1 L 192.4 165 L 192.7 164.6 L 192.9 164.8 L 193.1 164.8 L 193.2 164.7 L 192.7 163.4 L 192.5 163.1 L 192.1 162.7 Z",
    "centroid": [
      197.4,
      166.2
    ],
    "latLng": [
      9.6805,
      -70.9382
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 413.16,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-49",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Delta Amacuro-Monagas",
    "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Delta Amacuro-Monagas",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Delta Amacuro-Monagas",
    "path": "M 614.9 164.6 L 615.9 162.8 L 616.3 161.8 L 616.2 161.5 L 615.9 160.9 L 615.4 160.4 L 614.6 159.8 L 614 159.1 L 613.5 157.9 L 613.4 157 L 613.6 157 L 613.6 156.5 L 613.7 156.3 L 613.6 156 L 613.6 155.5 L 613.9 155.3 L 614 154.2 L 614.3 153.8 L 614.3 153.6 L 614.5 153.3 L 614.9 153.2 L 615.1 153.3 L 615 152.9 L 615.9 152.5 L 616.5 152.8 L 616.6 152.8 L 617.7 152.5 L 617.9 152.7 L 618.3 153.3 L 618.5 154.2 L 618.5 155.3 L 619 156.4 L 619 157.9 L 617.4 160.8 L 617.2 162 L 616.6 163.7 L 616.1 164.1 L 614.9 164.6 Z",
    "centroid": [
      615.7,
      157
    ],
    "latLng": [
      9.8689,
      -62.3144
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 205.54,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  },
  {
    "id": "ZS-50",
    "codigoINE": "00",
    "codEnt": "00",
    "nombre": "Sobreposición: Anzoátegui-Monagas",
    "denominacionOficial": "Zona sin Jurisdicción Territorial entre los Estados Anzoátegui-Monagas",
    "capital": "No Aplica",
    "region": "Zona en Controversia Limítrofe",
    "estadosInvolucrados": "Anzoátegui-Monagas",
    "path": "M 538.3 158 L 537.5 157 L 537.2 156.9 L 537.1 156.6 L 536.9 156.6 L 536.8 156.5 L 536.7 156.2 L 536 155.6 L 535.1 155.5 L 534.9 155.2 L 535 155.2 L 535.4 155 L 535.8 155 L 538.2 156.5 L 538.6 157.4 L 538.6 157.6 L 538.3 158 Z",
    "centroid": [
      536.8,
      156.3
    ],
    "latLng": [
      9.8823,
      -63.9413
    ],
    "poblacion": 0,
    "totalMunicipios": 0,
    "coberturaPromedioRTV": 35,
    "penetracionInternetPromedio": 20,
    "estatus": "CRITICO",
    "superficieKm2": 14.69,
    "esZonaSobreposicion": true,
    "tipoZona": "ZONA_SOBREPOSICION",
    "color": "#ef4444"
  }
];

export const VENEZUELA_SOBREPOSICION_GEOJSON = {
  type: "FeatureCollection",
  features: [
  {
    "type": "Feature",
    "id": "ZS-01",
    "properties": {
      "id": "ZS-01",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Merida-Táchira",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Merida-Táchira",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Merida-Táchira",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        7.8672,
        -71.5534
      ],
      "superficieKm2": 113.53,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -71.51327304336579,
            7.841290239718169
          ],
          [
            -71.52057442348422,
            7.8339267957175265
          ],
          [
            -71.53107467400118,
            7.827020686289751
          ],
          [
            -71.53257367364212,
            7.819284623323277
          ],
          [
            -71.53983381441782,
            7.809204514405339
          ],
          [
            -71.54625395497283,
            7.803861451795268
          ],
          [
            -71.54703293956814,
            7.795946389096484
          ],
          [
            -71.55128100196725,
            7.7885503110802174
          ],
          [
            -71.55344106447804,
            7.788068295748717
          ],
          [
            -71.55632112629613,
            7.783868248445427
          ],
          [
            -71.55567208012346,
            7.780229233000838
          ],
          [
            -71.55698811151305,
            7.779843216881008
          ],
          [
            -71.55752811124731,
            7.775346186160539
          ],
          [
            -71.56118818965885,
            7.773364155073222
          ],
          [
            -71.56550932975675,
            7.777017154975525
          ],
          [
            -71.57654148643644,
            7.777185795332884
          ],
          [
            -71.57071050210668,
            7.789835826672592
          ],
          [
            -71.57094787713031,
            7.792641029726934
          ],
          [
            -71.56766789208375,
            7.794367326683577
          ],
          [
            -71.56678315789307,
            7.796935170674371
          ],
          [
            -71.5689871427164,
            7.809304279720309
          ],
          [
            -71.56850959589799,
            7.818341029716716
          ],
          [
            -71.57474595483215,
            7.824469295575272
          ],
          [
            -71.57116386083663,
            7.826648748984962
          ],
          [
            -71.56821470454771,
            7.831467514372545
          ],
          [
            -71.56902762706441,
            7.840631623153203
          ],
          [
            -71.56570448576653,
            7.846242060799448
          ],
          [
            -71.57317084557232,
            7.851399295033701
          ],
          [
            -71.57023614243138,
            7.857376560897886
          ],
          [
            -71.57155247085892,
            7.862059077039259
          ],
          [
            -71.57586825136806,
            7.861821701854536
          ],
          [
            -71.58441353281994,
            7.8655978739082775
          ],
          [
            -71.58862145471677,
            7.868424639309973
          ],
          [
            -71.58864303320071,
            7.870431451478374
          ],
          [
            -71.59140515824078,
            7.8729992646023295
          ],
          [
            -71.58857834566052,
            7.877271827154596
          ],
          [
            -71.5917288766064,
            7.8787607328319265
          ],
          [
            -71.59069311105242,
            7.88439273302526
          ],
          [
            -71.59163414216106,
            7.894720514092741
          ],
          [
            -71.58719740832684,
            7.898354029900782
          ],
          [
            -71.5863990176057,
            7.907071764693757
          ],
          [
            -71.58259651781596,
            7.907205982666256
          ],
          [
            -71.58050800186587,
            7.91117170142142
          ],
          [
            -71.57174915820958,
            7.917900108176902
          ],
          [
            -71.56119490818273,
            7.921205826442865
          ],
          [
            -71.55813073580832,
            7.9286935766141875
          ],
          [
            -71.55996251752723,
            7.9314419364542905
          ],
          [
            -71.55951004818766,
            7.934969311184523
          ],
          [
            -71.55480764239451,
            7.939461279880384
          ],
          [
            -71.555023439206,
            7.942288061258517
          ],
          [
            -71.55154926722838,
            7.947639545839862
          ],
          [
            -71.55305987672206,
            7.962787655259945
          ],
          [
            -71.54747095466779,
            7.967642842337053
          ],
          [
            -71.5389472829863,
            7.969994951822362
          ],
          [
            -71.53274506392432,
            7.968665654597969
          ],
          [
            -71.53329320163607,
            7.97673386002218
          ],
          [
            -71.52830567013663,
            7.972469132760805
          ],
          [
            -71.52793498311743,
            7.964685891212536
          ],
          [
            -71.52060058455588,
            7.96025370354202
          ],
          [
            -71.51711337346636,
            7.94050357838077
          ],
          [
            -71.50709001424512,
            7.925127523561049
          ],
          [
            -71.51046352169078,
            7.894147320545932
          ],
          [
            -71.50921764675437,
            7.890996093671026
          ],
          [
            -71.51153692846731,
            7.887533227212231
          ],
          [
            -71.51037909216937,
            7.876053024026421
          ],
          [
            -71.51148278742576,
            7.87372300771556
          ],
          [
            -71.51732834975856,
            7.8715973595085105
          ],
          [
            -71.51855467785505,
            7.868531546756572
          ],
          [
            -71.51663331130712,
            7.851322195773891
          ],
          [
            -71.51974003743001,
            7.847806727026357
          ],
          [
            -71.51626536564521,
            7.842778835993651
          ],
          [
            -71.51327304336579,
            7.841290239718169
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-02",
    "properties": {
      "id": "ZS-02",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Táchira-Zulia",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Táchira-Zulia",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Táchira-Zulia",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        8.5978,
        -72.085
      ],
      "superficieKm2": 694.11,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -71.98439407657935,
            8.645836344289316
          ],
          [
            -71.98490678830484,
            8.64010222756868
          ],
          [
            -71.98735769431282,
            8.635938102110089
          ],
          [
            -71.98635825646976,
            8.632368914879615
          ],
          [
            -71.9816467564028,
            8.627562383805305
          ],
          [
            -71.98631056915472,
            8.616569165161597
          ],
          [
            -71.984335569591,
            8.615046321460513
          ],
          [
            -71.98433553807342,
            8.609716290291376
          ],
          [
            -71.98124213139849,
            8.60718213331692
          ],
          [
            -71.97874363146232,
            8.608110164482571
          ],
          [
            -71.9743068193849,
            8.603846352865109
          ],
          [
            -71.9751505376772,
            8.602423227190755
          ],
          [
            -71.97336588146956,
            8.602161477437486
          ],
          [
            -71.9734134751256,
            8.600091351971079
          ],
          [
            -71.97600713170824,
            8.599472664735005
          ],
          [
            -71.97469835084068,
            8.592393727443767
          ],
          [
            -71.9775636001641,
            8.584251415276626
          ],
          [
            -71.98257450721458,
            8.577938352091635
          ],
          [
            -71.98490106910049,
            8.571165102099078
          ],
          [
            -71.98519194393593,
            8.568658352498677
          ],
          [
            -71.98369281974738,
            8.5686345714842
          ],
          [
            -71.98312172552889,
            8.566731008972887
          ],
          [
            -71.98535841294239,
            8.555023946289749
          ],
          [
            -71.9802968189996,
            8.547236945842918
          ],
          [
            -71.98038513173346,
            8.540521039409594
          ],
          [
            -71.9760067259116,
            8.525340009003951
          ],
          [
            -71.97255638164216,
            8.519438914741206
          ],
          [
            -71.97227078794928,
            8.512324290207175
          ],
          [
            -72.07088897569687,
            8.428961008127638
          ],
          [
            -72.15892644485047,
            8.42962778995479
          ],
          [
            -72.21633141348438,
            8.422017883901802
          ],
          [
            -72.30879325723701,
            8.375566883283383
          ],
          [
            -72.30922522600747,
            8.391144820913786
          ],
          [
            -72.31894522564869,
            8.405191602129571
          ],
          [
            -72.32250760068086,
            8.429525289428106
          ],
          [
            -72.32242994435636,
            8.444954195783323
          ],
          [
            -72.32517285127837,
            8.459756539675483
          ],
          [
            -72.33459581922251,
            8.473961976923094
          ],
          [
            -72.3439977572396,
            8.500532758510651
          ],
          [
            -72.3472748895217,
            8.500541165067347
          ],
          [
            -72.32019578068167,
            8.532545594406033
          ],
          [
            -72.3173577413558,
            8.531028469460763
          ],
          [
            -72.31627471789494,
            8.532106484767134
          ],
          [
            -72.31512772603577,
            8.538215539717111
          ],
          [
            -72.31332268649734,
            8.539953563330291
          ],
          [
            -72.19329238933264,
            8.567841125725822
          ],
          [
            -72.190139483201,
            8.57173271208871
          ],
          [
            -72.18906868653255,
            8.569924312909464
          ],
          [
            -72.18792651481314,
            8.570566782526146
          ],
          [
            -72.1879264986698,
            8.567616227144827
          ],
          [
            -72.18618945246749,
            8.567996953817813
          ],
          [
            -72.18623705413853,
            8.570685766672483
          ],
          [
            -72.1802406712202,
            8.573755321518039
          ],
          [
            -72.16831924874228,
            8.573208110225119
          ],
          [
            -72.16103795174732,
            8.580417969205373
          ],
          [
            -72.15899154597803,
            8.579156852363287
          ],
          [
            -72.15480360048561,
            8.581179438111016
          ],
          [
            -72.1503776625898,
            8.579371063222121
          ],
          [
            -72.14818851417043,
            8.580299063398241
          ],
          [
            -72.14930688973318,
            8.581726750885393
          ],
          [
            -72.14787918678489,
            8.582393008264637
          ],
          [
            -72.14711772522038,
            8.58091774292649
          ],
          [
            -72.14590418665114,
            8.582845118390594
          ],
          [
            -72.1435008508563,
            8.58129846926499
          ],
          [
            -72.14371502218607,
            8.58334482107448
          ],
          [
            -72.14226350669115,
            8.58225027448744
          ],
          [
            -72.1424300535511,
            8.579513875631907
          ],
          [
            -72.14095477245475,
            8.583083094845664
          ],
          [
            -72.1383134990641,
            8.583963524224856
          ],
          [
            -72.14069303822137,
            8.585986063474833
          ],
          [
            -72.14193038212076,
            8.584534578712246
          ],
          [
            -72.14171624092806,
            8.586818876233307
          ],
          [
            -72.1392177485441,
            8.589103188273087
          ],
          [
            -72.13357827998072,
            8.588555938536464
          ],
          [
            -72.1341731707553,
            8.590983001011926
          ],
          [
            -72.13086563997099,
            8.592267946468539
          ],
          [
            -72.13115119452344,
            8.59445706315775
          ],
          [
            -72.12865269435619,
            8.594504665201555
          ],
          [
            -72.12917621025828,
            8.597954907563668
          ],
          [
            -72.12696325687416,
            8.597859735072987
          ],
          [
            -72.12893827214424,
            8.599739508903808
          ],
          [
            -72.12529758497779,
            8.5975980086382
          ],
          [
            -72.12503585094109,
            8.60042958687038
          ],
          [
            -72.12279910858132,
            8.601619344301767
          ],
          [
            -72.12389369425833,
            8.60316599349118
          ],
          [
            -72.12189489709336,
            8.603403954202635
          ],
          [
            -72.12379852240109,
            8.604879219254325
          ],
          [
            -72.12325124913932,
            8.607496649117513
          ],
          [
            -72.12146660049515,
            8.606759016342027
          ],
          [
            -72.12201389768154,
            8.608615008657898
          ],
          [
            -72.11937263218852,
            8.609899946526403
          ],
          [
            -72.11865876457453,
            8.606901805376626
          ],
          [
            -72.11765938151086,
            8.610137899300305
          ],
          [
            -72.11230544467799,
            8.609090961569175
          ],
          [
            -72.11273377193142,
            8.61227946216629
          ],
          [
            -72.11128227277932,
            8.61311229017472
          ],
          [
            -72.10916446809784,
            8.608329547970216
          ],
          [
            -72.10585692843128,
            8.608853047898622
          ],
          [
            -72.10109790494238,
            8.613493055774944
          ],
          [
            -72.09526807701225,
            8.613778625759274
          ],
          [
            -72.08860542069579,
            8.616824399167953
          ],
          [
            -72.0831801008076,
            8.615682274368282
          ],
          [
            -72.0806578114726,
            8.616681672876938
          ],
          [
            -72.08068159226919,
            8.614230813106317
          ],
          [
            -72.0746933035338,
            8.61285999350798
          ],
          [
            -72.07117163187368,
            8.617381016618038
          ],
          [
            -72.06950595970196,
            8.617047891893714
          ],
          [
            -72.06814964699281,
            8.620355383342451
          ],
          [
            -72.06826865472082,
            8.626244586989085
          ],
          [
            -72.07036263155435,
            8.626030422428771
          ],
          [
            -72.07312289749063,
            8.62840989139189
          ],
          [
            -72.07190935794378,
            8.631229579090686
          ],
          [
            -72.06967261565788,
            8.6329666100402
          ],
          [
            -72.04806652277577,
            8.63196735277246
          ],
          [
            -72.04333129610973,
            8.636559774697265
          ],
          [
            -72.03719212381846,
            8.635964938792613
          ],
          [
            -72.03381322519535,
            8.640366985723395
          ],
          [
            -72.03286143664351,
            8.645102164800686
          ],
          [
            -72.02343853006711,
            8.647719641281927
          ],
          [
            -72.0202738033627,
            8.653644555320799
          ],
          [
            -72.01989311646818,
            8.661056633868602
          ],
          [
            -72.01741842072963,
            8.661841883672627
          ],
          [
            -72.01634762354352,
            8.66015245416488
          ],
          [
            -72.00770994423681,
            8.659652813750961
          ],
          [
            -71.99707349855674,
            8.665316031795218
          ],
          [
            -71.99281417099382,
            8.669408758580834
          ],
          [
            -71.99000634273925,
            8.669147039737492
          ],
          [
            -71.98914973287411,
            8.673001797933773
          ],
          [
            -71.99398016332883,
            8.673192126367045
          ],
          [
            -71.99699466443504,
            8.679324801510438
          ],
          [
            -71.99313237388972,
            8.679423727402083
          ],
          [
            -71.99139533503231,
            8.681969782149757
          ],
          [
            -71.98585103796842,
            8.681113196185004
          ],
          [
            -71.98666005386079,
            8.677210852239872
          ],
          [
            -71.98182962357886,
            8.677829539830773
          ],
          [
            -71.98316213118146,
            8.674284110230268
          ],
          [
            -71.98523231873017,
            8.674200813321015
          ],
          [
            -71.98492296715425,
            8.671178876350584
          ],
          [
            -71.98330488937347,
            8.671250274239624
          ],
          [
            -71.98430427245661,
            8.669108735325059
          ],
          [
            -71.98244824143487,
            8.667942805643932
          ],
          [
            -71.98318588173284,
            8.66612250063034
          ],
          [
            -71.98142502966641,
            8.664599641854279
          ],
          [
            -71.98328105377692,
            8.664789985011497
          ],
          [
            -71.98232923313729,
            8.662148774655714
          ],
          [
            -71.98409007735246,
            8.66172045431162
          ],
          [
            -71.98230542049292,
            8.659626524775058
          ],
          [
            -71.9829954601991,
            8.656366634132565
          ],
          [
            -71.98556535801045,
            8.657009079371011
          ],
          [
            -71.98801624925677,
            8.654391641421425
          ],
          [
            -71.98501803005763,
            8.64991823497567
          ],
          [
            -71.98468487347014,
            8.646991477678556
          ],
          [
            -71.98630294371347,
            8.645635164929566
          ],
          [
            -71.98439407657935,
            8.645836344289316
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-03",
    "properties": {
      "id": "ZS-03",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Anzoátegui-Monagas",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Anzoátegui-Monagas",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Anzoátegui-Monagas",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        8.6216,
        -63.005
      ],
      "superficieKm2": 248.49,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -62.72943235125455,
            8.449756114801765
          ],
          [
            -63.06165883586907,
            8.551417036989363
          ],
          [
            -63.0547924607047,
            8.583248396001206
          ],
          [
            -63.04994483567557,
            8.69696486521994
          ],
          [
            -63.04634649178586,
            8.699323630638458
          ],
          [
            -63.04598083686479,
            8.70274040623309
          ],
          [
            -63.04660688526932,
            8.66740898134768
          ],
          [
            -62.72943235125455,
            8.449756114801765
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-04",
    "properties": {
      "id": "ZS-04",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Barinas-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Barinas-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Barinas-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        8.609,
        -69.3884
      ],
      "superficieKm2": 312.56,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.19013003951835,
            8.494473053581581
          ],
          [
            -69.19740106264899,
            8.49858407126701
          ],
          [
            -69.20194593776029,
            8.497370493285468
          ],
          [
            -69.20777587546023,
            8.509006118169271
          ],
          [
            -69.20658614029331,
            8.514645509271553
          ],
          [
            -69.21341539076556,
            8.515882789938788
          ],
          [
            -69.2174844063204,
            8.51971372793731
          ],
          [
            -69.22145821904944,
            8.519618509114682
          ],
          [
            -69.22269565675602,
            8.531611087026155
          ],
          [
            -69.23042912483,
            8.531801399730456
          ],
          [
            -69.23547374963832,
            8.535870274543413
          ],
          [
            -69.23818639085432,
            8.53482329060275
          ],
          [
            -69.24289787499488,
            8.536417508846933
          ],
          [
            -69.25450993742103,
            8.532681649838606
          ],
          [
            -69.26091087514166,
            8.533252680729644
          ],
          [
            -69.26593168795979,
            8.535893868363827
          ],
          [
            -69.27475970313984,
            8.532800493233264
          ],
          [
            -69.28139859379561,
            8.532967009364922
          ],
          [
            -69.28753774996039,
            8.528231806160825
          ],
          [
            -69.29222542169472,
            8.529350134469171
          ],
          [
            -69.29934020285376,
            8.528041368880835
          ],
          [
            -69.3060505159017,
            8.533704493880666
          ],
          [
            -69.31207067166278,
            8.529183431217357
          ],
          [
            -69.36182064103859,
            8.529843399853092
          ],
          [
            -69.36369451617153,
            8.528148024785464
          ],
          [
            -69.36585992183187,
            8.532454868810696
          ],
          [
            -69.37130903163995,
            8.5318123841907
          ],
          [
            -69.37342682857538,
            8.533763540502243
          ],
          [
            -69.3779717193457,
            8.5342631965448
          ],
          [
            -69.38632384352024,
            8.531455352495136
          ],
          [
            -69.39753143739665,
            8.53402511867632
          ],
          [
            -69.40076759354768,
            8.535952462132425
          ],
          [
            -69.40438451595034,
            8.541282493091813
          ],
          [
            -69.40923876544714,
            8.543114665356695
          ],
          [
            -69.40695443812649,
            8.547397743399017
          ],
          [
            -69.40823943758454,
            8.552703962539221
          ],
          [
            -69.40524125027864,
            8.55751054084159
          ],
          [
            -69.41149940668534,
            8.557034602821158
          ],
          [
            -69.4168772342326,
            8.571596993900268
          ],
          [
            -69.42561010957367,
            8.573119805914756
          ],
          [
            -69.42806106243388,
            8.57828327455666
          ],
          [
            -69.43096407875657,
            8.57766457206882
          ],
          [
            -69.43132104755756,
            8.584803024407222
          ],
          [
            -69.43969704716729,
            8.594035353058354
          ],
          [
            -69.44019678133718,
            8.598032868218695
          ],
          [
            -69.44586004712997,
            8.597461775220014
          ],
          [
            -69.44938176603647,
            8.599579477681656
          ],
          [
            -69.4523799535221,
            8.59612921221814
          ],
          [
            -69.45233237524995,
            8.599127368361714
          ],
          [
            -69.4538076874798,
            8.600126728065316
          ],
          [
            -69.4588522507218,
            8.596176759603846
          ],
          [
            -69.46646675005707,
            8.597366447085772
          ],
          [
            -69.46837032862058,
            8.591727071920484
          ],
          [
            -69.47160648439704,
            8.589942431102719
          ],
          [
            -69.48664510946429,
            8.593463962726943
          ],
          [
            -69.48823946909864,
            8.604314400100336
          ],
          [
            -69.48593137528174,
            8.612047727513866
          ],
          [
            -69.4877398438152,
            8.616306978322866
          ],
          [
            -69.49509260991475,
            8.62139902453913
          ],
          [
            -69.4983288129845,
            8.626919400004356
          ],
          [
            -69.50570539122486,
            8.631702102686347
          ],
          [
            -69.5102264687817,
            8.630060227584172
          ],
          [
            -69.51322468816656,
            8.63132133701602
          ],
          [
            -69.51410515691397,
            8.637341431096527
          ],
          [
            -69.52060128154837,
            8.64214793083431
          ],
          [
            -69.52419442211465,
            8.648905633878766
          ],
          [
            -69.52721642214776,
            8.648810430883467
          ],
          [
            -69.53947106273093,
            8.660398431465168
          ],
          [
            -69.5472447189259,
            8.662993165657864
          ],
          [
            -69.54453209442546,
            8.667823540470682
          ],
          [
            -69.54605500069434,
            8.67165449382894
          ],
          [
            -69.54900562542628,
            8.67265385316426
          ],
          [
            -69.54660235968757,
            8.68148174392861
          ],
          [
            -69.55521629678682,
            8.688739103086396
          ],
          [
            -69.56763745332778,
            8.693164868529706
          ],
          [
            -69.57142093749023,
            8.697709650283343
          ],
          [
            -69.57046917268713,
            8.706133009351237
          ],
          [
            -69.57513089065162,
            8.714939805966429
          ],
          [
            -69.5734585315059,
            8.720082587122032
          ],
          [
            -69.56790197376145,
            8.716562254651473
          ],
          [
            -69.56169141108569,
            8.716609911327746
          ],
          [
            -69.5602398794893,
            8.715324973477555
          ],
          [
            -69.56314278589375,
            8.694552098779768
          ],
          [
            -69.55555209810146,
            8.697835817242607
          ],
          [
            -69.54864437996328,
            8.69087531703092
          ],
          [
            -69.5391493174738,
            8.691590005092564
          ],
          [
            -69.53358125440974,
            8.695302035939163
          ],
          [
            -69.53210600461348,
            8.701869410784404
          ],
          [
            -69.53044034827468,
            8.702131161099008
          ],
          [
            -69.52810834868423,
            8.695230660821375
          ],
          [
            -69.53441406715042,
            8.690114785842402
          ],
          [
            -69.53251037970925,
            8.681691411188497
          ],
          [
            -69.52920284838652,
            8.681501067549961
          ],
          [
            -69.52851281734019,
            8.687997067412702
          ],
          [
            -69.52372997373006,
            8.689567567408048
          ],
          [
            -69.5232302546424,
            8.687140473850652
          ],
          [
            -69.52515769223544,
            8.68426128579082
          ],
          [
            -69.52301609792798,
            8.684166129813757
          ],
          [
            -69.5233730048863,
            8.681643880303023
          ],
          [
            -69.51423559784384,
            8.678098535824963
          ],
          [
            -69.51385487961288,
            8.676075942262036
          ],
          [
            -69.50681141094418,
            8.671269442819508
          ],
          [
            -69.49624631690051,
            8.671198161010652
          ],
          [
            -69.49460444203827,
            8.666772317325405
          ],
          [
            -69.4798751608171,
            8.66817628644393
          ],
          [
            -69.47309350420963,
            8.667081785795995
          ],
          [
            -69.46326606741731,
            8.669318567178502
          ],
          [
            -69.45110669237661,
            8.669651786157829
          ],
          [
            -69.43909006712424,
            8.66824797328698
          ],
          [
            -69.42802525487193,
            8.6645360365047
          ],
          [
            -69.42331375399877,
            8.661371348776989
          ],
          [
            -69.41581897284412,
            8.659498317627035
          ],
          [
            -69.40852416061286,
            8.648500692010947
          ],
          [
            -69.40332637902611,
            8.646180723846589
          ],
          [
            -69.40015862959845,
            8.64212075526157
          ],
          [
            -69.39540697302387,
            8.641161567185394
          ],
          [
            -69.39072225464288,
            8.637993911050762
          ],
          [
            -69.38846909822836,
            8.63023088001686
          ],
          [
            -69.38351672334804,
            8.631547066959362
          ],
          [
            -69.37646731665745,
            8.625791723684458
          ],
          [
            -69.37367884833351,
            8.626327130204826
          ],
          [
            -69.37089034825698,
            8.631502505063146
          ],
          [
            -69.35748325453727,
            8.639287973739652
          ],
          [
            -69.34507997355794,
            8.638685754580518
          ],
          [
            -69.3436076297326,
            8.636053442051429
          ],
          [
            -69.3403060039202,
            8.6359865677473
          ],
          [
            -69.338833692096,
            8.637726567742666
          ],
          [
            -69.3332120668635,
            8.637570442704195
          ],
          [
            -69.3264750046727,
            8.634692786241304
          ],
          [
            -69.31880103543007,
            8.63612053593669
          ],
          [
            -69.31518712909491,
            8.633488286157938
          ],
          [
            -69.311483972629,
            8.634492160931797
          ],
          [
            -69.30974397337235,
            8.637704473702733
          ],
          [
            -69.307981661015,
            8.637882910820187
          ],
          [
            -69.30360922282749,
            8.633532973650892
          ],
          [
            -69.30273919178812,
            8.630342973751333
          ],
          [
            -69.29727372346169,
            8.631213036378247
          ],
          [
            -69.29178591043024,
            8.629026880032788
          ],
          [
            -69.28904200450614,
            8.62588153590881
          ],
          [
            -69.28350959815056,
            8.6233385050741
          ],
          [
            -69.28690041101181,
            8.618720817764059
          ],
          [
            -69.28359878575371,
            8.616512379946904
          ],
          [
            -69.28893037970379,
            8.60995391125611
          ],
          [
            -69.2862801918049,
            8.605983192533749
          ],
          [
            -69.28351991065334,
            8.60674462984337
          ],
          [
            -69.27359728553184,
            8.603722754888697
          ],
          [
            -69.26707728557325,
            8.590683255021805
          ],
          [
            -69.26186609800145,
            8.588113442593114
          ],
          [
            -69.2595103481095,
            8.585067723159609
          ],
          [
            -69.253870879651,
            8.590350223492049
          ],
          [
            -69.25246697325231,
            8.590040879667859
          ],
          [
            -69.24820756657721,
            8.582117254520005
          ],
          [
            -69.24815994220447,
            8.575668848370784
          ],
          [
            -69.24399575458499,
            8.573860473531893
          ],
          [
            -69.24035503545909,
            8.564747098679705
          ],
          [
            -69.23633359765597,
            8.564176036343383
          ],
          [
            -69.23702366092374,
            8.559298098298171
          ],
          [
            -69.23252631682787,
            8.555943066906408
          ],
          [
            -69.21677384844118,
            8.55575278580282
          ],
          [
            -69.21491778506298,
            8.55085106696102
          ],
          [
            -69.21191956683471,
            8.548661973681918
          ],
          [
            -69.2129902852037,
            8.539572380094265
          ],
          [
            -69.2107059108753,
            8.535717598882139
          ],
          [
            -69.19614319179786,
            8.533147848242981
          ],
          [
            -69.18986112886171,
            8.51725297343428
          ],
          [
            -69.19288309760375,
            8.510043129770581
          ],
          [
            -69.18948031696935,
            8.50307128560753
          ],
          [
            -69.19013003951835,
            8.494473053581581
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-05",
    "properties": {
      "id": "ZS-05",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Barinas-Mérida",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Barinas-Mérida",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Barinas-Mérida",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        8.4947,
        -70.9088
      ],
      "superficieKm2": 913.84,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -71.03505936103039,
            8.252433326834868
          ],
          [
            -71.03891878759045,
            8.255620348007064
          ],
          [
            -71.04209181877141,
            8.263316661212171
          ],
          [
            -71.0465113809482,
            8.26676466035938
          ],
          [
            -71.05044947442636,
            8.273731911020862
          ],
          [
            -71.05087781865586,
            8.282559785857787
          ],
          [
            -71.05244831867677,
            8.284534754360285
          ],
          [
            -71.05142516201609,
            8.290792785533982
          ],
          [
            -71.06515509931107,
            8.303618098711413
          ],
          [
            -71.06998559935938,
            8.311755879699213
          ],
          [
            -71.06901000603233,
            8.315348910583243
          ],
          [
            -71.07081847503943,
            8.321511755032077
          ],
          [
            -71.06897653690497,
            8.329937036150177
          ],
          [
            -71.07159638059139,
            8.333305317165403
          ],
          [
            -71.07081669365681,
            8.338388910883461
          ],
          [
            -71.07543263122793,
            8.34811944219526
          ],
          [
            -71.07306325616642,
            8.354701223327332
          ],
          [
            -71.07852813071995,
            8.358922036172192
          ],
          [
            -71.07787322439204,
            8.36605622343591
          ],
          [
            -71.08318550582283,
            8.373188160705231
          ],
          [
            -71.07988269366778,
            8.378098317506575
          ],
          [
            -71.06843285001109,
            8.383823192543474
          ],
          [
            -71.06797050559004,
            8.391683816849257
          ],
          [
            -71.05980150591232,
            8.396087567048452
          ],
          [
            -71.05117006831189,
            8.3974307547292
          ],
          [
            -71.03987438121477,
            8.403838223685426
          ],
          [
            -71.04379378737463,
            8.410069441907563
          ],
          [
            -71.04520303684059,
            8.416036441796768
          ],
          [
            -71.04414616232816,
            8.421497067020265
          ],
          [
            -71.04142178744384,
            8.424286629872416
          ],
          [
            -71.04154800565689,
            8.43547884801181
          ],
          [
            -71.03058259979902,
            8.44131381703765
          ],
          [
            -71.01445709991161,
            8.441318192607458
          ],
          [
            -71.0023714430632,
            8.445706692413799
          ],
          [
            -71.0044094743187,
            8.457731254836451
          ],
          [
            -71.0026039751038,
            8.462575316916642
          ],
          [
            -71.00319850617444,
            8.46587809891723
          ],
          [
            -70.99813584991055,
            8.473237567517561
          ],
          [
            -70.9978308804732,
            8.477319535617829
          ],
          [
            -70.98862966178254,
            8.486520692642939
          ],
          [
            -70.98880278728254,
            8.491802723175441
          ],
          [
            -70.98060272436207,
            8.504745504425046
          ],
          [
            -70.9795504120704,
            8.51229331721275
          ],
          [
            -70.983924912132,
            8.526825535848554
          ],
          [
            -70.98539294358345,
            8.540535754670156
          ],
          [
            -70.99284419329891,
            8.54876625485017
          ],
          [
            -70.99716578678049,
            8.550077036042888
          ],
          [
            -70.99314372456134,
            8.557181723120259
          ],
          [
            -70.99220428716043,
            8.56281847394421
          ],
          [
            -70.99446491187072,
            8.569247848346272
          ],
          [
            -70.99387778710413,
            8.574062598292286
          ],
          [
            -70.99962363074616,
            8.588431441986215
          ],
          [
            -70.99549350606759,
            8.592359442346808
          ],
          [
            -70.9811950061581,
            8.596785786074228
          ],
          [
            -70.97668425613675,
            8.60104522389919
          ],
          [
            -70.96645778709055,
            8.602293786516137
          ],
          [
            -70.95910441185009,
            8.61053478616665
          ],
          [
            -70.9601596624173,
            8.616811786140751
          ],
          [
            -70.95102181856971,
            8.621215536411144
          ],
          [
            -70.94619969291956,
            8.626478004788042
          ],
          [
            -70.94327122500368,
            8.632709286101786
          ],
          [
            -70.93452969341126,
            8.631168035935358
          ],
          [
            -70.93347503664889,
            8.627022129480073
          ],
          [
            -70.9272888803977,
            8.625352192452043
          ],
          [
            -70.92349816226807,
            8.625817598269002
          ],
          [
            -70.91628756805471,
            8.630233317049395
          ],
          [
            -70.91475666231713,
            8.636100285714988
          ],
          [
            -70.90550878695711,
            8.643762817184541
          ],
          [
            -70.90226034929857,
            8.648806536173396
          ],
          [
            -70.8958425053688,
            8.65301066092082
          ],
          [
            -70.89608475616832,
            8.663161192365386
          ],
          [
            -70.89465353714117,
            8.665524504569964
          ],
          [
            -70.89201128731193,
            8.667550255166224
          ],
          [
            -70.8853019748978,
            8.668674817811677
          ],
          [
            -70.87924031826685,
            8.673598067330579
          ],
          [
            -70.87319244335382,
            8.670280660931043
          ],
          [
            -70.870285912347,
            8.67163116110541
          ],
          [
            -70.86467847466571,
            8.680849629866499
          ],
          [
            -70.85937231840767,
            8.682624160986453
          ],
          [
            -70.855137256077,
            8.687756130254057
          ],
          [
            -70.85231519282571,
            8.688731098838094
          ],
          [
            -70.85316828677038,
            8.695757192340864
          ],
          [
            -70.85190756829742,
            8.696673692705051
          ],
          [
            -70.84342294360249,
            8.697348973893734
          ],
          [
            -70.81846828653379,
            8.70572250486648
          ],
          [
            -70.81148525547569,
            8.716281661408093
          ],
          [
            -70.802451037409,
            8.714816598833321
          ],
          [
            -70.80082500535897,
            8.708938349083176
          ],
          [
            -70.79767938071073,
            8.70705006732154
          ],
          [
            -70.79862319282688,
            8.701579880172911
          ],
          [
            -70.79285300564383,
            8.700490755349836
          ],
          [
            -70.77735863053636,
            8.714877411514188
          ],
          [
            -70.76345256798815,
            8.713892473795681
          ],
          [
            -70.76110394284217,
            8.718557911144345
          ],
          [
            -70.75654146943145,
            8.720617389711597
          ],
          [
            -70.75188317272021,
            8.715752202699683
          ],
          [
            -70.7519659542189,
            8.712170577662825
          ],
          [
            -70.74726626704533,
            8.706497999628956
          ],
          [
            -70.74345681383944,
            8.70467614016095
          ],
          [
            -70.73498914152057,
            8.705131671694124
          ],
          [
            -70.73223987599262,
            8.701731155611037
          ],
          [
            -70.72628354795332,
            8.69901756174476
          ],
          [
            -70.71253107884431,
            8.682826906022843
          ],
          [
            -70.70535660993426,
            8.677906077464026
          ],
          [
            -70.71593017288497,
            8.664345467904893
          ],
          [
            -70.71474470396552,
            8.652017734060001
          ],
          [
            -70.71962839130647,
            8.640021858975048
          ],
          [
            -70.72280521932502,
            8.638267499716775
          ],
          [
            -70.72518975106487,
            8.632546468125305
          ],
          [
            -70.73654570386267,
            8.632254312222253
          ],
          [
            -70.7445940788887,
            8.628519452437327
          ],
          [
            -70.75543045447937,
            8.616841515365644
          ],
          [
            -70.75642989120078,
            8.61379054634651
          ],
          [
            -70.76432050098491,
            8.6140009059677
          ],
          [
            -70.77852353182823,
            8.607793655307947
          ],
          [
            -70.78439887563643,
            8.608771905400815
          ],
          [
            -70.78904437643816,
            8.612422655954086
          ],
          [
            -70.7914641569939,
            8.612159624385571
          ],
          [
            -70.79625106311276,
            8.605005608240862
          ],
          [
            -70.80635100092691,
            8.601218124011545
          ],
          [
            -70.80840254834352,
            8.598956186714203
          ],
          [
            -70.81576711039104,
            8.59927174964487
          ],
          [
            -70.81997545433245,
            8.6027435152462
          ],
          [
            -70.82849729792136,
            8.601060171031653
          ],
          [
            -70.83328423585421,
            8.596851905451858
          ],
          [
            -70.83454671989386,
            8.59364312474564
          ],
          [
            -70.84010129754681,
            8.59205743640356
          ],
          [
            -70.84462175095896,
            8.588562592864054
          ],
          [
            -70.84296317316756,
            8.56518485890353
          ],
          [
            -70.83991207883626,
            8.554822092971543
          ],
          [
            -70.83612456314727,
            8.550666483624079
          ],
          [
            -70.84012232879195,
            8.527889373918047
          ],
          [
            -70.83238946950031,
            8.51531731176768
          ],
          [
            -70.82570873522175,
            8.51189815578998
          ],
          [
            -70.82360454791396,
            8.50590143636684
          ],
          [
            -70.8180810792423,
            8.499378687149305
          ],
          [
            -70.82618206400214,
            8.4940131402451
          ],
          [
            -70.83317832924912,
            8.483808124506671
          ],
          [
            -70.83328342273435,
            8.464082014531847
          ],
          [
            -70.82918025095289,
            8.453982265043932
          ],
          [
            -70.8368675008494,
            8.44042590565218
          ],
          [
            -70.83807934512923,
            8.436535264973703
          ],
          [
            -70.83697265689233,
            8.432903686528974
          ],
          [
            -70.84144398530515,
            8.430063092870562
          ],
          [
            -70.84665167314816,
            8.413387921178199
          ],
          [
            -70.84901882920896,
            8.410126530650224
          ],
          [
            -70.84644122022497,
            8.40775940497537
          ],
          [
            -70.84754589166,
            8.403761577485353
          ],
          [
            -70.85664632889353,
            8.394766405525974
          ],
          [
            -70.8629587357031,
            8.383614545992838
          ],
          [
            -70.86437900064246,
            8.37672354596293
          ],
          [
            -70.87921328198432,
            8.369253842607735
          ],
          [
            -70.88422871981915,
            8.367610670654102
          ],
          [
            -70.88820856331029,
            8.368412139952552
          ],
          [
            -70.89194342290233,
            8.364256483752738
          ],
          [
            -70.89331104762678,
            8.3523155925509
          ],
          [
            -70.90230631320736,
            8.34936978006519
          ],
          [
            -70.90667242285,
            8.34458288986686
          ],
          [
            -70.9073561888858,
            8.33016967080727
          ],
          [
            -70.90976004776014,
            8.32571409285896
          ],
          [
            -70.91116884513029,
            8.315061936631313
          ],
          [
            -70.90642109519194,
            8.311060561225071
          ],
          [
            -70.9063706726024,
            8.30015359320643
          ],
          [
            -70.91068464168568,
            8.288385561724205
          ],
          [
            -70.90599234447545,
            8.276263577474198
          ],
          [
            -70.90977478269568,
            8.272098217861307
          ],
          [
            -70.92020559476688,
            8.272656686451937
          ],
          [
            -70.92436029825804,
            8.269515624092142
          ],
          [
            -70.9285569539135,
            8.269339514937089
          ],
          [
            -70.93184798573269,
            8.265368343094325
          ],
          [
            -70.9373781260186,
            8.262645295904498
          ],
          [
            -70.93982618846285,
            8.255957389893918
          ],
          [
            -70.9523867507491,
            8.251173827111089
          ],
          [
            -70.96403759528192,
            8.25055748295629
          ],
          [
            -70.96632668849294,
            8.253580170609734
          ],
          [
            -70.96551467350942,
            8.259022373950803
          ],
          [
            -70.96805823599988,
            8.265289452527593
          ],
          [
            -70.9775374230351,
            8.273653186785706
          ],
          [
            -70.98472747027171,
            8.27139345183701
          ],
          [
            -70.9925044858373,
            8.272068373571212
          ],
          [
            -71.00197723516082,
            8.263150858800612
          ],
          [
            -71.01061004834389,
            8.250298764565994
          ],
          [
            -71.01512123562028,
            8.247391014533623
          ],
          [
            -71.02539926692229,
            8.248173514828286
          ],
          [
            -71.03000231364904,
            8.251790124145185
          ],
          [
            -71.03505936103039,
            8.252433326834868
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-06",
    "properties": {
      "id": "ZS-06",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Cojedes-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Cojedes-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        8.7698,
        -68.6947
      ],
      "superficieKm2": 33.26,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -68.63606051843325,
            8.79506711181316
          ],
          [
            -68.64141674906625,
            8.791999290518985
          ],
          [
            -68.64036970221244,
            8.782775697237765
          ],
          [
            -68.64267779652057,
            8.778135696410788
          ],
          [
            -68.64815070287388,
            8.775803759227513
          ],
          [
            -68.6494832498636,
            8.777540774625168
          ],
          [
            -68.65369501543316,
            8.77830218089739
          ],
          [
            -68.65588417159063,
            8.776232009185263
          ],
          [
            -68.65514648384509,
            8.772924540631601
          ],
          [
            -68.65983415600154,
            8.770925743525606
          ],
          [
            -68.66080974948882,
            8.768950759288252
          ],
          [
            -68.66387932742457,
            8.76975975970635
          ],
          [
            -68.66899529615351,
            8.765262509101126
          ],
          [
            -68.67339743710113,
            8.76802268104023
          ],
          [
            -68.67522965581534,
            8.765619384124038
          ],
          [
            -68.67986973395764,
            8.765690743694154
          ],
          [
            -68.68669853073176,
            8.762653655690105
          ],
          [
            -68.68785051532474,
            8.75730560885053
          ],
          [
            -68.69014057783612,
            8.755442577458352
          ],
          [
            -68.68944335859558,
            8.749565530446135
          ],
          [
            -68.69296503120239,
            8.745115874339142
          ],
          [
            -68.69777165590122,
            8.742236671192376
          ],
          [
            -68.71226298373107,
            8.743592874257061
          ],
          [
            -68.71768826493725,
            8.737977265062643
          ],
          [
            -68.72316118754745,
            8.736906452246368
          ],
          [
            -68.72851512475607,
            8.7391669210535
          ],
          [
            -68.7270160468325,
            8.74309307717135
          ],
          [
            -68.72803926504345,
            8.745472545659558
          ],
          [
            -68.73370254668525,
            8.744996608067455
          ],
          [
            -68.73501819565345,
            8.738993537890787
          ],
          [
            -68.73720905949901,
            8.74660176386865
          ],
          [
            -68.74358616869644,
            8.742485217000807
          ],
          [
            -68.74311029402358,
            8.746887263826995
          ],
          [
            -68.74522807496818,
            8.74800560737874
          ],
          [
            -68.74713169998824,
            8.747077591999853
          ],
          [
            -68.74879730928204,
            8.73951082638975
          ],
          [
            -68.7510103092972,
            8.744293576629339
          ],
          [
            -68.76326480966057,
            8.734442435949598
          ],
          [
            -68.77199768450146,
            8.736655295266111
          ],
          [
            -68.78917618467197,
            8.730228091506229
          ],
          [
            -68.72642334064358,
            8.7618697167006
          ],
          [
            -68.7208383247392,
            8.770310591967934
          ],
          [
            -68.72110007486435,
            8.771904842101845
          ],
          [
            -68.7247407628397,
            8.772285529355992
          ],
          [
            -68.72550224675226,
            8.777544185842997
          ],
          [
            -68.71879196572733,
            8.775236138453728
          ],
          [
            -68.71569859036947,
            8.777734607442051
          ],
          [
            -68.71991038757824,
            8.781589342247361
          ],
          [
            -68.7205053092956,
            8.786871795081895
          ],
          [
            -68.71753088739261,
            8.786562482974833
          ],
          [
            -68.71258141839667,
            8.778686419754688
          ],
          [
            -68.7111299188511,
            8.780352076661869
          ],
          [
            -68.71141549686399,
            8.784896888671621
          ],
          [
            -68.70815554379104,
            8.78542038908762
          ],
          [
            -68.70851243397549,
            8.779043372922628
          ],
          [
            -68.70508587172546,
            8.773594388618209
          ],
          [
            -68.69966055920075,
            8.774784170026843
          ],
          [
            -68.69706688791943,
            8.777496794801705
          ],
          [
            -68.69685270032397,
            8.773189935507485
          ],
          [
            -68.69525841861459,
            8.771952607461493
          ],
          [
            -68.68811984091973,
            8.773832451280716
          ],
          [
            -68.68535963719991,
            8.779400451049133
          ],
          [
            -68.68019607503538,
            8.781898951439807
          ],
          [
            -68.6771502469642,
            8.778329747979381
          ],
          [
            -68.67710269964917,
            8.783302873370214
          ],
          [
            -68.68148104360813,
            8.786467545306248
          ],
          [
            -68.68010093440226,
            8.788894623327698
          ],
          [
            -68.66722768467194,
            8.786443857973069
          ],
          [
            -68.66649004365742,
            8.788371232473358
          ],
          [
            -68.67020212213481,
            8.790298591983285
          ],
          [
            -68.66911455952199,
            8.794838326762887
          ],
          [
            -68.65968460659393,
            8.790536607662295
          ],
          [
            -68.65908974707004,
            8.793082670183598
          ],
          [
            -68.65128494961648,
            8.801077779340124
          ],
          [
            -68.64919095041164,
            8.799316982785502
          ],
          [
            -68.64533612163615,
            8.800601920407683
          ],
          [
            -68.64264723081905,
            8.797675185299564
          ],
          [
            -68.6411243559779,
            8.799435998542815
          ],
          [
            -68.63848307471207,
            8.799221873378245
          ],
          [
            -68.63606051843325,
            8.79506711181316
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-07",
    "properties": {
      "id": "ZS-07",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Cojedes-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Cojedes-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        8.8298,
        -68.5753
      ],
      "superficieKm2": 7.1,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -68.59883055412044,
            8.819589431489371
          ],
          [
            -68.59527099638686,
            8.820542326508965
          ],
          [
            -68.59400988738057,
            8.824968185663439
          ],
          [
            -68.59041682486558,
            8.828822966997082
          ],
          [
            -68.58848940302636,
            8.827799794798851
          ],
          [
            -68.58808485634765,
            8.823445357846998
          ],
          [
            -68.58672851259838,
            8.822707716746743
          ],
          [
            -68.58418249715345,
            8.833510592069548
          ],
          [
            -68.58173160614359,
            8.836484951437189
          ],
          [
            -68.56957223104162,
            8.837627201539435
          ],
          [
            -68.56124385635407,
            8.833367982954917
          ],
          [
            -68.55429566888517,
            8.838721857842382
          ],
          [
            -68.55051223146336,
            8.839816451722132
          ],
          [
            -68.55904497609097,
            8.844499513088133
          ],
          [
            -68.54855928031182,
            8.84083852549385
          ],
          [
            -68.54833081195179,
            8.837069431403723
          ],
          [
            -68.55358476502677,
            8.831187306417139
          ],
          [
            -68.57208790527164,
            8.82062227487667
          ],
          [
            -68.58613659352348,
            8.816167790889628
          ],
          [
            -68.59578796842588,
            8.817538306662618
          ],
          [
            -68.59883055412044,
            8.819589431489371
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-08",
    "properties": {
      "id": "ZS-08",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Cojedes-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Cojedes-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        8.8467,
        -68.5642
      ],
      "superficieKm2": 0.2,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -68.55904497609097,
            8.844499513088133
          ],
          [
            -68.56615115576602,
            8.84571871275988
          ],
          [
            -68.56741647756938,
            8.849762720877413
          ],
          [
            -68.55904497609097,
            8.844499513088133
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-09",
    "properties": {
      "id": "ZS-09",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Cojedes-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Cojedes-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        8.8511,
        -68.5682
      ],
      "superficieKm2": 0.04,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -68.56741647756938,
            8.849762720877413
          ],
          [
            -68.5693635622332,
            8.851691197220033
          ],
          [
            -68.56793584285586,
            8.851929149884025
          ],
          [
            -68.56741647756938,
            8.849762720877413
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-10",
    "properties": {
      "id": "ZS-10",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Cojedes-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Cojedes-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        8.8523,
        -68.5739
      ],
      "superficieKm2": 0.26,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -68.56964325669855,
            8.851162663352834
          ],
          [
            -68.57150512400771,
            8.849525853068876
          ],
          [
            -68.57281387444975,
            8.852000509678456
          ],
          [
            -68.57728739036044,
            8.852381196747965
          ],
          [
            -68.57831742720617,
            8.856615802498931
          ],
          [
            -68.56964325669855,
            8.851162663352834
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-11",
    "properties": {
      "id": "ZS-11",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Anzoátegui-Guárico",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Anzoátegui-Guárico",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Anzoátegui-Guárico",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.61,
        -65.6168
      ],
      "superficieKm2": 76.29,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -65.50035279029262,
            9.55922921913574
          ],
          [
            -65.64588467231403,
            9.559457738226271
          ],
          [
            -65.64728757793301,
            9.633224675780642
          ],
          [
            -65.69230876961126,
            9.687921770035723
          ],
          [
            -65.59823272062386,
            9.61012964812849
          ],
          [
            -65.50035279029262,
            9.55922921913574
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-12",
    "properties": {
      "id": "ZS-12",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.5825,
        -69.4868
      ],
      "superficieKm2": 187.52,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.62279488493485,
            9.556121686944216
          ],
          [
            -69.62499559436748,
            9.557419650361743
          ],
          [
            -69.6066970942943,
            9.567484978737397
          ],
          [
            -69.597750093756,
            9.56857960346678
          ],
          [
            -69.58856518815091,
            9.578287962981326
          ],
          [
            -69.56986212493361,
            9.578478447770035
          ],
          [
            -69.55898771872874,
            9.58285679120951
          ],
          [
            -69.55748862561839,
            9.585331447636822
          ],
          [
            -69.56096278157337,
            9.591518088041004
          ],
          [
            -69.56022514126174,
            9.593754791355208
          ],
          [
            -69.55513296948301,
            9.596657791018371
          ],
          [
            -69.55084985936313,
            9.602202041462805
          ],
          [
            -69.53861915647535,
            9.609768869374534
          ],
          [
            -69.53098089128336,
            9.611886666336543
          ],
          [
            -69.52510343786818,
            9.609197884908468
          ],
          [
            -69.51077886001093,
            9.631660306959153
          ],
          [
            -69.47953564131166,
            9.626782588133953
          ],
          [
            -69.46680525004548,
            9.635896088136962
          ],
          [
            -69.45973806271695,
            9.636419619604084
          ],
          [
            -69.45471729716064,
            9.642106619315154
          ],
          [
            -69.44599889051247,
            9.640991291481885
          ],
          [
            -69.43873201632293,
            9.642537463633897
          ],
          [
            -69.42852745341425,
            9.639909135032866
          ],
          [
            -69.4173334060313,
            9.643650806592682
          ],
          [
            -69.40187204724778,
            9.654473744539821
          ],
          [
            -69.39717182829892,
            9.663812306950502
          ],
          [
            -69.3926261718215,
            9.664461713009265
          ],
          [
            -69.38724560939622,
            9.668357963491175
          ],
          [
            -69.3810920629084,
            9.682736869360996
          ],
          [
            -69.37214466374317,
            9.691564124600625
          ],
          [
            -69.37248582999331,
            9.682119633995853
          ],
          [
            -69.3669414709338,
            9.676194758925087
          ],
          [
            -69.36501403343918,
            9.671578571408542
          ],
          [
            -69.37032026746613,
            9.655897743260583
          ],
          [
            -69.37012986108977,
            9.650615290355839
          ],
          [
            -69.3756741112656,
            9.643429212747728
          ],
          [
            -69.37287798656573,
            9.637318446319615
          ],
          [
            -69.37641172035002,
            9.636243165702536
          ],
          [
            -69.37988578339528,
            9.631864883780965
          ],
          [
            -69.39399633012206,
            9.625202243548022
          ],
          [
            -69.39787490849884,
            9.617683056473728
          ],
          [
            -69.39609022070968,
            9.610092509412691
          ],
          [
            -69.3856010644361,
            9.604744024762983
          ],
          [
            -69.38398304885706,
            9.599653571940065
          ],
          [
            -69.38598062717962,
            9.593221165570245
          ],
          [
            -69.42038861154343,
            9.598479572000207
          ],
          [
            -69.42205022021332,
            9.601083587119001
          ],
          [
            -69.4411728771367,
            9.58930185332726
          ],
          [
            -69.44197081418407,
            9.583060384160417
          ],
          [
            -69.43978161166015,
            9.579395993448571
          ],
          [
            -69.44085239216408,
            9.575826758897717
          ],
          [
            -69.43967242417649,
            9.56520988376866
          ],
          [
            -69.44118145523447,
            9.563290853172306
          ],
          [
            -69.43937237713935,
            9.560951852719006
          ],
          [
            -69.4416644393511,
            9.560531821842307
          ],
          [
            -69.44106140812062,
            9.557713805568648
          ],
          [
            -69.44385504922326,
            9.549502540474972
          ],
          [
            -69.45161962701975,
            9.547700634182469
          ],
          [
            -69.45434390795626,
            9.54940583706819
          ],
          [
            -69.46045928320056,
            9.546383852820536
          ],
          [
            -69.4701915485767,
            9.548477743295821
          ],
          [
            -69.47387979864399,
            9.546336180666646
          ],
          [
            -69.47744909585114,
            9.546502712625422
          ],
          [
            -69.47911473601634,
            9.54379008693171
          ],
          [
            -69.48180362660521,
            9.5457650407058
          ],
          [
            -69.49177383039847,
            9.544456259526552
          ],
          [
            -69.49308257988844,
            9.54671675921714
          ],
          [
            -69.49624736175583,
            9.547145040401611
          ],
          [
            -69.49691362688809,
            9.549524524511536
          ],
          [
            -69.5000070327743,
            9.55045250939951
          ],
          [
            -69.50180404848147,
            9.555559368866824
          ],
          [
            -69.50355504880466,
            9.548843290541983
          ],
          [
            -69.50545612697655,
            9.549762415022975
          ],
          [
            -69.5083353304121,
            9.54502722740613
          ],
          [
            -69.50731211134068,
            9.541101087465687
          ],
          [
            -69.51278503280894,
            9.542290774976188
          ],
          [
            -69.51905940852639,
            9.537991086949857
          ],
          [
            -69.52120851734247,
            9.539625712238198
          ],
          [
            -69.52549167363118,
            9.539197368589726
          ],
          [
            -69.52913265788517,
            9.535112993651966
          ],
          [
            -69.53541428344317,
            9.537321462369706
          ],
          [
            -69.54060161153015,
            9.53299079051176
          ],
          [
            -69.54281459620098,
            9.534585008856448
          ],
          [
            -69.54624111141526,
            9.534037712449969
          ],
          [
            -69.55404595542717,
            9.536298181093516
          ],
          [
            -69.56072992361024,
            9.534029712578564
          ],
          [
            -69.56147003322674,
            9.529302430840398
          ],
          [
            -69.56457931417587,
            9.524715774876045
          ],
          [
            -69.57205887745755,
            9.521735602676163
          ],
          [
            -69.57505711178995,
            9.525994852611436
          ],
          [
            -69.57788873627258,
            9.524924071784746
          ],
          [
            -69.57907851781106,
            9.527541493303165
          ],
          [
            -69.58045862663712,
            9.526637290748
          ],
          [
            -69.58193395514138,
            9.528302914899966
          ],
          [
            -69.59925693980752,
            9.532871415068495
          ],
          [
            -69.60232654907915,
            9.536107477427011
          ],
          [
            -69.60332601784825,
            9.545125711963973
          ],
          [
            -69.61079528362616,
            9.553089024338616
          ],
          [
            -69.61712734618295,
            9.556618525047767
          ],
          [
            -69.62279488493485,
            9.556121686944216
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-13",
    "properties": {
      "id": "ZS-13",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Mérida-Trujillo",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Mérida-Trujillo",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Mérida-Trujillo",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.0474,
        -70.7306
      ],
      "superficieKm2": 0.87,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -70.72448968877325,
            9.037969546352276
          ],
          [
            -70.73679151160582,
            9.048766722987063
          ],
          [
            -70.73044011002106,
            9.055608374673538
          ],
          [
            -70.72448968877325,
            9.037969546352276
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-14",
    "properties": {
      "id": "ZS-14",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Mérida-Trujillo",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Mérida-Trujillo",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Mérida-Trujillo",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.0655,
        -70.7686
      ],
      "superficieKm2": 10.53,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -70.74520761015957,
            9.056466812134548
          ],
          [
            -70.74947364466512,
            9.0563842849095
          ],
          [
            -70.75169628560383,
            9.051714870736957
          ],
          [
            -70.7598773864074,
            9.04851669172861
          ],
          [
            -70.76404088655303,
            9.048447816127712
          ],
          [
            -70.76518343354425,
            9.051140871289023
          ],
          [
            -70.77562946485129,
            9.05356864467699
          ],
          [
            -70.77928151932817,
            9.057934644297369
          ],
          [
            -70.78254895689635,
            9.065701152307158
          ],
          [
            -70.78460664451592,
            9.074643839865148
          ],
          [
            -70.78332131665425,
            9.078336613354049
          ],
          [
            -70.7922436216147,
            9.082691776527906
          ],
          [
            -70.7827386568859,
            9.084969468858304
          ],
          [
            -70.77078965691176,
            9.081614749921021
          ],
          [
            -70.7626526257319,
            9.07615974987047
          ],
          [
            -70.76097645411322,
            9.073325578148317
          ],
          [
            -70.75588700123038,
            9.072198046280777
          ],
          [
            -70.74520761015957,
            9.056466812134548
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-15",
    "properties": {
      "id": "ZS-15",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Portuguesa-Trujillo",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Portuguesa-Trujillo",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Portuguesa-Trujillo",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.3943,
        -70.0354
      ],
      "superficieKm2": 2.91,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -70.03886385974869,
            9.376815587991452
          ],
          [
            -70.03681757854848,
            9.393709916225307
          ],
          [
            -70.03872123474625,
            9.398706822314782
          ],
          [
            -70.03822157907854,
            9.404988650798817
          ],
          [
            -70.03527101683638,
            9.413602400222981
          ],
          [
            -70.02720530781669,
            9.390691636858223
          ],
          [
            -70.03296340191069,
            9.381359551058981
          ],
          [
            -70.03886385974869,
            9.376815587991452
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-16",
    "properties": {
      "id": "ZS-16",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Trujillo",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Trujillo",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Trujillo",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.4312,
        -70.0494
      ],
      "superficieKm2": 7.51,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -70.02144820271752,
            9.428271418572622
          ],
          [
            -70.03561343955147,
            9.413496118556504
          ],
          [
            -70.04279839332584,
            9.427926540611683
          ],
          [
            -70.05144489322907,
            9.427775774177652
          ],
          [
            -70.06204453336902,
            9.430352274862663
          ],
          [
            -70.07481181535806,
            9.427252134407912
          ],
          [
            -70.07795279905311,
            9.428656008799111
          ],
          [
            -70.07956127639122,
            9.431439730877226
          ],
          [
            -70.07524552705553,
            9.429849035169422
          ],
          [
            -70.06395536275052,
            9.432435363398735
          ],
          [
            -70.05296358959525,
            9.431192051031923
          ],
          [
            -70.04401109713622,
            9.441338167933608
          ],
          [
            -70.02370053449735,
            9.439962949880217
          ],
          [
            -70.01823622172084,
            9.44131986383041
          ],
          [
            -70.01772276864796,
            9.436222386739702
          ],
          [
            -70.02144820271752,
            9.428271418572622
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-17",
    "properties": {
      "id": "ZS-17",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Mérida-Trujillo",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Mérida-Trujillo",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Mérida-Trujillo",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.1396,
        -70.8586
      ],
      "superficieKm2": 35.77,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -70.8009099496557,
            9.08041554079341
          ],
          [
            -70.8068995121064,
            9.073216300463185
          ],
          [
            -70.80934408190994,
            9.073442253385585
          ],
          [
            -70.82935262101824,
            9.086363152545355
          ],
          [
            -70.84455036298306,
            9.088197534993842
          ],
          [
            -70.8460140588698,
            9.089745097300693
          ],
          [
            -70.86246750366233,
            9.130446465050975
          ],
          [
            -70.86727451216086,
            9.137882699310204
          ],
          [
            -70.86694587151446,
            9.143511262051453
          ],
          [
            -70.86910284792559,
            9.145092995981342
          ],
          [
            -70.8671718634518,
            9.147660777564244
          ],
          [
            -70.86752110570865,
            9.15070101907671
          ],
          [
            -70.88009314498244,
            9.14930407439281
          ],
          [
            -70.89102181700261,
            9.154110871136298
          ],
          [
            -70.89340480116417,
            9.160971949277595
          ],
          [
            -70.8906726678965,
            9.165429613405239
          ],
          [
            -70.89800643411773,
            9.177323488229888
          ],
          [
            -70.89673282443253,
            9.181247058704088
          ],
          [
            -70.89821578257346,
            9.18879953077604
          ],
          [
            -70.8967073140715,
            9.187702812188432
          ],
          [
            -70.89406979785615,
            9.176433921557598
          ],
          [
            -70.88331443846336,
            9.170919421791638
          ],
          [
            -70.88012890704535,
            9.165062359639979
          ],
          [
            -70.87571029768812,
            9.162664750193775
          ],
          [
            -70.86796920410018,
            9.162493530667666
          ],
          [
            -70.86214459518173,
            9.165211734557479
          ],
          [
            -70.84373951669151,
            9.163704765593423
          ],
          [
            -70.84095362595998,
            9.161375640376624
          ],
          [
            -70.8398575010779,
            9.155941015630951
          ],
          [
            -70.8252429546181,
            9.140139515052411
          ],
          [
            -70.8351075639512,
            9.117578827772945
          ],
          [
            -70.8282113140028,
            9.10849067185756
          ],
          [
            -70.82706948573393,
            9.09812374935971
          ],
          [
            -70.80684745424357,
            9.085876671495175
          ],
          [
            -70.8009099496557,
            9.08041554079341
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-18",
    "properties": {
      "id": "ZS-18",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Mérida-Zulia",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Mérida-Zulia",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Mérida-Zulia",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        8.9093,
        -71.7777
      ],
      "superficieKm2": 2964.03,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -72.01714254891183,
            8.816267436699972
          ],
          [
            -72.01252629941735,
            8.821240577471384
          ],
          [
            -72.00857629895914,
            8.822382749316109
          ],
          [
            -72.005435298839,
            8.819503592847715
          ],
          [
            -72.00436450184283,
            8.815886796414755
          ],
          [
            -71.9998671901004,
            8.813459749372816
          ],
          [
            -72.00041451760885,
            8.818694609183668
          ],
          [
            -71.99615518979435,
            8.823834296028684
          ],
          [
            -71.99836815871578,
            8.825190592951035
          ],
          [
            -71.99351393921543,
            8.826451734343054
          ],
          [
            -71.986148017947,
            8.836007780478273
          ],
          [
            -71.98078481421751,
            8.839001155624896
          ],
          [
            -71.97454853357061,
            8.834386436981578
          ],
          [
            -71.96868648609333,
            8.842992358661835
          ],
          [
            -71.97167993998275,
            8.849727390536863
          ],
          [
            -71.97317668996614,
            8.860453562027
          ],
          [
            -71.97853993944193,
            8.866440234184347
          ],
          [
            -71.98839323670082,
            8.866939077874548
          ],
          [
            -71.99261418952564,
            8.876483374911253
          ],
          [
            -71.99306217436505,
            8.887020655656789
          ],
          [
            -71.98965948624053,
            8.890542296115393
          ],
          [
            -71.9890884243483,
            8.895777155725613
          ],
          [
            -71.98463868970377,
            8.89327871843368
          ],
          [
            -71.98306823655001,
            8.897502311770662
          ],
          [
            -71.9795941267225,
            8.897787859285629
          ],
          [
            -71.97683395500457,
            8.908876265034108
          ],
          [
            -71.97897554864065,
            8.912742905687736
          ],
          [
            -71.97438312684706,
            8.924521358629333
          ],
          [
            -71.97738132985495,
            8.925258983853322
          ],
          [
            -71.9729316582489,
            8.93061282805114
          ],
          [
            -71.97571573693456,
            8.936775655976994
          ],
          [
            -71.97131362667756,
            8.940939781038113
          ],
          [
            -71.97183715854747,
            8.945829609379887
          ],
          [
            -71.98002275241346,
            8.952706265094275
          ],
          [
            -71.98542436169156,
            8.966102687185304
          ],
          [
            -71.98392528324042,
            8.967768343079914
          ],
          [
            -71.97759573617716,
            8.967316280893234
          ],
          [
            -71.97519242384897,
            8.968601202962384
          ],
          [
            -71.97535903373026,
            8.975834827699233
          ],
          [
            -71.97393133059123,
            8.97880918734753
          ],
          [
            -71.97533529932848,
            8.985923811794724
          ],
          [
            -71.97124253330912,
            8.988386609407693
          ],
          [
            -71.97060009623478,
            8.994025983888577
          ],
          [
            -71.96686425240325,
            8.996667218331252
          ],
          [
            -71.96684048689545,
            9.000759937453118
          ],
          [
            -71.96522242443503,
            9.002211421772056
          ],
          [
            -71.96048715871042,
            9.002401811939567
          ],
          [
            -71.95389586107989,
            8.999832000096655
          ],
          [
            -71.95211117403295,
            8.992848233721622
          ],
          [
            -71.94354486186973,
            8.987661031143118
          ],
          [
            -71.93826233050376,
            8.988779406233567
          ],
          [
            -71.93145692382554,
            8.99563234362657
          ],
          [
            -71.92158189268258,
            8.997226671711116
          ],
          [
            -71.92072532991118,
            9.004079561949505
          ],
          [
            -71.92381872109591,
            9.007387031222574
          ],
          [
            -71.92341423605966,
            9.013169156234287
          ],
          [
            -71.91508597052986,
            9.025054718215353
          ],
          [
            -71.9195832985817,
            9.0296708742666
          ],
          [
            -71.91737039258939,
            9.038855671343669
          ],
          [
            -71.91967856467548,
            9.0459227183861
          ],
          [
            -71.92389033029411,
            9.047540749560584
          ],
          [
            -71.9254132517096,
            9.051466874573862
          ],
          [
            -71.92543711167527,
            9.060520796424925
          ],
          [
            -71.92301001784956,
            9.064684906173142
          ],
          [
            -71.92396184548949,
            9.067706827489097
          ],
          [
            -71.92182034618448,
            9.07881901549626
          ],
          [
            -71.9172516737703,
            9.081091436841309
          ],
          [
            -71.91343900196892,
            9.086344609016624
          ],
          [
            -71.89847728312252,
            9.091680249539518
          ],
          [
            -71.89057736136313,
            9.100074984523243
          ],
          [
            -71.8819991269904,
            9.101531390047887
          ],
          [
            -71.87405295544103,
            9.109524655853427
          ],
          [
            -71.86810275231959,
            9.107135140111545
          ],
          [
            -71.85458704925203,
            9.108182203078853
          ],
          [
            -71.85180300187024,
            9.106564156097535
          ],
          [
            -71.8409523611982,
            9.106706999810534
          ],
          [
            -71.83728790869056,
            9.107563624391407
          ],
          [
            -71.83290959548161,
            9.111561187297479
          ],
          [
            -71.82148790802071,
            9.115249437070903
          ],
          [
            -71.81551531450485,
            9.116177468618458
          ],
          [
            -71.8127074552447,
            9.112965186835588
          ],
          [
            -71.80713943926455,
            9.124743656377317
          ],
          [
            -71.81085154840441,
            9.13324537451872
          ],
          [
            -71.80525967424256,
            9.133821374959597
          ],
          [
            -71.79790698612997,
            9.143493999959311
          ],
          [
            -71.80959048673385,
            9.15010889033718
          ],
          [
            -71.80596568945504,
            9.153319155728145
          ],
          [
            -71.80271373591343,
            9.161387655973808
          ],
          [
            -71.80416529916857,
            9.171060249801844
          ],
          [
            -71.80166682968112,
            9.17327317214471
          ],
          [
            -71.79191075178221,
            9.16994196875178
          ],
          [
            -71.78830820479038,
            9.171346327806143
          ],
          [
            -71.77860922113202,
            9.171226968984982
          ],
          [
            -71.77853783011838,
            9.17332090579521
          ],
          [
            -71.7833206897829,
            9.175034109096647
          ],
          [
            -71.78077464227643,
            9.181411124678187
          ],
          [
            -71.77796679885094,
            9.179935859044004
          ],
          [
            -71.77207747112911,
            9.181149421932961
          ],
          [
            -71.76454626780205,
            9.178008562016064
          ],
          [
            -71.76564087735568,
            9.184028640436313
          ],
          [
            -71.76873426719392,
            9.185265952635085
          ],
          [
            -71.76045054901472,
            9.19963120334139
          ],
          [
            -71.75757265829225,
            9.198626375274525
          ],
          [
            -71.75176565804462,
            9.191641359000025
          ],
          [
            -71.7507888352552,
            9.18791316687333
          ],
          [
            -71.75368616117638,
            9.192382293269363
          ],
          [
            -71.75543387036272,
            9.190824974836136
          ],
          [
            -71.75846569835814,
            9.196880114086927
          ],
          [
            -71.75619961023729,
            9.188084768555667
          ],
          [
            -71.73831698037517,
            9.160240227108721
          ],
          [
            -71.73997005469052,
            9.149029617013646
          ],
          [
            -71.74705907489141,
            9.140976647316359
          ],
          [
            -71.74926092015487,
            9.131740917861702
          ],
          [
            -71.75084433833186,
            9.130282547963244
          ],
          [
            -71.75358818374765,
            9.131470179488646
          ],
          [
            -71.75910975792821,
            9.128448904534132
          ],
          [
            -71.75598123634528,
            9.129045535071118
          ],
          [
            -71.75564213722181,
            9.126876589639815
          ],
          [
            -71.75756686631532,
            9.126711508404302
          ],
          [
            -71.75515913547356,
            9.12466378561572
          ],
          [
            -71.75867351527735,
            9.121360026060072
          ],
          [
            -71.76210095121844,
            9.122270717668163
          ],
          [
            -71.75912968934516,
            9.120544337540702
          ],
          [
            -71.76063582643783,
            9.118851241157133
          ],
          [
            -71.75936638225672,
            9.11661022480462
          ],
          [
            -71.76029264444608,
            9.113605987009207
          ],
          [
            -71.76257998141529,
            9.111728296941193
          ],
          [
            -71.75902673026965,
            9.110536596085128
          ],
          [
            -71.75232994674073,
            9.117088563567066
          ],
          [
            -71.74836625236522,
            9.111788918213529
          ],
          [
            -71.74536167281713,
            9.103839003743003
          ],
          [
            -71.73901754857499,
            9.097578941426232
          ],
          [
            -71.7296628513017,
            9.092834846781289
          ],
          [
            -71.72090503763174,
            9.09108162112281
          ],
          [
            -71.71788789160922,
            9.091367300581872
          ],
          [
            -71.71316311536653,
            9.094865549975166
          ],
          [
            -71.7120350978917,
            9.092549615098044
          ],
          [
            -71.71488794390602,
            9.089427808378622
          ],
          [
            -71.71781125546478,
            9.081381537469035
          ],
          [
            -71.72006796241739,
            9.081161547440809
          ],
          [
            -71.7162074142101,
            9.07907704859583
          ],
          [
            -71.70773888020341,
            9.069624107801607
          ],
          [
            -71.70631488301262,
            9.065895060869893
          ],
          [
            -71.69836110326341,
            9.05898522589952
          ],
          [
            -71.68838129224856,
            9.053945889888304
          ],
          [
            -71.67694707960818,
            9.051781082386473
          ],
          [
            -71.66924461277446,
            9.053290392737296
          ],
          [
            -71.65864037745354,
            9.045069014601996
          ],
          [
            -71.62224446004296,
            9.038736895863481
          ],
          [
            -71.59223600575571,
            9.035682095143244
          ],
          [
            -71.54480502804934,
            9.037224259097277
          ],
          [
            -71.52606357020838,
            9.039415766420598
          ],
          [
            -71.5248015044307,
            9.038427125060428
          ],
          [
            -71.52348264209994,
            9.04006815679675
          ],
          [
            -71.49487236045103,
            9.045142925628598
          ],
          [
            -71.49625550351706,
            9.043553200736394
          ],
          [
            -71.49514972957364,
            9.043705412099357
          ],
          [
            -71.49180093806332,
            9.046267439832844
          ],
          [
            -71.4465814364007,
            9.05841359780581
          ],
          [
            -71.38263519716766,
            9.079788961805276
          ],
          [
            -71.36322803338135,
            9.081706806871727
          ],
          [
            -71.33673199520773,
            9.091380017514082
          ],
          [
            -71.28699537282289,
            9.124739245221514
          ],
          [
            -71.28325113635434,
            9.129335877444825
          ],
          [
            -71.27387889381949,
            9.128089816766032
          ],
          [
            -71.26470507700924,
            9.130836821931435
          ],
          [
            -71.25608459627767,
            9.13678487603397
          ],
          [
            -71.25440200972702,
            9.14031355030157
          ],
          [
            -71.25284078920453,
            9.140755615776406
          ],
          [
            -71.2522527955773,
            9.139372598230691
          ],
          [
            -71.23816999222159,
            9.148805014764841
          ],
          [
            -71.23066264060938,
            9.155629399010712
          ],
          [
            -71.22468296454888,
            9.163997249283613
          ],
          [
            -71.22008119390891,
            9.163131759397803
          ],
          [
            -71.21709806851348,
            9.15851091504412
          ],
          [
            -71.21179022453,
            9.154571540241356
          ],
          [
            -71.20804069340797,
            9.145761634536953
          ],
          [
            -71.20344819361625,
            9.141716540532595
          ],
          [
            -71.20332916260189,
            9.135755947029141
          ],
          [
            -71.20095281841346,
            9.13451644656217
          ],
          [
            -71.19954566234317,
            9.128308196744863
          ],
          [
            -71.1975857877625,
            9.128089352699662
          ],
          [
            -71.19518244338167,
            9.12435360333041
          ],
          [
            -71.19264503718989,
            9.124584353183643
          ],
          [
            -71.19234766265967,
            9.12152497825532
          ],
          [
            -71.18807628764317,
            9.117719571638828
          ],
          [
            -71.17559403758959,
            9.116635446571731
          ],
          [
            -71.17377535016873,
            9.118362133929093
          ],
          [
            -71.17113591214512,
            9.115437478271113
          ],
          [
            -71.16794553722525,
            9.118838040444802
          ],
          [
            -71.16673194321345,
            9.11512607207633
          ],
          [
            -71.16611328770813,
            9.116958290447453
          ],
          [
            -71.16187772463098,
            9.11650619664606
          ],
          [
            -71.16014063111982,
            9.10991504061248
          ],
          [
            -71.15709484957544,
            9.112580102693626
          ],
          [
            -71.15347797457474,
            9.110390977525997
          ],
          [
            -71.15012278733025,
            9.10539410280056
          ],
          [
            -71.14767188094208,
            9.105798634186476
          ],
          [
            -71.14310316256565,
            9.098469852742085
          ],
          [
            -71.13777303733482,
            9.099849978125249
          ],
          [
            -71.13221875622875,
            9.09804757121434
          ],
          [
            -71.13018231805324,
            9.09377044633418
          ],
          [
            -71.12639884974229,
            9.094008415610332
          ],
          [
            -71.12268678681271,
            9.09177172763442
          ],
          [
            -71.1175469750705,
            9.085228197023293
          ],
          [
            -71.11095566267882,
            9.081801790406866
          ],
          [
            -71.10917097457313,
            9.07561516500837
          ],
          [
            -71.09757359965023,
            9.057490978130698
          ],
          [
            -71.09765391192151,
            9.049738384472004
          ],
          [
            -71.10043938084605,
            9.046286008808776
          ],
          [
            -71.09966800566797,
            9.043606852841727
          ],
          [
            -71.30863747510708,
            8.90016869673023
          ],
          [
            -71.30868916237809,
            8.905254789767284
          ],
          [
            -71.31289756822694,
            8.911735040047034
          ],
          [
            -71.3264522560031,
            8.919764321306914
          ],
          [
            -71.33071900652568,
            8.92086991502968
          ],
          [
            -71.34204650608878,
            8.919738415636289
          ],
          [
            -71.34269197469382,
            8.917285696773014
          ],
          [
            -71.34728759971777,
            8.914006821739052
          ],
          [
            -71.34966288140438,
            8.914290790462745
          ],
          [
            -71.3641728500806,
            8.925056759363885
          ],
          [
            -71.3660059753447,
            8.929342508621078
          ],
          [
            -71.37021438082434,
            8.932466446650018
          ],
          [
            -71.36933656898682,
            8.933602414936193
          ],
          [
            -71.3711696937451,
            8.936726383569857
          ],
          [
            -71.37822197481401,
            8.937856977657242
          ],
          [
            -71.64390925687182,
            8.73425041536583
          ],
          [
            -71.70161453761648,
            8.677316321393707
          ],
          [
            -71.86504153821225,
            8.676123071159097
          ],
          [
            -71.8697652874902,
            8.673012571122356
          ],
          [
            -71.86964628792994,
            8.668777102795305
          ],
          [
            -71.87300141266742,
            8.666754540072748
          ],
          [
            -71.87257306933517,
            8.664922321452545
          ],
          [
            -71.88625528815706,
            8.656832039555686
          ],
          [
            -71.88803991259007,
            8.654523914813796
          ],
          [
            -71.88758778784984,
            8.652192039600562
          ],
          [
            -71.88915828822532,
            8.652239602228986
          ],
          [
            -71.88862569415852,
            8.650160133719531
          ],
          [
            -71.90720972585989,
            8.643045383581073
          ],
          [
            -71.91111706938447,
            8.64006072709753
          ],
          [
            -71.9115880376343,
            8.637310821157875
          ],
          [
            -71.91499072551231,
            8.633908133314266
          ],
          [
            -71.91441963918062,
            8.632575164790325
          ],
          [
            -71.92367597526922,
            8.629553172348544
          ],
          [
            -71.92386631950464,
            8.627364055835818
          ],
          [
            -71.92655518658755,
            8.627173680533494
          ],
          [
            -71.92764973308807,
            8.62265266470957
          ],
          [
            -71.92872051406025,
            8.621415328850818
          ],
          [
            -71.9302910062498,
            8.622557469433847
          ],
          [
            -71.93336056886358,
            8.617441579320426
          ],
          [
            -71.93590665509295,
            8.616870485141849
          ],
          [
            -71.93595425645829,
            8.618536117751107
          ],
          [
            -71.93783407692456,
            8.617917446436257
          ],
          [
            -71.93869070943198,
            8.619273743204175
          ],
          [
            -71.93921419427686,
            8.616894258278421
          ],
          [
            -71.94237895195312,
            8.615276195823784
          ],
          [
            -71.94233136609336,
            8.616965626338166
          ],
          [
            -71.94347353810089,
            8.616061415183232
          ],
          [
            -71.94944616251357,
            8.618940547844574
          ],
          [
            -71.95037415531752,
            8.615728259090107
          ],
          [
            -71.95808383486751,
            8.618773938324479
          ],
          [
            -71.95922599880492,
            8.617251071067079
          ],
          [
            -71.96017782727574,
            8.620035055318006
          ],
          [
            -71.95863115538536,
            8.623271157301705
          ],
          [
            -71.96143900705873,
            8.625674407299318
          ],
          [
            -71.96315225651263,
            8.623770813681402
          ],
          [
            -71.96284292067809,
            8.62624547731695
          ],
          [
            -71.96519866304327,
            8.626768954335125
          ],
          [
            -71.96293811620707,
            8.628291828867534
          ],
          [
            -71.96412789723334,
            8.630837859992564
          ],
          [
            -71.96189114683742,
            8.631646907309543
          ],
          [
            -71.96091552985979,
            8.629981274509552
          ],
          [
            -71.9607489834509,
            8.632336953863282
          ],
          [
            -71.95717968601849,
            8.632432156774152
          ],
          [
            -71.95884538148117,
            8.636382086921687
          ],
          [
            -71.96279539715786,
            8.637381446625238
          ],
          [
            -71.96417550652114,
            8.635239906894055
          ],
          [
            -71.96618298318494,
            8.639166235201273
          ],
          [
            -71.96819692028679,
            8.638285617877871
          ],
          [
            -71.97079062371341,
            8.640879227584673
          ],
          [
            -71.97083823299285,
            8.644269993163032
          ],
          [
            -71.9722421551045,
            8.64412720388947
          ],
          [
            -71.97474067095726,
            8.648243695884116
          ],
          [
            -71.97490722560623,
            8.646387704380578
          ],
          [
            -71.97623728805445,
            8.647993235215504
          ],
          [
            -71.97916657732203,
            8.645721423076738
          ],
          [
            -71.97954731111174,
            8.646958750715244
          ],
          [
            -71.98630294371347,
            8.645635164929566
          ],
          [
            -71.98468487347014,
            8.646991477678556
          ],
          [
            -71.98501803005763,
            8.64991823497567
          ],
          [
            -71.98801624925677,
            8.654391641421425
          ],
          [
            -71.98556535801045,
            8.657009079371011
          ],
          [
            -71.9829954601991,
            8.656366634132565
          ],
          [
            -71.98230542049292,
            8.659626524775058
          ],
          [
            -71.98409007735246,
            8.66172045431162
          ],
          [
            -71.98232923313729,
            8.662148774655714
          ],
          [
            -71.98328105377692,
            8.664789985011497
          ],
          [
            -71.98142502966641,
            8.664599641854279
          ],
          [
            -71.98318588173284,
            8.66612250063034
          ],
          [
            -71.98244824143487,
            8.667942805643932
          ],
          [
            -71.98430427245661,
            8.669108735325059
          ],
          [
            -71.98330488937347,
            8.671250274239624
          ],
          [
            -71.98492296715425,
            8.671178876350584
          ],
          [
            -71.98523231873017,
            8.674200813321015
          ],
          [
            -71.98280520990473,
            8.674712415252355
          ],
          [
            -71.98201998285596,
            8.678210250536509
          ],
          [
            -71.98666005386079,
            8.677210852239872
          ],
          [
            -71.9852085534686,
            8.6800900321509
          ],
          [
            -71.98901581172174,
            8.681993587179893
          ],
          [
            -71.9919426156202,
            8.681779423050617
          ],
          [
            -71.99313237388972,
            8.679423727402083
          ],
          [
            -71.99893840818274,
            8.679066764920037
          ],
          [
            -72.00150831502248,
            8.68408746781739
          ],
          [
            -72.0013417832128,
            8.690631030804182
          ],
          [
            -72.00398308072782,
            8.693581561707994
          ],
          [
            -72.00255539302671,
            8.697626687249562
          ],
          [
            -72.00348340874996,
            8.700577233564541
          ],
          [
            -72.00222229858893,
            8.704146468312874
          ],
          [
            -71.9995334236666,
            8.70431304583946
          ],
          [
            -71.99655904915215,
            8.707358796724712
          ],
          [
            -71.99755843980842,
            8.708834062222119
          ],
          [
            -71.99579762684125,
            8.713735796434328
          ],
          [
            -71.99720156422948,
            8.715020702800548
          ],
          [
            -71.99332295504506,
            8.718589952095215
          ],
          [
            -71.99536936196611,
            8.719970030735094
          ],
          [
            -71.99327539298356,
            8.721707077942126
          ],
          [
            -71.99177628338319,
            8.720874264625312
          ],
          [
            -71.99061033014239,
            8.72277784330849
          ],
          [
            -71.99339439265347,
            8.726846733421633
          ],
          [
            -71.99210945559301,
            8.72853618674883
          ],
          [
            -71.99420343985254,
            8.729821092811472
          ],
          [
            -71.99496490869986,
            8.733390296006563
          ],
          [
            -71.99693992363433,
            8.734127936791053
          ],
          [
            -71.9977489397999,
            8.731439108406782
          ],
          [
            -72.0003426272109,
            8.731224952799135
          ],
          [
            -71.99762998664511,
            8.734270702295248
          ],
          [
            -71.99736826759217,
            8.737625764690426
          ],
          [
            -72.00188937682809,
            8.742170546047042
          ],
          [
            -72.00355503298223,
            8.739267577655754
          ],
          [
            -72.00538726740838,
            8.739862421681218
          ],
          [
            -72.00736229869578,
            8.743717171562585
          ],
          [
            -72.0041499709884,
            8.75035593661347
          ],
          [
            -72.00267464294474,
            8.747786108494097
          ],
          [
            -72.00060447051763,
            8.748428577483802
          ],
          [
            -72.00188945567662,
            8.756042906002003
          ],
          [
            -72.00638675212217,
            8.754686577327494
          ],
          [
            -72.00450693964392,
            8.758041656127334
          ],
          [
            -72.00136597097736,
            8.757280234037037
          ],
          [
            -72.0002000018494,
            8.759088655845432
          ],
          [
            -72.00361373688591,
            8.75916187458094
          ],
          [
            -72.0045545488025,
            8.760778062286247
          ],
          [
            -72.00329343980428,
            8.765418046218644
          ],
          [
            -72.0061964556751,
            8.766845718540184
          ],
          [
            -72.00695792406117,
            8.769796265149695
          ],
          [
            -72.00529226769376,
            8.77186642155421
          ],
          [
            -72.00739145565936,
            8.772834812043193
          ],
          [
            -72.00555403373835,
            8.775328561826147
          ],
          [
            -72.00902814273576,
            8.77378188994005
          ],
          [
            -72.01209773685832,
            8.77768420261094
          ],
          [
            -72.00786225192125,
            8.788296702262297
          ],
          [
            -72.005649299029,
            8.789153328004513
          ],
          [
            -72.00415020568856,
            8.792829639756318
          ],
          [
            -71.9971306426143,
            8.797469671274134
          ],
          [
            -72.00035211156019,
            8.798299483472679
          ],
          [
            -71.99931984592426,
            8.802038249656686
          ],
          [
            -72.00203250244007,
            8.804584280384594
          ],
          [
            -72.00293675234174,
            8.808700781191567
          ],
          [
            -72.0088380019301,
            8.81374523412715
          ],
          [
            -72.01040845567692,
            8.810128421143848
          ],
          [
            -72.01136029859043,
            8.815172905542267
          ],
          [
            -72.01607176815963,
            8.814530421171712
          ],
          [
            -72.01714254891183,
            8.816267436699972
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-19",
    "properties": {
      "id": "ZS-19",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Cojedes-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Cojedes-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.11,
        -68.6594
      ],
      "superficieKm2": 281.95,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -68.57831742720617,
            8.856615802498931
          ],
          [
            -68.66855403570867,
            8.913327170539663
          ],
          [
            -68.74765133616772,
            9.264200339190953
          ],
          [
            -68.74469348426226,
            9.263396853975813
          ],
          [
            -68.74298018698113,
            9.259232775513132
          ],
          [
            -68.74055309355019,
            9.26146950968851
          ],
          [
            -68.73798318682076,
            9.259256603796143
          ],
          [
            -68.73165367103712,
            9.262611728498715
          ],
          [
            -68.72782262454696,
            9.261659962934218
          ],
          [
            -68.72608556166666,
            9.26018469730041
          ],
          [
            -68.72589517128576,
            9.257662431874044
          ],
          [
            -68.7277512030617,
            9.256639244425479
          ],
          [
            -68.72599034325357,
            9.255996806817981
          ],
          [
            -68.7267993743131,
            9.254807056983273
          ],
          [
            -68.72372978107309,
            9.254926056580025
          ],
          [
            -68.72208790551453,
            9.252760728141029
          ],
          [
            -68.7211361093676,
            9.255735088265233
          ],
          [
            -68.71887554674261,
            9.253902900420625
          ],
          [
            -68.72063637422067,
            9.251927916430267
          ],
          [
            -68.71744781220652,
            9.250880978666084
          ],
          [
            -68.71768576495988,
            9.252427634667677
          ],
          [
            -68.71523484354968,
            9.251452056627137
          ],
          [
            -68.71256979670537,
            9.253141509938908
          ],
          [
            -68.71371195249755,
            9.251095150573697
          ],
          [
            -68.71280771871312,
            9.248406337585909
          ],
          [
            -68.70988090611505,
            9.25102379136525
          ],
          [
            -68.70847698440095,
            9.250286165611865
          ],
          [
            -68.70850079661626,
            9.251904213018145
          ],
          [
            -68.7053597807853,
            9.247383212791574
          ],
          [
            -68.70326581166236,
            9.24845399455316
          ],
          [
            -68.70709690621231,
            9.256877338006854
          ],
          [
            -68.70293273372823,
            9.256258713330887
          ],
          [
            -68.70209987474507,
            9.252261181587288
          ],
          [
            -68.69860195280785,
            9.251452181926005
          ],
          [
            -68.70169532796626,
            9.250238619064156
          ],
          [
            -68.70005345304068,
            9.248858541136777
          ],
          [
            -68.69907785862759,
            9.249976900655394
          ],
          [
            -68.69881607781338,
            9.24636008781821
          ],
          [
            -68.69741215607034,
            9.2464076819554
          ],
          [
            -68.6978404837261,
            9.247930556335952
          ],
          [
            -68.69293865601456,
            9.248144743907748
          ],
          [
            -68.69472328041324,
            9.245884212753186
          ],
          [
            -68.69281965549082,
            9.243647525474875
          ],
          [
            -68.69374764001753,
            9.240649368734163
          ],
          [
            -68.69210576555628,
            9.239316869052185
          ],
          [
            -68.68687078124243,
            9.236390134683994
          ],
          [
            -68.68629973418464,
            9.242434025741096
          ],
          [
            -68.68365845302407,
            9.242172306255217
          ],
          [
            -68.67889937451595,
            9.23769891560698
          ],
          [
            -68.68046982745834,
            9.232773369104747
          ],
          [
            -68.67866138976348,
            9.234581791450115
          ],
          [
            -68.67554421816521,
            9.233701399988572
          ],
          [
            -68.67211765581614,
            9.228918666324336
          ],
          [
            -68.66773934328398,
            9.230798494254998
          ],
          [
            -68.66762034349503,
            9.227015119060114
          ],
          [
            -68.66626399928315,
            9.226610603587671
          ],
          [
            -68.66904804655742,
            9.225230493952015
          ],
          [
            -68.66757271868532,
            9.224112150042654
          ],
          [
            -68.66583568723397,
            9.22530190041869
          ],
          [
            -68.66676945275066,
            9.222160728905429
          ],
          [
            -68.66459829674572,
            9.220542931387847
          ],
          [
            -68.66262329636407,
            9.221946853548523
          ],
          [
            -68.66267093693827,
            9.228514228655763
          ],
          [
            -68.65791189024814,
            9.231298243959838
          ],
          [
            -68.65372389014087,
            9.22653930647508
          ],
          [
            -68.65134439042917,
            9.229656447580973
          ],
          [
            -68.64875068677752,
            9.227990837690982
          ],
          [
            -68.64794162421657,
            9.223921916062663
          ],
          [
            -68.6423021084459,
            9.218925056401515
          ],
          [
            -68.64480059362423,
            9.215926884391337
          ],
          [
            -68.64056503120169,
            9.216260041165546
          ],
          [
            -68.64135029615481,
            9.218591931601395
          ],
          [
            -68.6397560148118,
            9.219067837479143
          ],
          [
            -68.64120754654266,
            9.221233150422275
          ],
          [
            -68.63894699950175,
            9.222922603451417
          ],
          [
            -68.63473521857946,
            9.22032899403178
          ],
          [
            -68.63290301519241,
            9.223446135119636
          ],
          [
            -68.63149904611467,
            9.216973946948702
          ],
          [
            -68.62745385923138,
            9.218806181782421
          ],
          [
            -68.62214749905915,
            9.217021603630531
          ],
          [
            -68.6204262965398,
            9.214107244426545
          ],
          [
            -68.6594917959932,
            8.986409962255943
          ],
          [
            -68.65652660933301,
            8.987011759346553
          ],
          [
            -68.65816840572018,
            8.975804384434925
          ],
          [
            -68.6541231868339,
            8.97175929101359
          ],
          [
            -68.65721651473035,
            8.963954571669923
          ],
          [
            -68.65283814019061,
            8.95912424409618
          ],
          [
            -68.64791251484723,
            8.957982134975948
          ],
          [
            -68.64543776521774,
            8.952461744292975
          ],
          [
            -68.64065492134164,
            8.952699728388835
          ],
          [
            -68.63089881164126,
            8.946489352931529
          ],
          [
            -68.6301373431534,
            8.943158071580728
          ],
          [
            -68.63166020248241,
            8.938375306166852
          ],
          [
            -68.63013732771645,
            8.940231306544302
          ],
          [
            -68.62904271790359,
            8.938494305943912
          ],
          [
            -68.62716290578257,
            8.938613290784064
          ],
          [
            -68.62606829622632,
            8.935710322108577
          ],
          [
            -68.62399810913743,
            8.934829931477346
          ],
          [
            -68.62359354593922,
            8.930118556811184
          ],
          [
            -68.62028599950355,
            8.929024025403532
          ],
          [
            -68.61904860900401,
            8.924431634391734
          ],
          [
            -68.62095221844991,
            8.921409665492396
          ],
          [
            -68.61976240581798,
            8.91524682195913
          ],
          [
            -68.62121389015897,
            8.911748978281617
          ],
          [
            -68.61826326543664,
            8.909631259870958
          ],
          [
            -68.61964337455902,
            8.90696622832188
          ],
          [
            -68.61578851486904,
            8.904681946756979
          ],
          [
            -68.61714481205418,
            8.900470259214387
          ],
          [
            -68.61574087409298,
            8.89775764979662
          ],
          [
            -68.61300442176535,
            8.897495930925098
          ],
          [
            -68.61014899988179,
            8.899970603348807
          ],
          [
            -68.60743631167986,
            8.89511647811199
          ],
          [
            -68.6023203121356,
            8.893260525156158
          ],
          [
            -68.60186817093279,
            8.889500947046862
          ],
          [
            -68.60460462425304,
            8.888620525050008
          ],
          [
            -68.6048901555733,
            8.886431384798948
          ],
          [
            -68.60353381216686,
            8.885955509218016
          ],
          [
            -68.60129707784537,
            8.888144650511704
          ],
          [
            -68.59951240597083,
            8.884837181490514
          ],
          [
            -68.59515787468636,
            8.884932384339022
          ],
          [
            -68.59653793703136,
            8.87629485292791
          ],
          [
            -68.59418220293894,
            8.876128305923485
          ],
          [
            -68.59154095239533,
            8.878912321764462
          ],
          [
            -68.5882571868533,
            8.87753224382783
          ],
          [
            -68.58785265549608,
            8.874415119022084
          ],
          [
            -68.58480685889744,
            8.873986837202615
          ],
          [
            -68.58632970280108,
            8.867776384322402
          ],
          [
            -68.58304593739551,
            8.864683071987752
          ],
          [
            -68.57926249957715,
            8.865944227913609
          ],
          [
            -68.57914349946105,
            8.863136446726955
          ],
          [
            -68.57621667107604,
            8.862636774639665
          ],
          [
            -68.57831742720617,
            8.856615802498931
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-20",
    "properties": {
      "id": "ZS-20",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Cojedes-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Cojedes-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.2647,
        -68.7478
      ],
      "superficieKm2": 0,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -68.74765133616772,
            9.264200339190953
          ],
          [
            -68.74797723420872,
            9.264705557018255
          ],
          [
            -68.74787208565989,
            9.2651787264216
          ],
          [
            -68.74765133616772,
            9.264200339190953
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-21",
    "properties": {
      "id": "ZS-21",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Cojedes-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Cojedes-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.267,
        -68.7478
      ],
      "superficieKm2": 0.02,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -68.74787208565989,
            9.2651787264216
          ],
          [
            -68.74859143886236,
            9.268366950380475
          ],
          [
            -68.74707303103503,
            9.267322994023957
          ],
          [
            -68.74787208565989,
            9.2651787264216
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-22",
    "properties": {
      "id": "ZS-22",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Cojedes-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Cojedes-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Cojedes-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.269,
        -68.749
      ],
      "superficieKm2": 0,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -68.74859143886236,
            9.268366950380475
          ],
          [
            -68.74956376510917,
            9.269334150662004
          ],
          [
            -68.74880377807716,
            9.269308045786
          ],
          [
            -68.74859143886236,
            9.268366950380475
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-23",
    "properties": {
      "id": "ZS-23",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.4032,
        -69.6745
      ],
      "superficieKm2": 25.98,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.73452420377326,
            9.417814665947375
          ],
          [
            -69.72479192242056,
            9.412936790954626
          ],
          [
            -69.71796262521801,
            9.406559822503194
          ],
          [
            -69.70456589072631,
            9.404537353424752
          ],
          [
            -69.69419115713052,
            9.406893119357642
          ],
          [
            -69.68626731335421,
            9.402633900548903
          ],
          [
            -69.67865282817992,
            9.401325228767844
          ],
          [
            -69.67194256298941,
            9.401872556662981
          ],
          [
            -69.67008654720156,
            9.404061697148272
          ],
          [
            -69.66604134457504,
            9.401682228569323
          ],
          [
            -69.66213892252487,
            9.403585853562682
          ],
          [
            -69.66014014129968,
            9.406607791250963
          ],
          [
            -69.65259409458183,
            9.399034900818762
          ],
          [
            -69.6544090788603,
            9.399606619751594
          ],
          [
            -69.65440543840208,
            9.401325400308387
          ],
          [
            -69.65126453158638,
            9.407702431578851
          ],
          [
            -69.64848048515468,
            9.407678650755306
          ],
          [
            -69.64893259426078,
            9.409534650971572
          ],
          [
            -69.64186546909578,
            9.418362572268157
          ],
          [
            -69.64027126609538,
            9.429403385397306
          ],
          [
            -69.63234756265241,
            9.447820619282526
          ],
          [
            -69.62710004896891,
            9.427149915636136
          ],
          [
            -69.62832865853467,
            9.413046837275454
          ],
          [
            -69.63273929875756,
            9.395954852502777
          ],
          [
            -69.63519018947753,
            9.392338024737704
          ],
          [
            -69.65331504854377,
            9.38887380592392
          ],
          [
            -69.6602721583957,
            9.385018321434396
          ],
          [
            -69.67205890870726,
            9.391048539869354
          ],
          [
            -69.6785461583536,
            9.391779446294498
          ],
          [
            -69.6907896895135,
            9.388033274688084
          ],
          [
            -69.70239361193985,
            9.381363321003711
          ],
          [
            -69.70623114258751,
            9.380815086920288
          ],
          [
            -69.71171334572617,
            9.383281977972718
          ],
          [
            -69.72066764249817,
            9.391230946631886
          ],
          [
            -69.73126662674335,
            9.40466199298191
          ],
          [
            -69.73400775177831,
            9.410235430475202
          ],
          [
            -69.73452420377326,
            9.417814665947375
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-24",
    "properties": {
      "id": "ZS-24",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Aragua-Carabobo",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Aragua-Carabobo",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Aragua-Carabobo",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.0559,
        -67.6826
      ],
      "superficieKm2": 9.36,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -67.6969316141291,
            10.021538988939538
          ],
          [
            -67.69575545821965,
            10.024813403696932
          ],
          [
            -67.68666030901248,
            10.033761239409484
          ],
          [
            -67.68301137226369,
            10.039974286355301
          ],
          [
            -67.68521846561991,
            10.044635317407558
          ],
          [
            -67.68637057471904,
            10.054739411204608
          ],
          [
            -67.69148429376446,
            10.060162637368997
          ],
          [
            -67.69089516855476,
            10.065170450591113
          ],
          [
            -67.68776526266424,
            10.068447637535042
          ],
          [
            -67.67966426229162,
            10.068116301694701
          ],
          [
            -67.67763907467894,
            10.076548575473511
          ],
          [
            -67.66972221571828,
            10.080083559491428
          ],
          [
            -67.66337359531555,
            10.085912326074524
          ],
          [
            -67.661633921662,
            10.058868759109709
          ],
          [
            -67.6969316141291,
            10.021538988939538
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-25",
    "properties": {
      "id": "ZS-25",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Aragua-Guárico",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Aragua-Guárico",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Aragua-Guárico",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.3596,
        -66.7837
      ],
      "superficieKm2": 351.9,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -66.58992880004085,
            9.393375125657904
          ],
          [
            -66.59024335558757,
            9.389053215065898
          ],
          [
            -66.59566648069222,
            9.38570913735307
          ],
          [
            -66.59350040222637,
            9.383374129446725
          ],
          [
            -66.59591144933178,
            9.381044090135436
          ],
          [
            -66.59492438603453,
            9.376987051221839
          ],
          [
            -66.59823351140508,
            9.380040058711568
          ],
          [
            -66.6043806368248,
            9.374363949594564
          ],
          [
            -66.60992079248453,
            9.373650902449889
          ],
          [
            -66.60281955033626,
            9.369159910797121
          ],
          [
            -66.60946767533031,
            9.361005777540042
          ],
          [
            -66.60808462131826,
            9.35903076987298
          ],
          [
            -66.60887061283239,
            9.355024723114155
          ],
          [
            -66.61139670718366,
            9.35825673908593
          ],
          [
            -66.61597681641048,
            9.35479166060241
          ],
          [
            -66.61958891745999,
            9.355033637000652
          ],
          [
            -66.62019489414658,
            9.350010582303934
          ],
          [
            -66.62675907369963,
            9.349178519819148
          ],
          [
            -66.63110616026852,
            9.343746433905523
          ],
          [
            -66.63447825405517,
            9.34345040322469
          ],
          [
            -66.63441923005927,
            9.34141738689687
          ],
          [
            -66.63177115221933,
            9.340996402647123
          ],
          [
            -66.63285415200973,
            9.336438348435435
          ],
          [
            -66.63845731648999,
            9.337114309109495
          ],
          [
            -66.63882030095787,
            9.334243277358762
          ],
          [
            -66.6355091988013,
            9.333643301485848
          ],
          [
            -66.63671621454856,
            9.33119226173883
          ],
          [
            -66.63299609730302,
            9.329304270185911
          ],
          [
            -66.63335808988825,
            9.327690254583194
          ],
          [
            -66.63968423770437,
            9.32315016021217
          ],
          [
            -66.64179130082098,
            9.323570144932436
          ],
          [
            -66.63962620668092,
            9.319801129423755
          ],
          [
            -66.6419752619544,
            9.318367089933618
          ],
          [
            -66.64125620672341,
            9.313642051602304
          ],
          [
            -66.64432531625994,
            9.316395051502619
          ],
          [
            -66.64583035570004,
            9.315559035308624
          ],
          [
            -66.64420727680398,
            9.312388012403645
          ],
          [
            -66.64715736343508,
            9.312150988314327
          ],
          [
            -66.64650028456813,
            9.305093925724798
          ],
          [
            -66.6522234255121,
            9.301329840341108
          ],
          [
            -66.65670545701194,
            9.289462691683891
          ],
          [
            -66.66182359731096,
            9.288628636970932
          ],
          [
            -66.66435562879818,
            9.28360656644787
          ],
          [
            -66.66887075335045,
            9.283070527359724
          ],
          [
            -66.67157079250906,
            9.27823245784143
          ],
          [
            -66.67904998031553,
            9.274943371813029
          ],
          [
            -66.68025599599198,
            9.272731332681172
          ],
          [
            -66.67923295657043,
            9.271714332117181
          ],
          [
            -66.68116000363051,
            9.270399309103587
          ],
          [
            -66.68031895701728,
            9.267707285596053
          ],
          [
            -66.68375203463172,
            9.265437238331248
          ],
          [
            -66.68303100351037,
            9.2634032234077
          ],
          [
            -66.692365222092,
            9.257308089871932
          ],
          [
            -66.69507626181029,
            9.253182027268307
          ],
          [
            -66.70324246446206,
            9.249480926175893
          ],
          [
            -66.71256178518988,
            9.255568910551604
          ],
          [
            -66.72053210533178,
            9.267523965597855
          ],
          [
            -66.72728433985684,
            9.272667964843954
          ],
          [
            -66.73054048015794,
            9.279005004396446
          ],
          [
            -66.75411533193223,
            9.301308042907342
          ],
          [
            -66.75592338632795,
            9.301897035486183
          ],
          [
            -66.75990148060171,
            9.2993989810717
          ],
          [
            -66.76621066048816,
            9.299886934015188
          ],
          [
            -66.76910272299548,
            9.296678878908516
          ],
          [
            -66.77977201940193,
            9.296418793243406
          ],
          [
            -66.78320812846842,
            9.29795378545794
          ],
          [
            -66.80991500424595,
            9.311474707079464
          ],
          [
            -66.81898731650554,
            9.318963715421674
          ],
          [
            -66.83122472247018,
            9.325933683985589
          ],
          [
            -66.83343480855396,
            9.328670699456543
          ],
          [
            -66.83596895727793,
            9.338270769641118
          ],
          [
            -66.83940508245301,
            9.341701778078594
          ],
          [
            -66.84754333161003,
            9.343819738792353
          ],
          [
            -66.86056265213021,
            9.337625574899004
          ],
          [
            -66.8932875819147,
            9.337458316993022
          ],
          [
            -66.98260589465093,
            9.435931605646285
          ],
          [
            -66.98881301148056,
            9.428506489002645
          ],
          [
            -66.99767012881394,
            9.411471246768585
          ],
          [
            -67.00377932475321,
            9.413590223253287
          ],
          [
            -67.0062493632282,
            9.410324168217569
          ],
          [
            -67.00619039505546,
            9.413822200032165
          ],
          [
            -67.00986648807749,
            9.413162168425805
          ],
          [
            -67.01378561324132,
            9.414755152609855
          ],
          [
            -67.01039055899612,
            9.419572230730513
          ],
          [
            -67.0112935900741,
            9.420463231014052
          ],
          [
            -67.01352363686938,
            9.41873919176924
          ],
          [
            -67.01551370758106,
            9.420750200035167
          ],
          [
            -67.01334366060912,
            9.422296231104712
          ],
          [
            -67.01400770716207,
            9.426030261773418
          ],
          [
            -67.01087362126609,
            9.426452293639688
          ],
          [
            -67.00875661355467,
            9.433291379863665
          ],
          [
            -67.01333773838037,
            9.432689332717924
          ],
          [
            -67.01611185529576,
            9.437367363695339
          ],
          [
            -67.0151988403202,
            9.43826837901106
          ],
          [
            -67.01255574627154,
            9.436366379812032
          ],
          [
            -67.00918068354224,
            9.439990442056908
          ],
          [
            -67.01221480085336,
            9.444031457285382
          ],
          [
            -67.01107080094178,
            9.448480512310468
          ],
          [
            -67.004438582162,
            9.44487852810834
          ],
          [
            -67.00325760565869,
            9.451744605761737
          ],
          [
            -67.00156853537545,
            9.448546590500548
          ],
          [
            -66.99843444972385,
            9.449204614053821
          ],
          [
            -67.00318062548048,
            9.458384340868479
          ],
          [
            -66.94574000261395,
            9.457852242012013
          ],
          [
            -66.94280690908599,
            9.456534241182505
          ],
          [
            -66.92333828394911,
            9.446773304155338
          ],
          [
            -66.9220072210117,
            9.443866272686316
          ],
          [
            -66.92307922133048,
            9.440427241762114
          ],
          [
            -66.92602425265864,
            9.433284148084798
          ],
          [
            -66.92896231528711,
            9.430636085644718
          ],
          [
            -66.9276471589351,
            9.415564960470364
          ],
          [
            -66.92205294036775,
            9.408167929152746
          ],
          [
            -66.91138956546281,
            9.399453897519948
          ],
          [
            -66.90498440865245,
            9.399990960379155
          ],
          [
            -66.90151928435111,
            9.396292960063834
          ],
          [
            -66.89860009660144,
            9.383867866751338
          ],
          [
            -66.853763846742,
            9.38709624122546
          ],
          [
            -66.707789689906,
            9.38939039776957
          ],
          [
            -66.66909459654067,
            9.38970271052505
          ],
          [
            -66.65121906461754,
            9.386815835374668
          ],
          [
            -66.58992880004085,
            9.393375125657904
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-26",
    "properties": {
      "id": "ZS-26",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Portuguesa",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Portuguesa",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Portuguesa",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.7572,
        -69.0073
      ],
      "superficieKm2": 2.25,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.02660704804734,
            9.752271462794331
          ],
          [
            -69.01224107987592,
            9.760972727716897
          ],
          [
            -69.00668493859672,
            9.761632774661424
          ],
          [
            -69.00016573622314,
            9.759172805959352
          ],
          [
            -68.99726667310686,
            9.760253837688577
          ],
          [
            -68.99327450047282,
            9.767187151023489
          ],
          [
            -68.99563960895792,
            9.758392713207853
          ],
          [
            -69.00238768763347,
            9.750787525845675
          ],
          [
            -69.00985940626333,
            9.750525713092333
          ],
          [
            -69.01411878132488,
            9.753880760064103
          ],
          [
            -69.0223043435543,
            9.753880697704533
          ],
          [
            -69.02660704804734,
            9.752271462794331
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-27",
    "properties": {
      "id": "ZS-27",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Anzoátegui-Guárico",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Anzoátegui-Guárico",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Anzoátegui-Guárico",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.9293,
        -65.7342
      ],
      "superficieKm2": 15.69,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -65.7179627203354,
            9.91190889808803
          ],
          [
            -65.72266770303783,
            9.914631050676315
          ],
          [
            -65.7225412345638,
            9.917540770070573
          ],
          [
            -65.72386960908555,
            9.918236550938097
          ],
          [
            -65.73158682787592,
            9.916908144377446
          ],
          [
            -65.73871385932108,
            9.91855814433298
          ],
          [
            -65.73879801609911,
            9.920829863126446
          ],
          [
            -65.7413282654862,
            9.921841926251222
          ],
          [
            -65.74423807783703,
            9.927218551114944
          ],
          [
            -65.74923529687862,
            9.928799863427855
          ],
          [
            -65.75081673492264,
            9.933164457473204
          ],
          [
            -65.74588282822108,
            9.937529051108571
          ],
          [
            -65.74790701577868,
            9.939616457477353
          ],
          [
            -65.74620810937192,
            9.941649707210944
          ],
          [
            -65.74846585926426,
            9.944026988562797
          ],
          [
            -65.74484376534178,
            9.94798605059301
          ],
          [
            -65.74568789118204,
            9.957211144570165
          ],
          [
            -65.71562108871035,
            9.962163456322509
          ],
          [
            -65.716367782816,
            9.92433005485404
          ],
          [
            -65.71271959537715,
            9.91602499201902
          ],
          [
            -65.71295659541363,
            9.914549960655739
          ],
          [
            -65.7179627203354,
            9.91190889808803
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-28",
    "properties": {
      "id": "ZS-28",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Anzoátegui-Monagas",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Anzoátegui-Monagas",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Anzoátegui-Monagas",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.9448,
        -64.0503
      ],
      "superficieKm2": 7.18,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -64.03682070070738,
            9.928903441655882
          ],
          [
            -64.05607296110833,
            9.922709038169042
          ],
          [
            -64.05681133621742,
            9.924431865881601
          ],
          [
            -64.05841119568007,
            9.93113860089084
          ],
          [
            -64.057057617534,
            9.941229506710705
          ],
          [
            -64.05404260196654,
            9.94239860085904
          ],
          [
            -64.05656541440658,
            9.945721194035851
          ],
          [
            -64.05428880532618,
            9.949597585302438
          ],
          [
            -64.05724232108959,
            9.953720069867419
          ],
          [
            -64.05322491490875,
            9.961678491265593
          ],
          [
            -64.05207388296039,
            9.970394694196903
          ],
          [
            -64.04852109082266,
            9.972198105795936
          ],
          [
            -64.04466895170535,
            9.958338582254896
          ],
          [
            -64.04407270203119,
            9.944032332212299
          ],
          [
            -64.0368796706554,
            9.938468863523516
          ],
          [
            -64.03882688941061,
            9.931673363278652
          ],
          [
            -64.03682070070738,
            9.928903441655882
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-29",
    "properties": {
      "id": "ZS-29",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Yaracuy",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Yaracuy",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.9378,
        -68.8968
      ],
      "superficieKm2": 202.46,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -68.95685616936005,
            9.885492359378869
          ],
          [
            -68.95599605466025,
            9.888614345277812
          ],
          [
            -68.95763793783294,
            9.889542337964553
          ],
          [
            -68.95742379744763,
            9.891541096036686
          ],
          [
            -68.95628162469433,
            9.892802236259989
          ],
          [
            -68.95373552368,
            9.891874251971037
          ],
          [
            -68.94873855522134,
            9.89677602550374
          ],
          [
            -68.94988078889922,
            9.904318986301837
          ],
          [
            -68.94697778914747,
            9.907245767459493
          ],
          [
            -68.94754889104082,
            9.909268322025076
          ],
          [
            -68.95625798493448,
            9.913146822221108
          ],
          [
            -68.956424594146,
            9.918238916057675
          ],
          [
            -68.96027945363886,
            9.922593345750682
          ],
          [
            -68.95982736694225,
            9.925948424197271
          ],
          [
            -68.95430692196739,
            9.933277275173102
          ],
          [
            -68.95421176534217,
            9.936822697724498
          ],
          [
            -68.95518740663626,
            9.940844017446459
          ],
          [
            -68.96051757849486,
            9.945912291222172
          ],
          [
            -68.95977994536116,
            9.948434549144883
          ],
          [
            -68.95690071878556,
            9.948934260161504
          ],
          [
            -68.95849500766309,
            9.949981220906798
          ],
          [
            -68.95837368806151,
            9.952270916110606
          ],
          [
            -68.95604418721273,
            9.962354548915727
          ],
          [
            -68.96165992997645,
            9.970278197235164
          ],
          [
            -68.95944700059698,
            9.973752251988016
          ],
          [
            -68.96118407073415,
            9.975703423667555
          ],
          [
            -68.96042266376385,
            9.981604549079913
          ],
          [
            -68.96168382790066,
            9.98384125207473
          ],
          [
            -68.96001821847597,
            9.992264642616881
          ],
          [
            -68.96461081242916,
            10.00642253347922
          ],
          [
            -68.96337350058072,
            10.012537821993456
          ],
          [
            -68.96457850126626,
            10.018646298684947
          ],
          [
            -68.92481192290731,
            10.039998509866317
          ],
          [
            -68.80619881398464,
            10.0082948687211
          ],
          [
            -68.80856434514028,
            10.007173119063756
          ],
          [
            -68.81132459491117,
            10.00810110285692
          ],
          [
            -68.81642450146086,
            10.00505650969096
          ],
          [
            -68.81515561070577,
            10.004484243552401
          ],
          [
            -68.81642645457526,
            10.00013546280964
          ],
          [
            -68.8131091731589,
            9.998368993545085
          ],
          [
            -68.81727334551228,
            9.997678916195314
          ],
          [
            -68.81677357927062,
            9.99073082244739
          ],
          [
            -68.82098528293676,
            9.979832743627727
          ],
          [
            -68.82470754782435,
            9.982370228606273
          ],
          [
            -68.82855215792605,
            9.980451368699946
          ],
          [
            -68.82819522041781,
            9.977358024943074
          ],
          [
            -68.83074131397916,
            9.978381197004378
          ],
          [
            -68.83352575099029,
            9.97630910293989
          ],
          [
            -68.83135995403381,
            9.973693618845108
          ],
          [
            -68.83343009534897,
            9.966388572267126
          ],
          [
            -68.8354526889936,
            9.966103024920578
          ],
          [
            -68.8387840483374,
            9.969600852890723
          ],
          [
            -68.84144911081937,
            9.967768618892332
          ],
          [
            -68.84011426730164,
            9.962417353346336
          ],
          [
            -68.84211529831681,
            9.957275087586941
          ],
          [
            -68.83940262608667,
            9.957370291097376
          ],
          [
            -68.83773693878055,
            9.954229369092173
          ],
          [
            -68.83952157940607,
            9.95163572787776
          ],
          [
            -68.83671367362074,
            9.943307556703939
          ],
          [
            -68.83782859534952,
            9.94011972850868
          ],
          [
            -68.83159756358823,
            9.927341259020203
          ],
          [
            -68.83371534506308,
            9.928150259678356
          ],
          [
            -68.8355475792734,
            9.926199071814857
          ],
          [
            -68.84309065715345,
            9.924628571719888
          ],
          [
            -68.8465326889983,
            9.919654463013808
          ],
          [
            -68.84589842325494,
            9.914515727762739
          ],
          [
            -68.84706439179817,
            9.913207009323695
          ],
          [
            -68.86167468862097,
            9.913777977787003
          ],
          [
            -68.86628412666637,
            9.905670181638206
          ],
          [
            -68.86978722016404,
            9.904230134051998
          ],
          [
            -68.87226425173596,
            9.900569087879976
          ],
          [
            -68.87498132938066,
            9.900629071594025
          ],
          [
            -68.87619034492953,
            9.898228040610244
          ],
          [
            -68.87806140721052,
            9.898648024688034
          ],
          [
            -68.88150547031746,
            9.89498796267169
          ],
          [
            -68.89539481369572,
            9.890125822099481
          ],
          [
            -68.90270692283087,
            9.877282634363645
          ],
          [
            -68.90620803254916,
            9.879083634713748
          ],
          [
            -68.90946911083759,
            9.878122603544483
          ],
          [
            -68.90940812665087,
            9.880343618842796
          ],
          [
            -68.91580731399726,
            9.881963587549608
          ],
          [
            -68.9143533604258,
            9.893726712119552
          ],
          [
            -68.92391248611428,
            9.890129134003898
          ],
          [
            -68.92612570420242,
            9.896727666091278
          ],
          [
            -68.92888573557723,
            9.895126009858968
          ],
          [
            -68.93388273589926,
            9.895411509333536
          ],
          [
            -68.93685712654865,
            9.892865431213018
          ],
          [
            -68.94121165728204,
            9.892817822087737
          ],
          [
            -68.94351976694796,
            9.888748884841785
          ],
          [
            -68.94744598604483,
            9.889534087292672
          ],
          [
            -68.95092007993311,
            9.88736872845393
          ],
          [
            -68.95099147057492,
            9.885584118599132
          ],
          [
            -68.95685616936005,
            9.885492359378869
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-30",
    "properties": {
      "id": "ZS-30",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Yaracuy",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Yaracuy",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.0272,
        -69.1622
      ],
      "superficieKm2": 6.68,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.15307785174389,
            10.004407150671422
          ],
          [
            -69.18486152494468,
            10.036414130006621
          ],
          [
            -69.17401789270545,
            10.039967509484072
          ],
          [
            -69.16069612628056,
            10.040458274833844
          ],
          [
            -69.16064700161317,
            10.034226837717481
          ],
          [
            -69.15174120483981,
            10.02237735321159
          ],
          [
            -69.15064271993943,
            10.012817165831258
          ],
          [
            -69.15307785174389,
            10.004407150671422
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-31",
    "properties": {
      "id": "ZS-31",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Trujillo",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Trujillo",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Trujillo",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.885,
        -70.5614
      ],
      "superficieKm2": 744.19,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -70.58923738051558,
            9.970194603944677
          ],
          [
            -70.590629355117,
            9.959276676495895
          ],
          [
            -70.58623419887017,
            9.953653653030603
          ],
          [
            -70.58321410551702,
            9.952155660991359
          ],
          [
            -70.57161280873139,
            9.953660754438863
          ],
          [
            -70.56744770677922,
            9.955996801947174
          ],
          [
            -70.5555553943846,
            9.956362887227549
          ],
          [
            -70.55223429306314,
            9.95426988704352
          ],
          [
            -70.55018220716316,
            9.949721863947934
          ],
          [
            -70.54468904301068,
            9.947569879797898
          ],
          [
            -70.53901380885101,
            9.93506280140505
          ],
          [
            -70.54348085564943,
            9.924226676274818
          ],
          [
            -70.54239478527879,
            9.918779629398085
          ],
          [
            -70.5340634721877,
            9.905256567329923
          ],
          [
            -70.52609419942407,
            9.897180543727023
          ],
          [
            -70.51854897292631,
            9.892874551308934
          ],
          [
            -70.51691888648858,
            9.887069512219762
          ],
          [
            -70.50514653491973,
            9.881509543600446
          ],
          [
            -70.50110242571256,
            9.881630566928447
          ],
          [
            -70.49844538625037,
            9.886361629167956
          ],
          [
            -70.49077922243096,
            9.892650738706651
          ],
          [
            -70.48419899548132,
            9.885231715259037
          ],
          [
            -70.48715702719095,
            9.87840662971044
          ],
          [
            -70.48594897213994,
            9.875174613972002
          ],
          [
            -70.47918777746052,
            9.873262637598287
          ],
          [
            -70.4715815425632,
            9.868478644913637
          ],
          [
            -70.46675240992462,
            9.868660676408055
          ],
          [
            -70.46065526916057,
            9.871297747206073
          ],
          [
            -70.45172009768132,
            9.881657895019313
          ],
          [
            -70.4421818082217,
            9.877412926530363
          ],
          [
            -70.43403260490253,
            9.879152996391067
          ],
          [
            -70.42527843378618,
            9.888436137807025
          ],
          [
            -70.42280341751386,
            9.896398223555343
          ],
          [
            -70.41761234711375,
            9.90633734805955
          ],
          [
            -70.41525829234841,
            9.907775379327715
          ],
          [
            -70.41157519098225,
            9.907418402684755
          ],
          [
            -70.40294291811561,
            9.9014374030851
          ],
          [
            -70.3986568162951,
            9.903654457270013
          ],
          [
            -70.383866409557,
            9.902524543914328
          ],
          [
            -70.3698000659748,
            9.907320683985363
          ],
          [
            -70.35760572216874,
            9.9050527468781
          ],
          [
            -70.35468457387601,
            9.89468866885372
          ],
          [
            -70.34332416728921,
            9.880494613716486
          ],
          [
            -70.34126904245106,
            9.869829528353714
          ],
          [
            -70.32108538654695,
            9.85324351198774
          ],
          [
            -70.31999730801904,
            9.846892465817813
          ],
          [
            -70.3242273628873,
            9.837423347921824
          ],
          [
            -70.32320028479428,
            9.829814285665051
          ],
          [
            -70.3308140972028,
            9.82264707510499
          ],
          [
            -70.33714933121627,
            9.827339650317803
          ],
          [
            -70.3524005339532,
            9.826554884421652
          ],
          [
            -70.39697779925142,
            9.807745462057449
          ],
          [
            -70.62424804948843,
            9.69737207211832
          ],
          [
            -70.63440495649725,
            9.694549040592438
          ],
          [
            -70.63947700344632,
            9.69818099338668
          ],
          [
            -70.64180897162572,
            9.703439634255647
          ],
          [
            -70.64913145656652,
            9.711314087317541
          ],
          [
            -70.65563409711578,
            9.714837274587351
          ],
          [
            -70.65929858146195,
            9.718858556203681
          ],
          [
            -70.6600124717238,
            9.722618133966963
          ],
          [
            -70.65772817492741,
            9.729161728245066
          ],
          [
            -70.6603218936048,
            9.734801087213736
          ],
          [
            -70.66554706588931,
            9.73664121200174
          ],
          [
            -70.68713929990719,
            9.758238805721467
          ],
          [
            -70.6869965807967,
            9.765567618942992
          ],
          [
            -70.68959572917574,
            9.772567543311014
          ],
          [
            -70.68721625540566,
            9.783560759879768
          ],
          [
            -70.687430473919,
            9.7945182595876
          ],
          [
            -70.68317122450044,
            9.803952947659761
          ],
          [
            -70.67089291139123,
            9.810651259348303
          ],
          [
            -70.6670885997635,
            9.820023635228663
          ],
          [
            -70.6674227865493,
            9.824210978943205
          ],
          [
            -70.67168219327674,
            9.832598634664508
          ],
          [
            -70.67274913081418,
            9.844547009926718
          ],
          [
            -70.68090125523794,
            9.855055510090367
          ],
          [
            -70.68205319305319,
            9.86232166567515
          ],
          [
            -70.68728819294279,
            9.870126322257986
          ],
          [
            -70.70050688058073,
            9.882854041281313
          ],
          [
            -70.69222984949705,
            9.890299041273188
          ],
          [
            -70.68963619269907,
            9.895462509552999
          ],
          [
            -70.69113541176107,
            9.913641759471874
          ],
          [
            -70.69494269266796,
            9.921363134800739
          ],
          [
            -70.6928249741629,
            9.929643760087993
          ],
          [
            -70.69518075533927,
            9.933355759798035
          ],
          [
            -70.69244431812106,
            9.939482915820005
          ],
          [
            -70.69480009921955,
            9.945265040737985
          ],
          [
            -70.68913688036676,
            9.952879447662713
          ],
          [
            -70.68249803689719,
            9.956662853352318
          ],
          [
            -70.68380681776489,
            9.964384259774734
          ],
          [
            -70.67911919287039,
            9.971332385025288
          ],
          [
            -70.68004728699599,
            9.98024354122197
          ],
          [
            -70.68371181790071,
            9.988785853585451
          ],
          [
            -70.6822841301409,
            9.994924916296817
          ],
          [
            -70.66505650557417,
            10.01522204154744
          ],
          [
            -70.6500180058016,
            10.027988072890329
          ],
          [
            -70.64440238035183,
            10.037886760074453
          ],
          [
            -70.63992891223862,
            10.040575603462878
          ],
          [
            -70.63250478676046,
            10.03738713487539
          ],
          [
            -70.62667488056995,
            10.029963166340972
          ],
          [
            -70.60968500577523,
            10.01776844765365
          ],
          [
            -70.60980388033015,
            10.004681322849555
          ],
          [
            -70.60387878711114,
            9.995924822065351
          ],
          [
            -70.59804897459009,
            9.994140260408331
          ],
          [
            -70.59420056810808,
            9.979029260312887
          ],
          [
            -70.58923738051558,
            9.970194603944677
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-32",
    "properties": {
      "id": "ZS-32",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Yaracuy",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Yaracuy",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.0583,
        -69.1958
      ],
      "superficieKm2": 3.46,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.18486152494468,
            10.036414130006621
          ],
          [
            -69.18940047043797,
            10.037955681159326
          ],
          [
            -69.19354670483905,
            10.04308308781232
          ],
          [
            -69.20820651168354,
            10.088027002105125
          ],
          [
            -69.20279700056304,
            10.086096431494692
          ],
          [
            -69.18486152494468,
            10.036414130006621
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-33",
    "properties": {
      "id": "ZS-33",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Anzoátegui-Monagas",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Anzoátegui-Monagas",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Anzoátegui-Monagas",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.0701,
        -64.0066
      ],
      "superficieKm2": 49.38,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -63.959044616059195,
            10.082672402329074
          ],
          [
            -63.95771123277319,
            10.074103082694153
          ],
          [
            -63.95994620204992,
            10.066239988670334
          ],
          [
            -63.95644407638653,
            10.061077957169948
          ],
          [
            -63.95638501371874,
            10.05555589454474
          ],
          [
            -63.97996373246422,
            10.048879613744747
          ],
          [
            -63.98965892011311,
            10.047151488203273
          ],
          [
            -63.995093076600476,
            10.048112457592284
          ],
          [
            -63.9968990764384,
            10.04385308236895
          ],
          [
            -63.99987082633613,
            10.041601738828225
          ],
          [
            -64.00797563900271,
            10.041376551252279
          ],
          [
            -64.01256832708731,
            10.039125207248887
          ],
          [
            -64.03071410762728,
            10.043942801294152
          ],
          [
            -64.04806448325051,
            10.051987269406386
          ],
          [
            -64.05910405809182,
            10.052705308011841
          ],
          [
            -64.0584892581407,
            10.058174632052502
          ],
          [
            -64.0497903990607,
            10.062587554140384
          ],
          [
            -64.04826750795657,
            10.06476802229437
          ],
          [
            -64.04916746118839,
            10.070963288753003
          ],
          [
            -64.04709080512089,
            10.071067163551328
          ],
          [
            -64.04275041487861,
            10.076871585217425
          ],
          [
            -64.03968435189087,
            10.076810569302124
          ],
          [
            -64.03593725864835,
            10.079329632096519
          ],
          [
            -64.03328110184044,
            10.086815069998076
          ],
          [
            -64.0254590399681,
            10.092698929328543
          ],
          [
            -64.01152069577176,
            10.095228053749004
          ],
          [
            -64.00462313319296,
            10.093841273187566
          ],
          [
            -64.0015081493298,
            10.095675662943956
          ],
          [
            -63.99477805502393,
            10.093992038268397
          ],
          [
            -63.98691346111472,
            10.097906694221741
          ],
          [
            -63.97631880513187,
            10.098668475768546
          ],
          [
            -63.972688429970866,
            10.09350000741885
          ],
          [
            -63.96959844611743,
            10.09238438206945
          ],
          [
            -63.968319680387765,
            10.084639741341952
          ],
          [
            -63.959044616059195,
            10.082672402329074
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-34",
    "properties": {
      "id": "ZS-34",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Yaracuy",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Yaracuy",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.1356,
        -69.1942
      ],
      "superficieKm2": 79.16,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.20820651168354,
            10.088027002105125
          ],
          [
            -69.21899940627854,
            10.080616259804547
          ],
          [
            -69.22365353909404,
            10.081325236140986
          ],
          [
            -69.22552955515145,
            10.07728318200567
          ],
          [
            -69.23917390685374,
            10.073545049172488
          ],
          [
            -69.23909017971239,
            10.111363415886016
          ],
          [
            -69.23751616452058,
            10.115107463147941
          ],
          [
            -69.2417843522019,
            10.124959525496152
          ],
          [
            -69.24141739907391,
            10.132326603614427
          ],
          [
            -69.24516549295284,
            10.131610565133595
          ],
          [
            -69.24244085162054,
            10.136563900425305
          ],
          [
            -69.24219254745056,
            10.150386776035456
          ],
          [
            -69.2321572974749,
            10.152831869736294
          ],
          [
            -69.22645616468222,
            10.156037939968733
          ],
          [
            -69.219142953244,
            10.155212986361768
          ],
          [
            -69.2099527352085,
            10.159618095840255
          ],
          [
            -69.20608463344917,
            10.15932411915498
          ],
          [
            -69.19816245376137,
            10.164619228570398
          ],
          [
            -69.09692847298872,
            10.214503733120129
          ],
          [
            -69.09905273615124,
            10.206102431889523
          ],
          [
            -69.11249401704521,
            10.193864212809272
          ],
          [
            -69.11486598598694,
            10.18067105643294
          ],
          [
            -69.12116989199403,
            10.170110837557841
          ],
          [
            -69.11784639194218,
            10.162871681876492
          ],
          [
            -69.12281957960755,
            10.153486165644457
          ],
          [
            -69.12273751723873,
            10.139399618838839
          ],
          [
            -69.121503970534,
            10.136760478443565
          ],
          [
            -69.22510293947354,
            10.127389931343147
          ],
          [
            -69.2205750797265,
            10.109907415726974
          ],
          [
            -69.21620418877527,
            10.104141571675694
          ],
          [
            -69.21464997041626,
            10.096963071821243
          ],
          [
            -69.20974292372435,
            10.092443509850986
          ],
          [
            -69.20820651168354,
            10.088027002105125
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-35",
    "properties": {
      "id": "ZS-35",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Yaracuy",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Yaracuy",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.2247,
        -69.072
      ],
      "superficieKm2": 0.56,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.07892172770545,
            10.223376121471565
          ],
          [
            -69.06265535105595,
            10.231390088713674
          ],
          [
            -69.06811904814482,
            10.227341869474838
          ],
          [
            -69.07278412678117,
            10.220203760103917
          ],
          [
            -69.07750126719841,
            10.221221728551008
          ],
          [
            -69.07892172770545,
            10.223376121471565
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-36",
    "properties": {
      "id": "ZS-36",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Yaracuy",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Yaracuy",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.2334,
        -69.0594
      ],
      "superficieKm2": 0.04,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.05674076473201,
            10.234303820722316
          ],
          [
            -69.06265535105595,
            10.231390088713674
          ],
          [
            -69.05879584564192,
            10.234481009774866
          ],
          [
            -69.05674076473201,
            10.234303820722316
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-37",
    "properties": {
      "id": "ZS-37",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Yaracuy",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Yaracuy",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.2341,
        -69.0828
      ],
      "superficieKm2": 4.2,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.07892172770545,
            10.223376121471565
          ],
          [
            -69.09692847298872,
            10.214503733120129
          ],
          [
            -69.09006873568983,
            10.23896882199875
          ],
          [
            -69.08819268909649,
            10.240168837628577
          ],
          [
            -69.08389856384208,
            10.238610853801259
          ],
          [
            -69.07657539186883,
            10.241730947453867
          ],
          [
            -69.07415631396249,
            10.240652946844511
          ],
          [
            -69.07385926746267,
            10.234655900180911
          ],
          [
            -69.07892172770545,
            10.223376121471565
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-38",
    "properties": {
      "id": "ZS-38",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Yaracuy",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Yaracuy",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.2302,
        -69.0409
      ],
      "superficieKm2": 3.34,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.01816865696317,
            10.237578506451595
          ],
          [
            -69.02781604822349,
            10.239827291122086
          ],
          [
            -69.0386964546387,
            10.23663640000687
          ],
          [
            -69.04428240803774,
            10.22787566626589
          ],
          [
            -69.04627637670883,
            10.21697393154233
          ],
          [
            -69.04858942332817,
            10.215053884653866
          ],
          [
            -69.04985847046208,
            10.21709290020718
          ],
          [
            -69.04815253262966,
            10.230046040895443
          ],
          [
            -69.05674076473201,
            10.234303820722316
          ],
          [
            -69.03059348478422,
            10.246637260281643
          ],
          [
            -69.01816865696317,
            10.237578506451595
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-39",
    "properties": {
      "id": "ZS-39",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Monagas-Sucre",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Monagas-Sucre",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Monagas-Sucre",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.2062,
        -63.7136
      ],
      "superficieKm2": 22.38,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -63.65497806879491,
            10.21961906428947
          ],
          [
            -63.67420924187066,
            10.20958323197466
          ],
          [
            -63.69463975805558,
            10.201223951315757
          ],
          [
            -63.69789182048763,
            10.197534889001432
          ],
          [
            -63.714038195483894,
            10.194972700727575
          ],
          [
            -63.72544946050095,
            10.18786051371265
          ],
          [
            -63.7290295702465,
            10.18819148235653
          ],
          [
            -63.754700226053664,
            10.177989138437482
          ],
          [
            -63.7625904766394,
            10.18030009175271
          ],
          [
            -63.7683276252496,
            10.179188957347186
          ],
          [
            -63.76763789843774,
            10.192229147500823
          ],
          [
            -63.75694574283781,
            10.19241902245073
          ],
          [
            -63.75109605531633,
            10.19533346078612
          ],
          [
            -63.75017208610869,
            10.198632054109416
          ],
          [
            -63.74618555477443,
            10.201476178928672
          ],
          [
            -63.741252804690085,
            10.19812508577847
          ],
          [
            -63.73646007064366,
            10.197740397717515
          ],
          [
            -63.733213726786005,
            10.198696381886238
          ],
          [
            -63.73247961730452,
            10.200976678663533
          ],
          [
            -63.73057085212697,
            10.200284101316038
          ],
          [
            -63.72860408622748,
            10.204526194601183
          ],
          [
            -63.70966153917884,
            10.204477226401114
          ],
          [
            -63.70660005474468,
            10.211164773027168
          ],
          [
            -63.7068465857465,
            10.215618147496677
          ],
          [
            -63.70352989898901,
            10.213984444928274
          ],
          [
            -63.69469200764269,
            10.220201351273463
          ],
          [
            -63.684256632733636,
            10.224944022950737
          ],
          [
            -63.67320205502398,
            10.232930038920347
          ],
          [
            -63.670658757600634,
            10.23674985065925
          ],
          [
            -63.668583586368754,
            10.234274710240337
          ],
          [
            -63.66300021118495,
            10.234619944350301
          ],
          [
            -63.66073286744544,
            10.232288194436514
          ],
          [
            -63.65658214836679,
            10.227051601399632
          ],
          [
            -63.65497806879491,
            10.21961906428947
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-40",
    "properties": {
      "id": "ZS-40",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Monagas-Sucre",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Monagas-Sucre",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Monagas-Sucre",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.2195,
        -63.5759
      ],
      "superficieKm2": 13.49,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -63.60391465026913,
            10.217459182878475
          ],
          [
            -63.59922989834876,
            10.222456601153144
          ],
          [
            -63.58155014834438,
            10.230175975566809
          ],
          [
            -63.575727570688315,
            10.2290333039226
          ],
          [
            -63.57075469520547,
            10.225659756852473
          ],
          [
            -63.568202789414975,
            10.230737773194164
          ],
          [
            -63.560213633162896,
            10.23321160090798
          ],
          [
            -63.556288826450576,
            10.236802217142857
          ],
          [
            -63.55519894464259,
            10.229859575811277
          ],
          [
            -63.55810099206503,
            10.226008497764823
          ],
          [
            -63.55894591382713,
            10.214647357551925
          ],
          [
            -63.56788205434541,
            10.201786123117696
          ],
          [
            -63.57749233583321,
            10.202271044978446
          ],
          [
            -63.58574752282325,
            10.196207903882598
          ],
          [
            -63.595498867168324,
            10.202291873209141
          ],
          [
            -63.599271069845535,
            10.21323496680255
          ],
          [
            -63.60391465026913,
            10.217459182878475
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-41",
    "properties": {
      "id": "ZS-41",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Yaracuy",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Yaracuy",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.2696,
        -69.0172
      ],
      "superficieKm2": 6.53,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.01816865696317,
            10.237578506451595
          ],
          [
            -69.02526604824743,
            10.249963400479773
          ],
          [
            -69.02495611122635,
            10.258898494163184
          ],
          [
            -69.02100762657413,
            10.267245947081287
          ],
          [
            -69.02076711126918,
            10.274671681630071
          ],
          [
            -69.01692800109481,
            10.286477541346825
          ],
          [
            -69.01766568916725,
            10.28949947824504
          ],
          [
            -69.02110337642088,
            10.291442228094622
          ],
          [
            -69.02169653472588,
            10.298458273723682
          ],
          [
            -69.01165625811957,
            10.288647986506266
          ],
          [
            -69.00906250831133,
            10.280034275557622
          ],
          [
            -69.0106329298423,
            10.271587095828698
          ],
          [
            -69.00962260961903,
            10.261305916744245
          ],
          [
            -69.01577253930624,
            10.24933887709472
          ],
          [
            -69.0137022738449,
            10.238488439935928
          ],
          [
            -69.01816865696317,
            10.237578506451595
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-42",
    "properties": {
      "id": "ZS-42",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Zulia",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Zulia",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Zulia",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.1002,
        -70.6653
      ],
      "superficieKm2": 805.28,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -70.65590440493129,
            10.315312328639049
          ],
          [
            -70.6563798182803,
            10.310788259989708
          ],
          [
            -70.65457134957025,
            10.304815791822644
          ],
          [
            -70.66306616207375,
            10.296237666316982
          ],
          [
            -70.66404175536034,
            10.291704760574325
          ],
          [
            -70.67094231816709,
            10.280497354364622
          ],
          [
            -70.67408319282224,
            10.269908635073307
          ],
          [
            -70.65690300538022,
            10.26174710402665
          ],
          [
            -70.64659956839083,
            10.253740229203617
          ],
          [
            -70.6431492555816,
            10.253311947899485
          ],
          [
            -70.63693872397592,
            10.256928791295906
          ],
          [
            -70.63386916188368,
            10.256024635301646
          ],
          [
            -70.63060916215211,
            10.251241885246003
          ],
          [
            -70.61933013056652,
            10.241985759864741
          ],
          [
            -70.62120988094044,
            10.228601135190049
          ],
          [
            -70.61825922400956,
            10.224222916339015
          ],
          [
            -70.61144459917485,
            10.22630235355122
          ],
          [
            -70.60057725568022,
            10.226944166151187
          ],
          [
            -70.58765853697861,
            10.223009604167055
          ],
          [
            -70.58332778650151,
            10.216156728488857
          ],
          [
            -70.57904450530967,
            10.196371353615932
          ],
          [
            -70.57813319261336,
            10.180536135094698
          ],
          [
            -70.57549888003193,
            10.178263509992739
          ],
          [
            -70.56740847434553,
            10.176407541442973
          ],
          [
            -70.56467200562325,
            10.17114891667759
          ],
          [
            -70.56483975518637,
            10.166524104014574
          ],
          [
            -70.56093600516904,
            10.155765603643353
          ],
          [
            -70.56367238069322,
            10.137919447389041
          ],
          [
            -70.5607930989285,
            10.133041541480852
          ],
          [
            -70.56293463052039,
            10.129186728593636
          ],
          [
            -70.56015056788293,
            10.124392104068475
          ],
          [
            -70.55991256777646,
            10.119823510086624
          ],
          [
            -70.56892441158229,
            10.118432759767932
          ],
          [
            -70.57185775529311,
            10.114350603681046
          ],
          [
            -70.56700347421715,
            10.109282322242542
          ],
          [
            -70.57532516137715,
            10.091949072227257
          ],
          [
            -70.56912109967115,
            10.084559509615243
          ],
          [
            -70.577092442763,
            10.072745291069332
          ],
          [
            -70.5741114119436,
            10.067559385344065
          ],
          [
            -70.57078009892328,
            10.06646482223774
          ],
          [
            -70.5697261302488,
            10.056451072163611
          ],
          [
            -70.56814528643284,
            10.053757103799043
          ],
          [
            -70.55948375531271,
            10.044358197798577
          ],
          [
            -70.56481378684889,
            10.031033072241646
          ],
          [
            -70.56943003695831,
            10.024299104161951
          ],
          [
            -70.56131256762694,
            10.006536665914298
          ],
          [
            -70.56083350515775,
            9.997749603661523
          ],
          [
            -70.5631002868351,
            9.9951385721097
          ],
          [
            -70.56893013006516,
            9.995067135169753
          ],
          [
            -70.56969153662921,
            9.985763384771884
          ],
          [
            -70.57661591178322,
            9.98231307207045
          ],
          [
            -70.57816256807223,
            9.979076978716698
          ],
          [
            -70.58971263094168,
            9.9701841970617
          ],
          [
            -70.59420056810808,
            9.979029260312887
          ],
          [
            -70.59804897459009,
            9.994140260408331
          ],
          [
            -70.60387878711114,
            9.995924822065351
          ],
          [
            -70.60980388033015,
            10.004681322849555
          ],
          [
            -70.60968500577523,
            10.01776844765365
          ],
          [
            -70.62667488056995,
            10.029963166340972
          ],
          [
            -70.63352797444976,
            10.038100978740069
          ],
          [
            -70.6385487559318,
            10.040528009715683
          ],
          [
            -70.64192769300108,
            10.039933103374228
          ],
          [
            -70.6500180058016,
            10.027988072890329
          ],
          [
            -70.66505650557417,
            10.01522204154744
          ],
          [
            -70.6822841301409,
            9.994924916296817
          ],
          [
            -70.68371181790071,
            9.988785853585451
          ],
          [
            -70.68004728699599,
            9.98024354122197
          ],
          [
            -70.67911919287039,
            9.971332385025288
          ],
          [
            -70.68380681776489,
            9.964384259774734
          ],
          [
            -70.68249803689719,
            9.956662853352318
          ],
          [
            -70.68913688036676,
            9.952879447662713
          ],
          [
            -70.69480009921955,
            9.945265040737985
          ],
          [
            -70.69244431812106,
            9.939482915820005
          ],
          [
            -70.69518075533927,
            9.933355759798035
          ],
          [
            -70.6928249741629,
            9.929643760087993
          ],
          [
            -70.69494269266796,
            9.921363134800739
          ],
          [
            -70.69113541176107,
            9.913641759471874
          ],
          [
            -70.6898503491357,
            9.89429654120404
          ],
          [
            -70.69411756815174,
            9.888246040849435
          ],
          [
            -70.70080905014395,
            9.883666524937073
          ],
          [
            -70.7055920343904,
            9.882880774853044
          ],
          [
            -70.73876267465901,
            9.894159306671497
          ],
          [
            -70.74573473757229,
            9.901226305965727
          ],
          [
            -70.74518750311616,
            9.910411118622719
          ],
          [
            -70.74645540969647,
            9.912382259848547
          ],
          [
            -70.7547770500157,
            9.918358540277376
          ],
          [
            -70.77092312801274,
            9.921381166072516
          ],
          [
            -70.7895195188203,
            9.917641196784967
          ],
          [
            -70.88017187798447,
            10.045789572392222
          ],
          [
            -70.88215192484896,
            10.050383088002881
          ],
          [
            -70.87828255002162,
            10.057275338131243
          ],
          [
            -70.87004940945921,
            10.059678665839392
          ],
          [
            -70.86150540983336,
            10.070025915633037
          ],
          [
            -70.85091811280532,
            10.070838556076524
          ],
          [
            -70.84327986268725,
            10.07581172873163
          ],
          [
            -70.84078144074682,
            10.085472447152341
          ],
          [
            -70.84223114346477,
            10.093967947015228
          ],
          [
            -70.83890170619988,
            10.098559618869622
          ],
          [
            -70.78750412842729,
            10.121974072552312
          ],
          [
            -70.77451014404274,
            10.133491603742879
          ],
          [
            -70.76073153450112,
            10.13357144732226
          ],
          [
            -70.74332579965434,
            10.145683368763287
          ],
          [
            -70.73747479978894,
            10.151692025281367
          ],
          [
            -70.73429517469663,
            10.157271291016867
          ],
          [
            -70.7345570186857,
            10.169263885009702
          ],
          [
            -70.72701397227283,
            10.17656893195212
          ],
          [
            -70.7296314876529,
            10.181351681936913
          ],
          [
            -70.72916834659054,
            10.18445715025556
          ],
          [
            -70.72177914395184,
            10.194200946957798
          ],
          [
            -70.71059539380106,
            10.19734193155336
          ],
          [
            -70.70456634688892,
            10.202803525522972
          ],
          [
            -70.70279061247548,
            10.206431603865965
          ],
          [
            -70.70754972174237,
            10.215901932021286
          ],
          [
            -70.70814467496585,
            10.224301478734192
          ],
          [
            -70.69696903459003,
            10.25158233823784
          ],
          [
            -70.6952241279913,
            10.263289400196543
          ],
          [
            -70.69576354950006,
            10.271665181451885
          ],
          [
            -70.68989419034352,
            10.293366103853733
          ],
          [
            -70.69035720298976,
            10.300584762658637
          ],
          [
            -70.6797572557106,
            10.301232572879977
          ],
          [
            -70.66386209924649,
            10.315652353706824
          ],
          [
            -70.66088772434746,
            10.316699353692933
          ],
          [
            -70.65590440493129,
            10.315312328639049
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-43",
    "properties": {
      "id": "ZS-43",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Lara-Yaracuy",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Lara-Yaracuy",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Lara-Yaracuy",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.3566,
        -69.0285
      ],
      "superficieKm2": 4.77,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.02169653472588,
            10.298458273723682
          ],
          [
            -69.02845254700459,
            10.30521673679179
          ],
          [
            -69.03271856319263,
            10.412263991333589
          ],
          [
            -69.03116125145783,
            10.410374713375488
          ],
          [
            -69.02169653472588,
            10.298458273723682
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-44",
    "properties": {
      "id": "ZS-44",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Falcón-Lara",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Falcón-Lara",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Falcón-Lara",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.4152,
        -70.5858
      ],
      "superficieKm2": 620.02,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -70.65590440493129,
            10.315312328639049
          ],
          [
            -70.66088772434746,
            10.316699353692933
          ],
          [
            -70.66386209924649,
            10.315652353706824
          ],
          [
            -70.6797572557106,
            10.301232572879977
          ],
          [
            -70.69129069291986,
            10.3005845726932
          ],
          [
            -70.69956822434857,
            10.304089073037275
          ],
          [
            -70.72671863106588,
            10.304398197380156
          ],
          [
            -70.73045447482228,
            10.306373166877714
          ],
          [
            -70.73942534983746,
            10.317949260072597
          ],
          [
            -70.74518384951628,
            10.322827197351927
          ],
          [
            -70.75196553668276,
            10.325444572486397
          ],
          [
            -70.75696250559815,
            10.324230979068734
          ],
          [
            -70.75981794352532,
            10.325563478720278
          ],
          [
            -70.76436288111968,
            10.332202198100598
          ],
          [
            -70.76058578711496,
            10.336944385341864
          ],
          [
            -70.76039391212065,
            10.350937916525629
          ],
          [
            -70.76303050520885,
            10.356282603862606
          ],
          [
            -70.76776578732535,
            10.359435385041643
          ],
          [
            -70.76531491220928,
            10.36647866611388
          ],
          [
            -70.75870925580453,
            10.375776166500849
          ],
          [
            -70.75789100566149,
            10.395020603911865
          ],
          [
            -70.77114503687093,
            10.408214760204528
          ],
          [
            -70.77376259929773,
            10.417768385327467
          ],
          [
            -70.77312016229405,
            10.422432167025487
          ],
          [
            -70.78225756816136,
            10.428892385211071
          ],
          [
            -70.78437541232957,
            10.435483573219452
          ],
          [
            -70.7921565365745,
            10.446738479565623
          ],
          [
            -70.79974734924193,
            10.467523198095554
          ],
          [
            -70.80458013089478,
            10.471258791983018
          ],
          [
            -70.79729911286958,
            10.4835192446726
          ],
          [
            -70.65116994069163,
            10.48747604105362
          ],
          [
            -70.62097095582999,
            10.486251338527895
          ],
          [
            -70.58364273745069,
            10.51085029161191
          ],
          [
            -70.37187440936769,
            10.543507478482432
          ],
          [
            -70.37156651285248,
            10.540678462382491
          ],
          [
            -70.3762255759182,
            10.533956337036098
          ],
          [
            -70.380882701048,
            10.531736305655118
          ],
          [
            -70.38626382528733,
            10.532276274937761
          ],
          [
            -70.38886488849592,
            10.528435211863021
          ],
          [
            -70.39527601345203,
            10.523874118808806
          ],
          [
            -70.39576201307838,
            10.520453086905247
          ],
          [
            -70.39273988782563,
            10.517032087047186
          ],
          [
            -70.3906867946454,
            10.510850024831674
          ],
          [
            -70.39123279487532,
            10.506527993726314
          ],
          [
            -70.39716288860345,
            10.496564837131096
          ],
          [
            -70.39904282525272,
            10.483660712193679
          ],
          [
            -70.40357991976437,
            10.478679618417868
          ],
          [
            -70.4115631073163,
            10.475618556145049
          ],
          [
            -70.42190829418581,
            10.462475337405857
          ],
          [
            -70.42484838843927,
            10.462719337176882
          ],
          [
            -70.42586635683304,
            10.458129274546838
          ],
          [
            -70.42889441901131,
            10.454591211616492
          ],
          [
            -70.43624860703056,
            10.450811149918897
          ],
          [
            -70.44790795095986,
            10.45537208717222
          ],
          [
            -70.45845882569205,
            10.464850992911172
          ],
          [
            -70.45964535702852,
            10.46901514960084
          ],
          [
            -70.46256241952,
            10.469419118115411
          ],
          [
            -70.47262466961234,
            10.465842024526609
          ],
          [
            -70.48074282550975,
            10.458119899968239
          ],
          [
            -70.48230188845962,
            10.4581718994388
          ],
          [
            -70.48546098183706,
            10.462517899791864
          ],
          [
            -70.49542326352501,
            10.461984836950572
          ],
          [
            -70.50183135738389,
            10.453709712163553
          ],
          [
            -70.52203591976706,
            10.44106449342765
          ],
          [
            -70.52733591929243,
            10.422321274755639
          ],
          [
            -70.53865013811681,
            10.409383086847763
          ],
          [
            -70.53516898185151,
            10.398397993563986
          ],
          [
            -70.5444469818049,
            10.364300618327354
          ],
          [
            -70.55350051374676,
            10.354612743175707
          ],
          [
            -70.5543686068889,
            10.345236836777291
          ],
          [
            -70.56617538818311,
            10.3302303997983
          ],
          [
            -70.57158266937698,
            10.325740868272515
          ],
          [
            -70.57996654493175,
            10.32316121198439
          ],
          [
            -70.60960776303743,
            10.328766680302163
          ],
          [
            -70.62329973253692,
            10.329709118376359
          ],
          [
            -70.63368907555228,
            10.325233649803828
          ],
          [
            -70.64931945119929,
            10.32120121202964
          ],
          [
            -70.65292554447937,
            10.316503430952029
          ],
          [
            -70.65590440493129,
            10.315312328639049
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-45",
    "properties": {
      "id": "ZS-45",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Falcón-Lara",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Falcón-Lara",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Falcón-Lara",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.7168,
        -69.4811
      ],
      "superficieKm2": 48.18,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -69.44815307499712,
            10.700826149927972
          ],
          [
            -69.44892848068768,
            10.69942896234269
          ],
          [
            -69.45460844992316,
            10.69988255568124
          ],
          [
            -69.45761104313584,
            10.694679993441802
          ],
          [
            -69.4633352622094,
            10.690973337220305
          ],
          [
            -69.48782757490106,
            10.691137368854575
          ],
          [
            -69.4940210744792,
            10.694069774835167
          ],
          [
            -69.5062906995655,
            10.69402277446933
          ],
          [
            -69.51398298139671,
            10.691089024435431
          ],
          [
            -69.51792685598778,
            10.686280993146264
          ],
          [
            -69.51848979355331,
            10.677272493940999
          ],
          [
            -69.52081235609295,
            10.676122931336302
          ],
          [
            -69.52482407494922,
            10.681237087244186
          ],
          [
            -69.51748113734135,
            10.692802806167297
          ],
          [
            -69.51687126214254,
            10.700661774380878
          ],
          [
            -69.52132876235493,
            10.714338743101287
          ],
          [
            -69.52409707518342,
            10.717974962283751
          ],
          [
            -69.52053116853575,
            10.722971930933037
          ],
          [
            -69.51773944988179,
            10.723558430645397
          ],
          [
            -69.51806791863022,
            10.72627974360675
          ],
          [
            -69.5152996371963,
            10.727710837107743
          ],
          [
            -69.51473660636331,
            10.731464368738067
          ],
          [
            -69.5174110746339,
            10.733833774796121
          ],
          [
            -69.5150416682116,
            10.740590181438606
          ],
          [
            -69.51617528067624,
            10.74301331346012
          ],
          [
            -69.51197412675485,
            10.74286322889186
          ],
          [
            -69.50017361151434,
            10.738269026078093
          ],
          [
            -69.48970373640599,
            10.743456384926612
          ],
          [
            -69.4877525020267,
            10.740148916532588
          ],
          [
            -69.47821061093086,
            10.739792057315908
          ],
          [
            -69.47188101789632,
            10.733153338225613
          ],
          [
            -69.46512843974229,
            10.733396791034894
          ],
          [
            -69.45654623625813,
            10.736275885285616
          ],
          [
            -69.44813334573547,
            10.731202338516958
          ],
          [
            -69.44194656442502,
            10.729941259846862
          ],
          [
            -69.42000740778946,
            10.73829341688036
          ],
          [
            -69.41650950214513,
            10.736937135419431
          ],
          [
            -69.41401095479979,
            10.731726072320718
          ],
          [
            -69.41553248642975,
            10.726544447658032
          ],
          [
            -69.41979314279479,
            10.723540603986926
          ],
          [
            -69.42102082987927,
            10.720578854117182
          ],
          [
            -69.42769312699573,
            10.717710807259863
          ],
          [
            -69.42963514252597,
            10.707359134985483
          ],
          [
            -69.44815307499712,
            10.700826149927972
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-46",
    "properties": {
      "id": "ZS-46",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Falcón-Yaracuy",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Falcón-Yaracuy",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Falcón-Yaracuy",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        10.6386,
        -68.5046
      ],
      "superficieKm2": 223.47,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -68.23605288752627,
            10.577926937670732
          ],
          [
            -68.52032876178345,
            10.596484461750846
          ],
          [
            -68.65178813663054,
            10.618654180841682
          ],
          [
            -68.61776114821447,
            10.77414842484829
          ],
          [
            -68.49725162509654,
            10.625907025662586
          ],
          [
            -68.23605288752627,
            10.577926937670732
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-47",
    "properties": {
      "id": "ZS-47",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Mérida-Zulia",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Mérida-Zulia",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Mérida-Zulia",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.2247,
        -71.0793
      ],
      "superficieKm2": 563.46,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -71.2193829695687,
            9.198301396203936
          ],
          [
            -71.21787041845758,
            9.199734574471048
          ],
          [
            -71.21497711133541,
            9.199109886668172
          ],
          [
            -71.21083733969947,
            9.202464792744374
          ],
          [
            -71.19052855746003,
            9.229855599742397
          ],
          [
            -71.18352768185879,
            9.237057823256018
          ],
          [
            -71.1761084368173,
            9.243043101918065
          ],
          [
            -71.17250233655521,
            9.243738828407396
          ],
          [
            -71.16243929606631,
            9.25036479541464
          ],
          [
            -71.13559145790839,
            9.273063572658891
          ],
          [
            -71.13095418542557,
            9.274364267743982
          ],
          [
            -71.12449228398091,
            9.279719921995047
          ],
          [
            -71.10232483153709,
            9.287387141799632
          ],
          [
            -71.08746413057293,
            9.300120131361153
          ],
          [
            -71.06535914757683,
            9.310009396248006
          ],
          [
            -71.05819680431249,
            9.318621535718506
          ],
          [
            -71.05315735263959,
            9.331236617244477
          ],
          [
            -71.05113055053395,
            9.34086495412553
          ],
          [
            -71.05289068787786,
            9.35482164537356
          ],
          [
            -71.05169320780816,
            9.357220011701045
          ],
          [
            -71.04648205871361,
            9.359432964686441
          ],
          [
            -71.0425082075137,
            9.35231833196705
          ],
          [
            -71.03993832408547,
            9.352294559098159
          ],
          [
            -71.03677352778257,
            9.34895140288303
          ],
          [
            -71.0263512043502,
            9.348713530807252
          ],
          [
            -71.02494840774466,
            9.345577297100693
          ],
          [
            -71.02099725106127,
            9.344906390709088
          ],
          [
            -71.01995025136692,
            9.341955843857097
          ],
          [
            -71.01588125121346,
            9.340314015819493
          ],
          [
            -71.01435832905008,
            9.33733968769927
          ],
          [
            -71.01250231338072,
            9.338791171445592
          ],
          [
            -71.0088378293827,
            9.33614996880875
          ],
          [
            -71.00510196952436,
            9.336031031320516
          ],
          [
            -71.00469743867225,
            9.333960875375016
          ],
          [
            -71.00281761052466,
            9.333580172084314
          ],
          [
            -70.99470345454729,
            9.337101859810494
          ],
          [
            -70.98620853238597,
            9.333651656400479
          ],
          [
            -70.97923647021099,
            9.324800030989433
          ],
          [
            -70.96222278209798,
            9.313140687780212
          ],
          [
            -70.95767786048185,
            9.306716108910232
          ],
          [
            -70.95331721976791,
            9.304812406041068
          ],
          [
            -70.95313293877992,
            9.302885172148486
          ],
          [
            -70.94992056360307,
            9.300434328098726
          ],
          [
            -70.9480882668913,
            9.290833140582468
          ],
          [
            -70.94347196972302,
            9.288786812799675
          ],
          [
            -70.9423614543032,
            9.285473515811704
          ],
          [
            -70.93692823585793,
            9.281695999532296
          ],
          [
            -70.92757670431574,
            9.28124395301205
          ],
          [
            -70.91337089207649,
            9.275247750271037
          ],
          [
            -70.90742203236914,
            9.266158172224266
          ],
          [
            -70.90218706383023,
            9.263969078012552
          ],
          [
            -70.89952190712268,
            9.251548203356798
          ],
          [
            -70.89956945451442,
            9.243862484219065
          ],
          [
            -70.89369193369177,
            9.229430972513299
          ],
          [
            -70.89754673058573,
            9.224112808329547
          ],
          [
            -70.90562980124854,
            9.219218862943757
          ],
          [
            -70.90808797285626,
            9.215546605736677
          ],
          [
            -70.9030195197161,
            9.206421332426736
          ],
          [
            -70.89985475450882,
            9.205326793074333
          ],
          [
            -70.90159176196174,
            9.19804556643343
          ],
          [
            -70.89878388431266,
            9.19274231674036
          ],
          [
            -71.03033917407782,
            9.085579822229557
          ],
          [
            -71.03777069322565,
            9.094549462056559
          ],
          [
            -71.03810384881787,
            9.097952117393636
          ],
          [
            -71.04417166783657,
            9.102853810423337
          ],
          [
            -71.06484978126626,
            9.1092544850429
          ],
          [
            -71.07541492840589,
            9.118225062135991
          ],
          [
            -71.07934118590799,
            9.12482809730769
          ],
          [
            -71.08100693878633,
            9.138498202896493
          ],
          [
            -71.08907359309414,
            9.148848893926134
          ],
          [
            -71.09233354421087,
            9.149182001163075
          ],
          [
            -71.09461790642501,
            9.152013569458585
          ],
          [
            -71.10642035455523,
            9.152655956353689
          ],
          [
            -71.11046553735567,
            9.151085474365797
          ],
          [
            -71.11165530979648,
            9.152774898120763
          ],
          [
            -71.11627159353093,
            9.153560098653713
          ],
          [
            -71.12100683783149,
            9.151870638003881
          ],
          [
            -71.12602765368001,
            9.15486875287909
          ],
          [
            -71.13161952376983,
            9.152584416587317
          ],
          [
            -71.1318812601448,
            9.15075221517843
          ],
          [
            -71.13452254788164,
            9.153250653926104
          ],
          [
            -71.13668790292596,
            9.15110910804259
          ],
          [
            -71.13799665537148,
            9.15332201620805
          ],
          [
            -71.13854393211498,
            9.151132891028073
          ],
          [
            -71.1412963170432,
            9.151322946617544
          ],
          [
            -71.1431126111847,
            9.14963379019702
          ],
          [
            -71.14546835430927,
            9.151822898275805
          ],
          [
            -71.14768130219858,
            9.150181043050882
          ],
          [
            -71.15194068222381,
            9.155058951473913
          ],
          [
            -71.15458194006115,
            9.15265565980399
          ],
          [
            -71.15774672485576,
            9.155344453763114
          ],
          [
            -71.15888892151722,
            9.159341973936876
          ],
          [
            -71.16170690261579,
            9.157251870331256
          ],
          [
            -71.16105430362488,
            9.161602467532479
          ],
          [
            -71.16501302624218,
            9.162724895425795
          ],
          [
            -71.16628925522971,
            9.161126539350306
          ],
          [
            -71.16845462562758,
            9.161531037602531
          ],
          [
            -71.1682642794049,
            9.16400569827951
          ],
          [
            -71.17065017869956,
            9.162908861986896
          ],
          [
            -71.16964442775584,
            9.167860448924122
          ],
          [
            -71.1715202657536,
            9.17318894181575
          ],
          [
            -71.17675924998724,
            9.174808488844851
          ],
          [
            -71.17890085046378,
            9.179234309843732
          ],
          [
            -71.18244633588559,
            9.178211111043447
          ],
          [
            -71.18197044707804,
            9.180828542933785
          ],
          [
            -71.18511141343669,
            9.179710166980456
          ],
          [
            -71.18684847845635,
            9.181637536106146
          ],
          [
            -71.18573011183179,
            9.183231794872945
          ],
          [
            -71.18969681388845,
            9.182772909790417
          ],
          [
            -71.19013224385658,
            9.185111557366115
          ],
          [
            -71.19148856745399,
            9.18411216753334
          ],
          [
            -71.19448678402046,
            9.18665819298799
          ],
          [
            -71.19641418713174,
            9.184588033305385
          ],
          [
            -71.19700908344231,
            9.187110279355366
          ],
          [
            -71.2028192167889,
            9.19082689612605
          ],
          [
            -71.20874015695973,
            9.1896562514101
          ],
          [
            -71.21333267450979,
            9.195152823341878
          ],
          [
            -71.21588120383612,
            9.195103999529394
          ],
          [
            -71.2193829695687,
            9.198301396203936
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-48",
    "properties": {
      "id": "ZS-48",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Trujillo-Zulia",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Trujillo-Zulia",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Trujillo-Zulia",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.6805,
        -70.9382
      ],
      "superficieKm2": 413.16,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -71.048,
            9.7504
          ],
          [
            -71.04859204315174,
            9.752515387410893
          ],
          [
            -71.04100953523417,
            9.757095356130904
          ],
          [
            -71.03697241790154,
            9.757073473053294
          ],
          [
            -71.02953771502582,
            9.76604998862825
          ],
          [
            -71.02605268408192,
            9.767866426328395
          ],
          [
            -71.01944166798224,
            9.768457855992056
          ],
          [
            -71.01400672302869,
            9.765201347767139
          ],
          [
            -71.00302002796033,
            9.768525410429321
          ],
          [
            -70.99690589481456,
            9.765802184445652
          ],
          [
            -70.9913257774539,
            9.76851214526513
          ],
          [
            -70.98491797258349,
            9.768285247111175
          ],
          [
            -70.97800286367016,
            9.766256184376838
          ],
          [
            -70.97479894178423,
            9.762892168859363
          ],
          [
            -70.97378862146334,
            9.753629761841657
          ],
          [
            -70.97056111371256,
            9.752639887322633
          ],
          [
            -70.96500772331136,
            9.758122059179632
          ],
          [
            -70.96178631636,
            9.759681707674812
          ],
          [
            -70.95653648812709,
            9.759482800907094
          ],
          [
            -70.950374090147,
            9.755367707821417
          ],
          [
            -70.95194077713334,
            9.752673012554306
          ],
          [
            -70.95089626162459,
            9.745884082794031
          ],
          [
            -70.9468019413818,
            9.745236551425315
          ],
          [
            -70.9429374256167,
            9.747889481166313
          ],
          [
            -70.93662881622055,
            9.747158411037324
          ],
          [
            -70.9361274574344,
            9.74427573100521
          ],
          [
            -70.93094687142836,
            9.740912629156012
          ],
          [
            -70.92674805847399,
            9.73458329355541
          ],
          [
            -70.91780736360771,
            9.72986243417444
          ],
          [
            -70.90389491837236,
            9.712482863813612
          ],
          [
            -70.90172244177721,
            9.714822442045225
          ],
          [
            -70.89633298086802,
            9.715553590771254
          ],
          [
            -70.89092265272862,
            9.719062981038253
          ],
          [
            -70.88496923089271,
            9.7264577313256
          ],
          [
            -70.88003932404385,
            9.725768425910049
          ],
          [
            -70.8708689021949,
            9.727878269639936
          ],
          [
            -70.86708793394085,
            9.731011653240484
          ],
          [
            -70.85885746534456,
            9.723052996419906
          ],
          [
            -70.84626112944142,
            9.716431254450853
          ],
          [
            -70.84628199656538,
            9.714196129370773
          ],
          [
            -70.84442283978863,
            9.713987254612569
          ],
          [
            -70.84022403556025,
            9.707992129034404
          ],
          [
            -70.83243229317067,
            9.708096629237213
          ],
          [
            -70.82810819921734,
            9.710248222915613
          ],
          [
            -70.82731439456917,
            9.708305551029703
          ],
          [
            -70.82489123049336,
            9.708744238699328
          ],
          [
            -70.82319916808511,
            9.706780684415852
          ],
          [
            -70.80824234809812,
            9.703166973246093
          ],
          [
            -70.80292729263999,
            9.696866933930608
          ],
          [
            -70.79894653491245,
            9.698195449937625
          ],
          [
            -70.79217835594417,
            9.695479925993437
          ],
          [
            -70.79125921536075,
            9.694372809108717
          ],
          [
            -70.79303338667681,
            9.691789934457852
          ],
          [
            -70.7894033174491,
            9.689509866340819
          ],
          [
            -70.80499784923569,
            9.656666791291986
          ],
          [
            -70.84478303728635,
            9.585234446825561
          ],
          [
            -70.85312725536949,
            9.58751869730714
          ],
          [
            -70.85474534910952,
            9.589961666021582
          ],
          [
            -70.8602024121106,
            9.59192863425902
          ],
          [
            -70.86762653708828,
            9.588280072025354
          ],
          [
            -70.88421972497413,
            9.587645415408819
          ],
          [
            -70.8958000992941,
            9.59116700983924
          ],
          [
            -70.90671413044609,
            9.584250541170862
          ],
          [
            -70.90658500579205,
            9.581583634125334
          ],
          [
            -70.90427116185653,
            9.580379946983632
          ],
          [
            -70.90665066209677,
            9.579174321678288
          ],
          [
            -70.90925228717666,
            9.582220040537276
          ],
          [
            -70.90801500623553,
            9.589993040502824
          ],
          [
            -70.91236159935848,
            9.592277322010855
          ],
          [
            -70.9109021931226,
            9.597321822330226
          ],
          [
            -70.9123933495052,
            9.59840050939863
          ],
          [
            -70.91614334972247,
            9.597724447200445
          ],
          [
            -70.92045197468829,
            9.58951704110605
          ],
          [
            -70.92394194330488,
            9.58796244664931
          ],
          [
            -70.92590900565209,
            9.588470072374355
          ],
          [
            -70.9302239435404,
            9.594529790834082
          ],
          [
            -70.93932953705428,
            9.593228915396274
          ],
          [
            -70.94262913069008,
            9.589961103395446
          ],
          [
            -70.9464998500355,
            9.591737728528976
          ],
          [
            -70.95455850595955,
            9.591261790795103
          ],
          [
            -70.98812569313661,
            9.596591603632037
          ],
          [
            -70.99761206843989,
            9.596337728028425
          ],
          [
            -71.00227597478016,
            9.599827603288844
          ],
          [
            -71.00852619341333,
            9.599034415828857
          ],
          [
            -71.00957316183677,
            9.60062072798593
          ],
          [
            -71.01236513051765,
            9.599954447018359
          ],
          [
            -71.02797488070985,
            9.604110509856419
          ],
          [
            -71.03800056811696,
            9.60306347790848
          ],
          [
            -71.05744928681202,
            9.611566041135434
          ],
          [
            -71.06078999114695,
            9.616606656354767
          ],
          [
            -71.06047999100464,
            9.62385322409853
          ],
          [
            -71.05215051773386,
            9.635005181629397
          ],
          [
            -71.05002471061606,
            9.658068016957294
          ],
          [
            -71.04411444931456,
            9.670926810863996
          ],
          [
            -71.04988316730898,
            9.685972602019488
          ],
          [
            -71.04563434702716,
            9.701900712399363
          ],
          [
            -71.04068352290275,
            9.703752067634625
          ],
          [
            -71.03580221295513,
            9.712057845106925
          ],
          [
            -71.02990133701908,
            9.709038600459863
          ],
          [
            -71.02594897660596,
            9.708970318778515
          ],
          [
            -71.02559575898779,
            9.710144205904834
          ],
          [
            -71.034388465272,
            9.737145903593776
          ],
          [
            -71.03870032726647,
            9.743738093017795
          ],
          [
            -71.048,
            9.7504
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-49",
    "properties": {
      "id": "ZS-49",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Delta Amacuro-Monagas",
      "denominacionOficial": "Zona de Sobreposición de Límites entre los Estados Delta Amacuro-Monagas",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Delta Amacuro-Monagas",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.8689,
        -62.3144
      ],
      "superficieKm2": 205.54,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -62.33032331299431,
            9.712564474132165
          ],
          [
            -62.309479852234325,
            9.748796992037274
          ],
          [
            -62.30157749480846,
            9.770150394073234
          ],
          [
            -62.302514022247394,
            9.77630717578138
          ],
          [
            -62.3095057324046,
            9.789056243017399
          ],
          [
            -62.320404444804474,
            9.799337718665868
          ],
          [
            -62.337131936509664,
            9.811342198025464
          ],
          [
            -62.34905039687606,
            9.824983236717092
          ],
          [
            -62.35852706840596,
            9.849762273869551
          ],
          [
            -62.36053906642846,
            9.867684775556462
          ],
          [
            -62.3570979885126,
            9.86829166231729
          ],
          [
            -62.357054817904526,
            9.878112141886819
          ],
          [
            -62.355333329744255,
            9.88229645755027
          ],
          [
            -62.35671938519299,
            9.88928883172091
          ],
          [
            -62.35600136911159,
            9.89862464328019
          ],
          [
            -62.351275845306645,
            9.902226602881615
          ],
          [
            -62.34956558067342,
            9.925094783731389
          ],
          [
            -62.34193522369738,
            9.934009531525263
          ],
          [
            -62.34214580240421,
            9.937328903773155
          ],
          [
            -62.33851197223285,
            9.944026671379802
          ],
          [
            -62.33076079191891,
            9.945734155346214
          ],
          [
            -62.32570700724664,
            9.944574517520177
          ],
          [
            -62.3270858827427,
            9.952538961882707
          ],
          [
            -62.310286163236256,
            9.960779147379718
          ],
          [
            -62.297956959538006,
            9.95501683534921
          ],
          [
            -62.29433863178414,
            9.954748850330244
          ],
          [
            -62.27276267857631,
            9.959439397967692
          ],
          [
            -62.267485209410545,
            9.955276194567345
          ],
          [
            -62.26097472512646,
            9.944711334856903
          ],
          [
            -62.25669138209381,
            9.92552317913582
          ],
          [
            -62.25537764731193,
            9.90239455386286
          ],
          [
            -62.244526756284685,
            9.879722897256142
          ],
          [
            -62.24509755329098,
            9.850026865901155
          ],
          [
            -62.27795355387241,
            9.790843897641022
          ],
          [
            -62.2828265851357,
            9.765031147774666
          ],
          [
            -62.29442566327845,
            9.729725772289576
          ],
          [
            -62.30549200628921,
            9.722212834661502
          ],
          [
            -62.33032331299431,
            9.712564474132165
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "ZS-50",
    "properties": {
      "id": "ZS-50",
      "codigoINE": "00",
      "codEnt": "00",
      "nombre": "Sobreposición: Anzoátegui-Monagas",
      "denominacionOficial": "Zona sin Jurisdicción Territorial entre los Estados Anzoátegui-Monagas",
      "capital": "No Aplica",
      "region": "Zona en Controversia Limítrofe",
      "estadosInvolucrados": "Anzoátegui-Monagas",
      "poblacion": 0,
      "totalMunicipios": 0,
      "coberturaPromedioRTV": 35,
      "penetracionInternetPromedio": 20,
      "estatus": "CRITICO",
      "center": [
        9.8823,
        -63.9413
      ],
      "superficieKm2": 14.69,
      "esZonaSobreposicion": true,
      "tipoZona": "ZONA_SOBREPOSICION",
      "color": "#ef4444"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -63.91021485845699,
            9.848328774300864
          ],
          [
            -63.925206357625534,
            9.867483019825844
          ],
          [
            -63.931419514000645,
            9.870043738054868
          ],
          [
            -63.933696576728735,
            9.8754913012131
          ],
          [
            -63.93859060795403,
            9.875618957245429
          ],
          [
            -63.941060920325185,
            9.87780298846026
          ],
          [
            -63.94191010738644,
            9.884172706698017
          ],
          [
            -63.9562519204483,
            9.896301081730714
          ],
          [
            -63.975664138821,
            9.899341925751635
          ],
          [
            -63.98036605292281,
            9.905613527092825
          ],
          [
            -63.97745477359115,
            9.904892553634381
          ],
          [
            -63.969569571110874,
            9.908518007028825
          ],
          [
            -63.96088785184676,
            9.909738350469102
          ],
          [
            -63.911190180065226,
            9.87818805373884
          ],
          [
            -63.902330914088424,
            9.860764241261403
          ],
          [
            -63.90421513327854,
            9.854734709587088
          ],
          [
            -63.91021485845699,
            9.848328774300864
          ]
        ]
      ]
    }
  }
]
};
