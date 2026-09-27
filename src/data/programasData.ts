import { CURSOS_EDUCACION_CONTINUA, CursoEducacionContinua } from './cursosEducacionContinua';

export interface ProgramaData {
  id: string;
  codigo?: string;
  titulo: string;
  categoria: string;
  areaKey?: string;
  modalidad: string;
  duracion: string;
  facultad: string;
  sede?: string;
  imagen: string;
  descripcion: string;
  perfilEgresado: string;
  inversion: string;
  inversionEmpresa?: string;
  docente?: string;
  programaOrigen?: string;
  competencias?: string[];
  creditosAcademicos?: number;
  creditosEmpresa?: number;
  proximoInicio?: string;
  roles?: string[];
}

function getImageForArea(areaKey?: string): string {
  switch (areaKey) {
    case 'salud':
      return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
    case 'finanzas':
      return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
    case 'revisoria':
      return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
    case 'organizaciones':
      return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
    case 'gestion':
    default:
      return 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  }
}

export const PROGRAMAS_DB: Record<string, ProgramaData> = {};

CURSOS_EDUCACION_CONTINUA.forEach((curso) => {
  PROGRAMAS_DB[curso.id] = {
    id: curso.id,
    codigo: curso.codigo,
    titulo: curso.titulo,
    categoria: curso.area,
    areaKey: curso.areaKey,
    modalidad: curso.modalidad,
    duracion: `${curso.duracionHoras} Horas Académicas (${curso.creditosAcademicos} Créditos)`,
    facultad: 'Facultad de Ciencias Económicas',
    sede: curso.sede,
    imagen: getImageForArea(curso.areaKey),
    descripcion: curso.descripcion,
    perfilEgresado: curso.perfilDirigido,
    inversion: `${curso.inversionIndividual} (o ${curso.inversionEmpresaCreditos})`,
    inversionEmpresa: curso.inversionEmpresaCreditos,
    docente: curso.docente,
    programaOrigen: curso.programaOrigen,
    competencias: curso.competencias,
    creditosAcademicos: curso.creditosAcademicos,
    creditosEmpresa: curso.creditosEmpresa,
    proximoInicio: curso.proximoInicio,
    roles: [
      curso.area,
      curso.docente,
      `${curso.creditosAcademicos} Créditos`,
      curso.sede
    ]
  };
});

export const CATALOGO_PROGRAMAS = Object.values(PROGRAMAS_DB).map((p) => ({
  id: p.id,
  codigo: p.codigo,
  titulo: p.titulo,
  categoria: p.categoria,
  areaKey: p.areaKey,
  facultad: p.facultad,
  sede: p.sede,
  modalidad: p.modalidad || 'Híbrida',
  duracion: p.duracion,
  inversion: p.inversion,
  inversionEmpresa: p.inversionEmpresa,
  docente: p.docente || 'Claustro Docente FCE',
  programaOrigen: p.programaOrigen,
  competencias: p.competencias,
  creditosAcademicos: p.creditosAcademicos,
  creditosEmpresa: p.creditosEmpresa,
  proximoInicio: p.proximoInicio,
  roles: p.roles || []
}));

export const FACULTY_CAMPUS_MAP: Record<string, string> = {
  'Facultad de Ciencias Económicas': 'Campus Piedra de Bolívar',
  'Campus Piedra de Bolívar (Cartagena)': 'Campus Piedra de Bolívar',
  'Sede Magangué (Bolívar)': 'Sede Magangué',
};

export function getCampusName(facultadOrSede?: string) {
  if (!facultadOrSede) return 'Campus Piedra de Bolívar';
  if (facultadOrSede.includes('Magangué') || facultadOrSede.includes('Magangue')) {
    return 'Sede Magangué (Bolívar)';
  }
  return 'Campus Piedra de Bolívar (Cartagena)';
}
