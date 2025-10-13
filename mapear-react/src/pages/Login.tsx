import { useState } from 'react';
import type { FormEvent } from 'react';
import { loginWithEmail, registerWithEmail, signInWithGoogle } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { currentUser } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (currentUser) return <Navigate to="/conteudo" replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, name);
      }
    } catch (err: any) {
      setError(err?.message || 'Falha de autenticação. Verifique os dados.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 420, margin: '24px auto' }}>
      <h2 style={{ marginBottom: 8 }}>{mode === 'login' ? 'Entrar' : 'Criar conta'}</h2>
      <p className="muted" style={{ marginTop: 0 }}>
        {mode === 'login' ? 'Acesse com seu e-mail e senha' : 'Crie sua conta com nome, e-mail e senha'}
      </p>

      {error && <div className="error" style={{ color: 'var(--danger)', marginBottom: 8 }}>{error}</div>}

      <form onSubmit={onSubmit} className="form" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {mode === 'register' && (
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn primary" type="submit" disabled={submitting}>
          {submitting ? 'Enviando...' : mode === 'login' ? 'Entrar' : 'Registrar'}
        </button>
      </form>

      <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
        <div style={{ height: 1, background: 'var(--border)', flex: 1 }} />
        <span className="muted" style={{ fontSize: 12 }}>ou</span>
        <div style={{ height: 1, background: 'var(--border)', flex: 1 }} />
      </div>

      <button className="btn ghost" onClick={() => signInWithGoogle()} style={{ width: '100%', marginTop: 8 }}>
        Entrar com Google
      </button>

      <p className="muted" style={{ marginTop: 12, textAlign: 'center' }}>
        {mode === 'login' ? (
          <>
            Não tem conta?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setMode('register'); }}>Registre-se</a>
          </>
        ) : (
          <>
            Já tem conta?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setMode('login'); }}>Entrar</a>
          </>
        )}
      </p>
    </div>
  );
};

export default Login;