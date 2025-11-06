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
    <section className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Ajustes e Dados</h1>
      <p className="mt-2 text-gray-300">Gerencie seus dados de progresso.</p>

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-red-400">Zona de Perigo</h3>
        <p className="mt-1">Apagar todo o progresso nos jogos, pontuações e reflexões. Esta ação não pode ser desfeita.</p>
        <div className="mt-3 flex gap-3 flex-wrap">
          <button
            className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white border border-red-500/40 bg-red-500/20 hover:bg-red-500/30"
            onClick={handleReset}
          >
            Apagar todo o progresso
          </button>
          <Link
            className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10"
            href="/jogos"
          >
            Voltar aos Jogos
          </Link>
        </div>
      </div>

      <div className="mt-3 text-gray-300">{feedback}</div>
    </section>
  );
}