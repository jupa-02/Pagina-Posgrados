import { NextResponse } from 'next/server';
import { confirmarPagoWebhook, getTransaccionesDb } from '@/lib/db/posgradosDb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Support standard webhook format (e.g. Wompi event: { event: "transaction.updated", data: { transaction: { reference, status, id } } })
    // or direct internal simulation: { reference, status: "APPROVED", approvalCode }
    const reference = body?.data?.transaction?.reference || body?.reference;
    const status = body?.data?.transaction?.status || body?.status || 'APPROVED';
    const approvalCode = body?.data?.transaction?.id || body?.approvalCode || `APR-${Date.now().toString().slice(-6)}`;

    if (!reference) {
      return NextResponse.json({ error: 'Referencia requerida' }, { status: 400 });
    }

    if (status === 'APPROVED' || status === 'APROBADO') {
      const result = confirmarPagoWebhook(reference, approvalCode);
      if (!result.success) {
        return NextResponse.json({ error: result.message }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: 'Pago confirmado y activado en tiempo real.',
        transaccion: result.txn,
        inscripcion: result.inscripcion
      });
    }

    return NextResponse.json({ message: `Estado ${status} registrado sin activación.` });
  } catch (error: any) {
    console.error('Error en webhook pagos:', error);
    return NextResponse.json({ error: error.message || 'Error en webhook' }, { status: 500 });
  }
}

export async function GET() {
  const transacciones = getTransaccionesDb();
  return NextResponse.json({ transacciones });
}
