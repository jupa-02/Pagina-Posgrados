import { NextRequest, NextResponse } from "next/server";
import { verificarYRegistrarCheckIn } from "@/lib/eventos/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, metodo } = body;

    if (!token) {
      return NextResponse.json({ valido: false, estado: "INVALID_TICKET", mensaje: "No se envió ningún código QR." }, { status: 400 });
    }

    const resultado = verificarYRegistrarCheckIn(token, metodo || "qr_scanner");

    if (resultado.estado === "SUCCESS") {
      return NextResponse.json(resultado, { status: 200 });
    } else if (resultado.estado === "ALREADY_CHECKED_IN") {
      return NextResponse.json(resultado, { status: 409 });
    } else if (resultado.estado === "INVALID_TICKET") {
      return NextResponse.json(resultado, { status: 400 });
    } else {
      return NextResponse.json(resultado, { status: 404 });
    }
  } catch (error: any) {
    console.error("Error en check-in:", error);
    return NextResponse.json(
      { valido: false, estado: "INVALID_TICKET", mensaje: "Error al procesar la validación: " + error.message },
      { status: 500 }
    );
  }
}
