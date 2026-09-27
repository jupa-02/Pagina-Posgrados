import { NextRequest, NextResponse } from "next/server";
import { toggleAsistenciaManual } from "@/lib/eventos/db";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = toggleAsistenciaManual(id);

  if (!res.success) {
    return NextResponse.json({ error: "Asistente no encontrado" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    asistente: res.asistente,
  });
}
