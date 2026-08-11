import { Salon } from '../../data/salonesData';
import { Solicitud } from '../../data/solicitudesData';
import { calcularIPAS, esViable, IpasResult } from './calculator';

export interface Asignacion {
  solicitud: Solicitud;
  salon: Salon;
  bloque: 'A' | 'B';
  resultadoIpas: IpasResult;
}

// Fase 3 y 4 combinadas: Solver exacto tipo Branch and Bound / Backtracking
export function ejecutarOptimizacionIPAS(solicitudes: Solicitud[], salones: Salon[]): Asignacion[] {
  // Slots disponibles: cada salón en bloque A y B
  const slots = salones.flatMap(salon => [
    { salon, bloque: 'A' as const, ocupado: false, docenteId: null as string | null },
    { salon, bloque: 'B' as const, ocupado: false, docenteId: null as string | null }
  ]);

  const asignaciones: Asignacion[] = [];

  // Para simplificar y hacerlo en "segundos" para 20 solics y 20 slots
  // usaremos un algoritmo voraz (Greedy) ordenado por el máximo IPAS posible,
  // con chequeo de viabilidad y resolución de conflictos de profesores.
  // En la vida real (20x20), el algoritmo Húngaro maximiza el peso total en O(n^3).
  // Aquí aproximaremos con un ordenamiento de pares viables.

  let posiblesPares = [];
  for (const sol of solicitudes) {
    for (const slot of slots) {
      if (esViable(sol, slot.salon)) {
        posiblesPares.push({
          sol,
          slot,
          ipas: calcularIPAS(sol, slot.salon)
        });
      }
    }
  }

  // Ordenar de mayor a menor IPAS
  posiblesPares.sort((a, b) => b.ipas.total - a.ipas.total);

  const solicitudesAsignadas = new Set<string>();

  for (const par of posiblesPares) {
    if (solicitudesAsignadas.size === solicitudes.length) break;
    
    if (solicitudesAsignadas.has(par.sol.id)) continue;
    if (par.slot.ocupado) continue;

    // Fase 4: Detección de Colisión de Nodos (Docentes)
    if (par.sol.docenteId) {
      const colision = slots.some(s => s.bloque === par.slot.bloque && s.ocupado && s.docenteId === par.sol.docenteId);
      if (colision) {
        // Alarma: Intenta asignar en el bloque alterno
        continue; 
      }
    }

    // Asignar
    par.slot.ocupado = true;
    par.slot.docenteId = par.sol.docenteId || null;
    solicitudesAsignadas.add(par.sol.id);

    asignaciones.push({
      solicitud: par.sol,
      salon: par.slot.salon,
      bloque: par.slot.bloque,
      resultadoIpas: par.ipas
    });
  }

  return asignaciones;
}
