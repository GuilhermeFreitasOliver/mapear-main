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
    if (entry?.completed) return 'Concluído';
    if ((entry?.attempts || 0) > 0 || isPlaying(key)) return 'Em andamento';
    return 'Não realizado';
  };

  const statusTone = (label: string) => {
    if (label.includes('Concluído')) return 'border-emerald-300/35 bg-emerald-400/20 text-emerald-100';
    if (label.includes('andamento')) return 'border-sky-300/35 bg-sky-400/20 text-sky-100';
    return 'border-slate-300/25 bg-white/5 text-slate-200';
  };

  return (
    <ProtectedRoute>
      <section className="space-y-5">
        <div className="rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(7,34,52,0.85),rgba(8,20,33,0.92))] p-5 sm:p-7 text-white shadow-[0_20px_45px_rgba(0,0,0,0.24)] fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Jogos MAPEAR</p>
          <h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight">Sua trilha prática de Pensamento Computacional</h1>
          <p className="mt-3 max-w-3xl text-slate-200 sm:text-lg">
            Sua jornada de aprendizado começa aqui. Escolha um minijogo para iniciar ou continuar de onde parou.
            Cada fase fortalece um pilar do PC com feedback imediato e progressão real.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link className="lift-on-hover inline-flex min-h-[44px] items-center justify-center rounded-lg border border-emerald-200/30 bg-emerald-400/20 px-4 py-2 text-sm font-bold text-emerald-100" href="/jogos/padroes">
              Continuar Jornada
            </Link>
            <Link className="lift-on-hover inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-bold text-white" href="/jogos/relatorios">
              Ver Relatórios
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 fade-up">
          <div className="rounded-2xl border border-white/10 bg-[rgba(8,24,36,0.78)] p-5 sm:p-6 text-white">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-200">Mentores virtuais por pilar</h2>
            <div className="section-divider mt-3" />
            <ul className="mt-4 space-y-2 text-slate-200">
              <li><strong>Abstração:</strong> ver além dos detalhes.</li>
              <li><strong>Padrões:</strong> encontrar regularidades.</li>
              <li><strong>Decomposição:</strong> dividir o problema em partes menores.</li>
              <li><strong>Generalização:</strong> expandir soluções.</li>
              <li><strong>Algoritmos:</strong> planejar passo a passo.</li>
              <li><strong>Robótica:</strong> interagir com sensores e atuadores.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[rgba(8,24,36,0.78)] p-5 sm:p-6 text-white">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-200">Seu progresso na trilha</h2>
            <p className="mt-2 text-slate-300">Acompanhe o status atual de cada pilar.</p>
            <div className="mt-4 grid gap-2">
              {[
                { label: 'Detetive de Padrões', key: 'padroes' as const },
                { label: 'Abstração', key: 'abstracao' as const },
                { label: 'Decomposição', key: 'decomposicao' as const },
                { label: 'Algoritmos', key: 'algoritmo' as const },
                { label: 'Generalize+', key: 'generalizacao' as const },
                { label: 'Robótica', key: 'robotica' as const },
              ].map((item) => {
                const status = statusLabelByKey(item.key);
                return (
                  <div key={item.key} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
                    <span className="font-semibold text-slate-100">{item.label}</span>
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${statusTone(status)}`}>{status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
