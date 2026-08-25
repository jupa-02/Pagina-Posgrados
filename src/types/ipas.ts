export interface Salon {
  id: string;
  nombre: string;
  sede: string;
  capacidad: number;
  tieneProyector: boolean;
  esSalaComputo: boolean;
}

export interface Solicitud {
  id: string;
  nombrePrograma: string;
  estudiantes: number;
  reqProyector: boolean;
  reqStreaming: boolean;
  reqSoftware: boolean;
  tieneDocenteInvitado: boolean;
  docenteForaneoPuntos: number;
  docenteId?: string;
  fechaInicioDocente?: string;
  fechaFinDocente?: string;
  modalidadDocente?: string;
  franjaHorariaPuntos: number;
  nivelFormacion: string;
  reqAccesibilidad: boolean;
  tipoAccesibilidad: string;
}
