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
    return `inline-flex min-h-[40px] items-center justify-center gap-1 rounded-lg border px-2.5 py-1.5 text-sm font-semibold tracking-[0.01em] transition-colors sm:px-3 sm:text-base ${
      active
        ? 'border-emerald-300/40 bg-emerald-400/20 text-emerald-50'
        : 'border-white/15 text-slate-100 hover:border-emerald-200/30 hover:bg-white/5'
    }`;
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[9999] border-b border-white/10 bg-[rgba(5,16,26,0.76)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-5 sm:py-3">
        <Link href="/conteudo" className="flex items-center gap-2 rounded-lg px-1 py-1 transition-colors hover:bg-white/[0.04]">
          <Image className="h-8 w-8 rounded-lg ring-1 ring-white/20" src="/MAPEARFavicon.png" alt="Logo MAPEAR" width={32} height={32} priority />
          <div className="flex flex-col leading-tight">
            <span className="hidden font-extrabold tracking-wide text-emerald-300 sm:inline">Arcabouco Pedagogico MAPEAR</span>
            <span className="text-sm font-extrabold tracking-wide text-emerald-300 sm:hidden">MAPEAR</span>
            <span className="hidden text-[11px] text-slate-300/80 md:inline">Ensino com games e progresso real</span>
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
