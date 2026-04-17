'use client';

import { useEffect, useMemo, useState } from 'react';
import { useStorage } from '@/context/StorageContext';
import type { GameState, GameEvent, Pillar } from '@/context/StorageContext';
import { mountTip, TipLevel } from '@/lib/tipEngine';
import Link from 'next/link'

// Tipos das fases
type SequencePhase = {
  sequence: Array<number | string>;
  options: Array<number | string>;
  answer: number | string;
  message: string;
};

type ScenarioPhase = {
  situacao: string;
  pergunta: string;
  opcoes: string[];
  resposta: string;
  dica: string;
  reflexao: string;
};

type Phase = SequencePhase | ScenarioPhase;

// Array de fases migrado de renderPadroes (mapear.html)
const phases: Phase[] = [
  { sequence: [50, 100, 150, 200], options: [210, 250, 300, 400, 230], answer: 250, message: 'Diferença constante de 50.' },
  { sequence: [2, 4, 8, 16], options: [24, 28, 32, 36, 44], answer: 32, message: 'Progressão multiplicativa (x2).' },
  { sequence: [3, 6, 9, 12], options: [13, 14, 16, 15, 18], answer: 15, message: 'Múltiplos de 3.' },
  { sequence: [1, 1, 2, 3, 5], options: [6, 7, 8, 9, 10], answer: 8, message: 'Sequência de Fibonacci.' },
  { sequence: [1, 4, 9, 16], options: [20, 24, 25, 28, 30], answer: 25, message: 'Quadrados perfeitos.' },
  { sequence: [10, 7, 14, 11], options: [16, 98, 18, 19, 20], answer: 18, message: 'Alterna +7 e -3.' },
  { sequence: [1, 3, 9, 27], options: [54, 102, 72, 81, 90], answer: 81, message: 'Progressão geométrica (x3).' },
  { sequence: [2, 5, 9, 14], options: [18, 34, 19, 20, 21], answer: 20, message: 'Diferença cresce +1 a cada etapa (3,4,5,6...).' },
  { sequence: [3, 5, 10, 12, 24], options: [33, 22, 26, 28, 30], answer: 26, message: 'Alterna +2 e x2.' },
  { sequence: [3, 8, 15, 24], options: [99, 32, 34, 35, 36], answer: 35, message: 'Diferenças ímpares crescentes (+5, +7, +9, +11).' },
  { sequence: [2, 4, 6, 8], options: [10, 9, 12, 11, 44], answer: 10, message: 'A sequência soma 2.' },
  { sequence: ['andar', 'virar', 'andar', 'virar'], options: ['Andar', 'Virar', 'Parar', 'Voltar'], answer: 'Andar', message: 'O ciclo é andar, virar, andar, virar.' },
  { sequence: ['A', 'C', 'E', 'G'], options: ['H', 'I', 'J', 'F'], answer: 'I', message: 'Avança de 2 em 2 letras: I.' },
  { sequence: ['Chega cedo', 'Senta na janela', 'Chega tarde', 'Senta no meio', 'Chega cedo'], options: ['Senta na janela', 'Senta no meio', 'Chega tarde', 'Chega cedo'], answer: 'Senta na janela', message: 'O padrão observado é: cedo = janela.' },
  { situacao: 'Durante a semana, você percebe que o ônibus azul, que possui um motorista simpático, chega sempre às 7h30.', pergunta: 'Qual é o padrão observado?', opcoes: ['O ônibus é azul', 'Chega sempre às 7h30', 'Os passageiros falam alto', 'O motorista é simpático'], resposta: 'Chega sempre às 7h30', dica: 'Padrões são eventos ou comportamentos que se repetem.', reflexao: 'Como identificar padrões ajuda a planejar seu dia?' },
  { situacao: 'No calendário, os feriados nacionais acontecem sempre em datas fixas ou seguem regras específicas.', pergunta: 'Qual é o padrão que se observa?', opcoes: ['Todos feriados têm data fixa', 'Alguns têm datas fixas, outros seguem regras', 'Os feriados sempre seguem regras', 'Os feriados de data fixa seguem regras específicas'], resposta: 'Alguns têm datas fixas, outros seguem regras', dica: 'Observe regularidades mesmo que haja variações.', reflexao: 'Como padrões de datas podem facilitar a organização de eventos?' },
  { situacao: 'Ao organizar seus livros, você percebe que todos os de ficção estão na prateleira de cima e todos de não-ficção na de baixo.', pergunta: 'Qual padrão está sendo seguido?', opcoes: ['Os livros estão em duas prateleiras', 'Os livros de ficção estão nas duas prateleiras', 'Os livros são separados por gênero', 'Os livros são organizados por tamanho'], resposta: 'Os livros são separados por gênero', dica: 'Padrões ajudam a categorizar e organizar informações.', reflexao: 'Como identificar padrões facilita achar informações rapidamente?' },
  { situacao: 'Em uma sequência de cores: rosa, vermelho, amarelo, verde, rosa, vermelho, amarelo, verde...', pergunta: 'Qual é o padrão da sequência?', opcoes: ['Repetição das cores rosa, amarelo, verde e vermelho', 'Repetição das cores rosa, vermelho, amarelo e verde', 'O verde vem depois do amarelo', 'O rosa vem antes do vermelho'], resposta: 'Repetição das cores rosa, vermelho, amarelo e verde', dica: 'Procure repetições ou ciclos regulares.', reflexao: 'Como reconhecer ciclos ajuda em situações cotidianas?' },
  { situacao: 'Durante uma aula de matemática, os números pares e ímpares aparecem alternadamente na lousa: 2, 3, 4, 5, 6, 7...', pergunta: 'Qual padrão você identifica?', opcoes: ['A cor da lousa', 'Alternância de números pares e ímpares', 'Número de alunos na sala', 'Dia da semana'], resposta: 'Alternância de números pares e ímpares', dica: 'Padrões podem ser numéricos, espaciais ou temporais.', reflexao: 'Como observar padrões numéricos ajuda na resolução de problemas?' },
  { situacao: 'No trânsito, o semáforo muda sempre na mesma ordem: vermelho → verde → amarelo → vermelho...', pergunta: 'Qual padrão é observado?', opcoes: ['Cores aleatórias', 'Sequência repetitiva das cores', 'Sequência de verde, amarelo, vermelho', 'O semáforo está quebrado'], resposta: 'Sequência repetitiva das cores', dica: 'Ciclos repetitivos indicam padrões.', reflexao: 'Como reconhecer padrões no trânsito pode melhorar a segurança?' },
  { situacao: 'Você percebe que sempre que chove, o chão do quintal fica molhado e os sapatos sujam.', pergunta: 'Qual padrão está ocorrendo?', opcoes: ['Sapatos sempre limpos durante os dias de sol', 'Chuva suja o chão e os sapatos', 'Chuva molha o chão e os sapatos', 'O sol seca o chão e os sapatos'], resposta: 'Chuva suja o chão e os sapatos', dica: 'Padrões podem mostrar relações de causa e efeito.', reflexao: 'Como observar padrões causa-efeito ajuda na tomada de decisões?' },
  { situacao: 'Em uma sequência de dias, segunda, quarta, sexta, segunda, quarta, sexta...', pergunta: 'Qual padrão você identifica?', opcoes: ['Dias alternados', 'Todos os dias da semana', 'Fins de semana repetidos', 'Dias aleatórios'], resposta: 'Dias alternados', dica: 'Observe regularidades em séries temporais.', reflexao: 'Como identificar padrões temporais ajuda a planejar sua semana?' },
  { situacao: 'Na fila da cantina, você percebe que sempre há um aluno de cada turma na frente.', pergunta: 'Qual é o padrão observado?', opcoes: ['Alunos de uma turma juntos', 'Alunos alternam turmas', 'Todos compram o mesmo lanche', 'Sempre há um professor na fila'], resposta: 'Alunos alternam turmas', dica: 'Padrões podem ser observados na posição ou sequência de elementos.', reflexao: 'Como reconhecer padrões em grupos ajuda na organização?' },
  { situacao: 'Você nota que seu celular sempre toca com o mesmo som quando recebe mensagens de um amigo específico.', pergunta: 'Qual padrão é identificado?', opcoes: ['Som aleatório', 'Som específico para aquele amigo', 'Volume muda sozinho', 'Tela pisca'], resposta: 'Som específico para aquele amigo', dica: 'Padrões podem estar ligados a sinais ou alertas repetitivos.', reflexao: 'Como padrões em notificações ajudam a reconhecer rapidamente mensagens importantes?' },
  { situacao: 'Ao digitar senhas, você percebe que sempre usa letras maiúsculas no início e números no final.', pergunta: 'Qual padrão está seguindo?', opcoes: ['Usa letras aleatórias', 'Sempre letras maiúsculas no início e números no final', 'Números aleatórios no meio', 'Tudo minúsculo'], resposta: 'Sempre letras maiúsculas no início e números no final', dica: 'Padrões podem estar na estrutura de informações.', reflexao: 'Como identificar padrões em comportamentos ajuda na automação de tarefas?' },
  { situacao: 'Você percebe que, no horário de almoço, a cantina sempre serve arroz, feijão e carne.', pergunta: 'Qual padrão alimentar se repete?', opcoes: ['A refeição muda todo dia', 'Arroz, feijão e carne sempre servidos', 'Só sobremesa', 'Todos comem salada'], resposta: 'Arroz, feijão e carne sempre servidos', dica: 'Padrões podem ocorrer em hábitos ou rotinas diárias.', reflexao: 'Como padrões alimentares ajudam a organizar refeições?' },
  { situacao: 'Em uma série de luzes piscando: acesa, apagada, acesa, apagada...', pergunta: 'Qual padrão você observa?', opcoes: ['Luz acesa sempre', 'Luz apagada sempre', 'Alternância acesa-apagada', 'Pisca aleatoriamente', 'Pisca com pausa maior quandoe está acesa'], resposta: 'Alternância acesa-apagada', dica: 'Procure repetições regulares no tempo.', reflexao: 'Como padrões de sinais luminosos são usados em segurança e tecnologia?' },
  { situacao: 'Durante a semana, você percebe que certos ônibus estão sempre lotados às 7h e outros às 18h.', pergunta: 'Qual padrão está acontecendo?', opcoes: ['Todos os ônibus têm o mesmo número de passageiros', 'Certos horários sempre lotados', 'A hora hush é às 18h', 'Motoristas alternam entre ônibus'], resposta: 'Certos horários sempre lotados', dica: 'Padrões podem ser temporais e relacionados à demanda.', reflexao: 'Como observar padrões de uso ajuda no planejamento de transporte?' },
  { situacao: 'Em um quadro de horários, as aulas de matemática acontecem nas segundas e quartas.', pergunta: 'Qual padrão é identificado?', opcoes: ['As aulas não acontecem na sexta', 'Aulas alternadas nas segundas e\\ou quartas', 'A maioria das aulas acontecem na segunda e algumas nas quartas', 'Aulas sempre às segundas e quartas'], resposta: 'Aulas sempre às segundas e quartas', dica: 'Padrões podem indicar repetição regular de eventos.', reflexao: 'Como padrões nos horários escolares ajudam a organizar estudos?' },
  { sequence: [1, 3, 6, 10], options: [12, 14, 15, 16, 32], answer: 15, message: 'Números triangulares: incrementos +2, +3, +4...' }
];

// Função utilitária para embaralhar as opções
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Dados derivados da fase atual para renderização
type CurrentPhaseData =
  | { kind: 'sequence'; sequence: Array<number | string>; options: Array<number | string>; correct: number | string }
  | { kind: 'scenario'; situacao: string; pergunta: string; options: string[]; correct: string };

type MinigameStepPayload = { key: Pillar; step: number; correct?: boolean };

function computeInitialStep(state: GameState | undefined, gameKey: Pillar, totalPhases: number) {
  const events: GameEvent[] = state?.events || [];
  const last = events
    .filter(
      (e: GameEvent) =>
        e.type === 'minigame_step' &&
        (e.payload as MinigameStepPayload)?.key === gameKey &&
        (e.payload as MinigameStepPayload)?.correct === true
    )
    .sort((a: GameEvent, b: GameEvent) => ((b.payload as MinigameStepPayload)?.step || 0) - ((a.payload as MinigameStepPayload)?.step || 0))[0];

  const lastStep = last ? ((last.payload as MinigameStepPayload)?.step ?? 0) : 0;
  let initialStep = last ? (lastStep + 1) : 1;

  if (state?.progress?.[gameKey]?.completed) {
    initialStep = totalPhases + 1;
  }
  if (initialStep > totalPhases) initialStep = totalPhases;
  if (initialStep < 1) initialStep = 1;
  return initialStep;
}

export default function PadroesPage() {
  const { state, attempt, record, score, complete, reflect, getCurrentState } = useStorage();
  const gameKey = 'padroes' as const;
  const totalPhases = phases.length;
  const completed = state?.progress?.[gameKey]?.completed;
  const [finished, setFinished] = useState(completed);
  const [step, setStep] = useState<number>(() => computeInitialStep(state, gameKey, totalPhases));
  const [feedback, setFeedback] = useState('');
  const [currentPhaseData, setCurrentPhaseData] = useState<CurrentPhaseData | null>(null);
  const [tipText, setTipText] = useState('');
  const [tipLevel, setTipLevel] = useState<TipLevel>('Hint');
  const [reflection] = useState('');
  const [feedbackVariant, setFeedbackVariant] = useState<'default' | 'success' | 'error'>('default');

  useEffect(() => {
    setStep(() => computeInitialStep(state, gameKey, totalPhases));
  }, [state, completed, totalPhases]);

  // Carrega os dados da fase atual (lógica de renderPhase)
  useEffect(() => {
    const t = mountTip({ pillar: gameKey, level: 'Hint' })
    setTipLevel(t.level)
    setTipText(t.tip)
  }, [step]);

  useEffect(() => {
    if (step < 1 || step > phases.length) {
      setCurrentPhaseData(null);
      return;
    }
    const phase = phases[step - 1];
    if ('sequence' in phase) {
      setCurrentPhaseData({
        kind: 'sequence',
        sequence: phase.sequence,
        options: shuffle(phase.options),
        correct: phase.answer,
      });
    } else {
      setCurrentPhaseData({
        kind: 'scenario',
        situacao: phase.situacao,
        pergunta: phase.pergunta,
        options: shuffle(phase.opcoes),
        correct: phase.resposta,
      });
    }
    setFeedback('');
    setFeedbackVariant('default');
  }, [step]);

  // Handler para clique nas opções (substitui addEventListener)
  async function handleOptionClick(choice: string | number) {
    await attempt(gameKey); // registra tentativa

    if (!currentPhaseData || finished) return;
    const isCorrect = choice === currentPhaseData.correct;

    if (isCorrect) {
      await record('minigame_step', { key: gameKey, step, correct: true });
      if (step < phases.length) {
        setFeedback('Certo! Próxima fase...');
        setFeedbackVariant('success');
        setTimeout(() => {
          setFeedback('');
          setFeedbackVariant('default');
        }, 1200);
        // avanço ocorre pelo evento gravado
      } else {
        const final = getCurrentState();
        const totalAttempts = final.progress[gameKey]?.attempts || 1;
        const computedScore = Math.max(0, Math.min(10, Math.round((10 * totalPhases) / Math.max(totalAttempts, 1))));
        await score(gameKey, computedScore);
        await complete(gameKey);
        setFeedback('Concluído!');
        setFeedbackVariant('success');
        setFinished(true);
      }
    } else {
      setFeedback('Ainda não. Tente novamente.');
      setFeedbackVariant('error');
      const tip = mountTip({ pillar: gameKey, level: 'Scaffold' });
      setTipLevel(tip.level);
      setTipText(tip.tip);
    }
  }

  const total = phases.length;
  const phaseLabel = step >= 1 && step <= total ? `Fase ${step} de ${total}` : 'Jogo concluído';
  const instruction = useMemo(() => {
    if (!currentPhaseData) return '';
    return currentPhaseData.kind === 'sequence' ? 'Complete a sequência:' : 'Identifique o padrão:';
  }, [currentPhaseData]);

  // removed unused variable currentPhase

  return (
    <section className="rounded-xl border border-white/10 bg-[#0b1220] p-6 shadow-xl shadow-black/40">
      <h1 className="text-2xl font-semibold">Detective de Padrões</h1>
      <div className="text-gray-400 mb-1">{phaseLabel}</div>
      <p className="mt-1">{instruction}</p>

      {currentPhaseData && currentPhaseData.kind === 'sequence' && (
        <div className="text-lg my-2">
          {currentPhaseData.sequence.join(', ')}, <strong>?</strong>
        </div>
      )}

      {currentPhaseData && currentPhaseData.kind === 'scenario' && (
        <div className="my-2">
          <p className="text-gray-400">{currentPhaseData.situacao}</p>
          <p><strong>{currentPhaseData.pergunta}</strong></p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {currentPhaseData?.options.map((opt, idx) => (
          <button
            key={idx}
            className="inline-flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-2 min-h-[44px] rounded-lg border border-white/20 text-white text-sm sm:text-base hover:bg-blue-500/10 transition"
            onClick={() => handleOptionClick(opt)}
          >
            {String(opt)}
          </button>
        ))}
      </div>

      <div className={`mt-2 ${feedbackVariant === 'success' ? 'text-green-500 font-semibold' : feedbackVariant === 'error' ? 'text-red-500' : 'text-gray-400'}`}>{feedback}</div>
      <div className="mt-3 rounded-lg border-l-4 border-blue-500/60 bg-blue-500/10 p-3">
        <div>
          <span className="inline-block text-xs font-semibold bg-blue-500 text-white rounded px-2 py-0.5 mr-2">{tipLevel}</span>
          <span className="text-gray-200">{tipText}</span>
        </div>
      </div>

      <div className="mt-4">
        {/* Botão de Salvar Reflexão (mantém ele aqui caso queira salvar antes de sair) */}
        {!finished && (
          <div className="flex gap-2 mt-2">
            <button
              className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-blue-500/10 transition"
              onClick={() => {
                reflect(gameKey, reflection.trim());
                setFeedback('Reflexão salva.');
              }}
            >
              Salvar reflexão durante o jogo
            </button>
          </div>
        )}
      </div>

      {/* TELA DE VITÓRIA (OVERLAY) */}
      {finished && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b1020]/95 backdrop-blur-sm p-6 text-center animate-in fade-in duration-700">

          {/* Ícone ou Emojis de celebração */}
          <div className="text-6xl mb-6 animate-bounce">🎉 🏆 🧩</div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Parabéns!
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-lg mb-8">
            Você dominou o pilar de <strong className="text-green-400">Padrões</strong>!
            <br />
            Sua jornada de Pensamento Computacional continua.
          </p>

          {/* Botão de Ação Principal */}
          <Link
            href="/jogos/abstracao"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-green-600 font-lg rounded-2xl hover:bg-green-500 hover:scale-105 focus:outline-none ring-offset-2 focus:ring-2 ring-green-400"
          >
            Seguir para a Próxima Fase
            <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>

          {/* Opção secundária discreta para voltar ao menu */}
          <Link
            href="/jogos"
            className="mt-6 text-sm text-gray-500 hover:text-gray-300 underline decoration-gray-700 underline-offset-4"
          >
            Voltar ao menu principal
          </Link>
        </div>
      )}
    </section>
  );
}
