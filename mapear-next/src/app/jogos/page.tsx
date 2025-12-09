'use client';

import Link from 'next/link';
import { useStorage } from '@/context/StorageContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function JogosHome() {
  const { state: stats } = useStorage();

  const isPlaying = (key: 'padroes' | 'abstracao' | 'decomposicao' | 'algoritmo' | 'generalizacao' | 'robotica') => {
    return Array.isArray(stats.events)
      ? stats.events.some(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (e: any) =>
            (e.type === 'minigame_step' || e.type === 'minigame_try') && e.payload?.key === key
        )
      : false;
  };

  const statusLabelByKey = (key: 'padroes' | 'abstracao' | 'decomposicao' | 'algoritmo' | 'generalizacao' | 'robotica') => {
    const entry = stats.progress[key];
    if (entry?.completed) return '✔️ Concluído';
    if ((entry?.attempts || 0) > 0 || isPlaying(key)) return 'Em andamento';
    return 'Não realizado';
  };

  return (
    <ProtectedRoute>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Bem-vindo(a) aos Jogos MAPEAR</h1>
        <p className="mt-2">
          Sua jornada de aprendizado sobre Pensamento Computacional começa aqui. Escolha um dos
          minijogos no menu para começar ou continuar de onde parou.
        </p>
        <div className="mt-3 rounded-lg border-l-4 border-blue-500/60 bg-blue-500/10 p-3">
          <div>
            <div className="inline-block text-xs font-semibold bg-blue-500 text-white rounded px-2 py-0.5">Mentores virtuais</div>
            <div className="mt-2">
              <b>Mentores virtuais:</b>
              <br />- Abstração: Ver além dos detalhes.
              <br />- Padrões: Encontrar regularidades.
              <br />- Decomposição: Dividir o problema em problemas menores
              <br />- Generalização: Expandir soluções.
              <br />- Algoritmos: Planejar passo a passo.
              <br />- Robótica: Interagir através de sensores e atuadores.
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-400">Sua Jornada</h2>
        <p className="text-gray-400 mt-2">Acompanhe seu progresso em cada pilar:</p>
        <ul className="space-y-2 mt-2">
          <li>
            Detective de Padrões:{' '}
            <strong>
              {statusLabelByKey('padroes')}
            </strong>
          </li>
          <li>
            Abstração:{' '}
            <strong>
              {statusLabelByKey('abstracao')}
            </strong>
          </li>
          <li>
            Decomposição:{' '}
            <strong>
              {statusLabelByKey('decomposicao')}
            </strong>
          </li>
          <li>
            Algoritmos:{' '}
            <strong>
              {statusLabelByKey('algoritmo')}
            </strong>
          </li>
          <li>
            Generalize+:{' '}
            <strong>
              {statusLabelByKey('generalizacao')}
            </strong>
          </li>
          <li>
            Robótica:{' '}
            <strong>
              {statusLabelByKey('robotica')}
            </strong>
          </li>
        </ul>
        <div className="mt-4 flex gap-2 flex-wrap">
          <Link className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/jogos/padroes">
            Continuar Jornada
          </Link>
          <Link className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/jogos/relatorios">
            Ver Relatórios
          </Link>
        </div>
      </div>
    </section>
    </ProtectedRoute>
  );
}