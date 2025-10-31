export type Pillar =
  | 'geral'
  | 'decomposicao'
  | 'padroes'
  | 'abstracao'
  | 'algoritmo'
  | 'generalizacao'
  | 'robotica';

export type TipLevel = 'Cue' | 'Hint' | 'Scaffold';

export const defaultPrompts: Record<Pillar, string[]> & { geral: string[] } = {
  geral: [
    'Explique sua lógica passo a passo em voz alta.',
    'O que é essencial nesta situação e o que você pode ignorar?',
    'Se mudássemos o contexto, sua solução ainda faria sentido?'
  ],
  decomposicao: [
    'Quais partes menores compõem este problema?',
    'Como dividir em etapas que qualquer pessoa possa seguir?',
    'Há categorias naturais que organizam os elementos?'
  ],
  padroes: [
    'Esse comportamento se repete em outros exemplos?',
    'Se fosse prever o próximo valor, em que base você se apoiaria?',
    'O crescimento é constante? O quanto varia a cada passo?'
  ],
  abstracao: [
    'Quais dados você pode descartar sem prejudicar sua análise?',
    'Como representaria o problema de forma resumida para alguém de fora?',
    'Se só restasse essa informação, sua solução ainda faria sentido?'
  ],
  algoritmo: [
    'A ordem dos passos está lógica para qualquer pessoa que siga?',
    'Se algo der errado no meio, seu algoritmo prevê alternativas?',
    'Teste passo a passo: em qual momento seu plano falha?'
  ],
  generalizacao: [
    'Em que outros contextos essa regra pode funcionar?',
    'O que mudaria se as condições fossem diferentes?',
    'Qual é a lógica que continua igual mesmo mudando o cenário?'
  ],
  robotica: [
    'Robôs percebem com sensores e atuam com atuadores.',
    'Qual sensor/atuador se aplica aqui e por quê?',
    'Que condição dispara a ação do robô?'
  ]
};

export function defaultPromptsFor(pillar: Pillar | undefined): string[] {
  if (!pillar) return defaultPrompts.geral;
  return defaultPrompts[pillar] || defaultPrompts.geral;
}

export function mountTip(
  opts: { pillar?: Pillar; level?: TipLevel; prompts?: string[] } = {}
): { level: TipLevel; tip: string } {
  const { pillar = 'geral', level = 'Cue', prompts } = opts;
  const items = (prompts && prompts.length ? prompts : defaultPromptsFor(pillar)) || defaultPrompts.geral;
  const current = items[Math.floor(Math.random() * items.length)] || '';
  return { level, tip: current };
}