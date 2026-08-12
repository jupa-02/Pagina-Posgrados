import { NextResponse } from 'next/server';
import { getGoogleSheet } from '../../../../lib/db/googleSheets';

export async function GET() {
  try {
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle['Solicitudes'];
    
    if (!sheet) {
      return NextResponse.json({ error: 'La hoja "Solicitudes" no existe en el Excel.' }, { status: 404 });
    }

    const rows = await sheet.getRows();
    
    // Mapear los datos desde el Google Sheet al formato exacto de la interfaz Solicitud
    const solicitudes = rows.map(row => ({
      id: row.get('ID') || `REQ-${Math.random().toString(36).substr(2, 5)}`,
      programaId: row.get('Programa') || 'DESCONOCIDO',
      nombrePrograma: row.get('Programa') || 'Sin Nombre',
      E: parseInt(row.get('Estudiantes')) || 15,
      reqProyector: row.get('Proyector') === 'TRUE',
      reqStreaming: row.get('Streaming') === 'TRUE',
      reqSoftware: row.get('Software') === 'TRUE',
      tieneDocenteInvitado: row.get('Docente Foráneo') === 'TRUE',
      docenteForaneoPuntos: parseInt(row.get('Puntos Foráneo')) || 0,
      fechaInicioDocente: row.get('Inicio') || '',
      fechaFinDocente: row.get('Fin') || '',
      modalidadDocente: row.get('Modalidad') || 'Presencial',
      franjaHorariaPuntos: parseInt(row.get('Puntos Franja')) || 100,
      nivelFormacion: row.get('Nivel') || 'Maestría',
      reqAccesibilidad: row.get('Accesibilidad') !== 'Ninguna' && !!row.get('Accesibilidad'),
      tipoAccesibilidad: row.get('Accesibilidad') || 'Ninguna',
      docenteId: row.get('Docente ID') || '',
    }));

    return NextResponse.json(solicitudes);
  } catch (error: any) {
    console.error('Error fetching solicitudes:', error);
    return NextResponse.json({ error: 'Error al conectar con la base de datos IPAS.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle['Solicitudes'];
    
    if (!sheet) {
      return NextResponse.json({ error: 'La hoja "Solicitudes" no existe.' }, { status: 404 });
    }

    // Insertar la fila en Google Sheets
    await sheet.addRow({
      'ID': `REQ-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      'Programa': body.nombrePrograma || '',
      'Estudiantes': body.estudiantes || 15,
      'Proyector': body.reqProyector ? 'TRUE' : 'FALSE',
      'Streaming': body.reqStreaming ? 'TRUE' : 'FALSE',
      'Software': body.reqSoftware ? 'TRUE' : 'FALSE',
      'Docente Foráneo': body.tieneDocenteInvitado ? 'TRUE' : 'FALSE',
      'Puntos Foráneo': body.docenteForaneoPuntos || 0,
      'Inicio': body.fechaInicioDocente || '',
      'Fin': body.fechaFinDocente || '',
      'Modalidad': body.modalidadDocente || 'Presencial',
      'Puntos Franja': body.franjaHorariaPuntos || 100,
      'Nivel': body.nivelFormacion || 'Maestría',
      'Accesibilidad': body.reqAccesibilidad ? body.tipoAccesibilidad : 'Ninguna',
      'Docente ID': body.docenteId || ''
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving solicitud:', error);
    return NextResponse.json({ error: 'Error guardando en la base de datos.' }, { status: 500 });
  }
}
