import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { readFileSync } from 'fs';
import { mockSolicitudes } from '../src/lib/db/solicitudesData';
import { mockSalones } from '../src/lib/db/salonesData';

// Cargar variables de entorno del archivo .env.local
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

const serviceAccountAuth = new JWT({
  email: envVars.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: envVars.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(envVars.GOOGLE_SHEET_ID, serviceAccountAuth);

async function setup() {
  await doc.loadInfo();
  
  // Limpiar y llenar Solicitudes
  let solSheet = doc.sheetsByTitle['Solicitudes'];
  if (!solSheet) {
    throw new Error("Sheet 'Solicitudes' no existe. Créela o verifique.");
  } else {
    await solSheet.clearRows();
  }

  // Limpiar y llenar Salones
  let salSheet = doc.sheetsByTitle['Salones'];
  if (!salSheet) {
    throw new Error("Sheet 'Salones' no existe. Créela o verifique.");
  } else {
    await salSheet.clearRows();
  }

  console.log("Subiendo", mockSolicitudes.length, "Solicitudes Reales...");
  for (const s of mockSolicitudes) {
    await solSheet.addRow({
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
    });
  }

  console.log("Subiendo", mockSalones.length, "Salones Reales...");
  for (const s of mockSalones) {
    await salSheet.addRow({
      'ID': s.id,
      'Nombre': s.nombre,
      'Sede': s.sede,
      'Capacidad': s.capacidad,
      'Proyector': s.tieneProyector ? 'TRUE' : 'FALSE',
      'Sala Computo': s.esSalaComputo ? 'TRUE' : 'FALSE',
    });
  }

  console.log("¡Listo! Hojas llenadas exitosamente con la data real de Agosto 2026.");
}

setup().catch(console.error);
