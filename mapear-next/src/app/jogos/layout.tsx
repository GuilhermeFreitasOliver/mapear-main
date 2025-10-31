'use client';
import Link from 'next/link';
import { StorageProvider } from '@/context/StorageContext';
import { useAuth } from '@/context/AuthContext';

export default function JogosLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // Proteção de Rota: Só renderiza o conteúdo dos jogos se o usuário estiver logado
  if (loading) {
    return (
      <div className="card">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="card">
        <h2>Acesso Negado</h2>
        <p>
          Você precisa estar logado para acessar os jogos. Por favor, retorne à página inicial para
          entrar.
        </p>
      </div>
    );
  }

  return (
    <StorageProvider>
      <nav className="sub-nav" aria-label="Navegação dos jogos">
        <Link href="/jogos">Início</Link>
        <Link href="/jogos/padroes">Detective de Padrões</Link>
        <Link href="/jogos/abstracao">Abstração</Link>
        <Link href="/jogos/decomposicao">Decomposição</Link>
        <Link href="/jogos/algoritmo">Algoritmos</Link>
        <Link href="/jogos/generalizacao">Generalize+</Link>
        <Link href="/jogos/robotica">Robótica</Link>
        <Link href="/jogos/relatorios">Relatórios</Link>
        <Link href="/jogos/ajustes">Ajustes</Link>
      </nav>
      {/* O {children} será a página do jogo específico */}
      {children}
    </StorageProvider>
  );
}