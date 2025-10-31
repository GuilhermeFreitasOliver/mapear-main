'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useStorage } from '@/context/StorageContext'
import { mountTip, TipLevel } from '@/lib/tipEngine'

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
  const [reflection, setReflection] = useState('')
  const [finished, setFinished] = useState(false)
  const [tipText, setTipText] = useState('')
  const [tipLevel, setTipLevel] = useState<TipLevel>('Hint')

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

  // Reiniciar estado da fase
  const resetPhaseState = () => {
    setCurrentSelection([])
    setSelectedItem(null)
    setCurrentPlaced(initialPlaced)
    setFeedback('')
  }

  const handleClickPasso = (p: string) => {
    setCurrentSelection((prev) => (prev.includes(p) ? prev : [...prev, p]))
  }

  const handleSelectItem = (id: string) => {
    setSelectedItem(id)
  }

  const handlePlaceOnCat = (cat: string) => {
    if (!selectedItem || current.tipo !== 'categorias') return
    const id = selectedItem
    const already = (currentPlaced[cat] || []).includes(id)
    if (already) return
    setCurrentPlaced((prev) => ({ ...prev, [cat]: [...(prev[cat] || []), id] }))
    setSelectedItem(null)
  }

  const cats = current.tipo === 'categorias' ? Object.keys(current.esperado) : []

  const handleCheck = async () => {
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
      await storage.record('minigame_step', { key: gameKey, step, correct: true })
      if (step < phases.length) {
        setFeedback('Certo! Próxima fase...')
        setTimeout(() => {
          setStep((s) => s + 1)
          resetPhaseState()
        }, 1200)
      } else {
        const finalState = storage.getCurrentState()
        const totalAttempts = finalState.progress[gameKey].attempts
        const score = Math.max(0, Math.min(10, Math.round((10 * phases.length) / Math.max(totalAttempts, 1))))
        await storage.score(gameKey, score)
        await storage.complete(gameKey)
        await storage.achieve('Decompôs problemas em partes manejáveis')
        await storage.record('minigame_result', { key: gameKey, attempts, corrects, correct: true })
        setFeedback('Concluído! Você decompôs vários desafios.')
        setFinished(true)
      }
    } else {
      await storage.record('minigame_try', { key: gameKey, step })
      setFeedback('Ainda não. Reiniciando a fase...')
      const tip = mountTip({ pillar: gameKey, level: 'Scaffold' })
      setTipLevel(tip.level)
      setTipText(tip.tip)
      setTimeout(() => resetPhaseState(), 1000)
    }
  }

  const handleSaveReflection = async () => {
    await storage.reflect(gameKey, reflection.trim())
    setFeedback('Reflexão salva.')
  }

  return (
    <section className="card">
      <h1>Decomposição</h1>
      <div className="muted">Fase {step} de {phases.length}</div>
      <p>{current.instrucao}</p>

      {/* Área para passos */}
      {current.tipo === 'passos' && (
        <div>
          <div className="muted" style={{ marginBottom: 8 }}>{current.titulo}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {shuffle(current.passos).map((p) => (
              <button key={p} className="button" onClick={() => handleClickPasso(p)}>
                {p}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {currentSelection.map((s, idx) => (
              <span key={`${s}-${idx}`} className="kbd">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Área para categorias */}
      {current.tipo === 'categorias' && (
        <div>
          <div className="muted" style={{ marginBottom: 8 }}>{current.titulo}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 }}>
            <div className="card">
              <h3>Itens</h3>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {shuffle(current.itens).map((it) => (
                  <button
                    key={it.id}
                    className={`button${selectedItem === it.id ? ' active' : ''}`}
                    onClick={() => handleSelectItem(it.id)}
                  >
                    {it.label}
                  </button>
                ))}
              </div>
            </div>
            {cats.map((cat) => (
              <div key={cat} className="card" style={{ cursor: 'pointer' }} onClick={() => handlePlaceOnCat(cat)}>
                <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6, minHeight: 20 }}>
                  {(currentPlaced[cat] || []).map((id) => {
                    const label = current.itens.find((x) => x.id === id)?.label || id
                    return (
                      <span key={`${cat}-${id}`} className="kbd">{label}</span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
        <button className="button" onClick={handleCheck}>Verificar</button>
        <button className="button secondary" onClick={resetPhaseState}>Refazer</button>
      </div>
      <div className="muted" style={{ marginTop: 10 }}>{feedback}</div>
      <div className="tip" style={{ marginTop: 12 }}>
        <div>
          <div className="badge">{tipLevel}</div>
          <div>{tipText}</div>
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <label htmlFor="dec-reflexao">Reflexão (MAPEAR):</label>
        <textarea
          id="dec-reflexao"
          className="input"
          rows={3}
          placeholder="Como você dividiu o problema? Por quê?"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button className="button secondary" onClick={handleSaveReflection} disabled={!finished}>Salvar reflexão</button>
          {finished && (
            <Link className="button" href="/jogos/algoritmo">Próximo: Algoritmos</Link>
          )}
        </div>
      </div>
    </section>
  )
}