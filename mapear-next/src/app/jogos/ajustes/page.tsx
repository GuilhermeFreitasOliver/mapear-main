'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStorage } from '@/context/StorageContext';

export default function AjustesPage() {
  const { reset } = useStorage();
  const [feedback, setFeedback] = useState('');

  const handleReset = async () => {
    if (typeof window !== 'undefined') {
      const ok = window.confirm('Você tem certeza que deseja apagar TODO o seu progresso? Esta ação não pode ser desfeita.');
      if (!ok) return;
    }
    await reset();
    setFeedback('Progresso apagado. A página será recarregada.');
    if (typeof window !== 'undefined') {
      setTimeout(() => window.location.reload(), 1200);
    }
  };

  return (
    <section className="card">
      <h1>Ajustes e Dados</h1>
      <p className="muted">Gerencie seus dados de progresso.</p>

      <div style={{ marginTop: 20 }}>
        <h3 style={{ color: 'var(--danger)' }}>Zona de Perigo</h3>
        <p>Apagar todo o progresso nos jogos, pontuações e reflexões. Esta ação não pode ser desfeita.</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button className="button danger" onClick={handleReset}>Apagar todo o progresso</button>
          <Link className="button secondary" href="/jogos">Voltar aos Jogos</Link>
        </div>
      </div>

      <div className="muted" style={{ marginTop: 10 }}>{feedback}</div>
    </section>
  );
}