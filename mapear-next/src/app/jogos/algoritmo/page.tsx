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
      // Labirintos com blocos disponíveis
      {
        expected: ['Andar 2', 'Virar direita', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Virar direita', 'Virar esquerda'],
        note: 'Plano curto e direto.',
      },
      {
        expected: ['Andar 2', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Inclui mudanças de direção mais de uma vez.',
      },
      {
        expected: ['Andar 1', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 2'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Virar direita', 'Virar esquerda'],
        note: 'Mesmos movimentos do anterior, mudando a quantidade de passos.',
      },
      {
        expected: ['Andar 1', 'Virar direita', 'Andar 2', 'Virar esquerda', 'Andar 1', 'Virar direita', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Virar direita', 'Virar esquerda'],
        note: 'Percurso com mudanças de direção.',
      },
      {
        expected: ['Andar 3', 'Virar direita', 'Andar 3'],
        availableBlocks: ['Andar 1', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Caminho com alternância de curvas e trechos longos.',
      },
      {
        expected: ['Andar 2', 'Virar direita', 'Andar 3', 'Virar esquerda', 'Andar 1', 'Virar direita', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Zigue-zague com trechos variados.',
      },
      {
        expected: ['Andar 1', 'Virar direita', 'Andar 2', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 2'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 4', 'Virar direita', 'Virar esquerda'],
        note: 'Sequência longa que exige atenção à ordem.',
      },
      {
        expected: ['Andar 3', 'Virar esquerda', 'Andar 3', 'Virar direita', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Contornando obstáculos',
      },
      {
        expected: ['Andar 2', 'Virar esquerda', 'Andar 3', 'Virar direita', 'Andar 2'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Caminho com obstáculos e trechos longos.',
      },
      {
        expected: ['Andar 1', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 3', 'Virar esquerda', 'Andar 1'],
        availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
        note: 'Percurso com zigue-zague e trechos longos.',
      },

      // Fases 11-14 com blocos de cenários
      {
        expected: ['Ferver água', 'Colocar água fervida na xícara', 'Colocar saquinho de chá', 'Servir'],
        availableBlocks: ['Ferver água', 'Colocar saquinho de chá', 'Servir', 'Colocar água fervida na xícara', 'Adoçar'],
        note: 'Chá: ordem correta é ferver antes de preparar.',
      },
      {
        expected: ['Pré-aquecer forno', 'Bater massa', 'Colocar a massa no forno', 'Esperar 30min', 'Servir'],
        availableBlocks: ['Bater massa', 'Servir', 'Pré-aquecer forno', 'Colocar a massa no forno', 'Esperar 30min'],
        note: 'Pré-aquecer antes de assar.',
      },
      {
        expected: ['Digitar login', 'Digitar senha', 'Clicar em validar'],
        availableBlocks: ['Digitar senha', 'Clicar em validar', 'Abrir perfil', 'Digitar login'],
        note: 'Validar antes de abrir perfil.',
      },
      {
        expected: ['Varredura linha 1', 'Varredura linha 2', 'Varredura linha 3'],
        availableBlocks: ['Varredura linha 3', 'Varredura linha 1', 'Varredura linha 2'],
        note: 'Varre linha a linha (3×3).',
      },

      // Situações de múltipla escolha
      { situacao: 'Você precisa ensinar um colega a ligar o projetor da sala.', pergunta: 'Marque o algoritmo que representa melhor as ações para solucionar o problema a seguir:', opcoes: ['Pressionar botão → Ligar na tomada → selecionar entrada', 'Ligar na tomada → apertar botão → selecionar entrada', 'Esperar aula começar  → apertar botão → selecionar entrada', 'Chamar técnico → apertar botão → selecionar entrada'], resposta: 'Ligar na tomada → apertar botão → selecionar entrada', dica: 'Pense em passos claros e ordenados.' },
      { situacao: 'Você quer fazer um café usando uma cafeteira elétrica.', pergunta: 'Qual sequência de passos representa um algoritmo?', opcoes: ['Colocar água e ligar cafeteira → colocar café → esperar', 'Colocar água e ligar cafeteira → esperar', 'Beber água fria → Colocar água quente e ligar cafeteira → colocar café → esperar', 'Escolher xícara → colocar café → esperar'], resposta: 'Colocar água e ligar cafeteira → colocar café → esperar', dica: 'Um algoritmo é uma sequência de ações que leva a um resultado.' },
      { situacao: 'Você precisa organizar os arquivos do computador por data.', pergunta: 'Qual algoritmo representa melhor a tarefa?', opcoes: ['Abrir pastas aleatoriamente → verificar data → mover arquivos → salvar', 'Abrir cada pasta → verificar data → mover arquivos → salvar', 'Abrir cada pasta → verificar data → mover arquivos → Apagar tudo', 'Abrir cada pasta → renomear pastas → mover arquivos → salvar'], resposta: 'Abrir cada pasta → verificar data → mover arquivos → salvar', dica: 'Defina a sequência lógica das ações.' },
      { situacao: 'Você vai cozinhar arroz no fogão.', pergunta: 'Qual algoritmo descreve corretamente o processo?', opcoes: ['Colocar arroz → ligar fogo → lava arroz', 'Lavar arroz → colocar água → ligar fogo → esperar cozinhar', 'Beber água → colocar água → ligar fogo → esperar cozinhar', 'ligar fogo → colocar água e café → esperar cozinhar'], resposta: 'Lavar arroz → colocar água → ligar fogo → esperar cozinhar', dica: 'Ordem dos passos é essencial em algoritmos.' },
      { situacao: 'Você precisa escovar os dentes.', pergunta: 'Qual sequência representa um algoritmo correto?', opcoes: ['Passar pasta → escovar → enxaguar', 'Escovar sem pasta → escovar → lavar → enxaguar → secar', 'Enxaguar → escovar → colocar pasta', 'Passar pasta → lavar escova → enxaguar'], resposta: 'Passar pasta → escovar → enxaguar', dica: 'Algoritmos descrevem processos claros e ordenados.' },
      { situacao: 'Você vai programar um robô para se mover em linha reta até uma parede.', pergunta: 'Qual algoritmo descreve melhor o movimento?', opcoes: ['Andar → fazer curva → parar', 'Girar → detectar parede → girar', 'Andar → detectar parede → parar', 'Parar → detectar parede → andar em frente'], resposta: 'Andar → detectar parede → parar', dica: 'Defina entradas, ações e saídas.' },
      { situacao: 'Você precisa organizar a mochila para a escola.', pergunta: 'Qual algoritmo representa melhor essa tarefa?', opcoes: ['Colocar roupas → cadernos → estojo → chapéu', 'Colocar sorvete → carros → bonecas → lanche', 'Colocar lanche → sapato → toalha', 'Colocar livros → cadernos → estojo → lanche'], resposta: 'Colocar livros → cadernos → estojo → lanche', dica: 'Siga uma sequência lógica para completar a tarefa.' },
      { situacao: 'Você quer trocar uma lâmpada queimada.', pergunta: 'Qual algoritmo descreve o processo correto?', opcoes: ['Retirar lâmpada → colocar nova → ligar energia', 'Desligar energia → retirar lâmpada → colocar nova → ligar energia', 'Desligar água → retirar lâmpada → colocar nova bateria → ligar energia', 'Apenas ligar a lâmpada queimada'], resposta: 'Desligar energia → retirar lâmpada → colocar nova → ligar energia', dica: 'Segurança é parte do algoritmo.' },
      { situacao: 'Você precisa preparar um sanduíche.', pergunta: 'Qual algoritmo representa corretamente a tarefa?', opcoes: ['Pão → queijo → presunto → pão', 'Pão → queijo → biscoito → pão', 'Pão → carro → queijo → presunto → pão', 'Cuscuz → manteiga'], resposta: 'Pão → queijo → presunto → pão', dica: 'Siga uma sequência lógica para atingir o objetivo.' },
      { situacao: 'Você quer programar o despertador para tocar todos os dias às 7h.', pergunta: 'Qual algoritmo descreve essa programação?', opcoes: ['Configurar hora → repetir diariamente → ativar', 'Ativar alarme → repetir diariamente → desativar', 'Configurar data, hora e alarme → repetir diariamente → ativar', 'Configurar hora → repetir diariamente → desativar'], resposta: 'Configurar hora → repetir diariamente → ativar', dica: 'Algoritmos incluem decisões e repetições quando necessário.' },
      { situacao: 'Você precisa enviar um e-mail com anexos importantes.', pergunta: 'Qual algoritmo representa melhor a ação?', opcoes: ['Abrir e-mail → escrever mensagem → anexar arquivos → enviar', 'Abrir e-mail → escrever mensagem → enviar', 'Abrir e-mail → escrever mensagem → anexar arquivos', 'Abrir e-mail → escrever mensagem → anexar arquivos → enviar'], resposta: 'Abrir e-mail → escrever mensagem → anexar arquivos → enviar', dica: 'Cada passo deve ser claro e ordenado.' },
      { situacao: 'Você vai plantar uma árvore no quintal.', pergunta: 'Qual algoritmo descreve melhor o processo?', opcoes: ['Cavar buraco → plantar muda → cobrir com terra → regar', 'Plantar muda → cobrir com terra → regar', 'Cavar buraco → cobrir com terra → regar', 'Cavar buraco → plantar muda → cobrir com terra → regar'], resposta: 'Cavar buraco → plantar muda → cobrir com terra → regar', dica: 'Siga a sequência lógica de ações para garantir o resultado.' },
      { situacao: 'Você precisa preparar um suco de frutas.', pergunta: 'Qual algoritmo representa corretamente a preparação?', opcoes: ['Cortar frutas → liquidificar → servir', 'Lavar verduras → cortar → liquidificar → servir', 'Lavar frutas → cortar → liquidificar → jogar fora', 'Lavar frutas → cortar → liquidificar → servir'], resposta: 'Lavar frutas → cortar → liquidificar → servir', dica: 'Sequência de ações garante o resultado esperado.' },
      { situacao: 'Você precisa organizar um armário bagunçado.', pergunta: 'Qual algoritmo descreve melhor a organização?', opcoes: ['Retirar tudo → separar por categoria → guardar novamente', 'Retirar tudo → misturar por categoria → guardar novamente', 'Retirar tudo → separar por nome → guardar novamente', 'Retirar tudo → separar por sorte → guardar novamente'], resposta: 'Retirar tudo → separar por categoria → guardar novamente', dica: 'Algoritmos ajudam a estruturar tarefas complexas.' },
      { situacao: 'Você quer programar um robô para seguir uma linha preta no chão.', pergunta: 'Qual algoritmo representa melhor essa ação?', opcoes: ['Detectar linha → mover para frente → repetir', 'Detectar linha → ajustar direção → mover para frente → repetir', 'Detectar linha → dar ré → mover para frente → repetir', 'Detectar linha → ajustar direção → mover para frente → repetir'], resposta: 'Detectar linha → ajustar direção → mover para frente → repetir', dica: 'Algoritmos podem incluir repetição (loops) para atingir objetivos.' },
      { situacao: 'Você precisa lavar roupa em uma lavadora.', pergunta: 'Qual sequência correta?', opcoes: ['Colocar roupas → adicionar sabão → selecionar ciclo → iniciar', 'Adicionar sabão → iniciar → colocar roupas', 'Colocar roupas → iniciar → adicionar sabão', 'Selecionar ciclo → adicionar sabão → iniciar → colocar roupas'], resposta: 'Colocar roupas → adicionar sabão → selecionar ciclo → iniciar', dica: 'A ordem correta garante o resultado.' },
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
        setFeedback('Selecione uma opção.');
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
        setFeedback('Correto! Próxima fase...');
        setFeedbackType('success');
        setTimeout(async () => {
          setPlan([]);
          setScenarioChoice(null);
          setFeedback('');
          setFeedbackType('');
          // Registra o avanço de fase após o delay para evitar avanço duplo
          await record('minigame_step', { key: gameKey, step, correct: true });
        }, 1500);
      } else {
        // Última fase: registrar e finalizar
        await record('minigame_step', { key: gameKey, step, correct: true });
        const final = getCurrentState();
        const totalAttempts = final.progress[gameKey].attempts;
        const computedScore = Math.max(
          0,
          Math.min(10, Math.round((10 * phases.length) / Math.max(totalAttempts, 1)))
        );
        await score(gameKey, computedScore);
        await complete(gameKey);
        await achieve('Planejou sequências claras em múltiplas fases');
        setFeedback('Sucesso! Você completou todas as fases.');
        setFeedbackType('success');
        setFinished(true);
      }
    } else {
      setFeedback(
        `Não funcionou. ${
          isScenario ? 'Reveja a situação.' : 'Teste passo a passo: onde seu plano falha?'
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
              alt="Representação do desafio"
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
          <div id="alg-plan" className="text-gray-400">{plan.length ? plan.join(' → ') : '(vazio)'}</div>
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
        <label htmlFor="alg-reflexao">Reflexão (MAPEAR):</label>
        <textarea
          id="alg-reflexao"
          className="mt-2 w-full rounded-md border border-white/20 bg-gray-900/40 px-3 py-2 text-white placeholder-gray-400"
          rows={3}
          placeholder="Sua sequência funcionaria para qualquer pessoa?"
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
              setFeedback('Reflexão salva.');
              setFeedbackType('success');
            }}
          >
            Salvar reflexão
          </button>
          <Link
            id="alg-prosseguir"
            href="/jogos/generalizacao"
            className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md bg-[linear-gradient(135deg,#16a34a,#22c55e_50%,#10b981)] hover:brightness-110 ${finished ? '' : 'hidden'}`}
          >
            Próximo: Generalize+
          </Link>
        </div>
      </div>
    </section>
  );
}

