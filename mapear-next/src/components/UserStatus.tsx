'use client';

import { useAuth } from '@/context/AuthContext';

export default function UserStatus({ onOpenAuthModal }: { onOpenAuthModal?: () => void }) {
  const { user, userProfile, loading, signOut } = useAuth();

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
    <div className="flex items-center gap-2">
      <span className="text-gray-400">Olá, {userProfile?.name || user.email}</span>
      <button className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" type="button" onClick={signOut}>
        Sair
      </button>
    </div>
  );
}