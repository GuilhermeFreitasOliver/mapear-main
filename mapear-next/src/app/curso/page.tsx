"use client";
import { useState } from "react";

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
          { label: "Atividades", content: [
            "Presencial/EAD: Mapa mental colaborativo (Jamboard/Quadro) sobre usos do PC.",
            "Desplugada: Classificação de problemas por decomposição com cartões.",
          ] },
          { label: "RE", content: "Diário rápido: \"Que evidências de PC já existem na minha prática?\"" },
          { label: "Avaliação", content: "Checklist de compreensão + participação no mapa mental." },
          { label: "Recursos", content: "Quadro físico/virtual, cartões, projetor, rubrica rápida." },
        ],
      },
      {
        title: "Unidade 1.2 • Pilares: decomposição, padrões, abstração, algoritmos (2h)",
        sections: [
          { label: "Objetivos", content: "Aplicar os quatro pilares em situações do cotidiano escolar." },
          { label: "Atividades", content: [
            "Desplugada: Algoritmo de sanduíche (instruções ambíguas vs. precisas).",
            "Digital: Fluxogramas simples (draw.io) para rotinas escolares.",
          ] },
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
          <span>✦ {`Módulo ${module.id.replace('mod','')} — ${module.title}`} ({module.hours})</span>
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
          <h1 id="titulo" className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
            Curso de Formação MAPEAR
          </h1>
          <h3 className="mt-2 text-slate-200">
            Presencial, híbrido ou EAD. Um percurso formativo para implementar o
            <strong> Pensamento Computacional (PC)</strong> na Educação Básica com
            mediação ativa e <strong> Robótica Educacional (RE)</strong>, combinando
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
              <span className="ml-2 inline-flex items-center px-2 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-white/80">30h • sugerido</span>
            </div>
            <div className="rounded-lg border border-slate-400/15 bg-white/5 p-4 text-white">
              <strong>Público-alvo</strong>
              <span className="ml-2 inline-flex items-center px-2 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-white/80">Professores em Formação Inicial ou Continuada</span>
            </div>
            <div className="rounded-lg border border-slate-400/15 bg-white/5 p-4 text-white">
              <strong>Modalidades</strong>
              <span className="ml-2 inline-flex items-center px-2 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-white/80">Presencial • Híbrido • EAD</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
            <h2 className="text-xl sm:text-2xl font-semibold">Objetivos</h2>
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
          <h2 id="programa-t" className="text-xl sm:text-2xl font-semibold text-white">Programa detalhado</h2>
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
          <h2 id="av-t" className="text-xl sm:text-2xl font-semibold text-white">Matriz de competências (exemplo)</h2>
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
              <h3>Cronograma sugerido (30h)</h3>
              <ol>
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
              <h3>Rubrica para projetos MAPEAR (resumo)</h3>
              <ul>
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
              <h3>Adaptação Híbrida/EAD</h3>
              <ul>
                <li>Vídeos curtos assíncronos (10–15min) por unidade.</li>
                <li>Fóruns com protocolos de reflexão e feedback por pares.</li>
                <li>Sessões síncronas focadas em prática e dúvidas.</li>
                <li>Entregas modulares com rubricas transparentes.</li>
                <li>Alternativas low-tech e desplugadas em todas as etapas.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
              <h3>Infra mínima</h3>
              <ul>
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
          <h2 id="recursos-t" className="text-xl sm:text-2xl font-semibold text-white">Recursos e modelos prontos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
              <h3>Modelos editáveis</h3>
              <ul>
                <li>Canvas de projeto MAPEAR</li>
                <li>Roteiro de RE (antes/durante/depois)</li>
                <li>Rubrica de PC (padrão)</li>
                <li>Checklist de acessibilidade didática</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white">
              <h3>Protocolos de mediação</h3>
              <ul>
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
          <h2 id="baralho-t" className="text-xl sm:text-2xl font-semibold text-white">Baralho Pedagógico</h2>
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
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3" role="list">
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Orientação</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <line x1="10" y1="90" x2="140" y2="90" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="140,90 130,85 130,95" fill="#eaf0ff"/>
                <line x1="20" y1="100" x2="20" y2="20" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="20,20 15,30 25,30" fill="#eaf0ff"/>
                <text x="95" y="105" fontSize="10" fill="#aab3d1">Você está aqui</text>
              </svg>
              <p>Forneça uma pista ou caminho inicial para orientar os alunos.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Motivação</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="80" cy="55" r="38" fill="#f59e0b33" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="68" cy="47" r="4" fill="#0b1020" />
                <circle cx="92" cy="47" r="4" fill="#0b1020" />
                <path d="M62 65 Q80 78 98 65" fill="none" stroke="#0b1020" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <p>Incentive os estudantes a persistirem diante de desafios.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Colaboração Forçada</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="60" cy="55" r="26" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <circle cx="100" cy="55" r="26" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <circle cx="80" cy="35" r="26" fill="none" stroke="#eaf0ff" strokeWidth="2" />
              </svg>
              <p>Membros da equipe devem trabalhar juntos</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Dica Estratégica</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <polygon points="50,80 80,30 110,80" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="70" y1="62" x2="90" y2="62" stroke="#eaf0ff" strokeWidth="3" />
              </svg>
              <p>Ofereça uma dica que poupe tempo, sem entregar a solução.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Reflexão</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <ellipse cx="70" cy="55" rx="40" ry="24" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <text x="60" y="60" fontSize="16" fill="#eaf0ff">…</text>
                <path d="M112 58 C130 48, 142 38, 148 28" fill="none" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="148,28 144,35 152,33" fill="#eaf0ff" />
              </svg>
              <p>Peça que os alunos parem e reflitam sobre sua estratégia.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Erro Produtivo</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <line x1="50" y1="40" x2="110" y2="100" stroke="#eaf0ff" strokeWidth="3" />
                <line x1="110" y1="40" x2="50" y2="100" stroke="#eaf0ff" strokeWidth="3" />
                <text x="72" y="30" fontSize="16" fill="#aab3d1">?</text>
              </svg>
              <p>Valorize os erros como oportunidade de aprendizado.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Exploração Livre</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <rect x="40" y="30" width="80" height="50" fill="none" stroke="#eaf0ff" strokeDasharray="6 6" strokeWidth="2" />
                <text x="75" y="60" fontSize="18" fill="#eaf0ff">?</text>
              </svg>
              <p>Permita que os alunos experimentem sem regras.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Rotatividade</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <path d="M60 90 A35 35 0 1 1 95 55" fill="none" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="95,55 85,55 90,65" fill="#eaf0ff" />
                <text x="20" y="60" fontSize="16" fill="#eaf0ff">⇌</text>
              </svg>
              <p>Troque papéis entre os membros da equipe.</p>
            </div>

            {/* Pensamento Computacional */}
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Abstração</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="55" cy="60" r="22" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="78" y1="60" x2="120" y2="60" stroke="#eaf0ff" strokeWidth="2" />
                <text x="125" y="62" fontSize="16" fill="#eaf0ff">…</text>
              </svg>
              <p>Simplifique o problema, ignorando detalhes irrelevantes.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Padrões</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="50" cy="60" r="14" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <circle cx="80" cy="60" r="14" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <circle cx="110" cy="60" r="14" fill="none" stroke="#eaf0ff" strokeWidth="2" />
              </svg>
              <p>Encontre repetições e semelhanças para resolver mais rápido.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Algoritmo</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <line x1="30" y1="60" x2="70" y2="60" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="70,60 60,55 60,65" fill="#eaf0ff" />
                <line x1="80" y1="60" x2="120" y2="60" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="120,60 110,55 110,65" fill="#eaf0ff" />
              </svg>
              <p>Crie uma sequência de passos lógicos para alcançar o objetivo.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Generalização</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <rect x="30" y="40" width="28" height="20" fill="none" stroke="#eaf0ff" />
                <rect x="68" y="40" width="28" height="20" fill="none" stroke="#eaf0ff" />
                <rect x="106" y="40" width="28" height="20" fill="none" stroke="#eaf0ff" />
                <text x="76" y="90" fontSize="16" fill="#eaf0ff">…</text>
              </svg>
              <p>Use a mesma lógica em diferentes situações.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Decomposição</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <rect x="35" y="35" width="90" height="50" fill="none" stroke="#eaf0ff" />
                <line x1="35" y1="60" x2="125" y2="60" stroke="#eaf0ff" strokeDasharray="6 6" />
                <line x1="80" y1="35" x2="80" y2="85" stroke="#eaf0ff" strokeDasharray="6 6" />
              </svg>
              <p>Divida problemas grandes em partes menores.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Depuração</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="70" cy="60" r="22" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <text x="64" y="64" fontSize="16" fill="#eaf0ff">?</text>
                <path d="M100 60 A28 28 0 1 1 72 32" fill="none" stroke="#ef4444" strokeWidth="3" />
              </svg>
              <p>Identifique e corrija erros no raciocínio ou código.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Sequência Lógica</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <rect x="40" y="42" width="24" height="24" fill="none" stroke="#eaf0ff" />
                <rect x="70" y="42" width="24" height="24" fill="none" stroke="#eaf0ff" />
                <rect x="100" y="42" width="24" height="24" fill="none" stroke="#eaf0ff" />
              </svg>
              <p>Siga uma ordem clara de ações para alcançar o objetivo.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Pensamento Crítico</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <polygon points="80,30 110,60 80,90 50,60" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <text x="75" y="65" fontSize="16" fill="#eaf0ff">X</text>
              </svg>
              <p>Avalie alternativas e escolha a melhor solução.</p>
            </div>

            {/* Robótica Educacional */}
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Sensores</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="55" cy="60" r="10" fill="none" stroke="#eaf0ff" />
                <circle cx="85" cy="60" r="10" fill="none" stroke="#eaf0ff" />
                <line x1="105" y1="60" x2="135" y2="60" stroke="#eaf0ff" strokeWidth="2" />
                <polygon points="135,60 125,55 125,65" fill="#eaf0ff" />
              </svg>
              <p>Detecte informações do ambiente (luz, distância, som).</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Atuadores</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="80" cy="60" r="26" fill="none" stroke="#eaf0ff" />
                <line x1="80" y1="60" x2="110" y2="30" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="80" y1="60" x2="50" y2="30" stroke="#eaf0ff" strokeWidth="2" />
              </svg>
              <p>Produza ações: motores, LEDs, braços robóticos.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Engrenagens</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <g stroke="#eaf0ff">
                  <circle cx="80" cy="60" r="14" fill="none" />
                  <g>
                    <line x1="80" y1="28" x2="80" y2="44" />
                    <line x1="80" y1="76" x2="80" y2="92" />
                    <line x1="48" y1="60" x2="64" y2="60" />
                    <line x1="96" y1="60" x2="112" y2="60" />
                    <line x1="60" y1="40" x2="70" y2="50" />
                    <line x1="90" y1="70" x2="100" y2="80" />
                    <line x1="60" y1="80" x2="70" y2="70" />
                    <line x1="90" y1="50" x2="100" y2="40" />
                  </g>
                </g>
              </svg>
              <p>Partes mecânicas podem multiplicar força e movimento.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Programação de Robôs</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <rect x="30" y="40" width="40" height="26" fill="none" stroke="#eaf0ff" />
                <text x="45" y="57" fontSize="12" fill="#eaf0ff">IF</text>
                <rect x="90" y="40" width="40" height="26" fill="none" stroke="#eaf0ff" />
                <text x="103" y="57" fontSize="12" fill="#eaf0ff">DO</text>
                <line x1="70" y1="53" x2="90" y2="53" stroke="#eaf0ff" strokeWidth="2" />
                <polygon points="90,53 82,49 82,57" fill="#eaf0ff" />
              </svg>
              <p>Crie comandos que dizem ao robô como agir.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Modularização</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <rect x="35" y="40" width="30" height="24" fill="none" stroke="#eaf0ff" />
                <rect x="70" y="40" width="30" height="24" fill="none" stroke="#eaf0ff" />
                <rect x="105" y="40" width="30" height="24" fill="none" stroke="#eaf0ff" />
              </svg>
              <p>Monte projetos dividindo em módulos reutilizáveis.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Controle e Feedback</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <line x1="30" y1="60" x2="120" y2="60" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="120" y1="60" x2="120" y2="30" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="120" y1="30" x2="30" y2="30" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="30" y1="30" x2="30" y2="60" stroke="#eaf0ff" strokeWidth="2" />
                <polygon points="30,60 38,56 38,64" fill="#eaf0ff" />
              </svg>
              <p>Robôs ajustam suas ações de acordo com os resultados.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Colaboração</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="60" cy="55" r="24" fill="none" stroke="#eaf0ff" />
                <circle cx="100" cy="55" r="24" fill="none" stroke="#eaf0ff" />
                <circle cx="80" cy="35" r="24" fill="none" stroke="#eaf0ff" />
              </svg>
              <p>Trabalhe em equipe para criar soluções mais criativas.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Criatividade</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <polygon points="60,80 80,40 100,80" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <line x1="70" y1="62" x2="90" y2="62" stroke="#eaf0ff" strokeWidth="3" />
              </svg>
              <p>Inove combinando ideias e criando projetos originais.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Sensor Ultrassônico</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <rect x="40" y="40" width="70" height="28" fill="none" stroke="#eaf0ff" />
                <circle cx="58" cy="54" r="8" fill="none" stroke="#eaf0ff" />
                <circle cx="90" cy="54" r="8" fill="none" stroke="#eaf0ff" />
                <line x1="112" y1="54" x2="140" y2="48" stroke="#eaf0ff" />
                <line x1="112" y1="54" x2="140" y2="60" stroke="#eaf0ff" />
              </svg>
              <p>Mede distância por eco. Útil para desviar de obstáculos e mapear o ambiente.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Sensor de Linha</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <rect x="35" y="40" width="90" height="28" fill="none" stroke="#eaf0ff" />
                <rect x="55" y="48" width="12" height="12" fill="#eaf0ff" />
                <rect x="85" y="48" width="12" height="12" fill="#eaf0ff" />
                <line x1="30" y1="78" x2="130" y2="78" stroke="#eaf0ff" strokeDasharray="6 6" />
                <line x1="61" y1="78" x2="61" y2="92" stroke="#eaf0ff" />
                <line x1="91" y1="78" x2="91" y2="92" stroke="#eaf0ff" />
              </svg>
              <p>Detecta contraste claro/escuro para seguir trilhas. Base para seguidores de linha.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Motor DC</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="50" cy="60" r="14" fill="none" stroke="#eaf0ff" />
                <rect x="64" y="50" width="56" height="20" fill="none" stroke="#eaf0ff" />
                <path d="M58 34 A20 20 0 1 0 58 86" fill="none" stroke="#eaf0ff" strokeWidth="3" />
              </svg>
              <p>Gira continuamente. Controle de velocidade via PWM e sentido via ponte H.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Servo Motor</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <rect x="45" y="48" width="70" height="34" fill="none" stroke="#eaf0ff" />
                <line x1="80" y1="48" x2="80" y2="30" stroke="#eaf0ff" strokeWidth="3" />
                <line x1="60" y1="30" x2="100" y2="30" stroke="#eaf0ff" strokeWidth="3" />
                <path d="M80 30 A20 20 0 0 1 65 22" fill="none" stroke="#eaf0ff" strokeWidth="2" />
              </svg>
              <p>Controle de posição angular. Ideal para braços, garras e direções precisas.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Ponte H</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <rect x="40" y="38" width="80" height="34" fill="none" stroke="#eaf0ff" />
                <circle cx="80" cy="30" r="6" fill="none" stroke="#eaf0ff" />
                <circle cx="80" cy="88" r="6" fill="none" stroke="#eaf0ff" />
                <line x1="40" y1="55" x2="20" y2="55" stroke="#eaf0ff" />
                <line x1="120" y1="55" x2="140" y2="55" stroke="#eaf0ff" />
                <line x1="80" y1="36" x2="80" y2="38" stroke="#eaf0ff" />
                <line x1="80" y1="72" x2="80" y2="74" stroke="#eaf0ff" />
              </svg>
              <p>Controla sentido de rotação do motor invertendo polaridade (frente/ré).</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">PWM</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <line x1="20" y1="80" x2="140" y2="80" stroke="#eaf0ff" />
                <path d="M20 80 V50 H44 V80 M60 80 V50 H84 V80 M100 80 V50 H124 V80" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <text x="70" y="95" fontSize="10" fill="#aab3d1">largura do pulso</text>
              </svg>
              <p>Modulação por largura de pulso para controlar potência: velocidade e brilho.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">PID Simples</h4>
              <svg viewBox="0 0 200 110" aria-hidden="true">
                <circle cx="40" cy="60" r="12" fill="none" stroke="#eaf0ff" />
                <text x="36" y="64" fontSize="12" fill="#eaf0ff">e</text>
                <line x1="52" y1="60" x2="84" y2="60" stroke="#eaf0ff" />
                <rect x="84" y="44" width="60" height="32" fill="none" stroke="#eaf0ff" />
                <text x="98" y="64" fontSize="12" fill="#eaf0ff">P + I + D</text>
                <line x1="144" y1="60" x2="172" y2="60" stroke="#eaf0ff" />
                <text x="176" y="64" fontSize="12" fill="#eaf0ff">u</text>
                <line x1="160" y1="58" x2="84" y2="58" stroke="#eaf0ff" strokeDasharray="6 6" />
              </svg>
              <p>Controle com proporcional, integral e derivativo para correções mais estáveis.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Chassi e Transmissão</h4>
              <svg viewBox="0 0 200 110" aria-hidden="true">
                <rect x="50" y="44" width="100" height="28" fill="none" stroke="#eaf0ff" />
                <circle cx="70" cy="80" r="10" fill="none" stroke="#eaf0ff" />
                <circle cx="130" cy="80" r="10" fill="none" stroke="#eaf0ff" />
                <line x1="100" y1="44" x2="100" y2="24" stroke="#eaf0ff" strokeDasharray="6 6" />
                <line x1="88" y1="24" x2="112" y2="24" stroke="#eaf0ff" />
              </svg>
              <p>Estrutura mecânica, rodas e eixos. Pensa-se em peso, atrito e estabilidade.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Energia e Bateria</h4>
              <svg viewBox="0 0 200 110" aria-hidden="true">
                <rect x="60" y="44" width="80" height="28" fill="none" stroke="#eaf0ff" />
                <line x1="66" y1="58" x2="90" y2="58" stroke="#eaf0ff" />
                <line x1="78" y1="52" x2="78" y2="64" stroke="#eaf0ff" />
                <line x1="110" y1="58" x2="134" y2="58" stroke="#eaf0ff" />
                <line x1="122" y1="54" x2="122" y2="62" stroke="#eaf0ff" />
                <text x="95" y="90" fontSize="12" fill="#aab3d1">5–9 V</text>
              </svg>
              <p>Gestão de energia, autonomia e segurança. Dimensione tensão e corrente.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Comunicação Serial/Bluetooth</h4>
              <svg viewBox="0 0 200 110" aria-hidden="true">
                <rect x="40" y="46" width="50" height="24" fill="none" stroke="#eaf0ff" />
                <text x="60" y="62" fontSize="10" fill="#eaf0ff" textAnchor="middle">TX</text>
                <rect x="110" y="46" width="50" height="24" fill="none" stroke="#eaf0ff" />
                <text x="135" y="62" fontSize="10" fill="#eaf0ff" textAnchor="middle">RX</text>
                <line x1="90" y1="52" x2="110" y2="52" stroke="#eaf0ff" />
                <line x1="90" y1="58" x2="110" y2="58" stroke="#eaf0ff" />
                <line x1="90" y1="64" x2="110" y2="64" stroke="#eaf0ff" />
              </svg>
              <p>Troca de dados entre placas e celular. Útil para telemetria e comandos.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Modularização (Funções)</h4>
              <svg viewBox="0 0 200 110" aria-hidden="true">
                <rect x="40" y="40" width="70" height="24" fill="none" stroke="#eaf0ff" />
                <text x="75" y="56" fontSize="10" fill="#eaf0ff" textAnchor="middle">lerSensor()</text>
                <rect x="40" y="76" width="70" height="24" fill="none" stroke="#eaf0ff" />
                <text x="75" y="92" fontSize="10" fill="#eaf0ff" textAnchor="middle">atuarMotor()</text>
                <path d="M110 52 H150 V88 H110" fill="none" stroke="#eaf0ff" />
                <polygon points="110,88 118,84 118,92" fill="#eaf0ff" />
              </svg>
              <p>Separe tarefas em funções reutilizáveis para simplificar e testar melhor.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Teste e Depuração</h4>
              <svg viewBox="0 0 200 110" aria-hidden="true">
                <rect x="40" y="34" width="120" height="60" fill="none" stroke="#eaf0ff" />
                <line x1="50" y1="46" x2="150" y2="46" stroke="#eaf0ff" />
                <line x1="60" y1="58" x2="150" y2="58" stroke="#eaf0ff" />
                <line x1="70" y1="70" x2="150" y2="70" stroke="#eaf0ff" />
                <circle cx="70" cy="70" r="4" fill="#ef4444" />
                <line x1="70" y1="74" x2="70" y2="88" stroke="#ef4444" />
              </svg>
              <p>Use monitor serial, casos de teste e logs para achar e corrigir erros.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Segurança</h4>
              <svg viewBox="0 0 200 110" aria-hidden="true">
                <polygon points="80,30 120,30 120,70 100,90 80,70" fill="none" stroke="#eaf0ff" />
                <polygon points="95,50 105,50 100,60" fill="none" stroke="#eaf0ff" />
              </svg>
              <p>Proteja olhos e mãos, isole fios, verifique curto-circuitos e aquecimento.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Documentação</h4>
              <svg viewBox="0 0 200 110" aria-hidden="true">
                <rect x="70" y="28" width="60" height="80" fill="none" stroke="#eaf0ff" />
                <line x1="78" y1="46" x2="122" y2="46" stroke="#eaf0ff" />
                <line x1="78" y1="58" x2="122" y2="58" stroke="#eaf0ff" />
                <line x1="78" y1="70" x2="122" y2="70" stroke="#eaf0ff" />
                <line x1="78" y1="82" x2="110" y2="82" stroke="#eaf0ff" />
              </svg>
              <p>Registre versões, esquemas e decisões. Facilita colaboração e manutenção.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Protoboard e Fiação</h4>
              <svg viewBox="0 0 200 110" aria-hidden="true">
                <rect x="50" y="34" width="120" height="60" fill="none" stroke="#eaf0ff" />
                <g stroke="#eaf0ff">
                  <line x1="60" y1="44" x2="60" y2="84" />
                  <line x1="66" y1="44" x2="66" y2="84" />
                  <line x1="72" y1="44" x2="72" y2="84" />
                  <line x1="78" y1="44" x2="78" y2="84" />
                  <line x1="84" y1="44" x2="84" y2="84" />
                  <line x1="90" y1="44" x2="90" y2="84" />
                  <line x1="96" y1="44" x2="96" y2="84" />
                  <line x1="102" y1="44" x2="102" y2="84" />
                </g>
                <line x1="172" y1="64" x2="150" y2="64" stroke="#eaf0ff" />
                <polygon points="150,64 158,60 158,68" fill="#eaf0ff" />
              </svg>
              <p>Monte circuitos sem solda, organize fios e alimente corretamente os trilhos.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.85),rgba(16,24,39,0.65))] shadow-md p-4 text-white" role="listitem">
              <h4 className="font-semibold">Peças 3D e Reciclagem</h4>
              <svg viewBox="0 0 200 110" aria-hidden="true">
                <rect x="40" y="52" width="60" height="28" fill="none" stroke="#eaf0ff" />
                <rect x="110" y="52" width="60" height="28" fill="none" stroke="#eaf0ff" strokeDasharray="6 6" />
                <line x1="70" y1="52" x2="70" y2="32" stroke="#eaf0ff" />
                <polygon points="60,32 80,32 70,18" fill="none" stroke="#eaf0ff" />
              </svg>
              <p>Estruture com impressora 3D ou materiais recicláveis: leve, forte e barato.</p>
            </div>
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