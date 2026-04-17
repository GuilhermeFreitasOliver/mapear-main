'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UserStatus from './UserStatus';

export default function AppHeader() {
  const { user } = useAuth();
  const pathname = usePathname();

  const navClass = (href: string) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return `inline-flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-semibold border transition-colors ${
      active
        ? 'text-white border-emerald-400/40 bg-emerald-500/15'
        : 'text-white border-white/20 hover:bg-blue-500/10'
    }`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] border-b border-white/10 bg-slate-950/90 backdrop-blur-md shadow-2xl">
      <div className="flex w-full flex-wrap items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-5 sm:py-3">
        <Link href="/conteudo" className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-white/[0.04]">
          <Image className="h-8 w-8 rounded-lg" src="/MAPEARFavicon.png" alt="Logo MAPEAR" width={32} height={32} priority />
          <div className="flex flex-col leading-tight">
            <span className="hidden sm:inline font-extrabold tracking-wide text-green-500">Arcabouco Pedagogico MAPEAR</span>
            <span className="sm:hidden font-extrabold tracking-wide text-green-500 text-sm">MAPEAR</span>
            <span className="hidden md:inline text-[11px] text-slate-400">Ensino com games e progresso real</span>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          <Link className={navClass('/conteudo')} href="/conteudo">
            Inicio
          </Link>
          {user && (
            <>
              <Link className={navClass('/curso')} href="/curso">
                Curso
              </Link>
              <Link className={navClass('/jogos')} href="/jogos">
                Jogos
              </Link>
            </>
          )}
          <UserStatus />
        </nav>
      </div>
    </header>
  );
}
