"use client";
import { useState } from "react";
import DeckCarousel from "../../components/DeckCarousel";
import { deckData } from "./deckData";

type CourseSection = { label: string; content: string | string[] };
type CourseUnit = { title: string; sections: CourseSection[] };
type CourseModule = { id: string; title: string; hours: string; pdf: string; units: CourseUnit[] };


const courseData: CourseModule[] = [
  {
    id: "mod1",
    title: "Fundamentos do PC na Educação Básica",
    hours: "6h",
    pdf: "/Modulo_1.pdf",
    units: [
      {
        title: "Unidade 1.1 • PC e BNCC: por que e para quê (2h)",
        sections: [
          { label: "Objetivos", content: "Relacionar PC à BNCC e a práticas interdisciplinares; diferenciar PC de programação." },
          { label: "Conteúdos", content: "Conceitos; pilares do PC; transposição didática; exemplos em Línguas, Matemática, Ciências e Artes." },
          {
            label: "Atividades", content: [
              "Presencial/EAD: Mapa mental colaborativo (Jamboard/Quadro) sobre usos do PC.",
              "Desplugada: Classificação de problemas por decomposição com cartões.",
            ]
          },
          { label: "RE", content: "Diário rápido: \"Que evidências de PC já existem na minha prática?\"" },
          { label: "Avaliação", content: "Checklist de compreensão + participação no mapa mental." },
          { label: "Recursos", content: "Quadro físico/virtual, cartões, projetor, rubrica rápida." },
        ],
      },
      {
        title: "Unidade 1.2 • Pilares: decomposição, padrões, abstração, algoritmos (2h)",
        sections: [
          { label: "Objetivos", content: "Aplicar os quatro pilares em situações do cotidiano escolar." },
          {
            label: "Atividades", content: [
              "Desplugada: Algoritmo de sanduíche (instruções ambíguas vs. precisas).",
              "Digital: Fluxogramas simples (draw.io) para rotinas escolares.",
            ]
          },
          { label: "RE", content: "Reflexão guiada: onde a precisão faz diferença no meu componente curricular?" },
          { label: "Avaliação", content: "Rubrica de uso dos pilares (iniciante → proficiente)." },
        ],
      },
      {
        title: "Unidade 1.3 • Equidade e acessibilidade no PC (2h)",
        sections: [
          { label: "Objetivos", content: "Planejar experiências acessíveis e inclusivas." },
          { label: "Atividades", content: "Checklist de acessibilidade; adaptação de atividade para baixa visão e TDAH." },
          { label: "RE", content: "Matriz 2×2: impacto x esforço de adaptações." },
          { label: "Avaliação", content: "Plano de ação individual com metas SMART." },
        ],
      },
    ],
  },
  {
    id: "mod2",
    title: "Ferramentas Digitais e Atividades Desplugadas",
    hours: "8h",
    pdf: "/Modulo_2.pdf",
    units: [
      {
        title: "Unidade 2.1 • Ecossistema de ferramentas (2h)",
        sections: [
          { label: "Objetivos", content: "Selecionar ferramentas alinhadas a objetivos e infraestrutura da escola." },
          { label: "Conteúdos", content: "Blocos (Scratch), texto (Python introdutório), microcontroladores (Micro:bit), planilhas, simuladores, IA generativa com uso responsável." },
          { label: "Atividades", content: "Roteiro de curadoria: critérios, alternativas offline/baixa banda." },
          { label: "RE", content: "Canvas de decisão (custo, acessibilidade, curva de aprendizagem)." },
        ],
      },
      {
        title: "Unidade 2.2 • Atividades desplugadas de PC (3h)",
        sections: [
          { label: "Objetivos", content: "Conduzir dinâmicas desplugadas para desenvolver raciocínio algorítmico." },
          { label: "Atividades", content: "Percurso em grade, cartas \"Se/Então\", debug humano, sorting network com cordas." },
          { label: "RE", content: "Roda de conversa sobre transferência para leitura, escrita e matemática." },
        ],
      },
      {
        title: "Unidade 2.3 • Trilhas digitais guiadas (3h)",
        sections: [
          { label: "Objetivos", content: "Experimentar sequências curtas em Scratch/planilhas/Micro:bit." },
          { label: "Atividades", content: "Mini-desafios por níveis; pares programadores; \"stop & share\"." },
          { label: "RE", content: "Robótica Educacional: o que manter, adaptar, eliminar." },
        ],
      },
    ],
  },
  {
    id: "mod3",
    title: "Planejamento de Projetos com Mediação Ativa e RE",
    hours: "8h",
    pdf: "/Modulo_3.pdf",
    units: [
      {
        title: "Unidade 3.1 • MAPEAR um projeto (2h)",
        sections: [
          { label: "Objetivos", content: "Aplicar a metodologia MAPEAR para desenhar projetos interdisciplinares." },
          { label: "Conteúdos", content: "Problema-motriz; perguntas orientadoras; critérios de sucesso; produto público." },
          { label: "Atividades", content: "Canvas do projeto; definição de evidências de aprendizagem por competência." },
        ],
      },
      {
        title: "Unidade 3.2 • Mediação ativa e protocolos de sala (3h)",
        sections: [
          { label: "Objetivos", content: "Conduzir protocolos: pense-compartilhe, galerias, crítica amigável, check-ins." },
          { label: "Atividades", content: "Simulações de facilitação; plano de mediação por etapa." },
          { label: "RE", content: "Após cada simulação, registrar \"o que observei, o que faria diferente\"." },
        ],
      },
      {
        title: "Unidade 3.3 • RE — Robótica Educacional (3h)",
        sections: [
          { label: "Objetivos", content: "Planejar, montar e testar protótipos robóticos simples." },
          { label: "Atividades", content: "Aplicar princípios de segurança elétrica e mecânica. Desenvolver habilidades de resolução de problemas por meio de depuração (debugging) e iteração" },
          { label: "Produtos", content: "Protótipo funcional (carrinho/robô experimental) com esquema de ligação e lista de componentes." },
        ],
      },
    ],
  },
  {
    id: "mod4",
    title: "Estratégias de Avaliação de Competências Computacionais",
    hours: "6h",
    pdf: "/Modulo_4.pdf",
    units: [
      {
        title: "Unidade 4.1 • Matriz de competências e progressão (2h)",
        sections: [
          { label: "Objetivos", content: "Construir uma matriz por níveis (iniciante, básico, intermediário, proficiente)." },
          { label: "Atividades", content: "Mapeamento de evidências por pilar do PC; alinhamento a objetivos." },
        ],
      },
      {
        title: "Unidade 4.2 • Instrumentos e rubricas (2h)",
        sections: [
          { label: "Objetivos", content: "Elaborar rubricas claras e tarefas autênticas." },
          { label: "Atividades", content: "Construção de rubrica; validação por pares; critérios de acessibilidade." },
        ],
      },
      {
        title: "Unidade 4.3 • Feedback e autoavaliação (2h)",
        sections: [
          { label: "Objetivos", content: "Implementar ciclos de feedback formativo e autoavaliação." },
          { label: "Atividades", content: "Quadro de feedback \"Eu observei / Sugiro / Pergunto\"; checklists de qualidade." },
        ],
      },
    ],
  },
  {
    id: "mod5",
    title: "Compartilhamento de experiências e banco de práticas",
    hours: "2h",
    pdf: "/Modulo_5.pdf",
    units: [
      {
        title: "Unidade 5.1 • Showcase e Banco de Práticas (2h)",
        sections: [
          { label: "Objetivos", content: "Documentar, publicar e licenciar práticas no repositório MAPEAR." },
          { label: "Atividades", content: "PechaKucha/galeria; ficha-padrão (contexto, objetivos, passo a passo, RE, avaliação, anexos)." },
          { label: "Produtos", content: "Prática publicada + plano de replicação em outra turma/área." },
        ],
      },
    ],
  },
];

function DetailList({ sections }: { sections: CourseSection[] }) {
  return (
    <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
      <dl className="space-y-2">
        {sections.map((sec) => (
          <div key={sec.label}>
            <dt className="font-semibold text-white/90">{sec.label}</dt>
            <dd className="text-slate-200">
              {Array.isArray(sec.content) ? (
                <ul className="list-disc pl-5">
                  {sec.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <span>{sec.content}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ModuleAccordion({
  module,
  isOpen,
  onToggle,
}: {
  module: CourseModule;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article id={module.id} className="mt-4">
      <button
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full text-left rounded-xl border border-slate-400/20 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] hover:bg-[linear-gradient(180deg,rgba(34,56,92,0.85),rgba(16,24,39,0.65))] transition-colors shadow-md p-4 text-white"
      >
        <h3 className="flex items-center justify-between">
          <span>✦ {`Módulo ${module.id.replace('mod', '')} — ${module.title}`} ({module.hours})</span>
          <span className="ml-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-200 border border-blue-400/25">
            {isOpen ? "Aberto" : "Fechado"}
          </span>
        </h3>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ${isOpen ? "max-h-[1000px]" : "max-h-0"}`}
      >
        <div className="px-1">
          {module.units.map((unit) => (
            <div key={unit.title} className="mt-2">
              <h4 className="text-white font-medium">{unit.title}</h4>
              <DetailList sections={unit.sections} />
            </div>
          ))}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <a
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10"
              href={module.pdf}
              target="_blank"
              rel="noopener"
            >
              Abrir módulo
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CursoPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const [openModuleId, setOpenModuleId] = useState<string>("mod1"); // Módulo 1 aberto por padrão
  const matrixData = [
    {
      title: "Decomposição",
      levels: {
        Iniciante: "Reconhece tarefas grandes.",
        Básico: "Separa em 2–3 partes simples.",
        Intermediário: "Estrutura etapas com dependências.",
        Proficiente: "Refatora e otimiza o plano.",
      },
    },
    {
      title: "Padrões",
      levels: {
        Iniciante: "Identifica semelhanças simples.",
        Básico: "Classifica exemplos recorrentes.",
        Intermediário: "Generaliza para novas situações.",
        Proficiente: "Cria modelos reutilizáveis.",
      },
    },
    {
      title: "Abstração",
      levels: {
        Iniciante: "Diferencia dados essenciais e supérfluos.",
        Básico: "Cria representações básicas (tabela/diagrama).",
        Intermediário: "Escolhe abstrações adequadas ao público.",
        Proficiente: "Transita entre níveis de abstração.",
      },
    },
    {
      title: "Algoritmos",
      levels: {
        Iniciante: "Segue sequências simples.",
        Básico: "Escreve instruções claras.",
        Intermediário: "Usa estruturas condicionais/repetição.",
        Proficiente: "Refina com testes e depuração.",
      },
    },
    {
      title: "Generalização",
      levels: {
        Iniciante: "Aplica solução apenas no exemplo visto.",
        Básico: "Adapta regra simples a casos parecidos com apoio.",
        Intermediário: "Identifica variáveis e limites; transfere a novos contextos com pequenas adaptações.",
        Proficiente: "Formula princípios e modelos reutilizáveis que cobrem variações e exceções.",
      },
    },
    {
      title: "Robótica",
      levels: {
        Iniciante: "Reconhece sensores/atuadores; monta kit seguindo guia; cumpre regras de segurança.",
        Básico: "Programa reações simples (if/else) com um sensor/atuador; calibra limiares.",
        Intermediário: "Integra múltiplos sensores; usa PWM e funções; depura via monitor serial; melhora chassi.",
        Proficiente: "Projeta sistema completo com feedback (PID simples), gestão de energia, testes e documentação.",
      },
    },
  ] as const;

  return (
    <>

      <div id="topo" className="space-y-6">
        {/* Cabeçalho do Curso */}
        <section
          className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white"
          aria-labelledby="titulo"
        >
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-200 border border-blue-400/25">
            Formação Docente • MAPEAR
          </span>
          <h1 id="titulo" className="mt-2 text-xl sm:text-5xl font-bold tracking-tight">
            Curso de Formação MAPEAR
          </h1>
          <h3 className="mt-2 text-lg text-slate-200">
            Presencial, híbrido ou EAD. Um percurso formativo para implementar o
            <strong className="text-green-400"> Pensamento Computacional (PC)</strong> na Educação Básica com
            mediação ativa e <strong className="text-green-400"> Robótica Educacional (RE)</strong>, combinando
            ferramentas digitais e atividades desplugadas, avaliação por competências
            e um banco colaborativo de práticas.
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Ações da página">
            <button
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10"
              onClick={handlePrint}
            >
              Imprimir/Salvar em PDF
            </button>
            <a
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10"
              href="/Artefatos.zip"
              download
            >
              Baixar Artefatos (ZIP)
            </a>
          </div>
        </section>

        {/* Visão geral (KPIs + Objetivos) */}
        <section aria-label="Visão geral" className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-400/15 bg-white/5 p-4 text-white">
              <strong>Carga horária</strong>
              <span className="mt-2 block w-fit items-center px-2 py-1 text-xs rounded-full border border-white/10 bg-white/10 text-green-400/80">30h • Sugerido</span>
            </div>
            <div className="rounded-lg border border-slate-400/15 bg-white/5 p-4 text-white">
              <strong>Público-alvo</strong>
              <span className="mt-2 block w-fit items-center px-2 py-1 text-xs rounded-full border border-white/10 bg-white/10 text-green-400/80">Professores em Formação Inicial ou Continuada</span>
            </div>
            <div className="rounded-lg border border-slate-400/15 bg-white/5 p-4 text-white">
              <strong>Modalidades</strong>
              <span className="mt-2 block w-fit items-center px-2 py-1 text-xs rounded-full border border-white/10 bg-white/10 text-green-400/80">Presencial • Híbrido • EAD</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
            <h2 className="text-xl sm:text-3xl font-semibold">Objetivos</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-200">
              <li>Compreender fundamentos do PC e seus pilares (decomposição, padrões, abstração, algoritmos).</li>
              <li>Planejar sequências e projetos com <em>mediação ativa</em> e momentos de <strong>RE</strong>.</li>
              <li>Selecionar ferramentas digitais e propor atividades desplugadas alinhadas à BNCC.</li>
              <li>Desenhar estratégias e instrumentos de avaliação por competências.</li>
              <li>Construir e compartilhar um banco aberto de práticas MAPEAR.</li>
            </ul>
          </div>
        </section>

        <hr className="my-6 border-t border-slate-400/20" />

        {/* Programa detalhado (Accordion) */}
        <section id="programa" aria-labelledby="programa-t">
          <h2 id="programa-t" className="text-xl sm:text-3xl font-semibold text-white">Programa detalhado</h2>
          <p className="text-gray-400">Cada módulo inclui objetivos de aprendizagem, conteúdos, atividades (presencial/EAD), RE (Robótica Educacional), avaliação formativa e recursos.</p>

          {courseData.map((m) => (
            <ModuleAccordion
              key={m.id}
              module={m}
              isOpen={openModuleId === m.id}
              onToggle={() => setOpenModuleId(openModuleId === m.id ? "" : m.id)}
            />
          ))}
        </section>

        <hr className="my-6 border-t border-slate-400/20" />

        {/* Avaliação: Matriz de competências (Tabela moderna) */}
        <section id="avaliacao" aria-labelledby="av-t">
          <h2 id="av-t" className="text-xl sm:text-3xl font-semibold text-white">Matriz de competências (exemplo)</h2>
          <div className="mt-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-100 p-3">
            Use e adapte conforme seu contexto. Inclui critérios transversais: colaboração, comunicação, ética digital e acessibilidade.
          </div>
          <div className="mt-3 rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 sm:p-6 text-white">
            <div className="relative overflow-x-auto rounded-lg border border-white/10">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 bg-white/10 backdrop-blur supports-[backdrop-filter]:bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider text-left">Competência</th>
                    <th className="px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider text-left">Iniciante</th>
                    <th className="px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider text-left">Básico</th>
                    <th className="px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider text-left">Intermediário</th>
                    <th className="px-4 py-3 text-xs font-semibold text-white/80 uppercase tracking-wider text-left">Proficiente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {matrixData.map((card) => (
                    <tr key={card.title} className="odd:bg-white/5 even:bg-transparent hover:bg-white/10 transition-colors align-top">
                      <td className="px-4 py-3 text-white font-semibold w-44">{card.title}</td>
                      <td className="px-4 py-3 text-white/90">{card.levels.Iniciante}</td>
                      <td className="px-4 py-3 text-white/90">{card.levels.Básico}</td>
                      <td className="px-4 py-3 text-white/90">{card.levels.Intermediário}</td>
                      <td className="px-4 py-3 text-white/90">{card.levels.Proficiente}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <hr className="my-6 border-t border-slate-400/20" />

        {/* Cronograma e rubrica resumida */}
        <section id="cronograma" aria-labelledby="crono-t">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-400/80">Cronograma sugerido (30h)</h3>
              <ol className="mt-2 list-decimal pl-5 space-y-1 text-white/90">
                <li><strong>Encontro 1 (4h):</strong> Módulo 1.1 e 1.2</li>
                <li><strong>Encontro 2 (2h):</strong> Módulo 1.3</li>
                <li><strong>Encontro 3 (4h):</strong> Módulo 2.1</li>
                <li><strong>Encontro 4 (4h):</strong> Módulo 2.2</li>
                <li><strong>Encontro 5 (4h):</strong> Módulo 2.3</li>
                <li><strong>Encontro 6 (4h):</strong> Módulo 3.1 e 3.2</li>
                <li><strong>Encontro 7 (4h):</strong> Módulo 3.3</li>
                <li><strong>Encontro 8 (4h):</strong> Módulo 4.1, 4.2 e 4.3 + Showcase (Módulo 5)</li>
              </ol>
            </div>
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-400/80">Rubrica para projetos MAPEAR (resumo)</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-white/90">
                <li><strong>Clareza do problema-motriz</strong>: relevante, contextualizado, interdisciplinar.</li>
                <li><strong>Evidências de PC</strong>: presença explícita dos quatro pilares.</li>
                <li><strong>Acessibilidade</strong>: adaptações planejadas; linguagem inclusiva.</li>
                <li><strong>Mediação ativa</strong>: protocolos e check-ins definidos.</li>
                <li><strong>Reflexão</strong>: momentos de metacognição antes/durante/depois.</li>
                <li><strong>Produto público</strong>: utilidade, clareza e documentação.</li>
                <li><strong>Feedback</strong>: ciclos e critérios transparentes.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-400/80">Adaptação Híbrida/EAD</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-white/90">
                <li>Vídeos curtos assíncronos (10–15min) por unidade.</li>
                <li>Fóruns com protocolos de reflexão e feedback por pares.</li>
                <li>Sessões síncronas focadas em prática e dúvidas.</li>
                <li>Entregas modulares com rubricas transparentes.</li>
                <li>Alternativas low-tech e desplugadas em todas as etapas.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-400/80">Infra mínima</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-white/90">
                <li>Para presencial: sala com projeção e espaço para dinâmicas.</li>
                <li>Para EAD: plataforma de videoconferência + repositório (Drive/Git/AVA).</li>
                <li>1 dispositivo por dupla (ou estações rotativas).</li>
                <li>Materiais simples: cartões, fita, cordas, post-its.</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="my-6 border-t border-slate-400/20" />

        {/* Recursos e modelos prontos */}
        <section id="recursos" aria-labelledby="recursos-t">
          <h2 id="recursos-t" className="text-xl sm:text-3xl font-semibold text-white">Recursos e modelos prontos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-400/80">Modelos editáveis</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-white/90">
                <li>Canvas de projeto MAPEAR</li>
                <li>Roteiro de RE (antes/durante/depois)</li>
                <li>Rubrica de PC (padrão)</li>
                <li>Checklist de acessibilidade didática</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-400/80">Protocolos de mediação</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-white/90">
                <li>Pense–Par–Compartilhe</li>
                <li>Crítica amigável (Como um amigo)</li>
                <li>Galeria com feedback pontual</li>
                <li>Stand-up de aprendizagem (check-in de 2 minutos)</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="my-6 border-t border-slate-400/20" />

        {/* Baralho Pedagógico (cards) */}
        <section id="baralho" aria-labelledby="baralho-t">
          <h2 id="baralho-t" className="text-xl sm:text-3xl font-semibold text-white">Baralho Pedagógico</h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10"
              href="/Baralho_MAPEAR.pdf"
              target="_blank"
              rel="noopener"
            >
              Baixar baralho (PDF)
            </a>
          </div>
          <div className="mt-3">
            <DeckCarousel items={deckData} />
          </div>
        </section>

        <hr className="my-6 border-t border-slate-400/20" />

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-t">
          <h2 id="faq-t" className="text-xl sm:text-2xl font-semibold text-white">FAQ</h2>
          <details>
            <summary>O que é Robótica Educacional?</summary>
            <p>A Robótica é uma área da tecnologia que reúne conhecimentos de Mecânica, Engenharia Elétrica, Eletrônica e Computação. Ela estuda e cria máquinas que conseguem se mover e executar tarefas sozinhas ou com pouca ajuda humana. Na prática, isso significa construir sistemas formados por peças mecânicas (como motores e engrenagens) e componentes eletrônicos (como sensores e placas de controle). Esses sistemas podem ser controlados por pessoas ou programados para funcionar de forma automática, realizando atividades de maneira rápida, precisa e eficiente.</p>
          </details>
          <details>
            <summary>Preciso de laboratório de informática?</summary>
            <p>Não. O curso valoriza estratégias <em>low-tech</em> e desplugadas, com uso de tecnologia quando disponível.</p>
          </details>
          <details>
            <summary>Há certificação?</summary>
            <p>Opcional, mediante cumprimento de carga horária mínima e entrega do projeto final com documentação no banco de práticas.</p>
          </details>
        </section>

      </div>
    </>
  );
}