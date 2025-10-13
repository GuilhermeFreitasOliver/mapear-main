import React, { useState } from 'react';

// Tipo para as fases do jogo de Robótica
interface RoboticaPhase {
  situacao: string;
  pergunta: string;
  opcoes: string[];
  correta: string;
  dica: string;
}

// Função para embaralhar array
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Robotica: React.FC = () => {
  // Array de fases extraído do mapear.html
  const phases: RoboticaPhase[] = [
    {
      situacao: 'Sensor ultrassônico detecta distância < 15 cm à frente.',
      pergunta: 'Qual ação imediata evita colisão?',
      opcoes: ['Seguir em frente', 'Virar à esquerda', 'Acender LED verde'],
      correta: 'Virar à esquerda',
      dica: 'Quando a distância é pequena, mude a direção.'
    },
    {
      situacao: 'Sensor de luz identifica faixa preta contínua sob o robô.',
      pergunta: 'Qual é a estratégia típica de um robô seguidor de linha?',
      opcoes: ['Parar', 'Seguir em frente', 'Girar 180°'],
      correta: 'Seguir em frente',
      dica: 'Na linha, avanço mantém o rastreamento.'
    },
    {
      situacao: 'Sensor de temperatura indica 31 °C no interior da carcaça.',
      pergunta: 'Que atuador ajuda a reduzir a temperatura?',
      opcoes: ['Ativar ventilador', 'Acender LED azul', 'Emitir som'],
      correta: 'Ativar ventilador',
      dica: 'Atuadores mecânicos alteram o ambiente.'
    },
    {
      situacao: 'Sensor de luminosidade registra 5% (ambiente muito escuro).',
      pergunta: 'Qual feedback comunica o estado ao usuário?',
      opcoes: ['Acender LED vermelho', 'Acender LED verde', 'Virar à direita'],
      correta: 'Acender LED vermelho',
      dica: 'Sinalização visual avisa condição crítica.'
    },
    {
      situacao: 'Sensor de som detecta alarme alto contínuo por 10s.',
      pergunta: 'Que ação sinaliza emergência ao operador?',
      opcoes: ['Parar motores e piscar LED vermelho', 'Aumentar velocidade', 'Tocar música ambiente'],
      correta: 'Parar motores e piscar LED vermelho',
      dica: 'Emergências pedem parada e alerta visual.'
    },
    {
      situacao: 'Sensor de gás registra concentração acima do limite seguro.',
      pergunta: 'Qual atuação reduz a exposição?',
      opcoes: ['Abrir válvula de exaustão', 'Acender LED azul', 'Virar à direita'],
      correta: 'Abrir válvula de exaustão',
      dica: 'Remover o gás do ambiente é prioridade.'
    },
    {
      situacao: 'Sensor infravermelho detecta obstáculo à direita; esquerda livre.',
      pergunta: 'Qual desvio é mais eficiente?',
      opcoes: ['Virar à direita', 'Virar à esquerda', 'Seguir em frente'],
      correta: 'Virar à esquerda',
      dica: 'Escolha o caminho livre baseado no sensor.'
    },
    {
      situacao: 'Sensor de umidade do solo indica seco (0–10%).',
      pergunta: 'Qual atuador resolve a necessidade imediata?',
      opcoes: ["Acionar bomba d'água", 'Acender LED verde', 'Reproduzir som'],
      correta: "Acionar bomba d'água",
      dica: 'Atuador deve alterar o estado medido pelo sensor.'
    },
    {
      situacao: 'Sensor de corrente indica sobrecarga no motor da roda esquerda.',
      pergunta: 'Qual ação preventiva evita dano?',
      opcoes: ['Reduzir PWM do motor esquerdo', 'Aumentar velocidade do motor direito', 'Acender LED verde'],
      correta: 'Reduzir PWM do motor esquerdo',
      dica: 'Aja no atuador afetado para reduzir esforço.'
    },
    {
      situacao: 'Sensor de proximidade detecta borda de mesa (queda iminente).',
      pergunta: 'Qual ação imediata é mais segura?',
      opcoes: ['Dar ré e virar 90°', 'Seguir em frente', 'Girar 180° no lugar e seguir'],
      correta: 'Dar ré e virar 90°',
      dica: 'Afaste-se e mude direção para longe do risco.'
    },
    {
      situacao: 'Sensor detecta obstáculo a 5 cm.',
      pergunta: 'O que o robô faz?',
      opcoes: ['Para e gira', 'Continua reto', 'Liga música'],
      correta: 'Para e gira',
      dica: 'Se não pode seguir, decide outro caminho.'
    },
    {
      situacao: 'Robô com 2 sensores de linha detecta preto em ambos.',
      pergunta: 'O que significa?',
      opcoes: ['Está centralizado', 'Está fora da linha', 'Bateria fraca'],
      correta: 'Está centralizado',
      dica: 'Se ambos percebem igual, há equilíbrio.'
    },
    {
      situacao: 'Robô anda 3 passos e vira à direita. Após 4 repetições?',
      pergunta: 'Qual o resultado?',
      opcoes: ['Volta ao início', 'Fica perdido', 'Anda em círculo'],
      correta: 'Volta ao início',
      dica: 'Veja o ciclo completo.'
    },
    {
      situacao: 'Motor esquerdo mais rápido que o direito.',
      pergunta: 'O robô faz?',
      opcoes: ['Curva para a direita', 'Curva para a esquerda', 'Vai reto'],
      correta: 'Curva para a direita',
      dica: 'Mais velocidade de um lado puxa.'
    },
    {
      situacao: 'O robô deve tocar o buzzer três vezes e depois acender o LED verde.',
      pergunta: 'Qual sequência de ações atende ao objetivo?',
      opcoes: ['Bip, bip, bip → LED verde', 'LED verde → bip, bip, bip', 'Bip → LED verde → bip, bip'],
      correta: 'Bip, bip, bip → LED verde',
      dica: 'Planeje a ordem das ações antes de executar.'
    },
    {
      situacao: 'Em uma pista com curvas marcadas D, D, E, D, D, E, ...',
      pergunta: 'Qual é a próxima curva que mantém o padrão?',
      opcoes: ['Direita', 'Esquerda', 'Parar'],
      correta: 'Direita',
      dica: 'Observe a repetição do ritmo D, D, E.'
    },
    {
      situacao: 'Ontem, a 8 cm de um obstáculo, você desviou para a esquerda com sucesso. Hoje, a esquerda está bloqueada e a frente livre.',
      pergunta: 'Qual decisão mantém a ideia de desviar do obstáculo?',
      opcoes: ['Virar à direita', 'Virar à esquerda', 'Seguir em frente'],
      correta: 'Virar à direita',
      dica: 'Aplique a estratégia em um novo contexto semelhante.'
    },
    {
      situacao: 'O robô deve reagir apenas quando detectar duas palmas em até 1 segundo.',
      pergunta: 'Qual condição ativa corretamente a resposta?',
      opcoes: ['Detectar duas palmas em até 1s', 'Qualquer som alto', 'Clique no botão'],
      correta: 'Detectar duas palmas em até 1s',
      dica: 'Defina critérios claros e ignore ruídos.'
    },
    {
      situacao: 'Você quer um robô simples para empurrar caixas em linha reta.',
      pergunta: 'Qual montagem mínima é suficiente?',
      opcoes: ['Chassi com dois motores e lâmina frontal', 'LEDs e buzzer', 'Somente rodas livres'],
      correta: 'Chassi com dois motores e lâmina frontal',
      dica: 'Foque apenas nos elementos que afetam a tarefa.'
    },
    {
      situacao: 'Há setas no chão indicando: ↑, ↑, →, ↑.',
      pergunta: 'Qual sequência de comandos corresponde?',
      opcoes: ['Avançar, avançar, virar à direita, avançar', 'Virar à direita, avançar, avançar, avançar', 'Avançar, virar à direita, avançar, avançar'],
      correta: 'Avançar, avançar, virar à direita, avançar',
      dica: 'Traduza símbolos em ações ordenadas.'
    },
    {
      situacao: 'Três sensores de linha (E, C, D) retornam 0, 1, 0.',
      pergunta: 'Qual ação mantém o robô no centro da linha?',
      opcoes: ['Seguir em frente', 'Virar à esquerda', 'Virar à direita'],
      correta: 'Seguir em frente',
      dica: 'Quando apenas o centro detecta, avance reto.'
    },
    {
      situacao: 'Leituras do ultrassônico: 25, 20, 15, 10...',
      pergunta: 'O que o robô deve fazer a seguir para evitar risco?',
      opcoes: ['Reduzir velocidade e desviar', 'Acelerar', 'Manter tudo igual'],
      correta: 'Reduzir velocidade e desviar',
      dica: 'Antecipe tendências e aja preventivamente.'
    },
    {
      situacao: 'O robô deve recolher apenas caixas com etiqueta azul em uma prateleira colorida.',
      pergunta: 'Qual regra de seleção atende ao objetivo?',
      opcoes: ['Pegar apenas objetos com etiqueta azul', 'Pegar qualquer objeto', 'Pegar o menor objeto'],
      correta: 'Pegar apenas objetos com etiqueta azul',
      dica: 'Use características recorrentes para decidir.'
    },
    {
      situacao: 'O piso muda entre liso e áspero durante o trajeto.',
      pergunta: 'Qual ajuste ajuda a manter a trajetória reta?',
      opcoes: ['Ajustar potência dos motores conforme atrito', 'Desligar sensores', 'Aumentar volume do buzzer'],
      correta: 'Ajustar potência dos motores conforme atrito',
      dica: 'Adapte a mesma regra às variações do ambiente.'
    },
    {
      situacao: 'Em um cruzamento, o semáforo segue verde → amarelo → vermelho → verde...',
      pergunta: 'Ao ver amarelo, qual ação é apropriada?',
      opcoes: ['Reduzir e preparar para parar', 'Acelerar', 'Parar imediatamente'],
      correta: 'Reduzir e preparar para parar',
      dica: 'Interprete sinais para planejar a próxima ação.'
    },
    {
      situacao: 'Na esteira, peças de tamanhos variados passam continuamente.',
      pergunta: 'Qual estratégia funciona para classificar qualquer tamanho?',
      opcoes: ['Medir e encaminhar com limite configurável', 'Coletar apenas as pequenas', 'Parar a esteira'],
      correta: 'Medir e encaminhar com limite configurável',
      dica: 'Crie uma regra que sirva para muitos casos.'
    },
    {
      situacao: 'Sequência de passos: andar 2, virar à direita, andar 1, repetir 3 vezes.',
      pergunta: 'Qual destino provável após as repetições?',
      opcoes: ['Formar um retângulo e retornar próximo ao início', 'Ficar parado no meio', 'Sair do percurso'],
      correta: 'Formar um retângulo e retornar próximo ao início',
      dica: 'Repetições formam trajetórias previsíveis.'
    },
    {
      situacao: 'Dois sensores de proximidade detectam: esquerda 5 cm, direita livre.',
      pergunta: 'Para contornar de forma consistente, o que fazer?',
      opcoes: ['Virar à direita', 'Virar à esquerda', 'Parar e piscar LED verde'],
      correta: 'Virar à direita',
      dica: 'Prefira o lado livre para manter a estratégia.'
    },
    {
      situacao: 'O robô deve acender a luz somente quando alguém entra e o ambiente está escuro.',
      pergunta: 'Qual condição combina os sensores corretamente?',
      opcoes: ['Presença detectada E luminosidade baixa', 'Presença OU luminosidade baixa', 'Sempre acesa'],
      correta: 'Presença detectada E luminosidade baixa',
      dica: 'Combine sinais relevantes para decidir a ação.'
    },
    {
      situacao: 'O robô detecta baixa bateria durante a operação.',
      pergunta: 'Qual ação imediata é apropriada?',
      opcoes: ['Aumentar velocidade', 'Diminuir consumo e retornar à base', 'Piscar LED verde'],
      correta: 'Diminuir consumo e retornar à base',
      dica: 'Conservação de energia e segurança primeiro.'
    }
  ];

  // Estados do componente
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Função para verificar resposta e avançar
  const handleAnswer = (selectedOption: string) => {
    const currentPhase = phases[step];
    
    if (selectedOption === currentPhase.correta) {
      if (step < phases.length - 1) {
        setFeedback('Correto! Próxima fase...');
        setTimeout(() => {
          setStep(step + 1);
          setFeedback('');
        }, 1500);
      } else {
        setFeedback('Parabéns! Você completou todas as fases.');
        setIsComplete(true);
      }
    } else {
      setFeedback(`Ainda não. Dica: ${currentPhase.dica}`);
    }
  };

  // Função para reiniciar o jogo
  const handleReset = () => {
    setStep(0);
    setFeedback('');
    setIsComplete(false);
  };

  const currentPhase = phases[step];
  const shuffledOptions = shuffle(currentPhase.opcoes);

  return (
    <section className="card">
      <h1>Robótica Educacional</h1>
      <div className="muted">Fase {step + 1} de {phases.length}</div>
      
      <p className="muted">{currentPhase.situacao}</p>
      <p><strong>{currentPhase.pergunta}</strong></p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            className="button"
            onClick={() => handleAnswer(option)}
            disabled={isComplete}
          >
            {option}
          </button>
        ))}
      </div>
      
      {feedback && (
        <div 
          className="muted" 
          style={{ 
            marginTop: '10px',
            color: feedback.includes('Correto') || feedback.includes('Parabéns') ? 'var(--ok)' : 'var(--warning)'
          }}
        >
          {feedback}
        </div>
      )}
      
      <div className="tip" style={{ marginTop: '12px' }}>
        <div>💡 Pense na relação entre sensores (entrada) e atuadores (saída)</div>
      </div>
      
      <div style={{ marginTop: '14px' }}>
        <label htmlFor="robotica-reflexao">Reflexão (MAPEAR):</label>
        <textarea 
          id="robotica-reflexao" 
          className="input" 
          rows={3} 
          placeholder="Como sua decisão usa sensores e atuadores?"
          style={{ marginTop: '8px' }}
        />
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button className="button secondary">Salvar reflexão</button>
          {isComplete && (
            <button className="button" onClick={handleReset}>
              Jogar novamente
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Robotica;