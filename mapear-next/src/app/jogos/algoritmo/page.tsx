'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStorage } from '@/context/StorageContext';
import { mountTip, TipLevel } from '@/lib/tipEngine';

type PhaseLabirinto = {
  expected: string[];
  availableBlocks: string[];
  note?: string;
};

type PhaseScenario = {
  situacao: string;
  pergunta: string;
  opcoes: string[];
  resposta: string;
  dica?: string;
};

type Phase = PhaseLabirinto | PhaseScenario;

function isScenarioPhase(p: Phase): p is PhaseScenario {
  return (p as PhaseScenario).opcoes !== undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function computeInitialStep(state: any, gameKey: string, totalPhases: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const events: any[] = state?.events || [];
  const last = events
    .filter((e) => e.type === 'minigame_step' && e.payload?.key === gameKey && e.payload?.correct === true)
    .sort((a, b) => (b.payload?.step || 0) - (a.payload?.step || 0))[0];

  let initialStep = last ? (last.payload?.step || 0) + 1 : 1;

  if (state?.progress?.[gameKey]?.completed) {
    initialStep = 1;
  }
  if (initialStep > totalPhases) initialStep = totalPhases;
  if (initialStep < 1) initialStep = 1;
  return initialStep;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function AlgoritmoPage() {
  const gameKey = 'algoritmo' as const;
  const { state, attempt, record, score, complete, reflect, achieve, getCurrentState } = useStorage();

  const phases: Phase[] = useMemo(
    () => [
      // Labirintos com blocos disponÃ­veis
      {
        expected: ['Andar 2', 'Virar direita', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Virar direita', 'Virar esquerda'],
        note: 'Plano curto e direto.',
      },
      {
        expected: ['Andar 2', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Inclui mudanÃ§as de direÃ§Ã£o mais de uma vez.',
      },
      {
        expected: ['Andar 1', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 2'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Virar direita', 'Virar esquerda'],
        note: 'Mesmos movimentos do anterior, mudando a quantidade de passos.',
      },
      {
        expected: ['Andar 1', 'Virar direita', 'Andar 2', 'Virar esquerda', 'Andar 1', 'Virar direita', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Virar direita', 'Virar esquerda'],
        note: 'Percurso com mudanÃ§as de direÃ§Ã£o.',
      },
      {
        expected: ['Andar 3', 'Virar direita', 'Andar 3'],
        availableBlocks: ['Andar 1', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Caminho com alternÃ¢ncia de curvas e trechos longos.',
      },
      {
        expected: ['Andar 2', 'Virar direita', 'Andar 3', 'Virar esquerda', 'Andar 1', 'Virar direita', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Zigue-zague com trechos variados.',
      },
      {
        expected: ['Andar 1', 'Virar direita', 'Andar 2', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 2'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 4', 'Virar direita', 'Virar esquerda'],
        note: 'SequÃªncia longa que exige atenÃ§Ã£o Ã  ordem.',
      },
      {
        expected: ['Andar 3', 'Virar esquerda', 'Andar 3', 'Virar direita', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Contornando obstÃ¡culos',
      },
      {
        expected: ['Andar 2', 'Virar esquerda', 'Andar 3', 'Virar direita', 'Andar 2'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Caminho com obstÃ¡culos e trechos longos.',
      },
      {
        expected: ['Andar 1', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 3', 'Virar esquerda', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Percurso com zigue-zague e trechos longos.',
      },

      // Fases 11-14 com blocos de cenÃ¡rios
      {
        expected: ['Ferver Ã¡gua', 'Colocar Ã¡gua fervida na xÃ­cara', 'Colocar saquinho de chÃ¡', 'Servir'],
        availableBlocks: ['Ferver Ã¡gua', 'Colocar saquinho de chÃ¡', 'Servir', 'Colocar Ã¡gua fervida na xÃ­cara', 'AdoÃ§ar'],
        note: 'ChÃ¡: ordem correta Ã© ferver antes de preparar.',
      },
      {
        expected: ['PrÃ©-aquecer forno', 'Bater massa', 'Colocar a massa no forno', 'Esperar 30min', 'Servir'],
        availableBlocks: ['Bater massa', 'Servir', 'PrÃ©-aquecer forno', 'Colocar a massa no forno', 'Esperar 30min'],
        note: 'PrÃ©-aquecer antes de assar.',
      },
      {
        expected: ['Digitar login', 'Digitar senha', 'Clicar em validar'],
        availableBlocks: ['Digitar senha', 'Clicar em validar', 'Abrir perfil', 'Digitar login'],
        note: 'Validar antes de abrir perfil.',
      },
      {
        expected: ['Varredura linha 1', 'Varredura linha 2', 'Varredura linha 3'],
        availableBlocks: ['Varredura linha 3', 'Varredura linha 1', 'Varredura linha 2'],
        note: 'Varre linha a linha (3Ã—3).',
      },

      // SituaÃ§Ãµes de mÃºltipla escolha
      { situacao: 'VocÃª precisa ensinar um colega a ligar o projetor da sala.', pergunta: 'Marque o algoritmo que representa melhor as aÃ§Ãµes para solucionar o problema a seguir:', opcoes: ['Pressionar botÃ£o â†’ Ligar na tomada â†’ selecionar entrada', 'Ligar na tomada â†’ apertar botÃ£o â†’ selecionar entrada', 'Esperar aula comeÃ§ar  â†’ apertar botÃ£o â†’ selecionar entrada', 'Chamar tÃ©cnico â†’ apertar botÃ£o â†’ selecionar entrada'], resposta: 'Ligar na tomada â†’ apertar botÃ£o â†’ selecionar entrada', dica: 'Pense em passos claros e ordenados.' },
      { situacao: 'VocÃª quer fazer um cafÃ© usando uma cafeteira elÃ©trica.', pergunta: 'Qual sequÃªncia de passos representa um algoritmo?', opcoes: ['Colocar Ã¡gua e ligar cafeteira â†’ colocar cafÃ© â†’ esperar', 'Colocar Ã¡gua e ligar cafeteira â†’ esperar', 'Beber Ã¡gua fria â†’ Colocar Ã¡gua quente e ligar cafeteira â†’ colocar cafÃ© â†’ esperar', 'Escolher xÃ­cara â†’ colocar cafÃ© â†’ esperar'], resposta: 'Colocar Ã¡gua e ligar cafeteira â†’ colocar cafÃ© â†’ esperar', dica: 'Um algoritmo Ã© uma sequÃªncia de aÃ§Ãµes que leva a um resultado.' },
      { situacao: 'VocÃª precisa organizar os arquivos do computador por data.', pergunta: 'Qual algoritmo representa melhor a tarefa?', opcoes: ['Abrir pastas aleatoriamente â†’ verificar data â†’ mover arquivos â†’ salvar', 'Abrir cada pasta â†’ verificar data â†’ mover arquivos â†’ salvar', 'Abrir cada pasta â†’ verificar data â†’ mover arquivos â†’ Apagar tudo', 'Abrir cada pasta â†’ renomear pastas â†’ mover arquivos â†’ salvar'], resposta: 'Abrir cada pasta â†’ verificar data â†’ mover arquivos â†’ salvar', dica: 'Defina a sequÃªncia lÃ³gica das aÃ§Ãµes.' },
      { situacao: 'VocÃª vai cozinhar arroz no fogÃ£o.', pergunta: 'Qual algoritmo descreve corretamente o processo?', opcoes: ['Colocar arroz â†’ ligar fogo â†’ lava arroz', 'Lavar arroz â†’ colocar Ã¡gua â†’ ligar fogo â†’ esperar cozinhar', 'Beber Ã¡gua â†’ colocar Ã¡gua â†’ ligar fogo â†’ esperar cozinhar', 'ligar fogo â†’ colocar Ã¡gua e cafÃ© â†’ esperar cozinhar'], resposta: 'Lavar arroz â†’ colocar Ã¡gua â†’ ligar fogo â†’ esperar cozinhar', dica: 'Ordem dos passos Ã© essencial em algoritmos.' },
      { situacao: 'VocÃª precisa escovar os dentes.', pergunta: 'Qual sequÃªncia representa um algoritmo correto?', opcoes: ['Passar pasta â†’ escovar â†’ enxaguar', 'Escovar sem pasta â†’ escovar â†’ lavar â†’ enxaguar â†’ secar', 'Enxaguar â†’ escovar â†’ colocar pasta', 'Passar pasta â†’ lavar escova â†’ enxaguar'], resposta: 'Passar pasta â†’ escovar â†’ enxaguar', dica: 'Algoritmos descrevem processos claros e ordenados.' },
      { situacao: 'VocÃª vai programar um robÃ´ para se mover em linha reta atÃ© uma parede.', pergunta: 'Qual algoritmo descreve melhor o movimento?', opcoes: ['Andar â†’ fazer curva â†’ parar', 'Girar â†’ detectar parede â†’ girar', 'Andar â†’ detectar parede â†’ parar', 'Parar â†’ detectar parede â†’ andar em frente'], resposta: 'Andar â†’ detectar parede â†’ parar', dica: 'Defina entradas, aÃ§Ãµes e saÃ­das.' },
      { situacao: 'VocÃª precisa organizar a mochila para a escola.', pergunta: 'Qual algoritmo representa melhor essa tarefa?', opcoes: ['Colocar roupas â†’ cadernos â†’ estojo â†’ chapÃ©u', 'Colocar sorvete â†’ carros â†’ bonecas â†’ lanche', 'Colocar lanche â†’ sapato â†’ toalha', 'Colocar livros â†’ cadernos â†’ estojo â†’ lanche'], resposta: 'Colocar livros â†’ cadernos â†’ estojo â†’ lanche', dica: 'Siga uma sequÃªncia lÃ³gica para completar a tarefa.' },
      { situacao: 'VocÃª quer trocar uma lÃ¢mpada queimada.', pergunta: 'Qual algoritmo descreve o processo correto?', opcoes: ['Retirar lÃ¢mpada â†’ colocar nova â†’ ligar energia', 'Desligar energia â†’ retirar lÃ¢mpada â†’ colocar nova â†’ ligar energia', 'Desligar Ã¡gua â†’ retirar lÃ¢mpada â†’ colocar nova bateria â†’ ligar energia', 'Apenas ligar a lÃ¢mpada queimada'], resposta: 'Desligar energia â†’ retirar lÃ¢mpada â†’ colocar nova â†’ ligar energia', dica: 'SeguranÃ§a Ã© parte do algoritmo.' },
      { situacao: 'VocÃª precisa preparar um sanduÃ­che.', pergunta: 'Qual algoritmo representa corretamente a tarefa?', opcoes: ['PÃ£o â†’ queijo â†’ presunto â†’ pÃ£o', 'PÃ£o â†’ queijo â†’ biscoito â†’ pÃ£o', 'PÃ£o â†’ carro â†’ queijo â†’ presunto â†’ pÃ£o', 'Cuscuz â†’ manteiga'], resposta: 'PÃ£o â†’ queijo â†’ presunto â†’ pÃ£o', dica: 'Siga uma sequÃªncia lÃ³gica para atingir o objetivo.' },
      { situacao: 'VocÃª quer programar o despertador para tocar todos os dias Ã s 7h.', pergunta: 'Qual algoritmo descreve essa programaÃ§Ã£o?', opcoes: ['Configurar hora â†’ repetir diariamente â†’ ativar', 'Ativar alarme â†’ repetir diariamente â†’ desativar', 'Configurar data, hora e alarme â†’ repetir diariamente â†’ ativar', 'Configurar hora â†’ repetir diariamente â†’ desativar'], resposta: 'Configurar hora â†’ repetir diariamente â†’ ativar', dica: 'Algoritmos incluem decisÃµes e repetiÃ§Ãµes quando necessÃ¡rio.' },
      { situacao: 'VocÃª precisa enviar um e-mail com anexos importantes.', pergunta: 'Qual algoritmo representa melhor a aÃ§Ã£o?', opcoes: ['Abrir e-mail â†’ escrever mensagem â†’ anexar arquivos â†’ enviar', 'Abrir e-mail â†’ escrever mensagem â†’ enviar', 'Abrir e-mail â†’ escrever mensagem â†’ anexar arquivos', 'Abrir e-mail â†’ escrever mensagem â†’ anexar arquivos â†’ enviar'], resposta: 'Abrir e-mail â†’ escrever mensagem â†’ anexar arquivos â†’ enviar', dica: 'Cada passo deve ser claro e ordenado.' },
      { situacao: 'VocÃª vai plantar uma Ã¡rvore no quintal.', pergunta: 'Qual algoritmo descreve melhor o processo?', opcoes: ['Cavar buraco â†’ plantar muda â†’ cobrir com terra â†’ regar', 'Plantar muda â†’ cobrir com terra â†’ regar', 'Cavar buraco â†’ cobrir com terra â†’ regar', 'Cavar buraco â†’ plantar muda â†’ cobrir com terra â†’ regar'], resposta: 'Cavar buraco â†’ plantar muda â†’ cobrir com terra â†’ regar', dica: 'Siga a sequÃªncia lÃ³gica de aÃ§Ãµes para garantir o resultado.' },
      { situacao: 'VocÃª precisa preparar um suco de frutas.', pergunta: 'Qual algoritmo representa corretamente a preparaÃ§Ã£o?', opcoes: ['Cortar frutas â†’ liquidificar â†’ servir', 'Lavar verduras â†’ cortar â†’ liquidificar â†’ servir', 'Lavar frutas â†’ cortar â†’ liquidificar â†’ jogar fora', 'Lavar frutas â†’ cortar â†’ liquidificar â†’ servir'], resposta: 'Lavar frutas â†’ cortar â†’ liquidificar â†’ servir', dica: 'SequÃªncia de aÃ§Ãµes garante o resultado esperado.' },
      { situacao: 'VocÃª precisa organizar um armÃ¡rio bagunÃ§ado.', pergunta: 'Qual algoritmo descreve melhor a organizaÃ§Ã£o?', opcoes: ['Retirar tudo â†’ separar por categoria â†’ guardar novamente', 'Retirar tudo â†’ misturar por categoria â†’ guardar novamente', 'Retirar tudo â†’ separar por nome â†’ guardar novamente', 'Retirar tudo â†’ separar por sorte â†’ guardar novamente'], resposta: 'Retirar tudo â†’ separar por categoria â†’ guardar novamente', dica: 'Algoritmos ajudam a estruturar tarefas complexas.' },
      { situacao: 'VocÃª quer programar um robÃ´ para seguir uma linha preta no chÃ£o.', pergunta: 'Qual algoritmo representa melhor essa aÃ§Ã£o?', opcoes: ['Detectar linha â†’ mover para frente â†’ repetir', 'Detectar linha â†’ ajustar direÃ§Ã£o â†’ mover para frente â†’ repetir', 'Detectar linha â†’ dar rÃ© â†’ mover para frente â†’ repetir', 'Detectar linha â†’ ajustar direÃ§Ã£o â†’ mover para frente â†’ repetir'], resposta: 'Detectar linha â†’ ajustar direÃ§Ã£o â†’ mover para frente â†’ repetir', dica: 'Algoritmos podem incluir repetiÃ§Ã£o (loops) para atingir objetivos.' },
      { situacao: 'VocÃª precisa lavar roupa em uma lavadora.', pergunta: 'Qual sequÃªncia correta?', opcoes: ['Colocar roupas â†’ adicionar sabÃ£o â†’ selecionar ciclo â†’ iniciar', 'Adicionar sabÃ£o â†’ iniciar â†’ colocar roupas', 'Colocar roupas â†’ iniciar â†’ adicionar sabÃ£o', 'Selecionar ciclo â†’ adicionar sabÃ£o â†’ iniciar â†’ colocar roupas'], resposta: 'Colocar roupas â†’ adicionar sabÃ£o â†’ selecionar ciclo â†’ iniciar', dica: 'A ordem correta garante o resultado.' },
    ],
    []
  );

  const imageFiles = useMemo(
    () => [
      'labirinto.png',
      'labirinto2.png',
      'labirinto3.png',
      'labirinto4.png',
      'labirinto5.png',
      'labirinto6.png',
      'labirinto7.png',
      'labirinto8.png',
      'labirinto9.png',
      'labirinto10.png',
      'labirinto11.png',
      'labirinto12.png',
      'labirinto13.png',
      'labirinto14.png',
    ],
    []
  );

  const [step, setStep] = useState<number>(() => computeInitialStep(state, gameKey, phases.length));
  const [plan, setPlan] = useState<string[]>([]);
  const [scenarioChoice, setScenarioChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');
  const [reflection, setReflection] = useState('');
  const [finished, setFinished] = useState(false);
  const [tipText, setTipText] = useState('');
  const [tipLevel, setTipLevel] = useState<TipLevel>('Hint');

  useEffect(() => {
    // Atualiza passo inicial quando progresso/eventos mudam
    setStep(() => computeInitialStep(state, gameKey, phases.length));
  }, [state, gameKey, phases.length]);

  useEffect(() => {
    const t = mountTip({ pillar: gameKey, level: 'Hint' });
    setTipLevel(t.level);
    setTipText(t.tip);
  }, [step]);

  const current = phases[step - 1];
  const isScenario = isScenarioPhase(current);

  const shuffledOptions = useMemo(
    () => (isScenario ? shuffle((current as PhaseScenario).opcoes) : []),
    [isScenario, current]
  );
  const shuffledBlocks = useMemo(
    () => (!isScenario ? shuffle((current as PhaseLabirinto).availableBlocks) : []),
    [isScenario, current]
  );

  const handleBlockClick = (block: string) => {
    setPlan((p) => [...p, block]);
  };

  const handleOptionClick = (opt: string) => {
    setScenarioChoice(opt);
  };

  const handleReset = () => {
    if (isScenario) {
      setScenarioChoice(null);
    } else {
      setPlan([]);
    }
    setFeedback('');
    setFeedbackType('');
  };

  const handleCheck = async () => {
    await attempt(gameKey);

    let ok = false;
    if (isScenario) {
      if (!scenarioChoice) {
        setFeedback('Selecione uma opÃ§Ã£o.');
        setFeedbackType('error');
        return;
      }
      ok = scenarioChoice === (current as PhaseScenario).resposta;
    } else {
      const exp = (current as PhaseLabirinto).expected;
      ok = plan.length === exp.length && plan.every((v, i) => v === exp[i]);
    }

    if (ok) {
      if (step < phases.length) {
        setFeedback('Correto! PrÃ³xima fase...');
        setFeedbackType('success');
        setTimeout(async () => {
          setPlan([]);
          setScenarioChoice(null);
          setFeedback('');
          setFeedbackType('');
          // Registra o avanÃ§o de fase apÃ³s o delay para evitar avanÃ§o duplo
          await record('minigame_step', { key: gameKey, step, correct: true });
        }, 1500);
      } else {
        // Ãšltima fase: registrar e finalizar
        await record('minigame_step', { key: gameKey, step, correct: true });
        const final = getCurrentState();
        const totalAttempts = final.progress[gameKey].attempts;
        const computedScore = Math.max(
          0,
          Math.min(10, Math.round((10 * phases.length) / Math.max(totalAttempts, 1)))
        );
        await score(gameKey, computedScore);
        await complete(gameKey);
        await achieve('Planejou sequÃªncias claras em mÃºltiplas fases');
        setFeedback('Sucesso! VocÃª completou todas as fases.');
        setFeedbackType('success');
        setFinished(true);
      }
    } else {
      setFeedback(
        `NÃ£o funcionou. ${
          isScenario ? 'Reveja a situaÃ§Ã£o.' : 'Teste passo a passo: onde seu plano falha?'
        }`
      );
      setFeedbackType('error');
      const t = mountTip({ pillar: gameKey, level: 'Scaffold' });
      setTipLevel(t.level);
      setTipText(t.tip);
    }
  };

  const imgSrc = !isScenario && step <= imageFiles.length ? `/${imageFiles[step - 1]}` : '';

  return (
    <section className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(30,41,59,0.5),rgba(2,6,23,0.6))] p-4 sm:p-6 text-white shadow-md">
      <h1 className="text-2xl font-bold">Algoritmos</h1>
      <div className="text-gray-400">Fase {step} de {phases.length}</div>
      <p className="mt-1">
        {isScenario
          ? (
              <span>
                {(current as PhaseScenario).situacao}<br />
                <span className="text-gray-400">{(current as PhaseScenario).pergunta}</span>
              </span>
            )
          : 'Monte um algoritmo para o desafio.'}
      </p>

      {!isScenario && (
        <div className="mt-3 flex justify-center">
          {imgSrc && (
            <Image
              src={imgSrc}
              alt="RepresentaÃ§Ã£o do desafio"
              width={420}
              height={420}
              className="max-w-[420px] w-full h-auto rounded-lg border border-slate-400/25"
            />
          )}
        </div>
      )}

      <div id="alg-blocks" className="mt-2 flex flex-wrap justify-center gap-2">
        {isScenario
          ? shuffledOptions.map((opt) => (
              <button
                key={opt}
                className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white border transition-colors ${
                  scenarioChoice === opt
                    ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-500/40'
                    : 'border-white/20 hover:bg-blue-500/10'
                }`}
                onClick={() => handleOptionClick(opt)}
              >
                {opt}
              </button>
            ))
          : shuffledBlocks.map((b) => (
              <button
                key={b}
                className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white border border-white/20 hover:bg-blue-500/10"
                onClick={() => handleBlockClick(b)}
              >
                {b}
              </button>
            ))}
      </div>

      {!isScenario && (
        <div id="alg-plan-card" className="mt-3 rounded-lg border border-slate-400/15 bg-gray-800/30 p-3 text-white">
          <h3 className="text-lg font-semibold">Seu plano</h3>
          <div id="alg-plan" className="text-gray-400">{plan.length ? plan.join(' â†’ ') : '(vazio)'}</div>
        </div>
      )}

      <div className="mt-3 flex gap-3">
        <button
          id="alg-executar"
          className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white border border-white/20 hover:bg-blue-500/10"
          onClick={handleCheck}
        >
          Verificar
        </button>
        <button
          id="alg-refazer"
          className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white border border-white/20 hover:bg-slate-500/10"
          onClick={handleReset}
        >
          Refazer
        </button>
      </div>

      <div
        id="alg-feedback"
        className={`mt-2 ${feedbackType === 'success' ? 'text-green-500' : feedbackType === 'error' ? 'text-red-500' : 'text-gray-400'}`}
      >
        {feedback}
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg border-l-4 border-blue-500/60 bg-blue-500/10 p-3">
        <span className="inline-block rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">{tipLevel}</span>
        <span>{tipText}</span>
      </div>

      <div className="mt-4">
        <label htmlFor="alg-reflexao">ReflexÃ£o (MAPEAR):</label>
        <textarea
          id="alg-reflexao"
          className="mt-2 w-full rounded-md border border-white/20 bg-gray-900/40 px-3 py-2 text-white placeholder-gray-400"
          rows={3}
          placeholder="Sua sequÃªncia funcionaria para qualquer pessoa?"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
        <div className="mt-3 flex gap-3">
          <button
            id="alg-salvar"
            className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white border border-white/20 hover:bg-blue-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!finished}
            onClick={() => {
              reflect(gameKey, reflection.trim());
              setFeedback('ReflexÃ£o salva.');
              setFeedbackType('success');
            }}
          >
            Salvar reflexÃ£o
          </button>
          <Link
            id="alg-prosseguir"
            href="/jogos/generalizacao"
            className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md bg-[linear-gradient(135deg,#16a34a,#22c55e_50%,#10b981)] hover:brightness-110 ${finished ? '' : 'hidden'}`}
          >
            PrÃ³ximo: Generalize+
          </Link>
        </div>
      </div>
    </section>
  );
}
