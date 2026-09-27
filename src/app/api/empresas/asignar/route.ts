import { NextResponse } from 'next/server';
import { asignarCreditoColaborador, getEmpresaByNit } from '@/lib/db/posgradosDb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { empresaNit, colaboradorDocumento, colaboradorNombre, colaboradorEmail, cursoId, cursoTitulo, creditosRequeridos } = body;

    if (!empresaNit || !colaboradorDocumento || !cursoId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const resultado = asignarCreditoColaborador({
      empresaNit,
      colaboradorDocumento,
      colaboradorNombre,
      colaboradorEmail,
      cursoId,
      cursoTitulo,
      creditosRequeridos: Number(creditosRequeridos) || 2
    });

    return NextResponse.json({
      success: true,
      message: `Se asignaron ${creditosRequeridos} créditos a ${colaboradorNombre} con éxito.`,
      empresa: resultado.empresa,
      inscripcion: resultado.inscripcion
    });
  } catch (error: any) {
    console.error('Error asignando créditos:', error);
    return NextResponse.json({ error: error.message || 'Error en la asignación' }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nit = searchParams.get('nit');
  if (!nit) return NextResponse.json({ error: 'NIT requerido' }, { status: 400 });

  const empresa = getEmpresaByNit(nit);
  if (!empresa) return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });

  return NextResponse.json({ empresa });
}
