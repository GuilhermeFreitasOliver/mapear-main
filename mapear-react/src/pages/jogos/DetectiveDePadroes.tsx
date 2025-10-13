import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type SequencePhase = {
  sequence: (number | string)[];
  options: (number | string)[];
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

function isSequencePhase(p: Phase): p is SequencePhase {
  return (p as SequencePhase).sequence !== undefined;
}

const DetectiveDePadroes = () => {
  const [step, setStep] = useState<number>(1);
  const [feedback, setFeedback] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [reflection, setReflection] = useState<string>('');

  const total = phases.length;
  const current = useMemo(() => phases[Math.max(0, Math.min(total - 1, step - 1))], [step, total]);

  useEffect(() => {
    setFeedback('');
  }, [step]);

  const handleAnswer = (value: string | number) => {
    if (isComplete) return;
    const correct = isSequencePhase(current)
      ? value === current.answer
      : value === current.resposta;

    if (correct) {
      const isLast = step >= total;
      if (isSequencePhase(current) && current.message) {
        setFeedback(`Certo! ${current.message}`);
      } else {
        setFeedback('Certo!');
      }
      if (!isLast) {
        setTimeout(() => setStep((s) => Math.min(total, s + 1)), 1500);
      } else {
        setIsComplete(true);
      }
    } else {
      setFeedback('Ainda não. Tente novamente.');
    }
  };

  return (
    <section className="card">
      <h1>Detective de Padrões</h1>
      <div id="padroes-phase" className="muted">Fase {step} de {total}</div>

      <p id="padroes-instrucao">
        {isSequencePhase(current) ? 'Complete a sequência:' : 'Identifique o padrão:'}
      </p>

      <div id="padroes-seq" style={{ fontSize: 18, margin: '8px 0' }}>
        {isSequencePhase(current) ? (
          <span>
            {current.sequence.join(', ')}, <strong>?</strong>
          </span>
        ) : (
          <span>
            <p className="muted">{current.situacao}</p>
            <p><strong>{current.pergunta}</strong></p>
          </span>
        )}
      </div>

      <div id="padroes-options" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
        {(isSequencePhase(current) ? current.options : current.opcoes).map((opt, idx) => (
          <button key={idx} className="button" onClick={() => handleAnswer(opt)}>
            {String(opt)}
          </button>
        ))}
      </div>

      <div id="padroes-feedback" className="muted" style={{ marginTop: 10 }}>
        {feedback}
      </div>

      <div className="tip" style={{ marginTop: 12 }}>
        <div>
          <div id="padroes-tip">
            {!isSequencePhase(current) ? (
              <span className="muted">Dica: {current.dica}</span>
            ) : null}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <label htmlFor="padroes-reflexao">Reflexão (MAPEAR):</label>
        <textarea
          id="padroes-reflexao"
          className="input"
          rows={3}
          placeholder="Como identificou o padrão? O que ignorou?"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button className="button secondary" disabled={!isComplete} onClick={() => setFeedback('Reflexão salva.')}>Salvar reflexão</button>
          {isComplete && (
            <Link className="button" to="/jogos/abstracao">Próximo: Abstração</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetectiveDePadroes;