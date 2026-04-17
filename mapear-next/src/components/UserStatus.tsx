'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useStorage } from '@/context/StorageContext';

export default function UserStatus({ onOpenAuthModal }: { onOpenAuthModal?: () => void }) {
  const { user, userProfile, loading, signOut } = useAuth();
  const { state } = useStorage();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsProfileOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const profileName = userProfile?.name || user?.displayName || user?.email || 'Usuario';
  const email = userProfile?.email || user?.email || '-';
  const gamification = state.gamification;
  const currentLevel = gamification.level;
  const currentXp = gamification.xp;
  const levelStartXp = Math.max(0, (currentLevel - 1) * (currentLevel - 1) * 100);
  const nextLevelXp = currentLevel * currentLevel * 100;
  const levelSpan = Math.max(1, nextLevelXp - levelStartXp);
  const levelProgressXp = Math.max(0, currentXp - levelStartXp);
  const xpBarPercent = Math.max(0, Math.min(100, Math.round((levelProgressXp / levelSpan) * 100)));

  const initials = useMemo(() => {
    const tokens = profileName.split(' ').filter(Boolean);
    if (!tokens.length) return 'U';
    if (tokens.length === 1) return tokens[0].slice(0, 1).toUpperCase();
    return `${tokens[0].slice(0, 1)}${tokens[tokens.length - 1].slice(0, 1)}`.toUpperCase();
  }, [profileName]);

  if (loading) {
    return <span className="text-gray-400">Carregando...</span>;
  }

  if (!user) {
    return (
      <button
        className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10"
        type="button"
        onClick={() => {
          if (onOpenAuthModal) {
            onOpenAuthModal();
          } else if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('auth-modal:open'));
          }
        }}
      >
        Entrar
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isProfileOpen}
        onClick={() => setIsProfileOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.03] px-2.5 py-1.5 hover:bg-white/[0.08] transition-colors"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 text-slate-950 font-black text-xs">
          {initials}
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight min-w-[140px]">
          <span className="text-xs text-slate-400">Meu Perfil</span>
          <span className="max-w-[180px] truncate text-sm font-semibold text-white">{profileName}</span>
          <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <span
              className="block h-full rounded-full bg-[linear-gradient(90deg,#22c55e,#3b82f6)] transition-all duration-500"
              style={{ width: `${xpBarPercent}%` }}
            />
          </span>
        </span>
      </button>

      {isProfileOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar perfil"
            className="fixed inset-0 z-[10000] cursor-default bg-transparent"
            onClick={() => setIsProfileOpen(false)}
          />

          <section className="absolute right-0 mt-2 z-[10001] w-[300px] sm:w-[340px] rounded-2xl border border-slate-500/30 bg-[#0f1729] p-4 shadow-[0_8px_40px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 text-slate-950 font-black text-sm">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold text-white">{profileName}</p>
                <p className="truncate text-xs text-slate-400">{email}</p>
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-wide text-emerald-300">XP</p>
                <p className="text-xs font-semibold text-white">Nivel {currentLevel}</p>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {levelProgressXp} / {levelSpan}
              </p>
              <div className="mt-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-[linear-gradient(90deg,#22c55e,#3b82f6)]" style={{ width: `${xpBarPercent}%` }} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href="/perfil"
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10"
                onClick={() => setIsProfileOpen(false)}
              >
                Abrir perfil
              </Link>
              <button
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10"
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  signOut();
                }}
              >
                Sair
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
