'use client';

import { useMemo, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { BADGE_CATALOG, type MissionProgress, useStorage } from '@/context/StorageContext';

type MissionView = 'daily' | 'weekly';

export default function PerfilPage() {
  const { user, userProfile } = useAuth();
  const { state, claimMission } = useStorage();

  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [missionView, setMissionView] = useState<MissionView>('daily');

  const profileName = userProfile?.name || user?.displayName || user?.email || 'Usuario';
  const email = userProfile?.email || user?.email || '-';

  const completedPillars = useMemo(() => {
    return Object.values(state.progress || {}).filter((entry) => entry?.completed).length;
  }, [state.progress]);

  const totalAttempts = useMemo(() => {
    return Object.values(state.progress || {}).reduce((sum, entry) => sum + (entry?.attempts || 0), 0);
  }, [state.progress]);

  const courseCompletedLessons = useMemo(() => {
    return Object.values(state.courseProgress || {}).filter((status) => status === 'completed').length;
  }, [state.courseProgress]);

  const totalEvents = Array.isArray(state.events) ? state.events.length : 0;
  const totalAchievements = BADGE_CATALOG.filter((badge) => state.badges[badge.id]?.unlocked).length;

  const lastEventAt = useMemo(() => {
    if (!Array.isArray(state.events) || !state.events.length) return '-';
    const lastTs = Math.max(...state.events.map((e) => e.ts || 0));
    if (!lastTs) return '-';
    return new Date(lastTs).toLocaleString('pt-BR');
  }, [state.events]);

  const gamification = state.gamification;
  const currentLevel = gamification.level;
  const currentXp = gamification.xp;
  const levelStartXp = Math.max(0, (currentLevel - 1) * (currentLevel - 1) * 100);
  const nextLevelXp = currentLevel * currentLevel * 100;
  const levelSpan = Math.max(1, nextLevelXp - levelStartXp);
  const levelProgressXp = Math.max(0, currentXp - levelStartXp);
  const xpBarPercent = Math.max(0, Math.min(100, Math.round((levelProgressXp / levelSpan) * 100)));

  const missions = state.missions.items;
  const dailyMissions = missions.filter((m) => m.frequency === 'daily');
  const weeklyMissions = missions.filter((m) => m.frequency === 'weekly');

  const visibleMissions = missionView === 'daily' ? dailyMissions : weeklyMissions;
  const missionPeriodLabel = missionView === 'daily' ? state.missions.dailyKey : state.missions.weeklyKey;

  const completedVisibleMissions = visibleMissions.filter((m) => m.progress >= m.target).length;

  const handleClaimMission = async (missionId: string) => {
    setClaimingId(missionId);
    try {
      await claimMission(missionId);
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <ProtectedRoute>
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_82%_-8%,rgba(59,130,246,0.26),transparent_40%),radial-gradient(circle_at_0%_100%,rgba(34,197,94,0.20),transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.95))] p-4 sm:p-6 text-gray-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <header className="max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-300/90">MAPEAR PROFILE</p>
          <h1 className="mt-2 text-2xl sm:text-4xl font-black tracking-tight">Sua jornada de aprendizagem</h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Acompanhe progresso, missões ativas e recompensas em um só lugar.
          </p>
        </header>

        <section className="mt-6 rounded-xl border border-white/10 bg-slate-950/45 p-4 sm:p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Identidade</p>
              <h2 className="mt-1 text-xl font-bold text-white">{profileName}</h2>
              <p className="text-sm text-slate-400">{email}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-slate-300">Nivel {currentLevel}</span>
                <span className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-slate-300">{gamification.coins} moedas</span>
                <span className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-slate-300">Streak {gamification.streakCurrent}d</span>
              </div>
            </div>

            <div className="w-full lg:max-w-[520px]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Progresso de nivel</span>
                <span className="font-semibold text-emerald-300">Nivel {currentLevel}</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {levelProgressXp} / {levelSpan} XP para chegar ao proximo nivel
              </p>
              <div className="mt-2 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#22c55e,#3b82f6)] transition-all duration-500"
                  style={{ width: `${xpBarPercent}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.65fr_1fr]">
          <section className="rounded-xl border border-white/10 bg-slate-950/40 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">Missoes</h3>
                <p className="text-sm text-slate-400">Periodo ativo: {missionPeriodLabel}</p>
              </div>

              <div className="inline-flex w-full sm:w-auto rounded-lg border border-white/10 bg-slate-900/60 p-1">
                <button
                  type="button"
                  onClick={() => setMissionView('daily')}
                  className={`flex-1 sm:flex-none px-3 py-2 text-sm font-semibold rounded-md transition-colors ${missionView === 'daily' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:text-white'}`}
                >
                  Diarias
                </button>
                <button
                  type="button"
                  onClick={() => setMissionView('weekly')}
                  className={`flex-1 sm:flex-none px-3 py-2 text-sm font-semibold rounded-md transition-colors ${missionView === 'weekly' ? 'bg-blue-500/20 text-blue-300' : 'text-slate-300 hover:text-white'}`}
                >
                  Semanais
                </button>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-300">
              Concluidas no periodo: <span className="font-semibold text-white">{completedVisibleMissions}/{visibleMissions.length}</span>
            </p>

            <div className="mt-4 space-y-3">
              {visibleMissions.map((mission) => (
                <MissionRow
                  key={mission.id}
                  mission={mission}
                  claiming={claimingId === mission.id}
                  onClaim={handleClaimMission}
                />
              ))}
              {visibleMissions.length === 0 && (
                <div className="rounded-lg border border-dashed border-white/20 bg-white/[0.02] p-4 text-sm text-slate-400">
                  Nenhuma missao disponivel neste periodo.
                </div>
              )}
            </div>
          </section>

          <aside className="rounded-xl border border-white/10 bg-slate-950/40 p-4 sm:p-5 lg:sticky lg:top-24 h-fit">
            <h3 className="text-lg font-bold text-white">Resumo rapido</h3>
            <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
              <MetricLine label="XP total" value={`${gamification.xp}`} />
              <MetricLine label="Moedas" value={`${gamification.coins}`} />
              <MetricLine label="Streak atual" value={`${gamification.streakCurrent} dia(s)`} />
              <MetricLine label="Melhor streak" value={`${gamification.streakBest} dia(s)`} />
              <MetricLine label="Jogos concluidos" value={`${completedPillars}/6`} />
              <MetricLine label="Tentativas" value={`${totalAttempts}`} />
              <MetricLine label="Aulas concluidas" value={`${courseCompletedLessons}`} />
              <MetricLine label="Conquistas" value={`${totalAchievements}`} />
              <MetricLine label="Eventos" value={`${totalEvents}`} />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">Ultima atividade: {lastEventAt}</p>
          </aside>
        </div>

        <section className="mt-5 rounded-xl border border-white/10 bg-slate-950/40 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-white">Badges</h3>
            <p className="text-sm text-slate-400">{totalAchievements}/{BADGE_CATALOG.length} desbloqueadas</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BADGE_CATALOG.map((badge) => {
              const unlocked = !!state.badges[badge.id]?.unlocked;
              const unlockedAt = state.badges[badge.id]?.unlockedAt;
              const glyph = badgeGlyph(badge.id);
              return (
                <article
                  key={badge.id}
                  className={`rounded-xl border p-3 transition-colors ${
                    unlocked
                      ? 'border-emerald-400/40 bg-emerald-500/10'
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className={`h-11 w-11 rounded-full border flex items-center justify-center text-lg ${
                          unlocked
                            ? 'border-emerald-300/60 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.55),rgba(30,41,59,0.85))] shadow-[0_0_18px_rgba(16,185,129,0.35)]'
                            : 'border-slate-600/60 bg-slate-800/80 text-slate-500'
                        }`}
                      >
                        {glyph}
                      </div>
                      {unlocked && <span className="absolute -right-0.5 -bottom-0.5 text-[10px]">✨</span>}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white">{badge.title}</h4>
                      <span className={`text-xs font-semibold ${unlocked ? 'text-emerald-300' : 'text-slate-400'}`}>
                        {unlocked ? 'Ativa' : 'Bloqueada'}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-slate-300">{badge.description}</p>
                  {unlocked && unlockedAt ? (
                    <p className="mt-2 text-[11px] text-emerald-200/90">
                      Desbloqueada em {new Date(unlockedAt).toLocaleDateString('pt-BR')}
                    </p>
                  ) : (
                    <p className="mt-2 text-[11px] text-slate-500">Continue evoluindo para desbloquear.</p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </ProtectedRoute>
  );
}

function MissionRow({
  mission,
  onClaim,
  claiming,
}: {
  mission: MissionProgress;
  onClaim: (missionId: string) => Promise<void>;
  claiming: boolean;
}) {
  const progressPercent = Math.max(0, Math.min(100, Math.round((mission.progress / mission.target) * 100)));
  const completed = mission.progress >= mission.target;
  const claimDisabled = mission.claimed || !completed || claiming;

  return (
    <article className="rounded-xl border border-white/10 bg-slate-900/50 p-3 transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/20">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="font-semibold text-white">{mission.title}</h4>
          <p className="text-sm text-slate-300 mt-0.5">{mission.description}</p>
        </div>
        <span className="text-xs font-semibold text-slate-300">{mission.progress}/{mission.target}</span>
      </div>

      <div className="mt-2 h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#22c55e,#3b82f6)] transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-xs text-emerald-300">
          +{mission.rewardXp} XP · +{mission.rewardCoins} moedas
        </p>
        <button
          type="button"
          disabled={claimDisabled}
          onClick={() => onClaim(mission.id)}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mission.claimed ? 'Resgatada' : claiming ? 'Resgatando...' : 'Resgatar'}
        </button>
      </div>
    </article>
  );
}

function MetricLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function badgeGlyph(
  id:
    | 'first_attempt'
    | 'first_completion'
    | 'first_reflection'
    | 'mission_claimed'
    | 'streak_3'
    | 'all_pillars'
    | 'course_first'
) {
  switch (id) {
    case 'first_attempt':
      return '🎯';
    case 'first_completion':
      return '🏁';
    case 'first_reflection':
      return '🧠';
    case 'mission_claimed':
      return '🎁';
    case 'streak_3':
      return '🔥';
    case 'all_pillars':
      return '👑';
    case 'course_first':
      return '📘';
    default:
      return '⭐';
  }
}
