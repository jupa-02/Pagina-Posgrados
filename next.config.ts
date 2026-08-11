import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Solo aplicamos basePath en producción para que el entorno local siga funcionando normal
  basePath: process.env.NODE_ENV === 'production' ? '/Pagina-Posgrados' : '',
  images: {
    unoptimized: true, // Requerido para exportaciones estáticas
  },
};

export default nextConfig;
