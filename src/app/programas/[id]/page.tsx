import { PROGRAMAS_DB } from '@/data/programasData';
import ProgramDetailClient from './ProgramDetailClient';

export function generateStaticParams() {
  return Object.keys(PROGRAMAS_DB).map((id) => ({
    id: id,
  }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ProgramDetailClient params={params} />;
}
