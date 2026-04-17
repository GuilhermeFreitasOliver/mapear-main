'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
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

type MissionFrequency = 'daily' | 'weekly';
type MissionMetric = 'attempts' | 'completions' | 'reflections' | 'course_completions';
export type BadgeId =
  | 'first_attempt'
  | 'first_completion'
  | 'first_reflection'
  | 'mission_claimed'
  | 'streak_3'
  | 'all_pillars'
  | 'course_first';

export interface BadgeDefinition {
  id: BadgeId;
  title: string;
  description: string;
}

export interface BadgeStatus {
  unlocked: boolean;
  unlockedAt: number | null;
}

export type BadgesState = Record<BadgeId, BadgeStatus>;

export interface MissionProgress {
  id: string;
  title: string;
  description: string;
  frequency: MissionFrequency;
  metric: MissionMetric;
  target: number;
  progress: number;
  rewardXp: number;
  rewardCoins: number;
  claimed: boolean;
  periodKey: string;
}

export interface MissionsState {
  dailyKey: string;
  weeklyKey: string;
  items: MissionProgress[];
}

export interface GamificationState {
  xp: number;
  level: number;
  coins: number;
  streakCurrent: number;
  streakBest: number;
  lastActiveDate: string | null; // YYYY-MM-DD
}

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
  courseProgress?: Record<string, 'not-started' | 'in-progress' | 'completed'>;
  gamification: GamificationState;
  missions: MissionsState;
  badges: BadgesState;
}

const LOCAL_KEY = 'mapear_state_v1_local';

export const BADGE_CATALOG: BadgeDefinition[] = [
  {
    id: 'first_attempt',
    title: 'Primeiro passo',
    description: 'Realizou a primeira tentativa em um jogo.',
  },
  {
    id: 'first_completion',
    title: 'Primeira conquista',
    description: 'Concluiu um jogo pela primeira vez.',
  },
  {
    id: 'first_reflection',
    title: 'Pensador reflexivo',
    description: 'Salvou a primeira reflexao.',
  },
  {
    id: 'mission_claimed',
    title: 'Coletor de recompensas',
    description: 'Resgatou a primeira missao.',
  },
  {
    id: 'streak_3',
    title: 'Ritmo constante',
    description: 'Manteve 3 dias seguidos de atividade.',
  },
  {
    id: 'all_pillars',
    title: 'Dominio MAPEAR',
    description: 'Concluiu todos os 6 pilares de jogo.',
  },
  {
    id: 'course_first',
    title: 'Trilha do curso',
    description: 'Concluiu a primeira aula do curso.',
  },
];

function defaultBadges(): BadgesState {
  return BADGE_CATALOG.reduce((acc, badge) => {
    acc[badge.id] = { unlocked: false, unlockedAt: null };
    return acc;
  }, {} as BadgesState);
}

const defaultGamification = (): GamificationState => ({
  xp: 0,
  level: 1,
  coins: 0,
  streakCurrent: 0,
  streakBest: 0,
  lastActiveDate: null,
});

function computeLevelFromXp(xp: number): number {
  return Math.max(1, Math.floor(Math.sqrt(Math.max(0, xp) / 100)) + 1);
}

function toLocalISODate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toEpochDay(dateISO: string): number {
  const [y, m, d] = dateISO.split('-').map(Number);
  return Math.floor(Date.UTC(y, (m || 1) - 1, d || 1) / 86400000);
}

function getWeekKey(date = new Date()): string {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((utc.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

function createMissionTemplates(dayKey: string, weekKey: string): MissionProgress[] {
  return [
    {
      id: 'daily_attempts_3',
      title: 'Aquecimento diario',
      description: 'Realize 3 tentativas em qualquer jogo.',
      frequency: 'daily',
      metric: 'attempts',
      target: 3,
      progress: 0,
      rewardXp: 40,
      rewardCoins: 3,
      claimed: false,
      periodKey: dayKey,
    },
    {
      id: 'daily_reflection_1',
      title: 'Reflexao do dia',
      description: 'Registre 1 reflexao em um pilar.',
      frequency: 'daily',
      metric: 'reflections',
      target: 1,
      progress: 0,
      rewardXp: 30,
      rewardCoins: 2,
      claimed: false,
      periodKey: dayKey,
    },
    {
      id: 'daily_complete_1',
      title: 'Meta diaria',
      description: 'Conclua 1 jogo no dia.',
      frequency: 'daily',
      metric: 'completions',
      target: 1,
      progress: 0,
      rewardXp: 50,
      rewardCoins: 4,
      claimed: false,
      periodKey: dayKey,
    },
    {
      id: 'weekly_attempts_20',
      title: 'Ritmo semanal',
      description: 'Realize 20 tentativas na semana.',
      frequency: 'weekly',
      metric: 'attempts',
      target: 20,
      progress: 0,
      rewardXp: 120,
      rewardCoins: 10,
      claimed: false,
      periodKey: weekKey,
    },
    {
      id: 'weekly_complete_4',
      title: 'Semanista de jogos',
      description: 'Conclua 4 jogos na semana.',
      frequency: 'weekly',
      metric: 'completions',
      target: 4,
      progress: 0,
      rewardXp: 180,
      rewardCoins: 15,
      claimed: false,
      periodKey: weekKey,
    },
    {
      id: 'weekly_course_3',
      title: 'Foco no curso',
      description: 'Conclua 3 aulas do curso na semana.',
      frequency: 'weekly',
      metric: 'course_completions',
      target: 3,
      progress: 0,
      rewardXp: 150,
      rewardCoins: 12,
      claimed: false,
      periodKey: weekKey,
    },
  ];
}

function defaultMissions(date = new Date()): MissionsState {
  const dailyKey = toLocalISODate(date);
  const weeklyKey = getWeekKey(date);
  return {
    dailyKey,
    weeklyKey,
    items: createMissionTemplates(dailyKey, weeklyKey),
  };
}

function normalizeMissions(missions?: MissionsState, date = new Date()): MissionsState {
  const base = defaultMissions(date);
  if (!missions || !Array.isArray(missions.items)) return base;

  const byId = new Map(missions.items.map((m) => [m.id, m] as const));
  const items = base.items.map((template) => {
    const existing = byId.get(template.id);
    if (!existing) return template;
    if (existing.periodKey !== template.periodKey) return template;
    return {
      ...template,
      progress: Math.max(0, Math.min(template.target, existing.progress || 0)),
      claimed: !!existing.claimed,
    };
  });

  return {
    dailyKey: base.dailyKey,
    weeklyKey: base.weeklyKey,
    items,
  };
}

function updateMissionsProgress(
  missions: MissionsState | undefined,
  increments: Partial<Record<MissionMetric, number>>
): MissionsState {
  const normalized = normalizeMissions(missions);
  const items = normalized.items.map((mission) => {
    const inc = increments[mission.metric] || 0;
    if (!inc) return mission;
    return {
      ...mission,
      progress: Math.min(mission.target, mission.progress + inc),
    };
  });
  return { ...normalized, items };
}

function unlockBadge(state: GameState, badgeId: BadgeId): GameState {
  const current = state.badges[badgeId];
  if (current?.unlocked) return state;
  const updatedBadges: BadgesState = {
    ...state.badges,
    [badgeId]: { unlocked: true, unlockedAt: Date.now() },
  };
  const badgeTitle = BADGE_CATALOG.find((b) => b.id === badgeId)?.title;
  const achievements = Array.isArray(state.achievements) ? [...state.achievements] : [];
  if (badgeTitle && !achievements.includes(badgeTitle)) achievements.push(badgeTitle);
  return { ...state, badges: updatedBadges, achievements };
}

function applyBadgeUnlocks(state: GameState): GameState {
  let next = state;
  const totalAttempts = Object.values(next.progress).reduce((sum, entry) => sum + (entry?.attempts || 0), 0);
  const totalCompletedPillars = Object.values(next.progress).filter((entry) => entry?.completed).length;
  const totalReflections = Object.values(next.reflections).filter((text) => !!String(text || '').trim()).length;
  const claimedMissions = next.missions.items.filter((m) => m.claimed).length;
  const completedLessons = Object.values(next.courseProgress || {}).filter((s) => s === 'completed').length;

  if (totalAttempts >= 1) next = unlockBadge(next, 'first_attempt');
  if (totalCompletedPillars >= 1) next = unlockBadge(next, 'first_completion');
  if (totalReflections >= 1) next = unlockBadge(next, 'first_reflection');
  if (claimedMissions >= 1) next = unlockBadge(next, 'mission_claimed');
  if (next.gamification.streakCurrent >= 3) next = unlockBadge(next, 'streak_3');
  if (totalCompletedPillars >= 6) next = unlockBadge(next, 'all_pillars');
  if (completedLessons >= 1) next = unlockBadge(next, 'course_first');

  return next;
}

export function applyReflectState(state: GameState, key: Pillar, text: string): GameState {
  const reflections = { ...state.reflections };
  const wasEmpty = !String(reflections[key] || '').trim();
  const nowHasText = !!String(text || '').trim();
  reflections[key] = text;
  const streaked = applyDailyStreak(state.gamification || defaultGamification());
  const gamification = wasEmpty && nowHasText ? addXp(streaked, 15, 1) : streaked;
  const missions = wasEmpty && nowHasText
    ? updateMissionsProgress(state.missions, { reflections: 1 })
    : normalizeMissions(state.missions);
  return { ...state, reflections, gamification, missions };
}

export function applyScoreState(state: GameState, key: Pillar, value: number): GameState {
  const scores = { ...state.scores };
  const previous = scores[key];
  scores[key] = value;
  const streaked = applyDailyStreak(state.gamification || defaultGamification());
  const improved = previous === null || value > previous;
  const gamification = improved ? addXp(streaked, 10) : streaked;
  return { ...state, scores, gamification };
}

export function applyCompleteState(state: GameState, key: Pillar): GameState {
  const progress = { ...state.progress };
  const prev = progress[key] || { completed: false, attempts: 0 };
  progress[key] = { ...prev, completed: true };
  const streaked = applyDailyStreak(state.gamification || defaultGamification());
  const gamification = prev.completed ? streaked : addXp(streaked, 50, 5);
  const missions = prev.completed
    ? normalizeMissions(state.missions)
    : updateMissionsProgress(state.missions, { completions: 1 });
  return { ...state, progress, gamification, missions };
}

export function applyAttemptState(state: GameState, key: Pillar): GameState {
  const progress = { ...state.progress };
  const prev = progress[key] || { completed: false, attempts: 0 };
  progress[key] = { ...prev, attempts: (prev.attempts || 0) + 1 };
  const streaked = applyDailyStreak(state.gamification || defaultGamification());
  const gamification = addXp(streaked, 5);
  const missions = updateMissionsProgress(state.missions, { attempts: 1 });
  return { ...state, progress, gamification, missions };
}

export function applyUpdateCourseLessonState(
  state: GameState,
  lessonId: string,
  status: 'not-started' | 'in-progress' | 'completed'
): GameState {
  const courseProgress = { ...(state.courseProgress || {}) };
  const previous = courseProgress[lessonId];
  courseProgress[lessonId] = status;
  const streaked = applyDailyStreak(state.gamification || defaultGamification());
  const justCompleted = previous !== 'completed' && status === 'completed';
  const gamification = justCompleted ? addXp(streaked, 20, 2) : streaked;
  const missions = justCompleted
    ? updateMissionsProgress(state.missions, { course_completions: 1 })
    : normalizeMissions(state.missions);
  return { ...state, courseProgress, gamification, missions };
}

export function applyClaimMissionState(state: GameState, missionId: string): GameState {
  const missions = normalizeMissions(state.missions);
  const targetMission = missions.items.find((m) => m.id === missionId);
  if (!targetMission) return state;
  if (targetMission.claimed || targetMission.progress < targetMission.target) return state;

  const items = missions.items.map((mission) =>
    mission.id === missionId ? { ...mission, claimed: true } : mission
  );
  const streaked = applyDailyStreak(state.gamification || defaultGamification());
  const gamification = addXp(streaked, targetMission.rewardXp, targetMission.rewardCoins);
  return {
    ...state,
    missions: { ...missions, items },
    gamification,
  };
}

function applyDailyStreak(base: GamificationState): GamificationState {
  const today = toLocalISODate();
  if (base.lastActiveDate === today) return base;

  const previous = base.lastActiveDate ? toEpochDay(base.lastActiveDate) : null;
  const current = toEpochDay(today);
  const isConsecutive = previous !== null && current - previous === 1;
  const nextCurrent = isConsecutive ? base.streakCurrent + 1 : 1;

  return {
    ...base,
    streakCurrent: nextCurrent,
    streakBest: Math.max(base.streakBest, nextCurrent),
    lastActiveDate: today,
  };
}

function addXp(base: GamificationState, xpDelta: number, coinDelta = 0): GamificationState {
  const safeXp = Math.max(0, base.xp + xpDelta);
  return {
    ...base,
    xp: safeXp,
    level: computeLevelFromXp(safeXp),
    coins: Math.max(0, base.coins + coinDelta),
  };
}

export const createDefaultGameState = (): GameState => ({
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
  courseProgress: {},
  gamification: defaultGamification(),
  missions: defaultMissions(),
  badges: defaultBadges(),
});

function mergeWithDefault(data: Partial<GameState> | undefined): GameState {
  const def = createDefaultGameState();
  return {
    ...def,
    ...(data || {}),
    progress: { ...def.progress, ...(data?.progress || {}) },
    reflections: { ...def.reflections, ...(data?.reflections || {}) },
    scores: { ...def.scores, ...(data?.scores || {}) },
    achievements: Array.isArray(data?.achievements) ? data.achievements : def.achievements,
    events: Array.isArray(data?.events) ? data.events : def.events,
    courseProgress: { ...def.courseProgress, ...(data?.courseProgress || {}) },
    gamification: { ...def.gamification, ...(data?.gamification || {}) },
    missions: normalizeMissions(data?.missions),
    badges: { ...def.badges, ...(data?.badges || {}) },
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
  claimMission: (missionId: string) => Promise<GameState>;
  reset: () => Promise<void>;
  /**
   * Updates the progress status of a specific course lesson.
   * @param lessonId - The unique identifier of the lesson to update.
   * @param status - The new status of the lesson ('not-started', 'in-progress', or 'completed').
   * @returns A promise that resolves to the updated GameState.
   */
  updateCourseLesson: (lessonId: string, status: 'not-started' | 'in-progress' | 'completed') => Promise<GameState>;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [currentState, setCurrentState] = useState<GameState>(createDefaultGameState());
  const currentStateRef = useRef<GameState>(currentState);

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

  const getState = useCallback(async (): Promise<GameState> => {
    try {
      if (!user) {
        if (typeof window !== 'undefined') {
          const localData = localStorage.getItem(LOCAL_KEY);
          return localData ? mergeWithDefault(JSON.parse(localData) as Partial<GameState>) : createDefaultGameState();
        }
        return createDefaultGameState();
      }
      const ref = doc(db, 'userProgress', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return mergeWithDefault(snap.data() as Partial<GameState>);
      } else {
        // Se não existe no Firestore, tenta usar localStorage como fallback
        if (typeof window !== 'undefined') {
          const localData = localStorage.getItem(LOCAL_KEY);
          const base = localData ? mergeWithDefault(JSON.parse(localData) as Partial<GameState>) : createDefaultGameState();
          // Inicializa documento remoto com base
          await setDoc(ref, base);
          return base;
        }
        return createDefaultGameState();
      }
    } catch (error) {
      console.error('Erro ao carregar progresso do Firestore:', error);
      // Fallback para o estado padrão
      return createDefaultGameState();
    }
  }, [user]);

  useEffect(() => {
    let active = true;
    async function fetchState() {
      const initial = await getState();
      if (active) {
        currentStateRef.current = initial;
        setCurrentState(initial);
      }
    }
    fetchState();
    return () => {
      active = false;
    };
    // Recarrega ao trocar usuário
  }, [getState, user?.uid]);

  const update = async (updater: (s: GameState) => GameState): Promise<GameState> => {
    const base = currentStateRef.current || createDefaultGameState();
    const preparedBase: GameState = { ...base, missions: normalizeMissions(base.missions) };
    const nextRaw = updater(preparedBase);
    const normalized = {
      ...nextRaw,
      missions: normalizeMissions(nextRaw.missions),
      badges: { ...defaultBadges(), ...(nextRaw.badges || {}) },
    };
    const next = applyBadgeUnlocks(normalized);
    currentStateRef.current = next;
    setCurrentState(next);
    await saveState(next);
    return next;
  };

  const record = (type: string, payload?: unknown) =>
    update((s) => {
      const events = Array.isArray(s.events) ? [...s.events] : [];
      events.push({ type, payload, ts: Date.now() });
      const gamification = applyDailyStreak(s.gamification || defaultGamification());
      return { ...s, events, gamification };
    });

  const reflect = (key: Pillar, text: string) =>
    update((s) => applyReflectState(s, key, text));

  const score = (key: Pillar, value: number) =>
    update((s) => applyScoreState(s, key, value));

  const complete = (key: Pillar) =>
    update((s) => applyCompleteState(s, key));

  const attempt = (key: Pillar) =>
    update((s) => applyAttemptState(s, key));

  const achieve = (text: string) =>
    update((s) => {
      const achievements = Array.isArray(s.achievements) ? [...s.achievements] : [];
      if (!achievements.includes(text)) achievements.push(text);
      return { ...s, achievements };
    });

  const claimMission = (missionId: string) =>
    update((s) => applyClaimMissionState(s, missionId));

  const updateCourseLesson = (lessonId: string, status: 'not-started' | 'in-progress' | 'completed') =>
    update((s) => applyUpdateCourseLessonState(s, lessonId, status));

  const reset = async () => {
    const fresh = createDefaultGameState();
    setCurrentState(fresh);
    await saveState(fresh);
    console.log('Progresso resetado.');
  };

  const value: StorageContextType = {
    state: currentState,
    getCurrentState: () => currentStateRef.current,
    update,
    record,
    reflect,
    score,
    complete,
    attempt,
    achieve,
    claimMission,
    reset,
    updateCourseLesson,
  };

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}

export const useStorage = () => {
  const ctx = useContext(StorageContext);
  if (!ctx) throw new Error('useStorage deve ser usado dentro de um StorageProvider');
  return ctx;
};
