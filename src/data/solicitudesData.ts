export interface Solicitud {
  id: string;
  programaId: string;
  nombrePrograma: string;
  E: number; // Estudiantes matriculados
  tecnologiaRequerida: boolean; // R_i
  docenteForaneoPuntos: number; // FIDE (100, 50, 0)
  franjaHorariaPuntos: number; // IDH (100: Valle, 50: Media, 0: Pico)
  nivelFormacion: 'Doctorado' | 'Maestría' | 'Especialización';
  requiereAccesibilidad: boolean;
  // Optional: para simular colisiones
  docenteId?: string;
}

// 20 solicitudes simuladas
export const SOLICITUDES_DB: Solicitud[] = Array.from({ length: 20 }).map((_, i) => {
  const index = i + 1;
  return {
    id: `REQ-${index}`,
    programaId: `${index}`,
    nombrePrograma: `Programa ${index}`,
    E: Math.floor(Math.random() * (45 - 15 + 1) + 15), // 15 a 45 estudiantes
    tecnologiaRequerida: Math.random() > 0.5,
    docenteForaneoPuntos: [0, 50, 100][Math.floor(Math.random() * 3)],
    franjaHorariaPuntos: [0, 50, 100][Math.floor(Math.random() * 3)],
    nivelFormacion: ['Doctorado', 'Maestría', 'Especialización'][Math.floor(Math.random() * 3)] as 'Doctorado' | 'Maestría' | 'Especialización',
    requiereAccesibilidad: Math.random() > 0.9, // 10% probabilidad
    docenteId: Math.random() > 0.8 ? `Prof-${Math.floor(Math.random() * 5)}` : undefined // Algunos profes se repiten para forzar colisiones
  };
});
