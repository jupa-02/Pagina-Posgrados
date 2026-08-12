import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  // Solo activamos 'export' cuando se construye para GitHub Pages (STATIC_EXPORT=true)
  // En modo desarrollo/servidor necesitamos API routes activas
  ...(isStaticExport ? { output: 'export' } : {}),
  basePath: isStaticExport ? '/Pagina-Posgrados' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
