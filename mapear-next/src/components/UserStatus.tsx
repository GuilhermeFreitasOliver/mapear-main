'use client';

import { useAuth } from '@/context/AuthContext';

export default function UserStatus({ onOpenAuthModal }: { onOpenAuthModal?: () => void }) {
  const { user, userProfile, loading, signOut } = useAuth();

  if (loading) {
    return <span className="muted">Carregando...</span>;
  }

  if (!user) {
    return (
      <button
        className="btn ghost"
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
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span className="muted">Olá, {userProfile?.name || user.email}</span>
      <button className="btn ghost" type="button" onClick={signOut}>
        Sair
      </button>
    </div>
  );
}