'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useStorage } from '@/context/StorageContext'
import type { GameEvent } from '@/context/StorageContext'
import { mountTip, TipLevel } from '@/lib/tipEngine'
import { Fragment } from 'react';

interface PhasePassos {
  tipo: 'passos'
  titulo: string
  instrucao: string
  passos: string[]
  esperado: string[]
  dica?: string
}

interface PhaseCategorias {
  tipo: 'categorias'
  titulo: string
  instrucao: string
  itens: { id: string; label: string; cat: string }[]
  esperado: Record<string, string[]>
  dica?: string
}

type Phase = PhasePassos | PhaseCategorias

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function DecomposicaoPage() {
  const gameKey = 'decomposicao' as const
  const storage = useStorage()
  const SUCCESS_ADVANCE_DELAY = 2000 // ms de atraso ao acertar antes de avançar

  const phases: Phase[] = useMemo(
    () => [
      {
        tipo: 'categorias',
        titulo: 'Arrumar o quarto',
        instrucao: 'Separe itens por categoria: escola vs outros.',
        itens: [
          { id: 'livro', label: 'Livros', cat: 'estudo' },
          { id: 'caderno', label: 'Cadernos', cat: 'estudo' },
          { id: 'caneta', label: 'Caneta', cat: 'estudo' },
          { id: 'lapis', label: 'Lapis', cat: 'estudo' },
          { id: 'bola', label: 'Bola', cat: 'outros' },
          { id: 'urso', label: 'Ursinho', cat: 'outros' },
        ],
        esperado: { estudo: ['livro', 'caderno', 'lapis', 'caneta'], outros: ['bola', 'urso'] } as Record<string, string[]>,
        dica: 'Pense em grupos naturais: materiais escolares vs. lazer.',
      },
      {
        tipo: 'passos',
        titulo: 'Preparar o lanche',
        instrucao: 'Ordene as etapas.',
        passos: ['Lavar fruta', 'Cortar', 'Guardar na lancheira', 'Levar', 'Escolher fruta'],
        esperado: ['Escolher fruta', 'Lavar fruta', 'Cortar', 'Guardar na lancheira', 'Levar'],
        dica: 'Sequencie do preparo ao transporte.',
      },
      {
        tipo: 'passos',
        titulo: 'Tomar banho',
        instrucao: 'Clique na ordem correta.',
        passos: ['Ligar chuveiro', 'Molhar', 'Ensaboar', 'Enxaguar', 'Secar'],
        esperado: ['Ligar chuveiro', 'Molhar', 'Ensaboar', 'Enxaguar', 'Secar'],
        dica: 'Do início ao fim, sem pular etapas.',
      },
      {
        tipo: 'categorias',
        titulo: 'Organizar o quarto',
        instrucao: 'Separe por áreas.',
        itens: [
          { id: 'travesseiro', label: 'Travesseiro', cat: 'cama' },
          { id: 'lapiseira', label: 'Lapiseira', cat: 'mesa' },
          { id: 'caderno', label: 'Caderno', cat: 'mesa' },
          { id: 'camiseta', label: 'Camiseta', cat: 'guarda-roupa' },
          { id: 'lencol', label: 'Lençol', cat: 'cama' },
          { id: 'sapato', label: 'Sapato', cat: 'guarda-roupa' },
        ],
        esperado: { cama: ['travesseiro', 'lencol'], mesa: ['lapiseira', 'caderno'], 'guarda-roupa': ['camiseta', 'sapato'] } as Record<string, string[]>,
        dica: 'Áreas físicas ajudam a decompor.',
      },
      {
        tipo: 'passos',
        titulo: 'Fazer um sanduíche',
        instrucao: 'Ordene a montagem.',
        passos: ['Abrir pão', 'Passar manteiga', 'Colocar queijo', 'Colocar salada', 'Fechar pão'],
        esperado: ['Abrir pão', 'Passar manteiga', 'Colocar queijo', 'Colocar salada', 'Fechar pão'],
        dica: 'Monte em camadas lógicas.',
      },
      {
        tipo: 'categorias',
        titulo: 'Brincadeira da festa',
        instrucao: 'Separe tarefas em comida, decoração e música.',
        itens: [
          { id: 'doces', label: 'Doces', cat: 'comida' },
          { id: 'baloes', label: 'Balões', cat: 'decoração' },
          { id: 'painel', label: 'Painel do tema', cat: 'decoração' },
          { id: 'bolo', label: 'Bolo', cat: 'comida' },
          { id: 'playlist', label: 'Organizar Playlist', cat: 'música' },
          { id: 'caixa', label: 'Caixa de Som', cat: 'música' },
          { id: 'salgados', label: 'Salgados', cat: 'comida' },
        ],
        esperado: { comida: ['doces', 'salgados', 'bolo'], 'decoração': ['baloes', 'painel'], 'música': ['playlist', 'caixa'] } as Record<string, string[]>,
        dica: 'Categorias são subproblemas.',
      },
      {
        tipo: 'passos',
        titulo: 'Somar 235 + 478',
        instrucao: 'Decomponha em centenas, dezenas e unidades.',
        passos: ['Somar unidades (5+8)', 'Somar dezenas (3+7 + vai-um)', 'Somar centenas (2+4 + vai-um)'],
        esperado: ['Somar unidades (5+8)', 'Somar dezenas (3+7 + vai-um)', 'Somar centenas (2+4 + vai-um)'],
        dica: 'Comece pelas partes menores.',
      },
      {
        tipo: 'categorias',
        titulo: 'Planejar estudos da semana',
        instrucao: 'Distribua matérias por dias.',
        itens: [
          { id: 'mat_seg', label: 'Matemática (Seg)', cat: 'seg' },
          { id: 'port_ter', label: 'Português (Ter)', cat: 'ter' },
          { id: 'qui_qua', label: 'Química (Qua)', cat: 'qua' },
          { id: 'inf_qui', label: 'Informática (Qui)', cat: 'qui' },
          { id: 'his_sex', label: 'História (Sex)', cat: 'sex' },
        ],
        esperado: { seg: ['mat_seg'], ter: ['port_ter'], qua: ['qui_qua'], qui: ['inf_qui'], sex: ['his_sex'] } as Record<string, string[]>,
        dica: 'Fatia por tempo ajuda a executar.',
      },
      {
        tipo: 'passos',
        titulo: 'Escrever um trabalho escolar',
        instrucao: 'Ordene partes do texto.',
        passos: ['Introdução', 'Justificativa', 'Desenvolvimento', 'Referências', 'Conclusão'],
        esperado: ['Introdução', 'Justificativa', 'Desenvolvimento', 'Conclusão', 'Referências'],
        dica: 'Estrutura clássica de textos acadêmicos.',
      },
      {
        tipo: 'categorias',
        titulo: 'Classificação',
        instrucao: 'Classifique os animais:',
        itens: [
          { id: 'peixe', label: 'Baiacu', cat: 'peixes' },
          { id: 'tubarao', label: 'Tubarão', cat: 'peixes' },
          { id: 'cavalo', label: 'Cavalo-Marinho', cat: 'peixes' },
          { id: 'sala', label: 'Salamandra', cat: 'anfibios' },
          { id: 'sapo', label: 'Sapo', cat: 'anfibios' },
          { id: 'lagarto', label: 'Lagarto', cat: 'repteis' },
          { id: 'cobra', label: 'Cobra', cat: 'repteis' },
          { id: 'bemtevi', label: 'Bem-te-vi', cat: 'aves' },
          { id: 'beijaflor', label: 'Beija-flor', cat: 'aves' },
          { id: 'baleia', label: 'Baleia', cat: 'mamiferos' },
          { id: 'cao', label: 'Cão', cat: 'mamiferos' },
          { id: 'oni', label: 'Onitorrinco', cat: 'mamiferos' },
        ],
        esperado: { peixes: ['peixe', 'tubarao', 'cavalo'], anfibios: ['sala', 'sapo'], repteis: ['lagarto', 'cobra'], aves: ['beijaflor', 'bemtevi'], mamiferos: ['baleia', 'cao', 'oni'] } as Record<string, string[]>,
        dica: 'Que perguntas você precisa responder?',
      },
      {
        tipo: 'categorias',
        titulo: 'Classificação',
        instrucao: 'Classifique os animais por habitat: ',
        itens: [
          { id: 'peixe', label: 'Peixe', cat: 'agua' },
          { id: 'baleia', label: 'Baleia', cat: 'agua' },
          { id: 'golfinho', label: 'Golfinho', cat: 'agua' },
          { id: 'jacare', label: 'Jacaré', cat: 'agua' },
          { id: 'picapau', label: 'Pica-pau', cat: 'ar' },
          { id: 'bemtevi', label: 'Bem-te-vi', cat: 'ar' },
          { id: 'beijaflor', label: 'Beija-flor', cat: 'ar' },
          { id: 'leao', label: 'Leão', cat: 'terra' },
          { id: 'elefante', label: 'Elefante', cat: 'terra' },
          { id: 'girafa', label: 'Girafa', cat: 'terra' },
        ],
        esperado: { agua: ['peixe', 'baleia', 'golfinho', 'jacare'], ar: ['picapau', 'beijaflor', 'bemtevi'], terra: ['leao', 'elefante', 'girafa'] } as Record<string, string[]>,
        dica: 'Que perguntas você precisa responder?',
      },
      {
        tipo: 'passos',
        titulo: 'Resolver problema de matemática',
        instrucao: 'Ordene as etapas.',
        passos: ['Identificar dados', 'Escolher operação', 'Calcular', 'Verificar resultado'],
        esperado: ['Identificar dados', 'Escolher operação', 'Calcular', 'Verificar resultado'],
        dica: 'Defina o plano antes de calcular.',
      },
      {
        tipo: 'categorias',
        titulo: 'Classificação',
        instrucao: 'Classifique os meios de transporte:',
        itens: [
          { id: 'bici', label: 'Bicicleta', cat: 'terrestre' },
          { id: 'carro', label: 'Carro', cat: 'terrestre' },
          { id: 'moto', label: 'Moto', cat: 'terrestre' },
          { id: 'cami', label: 'Caminhão', cat: 'terrestre' },
          { id: 'aviao', label: 'Avião', cat: 'aereo' },
          { id: 'asa', label: 'Asa-Delta', cat: 'aereo' },
          { id: 'balao', label: 'Balão de Ar-quente', cat: 'aereo' },
          { id: 'para', label: 'Parapente', cat: 'aereo' },
          { id: 'navio', label: 'Navio', cat: 'aquatico' },
          { id: 'jet', label: 'Jet Ski', cat: 'aquatico' },
          { id: 'lancha', label: 'Lancha', cat: 'aquatico' },
          { id: 'iate', label: 'Iate', cat: 'aquatico' },
        ],
        esperado: { terrestres: ['bici', 'carro', 'moto', 'cami'], aereo: ['aviao', 'asa', 'balao', 'para'], aquatico: ['navio', 'jet', 'iate', 'lancha'] } as Record<string, string[]>,
        dica: 'Que perguntas você precisa responder?',
      },
      {
        tipo: 'passos',
        titulo: 'Labirinto pequeno',
        instrucao: 'Decomponha em passos de movimento.',
        passos: ['Esquerda', 'Frente', 'Direita', 'Frente'],
        esperado: ['Esquerda', 'Frente', 'Direita', 'Frente'],
        dica: 'Passos atômicos formam o caminho.',
      },
      {
        tipo: 'categorias',
        titulo: 'Sequência de números',
        instrucao: 'Separe em padrões menores.',
        itens: [
          { id: '2', label: '2', cat: 'pares' },
          { id: '32', label: '32', cat: 'pares' },
          { id: '176', label: '176', cat: 'pares' },
          { id: '234', label: '234', cat: 'pares' },
          { id: '18574', label: '18574', cat: 'pares' },
          { id: '248', label: '248', cat: 'pares' },
          { id: '366', label: '366', cat: 'pares' },
          { id: '3', label: '3', cat: 'impares' },
          { id: '5', label: '5', cat: 'impares' },
          { id: '11', label: '11', cat: 'impares' },
          { id: '27', label: '27', cat: 'impares' },
          { id: '143', label: '143', cat: 'impares' },
          { id: '221', label: '221', cat: 'impares' },
        ],
        esperado: { pares: ['2', '32', '176', '234', '18574', '366', '248'], impares: ['3', '5', '11', '27', '143', '221'] } as Record<string, string[]>,
        dica: 'Divida por propriedade comum.',
      },
      {
        tipo: 'passos',
        titulo: 'Algoritmo lavar roupa',
        instrucao: 'Ordem das etapas.',
        passos: ['Molhar', 'Sabão', 'Esfregar', 'Enxaguar', 'Secar'],
        esperado: ['Molhar', 'Sabão', 'Esfregar', 'Enxaguar', 'Secar'],
        dica: 'Fluxo linear.',
      },
      {
        tipo: 'passos',
        titulo: 'Escovar dentes',
        instrucao: 'Defina a sequência.',
        passos: ['Passar pasta', 'Escovar língua', 'Escovar dentes', 'Enxaguar', 'Pegar escova'],
        esperado: ['Pegar escova', 'Passar pasta', 'Escovar dentes', 'Escovar língua', 'Enxaguar'],
        dica: 'Do preparo à finalização.',
      },
      {
        tipo: 'categorias',
        titulo: 'Itens para fazer bolo',
        instrucao: 'Separe em ingredientes e utensílios.',
        itens: [
          { id: 'farinha', label: 'Farinha', cat: 'ingredientes' },
          { id: 'acucar', label: 'Açúcar', cat: 'ingredientes' },
          { id: 'ovos', label: 'Ovos', cat: 'ingredientes' },
          { id: 'manteiga', label: 'Manteiga', cat: 'ingredientes' },
          { id: 'tigela', label: 'Tigela', cat: 'utensilios' },
          { id: 'fouet', label: 'Batedor (fouet)', cat: 'utensilios' },
          { id: 'forma', label: 'Forma', cat: 'utensilios' },
        ],
        esperado: { ingredientes: ['farinha', 'acucar', 'ovos', 'manteiga'], utensilios: ['tigela', 'fouet', 'forma'] } as Record<string, string[]>,
        dica: 'Separe o que é consumido do que é usado para preparar.',
      },
      {
        tipo: 'passos',
        titulo: 'Montar uma barraca',
        instrucao: 'Ordene as etapas de montagem.',
        passos: ['Escolher local', 'Abrir estrutura', 'Fixar estacas', 'Esticar lonas', 'Conferir tencionamento'],
        esperado: ['Escolher local', 'Abrir estrutura', 'Fixar estacas', 'Esticar lonas', 'Conferir tencionamento'],
        dica: 'Do planejamento à verificação final.',
      },
      {
        tipo: 'categorias',
        titulo: 'Roupa para o clima',
        instrucao: 'Classifique as roupas por frio, calor ou chuva.',
        itens: [
          { id: 'casaco', label: 'Casaco', cat: 'frio' },
          { id: 'luvas', label: 'Luvas', cat: 'frio' },
          { id: 'gorro', label: 'Gorro', cat: 'frio' },
          { id: 'regata', label: 'Regata', cat: 'calor' },
          { id: 'shorts', label: 'Shorts', cat: 'calor' },
          { id: 'chinelo', label: 'Chinelo', cat: 'calor' },
          { id: 'guarda_chuva', label: 'Guarda-chuva', cat: 'chuva' },
          { id: 'capa_chuva', label: 'Capa de chuva', cat: 'chuva' },
        ],
        esperado: { frio: ['casaco', 'luvas', 'gorro'], calor: ['regata', 'shorts', 'chinelo'], chuva: ['guarda_chuva', 'capa_chuva'] } as Record<string, string[]>,
        dica: 'Use a condição climática como critério.',
      },
      {
        tipo: 'passos',
        titulo: 'Reciclagem doméstica',
        instrucao: 'Ordene as ações para reciclar.',
        passos: ['Separar materiais', 'Lavar embalagens', 'Secar embalagens', 'Armazenar corretamente', 'Levar ao ponto de coleta'],
        esperado: ['Separar materiais', 'Lavar embalagens', 'Secar embalagens', 'Armazenar corretamente', 'Levar ao ponto de coleta'],
        dica: 'Limpeza antes do descarte.',
      },
      {
        tipo: 'categorias',
        titulo: 'Componentes do computador',
        instrucao: 'Classifique por função.',
        itens: [
          { id: 'teclado', label: 'Teclado', cat: 'entrada' },
          { id: 'mouse', label: 'Mouse', cat: 'entrada' },
          { id: 'microfone', label: 'Microfone', cat: 'entrada' },
          { id: 'cpu', label: 'CPU', cat: 'processamento' },
          { id: 'ram', label: 'Memória RAM', cat: 'processamento' },
          { id: 'monitor', label: 'Monitor', cat: 'saida' },
          { id: 'alto_falante', label: 'Alto-falante', cat: 'saida' },
          { id: 'hd', label: 'HD', cat: 'armazenamento' },
          { id: 'ssd', label: 'SSD', cat: 'armazenamento' },
        ],
        esperado: { entrada: ['teclado', 'mouse', 'microfone'], processamento: ['cpu', 'ram'], saida: ['monitor', 'alto_falante'], armazenamento: ['hd', 'ssd'] } as Record<string, string[]>,
        dica: 'Entrada processa e sai: E/P/S + armazenamento.',
      },
      {
        tipo: 'passos',
        titulo: 'Fazer chá',
        instrucao: 'Organize as etapas.',
        passos: ['Aquecer água', 'Colocar saquinho', 'Aguardar infusão', 'Adoçar', 'Servir'],
        esperado: ['Aquecer água', 'Colocar saquinho', 'Aguardar infusão', 'Adoçar', 'Servir'],
        dica: 'Infusão antes de servir.',
      },
      {
        tipo: 'categorias',
        titulo: 'Alimentos',
        instrucao: 'Separe em frutas e legumes.',
        itens: [
          { id: 'maca', label: 'Maçã', cat: 'frutas' },
          { id: 'banana', label: 'Banana', cat: 'frutas' },
          { id: 'pera', label: 'Pera', cat: 'frutas' },
          { id: 'cenoura', label: 'Cenoura', cat: 'legumes' },
          { id: 'batata', label: 'Batata', cat: 'legumes' },
          { id: 'tomate', label: 'Tomate', cat: 'legumes' },
        ],
        esperado: { frutas: ['maca', 'banana', 'pera'], legumes: ['cenoura', 'batata', 'tomate'] } as Record<string, string[]>,
        dica: 'Pense em grupos alimentares simples.',
      },
      {
        tipo: 'passos',
        titulo: 'Publicar um trabalho',
        instrucao: 'Defina a ordem do processo.',
        passos: ['Escrever rascunho', 'Revisar texto', 'Formatar documento', 'Exportar PDF', 'Enviar'],
        esperado: ['Escrever rascunho', 'Revisar texto', 'Formatar documento', 'Exportar PDF', 'Enviar'],
        dica: 'Do conteúdo ao envio.',
      },
      {
        tipo: 'categorias',
        titulo: 'Formas geométricas',
        instrucao: 'Classifique por tipo.',
        itens: [
          { id: 'triangulo', label: 'Triângulo', cat: 'triangulos' },
          { id: 'quadrado', label: 'Quadrado', cat: 'quadrilateros' },
          { id: 'retangulo', label: 'Retângulo', cat: 'quadrilateros' },
          { id: 'circulo', label: 'Círculo', cat: 'circulos' },
          { id: 'trapezio', label: 'Trapézio', cat: 'quadrilateros' },
        ],
        esperado: { triangulos: ['triangulo'], quadrilateros: ['quadrado', 'retangulo', 'trapezio'], circulos: ['circulo'] } as Record<string, string[]>,
        dica: 'Agrupe por propriedades de lados e ângulos.',
      },
      {
        tipo: 'passos',
        titulo: 'Viajar de ônibus',
        instrucao: 'Organize a preparação e o percurso.',
        passos: ['Comprar passagem', 'Arrumar mala', 'Chegar à rodoviária', 'Embarcar', 'Desembarcar'],
        esperado: ['Comprar passagem', 'Arrumar mala', 'Chegar à rodoviária', 'Embarcar', 'Desembarcar'],
        dica: 'Prepare antes de sair.',
      },
      {
        tipo: 'categorias',
        titulo: 'Tempos verbais',
        instrucao: 'Classifique as formas verbais.',
        itens: [
          { id: 'fui', label: 'fui', cat: 'passado' },
          { id: 'comi', label: 'comi', cat: 'passado' },
          { id: 'vou', label: 'vou', cat: 'presente' },
          { id: 'como', label: 'como', cat: 'presente' },
          { id: 'irei', label: 'irei', cat: 'futuro' },
          { id: 'comerei', label: 'comerei', cat: 'futuro' },
        ],
        esperado: { passado: ['fui', 'comi'], presente: ['vou', 'como'], futuro: ['irei', 'comerei'] } as Record<string, string[]>,
        dica: 'Tempo verbal indica quando a ação ocorre.',
      },
      {
        tipo: 'passos',
        titulo: 'Configurar Wi‑Fi',
        instrucao: 'Ordene as etapas de configuração.',
        passos: ['Ligar roteador', 'Acessar painel', 'Configurar senha', 'Salvar alterações', 'Conectar-se'],
        esperado: ['Ligar roteador', 'Acessar painel', 'Configurar senha', 'Salvar alterações', 'Conectar-se'],
        dica: 'Ajuste antes de conectar.',
      },
      {
        tipo: 'categorias',
        titulo: 'Tarefas da casa',
        instrucao: 'Classifique as tarefas por cômodo.',
        itens: [
          { id: 'lavar_pratos', label: 'Lavar pratos', cat: 'cozinha' },
          { id: 'guardar_louca', label: 'Guardar louça', cat: 'cozinha' },
          { id: 'varrer_sala', label: 'Varrer sala', cat: 'sala' },
          { id: 'passar_pano', label: 'Passar pano', cat: 'sala' },
          { id: 'limpar_box', label: 'Limpar box', cat: 'banheiro' },
          { id: 'higienizar_vaso', label: 'Higienizar vaso', cat: 'banheiro' },
        ],
        esperado: { cozinha: ['lavar_pratos', 'guardar_louca'], sala: ['varrer_sala', 'passar_pano'], banheiro: ['limpar_box', 'higienizar_vaso'] } as Record<string, string[]>,
        dica: 'Separe por local de execução.',
      },
    ],
    []
  )

  const [step, setStep] = useState(1)
  const [attempts, setAttempts] = useState(0)
  const [corrects, setCorrects] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [feedbackTone, setFeedbackTone] = useState<'success' | 'error' | 'info'>('info')
  const [reflection, setReflection] = useState('')
  const [finished, setFinished] = useState(false)
  const [tipText, setTipText] = useState('')
  const [tipLevel, setTipLevel] = useState<TipLevel>('Hint')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    // Garante que o storage já foi carregado
    if (storage) {
      const state = storage.getCurrentState()
      const gameProgress = state.progress[gameKey]

      if (gameProgress) {
        // 1. Verifica se o jogo já foi concluído
        if (gameProgress.completed) {
          setFinished(true)
          setStep(phases.length) // Coloca na última fase
          setFeedback('Você já concluiu este desafio!')
          return // Para a execução
        }

        // 2. Se não foi concluído, encontra o último passo correto
        // Usa os eventos persistidos no estado (StorageContext)
        const allEvents = state.events
        
        // Filtra todos os eventos para achar os de "minigame_step"
        // que sejam deste jogo (gameKey) e que foram corretos (correct: true)
        const correctSteps = allEvents
          .filter((e: GameEvent) => {
            const p = e.payload as { key?: string; correct?: boolean; step?: number } | undefined
            return (
              e.type === 'minigame_step' &&
              p?.key === gameKey &&
              p?.correct === true &&
              typeof p?.step === 'number'
            )
          })
          .map((e: GameEvent) => (e.payload as { step: number }).step)

        if (correctSteps.length > 0) {
          // Encontra o maior passo completado
          const lastCompletedStep = Math.max(...correctSteps)
          
          if (lastCompletedStep < phases.length) {
            // Começa o jogo no passo SEGUINTE ao último completado
            setStep(lastCompletedStep + 1)
          } else {
            // Caso raro: completou todos os passos mas não marcou como "completed"
            setFinished(true)
            setStep(phases.length)
          }
        }
        // Se correctSteps.length === 0, ele vai manter o useState(1), que está correto.
      }
    }
  }, [storage, gameKey, phases.length])

  useEffect(() => {
    const tip = mountTip({ pillar: gameKey, level: 'Hint' })
    setTipLevel(tip.level)
    setTipText(tip.tip)
  }, [step])

  const current = phases[step - 1]
  const [currentSelection, setCurrentSelection] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const initialPlaced = useMemo(() => {
    if (current.tipo === 'categorias') {
      const keys = Object.keys(current.esperado)
      const obj: Record<string, string[]> = {}
      keys.forEach((k) => (obj[k] = []))
      return obj
    }
    return {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])
  const [currentPlaced, setCurrentPlaced] = useState<Record<string, string[]>>(initialPlaced)

  // Ids já alocados em alguma categoria (usado para ocultar da lista "Itens")
  const placedIds = useMemo(() => {
    const s = new Set<string>()
    Object.keys(current.esperado || {}).forEach((cat) => {
      (currentPlaced[cat] || []).forEach((id) => s.add(id))
    })
    return s
  }, [currentPlaced, current])

  // Reiniciar estado da fase
  const resetPhaseState = () => {
    setCurrentSelection([])
    setSelectedItem(null)
    setCurrentPlaced(initialPlaced)
    setFeedback('')
    setFeedbackTone('info')
    setProcessing(false)
  }

  const handleClickPasso = (p: string) => {
    setCurrentSelection((prev) => (prev.includes(p) ? prev : [...prev, p]))
  }

  const handleSelectItem = (id: string) => {
    setSelectedItem(id)
  }

  // Descobre em qual categoria o item já está colocado
  const findItemCat = (id: string): string | null => {
    const catsKeys = Object.keys(currentPlaced || {})
    for (const c of catsKeys) {
      if ((currentPlaced[c] || []).includes(id)) return c
    }
    return null
  }

  const handlePlaceOnCat = (cat: string) => {
    if (!selectedItem || current.tipo !== 'categorias') return
    const id = selectedItem
    const currentCat = findItemCat(id)
    if (currentCat === cat) {
      // Já está nesta categoria; nada a fazer
      return
    }
    setCurrentPlaced((prev) => {
      const next = { ...prev }
      // Se o item já está em outra categoria, remove de lá
      if (currentCat && next[currentCat]) {
        next[currentCat] = next[currentCat].filter((x) => x !== id)
      }
      // Adiciona na nova categoria
      next[cat] = [...(next[cat] || []), id]
      return next
    })
    setSelectedItem(null)
  }

  const cats = current.tipo === 'categorias' ? Object.keys(current.esperado) : []

  const handleCheck = async () => {
    if (processing) return
    setProcessing(true)
    setAttempts((a) => a + 1)
    await storage.attempt(gameKey)

    let ok = false
    if (current.tipo === 'passos') {
      const expected = current.esperado
      ok = currentSelection.length === expected.length && currentSelection.every((v, i) => v === expected[i])
    } else {
      const expected = current.esperado
      ok = Object.keys(expected).every((cat) => {
        const exp = [...expected[cat]].sort().join(',')
        const got = [...(currentPlaced[cat] || [])].sort().join(',')
        return exp === got
      })
    }

    if (ok) {
      setCorrects((c) => c + 1)
      if (step < phases.length) {
        setFeedbackTone('success')
        setFeedback('Certo! Próxima fase...')
        // Aguarda o delay e só então grava o evento e deixa o efeito avançar
        setTimeout(async () => {
          await storage.record('minigame_step', { key: gameKey, step, correct: true })
          resetPhaseState()
          setProcessing(false)
        }, SUCCESS_ADVANCE_DELAY)
      } else {
        // Última fase: conclui após o delay
        setFeedbackTone('success')
        setFeedback('Concluído! Você decompôs vários desafios.')
        setTimeout(async () => {
          await storage.record('minigame_step', { key: gameKey, step, correct: true })
          const finalState = storage.getCurrentState()
          const totalAttempts = finalState.progress[gameKey].attempts
          const score = Math.max(0, Math.min(10, Math.round((10 * phases.length) / Math.max(totalAttempts, 1))))
          await storage.score(gameKey, score)
          await storage.complete(gameKey)
          await storage.achieve('Decompôs problemas em partes manejáveis')
          await storage.record('minigame_result', { key: gameKey, attempts, corrects, correct: true })
          setFinished(true)
          setProcessing(false)
        }, SUCCESS_ADVANCE_DELAY)
      }
    } else {
      await storage.record('minigame_try', { key: gameKey, step })
      setFeedbackTone('error')
      setFeedback('Ainda não. Reiniciando a fase...')
      const tip = mountTip({ pillar: gameKey, level: 'Scaffold' })
      setTipLevel(tip.level)
      setTipText(tip.tip)
      setTimeout(() => {
        resetPhaseState()
        setProcessing(false)
      }, 1000)
    }
  }

  const handleSaveReflection = async () => {
    await storage.reflect(gameKey, reflection.trim())
    setFeedback('Reflexão salva.')
  }

  return (
    <section className="rounded-xl border border-white/10 bg-[#0b1220] p-6 shadow-xl shadow-black/40">
      <h1 className="text-2xl font-semibold">Decomposição</h1>
      <div className="text-gray-400">Fase {step} de {phases.length}</div>
      <p className="mt-1">{current.instrucao}</p>

      {/* Área para passos */}
      {current.tipo === 'passos' && (
        <div>
          <div className="text-gray-400 mb-2">{current.titulo}</div>
          <div className="flex gap-2 flex-wrap">
            {shuffle(current.passos).map((p) => {
              const pos = currentSelection.indexOf(p) + 1
              const isSelected = pos > 0
              return (
                <button
                  key={p}
                  className={
                    isSelected
                      ? 'inline-flex items-center justify-center px-3 py-2 rounded-lg border border-green-500/40 bg-green-600/20 text-white'
                      : 'inline-flex items-center justify-center px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-blue-500/10 transition'
                  }
                  onClick={() => handleClickPasso(p)}
                  disabled={isSelected}
                  aria-label={isSelected ? `${p} escolhido como ${pos}º` : `Escolher ${p}`}
                >
                  <span>{p}</span>
                  {isSelected && (
                    <span className="ml-2 inline-flex items-center justify-center text-xs font-medium px-1.5 py-0.5 rounded bg-green-500/30 text-white border border-green-500/40">
                      {pos}º
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Sequência selecionada com setas e placeholders */}
          <div className="mt-3">
            <div className="text-sm text-gray-400 mb-1">Sequência</div>
            <div className="flex items-center flex-wrap gap-2">
              {currentSelection.map((s, idx) => (
                <>
                  <span
                    key={`sel-${s}-${idx}`}
                    className="inline-block px-2 py-1 text-sm text-gray-200 bg-[#0b1220] rounded border border-white/20"
                  >
                    {idx + 1}º: {s}
                  </span>
                  {idx < (current.esperado?.length ?? 0) - 1 && (
                    <span className="text-gray-500">→</span>
                  )}
                </>
              ))}
              {Array.from({
                length: Math.max(0, (current.esperado?.length ?? 0) - currentSelection.length),
              }).map((_, i) => (
                <Fragment key={`ph-${i}`}>
                    <span
                        className="inline-block px-2 py-1 text-sm rounded border border-white/20 border-dashed text-gray-400"
                    >
                        {/* conteúdo do placeholder */}
                    </span>
                </Fragment>
            ))}
            </div>
          </div>
        </div>
      )}

      {/* Área para categorias */}
      {current.tipo === 'categorias' && (
        <div>
          <div className="text-gray-400 mb-2">{current.titulo}</div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 items-start">
            <div className="rounded-xl border border-white/10 bg-[#0b1220] p-4 sm:col-span-2 md:col-span-2">
              <h3 className="font-semibold">Itens</h3>
              <div className="flex gap-1.5 flex-wrap mt-1.5">
                {shuffle(current.itens.filter((it) => !placedIds.has(it.id))).map((it) => (
                  <button
                    key={it.id}
                    className={selectedItem === it.id
                      ? 'px-3 py-2 rounded-lg border border-green-500/40 bg-green-600/20 text-white'
                      : 'px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-blue-500/10 transition'}
                    onClick={() => handleSelectItem(it.id)}
                  >
                    {it.label}
                  </button>
                ))}
              </div>
            </div>
            {cats.map((cat) => (
              <div
                key={cat}
                className="rounded-xl border border-white/10 bg-[#0b1220] p-4 cursor-pointer min-h-[140px] flex flex-col"
                onClick={() => handlePlaceOnCat(cat)}
              >
                <h3 className="font-semibold">{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
                <div className="flex flex-wrap gap-2 mt-1.5 min-h-[64px]">
                  {(currentPlaced[cat] || []).map((id) => {
                    const label = current.itens.find((x) => x.id === id)?.label || id
                    const isSelected = selectedItem === id
                    return (
                      <button
                        key={`${cat}-${id}`}
                        type="button"
                        className={
                          isSelected
                            ? 'inline-block px-2 py-1 text-sm text-white rounded border border-green-500/40 bg-green-600/30'
                            : 'inline-block px-2 py-1 text-sm text-gray-200 bg-[#0b1220] rounded border border-white/20 hover:bg-blue-500/10 transition'
                        }
                        onClick={() => setSelectedItem(id)}
                        aria-label={isSelected ? `${label} selecionado para mover` : `Selecionar ${label} para mover`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-2">
      <button
          className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-blue-500/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCheck}
          disabled={processing}
        >
          Verificar
        </button>
        <button
          className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-blue-500/10 transition"
          onClick={resetPhaseState}
        >
          Refazer
        </button>
      </div>
      <div className={
        feedbackTone === 'success'
          ? 'text-green-400 mt-2'
          : feedbackTone === 'error'
          ? 'text-red-400 mt-2'
          : 'text-gray-400 mt-2'
      }>{feedback}</div>
      <div className="mt-3 rounded-lg border-l-4 border-blue-500/60 bg-blue-500/10 p-3">
        <div>
          <span className="inline-block text-xs font-semibold bg-blue-500 text-white rounded px-2 py-0.5 mr-2">{tipLevel}</span>
          <span className="text-gray-200">{tipText}</span>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="dec-reflexao" className="block font-medium text-gray-200">Reflexão (MAPEAR):</label>
        <textarea
          id="dec-reflexao"
          className="mt-2 w-full px-3 py-2 rounded-lg border border-white/20 bg-[#0b1220] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Como você dividiu o problema? Por quê?"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
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
              href="/jogos/algoritmo"
            >
              Próximo: Algoritmos
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}