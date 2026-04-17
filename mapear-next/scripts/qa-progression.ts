import assert from 'node:assert/strict';
import { computeNextStepFromEvents, isExactRelevantSelection } from '../src/lib/minigameProgress';

const gameKey = 'abstracao';

assert.equal(
  computeNextStepFromEvents({
    events: [],
    gameKey,
    totalPhases: 10,
    completed: false,
  }),
  1,
  'Sem eventos deve iniciar na fase 1'
);

assert.equal(
  computeNextStepFromEvents({
    events: [
      { type: 'minigame_step', payload: { key: gameKey, step: 1, correct: true } },
      { type: 'minigame_step', payload: { key: gameKey, step: 1, correct: true } },
      { type: 'minigame_step', payload: { key: gameKey, step: 2, correct: true } },
    ],
    gameKey,
    totalPhases: 10,
    completed: false,
  }),
  3,
  'Eventos corretos duplicados nao devem pular fase alem do max(step)+1'
);

assert.equal(
  computeNextStepFromEvents({
    events: [
      { type: 'minigame_step', payload: { key: gameKey, step: 2, correct: false } },
      { type: 'minigame_try', payload: { key: gameKey, step: 7 } },
      { type: 'minigame_step', payload: { key: gameKey, step: 1, correct: true } },
    ],
    gameKey,
    totalPhases: 10,
    completed: false,
  }),
  2,
  'Apenas minigame_step correto conta para progressao'
);

assert.equal(
  computeNextStepFromEvents({
    events: [{ type: 'minigame_step', payload: { key: gameKey, step: 99, correct: true } }],
    gameKey,
    totalPhases: 10,
    completed: false,
  }),
  10,
  'Progresso deve respeitar limite total de fases'
);

assert.equal(
  computeNextStepFromEvents({
    events: [{ type: 'minigame_step', payload: { key: gameKey, step: 2, correct: true } }],
    gameKey,
    totalPhases: 10,
    completed: true,
  }),
  10,
  'Jogo concluido deve ficar na ultima fase'
);

const items = [
  { id: 'a', relevant: true },
  { id: 'b', relevant: true },
  { id: 'c', relevant: false },
];

assert.equal(
  isExactRelevantSelection(items, ['a', 'b']),
  true,
  'Selecao exata dos relevantes deve ser valida'
);
assert.equal(
  isExactRelevantSelection(items, ['a']),
  false,
  'Subconjunto nao deve ser valido'
);
assert.equal(
  isExactRelevantSelection(items, ['a', 'b', 'c']),
  false,
  'Superset nao deve ser valido'
);
assert.equal(
  isExactRelevantSelection(items, ['a', 'x']),
  false,
  'Item fora do conjunto relevante nao deve ser valido'
);

console.log('QA_OK: Progressao e regra de validacao da Abstracao validadas com sucesso.');
