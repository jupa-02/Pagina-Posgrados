import { Solicitud } from '@/types/ipas';

export const solicitudesInitialData: Solicitud[] = [];

export const mockSolicitudes: Solicitud[] = [];

export const solicitudesData = process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT !== 'true' 
  ? [] 
  : mockSolicitudes;
