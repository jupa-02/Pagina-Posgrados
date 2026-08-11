import { Salon } from '../../data/salonesData';
import { Solicitud } from '../../data/solicitudesData';

export function calcularIOA(C: number, E: number): number {
  if (C === 0) return 0;
  return (1 - Math.abs((C - E) / C)) * 100;
}

export function calcularICT(salonValor: number, requerido: boolean): number {
  if (requerido) {
    return 100;
  } else {
    // Penalize assigning high tech rooms to programs that don't need it
    // If salonValor is 9 (max), score is 10. If 1 (min), score is 90.
    return 100 - (salonValor * 10);
  }
}

export function calcularFAP(nivelFormacion: string, tipoSalon: string): number {
  if (nivelFormacion === 'Doctorado' && tipoSalon === 'Seminario') return 100;
  if ((nivelFormacion === 'Maestría' || nivelFormacion === 'Especialización') && tipoSalon === 'Magistral') return 100;
  return 50; // Desajuste
}

export interface IpasResult {
  ioa: number;
  ict: number;
  fide: number;
  idh: number;
  fap: number;
  total: number;
}

export function calcularIPAS(solicitud: Solicitud, salon: Salon): IpasResult {
  const ioa = calcularIOA(salon.capacidad, solicitud.E);
  const ict = calcularICT(salon.tecnologiaValor, solicitud.tecnologiaRequerida);
  const fide = solicitud.docenteForaneoPuntos;
  const idh = solicitud.franjaHorariaPuntos;
  const fap = calcularFAP(solicitud.nivelFormacion, salon.tipo);

  const total = (0.30 * ioa) + (0.30 * ict) + (0.15 * fide) + (0.15 * idh) + (0.10 * fap);

  return { ioa, ict, fide, idh, fap, total };
}

export function esViable(solicitud: Solicitud, salon: Salon): boolean {
  // Fase 2: Aplicación de Restricciones Duras
  // 1. Aforo
  if (solicitud.E > salon.capacidad) return false;
  
  // 2. Accesibilidad (Multiplicador absoluto / restricción)
  if (solicitud.requiereAccesibilidad && !salon.esPrimeraPlanta) return false;

  // 3. Tecnología dura (si pide, el salón debe tener al menos algo más que lo básico, V_i > 1)
  if (solicitud.tecnologiaRequerida && salon.tecnologiaValor <= 1) return false;

  return true;
}
