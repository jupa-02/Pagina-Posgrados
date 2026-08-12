import { Salon } from '../../data/salonesData';
import { Solicitud } from '../../data/solicitudesData';

export function calcularIOA(C: number, E: number): number {
  if (C === 0) return 0;
  return (1 - Math.abs((C - E) / C)) * 100;
}

// Nueva formula ICT específica
export function calcularICT(salon: Salon, solicitud: Solicitud): number {
  let score = 100;
  // Si sobra streaming y no lo pidieron, penalizamos 10 pts
  if (salon.techStreaming && !solicitud.reqStreaming) score -= 10;
  // Si sobra software y no lo pidieron, penalizamos 20 pts (licencias son caras)
  if (salon.techSoftware && !solicitud.reqSoftware) score -= 20;
  
  return Math.max(0, score);
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
  const ict = calcularICT(salon, solicitud);
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
  
  // 2. Accesibilidad Experta
  if (solicitud.reqAccesibilidad) {
    if (solicitud.tipoAccesibilidad === 'Silla de Ruedas') {
      // El salón debe estar en 1ra planta O tener rampa O tener ascensor
      if (!salon.esPrimeraPlanta && !salon.tieneRampa && !salon.tieneAscensor) {
        return false;
      }
      // Adicionalmente, si NO es 1ra planta, DEBE tener ascensor (rampa sola no basta para pisos altos)
      if (!salon.esPrimeraPlanta && !salon.tieneAscensor) {
        return false;
      }
    }
    if (solicitud.tipoAccesibilidad === 'Solo Primera Planta' && !salon.esPrimeraPlanta) {
      return false;
    }
  }

  // 3. Tecnología Específica (Hard constraint: si pide X, DEBE tener X)
  if (solicitud.reqProyector && !salon.techProyector) return false;
  if (solicitud.reqStreaming && !salon.techStreaming) return false;
  if (solicitud.reqSoftware && !salon.techSoftware) return false;

  return true;
}
