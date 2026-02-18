'use client';

import { useEffect, useState, useCallback } from 'react';
import { auth, db } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';

type View = 'login' | 'register';

export default function AuthModal() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function toMessage(err: unknown, fallback: string): string {
    if (err instanceof Error && typeof err.message === 'string') return err.message;
    if (typeof err === 'string') return err;
    return fallback;
  }

  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    const closeHandler = () => setIsOpen(false);
    window.addEventListener('auth-modal:open', openHandler);
    window.addEventListener('auth-modal:close', closeHandler);
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', escHandler);

    return () => {
      window.removeEventListener('auth-modal:open', openHandler);
      window.removeEventListener('auth-modal:close', closeHandler);
      window.removeEventListener('keydown', escHandler);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setIsOpen(false);
    }
  }, [user]);

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      resetForm();
      setIsOpen(false);
    } catch (err: unknown) {
      setError(toMessage(err, 'Falha ao entrar. Tente novamente.'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      // Se for novo usuário, cria o perfil no Firestore (name/email)
      const info = getAdditionalUserInfo(cred);
      if (info?.isNewUser) {
        const { doc, setDoc } = await import('firebase/firestore/lite');
        await setDoc(doc(db, 'users', cred.user.uid), {
          name: cred.user.displayName || cred.user.email || 'Usuário',
          email: cred.user.email || '',
        });
      }
      resetForm();
      setIsOpen(false);
    } catch (err: unknown) {
      setError(toMessage(err, 'Falha no login com Google.'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      // Cria o perfil do usuário no Firestore com nome e email
      try {
        const { doc, setDoc } = await import('firebase/firestore/lite');
        await setDoc(doc(db, 'users', cred.user.uid), {
          name: name || cred.user.displayName || email.trim(),
          email: email.trim(),
        });
      } catch (profileErr) {
        console.warn('Falha ao salvar perfil no Firestore:', profileErr);
      }
      resetForm();
      setIsOpen(false);
      setView('login');
    } catch (err: unknown) {
      setError(toMessage(err, 'Falha ao registrar. Tente novamente.'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] overflow-auto bg-black/75 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={() => setIsOpen(false)}>
      <div className="relative mx-auto my-[10%] w-[90%] max-w-[420px] rounded-2xl border border-slate-500/30 bg-[#0f1729] shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(34,197,94,0.08)] p-6" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => setIsOpen(false)}
          className="absolute top-2.5 right-3 bg-transparent border-0 text-2xl text-gray-400 cursor-pointer hover:text-gray-300"
        >
          &times;
        </button>

        {view === 'login' ? (
          <div>
            <h2>Entrar</h2>
            <p className="text-gray-400">Acesse sua conta para continuar.</p>
            <form onSubmit={handleLogin}>
              <label htmlFor="login-email" className="block text-xs text-gray-400 mt-2">Email</label>
              <input id="login-email" type="email" className="w-full px-3 py-2 rounded-md border border-slate-500/50 bg-[#0b1220] text-gray-100" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="login-password" className="block text-xs text-gray-400 mt-2.5">Senha</label>
              <input id="login-password" type="password" className="w-full px-3 py-2 rounded-md border border-slate-500/50 bg-[#0b1220] text-gray-100" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="w-full mt-4 inline-flex items-center justify-center gap-2 font-extrabold tracking-wide px-4 py-3 rounded-xl text-white shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-blue-500/45 bg-[linear-gradient(135deg,#16a34a,#22c55e_50%,#10b981)]" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
            <div className="text-center my-4 text-gray-400">ou</div>
            <button type="button" className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors" disabled={loading} onClick={handleGoogleLogin}>
              <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              Entrar com Google
            </button>
            <p className="text-center mt-4 text-gray-400">
              Não tem uma conta?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setView('register'); setError(''); }} className="text-emerald-400 font-bold underline underline-offset-4 decoration-emerald-400/50">
                Registre-se
              </a>
            </p>
          </div>
        ) : (
          <div>
            <h2>Criar Conta</h2>
            <p className="text-gray-400">Preencha os campos para criar seu perfil.</p>
            <form onSubmit={handleRegister}>
              <label htmlFor="register-name" className="block text-xs text-gray-400 mt-2">Nome</label>
              <input id="register-name" type="text" className="w-full px-3 py-2 rounded-md border border-slate-500/50 bg-[#0b1220] text-gray-100" required value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="register-email" className="block text-xs text-gray-400 mt-2.5">Email</label>
              <input id="register-email" type="email" className="w-full px-3 py-2 rounded-md border border-slate-500/50 bg-[#0b1220] text-gray-100" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="register-password" className="block text-xs text-gray-400 mt-2.5">Senha (mínimo 6 caracteres)</label>
              <input id="register-password" type="password" className="w-full px-3 py-2 rounded-md border border-slate-500/50 bg-[#0b1220] text-gray-100" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="w-full mt-4 inline-flex items-center justify-center gap-2 font-extrabold tracking-wide px-4 py-3 rounded-xl text-white shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-blue-500/45 bg-[linear-gradient(135deg,#16a34a,#22c55e_50%,#10b981)]" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar'}
              </button>
            </form>
            <p className="text-center mt-4 text-gray-400">
              Já tem uma conta?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setView('login'); setError(''); }} className="text-emerald-400 font-bold underline underline-offset-4 decoration-emerald-400/50">
                Faça o login
              </a>
            </p>
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}