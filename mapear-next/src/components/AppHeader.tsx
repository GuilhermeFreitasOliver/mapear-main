'use client';

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import UserStatus from "./UserStatus";

export default function AppHeader() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-gray-900 border-b border-white/10 shadow-2xl px-3 sm:px-5 py-2 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image className="w-8 h-8 rounded-lg" src="/MAPEARFavicon.png" alt="Logo MAPEAR" width={32} height={32} priority />
          <span className="hidden sm:inline font-extrabold tracking-wide text-green-500">Arcabouço Pedagógico MAPEAR</span>
          <span className="sm:hidden font-extrabold tracking-wide text-green-500 text-sm">MAPEAR</span>
        </div>
      </div>
      <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <Link className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/conteudo">Início</Link>
        {user && (
          <>
            <Link className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/curso">Curso</Link>
            <Link className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/jogos">Jogos</Link>
          </>
        )}
        <UserStatus />
      </nav>
    </header>
  );
}
