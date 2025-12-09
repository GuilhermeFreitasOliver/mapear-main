"use client";
import { useState, useEffect } from "react";
import DeckCarousel from "../../components/DeckCarousel";
import { deckData } from "./deckData";
import CourseSidebar, { type CourseModule as SidebarModule, type CourseLesson, type CourseLessonStatus } from "../../components/CourseSidebar";
import CourseProgressHeader from "../../components/CourseProgressHeader";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useStorage } from "@/context/StorageContext";

type CourseSection = { label: string; content: string | string[] };
/**
 * Represents a unit within a course module.
 * @property {string} title - The title of the unit.
 * @property {CourseSection[]} sections - The sections that make up the unit.
 * @property {React.ReactNode} [modalContent] - Optional custom content to display in a modal for this unit.
 *   If provided, this content will be rendered in a modal dialog when the unit is selected.
 *   Use this property when the unit requires a custom modal presentation beyond the default behavior.
 */
type CourseUnit = { title: string; sections: CourseSection[]; modalContent?: React.ReactNode };
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
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop"
                alt="Sala de aula colaborativa"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                Introdução ao Pensamento Computacional
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              O Pensamento Computacional (PC) não é apenas sobre computadores. É uma habilidade fundamental de resolução de problemas que pode ser aplicada em qualquer disciplina, desde Artes até Matemática.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-green-400 font-bold text-lg mb-2">O que é?</h4>
                <p className="text-slate-300">Uma abordagem para formular e resolver problemas de forma que um humano ou uma máquina possa executá-los eficazmente.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-blue-400 font-bold text-lg mb-2">Por que na BNCC?</h4>
                <p className="text-slate-300">A BNCC integra o PC como competência essencial para o mundo digital, promovendo criatividade, lógica e autonomia.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Os 4 Pilares do PC</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Decomposição</strong>
                  <span className="text-slate-400">Dividir problemas complexos em partes menores e gerenciáveis.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-pink-500/20 text-pink-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Reconhecimento de Padrões</strong>
                  <span className="text-slate-400">Identificar tendências ou semelhanças que ajudam a resolver problemas.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500/20 text-orange-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Abstração</strong>
                  <span className="text-slate-400">Focar no que é importante e ignorar detalhes irrelevantes.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 p-2 rounded-lg font-bold">4</span>
                <div>
                  <strong className="text-white block">Algoritmos</strong>
                  <span className="text-slate-400">Criar um passo a passo para resolver o problema.</span>
                </div>
              </li>
            </ul>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;Como você já utiliza a decomposição ao planejar suas aulas, mesmo sem chamar isso de Pensamento Computacional?&rdquo;
              </p>
            </div>
          </div>
        ),
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

function LessonModal({ unit, onClose, onComplete }: { unit: CourseUnit; onClose: () => void; onComplete: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] flex items-start justify-center bg-slate-950/90 backdrop-blur-sm overflow-y-auto py-8 px-4 sm:px-6 animate-in fade-in duration-200">
      <div className="w-full max-w-5xl max-h-[calc(100vh-4rem)] my-auto flex flex-col bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-900/50">
          <h2 className="text-xl font-bold text-white truncate pr-4">{unit.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-900 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="prose prose-invert prose-lg max-w-none mx-auto">
            {unit.modalContent ? unit.modalContent : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <div className="w-16 h-16 mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
                </div>
                <p className="text-lg font-medium">Conteúdo da aula em desenvolvimento.</p>
                <p className="text-sm mt-2 max-w-md text-center">O conteúdo detalhado desta aula ainda não foi carregado. Consulte o resumo abaixo.</p>
                <div className="mt-8 w-full max-w-2xl text-left bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
                  <DetailList sections={unit.sections} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700 bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onComplete}
            className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg shadow-green-900/20 transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>Concluir Aula</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

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
  onOpenLesson,
}: {
  module: CourseModule;
  isOpen: boolean;
  onToggle: () => void;
  onOpenLesson: (unit: CourseUnit) => void;
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
        <div className="px-1 pt-2 pb-4">
          {module.units.map((unit) => (
            <div key={unit.title} className="mt-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <h4 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">{unit.title}</h4>
                <button
                  onClick={() => onOpenLesson(unit)}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-105 active:scale-95"
                >
                  <span>▶</span> Iniciar Aula
                </button>
              </div>
              <DetailList sections={unit.sections} />
            </div>
          ))}
          <div className="mt-4 flex flex-wrap items-center gap-2 pl-2">
            <a
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10 text-sm"
              href={module.pdf}
              target="_blank"
              rel="noopener"
            >
              📄 Baixar PDF do Módulo
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

  const { state, updateCourseLesson } = useStorage();
  const lessonProgress = state.courseProgress || {};

  const [openModuleId, setOpenModuleId] = useState<string>("mod1");
  const [activeLesson, setActiveLesson] = useState<CourseUnit | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Transform courseData to SidebarModule format for sidebar
  const sidebarModules: SidebarModule[] = courseData.map((module) => {
    const lessons: CourseLesson[] = module.units.map((unit, idx) => ({
      id: `${module.id}-unit-${idx}`,
      title: unit.title.split('•')[1]?.trim() || unit.title,
      duration: unit.title.match(/\((\d+h)\)/)?.[1] || '2h',
      status: lessonProgress[`${module.id}-unit-${idx}`] || 'not-started',
    }));

    const completedCount = lessons.filter((l) => l.status === 'completed').length;
    const progress = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

    return {
      id: module.id,
      title: module.title,
      hours: module.hours,
      lessons,
      progress,
    };
  });

  const totalLessons = sidebarModules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = sidebarModules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => l.status === 'completed').length,
    0
  );
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const handleLessonClick = (moduleId: string, lessonId: string) => {
    const courseModule = courseData.find((m) => m.id === moduleId);
    if (!courseModule) return;

    const unitIndex = parseInt(lessonId.split('-unit-')[1]);
    const unit = courseModule.units[unitIndex];
    if (!unit) return;

    setActiveLesson(unit);
    setActiveLessonId(lessonId);
    setOpenModuleId(moduleId);

    // Mark as in-progress if not started
    if (!lessonProgress[lessonId] || lessonProgress[lessonId] === 'not-started') {
      updateCourseLesson(lessonId, 'in-progress');
    }
  };

  const handleLessonComplete = () => {
    if (activeLessonId) {
      updateCourseLesson(activeLessonId, 'completed');
    }
    setActiveLesson(null);
    setActiveLessonId(null);
  };

  const currentModule = sidebarModules.find((m) => m.id === openModuleId);
  const totalHours = courseData.reduce((sum, m) => sum + parseInt(m.hours), 0);
  const completedHours = Math.round((completedLessons / totalLessons) * totalHours);
  const remainingHours = totalHours - completedHours;

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
    <ProtectedRoute>
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

        {/* Programa detalhado (Estilo Alura) */}
        <section id="programa" aria-labelledby="programa-t">
          <h2 id="programa-t" className="text-xl sm:text-3xl font-semibold text-white mb-2">Programa detalhado</h2>
          <p className="text-gray-400 mb-6">Cada módulo inclui objetivos de aprendizagem, conteúdos, atividades (presencial/EAD), RE (Robótica Educacional), avaliação formativa e recursos.</p>

          <CourseProgressHeader
            completedLessons={completedLessons}
            totalLessons={totalLessons}
            overallProgress={overallProgress}
            estimatedTimeRemaining={`${remainingHours}h`}
            currentModule={currentModule?.title || 'Módulo 1'}
          />

          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            {/* Sidebar */}
            <CourseSidebar
              modules={sidebarModules}
              activeModuleId={openModuleId}
              activeLessonId={activeLessonId}
              onModuleClick={setOpenModuleId}
              onLessonClick={handleLessonClick}
              overallProgress={overallProgress}
            />

            {/* Main Content Area */}
            <div className="space-y-4">
              {courseData
                .find((m) => m.id === openModuleId)
                ?.units.map((unit, idx) => {
                  const lessonId = `${openModuleId}-unit-${idx}`;
                  const status = lessonProgress[lessonId] || 'not-started';

                  return (
                    <div
                      key={lessonId}
                      className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-xl p-5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Left: Lesson Info */}
                        <div className="flex items-start gap-4 flex-1">
                          {/* Status Icon */}
                          <div className="flex-shrink-0 mt-1">
                            {status === 'completed' ? (
                              <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-green-400"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            ) : status === 'in-progress' ? (
                              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-slate-700/50 border-2 border-slate-600 flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-slate-400"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Lesson Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                              {unit.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 mb-3">
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {unit.title.match(/\((\d+h)\)/)?.[1] || '2h'}
                              </span>
                              {status === 'completed' && (
                                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-400/30">
                                  Concluída
                                </span>
                              )}
                              {status === 'in-progress' && (
                                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-400/30">
                                  Em andamento
                                </span>
                              )}
                            </div>
                            <DetailList sections={unit.sections} />
                          </div>
                        </div>

                        {/* Right: Action Button */}
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => handleLessonClick(openModuleId, lessonId)}
                            className="w-full lg:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                          >
                            {status === 'completed' ? (
                              <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                                Revisar
                              </>
                            ) : status === 'in-progress' ? (
                              <>
                                <span>▶</span>
                                Continuar
                              </>
                            ) : (
                              <>
                                <span>▶</span>
                                Iniciar Aula
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* Module PDF Download */}
              <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                <a
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white border border-slate-600 hover:bg-blue-500/10 hover:border-blue-500/50 transition-all"
                  href={courseData.find((m) => m.id === openModuleId)?.pdf}
                  target="_blank"
                  rel="noopener"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                  Baixar PDF do Módulo
                </a>
              </div>
            </div>
          </div>
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

      {activeLesson && (
        <LessonModal
          unit={activeLesson}
          onClose={() => {
            setActiveLesson(null);
            setActiveLessonId(null);
          }}
          onComplete={handleLessonComplete}
        />
      )}
    </ProtectedRoute>
  );
}