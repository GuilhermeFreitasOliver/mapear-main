'use client';

import Link from 'next/link';
import { useStorage } from '@/context/StorageContext';

export default function JogosHome() {
  const { state: stats } = useStorage();

  const statusLabel = (completed: boolean, attempts: number) => {
    if (completed) return '✔️ Concluído';
    if (attempts > 0) return 'Em andamento';
    return 'Não realizado';
  };

  return (
    <section className="grid cols-2">
      <div className="card">
        <h1>Bem-vindo(a) aos Jogos MAPEAR</h1>
        <p>
          Sua jornada de aprendizado sobre Pensamento Computacional começa aqui. Escolha um dos
          minijogos no menu para começar ou continuar de onde parou.
        </p>
        <div className="tip" style={{ marginTop: 10 }}>
          <div>
            <div className="badge">Mentores virtuais</div>
            <div>
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

      <div className="card">
        <h2>Sua jornada</h2>
        <p className="muted">Acompanhe seu progresso em cada pilar:</p>
        <ul className="list">
          <li>
            Detective de Padrões:{' '}
            <strong>
              {statusLabel(stats.progress.padroes.completed, stats.progress.padroes.attempts)}
            </strong>
          </li>
          <li>
            Abstração:{' '}
            <strong>
              {statusLabel(stats.progress.abstracao.completed, stats.progress.abstracao.attempts)}
            </strong>
          </li>
          <li>
            Decomposição:{' '}
            <strong>
              {statusLabel(
                stats.progress.decomposicao.completed,
                stats.progress.decomposicao.attempts
              )}
            </strong>
          </li>
          <li>
            Algoritmos:{' '}
            <strong>
              {statusLabel(stats.progress.algoritmo.completed, stats.progress.algoritmo.attempts)}
            </strong>
          </li>
          <li>
            Generalize+:{' '}
            <strong>
              {statusLabel(
                stats.progress.generalizacao.completed,
                stats.progress.generalizacao.attempts
              )}
            </strong>
          </li>
          <li>
            Robótica:{' '}
            <strong>
              {statusLabel(stats.progress.robotica.completed, stats.progress.robotica.attempts)}
            </strong>
          </li>
        </ul>
        <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="button" href="/jogos/padroes">
            Continuar Jornada
          </Link>
          <Link className="button secondary" href="/jogos/relatorios">
            Ver Relatórios
          </Link>
        </div>
      </div>
    </section>
  );
}