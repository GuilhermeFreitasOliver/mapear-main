'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

// Tipos de pilares dos jogos
export type Pillar =
  | 'padroes'
  | 'abstracao'
  | 'decomposicao'
  | 'algoritmo'
  | 'generalizacao'
  | 'robotica';

type ProgressEntry = { completed: boolean; attempts: number };

type Progress = Record<Pillar, ProgressEntry>;

type Reflections = Record<Pillar, string>;

type Scores = Record<Pillar, number | null>;

export interface GameEvent {
  type: string;
  payload?: unknown;
  ts: number;
}

export interface GameState {
  progress: Progress;
  reflections: Reflections;
  scores: Scores;
  achievements: string[];
  events: GameEvent[];
}

const LOCAL_KEY = 'mapear_state_v1_local';

const defaultState = (): GameState => ({
  progress: {
    padroes: { completed: false, attempts: 0 },
    abstracao: { completed: false, attempts: 0 },
    decomposicao: { completed: false, attempts: 0 },
    algoritmo: { completed: false, attempts: 0 },
    generalizacao: { completed: false, attempts: 0 },
    robotica: { completed: false, attempts: 0 },
  },
  reflections: {
    padroes: '',
    abstracao: '',
    decomposicao: '',
    algoritmo: '',
    generalizacao: '',
    robotica: '',
  },
  scores: {
    padroes: null,
    abstracao: null,
    decomposicao: null,
    algoritmo: null,
    generalizacao: null,
    robotica: null,
  },
  achievements: [],
  events: [],
});

function mergeWithDefault(data: Partial<GameState> | undefined): GameState {
  const def = defaultState();
  return {
    ...def,
    ...(data || {}),
    progress: { ...def.progress, ...(data?.progress || {}) },
    reflections: { ...def.reflections, ...(data?.reflections || {}) },
    scores: { ...def.scores, ...(data?.scores || {}) },
    achievements: Array.isArray(data?.achievements) ? data.achievements : def.achievements,
    events: Array.isArray(data?.events) ? data.events : def.events,
  } as GameState;
}

interface StorageContextType {
  state: GameState;
  getCurrentState: () => GameState;
  update: (updater: (s: GameState) => GameState) => Promise<GameState>;
  record: (type: string, payload?: unknown) => Promise<GameState>;
  reflect: (key: Pillar, text: string) => Promise<GameState>;
  score: (key: Pillar, score: number) => Promise<GameState>;
  complete: (key: Pillar) => Promise<GameState>;
  attempt: (key: Pillar) => Promise<GameState>;
  achieve: (text: string) => Promise<GameState>;
  reset: () => Promise<void>;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [currentState, setCurrentState] = useState<GameState>(defaultState());

  const saveState = async (next: GameState) => {
    try {
      if (!user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
        }
        return;
      }
      const ref = doc(db, 'userProgress', user.uid);
      await setDoc(ref, next);
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
      }
    } catch (error) {
      console.error('Erro ao salvar progresso no Firestore:', error);
    }
  };

  const getState = async (): Promise<GameState> => {
    try {
      if (!user) {
        if (typeof window !== 'undefined') {
          const localData = localStorage.getItem(LOCAL_KEY);
          return localData ? mergeWithDefault(JSON.parse(localData) as Partial<GameState>) : defaultState();
        }
        return defaultState();
      }
      const ref = doc(db, 'userProgress', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return mergeWithDefault(snap.data() as Partial<GameState>);
      } else {
        // Se não existe no Firestore, tenta usar localStorage como fallback
        if (typeof window !== 'undefined') {
          const localData = localStorage.getItem(LOCAL_KEY);
          const base = localData ? mergeWithDefault(JSON.parse(localData) as Partial<GameState>) : defaultState();
          // Inicializa documento remoto com base
          await setDoc(ref, base);
          return base;
        }
        return defaultState();
      }
    } catch (error) {
      console.error('Erro ao carregar progresso do Firestore:', error);
      // Fallback para o estado padrão
      return defaultState();
    }
  };

  useEffect(() => {
    let active = true;
    async function fetchState() {
      const initial = await getState();
      if (active) setCurrentState(initial);
    }
    fetchState();
    return () => {
      active = false;
    };
    // Recarrega ao trocar usuário
  }, [user?.uid]);

  const update = async (updater: (s: GameState) => GameState): Promise<GameState> => {
    const base = currentState || defaultState();
    const next = updater({ ...base });
    setCurrentState(next);
    await saveState(next);
    return next;
  };

  const record = (type: string, payload?: unknown) =>
    update((s) => {
      const events = Array.isArray(s.events) ? [...s.events] : [];
      events.push({ type, payload, ts: Date.now() });
      return { ...s, events };
    });

  const reflect = (key: Pillar, text: string) =>
    update((s) => {
      const reflections = { ...s.reflections };
      reflections[key] = text;
      return { ...s, reflections };
    });

  const score = (key: Pillar, value: number) =>
    update((s) => {
      const scores = { ...s.scores };
      scores[key] = value;
      return { ...s, scores };
    });

  const complete = (key: Pillar) =>
    update((s) => {
      const progress = { ...s.progress };
      progress[key] = { ...progress[key], completed: true };
      return { ...s, progress };
    });

  const attempt = (key: Pillar) =>
    update((s) => {
      const progress = { ...s.progress };
      const prev = progress[key] || { completed: false, attempts: 0 };
      progress[key] = { ...prev, attempts: (prev.attempts || 0) + 1 };
      return { ...s, progress };
    });

  const achieve = (text: string) =>
    update((s) => {
      const achievements = Array.isArray(s.achievements) ? [...s.achievements] : [];
      if (!achievements.includes(text)) achievements.push(text);
      return { ...s, achievements };
    });

  const reset = async () => {
    const fresh = defaultState();
    setCurrentState(fresh);
    await saveState(fresh);
    console.log('Progresso resetado.');
  };

  const value: StorageContextType = {
    state: currentState,
    getCurrentState: () => currentState,
    update,
    record,
    reflect,
    score,
    complete,
    attempt,
    achieve,
    reset,
  };

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}

export const useStorage = () => {
  const ctx = useContext(StorageContext);
  if (!ctx) throw new Error('useStorage deve ser usado dentro de um StorageProvider');
  return ctx;
};