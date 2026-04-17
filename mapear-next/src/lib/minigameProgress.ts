type MinigameEvent = {
  type?: string;
  payload?: unknown;
};

type AbstractionItem = {
  id: string;
  relevant: boolean;
};

export function computeNextStepFromEvents(params: {
  events: MinigameEvent[] | undefined;
  gameKey: string;
  totalPhases: number;
  completed: boolean;
}): number {
  const { events, gameKey, totalPhases, completed } = params;
  if (completed) return totalPhases;

  const correctSteps = (events || [])
    .filter((e) => {
      if (e.type !== 'minigame_step') return false;
      const payload = e.payload as Record<string, unknown> | null | undefined;
      return payload?.key === gameKey && payload?.correct === true;
    })
    .map((e) => {
      const payload = e.payload as Record<string, unknown> | null | undefined;
      return payload?.step;
    })
    .filter((step): step is number => typeof step === 'number' && step > 0);

  const lastStep = correctSteps.length ? Math.max(...correctSteps) : 0;
  const nextStep = lastStep + 1;
  return Math.max(1, Math.min(totalPhases, nextStep));
}

export function isExactRelevantSelection(items: AbstractionItem[], selectedIds: string[]): boolean {
  const essentialIds = new Set(items.filter((i) => i.relevant).map((i) => i.id));
  return selectedIds.length === essentialIds.size && selectedIds.every((id) => essentialIds.has(id));
}
