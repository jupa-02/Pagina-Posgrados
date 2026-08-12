export interface Salon {
  id: string;
  nombre: string;
  capacidad: number; // C
  
  // Specific Technological Capabilities
  techProyector: boolean;
  techStreaming: boolean;
  techSoftware: boolean;
  
  tipo: 'Seminario' | 'Magistral';
  
  // Specific Accessibility Capabilities
  esPrimeraPlanta: boolean;
  tieneRampa: boolean;
  tieneAscensor: boolean;
}

const mockSalones: Salon[] = [
  { id: "S1", nombre: "Salón Magistral 101", capacidad: 40, techProyector: true, techStreaming: false, techSoftware: false, tipo: 'Magistral', esPrimeraPlanta: true, tieneRampa: true, tieneAscensor: false },
  { id: "S2", nombre: "Auditorio Principal", capacidad: 100, techProyector: true, techStreaming: true, techSoftware: true, tipo: 'Magistral', esPrimeraPlanta: true, tieneRampa: true, tieneAscensor: true },
  { id: "S3", nombre: "Sala de Cómputo Avanzado", capacidad: 30, techProyector: true, techStreaming: false, techSoftware: true, tipo: 'Seminario', esPrimeraPlanta: false, tieneRampa: false, tieneAscensor: true },
  { id: "S4", nombre: "Salón Híbrido 201", capacidad: 35, techProyector: true, techStreaming: true, techSoftware: false, tipo: 'Magistral', esPrimeraPlanta: false, tieneRampa: false, tieneAscensor: true },
  { id: "S5", nombre: "Sala de Seminarios A", capacidad: 20, techProyector: true, techStreaming: true, techSoftware: false, tipo: 'Seminario', esPrimeraPlanta: true, tieneRampa: true, tieneAscensor: false },
  { id: "S6", nombre: "Sala de Seminarios B", capacidad: 20, techProyector: true, techStreaming: false, techSoftware: false, tipo: 'Seminario', esPrimeraPlanta: false, tieneRampa: false, tieneAscensor: false },
  { id: "S7", nombre: "Salón Magistral 202", capacidad: 45, techProyector: true, techStreaming: false, techSoftware: false, tipo: 'Magistral', esPrimeraPlanta: false, tieneRampa: false, tieneAscensor: true },
  { id: "S8", nombre: "Salón Híbrido 301", capacidad: 50, techProyector: true, techStreaming: true, techSoftware: false, tipo: 'Magistral', esPrimeraPlanta: false, tieneRampa: false, tieneAscensor: true },
  { id: "S9", nombre: "Sala de Reuniones", capacidad: 15, techProyector: true, techStreaming: false, techSoftware: false, tipo: 'Seminario', esPrimeraPlanta: true, tieneRampa: true, tieneAscensor: false },
  { id: "S10", nombre: "Salón Magistral 302", capacidad: 40, techProyector: true, techStreaming: false, techSoftware: false, tipo: 'Magistral', esPrimeraPlanta: false, tieneRampa: false, tieneAscensor: false },
];

export const SALONES_DB: Salon[] = mockSalones;
