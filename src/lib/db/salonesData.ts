import { Salon } from '@/types/ipas';

// Lista de los 24 salones de Posgrados (Agosto 2026) extraídos del documento oficial
export const mockSalones: Salon[] = [
  // SEDE LA MERCED
  { id: 'MER-210', nombre: 'Salón 210', sede: 'La Merced', capacidad: 22, tieneProyector: true, esSalaComputo: false },
  { id: 'MER-211', nombre: 'Salón 211', sede: 'La Merced', capacidad: 20, tieneProyector: true, esSalaComputo: false },
  { id: 'MER-212', nombre: 'Salón 212', sede: 'La Merced', capacidad: 18, tieneProyector: true, esSalaComputo: false },
  { id: 'MER-213', nombre: 'Salón 213', sede: 'La Merced', capacidad: 35, tieneProyector: true, esSalaComputo: false },
  
  // SEDE SAN AGUSTÍN
  { id: 'SAG-301', nombre: 'Salón 301', sede: 'San Agustín', capacidad: 35, tieneProyector: true, esSalaComputo: false },
  { id: 'SAG-311', nombre: 'Salón 311', sede: 'San Agustín', capacidad: 15, tieneProyector: true, esSalaComputo: false },
  { id: 'SAG-326', nombre: 'Salón 326', sede: 'San Agustín', capacidad: 35, tieneProyector: true, esSalaComputo: false },
  { id: 'SAG-337', nombre: 'Salón 337 - Falsa Borda', sede: 'San Agustín', capacidad: 50, tieneProyector: true, esSalaComputo: false },

  // SEDE CASA CUARTEL
  { id: 'CCU-206', nombre: 'Salón 206', sede: 'Casa Cuartel', capacidad: 9, tieneProyector: false, esSalaComputo: false },
  { id: 'CCU-204', nombre: 'Salón 204', sede: 'Casa Cuartel', capacidad: 38, tieneProyector: true, esSalaComputo: false },
  { id: 'CCU-303', nombre: 'Salón 303', sede: 'Casa Cuartel', capacidad: 45, tieneProyector: true, esSalaComputo: false },
  { id: 'CCU-304', nombre: 'Salón 304', sede: 'Casa Cuartel', capacidad: 40, tieneProyector: true, esSalaComputo: false },
  { id: 'CCU-305', nombre: 'Salón 305', sede: 'Casa Cuartel', capacidad: 9, tieneProyector: false, esSalaComputo: false },
  { id: 'CCU-306', nombre: 'Salón 306', sede: 'Casa Cuartel', capacidad: 34, tieneProyector: false, esSalaComputo: false },

  // SEDE PIEDRA DE BOLÍVAR
  { id: 'PDB-MULA', nombre: 'Multimedia A', sede: 'Piedra de Bolívar', capacidad: 19, tieneProyector: true, esSalaComputo: true },
  { id: 'PDB-MULB', nombre: 'Multimedia B', sede: 'Piedra de Bolívar', capacidad: 24, tieneProyector: true, esSalaComputo: true },
  { id: 'PDB-IVOD', nombre: 'Ivonne Durán', sede: 'Piedra de Bolívar', capacidad: 40, tieneProyector: true, esSalaComputo: false },
  { id: 'PDB-DIES1', nombre: 'DIES N1', sede: 'Piedra de Bolívar', capacidad: 10, tieneProyector: false, esSalaComputo: false },
  { id: 'PDB-DIES2', nombre: 'DIES N2', sede: 'Piedra de Bolívar', capacidad: 10, tieneProyector: false, esSalaComputo: false },
  { id: 'PDB-OBSF', nombre: 'Observatorio Financiero', sede: 'Piedra de Bolívar', capacidad: 36, tieneProyector: true, esSalaComputo: true },
  { id: 'PDB-A101', nombre: 'Aula A101', sede: 'Piedra de Bolívar', capacidad: 40, tieneProyector: true, esSalaComputo: false },
  { id: 'PDB-A102', nombre: 'Aula A102', sede: 'Piedra de Bolívar', capacidad: 40, tieneProyector: true, esSalaComputo: false },

  // SEDE ZARAGOCILLA
  { id: 'ZAR-204A', nombre: 'Aula 204A', sede: 'Zaragocilla', capacidad: 40, tieneProyector: true, esSalaComputo: false },
  { id: 'ZAR-204B', nombre: 'Aula 204B', sede: 'Zaragocilla', capacidad: 40, tieneProyector: true, esSalaComputo: false },
];

export const salonesData = process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT !== 'true' 
  ? [] 
  : mockSalones;
