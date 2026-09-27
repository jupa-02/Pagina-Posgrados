import { NextResponse } from 'next/server';
import { getEmpresasDb, comprarBolsaCreditos } from '@/lib/db/posgradosDb';

export async function GET() {
  try {
    const empresas = getEmpresasDb();
    return NextResponse.json({ success: true, empresas });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nit, razonSocial, contactoNombre, contactoEmail, contactoTelefono, creditos, montoCOP, pasarela } = body;

    if (!nit || !razonSocial || !creditos) {
      return NextResponse.json(
        { success: false, error: 'NIT, Razón Social y Cantidad de Créditos son obligatorios' },
        { status: 400 }
      );
    }

    const referencia = `REF-BOLSA-${Date.now().toString().slice(-6)}`;
    const resultado = comprarBolsaCreditos({
      nit,
      razonSocial,
      contactoNombre: contactoNombre || 'Representante Legal',
      contactoEmail: contactoEmail || 'convenios@empresa.com',
      contactoTelefono: contactoTelefono || 'N/A',
      creditos: Number(creditos),
      montoCOP: Number(montoCOP) || Number(creditos) * 350000,
      referencia,
      pasarela: pasarela || 'WOMPI_PSE'
    });

    return NextResponse.json({
      success: true,
      mensaje: `Bolsa de ${creditos} créditos activada exitosamente para ${razonSocial}`,
      empresa: resultado.empresa,
      transaccion: resultado.transaccion
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
