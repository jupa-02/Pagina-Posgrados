'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Camera, CheckCircle2, AlertTriangle, XCircle, RefreshCw, Volume2, UserCheck, ShieldAlert } from 'lucide-react';

export default function ScannerPage() {
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [scannedCount, setScannedCount] = useState(0);
  const [cameraError, setCameraError] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);

  const scannerRef = useRef<any>(null);

  // Reproducir efectos de sonido procedimentales con Web Audio API (100% libre de assets externos)
  const playSound = (type: 'success' | 'duplicate' | 'error') => {
    if (!audioEnabled || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === 'success') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'duplicate') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.setValueAtTime(220, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.error('Audio playback error:', e);
    }
  };

  const handleProcessToken = async (token: string) => {
    if (loading) return;
    setLoading(true);

    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(100);
      }

      const res = await fetch('/api/eventos/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, metodo: 'qr_scanner' }),
      });

      const data = await res.json();
      setScanResult(data);

      if (data.estado === 'SUCCESS') {
        playSound('success');
        setScannedCount((prev) => prev + 1);
      } else if (data.estado === 'ALREADY_CHECKED_IN') {
        playSound('duplicate');
      } else {
        playSound('error');
      }
    } catch (err: any) {
      playSound('error');
      setScanResult({
        valido: false,
        estado: 'INVALID_TICKET',
        mensaje: 'Error de conexión con el servidor: ' + err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let html5QrCode: any = null;

    const startScanner = async () => {
      try {
        const { Html5Qrcode } = await import('html5-qrcode');
        html5QrCode = new Html5Qrcode('reader');
        scannerRef.current = html5QrCode;

        const config = {
          fps: 15,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        };

        await html5QrCode.start(
          { facingMode: 'environment' },
          config,
          (decodedText: string) => {
            handleProcessToken(decodedText);
          },
          () => {} // Ignorar frames sin QR
        );

        setIsScanning(true);
        setCameraError('');
      } catch (err: any) {
        console.error('Error starting html5-qrcode:', err);
        setCameraError('No se pudo acceder a la cámara. Revisa los permisos o usa el ingreso manual abajo.');
        setIsScanning(false);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.stop().catch(() => {});
        } catch (e) {}
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full max-w-md flex items-center justify-between py-3 border-b border-slate-800">
        <Link
          href="/eventos"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Salir
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-amber-400 px-2 py-0.5 rounded">
            Validación en Puerta
          </span>
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-1.5 rounded-lg border ${audioEnabled ? 'bg-slate-800 text-emerald-400 border-slate-700' : 'bg-slate-900 text-slate-500 border-slate-800'}`}
            title="Activar/Desactivar Sonido"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Visor de Cámara */}
      <div className="w-full max-w-md flex flex-col items-center my-auto py-4">
        <div className="relative w-full aspect-square max-w-[320px] bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl flex items-center justify-center">
          <div id="reader" className="w-full h-full object-cover"></div>

          {/* Guía visual de escaneo */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            <div className="w-48 h-48 border-2 border-dashed border-amber-400/80 rounded-2xl animate-pulse"></div>
          </div>
        </div>

        {cameraError && (
          <div className="mt-4 p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-xl text-center max-w-xs">
            {cameraError}
          </div>
        )}

        {/* Contador de asistencias en sesión */}
        <div className="mt-4 flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-2xl">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-slate-300">
            Asistencias registradas en esta sesión: <strong className="text-white text-sm">{scannedCount}</strong>
          </span>
        </div>
      </div>

      {/* Modal / Alerta de Resultado de Validación */}
      {scanResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl border-2 transition-all ${
              scanResult.estado === 'SUCCESS'
                ? 'bg-slate-900 border-emerald-500 text-white'
                : scanResult.estado === 'ALREADY_CHECKED_IN'
                ? 'bg-slate-900 border-amber-500 text-white'
                : 'bg-slate-900 border-red-500 text-white'
            }`}
          >
            {scanResult.estado === 'SUCCESS' ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  ACCESO AUTORIZADO
                </span>
                <h3 className="text-xl font-bold mt-1 text-white">
                  {scanResult.asistente?.nombre}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Doc: <strong>{scanResult.asistente?.documento}</strong>
                </p>
                {scanResult.asistente?.programa && (
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {scanResult.asistente.programa}
                  </p>
                )}
              </div>
            ) : scanResult.estado === 'ALREADY_CHECKED_IN' ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <AlertTriangle className="w-10 h-10" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  BOLETO YA REGISTRADO
                </span>
                <h3 className="text-lg font-bold mt-1 text-white">
                  {scanResult.asistente?.nombre}
                </h3>
                <p className="text-xs text-amber-200 mt-2 bg-amber-950/60 p-2.5 rounded-xl border border-amber-800/80">
                  Este boleto ya ingresó a las: <br />
                  <strong>{new Date(scanResult.fecha_anterior).toLocaleTimeString()}</strong>
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-3">
                  <XCircle className="w-10 h-10" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                  ENTRADA INVÁLIDA
                </span>
                <p className="text-xs text-red-200 mt-2">
                  {scanResult.mensaje}
                </p>
              </div>
            )}

            <button
              onClick={() => setScanResult(null)}
              className="mt-6 w-full bg-white text-slate-950 hover:bg-slate-100 py-3 rounded-xl font-bold text-sm transition-all"
            >
              Listo / Escanear Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Ingreso manual de respaldo */}
      <footer className="w-full max-w-md pt-2 pb-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (manualCode.trim()) {
              handleProcessToken(manualCode.trim());
              setManualCode('');
            }
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Pegar token o código manual..."
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
          >
            Validar
          </button>
        </form>
      </footer>
    </main>
  );
}
