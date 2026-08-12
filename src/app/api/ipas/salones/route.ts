import { NextResponse } from 'next/server';
import { getGoogleSheet } from '../../../../lib/db/googleSheets';

export async function GET() {
  try {
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle['Salones'];
    
    if (!sheet) {
      return NextResponse.json({ error: 'La hoja "Salones" no existe en el Excel.' }, { status: 404 });
    }

    const rows = await sheet.getRows();
    
    const salones = rows.map(row => ({
      id: row.get('ID') || `S-${Math.random().toString(36).substr(2, 5)}`,
      nombre: row.get('Nombre') || 'Salón Sin Nombre',
      capacidad: parseInt(row.get('Capacidad')) || 30,
      techProyector: row.get('Proyector') === 'TRUE',
      techStreaming: row.get('Streaming') === 'TRUE',
      techSoftware: row.get('Software') === 'TRUE',
      tipo: row.get('Tipo') || 'Magistral',
      esPrimeraPlanta: row.get('Primera Planta') === 'TRUE',
      tieneRampa: row.get('Rampa') === 'TRUE',
      tieneAscensor: row.get('Ascensor') === 'TRUE',
    }));

    return NextResponse.json(salones);
  } catch (error: any) {
    console.error('Error fetching salones:', error);
    return NextResponse.json({ error: 'Error al conectar con la base de datos IPAS.' }, { status: 500 });
  }
}
