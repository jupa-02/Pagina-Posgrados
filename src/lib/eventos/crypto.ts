import crypto from "crypto";

const HMAC_SECRET = process.env.EVENT_SECURITY_SECRET || "udc-posgrados-secret-key-2026-attendance";

export interface TokenPayload {
  aid: string; // Asistente ID
  eid: string; // Evento ID
  doc: string; // Documento / Cédula
  iat: number; // Timestamp emisión
}

/**
 * Genera un token firmado con HMAC-SHA256 para el código QR del boleto.
 * Formato: UDC:v1:<base64_payload>:<signature_hex>
 */
export function generateSignedToken(payload: TokenPayload): string {
  const jsonStr = JSON.stringify(payload);
  const b64Payload = Buffer.from(jsonStr).toString("base64url");
  const signature = crypto
    .createHmac("sha256", HMAC_SECRET)
    .update(b64Payload)
    .digest("hex");
  return `UDC:v1:${b64Payload}:${signature}`;
}

/**
 * Valida un token QR y previene falsificaciones comparando la firma en tiempo constante.
 */
export function verifySignedToken(token: string): { valid: boolean; payload?: TokenPayload; error?: string } {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "Token no proporcionado o formato inválido" };
  }

  const parts = token.split(":");
  if (parts.length !== 4 || parts[0] !== "UDC" || parts[1] !== "v1") {
    return { valid: false, error: "Formato de token no reconocido" };
  }

  const [, , b64Payload, signature] = parts;

  try {
    const expectedSig = crypto
      .createHmac("sha256", HMAC_SECRET)
      .update(b64Payload)
      .digest("hex");

    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expectedSig, "hex");

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return { valid: false, error: "Firma digital inválida o boleto manipulado" };
    }

    const jsonStr = Buffer.from(b64Payload, "base64url").toString("utf8");
    const payload: TokenPayload = JSON.parse(jsonStr);

    if (!payload.aid || !payload.eid || !payload.doc) {
      return { valid: false, error: "Datos del token incompletos" };
    }

    return { valid: true, payload };
  } catch (err: any) {
    return { valid: false, error: "Error al decodificar token: " + err.message };
  }
}
