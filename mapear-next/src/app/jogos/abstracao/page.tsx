'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useStorage } from '@/context/StorageContext'
import { mountTip, TipLevel } from '@/lib/tipEngine'

interface Item {
  id: string
  label: string
  relevant: boolean
}

interface Phase {
  prompt: string
  items: Item[]
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function AbstracaoPage() {
  const gameKey = 'abstracao' as const
  const storage = useStorage()

  const phases: Phase[] = useMemo(
    () => [
      {
        prompt:
          'Marque apenas as informações relevantes para responder: <em>"A prefeitura se preparou para o evento?"</em>',
        items: [
          { id: 'pessoas', label: 'O show da banda atraiu 10 mil pessoas.', relevant: false },
          { id: 'prep', label: 'A prefeitura investiu em segurança e limpeza.', relevant: true },
          { id: 'roupa', label: 'O vocalista é de esquerda.', relevant: false },
          { id: 'guardas', label: 'Houve 50 guardas presentes.', relevant: true },
        ],
      },
      {
        prompt: 'Marque o essencial para decidir se há <em>alerta climático</em> válido para hoje.',
        items: [
          { id: 'chuva', label: 'Previsão de chuva intensa e ventos fortes.', relevant: true },
          { id: 'foto', label: 'A foto do post mostra um arco-íris.', relevant: false },
          { id: 'alerta', label: 'Defesa Civil emitiu alerta para hoje.', relevant: true },
          { id: 'curiosidade', label: 'A cidade tem 300 anos.', relevant: false },
        ],
      },
      {
        prompt:
          'Para decidir se <em>vale a pena comprar</em>, marque apenas dados financeiros essenciais.',
        items: [
          { id: 'preco', label: 'Preço atual com desconto de 20%.', relevant: true },
          { id: 'cor', label: 'O equipamento é top de linha.', relevant: false },
          { id: 'garantia', label: 'Garantia estendida de 2 anos por R$ 150.', relevant: true },
          { id: 'embalagem', label: 'Embalagem sustentável.', relevant: false },
        ],
      },
      {
        prompt: 'Marque o essencial para decidir se há <em>risco de trânsito</em> na rota agora.',
        items: [
          { id: 'waze', label: 'Aplicativo indica congestionamento de 7 km.', relevant: true },
          { id: 'musica', label: 'Distância até o destino.', relevant: false },
          { id: 'acidente', label: 'Registro de acidente no quilômetro 25.', relevant: true },
          { id: 'paisagem', label: 'Vista bonita da serra.', relevant: false },
        ],
      },
      {
        prompt: 'Aprovação de <em>empréstimo</em>: selecione somente evidências essenciais.',
        items: [
          { id: 'renda', label: 'Renda comprovada acima do mínimo.', relevant: true },
          { id: 'likes', label: 'Número de horas trabalhadas.', relevant: false },
          { id: 'credito', label: 'Histórico de crédito sem inadimplência.', relevant: true },
          { id: 'corcartao', label: 'Quantidade de filhos.', relevant: false },
        ],
      },
      {
        prompt: 'Acesso a <em>laboratório</em>: marque requisitos essenciais.',
        items: [
          { id: 'cracha', label: 'Crachá válido com autorização.', relevant: true },
          { id: 'epi', label: 'Uso de equipamentos de proteção (EPI).', relevant: true },
          { id: 'playlist', label: 'Tipo de roupa escolhida.', relevant: false },
          { id: 'selfie', label: 'Foto bonita no crachá.', relevant: false },
        ],
      },
      {
        prompt: 'Verificar se a <em>fonte</em> é confiável: selecione apenas evidências válidas.',
        items: [
          { id: 'gov', label: 'Endereço institucional (.gov) ou DOI.', relevant: true },
          { id: 'likes2', label: 'Muitos likes e comentários.', relevant: false },
          { id: 'refs', label: 'Referências bibliográficas citadas.', relevant: true },
          { id: 'emoji', label: 'Texto escrito por uma IA.', relevant: false },
        ],
      },
      {
        prompt: 'Avaliar <em>risco de incêndio</em>: selecione dados essenciais.',
        items: [
          { id: 'umidade', label: 'Umidade do ar muito baixa.', relevant: true },
          { id: 'corcarro', label: 'Carro estacionado próximo ao local.', relevant: false },
          { id: 'feriado', label: 'Data é feriado municipal.', relevant: false },
          { id: 'temperatura', label: 'Temperatura ambiente elevada.', relevant: true },
        ],
      },
      {
        prompt: 'Triagem em <em>pronto atendimento</em>: selecione dados essenciais de urgência.',
        items: [
          { id: 'saturacao', label: 'Saturação de O2 abaixo de 90%.', relevant: true },
          { id: 'roupa2', label: 'Tipo da roupa do paciente.', relevant: false },
          { id: 'historico', label: 'Histórico de alergia a poeira.', relevant: false },
          { id: 'dor', label: 'Dor torácica intensa súbita.', relevant: true },
        ],
      },
      {
        prompt: 'Validação de <em>experimento</em>: selecione evidências metodológicas essenciais.',
        items: [
          { id: 'controle', label: 'Grupo de controle presente.', relevant: true },
          { id: 'amostra', label: 'Tamanho de amostra adequado.', relevant: true },
          { id: 'thumbnail', label: 'Propaganda do produto chamativa.', relevant: false },
          { id: 'musica3', label: 'Usuários de alta classe.', relevant: false },
        ],
      },
      {
        prompt:
          'Lista de itens: [arroz, panela, colher, cozinhar, família, mesa]. O que é essencial para a receita?',
        items: [
          { id: 'arroz', label: 'Arroz, panela e cozinhar', relevant: true },
          { id: 'arroz2', label: 'Panela, colher e cozinhar', relevant: false },
          { id: 'familia', label: 'Panela, mesa e colher', relevant: false },
          { id: 'panela', label: 'Colher, mesa e família', relevant: false },
        ],
      },
      {
        prompt: 'Uma bicicleta: [rodas, guidão, cor azul, adesivo]. Qual a abstração correta?',
        items: [
          { id: 'rodas_guidao', label: 'Rodas, selim e guidão', relevant: true },
          { id: 'estetica', label: 'Rodas, selim e adesivo', relevant: false },
          { id: 'estetica2', label: 'Cor, rodas e guidão', relevant: false },
          { id: 'adesivo', label: 'Adesivo, selim e guidão', relevant: false },
        ],
      },
      {
        prompt: 'App de banco: quais dados são essenciais no cadastro inicial?',
        items: [
          { id: 'essenciais', label: 'Nome completo, CPF, endereço, senha', relevant: true },
          { id: 'irrelevantes1', label: 'Nome completo, endereço, signo', relevant: false },
          { id: 'irrelevantes3', label: 'Nome completo, senha, estado civil', relevant: false },
          { id: 'irrelevantes2', label: 'Nome completo, foto atual, apelido', relevant: false },
        ],
      },
      {
        prompt: 'Jogo de futebol: qual abstração é correta?',
        items: [
          { id: 'nucleo', label: 'Bola, jogadores, regras', relevant: true },
          { id: 'uniforme', label: 'jogadores, estádio, placar', relevant: false },
          { id: 'uniforme2', label: 'regras, estádio, placar', relevant: false },
          { id: 'musica', label: 'Música da torcida, placar, regras', relevant: false },
        ],
      },
      {
        prompt: 'App de academia: quais dados são essenciais no cadastro?',
        items: [
          { id: 'bank_nome_cpf_senha', label: 'Nome, CPF, endereço, atestado médico', relevant: true },
          { id: 'bank_peso_altura_signo', label: 'Nome, peso, altura, signo', relevant: false },
          { id: 'bank_nome_cpf_signo', label: 'Nome, CPF, signo', relevant: false },
          { id: 'bank_cachorro', label: 'Nome, foto do perfil, endereço', relevant: false },
        ],
      },
      {
        prompt:
          'Situação: Você precisa organizar uma feira de ciências na escola. Há dezenas de detalhes (alimentação, decoração).<br><strong>Pergunta:</strong> Qual é o primeiro passo aplicando abstração?',
        items: [
          { id: 'feira_comida', label: 'Comprar comida', relevant: false },
          { id: 'feira_elementos', label: 'Identificar elementos principais do evento', relevant: true },
          { id: 'feira_idade', label: 'Listar alunos por idade', relevant: false },
          { id: 'feira_cores', label: 'Definir cores da decoração', relevant: false },
        ],
      },
      {
        prompt:
          'Situação: Um professor recebe várias redações com erros de ortografia, estilo e conteúdo.<br><strong>Pergunta:</strong> O que seria abstrair?',
        items: [
          { id: 'redacao_virgulas', label: 'Corrigir vírgulas', relevant: false },
          { id: 'redacao_ideia', label: 'Analisar ideia central', relevant: true },
          { id: 'redacao_letra', label: 'Avaliar letra bonita', relevant: false },
          { id: 'redacao_tamanho', label: 'Ver tamanho do texto', relevant: false },
        ],
      },
      {
        prompt:
          'Situação: Você vai estudar para uma prova com 200 páginas de conteúdo.<br><strong>Pergunta:</strong> Como usar abstração?',
        items: [
          { id: 'prova_todas', label: 'Ler todas as páginas', relevant: false },
          { id: 'prova_resumos', label: 'Estudar apenas títulos e resumos', relevant: true },
          { id: 'prova_paginas', label: 'Memorizar número de páginas', relevant: false },
          { id: 'prova_copiar', label: 'Copiar tudo no caderno', relevant: false },
        ],
      },
      {
        prompt:
          'Situação: Um aplicativo precisa organizar músicas por gênero, cantor e álbum.<br><strong>Pergunta:</strong> Qual abstração mais útil?',
        items: [
          { id: 'musica_cachorro', label: 'Nome do cachorro do cantor', relevant: false },
          { id: 'musica_fa', label: 'Data de nascimento do fã', relevant: false },
          { id: 'musica_genero', label: 'Gênero musical', relevant: true },
          { id: 'musica_onibus', label: 'Número do ônibus do cantor', relevant: false },
        ],
      },
      {
        prompt: 'Situação: Uma escola vai implantar energia solar.<br><strong>Pergunta:</strong> O que abstrair?',
        items: [
          { id: 'solar_cor', label: 'Cor do telhado', relevant: false },
          { id: 'solar_placas', label: 'Quantidade de placas solares', relevant: true },
          { id: 'solar_nomes', label: 'Nome dos alunos', relevant: false },
          { id: 'solar_uniformes', label: 'Formato dos uniformes', relevant: false },
        ],
      },
      {
        prompt:
          'Situação: Uma pesquisa coleta dados sobre esportes favoritos de 200 alunos.<br><strong>Pergunta:</strong> Qual abstração correta?',
        items: [
          { id: 'esportes_nomes', label: 'Nome de cada aluno', relevant: false },
          { id: 'esportes_contagem', label: 'Contar quantos gostam de cada esporte', relevant: true },
          { id: 'esportes_aniversario', label: 'Aniversário de cada aluno', relevant: false },
          { id: 'esportes_altura', label: 'Altura dos participantes', relevant: false },
        ],
      },
      {
        prompt: 'Situação: Um programador cria um jogo de corrida.<br><strong>Pergunta:</strong> Qual elemento é essencial na abstração?',
        items: [
          { id: 'corrida_cor', label: 'Cor do carro', relevant: false },
          { id: 'corrida_regras', label: 'Regras da corrida', relevant: true },
          { id: 'corrida_nomes', label: 'Nome dos jogadores', relevant: false },
          { id: 'corrida_data', label: 'Data de lançamento', relevant: false },
        ],
      },
      {
        prompt: 'Situação: Você cria uma lista de compras.<br><strong>Pergunta:</strong> O que é abstrair nesse caso?',
        items: [
          { id: 'compras_marca', label: 'Escrever a marca de cada produto', relevant: false },
          { id: 'compras_necessarios', label: 'Colocar apenas os produtos necessários', relevant: true },
          { id: 'compras_corredores', label: 'Registrar a ordem dos corredores do mercado', relevant: false },
          { id: 'compras_promocoes', label: 'Anotar promoções', relevant: false },
        ],
      },
      {
        prompt:
          'Situação: Uma equipe de robótica planeja um robô que joga futebol.<br><strong>Pergunta:</strong> Qual abstração correta?',
        items: [
          { id: 'robo_uniforme', label: 'Escolher uniforme do robô', relevant: false },
          { id: 'robo_regras', label: 'Definir regras básicas do jogo', relevant: true },
          { id: 'robo_tecnicos', label: 'Saber nome dos técnicos', relevant: false },
          { id: 'robo_cor_quadra', label: 'Escolher cor da quadra', relevant: false },
        ],
      },
      {
        prompt:
          'Situação: Você precisa estudar para três provas em uma semana.<br><strong>Pergunta:</strong> Qual abstração mais útil?',
        items: [
          { id: 'provas_priorizar', label: 'Analisar matérias que valem mais pontos', relevant: true },
          { id: 'provas_cores', label: 'Lembrar cor das capas dos cadernos', relevant: false },
          { id: 'provas_decorar', label: 'Decorar todos os textos sem prioridade', relevant: false },
          { id: 'provas_aleatorio', label: 'Estudar matérias aleatórias', relevant: false },
        ],
      },
      {
        prompt:
          'Situação: Uma professora prepara uma aula de meio ambiente.<br><strong>Pergunta:</strong> Qual abstração correta?',
        items: [
          { id: 'meioambiente_conceitos', label: 'Focar nos conceitos principais de reciclagem', relevant: true },
          { id: 'meioambiente_lei', label: 'Trazer todos os detalhes da legislação', relevant: false },
          { id: 'meioambiente_historia', label: 'Explicar toda a história do planeta', relevant: false },
          { id: 'meioambiente_lixo', label: 'Mostrar todos os tipos de lixo existentes', relevant: false },
        ],
      },
      {
        prompt: 'Situação: Um app mostra previsão do tempo.<br><strong>Pergunta:</strong> Qual abstração útil?',
        items: [
          { id: 'clima_temp_chuva', label: 'Temperatura média e chuva', relevant: true },
          { id: 'clima_nascimento', label: 'Data de nascimento do usuário', relevant: false },
          { id: 'clima_tv', label: 'Horário da TV preferida', relevant: false },
          { id: 'clima_vizinho', label: 'Nome do vizinho', relevant: false },
        ],
      },
      {
        prompt: 'Situação: Uma escola organiza transporte escolar.<br><strong>Pergunta:</strong> Qual abstração usar?',
        items: [
          { id: 'transporte_bairro', label: 'Número de alunos por bairro', relevant: true },
          { id: 'transporte_uniformes', label: 'Cor dos uniformes', relevant: false },
          { id: 'transporte_professores', label: 'Nome dos professores', relevant: false },
          { id: 'transporte_cadernos', label: 'Modelo dos cadernos', relevant: false },
        ],
      },
      {
        prompt: 'Situação: Um time de esportes vai treinar.<br><strong>Pergunta:</strong> O que abstrair?',
        items: [
          { id: 'treino_regras', label: 'Regras principais do jogo', relevant: true },
          { id: 'treino_sapato', label: 'Sapato preferido de cada jogador', relevant: false },
          { id: 'treino_comida', label: 'Comida favorita de cada atleta', relevant: false },
          { id: 'treino_arquibancadas', label: 'Cor das arquibancadas', relevant: false },
        ],
      },
      {
        prompt: 'Situação: Um app de delivery organiza pedidos.<br><strong>Pergunta:</strong> Qual abstração correta?',
        items: [
          { id: 'delivery_nomes', label: 'Nome dos entregadores', relevant: false },
          { id: 'delivery_tempo', label: 'Tempo médio de entrega', relevant: true },
          { id: 'delivery_filmes', label: 'Filmes preferidos dos clientes', relevant: false },
          { id: 'delivery_sapato', label: 'Número do sapato do entregador', relevant: false },
        ],
      },
    ],
    []
  )

  const [step, setStep] = useState(1)
  const [attempts, setAttempts] = useState(0)
  const [corrects, setCorrects] = useState(0)
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [feedback, setFeedback] = useState('')
  const [feedbackKind, setFeedbackKind] = useState<'neutral' | 'success' | 'error'>('neutral')
  const [reflection, setReflection] = useState('')
  const [finished, setFinished] = useState(false)
  const [tipText, setTipText] = useState('')
  const [tipLevel, setTipLevel] = useState<TipLevel>('Hint')

  // Alinha com mapear.html: recuperar passo inicial do estado salvo
  useEffect(() => {
    try {
      const state = storage.getCurrentState()
      if (state && state.events) {
        const lastEvent = [...state.events]
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((e: any) => e.type === 'minigame_step' && e.payload?.key === gameKey)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .sort((a: any, b: any) => (b.payload?.step || 0) - (a.payload?.step || 0))[0]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let initialStep = lastEvent ? ((lastEvent.payload as any)?.step || 0) + 1 : 1
        if (state.progress?.[gameKey]?.completed) {
          initialStep = 1
        }
        if (initialStep < 1) initialStep = 1
        if (initialStep > phases.length) initialStep = phases.length
        setStep(initialStep)
      }
    } catch (err) {
      // Se algo falhar, permanece no passo 1
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Monta dica inicial a cada fase, como em mapear.html
  useEffect(() => {
    const t = mountTip({ pillar: gameKey, level: 'Hint' })
    setTipLevel(t.level)
    setTipText(t.tip)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const current = phases[step - 1]
  const shuffledItems = useMemo(() => shuffle(current.items), [step])

  const handleToggle = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleClear = () => {
    setSelected({})
    setFeedback('')
    setFeedbackKind('neutral')
  }

  const handleCheck = async () => {
    const current = phases[step - 1]
    const isLast = step === phases.length
    const essentialIds = new Set(current.items.filter((i) => i.relevant).map((i) => i.id))
    const selectedIds = Object.keys(selected).filter((id) => selected[id])
    const ok = selectedIds.length && selectedIds.every((id) => essentialIds.has(id))
    setAttempts((a) => a + 1)
    await storage.attempt(gameKey)

    if (ok) {
      setCorrects((c) => c + 1)
      await storage.record('minigame_step', { key: gameKey, step, correct: true })
      setFeedback('Certo! Próxima questão...')
      setFeedbackKind('success')
      if (!isLast) {
        setTimeout(() => {
          setStep((s) => s + 1)
          setSelected({})
          setFeedback('')
          setFeedbackKind('neutral')
        }, 1200)
      } else {
        const finalState = storage.getCurrentState()
        const totalAttempts = finalState.progress[gameKey].attempts
        const score = Math.max(0, Math.min(10, Math.round((10 * phases.length) / Math.max(totalAttempts, 1))))
        await storage.score(gameKey, score)
        await storage.complete(gameKey)
        await storage.achieve('Separou essencial do irrelevante em fases diversas')
        await storage.record('minigame_result', { key: gameKey, attempts, corrects, correct: true })
        setFeedback('Concluído! Você selecionou as informações essenciais.')
        setFeedbackKind('success')
        setFinished(true)
      }
    } else {
      await storage.record('minigame_try', { key: gameKey, step, selection: selectedIds })
      setFeedback('Revise: foque apenas no que responde à pergunta.')
      setFeedbackKind('error')
      const t = mountTip({ pillar: gameKey, level: 'Scaffold' })
      setTipLevel(t.level)
      setTipText(t.tip)
    }
  }

  const handleSaveReflection = async () => {
    await storage.reflect(gameKey, reflection.trim())
    setFeedback('Reflexão salva.')
    setFeedbackKind('success')
  }

  return (
    <section className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(30,41,59,0.5),rgba(2,6,23,0.6))] p-4 sm:p-6 text-white shadow-md">
      <h1 className="text-2xl font-bold">Abstração</h1>
      <div className="text-gray-400">Fase {step} de {phases.length}</div>
      <p dangerouslySetInnerHTML={{ __html: current.prompt }} />
      <div className="mt-2 flex flex-col gap-2">
        {shuffledItems.map((item) => (
          <label key={item.id} className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={!!selected[item.id]}
              onChange={() => handleToggle(item.id)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex gap-3">
        <button
          className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white border border-white/20 hover:bg-blue-500/10"
          onClick={handleCheck}
        >
          Verificar
        </button>
        <button
          className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white border border-white/20 hover:bg-slate-500/10"
          onClick={handleClear}
        >
          Limpar
        </button>
      </div>
      <div
        className={`mt-3 ${feedbackKind === 'success' ? 'text-green-500' : feedbackKind === 'error' ? 'text-yellow-400' : 'text-gray-400'}`}
      >
        {feedback}
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-lg border-l-4 border-blue-500/60 bg-blue-500/10 p-3">
        <span className="inline-block rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">{tipLevel}</span>
        <span>{tipText}</span>
      </div>
      <div className="mt-4">
        <label htmlFor="ab-reflexao">Reflexão (MAPEAR):</label>
        <textarea
          id="ab-reflexao"
          className="mt-2 w-full rounded-md border border-white/20 bg-gray-900/40 px-3 py-2 text-white placeholder-gray-400"
          rows={3}
          placeholder="Quais dados descartou e por quê?"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
        <div className="mt-3 flex gap-3">
          <button
            className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-white border border-white/20 hover:bg-blue-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleSaveReflection}
            disabled={!finished}
          >
            Salvar reflexão
          </button>
          {finished && (
            <Link
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md bg-[linear-gradient(135deg,#06b6d4,#22d3ee_50%,#0ea5e9)] hover:brightness-110"
              href="/jogos/decomposicao"
            >
              Próximo: Decomposição
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}