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
    <section className="card">
      <h1>Relatórios</h1>
      <p className="muted">Acompanhe suas pontuações e reflexões dos jogos.</p>

      <div style={{ display: 'grid', gap: 16, marginTop: 12 }}>
        <div>
          <h2>Pontuações</h2>
          <ul>
            {order.map((key: PillarKey) => (
              <li key={`score-${key}`}>
                <strong>{labels[key]}:</strong> {scores[key] ?? '—'}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Reflexões (MAPEAR)</h2>
          <ul>
            {order.map((key: PillarKey) => (
              <li key={`refl-${key}`}>
                <strong>{labels[key]}:</strong> {reflections[key]?.trim() || '—'}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link className="button secondary" href="/jogos">Voltar aos Jogos</Link>
      </div>
    </section>
  );
}