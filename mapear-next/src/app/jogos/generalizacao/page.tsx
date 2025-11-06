"use client";

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useStorage } from '@/context/StorageContext';
import type { GameState, GameEvent, Pillar } from '@/context/StorageContext';
import { mountTip, TipLevel } from '@/lib/tipEngine'

type PhaseSet = { set: (string|number)[]; rule: string; correct: (sel: (string|number)[]) => boolean; };
type PhaseScenario = { situacao: string; pergunta: string; opcoes: string[]; resposta: string; dica?: string; };
type Phase = PhaseSet | PhaseScenario;

const isScenario = (p: Phase): p is PhaseScenario => 'opcoes' in p;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type MinigameStepPayload = { key: Pillar; step: number; correct?: boolean };

function computeInitialStep(state: GameState | undefined, key: Pillar, maxStep: number) {
  const completed = state?.progress?.[key]?.completed;
  if (completed) return maxStep;
  const steps = (state?.events || [])
    .filter((e: GameEvent) => e.type === 'minigame_step' && (e.payload as MinigameStepPayload)?.key === key && (e.payload as MinigameStepPayload)?.correct)
    .map((e: GameEvent) => (e.payload as MinigameStepPayload)?.step);
  const last = steps.length ? Math.max(...steps) : 0;
  return Math.min(maxStep, last + 1);
}

export default function GeneralizacaoPage() {
  const storage = useStorage();
  const gameKey = 'generalizacao' as const;

  const phases: Phase[] = [
    { set: [2, 5, 8, 11, 14], rule: 'Colete apenas números pares.', correct: (sel) => sel.sort().join(',') === [2, 8, 14].sort().join(',') },
    { set: ['Ás', '2', '3', '5', '8', '9'], rule: 'Mesma regra, agora em cartas (Ás=1).', correct: (sel) => sel.sort().join(',') === ['2', '8'].sort().join(',') },
    { set: ['R$ 10', 'R$ 13', 'R$ 16', 'R$ 21', 'R$ 34', 'R$ 20'], rule: 'Apenas múltiplos de 4.', correct: (sel) => sel.sort().join(',') === ['R$ 16', 'R$ 20'].sort().join(',') },
    { set: ['Par=', 'Ímpar=', '2', '3', '4', '5', '8'], rule: 'Siga a regra: selecione somente pares.', correct: (sel) => sel.sort().join(',') === ['2', '4', '8'].sort().join(',') },
    { set: ['12 kg', '7 kg', '4 kg', '9 kg', '13 kg'], rule: 'Selecione apenas pesos ímpares.', correct: (sel) => sel.sort().join(',') === ['7 kg', '9 kg', '13 kg'].sort().join(',') },
    { set: ['fileA_v2', 'fileB_v3', 'fileC_v4', 'fileC_v7', 'fileC_v9'], rule: 'Selecione somente versões pares.', correct: (sel) => sel.sort().join(',') === ['fileA_v2', 'fileC_v4'].sort().join(',') },
    { set: ['2h', '3h', '6h', '7h', '9h', '13h'], rule: 'Selecione durações múltiplas de 3.', correct: (sel) => sel.sort().join(',') === ['3h', '6h', '9h'].sort().join(',') },
    { set: [20, 21, 22, 23, 24, 26, 31, 34], rule: 'Selecione apenas números pares.', correct: (sel) => sel.sort().join(',') === [20, 22, 24, 26, 34].sort().join(',') },
    { set: ['Sala 101', 'Sala 102', 'Sala 203', 'Sala 204', 'Sala 207'], rule: 'Apenas números ímpares.', correct: (sel) => sel.sort().join(',') === ['Sala 101', 'Sala 203', 'Sala 207'].sort().join(',') },
    { set: ['Par', '2', 'Ímpar', '3', '4', 'Seis', 'Oito', '11'], rule: 'Apenas valores primos.', correct: (sel) => sel.sort().join(',') === ['2', '3', '11'].sort().join(',') },
    { situacao: 'Você aprendeu a calcular a área de um quadrado.', pergunta: 'Como generalizar para um retângulo?', opcoes: ['Somar lados', 'Usar Báskara', 'Base × altura', 'Contar quadradinhos'], resposta: 'Base × altura', dica: 'Pense em regras que funcionam em mais casos.' },
    { situacao: 'Você aprendeu a fazer a soma de dois números.', pergunta: 'Como generalizar para somar três ou mais números?', opcoes: ['Somar apenas os dois primeiros', 'Multiplicar os números', 'Somar dois números de cada vez', 'Subtrair o último'], resposta: 'Somar dois números de cada vez', dica: 'Generalização permite aplicar o mesmo conceito repetidamente.' },
    { situacao: 'Você aprendeu a criar uma função que calcula o dobro de um número.', pergunta: 'Como generalizar para calcular o triplo ou qualquer múltiplo?', opcoes: ['Somar 2 sempre', 'Multiplicar o número pelo fator desejado', 'Usar apenas o dobro', 'Subtrair metade'], resposta: 'Multiplicar o número pelo fator desejado', dica: 'Generalizar significa tornar a solução aplicável a diferentes casos.' },
    { situacao: 'Você aprendeu a ordenar dois números em ordem crescente.', pergunta: 'Como generalizar para ordenar uma lista de vários números?', opcoes: ['Somar todos os números', 'Escolher aleatoriamente', 'Comparar todos os pares e organizar', 'Multiplicar todos os números'], resposta: 'Comparar todos os pares e organizar', dica: 'Generalização estende a lógica para casos maiores.' },
    { situacao: 'Você aprendeu a identificar se um número é par ou ímpar.', pergunta: 'Como generalizar para identificar múltiplos de qualquer número?', opcoes: ['Verificar resto da divisão pelo número desejado', 'Somar o número com outro', 'Multiplicar por 2', 'Subtrair 1'], resposta: 'Verificar resto da divisão pelo número desejado', dica: 'Generalização permite adaptar uma regra a diferentes valores.' },
    { situacao: 'Você aprendeu a desenhar um círculo com raio 5 cm.', pergunta: 'Como generalizar para qualquer raio?', opcoes: ['Sempre usar 5 cm', 'Usar a fórmula do círculo com o raio desejado', 'Desenhar quadrados', 'Desenhar triângulos'], resposta: 'Usar a fórmula do círculo com o raio desejado', dica: 'Transforme a solução específica em uma regra geral.' },
    { situacao: 'Você aprendeu a escrever uma frase em maiúsculas.', pergunta: 'Como generalizar para qualquer frase?', opcoes: ['Somente na primeira frase', 'Aplicar a função de maiúsculas em qualquer texto', 'Ignorar o texto', 'Escrever sempre a mesma frase'], resposta: 'Aplicar a função de maiúsculas em qualquer texto', dica: 'Generalização aplica regras a diversos casos.' },
    { situacao: 'Você aprendeu a calcular a média de duas notas.', pergunta: 'Como generalizar para calcular a média de várias notas?', opcoes: ['Somar todas as notas e dividir pelo total', 'Somar apenas duas notas', 'Multiplicar as notas', 'Subtrair a primeira nota'], resposta: 'Somar todas as notas e dividir pelo total', dica: 'Generalização transforma um método específico em um método mais amplo.' },
    { situacao: 'Você aprendeu a encontrar o maior de dois números.', pergunta: 'Como generalizar para encontrar o maior de uma lista de números?', opcoes: ['Escolher os pares', 'Somar todos os números', 'Comparar todos os números entre si', 'Multiplicar os números'], resposta: 'Comparar todos os números entre si', dica: 'Generalização amplia a aplicação de uma regra simples.' },
    { situacao: 'Você aprendeu a desenhar um triângulo equilátero de lado 3 cm.', pergunta: 'Como generalizar para qualquer tamanho de lado?', opcoes: ['Sempre usar 3 cm', 'Desenhar quadrados', 'Desenhar círculos', 'Usar a mesma regra ajustando o lado desejado'], resposta: 'Usar a mesma regra ajustando o lado desejado', dica: 'Generalização transforma uma solução específica em aplicável a qualquer caso.' },
    { situacao: 'Você aprendeu a identificar letras vogais em uma palavra.', pergunta: 'Como generalizar para identificar vogais em qualquer palavra?', opcoes: ['Verificar cada letra da palavra contra o conjunto de vogais', 'Somente na primeira palavra', 'Ignorar letras', 'Sempre marcar a primeira letra'], resposta: 'Verificar cada letra da palavra contra o conjunto de vogais', dica: 'Generalização aplica regras conhecidas a múltiplos casos.' },
    { situacao: 'Você aprendeu a somar números positivos.', pergunta: 'Como generalizar para somar qualquer número, incluindo negativos?', opcoes: ['Somar apenas positivos', 'Ignorar negativos', 'Usar a mesma operação de soma com qualquer número', 'Multiplicar números negativos'], resposta: 'Usar a mesma operação de soma com qualquer número', dica: 'Generalização amplia o escopo de aplicação de uma operação.' },
    { situacao: 'Você aprendeu a criar um quadrado com caneta.', pergunta: 'Como generalizar para criar qualquer polígono?', opcoes: ['Definir número de lados e tamanho e seguir a mesma lógica', 'Sempre fazer quadrados', 'Desenhar círculos', 'Ignorar lados'], resposta: 'Definir número de lados e tamanho e seguir a mesma lógica', dica: 'Generalização permite transformar métodos específicos em métodos gerais.' },
    { situacao: 'Você aprendeu a formatar uma célula no Excel para números inteiros.', pergunta: 'Como generalizar para formatar qualquer tipo de dado?', opcoes: ['Sempre usar inteiro', 'Ignorar formatação', 'Usar texto apenas', 'Aplicar regras de formatação de acordo com o tipo de dado'], resposta: 'Aplicar regras de formatação de acordo com o tipo de dado', dica: 'Generalização adapta regras específicas a diferentes situações.' },
    { situacao: 'Você aprendeu a calcular o perímetro de um quadrado.', pergunta: 'Como generalizar para calcular o perímetro de qualquer polígono regular?', opcoes: ['Multiplicar o número de lados pelo tamanho do lado', 'Somar lados aleatoriamente', 'Usar sempre quadrado', 'Ignorar lados'], resposta: 'Multiplicar o número de lados pelo tamanho do lado', dica: 'Generalização transforma fórmulas específicas em fórmulas aplicáveis a muitos casos.' },
    { situacao: 'Você aprendeu a identificar números primos entre 1 e 10.', pergunta: 'Como generalizar para identificar números primos em qualquer intervalo?', opcoes: ['Marcar números aleatórios', 'Somar todos os números', 'Verificar se o número só é divisível por 1 e ele mesmo', 'Multiplicar números'], resposta: 'Verificar se o número só é divisível por 1 e ele mesmo', dica: 'Generalização aplica a regra fundamental a diferentes conjuntos.' },
    { situacao: 'Você aprendeu a converter Celsius para Fahrenheit.', pergunta: 'Como generalizar para qualquer conversão linear entre escalas?', opcoes: ['Usar fórmula ax + b para converter', 'Somar 10 sempre', 'Dobrar o valor', 'Subtrair 1'], resposta: 'Usar fórmula ax + b para converter', dica: 'Regras lineares generalizam conversões.' },
    { situacao: 'Você aprendeu a classificar números pares.', pergunta: 'Como generalizar para múltiplos de qualquer k?', opcoes: ['Somar k uma vez', 'Dividir por 2', 'Testar resto da divisão por k', 'Multiplicar por 2'], resposta: 'Testar resto da divisão por k', dica: 'Use a mesma regra com parâmetro k.' },
    { situacao: 'Você aprendeu a somar uma lista de números.', pergunta: 'Como generalizar para reduzir uma coleção com qualquer operação associativa?', opcoes: ['Multiplicar tudo sempre', 'Aplicar reduce com a operação definida', 'Ordenar primeiro e depois somar', 'Escolher dois números aleatórios'], resposta: 'Aplicar reduce com a operação definida', dica: 'Generalize a operação, não os dados.' },
    { situacao: 'Você aprendeu a calcular o volume de um cubo.', pergunta: 'Como generalizar para o volume de um paralelepípedo retângulo?', opcoes: ['Somar as arestas', 'Comprimento × largura × altura', 'Área do cubo × 2', 'Usar πr²h'], resposta: 'Comprimento × largura × altura', dica: 'Substitua a medida igual por três dimensões independentes.' }
  ];

  const [step, setStep] = useState<number>(() => computeInitialStep(storage.state, gameKey, phases.length));
  useEffect(() => { setStep(() => computeInitialStep(storage.state, gameKey, phases.length)); }, [storage.state?.events, storage.state?.progress?.[gameKey]?.completed]);
  const [attempts, setAttempts] = useState(0)
  const [corrects, setCorrects] = useState(0)
  const [selection, setSelection] = useState<Set<string|number>>(new Set());
  const [feedback, setFeedback] = useState('')
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('')
  const [reflection, setReflection] = useState('')
  const [finished, setFinished] = useState(false)
  const [tipText, setTipText] = useState('')
  const [tipLevel, setTipLevel] = useState<TipLevel>('Hint')
  const current = phases[step - 1];
  const values = useMemo(() => isScenario(current) ? shuffle([...current.opcoes]) : shuffle(current.set.map(v => v)), [step]);

  const toggle = (v: string|number) => {
    setSelection(prev => {
      const next = new Set(prev);
      if (isScenario(current)) { next.clear(); next.add(v); }
      else { if (next.has(v)) next.delete(v); else next.add(v); }
      return next;
    });
  };

  useEffect(() => {
    const t = mountTip({ pillar: gameKey, level: 'Hint' })
    setTipLevel(t.level)
    setTipText(t.tip)
  }, [step])

  const handleCheck = async () => {
    setAttempts((a) => a + 1)
    await storage.attempt(gameKey)
  
    const ok = isScenario(current)
      ? ([...selection][0] === current.resposta)
      : current.correct([...selection])
  
    if (ok) {
      setCorrects((c) => c + 1)
      if (step < phases.length) {
        setFeedback('Certo! Próxima fase...')
        setFeedbackType('success')
        setTimeout(async () => {
          await storage.record('minigame_step', { key: gameKey, step, correct: true })
          setSelection(new Set())
          setFeedback('')
          setFeedbackType('')
        }, 1500)
      } else {
        await storage.record('minigame_step', { key: gameKey, step, correct: true })
        await storage.complete(gameKey)
        await storage.record('minigame_result', { key: gameKey, attempts, corrects, correct: true })
        setFeedback('Concluído! Você validou as generalizações.')
        setFeedbackType('success')
        setFinished(true)
      }
    } else {
      await storage.record('minigame_try', { key: gameKey, step })
      setFeedback(isScenario(current) ? 'Ajuste sua escolha com base nas evidências do cenário.' : 'Reveja: todos os itens devem seguir as regras escolhidas.')
      setFeedbackType('error')
      const t = mountTip({ pillar: gameKey, level: 'Scaffold' })
      setTipLevel(t.level)
      setTipText(t.tip)
    }
  }

  const handleSaveReflection = async () => {
    await storage.reflect(gameKey, reflection.trim());
    setFeedback('Reflexão salva.');
    setFeedbackType('success');
  };

  return (
    <section className="rounded-xl border border-white/10 bg-[#0b1220] p-6 shadow-xl shadow-black/40">
      <h1 className="text-2xl font-semibold">Generalize+</h1>
      <div className="text-gray-400">Fase {step} de {phases.length}</div>
      <div>
        {isScenario(current) ? (
          <>
            <p className="text-gray-400">{current.situacao}</p>
            <p><strong>{current.pergunta}</strong></p>
          </>
        ) : (
          <>
            <p><strong>{current.rule}</strong></p>
            <p className="muted">Conjunto: {current.set.join(', ')}</p>
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {values.map(v => {
          const active = selection.has(v);
          return (
            <button
              key={String(v)}
              className={active
                ? 'px-3 py-2 rounded-lg border border-green-500/40 bg-green-600/20 text-white'
                : 'px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-blue-500/10 transition'}
              onClick={() => toggle(v)}
            >
              {String(v)}
            </button>
          );
        })}
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-blue-500/10 transition"
          onClick={handleCheck}
        >
          Verificar
        </button>
      </div>
      <div className={`mt-2 ${feedbackType === 'success' ? 'text-green-500' : feedbackType === 'error' ? 'text-red-500' : 'text-gray-400'}`}>{feedback}</div>
      <div className="mt-3 rounded-lg border-l-4 border-blue-500/60 bg-blue-500/10 p-3">
        <div>
          {isScenario(current) && current.dica && (
            <div className="mb-1.5">{current.dica}</div>
          )}
          <div>
            <span className="inline-block text-xs font-semibold bg-blue-500 text-white rounded px-2 py-0.5 mr-2">{tipLevel}</span>
            <span className="text-gray-200">{tipText}</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="gen-reflexao" className="block font-medium text-gray-200">Reflexão (MAPEAR):</label>
        <textarea
          id="gen-reflexao"
          className="mt-2 w-full px-3 py-2 rounded-lg border border-white/20 bg-[#0b1220] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Qual lógica permanece igual ao mudar o cenário?"
          value={reflection}
          onChange={e => setReflection(e.target.value)}
        />
        <div className="flex gap-2 mt-2">
          <button
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-blue-500/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSaveReflection}
            disabled={!finished}
          >
            Salvar reflexão
          </button>
          {finished && (
            <Link
              className="inline-flex items-center justify-center px-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 transition"
              href="/jogos/robotica"
            >
              Próximo: Robótica
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
