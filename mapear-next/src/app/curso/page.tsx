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
        title: "Unidade 1.2 • Decomposição e Reconhecimento de Padrões (3h)",
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1596496050827-8299e0220de1?q=80&w=1974&auto=format&fit=crop"
                alt="Peças de quebra-cabeça representando decomposição"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                Decomposição e Reconhecimento de Padrões
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              A decomposição permite dividir um problema grande em partes menores, facilitando sua resolução. O reconhecimento de padrões complementa esse processo, ajudando a perceber regularidades e semelhanças para criar soluções mais eficientes e generalizáveis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-purple-400 font-bold text-lg mb-2">🔍 Decomposição</h4>
                <p className="text-slate-300">Dividir problemas complexos em etapas menores e gerenciáveis. Essencial no raciocínio lógico, na programação e em diferentes áreas como resolução de problemas matemáticos ou análise de textos.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-pink-400 font-bold text-lg mb-2">🔗 Reconhecimento de Padrões</h4>
                <p className="text-slate-300">Identificar regularidades e semelhanças em contextos matemáticos, linguísticos e sociais, permitindo criar soluções mais eficientes. Relaciona padrões à previsibilidade.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Conteúdos Abordados</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Decomposição de problemas complexos</strong>
                  <span className="text-slate-400">Dividir problemas em etapas sequenciais, identificando dependências e prioridades.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-pink-500/20 text-pink-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Identificação de padrões</strong>
                  <span className="text-slate-400">Reconhecer padrões em contextos matemáticos, linguísticos e sociais para soluções generalizáveis.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500/20 text-orange-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Relação entre padrões e previsibilidade</strong>
                  <span className="text-slate-400">Compreender como padrões permitem prever comportamentos e resultados em diferentes contextos.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 p-2 rounded-lg font-bold">4</span>
                <div>
                  <strong className="text-white block">Exemplos práticos aplicados à realidade escolar</strong>
                  <span className="text-slate-400">Aplicações concretas em sala de aula, conectando teoria e prática do cotidiano.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividades Práticas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold text-lg mb-2">
                  <span>🍳</span> Exercício de Decomposição
                </h4>
                <p className="text-slate-300">Decomposição de uma receita culinária em etapas — identificando ingredientes, instrumentos, sequência de preparo e tempo de cada fase.</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold text-lg mb-2">
                  <span>🎵</span> Identificação de Padrões
                </h4>
                <p className="text-slate-300">Identificação de padrões em textos, músicas ou sequências numéricas — percebendo regularidades e criando generalizações.</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;Onde a precisão na decomposição faz diferença no seu componente curricular? Como os padrões que você ensina podem ser aplicados em novos contextos?&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Desenvolver a habilidade de decompor problemas em partes menores.",
              "Identificar e explorar padrões em situações e problemas diversos.",
              "Aplicar estratégias de decomposição e reconhecimento de padrões em atividades práticas.",
            ]
          },
          { label: "Conteúdos", content: "Decomposição de problemas complexos em etapas; identificação de padrões em contextos matemáticos, linguísticos e sociais; relação entre padrões e previsibilidade; exemplos práticos aplicados à realidade escolar." },
          {
            label: "Atividades", content: [
              "Exercício prático: decomposição de uma receita culinária em etapas.",
              "Identificação de padrões em textos, músicas ou sequências numéricas.",
            ]
          },
          { label: "RE", content: "Reflexão guiada: onde a precisão faz diferença no meu componente curricular?" },
          { label: "Avaliação", content: "Rubrica de uso dos pilares (iniciante → proficiente)." },
        ],
      },
      {
        title: "Unidade 1.3 • Abstração e Algoritmos (3h)",
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1974&auto=format&fit=crop"
                alt="Fluxograma e algoritmos"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                Abstração e Algoritmos
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              A abstração consiste em destacar apenas as informações relevantes de um problema, ignorando detalhes que não impactam sua resolução. Já os algoritmos são sequências de passos organizados para atingir um objetivo, presentes em situações simples do dia a dia.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-orange-400 font-bold text-lg mb-2">🎯 Abstração</h4>
                <p className="text-slate-300">Simplificação de problemas por meio da seleção de informações relevantes. Focar no essencial e construir modelos simplificados que orientam a solução.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-cyan-400 font-bold text-lg mb-2">⚙️ Algoritmos</h4>
                <p className="text-slate-300">Sequências de passos organizados para atingir um objetivo. Podem ser representados por listas, fluxogramas ou instruções verbais.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Conteúdos Abordados</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-orange-500/20 text-orange-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Conceito de Abstração</strong>
                  <span className="text-slate-400">Simplificação de problemas por meio da seleção de informações relevantes, ignorando detalhes que não impactam a resolução.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Representações Gráficas e Simbólicas</strong>
                  <span className="text-slate-400">Criação de representações visuais que ajudam a focar no essencial e construir modelos simplificados.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Algoritmos: definição e estrutura</strong>
                  <span className="text-slate-400">Sequências de instução organizadas — listas, fluxogramas ou instruções verbais para resolver problemas passo a passo.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500/20 text-green-300 p-2 rounded-lg font-bold">4</span>
                <div>
                  <strong className="text-white block">Aplicações no cotidiano</strong>
                  <span className="text-slate-400">Rotinas, instruções e jogos — como preparar um lanche, organizar uma fila ou seguir regras de um jogo.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividades Práticas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold text-lg mb-2">
                  <span>📊</span> Criação de Fluxogramas
                </h4>
                <p className="text-slate-300">Criação de fluxogramas para descrever processos do cotidiano — desde preparar um café até organizar um evento escolar.</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold text-lg mb-2">
                  <span>📝</span> Algoritmos em Linguagem Natural
                </h4>
                <p className="text-slate-300">Desenvolvimento de algoritmos em linguagem natural para tarefas simples — escrevendo instruções claras e sequenciais que qualquer pessoa possa seguir.</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;Quais detalhes você ignora ao explicar um conceito para seus alunos? Isso é abstração! Como você poderia transformar suas explicações em algoritmos visuais?&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Compreender a importância da abstração na resolução de problemas.",
              "Elaborar algoritmos simples para descrever processos.",
              "Relacionar algoritmos a situações do cotidiano.",
            ]
          },
          { label: "Conteúdos", content: "Conceito de abstração: simplificação de problemas por meio da seleção de informações relevantes; criação de representações gráficas e simbólicas; algoritmos: definição, estrutura e exemplos práticos; aplicações no cotidiano." },
          {
            label: "Atividades", content: [
              "Criação de fluxogramas para descrever processos do cotidiano.",
              "Desenvolvimento de algoritmos em linguagem natural para tarefas simples.",
            ]
          },
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
        title: "Unidade 2.1 • Ecossistema de Ferramentas (2h)",
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1974&auto=format&fit=crop"
                alt="Ferramentas digitais e tecnologia educacional"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                Ecossistema de Ferramentas
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              Nesta unidade, os participantes terão contato com um ecossistema diversificado de ferramentas digitais. A escolha da ferramenta deve considerar objetivos pedagógicos, infraestrutura da escola, curva de aprendizagem, acessibilidade e custos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                <h4 className="text-blue-400 font-bold text-lg mb-2">🧩 Blocos</h4>
                <p className="text-slate-300 text-sm">Scratch e similares — programação visual por blocos encaixáveis, ideal para iniciantes.</p>
              </div>
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                <h4 className="text-green-400 font-bold text-lg mb-2">🐍 Texto</h4>
                <p className="text-slate-300 text-sm">Introdução ao Python — linguagem textual acessível para primeiros passos em programação.</p>
              </div>
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                <h4 className="text-orange-400 font-bold text-lg mb-2">🔌 Hardware</h4>
                <p className="text-slate-300 text-sm">Micro:bit, Arduino — microcontroladores educacionais para projetos práticos e robótica.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Critérios de Escolha</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-blue-500/20 text-blue-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Objetivos pedagógicos</strong>
                  <span className="text-slate-400">O que se deseja desenvolver com os alunos — raciocínio lógico, criatividade, colaboração.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500/20 text-green-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Infraestrutura da escola</strong>
                  <span className="text-slate-400">Laboratórios, número de computadores, acesso à internet e recursos disponíveis.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500/20 text-orange-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Curva de aprendizagem</strong>
                  <span className="text-slate-400">Nível de complexidade da ferramenta e tempo necessário para domínio básico.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">4</span>
                <div>
                  <strong className="text-white block">Acessibilidade e inclusão</strong>
                  <span className="text-slate-400">Possibilidade de uso por alunos com deficiência e adaptações necessárias.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-pink-500/20 text-pink-300 p-2 rounded-lg font-bold">5</span>
                <div>
                  <strong className="text-white block">Custos e licenciamento</strong>
                  <span className="text-slate-400">Ferramentas gratuitas, open-source e alternativas de baixo custo para escolas públicas.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Mais Ferramentas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                <h4 className="text-cyan-400 font-bold text-lg mb-2">📊 Planilhas Eletrônicas</h4>
                <p className="text-slate-300 text-sm">Recurso para algoritmos e lógica — fórmulas, condicionais e automações simples.</p>
              </div>
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                <h4 className="text-yellow-400 font-bold text-lg mb-2">🧪 Simuladores Online</h4>
                <p className="text-slate-300 text-sm">PhET, Code.org — ambientes interativos para experimentação e aprendizagem visual.</p>
              </div>
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 md:col-span-2">
                <h4 className="text-rose-400 font-bold text-lg mb-2">🤖 IA Generativa</h4>
                <p className="text-slate-300 text-sm">Uso responsável de Inteligência Artificial generativa em sala de aula — potencialidades, limites e ética.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividade</h3>
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-xl">
              <h4 className="flex items-center gap-2 text-emerald-300 font-bold text-lg mb-2">
                <span>📋</span> Roteiro de Curadoria
              </h4>
              <p className="text-slate-300">Elaboração de um roteiro de curadoria de ferramentas digitais, avaliando critérios como custo, acessibilidade, curva de aprendizagem e alinhamento curricular. Inclui alternativas offline ou de baixa banda.</p>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;Quais ferramentas você já utiliza? Como elas se alinham aos objetivos pedagógicos e à realidade da sua escola?&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Identificar ferramentas digitais adequadas para diferentes contextos escolares.",
              "Selecionar recursos alinhados a objetivos pedagógicos e à infraestrutura disponível.",
              "Reconhecer limitações e potencialidades de diferentes tipos de ferramentas.",
            ]
          },
          { label: "Conteúdos", content: "Blocos (Scratch), texto (Python introdutório), microcontroladores (Micro:bit, Arduino), planilhas, simuladores (PhET, Code.org), IA generativa com uso responsável." },
          { label: "Atividades", content: "Elaboração de roteiro de curadoria de ferramentas digitais com critérios e alternativas offline/baixa banda." },
          { label: "RE", content: "Canvas de decisão comparando pelo menos três ferramentas digitais (custo, acessibilidade, curva de aprendizagem)." },
          { label: "Avaliação", content: "Entrega do canvas de decisão com justificativas; participação nas discussões e simulações." },
          { label: "Recursos", content: "Computadores ou dispositivos móveis, projetor, acesso à internet, templates de canvas de decisão." },
        ],
      },
      {
        title: "Unidade 2.2 • Atividades Desplugadas de PC (3h)",
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1974&auto=format&fit=crop"
                alt="Crianças em atividade colaborativa em sala de aula"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                Atividades Desplugadas de PC
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              Atividades desplugadas são fundamentais para garantir equidade de acesso, especialmente em escolas com infraestrutura limitada. São extremamente eficazes para desenvolver raciocínio lógico e promover a participação colaborativa dos estudantes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-green-400 font-bold text-lg mb-2">🎯 Por que desplugadas?</h4>
                <p className="text-slate-300">Garantem equidade de acesso, funcionam sem tecnologia, são tangíveis e próximas da realidade dos alunos. Tornam o PC concreto e acessível.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-yellow-400 font-bold text-lg mb-2">🧩 Recursos de baixo custo</h4>
                <p className="text-slate-300">Papel, cartões, canetas coloridas, tabuleiros, peças de lego — materiais simples que permitem atividades ricas e criativas.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Conteúdos Abordados</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Dinâmicas de decomposição</strong>
                  <span className="text-slate-400">Atividades que ensinam a dividir problemas complexos em partes menores sem usar computador.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-pink-500/20 text-pink-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Jogos de identificação de padrões</strong>
                  <span className="text-slate-400">Cartões coloridos, sequências e tabuleiros para reconhecer regularidades e semelhanças.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500/20 text-orange-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Atividades de abstração</strong>
                  <span className="text-slate-400">Uso de imagens e símbolos para focar no essencial e construir representações simplificadas.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 p-2 rounded-lg font-bold">4</span>
                <div>
                  <strong className="text-white block">Criação de algoritmos passo a passo</strong>
                  <span className="text-slate-400">Instruções sequenciais usando linguagem natural, dinâmicas corporais que simulam fluxos de informação.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Exemplos de Atividades</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold mb-2">
                  <span>🎲</span> Jogos de Tabuleiro
                </h4>
                <p className="text-slate-300 text-sm">Planejamento de algoritmos através de jogos de tabuleiro com regras lógicas.</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold mb-2">
                  <span>🃏</span> Cartões Coloridos
                </h4>
                <p className="text-slate-300 text-sm">Reconhecimento de padrões usando cartões com cores, formas e sequências.</p>
              </div>
              <div className="bg-violet-900/20 border border-violet-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-violet-300 font-bold mb-2">
                  <span>🏃</span> Dinâmicas Corporais
                </h4>
                <p className="text-slate-300 text-sm">Atividades em sala que simulam fluxos de informação e redes de ordenação.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividades do Curso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold text-lg mb-2">
                  <span>✏️</span> Proposta de Atividade
                </h4>
                <p className="text-slate-300">Proposição de uma atividade desplugada para sua turma, com objetivos e regras definidos.</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold text-lg mb-2">
                  <span>🎭</span> Simulação Prática
                </h4>
                <p className="text-slate-300">Simulação da atividade com os colegas do curso — testando, ajustando e avaliando a proposta.</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;Como a atividade desplugada proposta pode ser adaptada ao seu contexto escolar? Quais materiais de baixo custo você tem disponíveis?&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Planejar atividades de Pensamento Computacional sem uso de computadores.",
              "Relacionar jogos, dinâmicas e materiais simples com os pilares do PC.",
              "Adaptar atividades desplugadas para diferentes níveis escolares.",
            ]
          },
          { label: "Conteúdos", content: "Dinâmicas de decomposição; jogos de identificação de padrões; atividades de abstração com imagens e símbolos; criação de algoritmos passo a passo; recursos de baixo custo." },
          {
            label: "Atividades", content: [
              "Proposição de uma atividade desplugada para sua turma, com objetivos e regras definidos.",
              "Simulação da atividade com os colegas do curso.",
            ]
          },
          { label: "RE", content: "Diário reflexivo: \"Como a atividade desplugada proposta pode ser adaptada ao meu contexto escolar?\"" },
          { label: "Avaliação", content: "Clareza e pertinência da proposta de atividade desplugada; participação na simulação e nas discussões coletivas." },
          { label: "Recursos", content: "Papéis, cartões, canetas coloridas, espaço físico para movimentação, projetor ou quadro." },
        ],
      },
      {
        title: "Unidade 2.3 • Trilhas Digitais Guiadas (3h)",
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1974&auto=format&fit=crop"
                alt="Aprendizagem digital e trilhas guiadas"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                Trilhas Digitais Guiadas
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              Trilhas digitais guiadas permitem que o aluno avance em etapas progressivas, de acordo com seu ritmo de aprendizagem. Podem ser aplicadas de forma autônoma ou supervisionada, garantindo aprendizagem ativa e personalização.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-blue-400 font-bold text-lg mb-2">📈 Aprendizagem Progressiva</h4>
                <p className="text-slate-300">O aluno avança no seu ritmo, com etapas progressivas que respeitam diferentes níveis de conhecimento e velocidades de aprendizagem.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-green-400 font-bold text-lg mb-2">🔄 Experiências Híbridas</h4>
                <p className="text-slate-300">Trilhas digitais podem ser combinadas com atividades desplugadas, criando experiências de ensino mais ricas e diversificadas.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Conteúdos Abordados</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-blue-500/20 text-blue-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Conceito de trilhas digitais</strong>
                  <span className="text-slate-400">Aprendizagem progressiva e personalizada em ambientes digitais estruturados.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500/20 text-green-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Plataformas recomendadas</strong>
                  <span className="text-slate-400">Code.org, Scratch online, Khan Academy, Tinkercad — ambientes interativos e acessíveis.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Integração desplugada + online</strong>
                  <span className="text-slate-400">Combinar atividades sem computador com experiências digitais para ensino híbrido eficaz.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500/20 text-orange-300 p-2 rounded-lg font-bold">4</span>
                <div>
                  <strong className="text-white block">Critérios de qualidade</strong>
                  <span className="text-slate-400">Clareza, progressão e acessibilidade — garantindo que as trilhas atendam a todos os alunos.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Plataformas em Destaque</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-3xl block mb-2">💻</span>
                <strong className="text-white text-sm">Code.org</strong>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-3xl block mb-2">🐱</span>
                <strong className="text-white text-sm">Scratch</strong>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-3xl block mb-2">📚</span>
                <strong className="text-white text-sm">Khan Academy</strong>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-3xl block mb-2">🛠️</span>
                <strong className="text-white text-sm">Tinkercad</strong>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividade</h3>
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-xl">
              <h4 className="flex items-center gap-2 text-emerald-300 font-bold text-lg mb-2">
                <span>🗺️</span> Construção de Trilha Digital
              </h4>
              <p className="text-slate-300">Construção de uma trilha digital inicial de Pensamento Computacional usando uma das plataformas apresentadas. Inclui objetivos, etapas, recursos e critérios de acompanhamento.</p>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;O Pensamento Computacional não depende exclusivamente de tecnologia avançada: ele pode ser trabalhado com metodologias desplugadas ou com recursos digitais. O importante é a intencionalidade pedagógica.&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Compreender o conceito de trilhas digitais guiadas.",
              "Planejar sequências didáticas estruturadas em ambientes digitais.",
              "Selecionar recursos online para trilhas de PC no ensino básico.",
            ]
          },
          { label: "Conteúdos", content: "Conceito de trilhas digitais e aprendizagem progressiva; plataformas (Code.org, Scratch online, Khan Academy, Tinkercad); integração entre atividades desplugadas e online; critérios de qualidade." },
          { label: "Atividades", content: "Construção de uma trilha digital inicial de PC usando uma das plataformas apresentadas." },
          { label: "RE", content: "Produção de plano simplificado de trilha com: objetivos, etapas, recursos e critérios de acompanhamento." },
          { label: "Avaliação", content: "Apresentação da trilha digital proposta; análise coletiva dos critérios de progressão e acessibilidade." },
          { label: "Recursos", content: "Computadores ou dispositivos móveis, internet, projetor e quadro branco." },
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
        title: "Unidade 3.1 • MAPEAR um Projeto (2h)",
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1974&auto=format&fit=crop"
                alt="Planejamento de projetos com post-its"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                MAPEAR um Projeto
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              O modelo MAPEAR é uma ferramenta que auxilia professores e estudantes no processo de planejamento estruturado de projetos. Ele incentiva a clareza na definição do problema, organiza as etapas e conecta os objetivos a produtos concretos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-green-400 font-bold text-lg mb-2">🎯 Metodologia MAPEAR</h4>
                <p className="text-slate-300">Uma estrutura para a criação de projetos interdisciplinares alinhada à Aprendizagem Baseada em Projetos (ABP), promovendo autonomia, colaboração e criatividade.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-blue-400 font-bold text-lg mb-2">📋 Alinhamento BNCC</h4>
                <p className="text-slate-300">O processo de planejamento conecta-se diretamente ao desenvolvimento de competências da BNCC, garantindo intencionalidade pedagógica.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Etapas do MAPEAR</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-red-500/20 text-red-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Problema-motriz</strong>
                  <span className="text-slate-400">Identificação de uma questão central que mobilize os estudantes e dê sentido ao projeto.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-amber-500/20 text-amber-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Perguntas orientadoras</strong>
                  <span className="text-slate-400">Formulação de questões investigativas que guiem a aprendizagem e direcionem a pesquisa.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500/20 text-green-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Critérios de sucesso</strong>
                  <span className="text-slate-400">Definição de parâmetros claros que indiquem se o objetivo foi alcançado de forma satisfatória.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500/20 text-blue-300 p-2 rounded-lg font-bold">4</span>
                <div>
                  <strong className="text-white block">Produto público</strong>
                  <span className="text-slate-400">Elaboração de um resultado visível, compartilhável e socialmente relevante — uma apresentação, protótipo ou publicação.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividades</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold text-lg mb-2">
                  <span>🗂️</span> Canvas de Projeto
                </h4>
                <p className="text-slate-300">Construção de um Canvas de Projeto respondendo às etapas do MAPEAR — do problema-motriz ao produto público.</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold text-lg mb-2">
                  <span>📊</span> Evidências de Aprendizagem
                </h4>
                <p className="text-slate-300">Definição coletiva de evidências de aprendizagem relacionadas às competências trabalhadas no projeto.</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;Qual problema da sua comunidade escolar poderia ser o ponto de partida para um projeto interdisciplinar usando a metodologia MAPEAR?&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Aplicar a metodologia MAPEAR como estrutura para a criação de projetos interdisciplinares.",
              "Compreender como organizar objetivos, critérios e resultados esperados de forma clara e prática.",
              "Relacionar o processo de planejamento de projetos com o desenvolvimento de competências da BNCC.",
            ]
          },
          { label: "Conteúdos", content: "Problema-motriz; perguntas orientadoras; critérios de sucesso; produto público." },
          {
            label: "Atividades", content: [
              "Construção de um Canvas de Projeto, respondendo às etapas do MAPEAR.",
              "Definição coletiva de evidências de aprendizagem relacionadas às competências trabalhadas.",
            ]
          },
        ],
      },
      {
        title: "Unidade 3.2 • Mediação Ativa e Protocolos de Sala (3h)",
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1974&auto=format&fit=crop"
                alt="Professor mediando discussão em sala de aula"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                Mediação Ativa e Protocolos de Sala
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              A mediação ativa significa que o professor não apenas transmite conteúdos, mas constrói junto com os alunos, promovendo engajamento e reflexão. Protocolos de sala ajudam a manter o ritmo da aula e a participação equitativa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-purple-400 font-bold text-lg mb-2">👨‍🏫 Mediação Ativa</h4>
                <p className="text-slate-300">O professor como facilitador: construindo conhecimento junto com os alunos, promovendo engajamento, autonomia e reflexão contínua.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-cyan-400 font-bold text-lg mb-2">💬 Feedback Formativo</h4>
                <p className="text-slate-300">Devolutivas rápidas e construtivas que garantem que os estudantes tenham clareza sobre seus avanços e pontos de melhoria.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Conteúdos Abordados</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Mediação ativa</strong>
                  <span className="text-slate-400">Funções do professor como facilitador — promovendo diálogo, escuta ativa e construção coletiva.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500/20 text-blue-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Protocolos de interação</strong>
                  <span className="text-slate-400">Técnicas de debate, rodízio de fala, trabalho em pares e pequenos grupos para participação equitativa.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500/20 text-green-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Feedback formativo</strong>
                  <span className="text-slate-400">Devolutivas rápidas e construtivas — discussões em duplas, painéis de ideias e check-ins de aprendizagem.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500/20 text-orange-300 p-2 rounded-lg font-bold">4</span>
                <div>
                  <strong className="text-white block">Gestão de tempo e recursos</strong>
                  <span className="text-slate-400">Estratégias para gerenciar tempo e recursos em projetos interdisciplinares de forma eficiente.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividades</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold mb-2">
                  <span>🎭</span> Simulação
                </h4>
                <p className="text-slate-300 text-sm">Simulação de protocolos de mediação em grupos, praticando técnicas de facilitação.</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold mb-2">
                  <span>💭</span> Discussão
                </h4>
                <p className="text-slate-300 text-sm">Troca de experiências prévias de mediação em sala de aula entre os participantes.</p>
              </div>
              <div className="bg-violet-900/20 border border-violet-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-violet-300 font-bold mb-2">
                  <span>📝</span> Plano
                </h4>
                <p className="text-slate-300 text-sm">Criação de um plano de protocolo adaptado à realidade de cada turma.</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;Após cada simulação, registre: o que observei, o que faria diferente e como posso adaptar esses protocolos à minha realidade.&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Compreender o papel do professor como mediador ativo no processo de aprendizagem.",
              "Aplicar protocolos de sala que favoreçam a participação, o diálogo e a autonomia dos estudantes.",
              "Estabelecer estratégias de acompanhamento e feedback contínuo.",
            ]
          },
          { label: "Conteúdos", content: "Mediação ativa; protocolos de interação (debate, rodízio de fala, trabalho em pares); feedback formativo; gestão de tempo e recursos." },
          {
            label: "Atividades", content: [
              "Simulação de protocolos de mediação em grupos.",
              "Discussão sobre experiências prévias de mediação em sala de aula.",
              "Criação de um plano de protocolo adaptado à realidade de cada turma.",
            ]
          },
          { label: "RE", content: "Após cada simulação, registrar \"o que observei, o que faria diferente\"." },
        ],
      },
      {
        title: "Unidade 3.3 • RE — Reflexão Estruturada (3h)",
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1974&auto=format&fit=crop"
                alt="Diário reflexivo e metacognição"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                RE — Reflexão Estruturada
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              A Reflexão Estruturada (RE) é uma prática essencial para transformar atividades em aprendizagens significativas. Por meio dela, os estudantes descrevem o que fizeram, analisam resultados e dificuldades, e projetam próximos passos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-orange-400 font-bold text-lg mb-2">🧠 Metacognição</h4>
                <p className="text-slate-300">A capacidade do aluno de refletir sobre seu próprio processo de aprendizagem — o que aprendeu, como aprendeu e o que pode melhorar.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-green-400 font-bold text-lg mb-2">📝 Avaliação Formativa</h4>
                <p className="text-slate-300">Conexão entre reflexão e avaliação contínua, garantindo que o processo de aprendizagem seja acompanhado e valorizado.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Etapas da Reflexão Estruturada</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-blue-500/20 text-blue-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Descrever</strong>
                  <span className="text-slate-400">O que fizemos? Relatar as atividades realizadas, as decisões tomadas e os resultados obtidos.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Analisar</strong>
                  <span className="text-slate-400">O que funcionou e o que não funcionou? Examinar resultados, dificuldades e descobertas do processo.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500/20 text-green-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Projetar próximos passos</strong>
                  <span className="text-slate-400">O que faremos diferente? Definir ações futuras com base nas lições aprendidas.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Formatos de Aplicação</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-3xl block mb-2">📓</span>
                <strong className="text-white text-sm block">Diários Reflexivos</strong>
                <p className="text-slate-400 text-xs mt-1">Registros individuais sobre o processo de aprendizagem.</p>
              </div>
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-3xl block mb-2">🔄</span>
                <strong className="text-white text-sm block">Rodas de Conversa</strong>
                <p className="text-slate-400 text-xs mt-1">Discussões coletivas sobre desafios e descobertas.</p>
              </div>
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-3xl block mb-2">🎨</span>
                <strong className="text-white text-sm block">Registros Multimodais</strong>
                <p className="text-slate-400 text-xs mt-1">Murais digitais, vídeos, desenhos e outros formatos criativos.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividades</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold mb-2">
                  <span>📓</span> Diário de Bordo
                </h4>
                <p className="text-slate-300 text-sm">Cada estudante relata o que aprendeu e como aprendeu durante o projeto.</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold mb-2">
                  <span>🔄</span> Roda de Conversa
                </h4>
                <p className="text-slate-300 text-sm">Dinâmica sobre desafios enfrentados no projeto e estratégias de superação.</p>
              </div>
              <div className="bg-violet-900/20 border border-violet-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-violet-300 font-bold mb-2">
                  <span>✅</span> Checklist Coletivo
                </h4>
                <p className="text-slate-300 text-sm">Criação de lições aprendidas para aplicar em futuros projetos.</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;A reflexão transforma experiências em aprendizagens. Como você pode incorporar momentos de RE na sua prática cotidiana, mesmo em atividades simples?&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Aplicar a técnica de Reflexão Estruturada (RE) para consolidar aprendizagens em projetos.",
              "Estimular a metacognição, promovendo que os alunos reflitam sobre seu próprio processo de aprendizagem.",
              "Planejar momentos de avaliação contínua que considerem diferentes dimensões da experiência dos estudantes.",
            ]
          },
          { label: "Conteúdos", content: "O que é Reflexão Estruturada; etapas da RE (descrever, analisar, projetar); formatos de aplicação (diários, rodas de conversa, registros multimodais); conexão entre reflexão e avaliação formativa." },
          {
            label: "Atividades", content: [
              "Registro em diário de bordo: cada estudante relata o que aprendeu e como aprendeu.",
              "Dinâmica de roda de conversa sobre desafios enfrentados no projeto.",
              "Criação de checklist coletivo com lições aprendidas para futuros projetos.",
            ]
          },
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
        title: "Unidade 4.1 • Matriz de Competências e Progressão (2h)",
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1974&auto=format&fit=crop"
                alt="Matriz de competências e avaliação"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                Matriz de Competências e Progressão
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              A matriz de competências é uma ferramenta que permite organizar de forma sistemática o desenvolvimento das habilidades dos estudantes em Pensamento Computacional. Cada nível de proficiência descreve expectativas claras, ajudando professores a planejar atividades e avaliar progressos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-blue-400 font-bold text-lg mb-2">📊 Organização Sistemática</h4>
                <p className="text-slate-300">Facilita o acompanhamento do aprendizado, a identificação de lacunas e a adaptação de estratégias pedagógicas.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-green-400 font-bold text-lg mb-2">📈 Progressão Clara</h4>
                <p className="text-slate-300">Garante que cada aluno avance de forma consistente em direção a competências mais complexas, com expectativas bem definidas.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Níveis de Proficiência</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl text-center">
                <span className="text-2xl block mb-2">🌱</span>
                <strong className="text-red-300 text-sm block">Iniciante</strong>
                <p className="text-slate-400 text-xs mt-1">Reconhece conceitos básicos</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-xl text-center">
                <span className="text-2xl block mb-2">🌿</span>
                <strong className="text-amber-300 text-sm block">Básico</strong>
                <p className="text-slate-400 text-xs mt-1">Aplica com apoio</p>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl text-center">
                <span className="text-2xl block mb-2">🌳</span>
                <strong className="text-blue-300 text-sm block">Intermediário</strong>
                <p className="text-slate-400 text-xs mt-1">Aplica com autonomia</p>
              </div>
              <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-xl text-center">
                <span className="text-2xl block mb-2">🏆</span>
                <strong className="text-green-300 text-sm block">Proficiente</strong>
                <p className="text-slate-400 text-xs mt-1">Cria e transfere</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Conteúdos Abordados</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-blue-500/20 text-blue-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Estrutura de matrizes de competências</strong>
                  <span className="text-slate-400">Como organizar habilidades em uma estrutura clara e escalável por níveis.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500/20 text-green-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Definição de níveis de proficiência</strong>
                  <span className="text-slate-400">Descritores claros para cada nível: o que o aluno sabe, faz e demonstra.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Evidências por pilar do PC</strong>
                  <span className="text-slate-400">Identificação de evidências observáveis alinhadas a cada pilar do Pensamento Computacional.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500/20 text-orange-300 p-2 rounded-lg font-bold">4</span>
                <div>
                  <strong className="text-white block">Integração curricular</strong>
                  <span className="text-slate-400">Conexão com objetivos curriculares e interdisciplinaridade para avaliação contextualizada.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividades</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold text-lg mb-2">
                  <span>🗺️</span> Mapeamento de Evidências
                </h4>
                <p className="text-slate-300">Mapeamento coletivo de evidências de aprendizagem para cada pilar do PC — decomposição, padrões, abstração e algoritmos.</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold text-lg mb-2">
                  <span>📋</span> Construção da Matriz
                </h4>
                <p className="text-slate-300">Construção de uma matriz de progressão por níveis, alinhando competências, objetivos e evidências observáveis.</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;Como a matriz de competências pode ajudar a personalizar o acompanhamento de cada aluno na sua turma?&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Construir uma matriz de competências por níveis (iniciante, básico, intermediário, proficiente).",
              "Relacionar competências do PC com evidências observáveis de aprendizagem.",
              "Organizar a progressão das habilidades de forma clara e escalonada.",
            ]
          },
          { label: "Conteúdos", content: "Estrutura de matrizes de competências; definição de níveis de proficiência; identificação de evidências por pilar do PC; integração com objetivos curriculares." },
          {
            label: "Atividades", content: [
              "Mapeamento coletivo de evidências de aprendizagem para cada pilar do PC.",
              "Construção de uma matriz de progressão por níveis, alinhando competências, objetivos e evidências.",
            ]
          },
        ],
      },
      {
        title: "Unidade 4.2 • Instrumentos e Rubricas (2h)",
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1974&auto=format&fit=crop"
                alt="Instrumentos de avaliação e rubricas"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                Instrumentos e Rubricas
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              Rubricas e instrumentos de avaliação oferecem um caminho claro para identificar e medir competências. Elas tornam o processo de avaliação transparente, apoiando o aprendizado contínuo e garantindo feedback útil e consistente.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-purple-400 font-bold text-lg mb-2">🔍 Transparência</h4>
                <p className="text-slate-300">Professores e estudantes compreendem claramente as expectativas e critérios de avaliação, promovendo justiça e equidade.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-cyan-400 font-bold text-lg mb-2">📝 Avaliação Formativa</h4>
                <p className="text-slate-300">A avaliação apoia o aprendizado contínuo, não apenas o resultado final — oferecendo devolutivas construtivas ao longo do processo.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Tipos de Instrumentos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-2xl block mb-2">👁️</span>
                <strong className="text-white text-sm block">Observação</strong>
                <p className="text-slate-400 text-xs mt-1">Registro direto do desempenho</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-2xl block mb-2">📁</span>
                <strong className="text-white text-sm block">Portfólio</strong>
                <p className="text-slate-400 text-xs mt-1">Coleção de trabalhos e evidências</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-2xl block mb-2">🔧</span>
                <strong className="text-white text-sm block">Atividades Práticas</strong>
                <p className="text-slate-400 text-xs mt-1">Tarefas autênticas e contextualizadas</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-2xl block mb-2">📝</span>
                <strong className="text-white text-sm block">Questionários</strong>
                <p className="text-slate-400 text-xs mt-1">Verificação de conhecimentos</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Conteúdos Abordados</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Tipos de instrumentos</strong>
                  <span className="text-slate-400">Observação, portfólio, atividades práticas, questionários — cada um com finalidade e contexto específicos.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500/20 text-blue-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Estrutura de rubricas</strong>
                  <span className="text-slate-400">Descritores por nível, critérios claros e objetivos que orientam a avaliação de competências.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500/20 text-green-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Adaptação para diferentes realidades</strong>
                  <span className="text-slate-400">Como ajustar instrumentos para diferentes recursos, contextos escolares e necessidades dos alunos.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividades</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold text-lg mb-2">
                  <span>📐</span> Construção de Rubricas
                </h4>
                <p className="text-slate-300">Desenvolvimento de rubricas para avaliação de atividades práticas em PC, com descritores claros por nível.</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold text-lg mb-2">
                  <span>🔄</span> Análise Comparativa
                </h4>
                <p className="text-slate-300">Análise comparativa de instrumentos existentes e adaptação para o contexto da turma, com validação por pares.</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;Como suas rubricas podem ser ao mesmo tempo rigorosas e acessíveis para que os próprios alunos compreendam os critérios?&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Selecionar instrumentos de avaliação adequados para evidenciar competências em PC.",
              "Criar rubricas claras e objetivas para cada nível de proficiência.",
              "Garantir critérios consistentes e transparentes de avaliação formativa.",
            ]
          },
          { label: "Conteúdos", content: "Tipos de instrumentos (observação, portfólio, atividades práticas, questionários); estrutura de rubricas; adaptação para diferentes realidades." },
          {
            label: "Atividades", content: [
              "Desenvolvimento de rubricas para avaliação de atividades práticas em PC.",
              "Análise comparativa de instrumentos existentes e adaptação para o contexto da turma.",
            ]
          },
        ],
      },
      {
        title: "Unidade 4.3 • Feedback e Autoavaliação (2h)",
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1974&auto=format&fit=crop"
                alt="Feedback e autoavaliação em sala de aula"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                Feedback e Autoavaliação
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              O feedback contínuo e a autoavaliação são essenciais para promover o desenvolvimento das competências em Pensamento Computacional. O feedback oferece informações sobre desempenho e caminhos de melhoria, enquanto a autoavaliação incentiva a metacognição.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-green-400 font-bold text-lg mb-2">💬 Feedback Contínuo</h4>
                <p className="text-slate-300">Informações sobre desempenho e caminhos de melhoria — orientando o aluno ao longo de todo o processo de aprendizagem.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-orange-400 font-bold text-lg mb-2">🪞 Autoavaliação</h4>
                <p className="text-slate-300">Incentiva a metacognição — os alunos refletem sobre seu próprio aprendizado, reconhecem progressos e identificam pontos de melhoria.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Tipos de Feedback</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl text-center">
                <span className="text-2xl block mb-2">⚡</span>
                <strong className="text-blue-300 text-sm block">Imediato</strong>
                <p className="text-slate-400 text-xs mt-1">Resposta no momento da ação</p>
              </div>
              <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-xl text-center">
                <span className="text-2xl block mb-2">📝</span>
                <strong className="text-green-300 text-sm block">Formativo</strong>
                <p className="text-slate-400 text-xs mt-1">Orientação para o aprendizado</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-xl text-center">
                <span className="text-2xl block mb-2">🔧</span>
                <strong className="text-amber-300 text-sm block">Corretivo</strong>
                <p className="text-slate-400 text-xs mt-1">Ajuste de erros e lacunas</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-xl text-center">
                <span className="text-2xl block mb-2">⭐</span>
                <strong className="text-emerald-300 text-sm block">Positivo</strong>
                <p className="text-slate-400 text-xs mt-1">Valorização de acertos</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Estratégias de Autoavaliação</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-orange-500/20 text-orange-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Checklists de autoavaliação</strong>
                  <span className="text-slate-400">Listas de verificação que o aluno preenche para avaliar seu próprio desempenho em cada competência.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Diários reflexivos</strong>
                  <span className="text-slate-400">Registros periódicos sobre o processo de aprendizagem, dificuldades e descobertas.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Rubricas de autoavaliação</strong>
                  <span className="text-slate-400">O aluno usa a própria rubrica para situar seu nível de proficiência e definir metas de melhoria.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividades</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold mb-2">
                  <span>🤝</span> Feedback entre Pares
                </h4>
                <p className="text-slate-300 text-sm">Simulação de feedback entre colegas sobre atividades de PC realizadas.</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold mb-2">
                  <span>✅</span> Autoavaliação Prática
                </h4>
                <p className="text-slate-300 text-sm">Exercícios de autoavaliação usando checklists e rubricas desenvolvidas na unidade anterior.</p>
              </div>
              <div className="bg-violet-900/20 border border-violet-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-violet-300 font-bold mb-2">
                  <span>💭</span> Melhoria Contínua
                </h4>
                <p className="text-slate-300 text-sm">Discussão em grupo sobre estratégias de melhoria contínua com base nas avaliações realizadas.</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;Quando integrados à matriz de competências, feedback e autoavaliação fortalecem a aprendizagem orientada por evidências. Como você pode implementar esses ciclos na sua rotina?&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Aplicar estratégias de feedback construtivo e contínuo.",
              "Incentivar a autoavaliação dos estudantes como ferramenta de aprendizagem.",
              "Integrar feedback e autoavaliação à matriz de competências.",
            ]
          },
          { label: "Conteúdos", content: "Tipos de feedback (imediato, formativo, corretivo, positivo); estratégias de autoavaliação (checklists, diários reflexivos, rubricas); conexão entre feedback e progressão de competências." },
          {
            label: "Atividades", content: [
              "Simulação de feedback entre colegas sobre atividades de PC.",
              "Exercícios de autoavaliação usando checklists e rubricas desenvolvidas.",
              "Discussão em grupo sobre estratégias de melhoria contínua.",
            ]
          },
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
        modalContent: (
          <div className="space-y-6">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1974&auto=format&fit=crop"
                alt="Apresentação e compartilhamento de práticas"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white shadow-black drop-shadow-lg">
                Showcase e Banco de Práticas
              </h3>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed">
              O compartilhamento de experiências pedagógicas é uma etapa crucial para consolidar a aprendizagem e ampliar o impacto do Pensamento Computacional. Ao documentar e publicar práticas em um repositório estruturado, os professores possibilitam que outros educadores utilizem, adaptem e aperfeiçoem essas atividades.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-amber-400 font-bold text-lg mb-2">🌐 Colaboração Aberta</h4>
                <p className="text-slate-300">O uso de licenças adequadas garante o respeito aos direitos autorais e permite que práticas sejam reutilizadas de forma ética e responsável.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-green-400 font-bold text-lg mb-2">🔄 Replicabilidade</h4>
                <p className="text-slate-300">A ficha-padrão garante que todas as informações essenciais sejam registradas de forma organizada, facilitando a replicação em contextos diversos.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Formatos de Showcase</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-900/20 border border-purple-500/30 p-5 rounded-xl text-center">
                <span className="text-3xl block mb-2">🎤</span>
                <strong className="text-purple-300 block mb-1">PechaKucha</strong>
                <p className="text-slate-400 text-xs">20 imagens × 20 segundos = 6min40s de apresentação dinâmica e envolvente.</p>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/30 p-5 rounded-xl text-center">
                <span className="text-3xl block mb-2">🖼️</span>
                <strong className="text-blue-300 block mb-1">Galeria de Ideias</strong>
                <p className="text-slate-400 text-xs">Painéis, murais digitais e exposições interativas para explorar as práticas criadas.</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-xl text-center">
                <span className="text-3xl block mb-2">📊</span>
                <strong className="text-emerald-300 block mb-1">Apresentação Oral</strong>
                <p className="text-slate-400 text-xs">Vídeos, protótipos ou apresentações tradicionais com espaço para perguntas e feedback.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Estrutura da Ficha-Padrão</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-blue-500/20 text-blue-300 p-2 rounded-lg font-bold">1</span>
                <div>
                  <strong className="text-white block">Contexto</strong>
                  <span className="text-slate-400">Descrição da turma, disciplina, série e cenário em que a prática foi aplicada.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500/20 text-green-300 p-2 rounded-lg font-bold">2</span>
                <div>
                  <strong className="text-white block">Objetivos</strong>
                  <span className="text-slate-400">Competências e habilidades que a prática busca desenvolver nos estudantes.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-amber-500/20 text-amber-300 p-2 rounded-lg font-bold">3</span>
                <div>
                  <strong className="text-white block">Passo a Passo</strong>
                  <span className="text-slate-400">Descrição detalhada das etapas, recursos necessários e organização da atividade.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg font-bold">4</span>
                <div>
                  <strong className="text-white block">RE e Avaliação</strong>
                  <span className="text-slate-400">Estratégias de Reflexão Estruturada e critérios de avaliação utilizados.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-red-500/20 text-red-300 p-2 rounded-lg font-bold">5</span>
                <div>
                  <strong className="text-white block">Anexos</strong>
                  <span className="text-slate-400">Materiais complementares: fotos, vídeos, modelos, rubricas e exemplos de produções.</span>
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Atividades</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-emerald-300 font-bold mb-2">
                  <span>🎤</span> Showcase
                </h4>
                <p className="text-slate-300 text-sm">Apresentação de práticas pedagógicas usando PechaKucha ou exposição em galeria.</p>
              </div>
              <div className="bg-amber-900/20 border border-amber-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold mb-2">
                  <span>📝</span> Ficha-Padrão
                </h4>
                <p className="text-slate-300 text-sm">Preenchimento da ficha completa: contexto, objetivos, passo a passo, RE, avaliação e anexos.</p>
              </div>
              <div className="bg-violet-900/20 border border-violet-500/30 p-5 rounded-xl">
                <h4 className="flex items-center gap-2 text-violet-300 font-bold mb-2">
                  <span>💭</span> Discussão Coletiva
                </h4>
                <p className="text-slate-300 text-sm">Debate sobre possíveis adaptações e melhorias das práticas apresentadas pelos colegas.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Produtos Finais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-green-300 font-bold text-lg mb-2">
                  <span>📚</span> Prática Publicada
                </h4>
                <p className="text-slate-300">Prática pedagógica documentada e publicada no repositório MAPEAR, acessível a outros educadores.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 p-6 rounded-xl">
                <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                  <span>🔄</span> Plano de Replicação
                </h4>
                <p className="text-slate-300">Plano de replicação da prática em outra turma ou área do conhecimento, com adaptações documentadas.</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
              <h4 className="flex items-center gap-2 text-blue-300 font-bold text-lg mb-2">
                <span>💡</span> Para Refletir
              </h4>
              <p className="text-slate-300 italic">
                &ldquo;Ao compartilhar sua prática, você não apenas consolida seu aprendizado, mas abre caminho para que outros educadores transformem suas salas de aula. Qual prática sua você gostaria que fosse replicada por todo o país?&rdquo;
              </p>
            </div>
          </div>
        ),
        sections: [
          {
            label: "Objetivos", content: [
              "Documentar e publicar práticas pedagógicas em Pensamento Computacional.",
              "Aprender a licenciar e compartilhar conteúdos de forma ética e responsável.",
              "Criar materiais replicáveis que possam ser utilizados em outras turmas ou áreas.",
            ]
          },
          { label: "Conteúdos", content: "Formatos de showcase (PechaKucha, galeria de ideias); banco de práticas com ficha-padrão; publicação e licenciamento; replicabilidade." },
          {
            label: "Atividades", content: [
              "Apresentação de práticas pedagógicas usando PechaKucha ou exposição em galeria.",
              "Preenchimento da ficha-padrão para cada prática (contexto, objetivos, passo a passo, RE, avaliação, anexos).",
              "Discussão coletiva sobre possíveis adaptações e melhorias das práticas apresentadas.",
            ]
          },
          { label: "Produtos", content: "Prática pedagógica publicada no repositório MAPEAR + plano de replicação em outra turma ou área." },
        ],
      },
    ],
  },
];

function LessonModal({ unit, onClose, onComplete, lessonId, lessonProgress }: { unit: CourseUnit; onClose: () => void; onComplete: () => void; lessonId: string | null; lessonProgress: Record<string, CourseLessonStatus> }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const isCompleted = lessonId ? lessonProgress[lessonId] === 'completed' : false;

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
            onClick={onComplete}
            disabled={isCompleted}
            className={`px-6 py-2 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2 ${isCompleted
              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20 hover:scale-105'
              }`}
          >
            <span>{isCompleted ? 'Aula Concluída' : 'Concluir Aula'}</span>
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
          lessonId={activeLessonId}
          lessonProgress={lessonProgress}
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