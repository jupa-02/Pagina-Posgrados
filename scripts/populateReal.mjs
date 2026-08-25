import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { readFileSync } from 'fs';

console.log("Reading env vars...");
const env = readFileSync('.env.local', 'utf-8');
const envVars = Object.fromEntries(
  env.split('\n')
     .filter(line => line.includes('='))
     .map(line => {
       const [key, ...rest] = line.split('=');
       let val = rest.join('=');
       if (val.startsWith('"') && val.endsWith('"')) {
         val = val.slice(1, -1);
       }
       return [key.trim(), val.trim()];
     })
);

console.log("Setting up JWT...");
const serviceAccountAuth = new JWT({
  email: envVars.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: envVars.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(envVars.GOOGLE_SHEET_ID, serviceAccountAuth);

const mockSalones = [
  { id: 'MER-210', nombre: 'Salón 210', sede: 'La Merced', capacidad: 22, tieneProyector: true, esSalaComputo: false },
  { id: 'MER-211', nombre: 'Salón 211', sede: 'La Merced', capacidad: 20, tieneProyector: true, esSalaComputo: false },
  { id: 'MER-212', nombre: 'Salón 212', sede: 'La Merced', capacidad: 18, tieneProyector: true, esSalaComputo: false },
  { id: 'MER-213', nombre: 'Salón 213', sede: 'La Merced', capacidad: 35, tieneProyector: true, esSalaComputo: false },
  { id: 'SAG-301', nombre: 'Salón 301', sede: 'San Agustín', capacidad: 35, tieneProyector: true, esSalaComputo: false },
  { id: 'SAG-311', nombre: 'Salón 311', sede: 'San Agustín', capacidad: 15, tieneProyector: true, esSalaComputo: false },
  { id: 'SAG-326', nombre: 'Salón 326', sede: 'San Agustín', capacidad: 35, tieneProyector: true, esSalaComputo: false },
  { id: 'SAG-337', nombre: 'Salón 337 - Falsa Borda', sede: 'San Agustín', capacidad: 50, tieneProyector: true, esSalaComputo: false },
  { id: 'CCU-206', nombre: 'Salón 206', sede: 'Casa Cuartel', capacidad: 9, tieneProyector: false, esSalaComputo: false },
  { id: 'CCU-204', nombre: 'Salón 204', sede: 'Casa Cuartel', capacidad: 38, tieneProyector: true, esSalaComputo: false },
  { id: 'CCU-303', nombre: 'Salón 303', sede: 'Casa Cuartel', capacidad: 45, tieneProyector: true, esSalaComputo: false },
  { id: 'CCU-304', nombre: 'Salón 304', sede: 'Casa Cuartel', capacidad: 40, tieneProyector: true, esSalaComputo: false },
  { id: 'CCU-305', nombre: 'Salón 305', sede: 'Casa Cuartel', capacidad: 9, tieneProyector: false, esSalaComputo: false },
  { id: 'CCU-306', nombre: 'Salón 306', sede: 'Casa Cuartel', capacidad: 34, tieneProyector: false, esSalaComputo: false },
  { id: 'PDB-MULA', nombre: 'Multimedia A', sede: 'Piedra de Bolívar', capacidad: 19, tieneProyector: true, esSalaComputo: true },
  { id: 'PDB-MULB', nombre: 'Multimedia B', sede: 'Piedra de Bolívar', capacidad: 24, tieneProyector: true, esSalaComputo: true },
  { id: 'PDB-IVOD', nombre: 'Ivonne Durán', sede: 'Piedra de Bolívar', capacidad: 40, tieneProyector: true, esSalaComputo: false },
  { id: 'PDB-DIES1', nombre: 'DIES N1', sede: 'Piedra de Bolívar', capacidad: 10, tieneProyector: false, esSalaComputo: false },
  { id: 'PDB-DIES2', nombre: 'DIES N2', sede: 'Piedra de Bolívar', capacidad: 10, tieneProyector: false, esSalaComputo: false },
  { id: 'PDB-OBSF', nombre: 'Observatorio Financiero', sede: 'Piedra de Bolívar', capacidad: 36, tieneProyector: true, esSalaComputo: true },
  { id: 'PDB-A101', nombre: 'Aula A101', sede: 'Piedra de Bolívar', capacidad: 40, tieneProyector: true, esSalaComputo: false },
  { id: 'PDB-A102', nombre: 'Aula A102', sede: 'Piedra de Bolívar', capacidad: 40, tieneProyector: true, esSalaComputo: false },
  { id: 'ZAR-204A', nombre: 'Aula 204A', sede: 'Zaragocilla', capacidad: 40, tieneProyector: true, esSalaComputo: false },
  { id: 'ZAR-204B', nombre: 'Aula 204B', sede: 'Zaragocilla', capacidad: 40, tieneProyector: true, esSalaComputo: false }
];

const mockSolicitudes = [
  { id: 'REQ-AUD52-01', nombrePrograma: 'Auditoría en Salud - Cohorte 52', estudiantes: 12, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, docenteId: 'Freddy Gómez', fechaInicioDocente: '2026-08-14', fechaFinDocente: '2026-08-15', modalidadDocente: 'Presencial', franjaHorariaPuntos: 80, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-AUD52-02', nombrePrograma: 'Auditoría en Salud - Cohorte 52', estudiantes: 12, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Docente Local', fechaInicioDocente: '2026-09-04', fechaFinDocente: '2026-09-05', modalidadDocente: 'Presencial', franjaHorariaPuntos: 80, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-AUD51-01', nombrePrograma: 'Auditoría en Salud - Cohorte 51', estudiantes: 15, reqProyector: true, reqStreaming: true, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Docente Titular', fechaInicioDocente: '2026-08-21', fechaFinDocente: '2026-08-22', modalidadDocente: 'Híbrida', franjaHorariaPuntos: 70, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-DFA-01', nombrePrograma: 'Diplomado Finanzas Avanzadas', estudiantes: 25, reqProyector: true, reqStreaming: false, reqSoftware: true, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Experto Financiero 1', fechaInicioDocente: '2026-09-11', fechaFinDocente: '2026-09-12', modalidadDocente: 'Presencial', franjaHorariaPuntos: 50, nivelFormacion: 'Diplomado', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-DFA-02', nombrePrograma: 'Diplomado Finanzas Avanzadas', estudiantes: 25, reqProyector: true, reqStreaming: false, reqSoftware: true, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, docenteId: 'Experto Financiero 2', fechaInicioDocente: '2026-10-16', fechaFinDocente: '2026-10-17', modalidadDocente: 'Presencial', franjaHorariaPuntos: 50, nivelFormacion: 'Diplomado', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-FIN52-01', nombrePrograma: 'Especialización Finanzas - Cohorte 52', estudiantes: 30, reqProyector: true, reqStreaming: false, reqSoftware: true, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Docente Finanzas A', fechaInicioDocente: '2026-08-07', fechaFinDocente: '2026-08-08', modalidadDocente: 'Presencial', franjaHorariaPuntos: 90, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-FIN52-02', nombrePrograma: 'Especialización Finanzas - Cohorte 52', estudiantes: 30, reqProyector: true, reqStreaming: true, reqSoftware: true, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Docente Finanzas B', fechaInicioDocente: '2026-09-18', fechaFinDocente: '2026-09-19', modalidadDocente: 'Híbrida', franjaHorariaPuntos: 90, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-FIN53-01', nombrePrograma: 'Especialización Finanzas - Cohorte 53', estudiantes: 28, reqProyector: true, reqStreaming: false, reqSoftware: true, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, docenteId: 'Docente Invitado Bogotá', fechaInicioDocente: '2026-08-28', fechaFinDocente: '2026-08-29', modalidadDocente: 'Presencial', franjaHorariaPuntos: 90, nivelFormacion: 'Especialización', reqAccesibilidad: true, tipoAccesibilidad: 'Movilidad reducida' },
  { id: 'REQ-DIPFIN20-01', nombrePrograma: 'Diplomado Finanzas Cohorte 20', estudiantes: 18, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Docente Dip 20', fechaInicioDocente: '2026-11-06', fechaFinDocente: '2026-11-07', modalidadDocente: 'Presencial', franjaHorariaPuntos: 40, nivelFormacion: 'Diplomado', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-GERSAL48-01', nombrePrograma: 'Gerencia en Salud - Cohorte 48', estudiantes: 22, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, docenteId: 'Experto Salud Pública', fechaInicioDocente: '2026-08-14', fechaFinDocente: '2026-08-15', modalidadDocente: 'Presencial', franjaHorariaPuntos: 75, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-GERSAL48-02', nombrePrograma: 'Gerencia en Salud - Cohorte 48', estudiantes: 22, reqProyector: true, reqStreaming: true, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Docente Local Salud', fechaInicioDocente: '2026-10-02', fechaFinDocente: '2026-10-03', modalidadDocente: 'Híbrida', franjaHorariaPuntos: 75, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-GERSAL49-01', nombrePrograma: 'Gerencia en Salud - Cohorte 49', estudiantes: 20, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Docente Gerencia', fechaInicioDocente: '2026-09-11', fechaFinDocente: '2026-09-12', modalidadDocente: 'Presencial', franjaHorariaPuntos: 75, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-DIPGES33-01', nombrePrograma: 'Diplomado Gestión Gerencial 33', estudiantes: 35, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, docenteId: 'Conferencista Medellín', fechaInicioDocente: '2026-10-23', fechaFinDocente: '2026-10-24', modalidadDocente: 'Presencial', franjaHorariaPuntos: 40, nivelFormacion: 'Diplomado', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-GESGER49-01', nombrePrograma: 'Especialización Gestión Gerencial - Cohorte 49', estudiantes: 38, reqProyector: true, reqStreaming: true, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Docente G.G. 1', fechaInicioDocente: '2026-08-21', fechaFinDocente: '2026-08-22', modalidadDocente: 'Híbrida', franjaHorariaPuntos: 85, nivelFormacion: 'Especialización', reqAccesibilidad: true, tipoAccesibilidad: 'Visual' },
  { id: 'REQ-GESGER49-02', nombrePrograma: 'Especialización Gestión Gerencial - Cohorte 49', estudiantes: 38, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Docente G.G. 2', fechaInicioDocente: '2026-11-20', fechaFinDocente: '2026-11-21', modalidadDocente: 'Presencial', franjaHorariaPuntos: 85, nivelFormacion: 'Especialización', reqAccesibilidad: true, tipoAccesibilidad: 'Visual' },
  { id: 'REQ-MGO11-01', nombrePrograma: 'Maestría en Gestión de Organizaciones - Cohorte 11', estudiantes: 15, reqProyector: true, reqStreaming: false, reqSoftware: true, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, docenteId: 'Investigador Internacional', fechaInicioDocente: '2026-09-04', fechaFinDocente: '2026-09-05', modalidadDocente: 'Presencial', franjaHorariaPuntos: 100, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-MGO11-02', nombrePrograma: 'Maestría en Gestión de Organizaciones - Cohorte 11', estudiantes: 15, reqProyector: true, reqStreaming: true, reqSoftware: true, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Docente Maestría Local', fechaInicioDocente: '2026-10-30', fechaFinDocente: '2026-10-31', modalidadDocente: 'Híbrida', franjaHorariaPuntos: 100, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-REV-01', nombrePrograma: 'Especialización Revisoría Fiscal - Cohorte 11', estudiantes: 20, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, docenteId: 'Daniel Hurtado Cabrera (Bogotá)', fechaInicioDocente: '2026-10-03', fechaFinDocente: '2026-10-04', modalidadDocente: 'Presencial', franjaHorariaPuntos: 80, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-REV-02', nombrePrograma: 'Especialización Revisoría Fiscal - Cohorte 11', estudiantes: 20, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Carlos Cantillo Puello', fechaInicioDocente: '2026-10-17', fechaFinDocente: '2026-10-18', modalidadDocente: 'Presencial', franjaHorariaPuntos: 80, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-REV-03', nombrePrograma: 'Especialización Revisoría Fiscal - Cohorte 11', estudiantes: 20, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Orlando Arrieta Díaz', fechaInicioDocente: '2026-10-31', fechaFinDocente: '2026-11-01', modalidadDocente: 'Presencial', franjaHorariaPuntos: 80, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-REV-04', nombrePrograma: 'Especialización Revisoría Fiscal - Cohorte 11', estudiantes: 20, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Juan Carlos Hernandez Muñoz', fechaInicioDocente: '2026-11-21', fechaFinDocente: '2026-11-22', modalidadDocente: 'Presencial', franjaHorariaPuntos: 80, nivelFormacion: 'Especialización', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-MDTGP-01', nombrePrograma: 'Maestría Desarrollo Territorial - Cohorte 4 y 5', estudiantes: 40, reqProyector: true, reqStreaming: true, reqSoftware: false, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'José Morelos Gómez', fechaInicioDocente: '2026-08-07', fechaFinDocente: '2026-08-08', modalidadDocente: 'Híbrida', franjaHorariaPuntos: 100, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-MDTGP-02', nombrePrograma: 'Maestría Desarrollo Territorial - Cohorte 4 y 5', estudiantes: 40, reqProyector: true, reqStreaming: false, reqSoftware: true, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Juan Carlos Vergara - Rosario Blanco', fechaInicioDocente: '2026-09-18', fechaFinDocente: '2026-09-19', modalidadDocente: 'Presencial', franjaHorariaPuntos: 100, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-MDTGP-03', nombrePrograma: 'Maestría Desarrollo Territorial - Cohorte 4 y 5', estudiantes: 40, reqProyector: true, reqStreaming: false, reqSoftware: false, tieneDocenteInvitado: true, docenteForaneoPuntos: 100, docenteId: 'Orlando Deavila - Lewis León', fechaInicioDocente: '2026-10-16', fechaFinDocente: '2026-10-17', modalidadDocente: 'Presencial', franjaHorariaPuntos: 100, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' },
  { id: 'REQ-MDTGP-04', nombrePrograma: 'Maestría Desarrollo Territorial - Cohorte 4 y 5', estudiantes: 40, reqProyector: true, reqStreaming: false, reqSoftware: true, tieneDocenteInvitado: false, docenteForaneoPuntos: 0, docenteId: 'Asesor Trabajo Grado', fechaInicioDocente: '2026-11-20', fechaFinDocente: '2026-11-21', modalidadDocente: 'Presencial', franjaHorariaPuntos: 100, nivelFormacion: 'Maestría', reqAccesibilidad: false, tipoAccesibilidad: 'Ninguna' }
];

async function setup() {
  console.log("Loading info...");
  await doc.loadInfo();
  console.log("Info loaded. Doc title:", doc.title);
  
  let solSheet = doc.sheetsByTitle['Solicitudes'];
  if (!solSheet) throw new Error("Sheet 'Solicitudes' no existe.");
  await solSheet.clearRows();

  let salSheet = doc.sheetsByTitle['Salones'];
  if (!salSheet) throw new Error("Sheet 'Salones' no existe.");
  await salSheet.clearRows();

  console.log("Subiendo", mockSolicitudes.length, "Solicitudes Reales en batch...");
  const solicitudesRows = mockSolicitudes.map(s => ({
      'ID': s.id,
      'Programa': s.nombrePrograma,
      'Estudiantes': s.estudiantes,
      'Proyector': s.reqProyector ? 'TRUE' : 'FALSE',
      'Streaming': s.reqStreaming ? 'TRUE' : 'FALSE',
      'Software': s.reqSoftware ? 'TRUE' : 'FALSE',
      'Docente Foráneo': s.tieneDocenteInvitado ? 'TRUE' : 'FALSE',
      'Puntos Foráneo': s.docenteForaneoPuntos,
      'Inicio': s.fechaInicioDocente || '',
      'Fin': s.fechaFinDocente || '',
      'Modalidad': s.modalidadDocente || '',
      'Puntos Franja': s.franjaHorariaPuntos,
      'Nivel': s.nivelFormacion,
      'Accesibilidad': s.reqAccesibilidad ? s.tipoAccesibilidad : 'Ninguna',
      'Docente ID': s.docenteId || ''
  }));
  await solSheet.addRows(solicitudesRows);

  console.log("Subiendo", mockSalones.length, "Salones Reales en batch...");
  const salonesRows = mockSalones.map(s => ({
      'ID': s.id,
      'Nombre': s.nombre,
      'Sede': s.sede,
      'Capacidad': s.capacidad,
      'Proyector': s.tieneProyector ? 'TRUE' : 'FALSE',
      'Sala Computo': s.esSalaComputo ? 'TRUE' : 'FALSE'
  }));
  await salSheet.addRows(salonesRows);

  console.log("¡Listo! Hojas llenadas exitosamente con la data real de Agosto 2026.");
}

setup().catch(console.error);
