import assert from 'node:assert/strict';
import {
  createDefaultGameState,
  applyAttemptState,
  applyCompleteState,
  applyReflectState,
  applyUpdateCourseLessonState,
  applyClaimMissionState,
} from '../src/context/StorageContext';

function getMission(state: ReturnType<typeof createDefaultGameState>, id: string) {
  const m = state.missions.items.find((x) => x.id === id);
  assert.ok(m, `Mission ${id} should exist`);
  return m!;
}

let state = createDefaultGameState();

const xp0 = state.gamification.xp;
state = applyAttemptState(state, 'padroes');
assert.equal(state.gamification.xp, xp0 + 5, 'Attempt must grant +5 XP');
assert.equal(state.progress.padroes.attempts, 1, 'Attempt counter must increment');
assert.equal(getMission(state, 'daily_attempts_3').progress, 1, 'Daily attempts mission must progress');

for (let i = 0; i < 10; i++) state = applyAttemptState(state, 'padroes');
const dailyAttempts = getMission(state, 'daily_attempts_3');
assert.equal(dailyAttempts.progress, dailyAttempts.target, 'Mission progress must cap at target');

const xpBeforeClaim = state.gamification.xp;
const coinsBeforeClaim = state.gamification.coins;
state = applyClaimMissionState(state, 'daily_attempts_3');
const claimed = getMission(state, 'daily_attempts_3');
assert.equal(claimed.claimed, true, 'Mission should be marked as claimed');
assert.equal(state.gamification.xp, xpBeforeClaim + claimed.rewardXp, 'Claim should add mission XP reward');
assert.equal(state.gamification.coins, coinsBeforeClaim + claimed.rewardCoins, 'Claim should add mission coin reward');

const xpAfterFirstClaim = state.gamification.xp;
state = applyClaimMissionState(state, 'daily_attempts_3');
assert.equal(state.gamification.xp, xpAfterFirstClaim, 'Claiming same mission twice must not add XP');

const xpBeforeComplete = state.gamification.xp;
state = applyCompleteState(state, 'abstracao');
assert.equal(state.gamification.xp, xpBeforeComplete + 50, 'First completion must grant +50 XP');
assert.equal(getMission(state, 'daily_complete_1').progress, 1, 'Daily completion mission must progress');

const xpAfterComplete = state.gamification.xp;
state = applyCompleteState(state, 'abstracao');
assert.equal(state.gamification.xp, xpAfterComplete, 'Repeated completion should not grant XP again');

const xpBeforeReflection = state.gamification.xp;
state = applyReflectState(state, 'padroes', 'Primeira reflexao');
assert.equal(state.gamification.xp, xpBeforeReflection + 15, 'First valid reflection must grant +15 XP');
assert.equal(getMission(state, 'daily_reflection_1').progress, 1, 'Daily reflection mission must progress');

const xpAfterReflection = state.gamification.xp;
state = applyReflectState(state, 'padroes', 'Atualizacao da mesma reflexao');
assert.equal(state.gamification.xp, xpAfterReflection, 'Updating existing reflection must not grant XP again');

const xpBeforeCourse = state.gamification.xp;
state = applyUpdateCourseLessonState(state, 'lesson-1', 'completed');
assert.equal(state.gamification.xp, xpBeforeCourse + 20, 'Course completion must grant +20 XP');
assert.equal(getMission(state, 'weekly_course_3').progress, 1, 'Weekly course mission must progress');

const xpBeforeCourseRepeat = state.gamification.xp;
state = applyUpdateCourseLessonState(state, 'lesson-1', 'completed');
assert.equal(state.gamification.xp, xpBeforeCourseRepeat, 'Re-completing same lesson must not grant XP again');

const weeklyAttemptsBefore = getMission(state, 'weekly_attempts_20').progress;
state = applyAttemptState(state, 'robotica');
assert.equal(getMission(state, 'weekly_attempts_20').progress, weeklyAttemptsBefore + 1, 'Weekly attempts mission must increment with attempts');

console.log('QA_OK: Missoes e distribuicao de XP validadas com sucesso.');
