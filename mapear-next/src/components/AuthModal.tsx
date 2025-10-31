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
  const [age, setAge] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    setAge('');
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
    } catch (err: any) {
      setError(err?.message ?? 'Falha ao entrar. Tente novamente.');
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
     } catch (err: any) {
       setError(err?.message ?? 'Falha no login com Google.');
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
      // Cria o perfil do usuário no Firestore com nome, idade e email
      try {
        const { doc, setDoc } = await import('firebase/firestore/lite');
        await setDoc(doc(db, 'users', cred.user.uid), {
          name: name || cred.user.displayName || email.trim(),
          age: typeof age === 'number' ? age : undefined,
          email: email.trim(),
        });
      } catch (profileErr) {
        console.warn('Falha ao salvar perfil no Firestore:', profileErr);
      }
       resetForm();
       setIsOpen(false);
       setView('login');
     } catch (err: any) {
       setError(err?.message ?? 'Falha ao registrar. Tente novamente.');
     } finally {
       setLoading(false);
     }
   };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 10000,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.6)',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="card"
        style={{ margin: '10% auto', width: '90%', maxWidth: 400, position: 'relative', backgroundColor: 'var(--panel)' }}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => setIsOpen(false)}
          style={{ position: 'absolute', top: 10, right: 15, background: 'none', border: 'none', fontSize: 24, color: 'var(--muted)', cursor: 'pointer' }}
        >
          &times;
        </button>

        {view === 'login' ? (
          <div>
            <h2>Entrar</h2>
            <p className="muted">Acesse sua conta para continuar.</p>
            <form onSubmit={handleLogin}>
              <label htmlFor="login-email">Email</label>
              <input id="login-email" type="email" className="input" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="login-password" style={{ marginTop: 10 }}>Senha</label>
              <input id="login-password" type="password" className="input" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="btn primary" style={{ width: '100%', marginTop: 16 }} disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
            <div style={{ textAlign: 'center', margin: '16px 0', color: 'var(--muted)' }}>ou</div>
            <button type="button" className="btn secondary" style={{ width: '100%' }} disabled={loading} onClick={handleGoogleLogin}>
              Entrar com Google
            </button>
            <p style={{ textAlign: 'center', marginTop: 16 }}>
              Não tem uma conta?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setView('register'); setError(''); }}>
                Registre-se
              </a>
            </p>
          </div>
        ) : (
          <div>
            <h2>Criar Conta</h2>
            <p className="muted">Preencha os campos para criar seu perfil.</p>
            <form onSubmit={handleRegister}>
              <label htmlFor="register-name">Nome</label>
              <input id="register-name" type="text" className="input" required value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="register-age" style={{ marginTop: 10 }}>Idade</label>
              <input id="register-age" type="number" className="input" value={age || ''} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')} />
              <label htmlFor="register-email" style={{ marginTop: 10 }}>Email</label>
              <input id="register-email" type="email" className="input" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="register-password" style={{ marginTop: 10 }}>Senha (mínimo 6 caracteres)</label>
              <input id="register-password" type="password" className="input" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="btn primary" style={{ width: '100%', marginTop: 16 }} disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar'}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: 16 }}>
              Já tem uma conta?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setView('login'); setError(''); }}>
                Faça o login
              </a>
            </p>
          </div>
        )}

        {error && <p style={{ color: 'var(--danger)', textAlign: 'center', marginTop: 10 }}>{error}</p>}
      </div>
    </div>
  );
}