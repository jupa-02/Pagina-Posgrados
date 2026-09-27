import { NextResponse } from 'next/server';
import { crearInscripcionParticular, iniciarCheckoutBolsa, comprarBolsaCreditos } from '@/lib/db/posgradosDb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tipo, data } = body;

    if (tipo === 'PARTICULAR') {
      const { inscripcion, transaccion } = crearInscripcionParticular({
        documento: data.documento,
        tipoDoc: data.tipoDoc || 'CC',
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        cursoId: data.cursoId,
        cursoTitulo: data.cursoTitulo,
        cursoCodigo: data.cursoCodigo,
        modalidad: data.modalidad || 'Híbrida',
        montoCOP: data.montoCOP || 780000,
        metodoPago: data.metodoPago || 'PSE'
      });

      return NextResponse.json({
        success: true,
        tipo: 'PARTICULAR',
        referencia: transaccion.referencia,
        montoCOP: transaccion.montoCOP,
        estado: transaccion.estado,
        urlPasarelaSimulada: `/checkout/simulador?ref=${transaccion.referencia}`,
        inscripcion
      });
    }

    if (tipo === 'EMPRESA_BOLSA') {
      const { empresa, transaccion } = iniciarCheckoutBolsa({
        nit: data.nit,
        razonSocial: data.razonSocial,
        contactoNombre: data.contactoNombre,
        contactoEmail: data.contactoEmail,
        contactoTelefono: data.contactoTelefono,
        creditos: Number(data.creditos),
        montoCOP: Number(data.montoCOP)
      });

      return NextResponse.json({
        success: true,
        tipo: 'EMPRESA_BOLSA',
        referencia: transaccion.referencia,
        creditos: data.creditos,
        montoCOP: transaccion.montoCOP,
        estado: transaccion.estado,
        empresa,
        urlPasarelaSimulada: `/checkout/simulador?ref=${transaccion.referencia}`
      });
    }

    return NextResponse.json({ error: 'Tipo de checkout no válido' }, { status: 400 });
  } catch (error: any) {
    console.error('Error en checkout API:', error);
    return NextResponse.json({ error: error.message || 'Error procesando solicitud' }, { status: 500 });
  }
}
