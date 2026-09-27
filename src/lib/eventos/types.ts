export interface Evento {
  id: string;
  nombre: string;
  descripcion?: string;
  lugar?: string;
  fecha: string;
  organizador?: string;
  activo: boolean;
}

export interface Asistente {
  id: string;
  evento_id: string;
  nombre: string;
  documento: string; // Cédula o Código Estudiantil
  correo: string;
  programa?: string; // Programa de posgrado / pregrado
  ticket_token: string;
  estado_asistencia: "no_asistio" | "asistio";
  fecha_asistencia: string | null;
  metodo_asistencia: "qr_scanner" | "manual_staff" | null;
  estado_correo: "pendiente" | "enviado" | "fallido";
  fecha_registro: string;
}

export interface CheckInResponse {
  valido: boolean;
  estado: "SUCCESS" | "ALREADY_CHECKED_IN" | "INVALID_TICKET" | "NOT_FOUND";
  mensaje: string;
  asistente?: {
    id: string;
    nombre: string;
    documento: string;
    correo: string;
    programa?: string;
    fecha_asistencia?: string | null;
  };
  fecha_anterior?: string | null;
}

export interface EstadisticasEvento {
  total_inscritos: number;
  total_asistieron: number;
  total_pendientes: number;
  porcentaje_asistencia: number;
}
