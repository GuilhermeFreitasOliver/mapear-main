import React, { useState } from 'react';

// Importar imagens de labirinto
import labirinto from '../../assets/images/labirinto.png';
import labirinto2 from '../../assets/images/labirinto2.png';
import labirinto3 from '../../assets/images/labirinto3.png';
import labirinto4 from '../../assets/images/labirinto4.png';
import labirinto5 from '../../assets/images/labirinto5.png';
import labirinto6 from '../../assets/images/labirinto6.png';
import labirinto7 from '../../assets/images/labirinto7.png';
import labirinto8 from '../../assets/images/labirinto8.png';
import labirinto9 from '../../assets/images/labirinto9.png';
import labirinto10 from '../../assets/images/labirinto10.png';
import labirinto11 from '../../assets/images/labirinto11.png';
import labirinto12 from '../../assets/images/labirinto12.png';
import labirinto13 from '../../assets/images/labirinto13.png';
import labirinto14 from '../../assets/images/labirinto14.png';

// Tipos TypeScript
interface LabirinthPhase {
  expected: string[];
  availableBlocks: string[];
  note: string;
}

interface ScenarioPhase {
  situacao: string;
  pergunta: string;
  opcoes: string[];
  resposta: string;
  dica: string;
}

type Phase = LabirinthPhase | ScenarioPhase;

// Array de imagens
const imageFiles = [
  labirinto, labirinto2, labirinto3, labirinto4, labirinto5,
  labirinto6, labirinto7, labirinto8, labirinto9, labirinto10,
  labirinto11, labirinto12, labirinto13, labirinto14
];

// Função para embaralhar array
const shuffle = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Algoritmo: React.FC = () => {
  // Array de fases extraído do mapear.html
  const phases: Phase[] = [
    // Fases de Labirinto (1-10)
    {
      expected: ['Andar 2', 'Virar direita', 'Andar 1'],
      availableBlocks: ['Andar 1', 'Andar 2', 'Virar direita', 'Virar esquerda'],
      note: 'Plano curto e direto.'
    },
    {
      expected: ['Andar 2', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 1'],
      availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
      note: 'Inclui mudanças de direção mais de uma vez.'
    },
    {
      expected: ['Andar 1', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 2'],
      availableBlocks: ['Andar 1', 'Andar 2', 'Virar direita', 'Virar esquerda'],
      note: 'Mesmos movimentos do anterior, mudando a quantidade de passos.'
    },
    {
      expected: ['Andar 1', 'Virar direita', 'Andar 2', 'Virar esquerda', 'Andar 1', 'Virar direita', 'Andar 1'],
      availableBlocks: ['Andar 1', 'Andar 2', 'Virar direita', 'Virar esquerda'],
      note: 'Percurso com mudanças de direção.'
    },
    {
      expected: ['Andar 3', 'Virar direita', 'Andar 3'],
      availableBlocks: ['Andar 1', 'Andar 3', 'Virar direita', 'Virar esquerda'],
      note: 'Caminho com alternância de curvas e trechos longos.'
    },
    {
      expected: ['Andar 2', 'Virar direita', 'Andar 3', 'Virar esquerda', 'Andar 1', 'Virar direita', 'Andar 1'],
      availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
      note: 'Zigue-zague com trechos variados.'
    },
    {
      expected: ['Andar 1', 'Virar direita', 'Andar 2', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 2'],
      availableBlocks: ['Andar 1', 'Andar 2', 'Andar 4', 'Virar direita', 'Virar esquerda'],
      note: 'Sequência longa que exige atenção à ordem.'
    },
    {
      expected: ['Andar 3', 'Virar esquerda', 'Andar 3', 'Virar direita', 'Andar 1'],
      availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
      note: 'Contornando obstáculos'
    },
    {
      expected: ['Andar 2', 'Virar esquerda', 'Andar 3', 'Virar direita', 'Andar 2'],
      availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
      note: 'Caminho com obstáculos e trechos longos.'
    },
    {
      expected: ['Andar 1', 'Virar esquerda', 'Andar 2', 'Virar direita', 'Andar 3', 'Virar esquerda', 'Andar 1'],
      availableBlocks: ['Andar 1', 'Andar 2', 'Andar 3', 'Virar direita', 'Virar esquerda'],
      note: 'Percurso com zigue-zague e trechos longos.'
    },
    // Fases de cenários (11-14)
    {
      expected: ['Ferver água', 'Colocar água fervida na xícara', 'Colocar saquinho de chá', 'Servir'],
      availableBlocks: ['Ferver água', 'Colocar saquinho de chá', 'Servir', 'Colocar água fervida na xícara', 'Adoçar'],
      note: 'Chá: ordem correta é ferver antes de preparar.'
    },
    {
      expected: ['Pré-aquecer forno', 'Bater massa', 'Colocar a massa no forno', 'Esperar 30min', 'Servir'],
      availableBlocks: ['Bater massa', 'Servir', 'Pré-aquecer forno', 'Colocar a massa no forno', 'Esperar 30min'],
      note: 'Pré-aquecer antes de assar.'
    },
    {
      expected: ['Digitar login', 'Digitar senha', 'Clicar em validar'],
      availableBlocks: ['Digitar senha', 'Clicar em validar', 'Abrir perfil', 'Digitar login'],
      note: 'Validar antes de abrir perfil.'
    },
    {
      expected: ['Varredura linha 1', 'Varredura linha 2', 'Varredura linha 3'],
      availableBlocks: ['Varredura linha 3', 'Varredura linha 1', 'Varredura linha 2'],
      note: 'Varre linha a linha (3×3).'
    },
    // Fases de múltipla escolha (15-36)
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
    { situacao: 'Você precisa lavar roupa em uma lavadora.', pergunta: 'Qual sequência correta?', opcoes: ['Colocar roupas → adicionar sabão → selecionar ciclo → iniciar', 'Adicionar sabão → iniciar → colocar roupas', 'Colocar roupas → iniciar → adicionar sabão', 'Selecionar ciclo → adicionar sabão → iniciar → colocar roupas'], resposta: 'Colocar roupas → adicionar sabão → selecionar ciclo → iniciar', dica: 'A ordem correta garante o resultado.' }
  ];

  // Estados
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [scenarioChoice, setScenarioChoice] = useState<string | null>(null);

  // Função para verificar se é fase de cenário
  const isScenarioPhase = (phase: Phase): phase is ScenarioPhase => {
    return 'opcoes' in phase;
  };

  // Função para verificar resposta
  const handleVerify = () => {
    const currentPhase = phases[step - 1];
    let isCorrect = false;

    if (isScenarioPhase(currentPhase)) {
      // Fase de múltipla escolha
      if (!scenarioChoice) {
        setFeedback('Selecione uma opção.');
        return;
      }
      isCorrect = scenarioChoice === currentPhase.resposta;
    } else {
      // Fase de labirinto/blocos
      isCorrect = plan.length === currentPhase.expected.length && 
                  plan.every((block, index) => block === currentPhase.expected[index]);
    }

    if (isCorrect) {
      if (step < phases.length) {
        setFeedback('Correto! Próxima fase...');
        setTimeout(() => {
          setStep(step + 1);
          setPlan([]);
          setScenarioChoice(null);
          setFeedback('');
        }, 1500);
      } else {
        setFeedback('Sucesso! Você completou todas as fases.');
        setIsComplete(true);
      }
    } else {
      if (isScenarioPhase(currentPhase)) {
        setFeedback('Não funcionou. Reveja a situação.');
      } else {
        setFeedback('Não funcionou. Teste passo a passo: onde seu plano falha?');
      }
    }
  };

  // Função para refazer
  const handleReset = () => {
    const currentPhase = phases[step - 1];
    if (isScenarioPhase(currentPhase)) {
      setScenarioChoice(null);
    } else {
      setPlan([]);
    }
    setFeedback('');
  };

  // Função para adicionar bloco ao plano
  const addToPlan = (block: string) => {
    setPlan([...plan, block]);
  };

  const currentPhase = phases[step - 1];
  const isScenario = isScenarioPhase(currentPhase);

  return (
    <section className="card">
      <h1>Algoritmos</h1>
      <div className="muted">Fase {step} de {phases.length}</div>
      
      {isScenario ? (
        <div>
          <p>{currentPhase.situacao}</p>
          <p className="muted">{currentPhase.pergunta}</p>
        </div>
      ) : (
        <div>
          <p>Monte um algoritmo para o desafio.</p>
          {step <= imageFiles.length && (
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
              <img 
                src={imageFiles[step - 1]} 
                alt="Representação do desafio" 
                style={{ 
                  maxWidth: '420px', 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '10px', 
                  border: '1px solid rgba(148,163,184,0.25)' 
                }} 
              />
            </div>
          )}
        </div>
      )}

      {/* Blocos disponíveis */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', justifyContent: 'center' }}>
        {isScenario ? (
          // Opções de múltipla escolha
          shuffle([...currentPhase.opcoes]).map((option, index) => (
            <button
              key={index}
              className={`button ${scenarioChoice === option ? 'active' : ''}`}
              onClick={() => setScenarioChoice(option)}
            >
              {option}
            </button>
          ))
        ) : (
          // Blocos de algoritmo
          shuffle([...currentPhase.availableBlocks]).map((block, index) => (
            <button
              key={index}
              className="button"
              onClick={() => addToPlan(block)}
            >
              {block}
            </button>
          ))
        )}
      </div>

      {/* Plano atual (apenas para fases de algoritmo) */}
      {!isScenario && (
        <div className="card" style={{ marginTop: '10px' }}>
          <h3>Seu plano</h3>
          <div className="muted">
            {plan.length > 0 ? plan.join(' → ') : '(vazio)'}
          </div>
        </div>
      )}

      {/* Botões de ação */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button className="button" onClick={handleVerify}>
          Verificar
        </button>
        <button className="button secondary" onClick={handleReset}>
          Refazer
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="muted" style={{ marginTop: '8px' }}>
          {feedback}
        </div>
      )}

      {/* Dica */}
      {isScenario && (
        <div className="tip" style={{ marginTop: '12px' }}>
          <div>{currentPhase.dica}</div>
        </div>
      )}

      {/* Reflexão e finalização */}
      <div style={{ marginTop: '14px' }}>
        <label htmlFor="alg-reflexao">Reflexão (MAPEAR):</label>
        <textarea 
          id="alg-reflexao" 
          className="input" 
          rows={3} 
          placeholder="Sua sequência funcionaria para qualquer pessoa?"
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button className="button secondary" disabled={!isComplete}>
            Salvar reflexão
          </button>
          {isComplete && (
            <a className="button" href="#/generalizacao">
              Próximo: Generalize+
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Algoritmo;