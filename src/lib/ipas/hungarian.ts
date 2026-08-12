import munkres from 'munkres-js';
import { Salon } from '../../data/salonesData';
import { Solicitud } from '../../data/solicitudesData';
import { calcularIPAS, esViable, IpasResult } from './calculator';

// Definimos el slot como un salón en un bloque específico
export interface Slot {
  id: string;
  salon: Salon;
  bloque: 'A' | 'B';
}

export interface OptimizacionResult {
  solicitud: Solicitud;
  slot: Slot;
  resultadoIpas: IpasResult;
}

export function resolverAsignacionExacta(solicitudes: Solicitud[], salones: Salon[]): OptimizacionResult[] {
  // 1. Generar todos los slots disponibles (2 por cada salón)
  const slots: Slot[] = salones.flatMap(salon => [
    { id: `${salon.id}-A`, salon, bloque: 'A' },
    { id: `${salon.id}-B`, salon, bloque: 'B' }
  ]);

  const MAX_COST = 999999;
  
  // 2. Construir la matriz de costos (Minimizar)
  // Como IPAS es para Maximizar (0 a 100+), Costo = MAX_COST - IPAS
  // Si no es viable, Costo = MAX_COST
  const matrix: number[][] = [];

  // Munkres necesita que el número de filas (solicitudes) <= columnas (slots) para encontrar asignaciones perfectas.
  // Si hay más solicitudes que slots, Munkres igual tratará de asignar, pero por si acaso.
  
  for (let i = 0; i < solicitudes.length; i++) {
    const row = [];
    for (let j = 0; j < slots.length; j++) {
      const sol = solicitudes[i];
      const slot = slots[j];
      
      if (esViable(sol, slot.salon)) {
        const ipas = calcularIPAS(sol, slot.salon);
        // Costo = constante base menos el puntaje (para que a mayor IPAS, menor Costo)
        // Aplicamos penalidad de colisión de docentes para el mismo bloque?
        // El Algoritmo Húngaro tradicional no maneja restricciones condicionales "inter-asignaciones".
        // La penalización de colisión de docentes requiere heurística post-optimizacion o ILP.
        // Por ahora, usamos el IPAS puro.
        row.push(1000 - ipas.total); 
      } else {
        row.push(MAX_COST);
      }
    }
    matrix.push(row);
  }

  // Si la matriz está vacía (no hay solicitudes), retornar
  if (matrix.length === 0 || matrix[0].length === 0) return [];

  // 3. Ejecutar algoritmo exacto de Munkres (Kuhn-Munkres / Algoritmo Húngaro)
  const indices = munkres(matrix);

  // 4. Mapear resultados, decodificando los IDs
  const resultados: OptimizacionResult[] = [];
  
  for (let k = 0; k < indices.length; k++) {
    const r = indices[k][0];
    const c = indices[k][1];
    
    // Si el costo era MAX_COST, significa que le asignó un slot no viable (por falta de espacio)
    if (matrix[r][c] >= MAX_COST) continue;

    const sol = solicitudes[r];
    const slot = slots[c];
    
    resultados.push({
      solicitud: sol,
      slot: slot,
      resultadoIpas: calcularIPAS(sol, slot.salon)
    });
  }

  // 5. Post-Procesamiento Heurístico de Colisiones (Fase 4)
  // Como Húngaro es Bipartito puro, validamos colisiones de docente en el mismo bloque
  const docenteBloqueMap = new Map<string, string>(); // 'DocenteID-Bloque' -> 'SolicitudID'
  const resultadosSeguros: OptimizacionResult[] = [];

  for (const res of resultados) {
    if (res.solicitud.docenteId) {
      const key = `${res.solicitud.docenteId}-${res.slot.bloque}`;
      if (docenteBloqueMap.has(key)) {
        // Colisión detectada. El óptimo global falló una restricción de capacidad transversal.
        // En un modelo real ILP esto se restringe matemáticamente. Aquí lo descartamos/reubicamos.
        // Por simplicidad en este prototipo, simplemente no se aprueba esta asignación o se asume penalizada.
        continue;
      }
      docenteBloqueMap.set(key, res.solicitud.id);
    }
    resultadosSeguros.push(res);
  }

  return resultadosSeguros;
}
