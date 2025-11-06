'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function JogosLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Proteção de Rota: Só renderiza o conteúdo dos jogos se o usuário estiver logado
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(30,41,59,0.5),rgba(2,6,23,0.6))] p-4 sm:p-6 text-white shadow-md">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(30,41,59,0.5),rgba(2,6,23,0.6))] p-4 sm:p-6 text-white shadow-md">
        <h2 className="text-xl font-semibold">Acesso Negado</h2>
        <p className="text-gray-300">
          Você precisa estar logado para acessar os jogos. Por favor, retorne à página inicial para
          entrar.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-4">
        <nav
          className="mx-auto max-w-[1200px] mb-4 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-slate-400/15 bg-gray-900/40 p-3 text-white"
          aria-label="Navegação dos jogos"
        >
          {[
            { href: '/jogos', label: 'Início' },
            { href: '/jogos/padroes', label: 'Detective de Padrões' },
            { href: '/jogos/abstracao', label: 'Abstração' },
            { href: '/jogos/decomposicao', label: 'Decomposição' },
            { href: '/jogos/algoritmo', label: 'Algoritmos' },
            { href: '/jogos/generalizacao', label: 'Generalize+' },
            { href: '/jogos/robotica', label: 'Robótica' },
            { href: '/jogos/relatorios', label: 'Relatórios' },
            { href: '/jogos/ajustes', label: 'Ajustes' },
          ].map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-base font-medium border transition ${
                  active
                    ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-400'
                    : 'border-white/15 ring-2 ring-transparent hover:bg-blue-500/10'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
      {/* O {children} será a página do jogo específico */}
      {children}
    </>
  );
}