import { Salon } from '../../data/salonesData';
import { Solicitud } from '../../data/solicitudesData';
import { IpasResult } from './calculator';
import { resolverAsignacionExacta } from './hungarian';

export interface Asignacion {
  solicitud: Solicitud;
  salon: Salon;
  bloque: 'A' | 'B';
  resultadoIpas: IpasResult;
}

export function ejecutarOptimizacionIPAS(solicitudes: Solicitud[], salones: Salon[]): Asignacion[] {
  // 1. Fase de Ceguera / Anonimización
  // En un sistema real de OR, el solver no recibe los nombres ni características identificables, 
  // solo vectores matemáticos para evitar sesgo.
  const solicitudesAnonimizadas = solicitudes.map(s => ({...s, nombrePrograma: 'ENCRIPTADO'}));
  
  // 2. Ejecutar Algoritmo Exacto (Óptimo Global)
  // Reemplaza la heurística Greedy anterior.
  const resultadosExactos = resolverAsignacionExacta(solicitudesAnonimizadas, salones);

  // 3. Decodificación (Re-vincular Nombres)
  const asignaciones: Asignacion[] = resultadosExactos.map(res => {
    const solicitudOriginal = solicitudes.find(s => s.id === res.solicitud.id)!;
    return {
      solicitud: solicitudOriginal,
      salon: res.slot.salon,
      bloque: res.slot.bloque,
      resultadoIpas: res.resultadoIpas
    };
  });

  return asignaciones;
}
