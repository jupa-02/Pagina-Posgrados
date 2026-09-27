import QRCode from "qrcode";

/**
 * Genera un código QR en formato Base64 Data URL a partir del token firmado.
 */
export async function generateQrDataUrl(token: string): Promise<string> {
  return await QRCode.toDataURL(token, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 320,
    color: {
      dark: "#002B49",
      light: "#FFFFFF",
    },
  });
}
