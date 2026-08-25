import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const extractedSolicitudes = JSON.parse(fs.readFileSync('scripts/extracted_solicitudes.json', 'utf8'));

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

async function setup() {
  await doc.loadInfo();
  
  let solSheet = doc.sheetsByTitle['Solicitudes'];
  if (!solSheet) {
    solSheet = await doc.addSheet({
      title: 'Solicitudes',
      headerValues: [
        'ID', 'Programa', 'Estudiantes', 'Proyector', 'Streaming', 'Software', 
        'Docente Foraneo', 'Puntos Foraneo', 'Inicio', 'Fin', 'Modalidad', 
        'Puntos Franja', 'Nivel', 'Accesibilidad', 'Docente ID'
      ]
    });
  } else {
    await solSheet.clearRows();
  }

  console.log("Subiendo " + extractedSolicitudes.length + " Solicitudes en lote...");
  
  const rowsToAdd = extractedSolicitudes.map(s => ({
    'ID': s.id || '',
    'Programa': s.nombrePrograma || '',
    'Estudiantes': s.E || 0,
    'Proyector': s.reqProyector ? 'TRUE' : 'FALSE',
    'Streaming': s.reqStreaming ? 'TRUE' : 'FALSE',
    'Software': s.reqSoftware ? 'TRUE' : 'FALSE',
    'Docente Foraneo': s.tieneDocenteInvitado ? 'TRUE' : 'FALSE',
    'Puntos Foraneo': s.docenteForaneoPuntos || 0,
    'Inicio': s.fechaInicioDocente || '',
    'Fin': s.fechaFinDocente || '',
    'Modalidad': s.modalidadDocente || '',
    'Puntos Franja': s.franjaHorariaPuntos || 0,
    'Nivel': s.nivelFormacion || '',
    'Accesibilidad': s.reqAccesibilidad ? s.tipoAccesibilidad : 'Ninguna',
    'Docente ID': s.docenteId || ''
  }));

  await solSheet.addRows(rowsToAdd);

  console.log("¡Listo! Hojas llenadas exitosamente.");
}

setup().catch(console.error);
