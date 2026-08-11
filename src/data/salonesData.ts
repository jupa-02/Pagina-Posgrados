export interface Salon {
  id: string;
  nombre: string;
  capacidad: number; // C
  tecnologiaValor: number; // V_i (1: Proyector, 3: Streaming, 5: Software. Total max 9)
  tipo: 'Seminario' | 'Magistral';
  esPrimeraPlanta: boolean;
}

export const SALONES_DB: Salon[] = [
  { id: "S1", nombre: "Salón Magistral 101", capacidad: 40, tecnologiaValor: 1, tipo: 'Magistral', esPrimeraPlanta: true },
  { id: "S2", nombre: "Auditorio Principal", capacidad: 100, tecnologiaValor: 9, tipo: 'Magistral', esPrimeraPlanta: true },
  { id: "S3", nombre: "Sala de Cómputo Avanzado", capacidad: 30, tecnologiaValor: 5, tipo: 'Seminario', esPrimeraPlanta: false },
  { id: "S4", nombre: "Salón Híbrido 201", capacidad: 35, tecnologiaValor: 4, tipo: 'Magistral', esPrimeraPlanta: false },
  { id: "S5", nombre: "Sala de Seminarios A", capacidad: 20, tecnologiaValor: 4, tipo: 'Seminario', esPrimeraPlanta: true },
  { id: "S6", nombre: "Sala de Seminarios B", capacidad: 20, tecnologiaValor: 1, tipo: 'Seminario', esPrimeraPlanta: false },
  { id: "S7", nombre: "Salón Magistral 202", capacidad: 45, tecnologiaValor: 1, tipo: 'Magistral', esPrimeraPlanta: false },
  { id: "S8", nombre: "Salón Híbrido 301", capacidad: 50, tecnologiaValor: 4, tipo: 'Magistral', esPrimeraPlanta: false },
  { id: "S9", nombre: "Sala de Reuniones", capacidad: 15, tecnologiaValor: 1, tipo: 'Seminario', esPrimeraPlanta: true },
  { id: "S10", nombre: "Salón Magistral 302", capacidad: 40, tecnologiaValor: 1, tipo: 'Magistral', esPrimeraPlanta: false },
];
