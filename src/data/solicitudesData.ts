export interface Solicitud {
  id: string;
  programaId: string;
  nombrePrograma: string;
  E: number; // Estudiantes matriculados
  
  // Specific Tech Requirements
  reqProyector: boolean;
  reqStreaming: boolean;
  reqSoftware: boolean;
  
  // Teacher temporal info
  tieneDocenteInvitado: boolean;
  docenteForaneoPuntos: number; // FIDE (100, 50, 0)
  fechaInicioDocente?: string;
  fechaFinDocente?: string;
  modalidadDocente?: 'Presencial' | 'Virtual' | 'Híbrida';

  franjaHorariaPuntos: number; // IDH (100: Valle, 50: Media, 0: Pico)
  nivelFormacion: 'Doctorado' | 'Maestría' | 'Especialización';
  
  // Specific Accessibility
  reqAccesibilidad: boolean;
  tipoAccesibilidad: 'Ninguna' | 'Silla de Ruedas' | 'Solo Primera Planta';

  docenteId?: string;
}

// 20 solicitudes DETERMINÍSTICAS para evitar hydration mismatch en SSR/CSR
const mockSolicitudes: Solicitud[] = [
  { id: 'REQ-1', programaId: '1', nombrePrograma: 'Doctorado en Administración', E: 18, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, fechaInicioDocente: '2026-09-01', fechaFinDocente: '2026-09-15', modalidadDocente: 'Presencial', franjaHorariaPuntos: 100, nivelFormacion: 'Doctorado', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna', docenteId: 'Prof-1' },
  { id: 'REQ-2', programaId: '2', nombrePrograma: 'Maestría en Gestión de Organizaciones', E: 35, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, franjaHorariaPuntos: 0, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-3', programaId: '3', nombrePrograma: 'Maestría en Desarrollo Territorial', E: 28, reqProyector: true, reqStreaming: true, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, fechaInicioDocente: '2026-09-05', fechaFinDocente: '2026-09-10', modalidadDocente: 'Híbrida', franjaHorariaPuntos: 50, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-4', programaId: '4', nombrePrograma: 'Esp. en Finanzas', E: 42, reqProyector: true, reqStreaming: false, reqSoftware: true, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, franjaHorariaPuntos: 0, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-5', programaId: '5', nombrePrograma: 'Esp. en Gestión Pública', E: 30, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 50, fechaInicioDocente: '2026-10-01', fechaFinDocente: '2026-10-05', modalidadDocente: 'Presencial', franjaHorariaPuntos: 100, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-6', programaId: '6', nombrePrograma: 'Maestría en Economía', E: 22, reqProyector: true, reqStreaming: false, reqSoftware: true, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, fechaInicioDocente: '2026-09-08', fechaFinDocente: '2026-09-20', modalidadDocente: 'Presencial', franjaHorariaPuntos: 50, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna', docenteId: 'Prof-2' },
  { id: 'REQ-7', programaId: '7', nombrePrograma: 'Doctorado en Ciencias Económicas', E: 15, reqProyector: true, reqStreaming: true, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, fechaInicioDocente: '2026-09-01', fechaFinDocente: '2026-09-30', modalidadDocente: 'Virtual', franjaHorariaPuntos: 100, nivelFormacion: 'Doctorado', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna', docenteId: 'Prof-1' },
  { id: 'REQ-8', programaId: '8', nombrePrograma: 'Esp. en Gerencia del Talento Humano', E: 38, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, franjaHorariaPuntos: 0, nivelFormacion: 'Especialización', reqAccesibilidad: true, tipoAccesibilidad: 'Silla de Ruedas' },
  { id: 'REQ-9', programaId: '9', nombrePrograma: 'Maestría en Tributación', E: 25, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, franjaHorariaPuntos: 100, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-10', programaId: '10', nombrePrograma: 'Esp. en Revisoría Fiscal y Auditoría', E: 20, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 50, fechaInicioDocente: '2026-10-10', fechaFinDocente: '2026-10-12', modalidadDocente: 'Presencial', franjaHorariaPuntos: 50, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-11', programaId: '11', nombrePrograma: 'Maestría en Admin. de Empresas (MBA)', E: 40, reqProyector: true, reqStreaming: true, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, fechaInicioDocente: '2026-09-12', fechaFinDocente: '2026-09-18', modalidadDocente: 'Híbrida', franjaHorariaPuntos: 0, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-12', programaId: '12', nombrePrograma: 'Esp. en Gerencia de Proyectos', E: 33, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, franjaHorariaPuntos: 100, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-13', programaId: '13', nombrePrograma: 'Doctorado en Ciencias Administrativas', E: 12, reqProyector: true, reqStreaming: false, reqSoftware: true, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, fechaInicioDocente: '2026-09-20', fechaFinDocente: '2026-10-05', modalidadDocente: 'Presencial', franjaHorariaPuntos: 100, nivelFormacion: 'Doctorado', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-14', programaId: '14', nombrePrograma: 'Esp. en Contabilidad Internacional', E: 27, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, franjaHorariaPuntos: 50, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-15', programaId: '15', nombrePrograma: 'Maestría en Ciencias Contables', E: 19, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 50, fechaInicioDocente: '2026-10-15', fechaFinDocente: '2026-10-18', modalidadDocente: 'Presencial', franjaHorariaPuntos: 100, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-16', programaId: '16', nombrePrograma: 'Esp. en Comercio Internacional', E: 30, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, franjaHorariaPuntos: 0, nivelFormacion: 'Especialización', reqAccesibilidad: true, tipoAccesibilidad: 'Solo Primera Planta' },
  { id: 'REQ-17', programaId: '17', nombrePrograma: 'Maestría en Proyectos de Inversión', E: 24, reqProyector: true, reqStreaming: true, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, fechaInicioDocente: '2026-09-22', fechaFinDocente: '2026-09-28', modalidadDocente: 'Virtual', franjaHorariaPuntos: 50, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-18', programaId: '18', nombrePrograma: 'Esp. en Derecho Tributario', E: 36, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, franjaHorariaPuntos: 100, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-19', programaId: '19', nombrePrograma: 'Maestría en Finanzas Cuantitativas', E: 16, reqProyector: true, reqStreaming: false, reqSoftware: true, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, fechaInicioDocente: '2026-10-01', fechaFinDocente: '2026-10-15', modalidadDocente: 'Presencial', franjaHorariaPuntos: 100, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-20', programaId: '20', nombrePrograma: 'Esp. en Marketing Digital', E: 29, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, franjaHorariaPuntos: 50, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
];

export const SOLICITUDES_DB: Solicitud[] = mockSolicitudes;
