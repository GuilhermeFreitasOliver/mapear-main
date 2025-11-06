'use client';

import Link from 'next/link';
import { useStorage } from '@/context/StorageContext';

const labels: Record<string, string> = {
  padroes: 'Detective de Padrões',
  abstracao: 'Abstração',
  decomposicao: 'Decomposição',
  algoritmo: 'Algoritmos',
  generalizacao: 'Generalize+',
  robotica: 'Robótica',
};

const order = ['padroes', 'abstracao', 'decomposicao', 'algoritmo', 'generalizacao', 'robotica'] as const;

type PillarKey = typeof order[number];

export default function RelatoriosPage() {
  const { state } = useStorage();
  const scores = state.scores;
  const reflections = state.reflections;

  return (
    <section className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Relatórios</h1>
      <p className="mt-2 text-gray-300">Acompanhe suas pontuações e reflexões dos jogos.</p>

      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-gray-900/30 p-3">
          <h2 className="text-xl font-semibold">Pontuações</h2>
          <ul className="mt-2 space-y-1">
            {order.map((key: PillarKey) => (
              <li key={`score-${key}`}>
                <strong>{labels[key]}:</strong> {scores[key] ?? '—'}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-white/10 bg-gray-900/30 p-3">
          <h2 className="text-xl font-semibold">Reflexões (MAPEAR)</h2>
          <ul className="mt-2 space-y-1">
            {order.map((key: PillarKey) => (
              <li key={`refl-${key}`}>
                <strong>{labels[key]}:</strong> {reflections[key]?.trim() || '—'}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <Link className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/jogos">Voltar aos Jogos</Link>
      </div>
    </section>
  );
}