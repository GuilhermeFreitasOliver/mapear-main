"use client";

export default function CursoPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <>
      {/* Navegação rápida do curso */}
      <nav
        aria-label="Navegação do curso"
        className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3 text-white"
      >
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#topo">Topo</a>
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#programa">Programa</a>
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#mod1">Módulo 1</a>
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#mod2">Módulo 2</a>
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#mod3">Módulo 3</a>
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#mod4">Módulo 4</a>
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#mod5">Módulo 5</a>
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#avaliacao">Matriz</a>
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#cronograma">Cronograma</a>
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#recursos">Recursos</a>
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#baralho">Baralho</a>
        <a className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-blue-500/10" href="#faq">FAQ</a>
      </nav>

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

        {/* Programa detalhado */}
        <section id="programa" aria-labelledby="programa-t">
          <h2 id="programa-t" className="text-xl sm:text-2xl font-semibold text-white">Programa detalhado</h2>
          <p className="text-gray-400">Cada módulo inclui objetivos de aprendizagem, conteúdos, atividades (presencial/EAD), RE (Robótica Educacional), avaliação formativa e recursos.</p>

          {/* Módulo 1 */}
          <article id="mod1" className="space-y-2 mt-4">
            <h3>✦ Módulo 1 — Fundamentos do PC na Educação Básica (6h)</h3>
            <details open>
              <summary>Unidade 1.1 • PC e BNCC: por que e para quê (2h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Relacionar PC à BNCC e a práticas interdisciplinares; diferenciar PC de programação.</dd>
                  <dt>Conteúdos</dt><dd>Conceitos; pilares do PC; transposição didática; exemplos em Línguas, Matemática, Ciências e Artes.</dd>
                  <dt>Atividades</dt><dd>
                    <ul>
                      <li><strong>Presencial/EAD:</strong> Mapa mental colaborativo (Jamboard/Quadro) sobre usos do PC.</li>
                      <li><strong>Desplugada:</strong> Classificação de problemas por decomposição com cartões.</li>
                    </ul>
                  </dd>
                  <dt>RE</dt><dd>Diário rápido: &quot;Que evidências de PC já existem na minha prática?&quot;</dd>
                  <dt>Avaliação</dt><dd>Checklist de compreensão + participação no mapa mental.</dd>
                  <dt>Recursos</dt><dd>Quadro físico/virtual, cartões, projetor, rubrica rápida.</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 1.2 • Pilares: decomposição, padrões, abstração, algoritmos (2h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Aplicar os quatro pilares em situações do cotidiano escolar.</dd>
                  <dt>Atividades</dt><dd>
                    <ul>
                      <li><strong>Desplugada:</strong> Algoritmo de sanduíche (instruções ambíguas vs. precisas).</li>
                      <li><strong>Digital:</strong> Fluxogramas simples (draw.io) para rotinas escolares.</li>
                    </ul>
                  </dd>
                  <dt>RE</dt><dd>Reflexão guiada: onde a precisão faz diferença no meu componente curricular?</dd>
                  <dt>Avaliação</dt><dd>Rubrica de uso dos pilares (iniciante → proficiente).</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 1.3 • Equidade e acessibilidade no PC (2h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Planejar experiências acessíveis e inclusivas.</dd>
                  <dt>Atividades</dt><dd>Checklist de acessibilidade; adaptação de atividade para baixa visão e TDAH.</dd>
                  <dt>RE</dt><dd>Matriz 2×2: impacto x esforço de adaptações.</dd>
                  <dt>Avaliação</dt><dd>Plano de ação individual com metas SMART.</dd>
                </dl>
              </div>
            </details>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/Modulo_1.pdf" target="_blank" rel="noopener">Abrir módulo 1</a>
            </div>
          </article>

          {/* Módulo 2 */}
          <article id="mod2" className="space-y-2 mt-4">
            <h3>✦ Módulo 2 — Ferramentas Digitais e Atividades Desplugadas (8h)</h3>
            <details open>
              <summary>Unidade 2.1 • Ecossistema de ferramentas (2h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Selecionar ferramentas alinhadas a objetivos e infraestrutura da escola.</dd>
                  <dt>Conteúdos</dt><dd>Blocos (Scratch), texto (Python introdutório), microcontroladores (Micro:bit), planilhas, simuladores, IA generativa com uso responsável.</dd>
                  <dt>Atividades</dt><dd>Roteiro de curadoria: critérios, alternativas offline/baixa banda.</dd>
                  <dt>RE</dt><dd>Canvas de decisão (custo, acessibilidade, curva de aprendizagem).</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 2.2 • Atividades desplugadas de PC (3h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Conduzir dinâmicas desplugadas para desenvolver raciocínio algorítmico.</dd>
                  <dt>Atividades</dt><dd>Percurso em grade, cartas &quot;Se/Então&quot;, debug humano, sorting network com cordas.</dd>
                  <dt>RE</dt><dd>Roda de conversa sobre transferência para leitura, escrita e matemática.</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 2.3 • Trilhas digitais guiadas (3h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Experimentar sequências curtas em Scratch/planilhas/Micro:bit.</dd>
                  <dt>Atividades</dt><dd>Mini-desafios por níveis; pares programadores; &quot;stop & share&quot;.</dd>
                  <dt>RE</dt><dd>Robótica Educacional: o que manter, adaptar, eliminar.</dd>
                </dl>
              </div>
            </details>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/Modulo_2.pdf" target="_blank" rel="noopener">Abrir módulo 2</a>
            </div>
          </article>

          {/* Módulo 3 */}
          <article id="mod3" className="space-y-2 mt-4">
            <h3>✦ Módulo 3 — Planejamento de Projetos com Mediação Ativa e Robótica Educacional (8h)</h3>
            <details open>
              <summary>Unidade 3.1 • MAPEAR um projeto (2h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Aplicar a metodologia MAPEAR para desenhar projetos interdisciplinares.</dd>
                  <dt>Conteúdos</dt><dd>Problema-motriz; perguntas orientadoras; critérios de sucesso; produto público.</dd>
                  <dt>Atividades</dt><dd>Canvas do projeto; definição de evidências de aprendizagem por competência.</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 3.2 • Mediação ativa e protocolos de sala (3h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Conduzir protocolos: pense-compartilhe, galerias, crítica amigável, check-ins.</dd>
                  <dt>Atividades</dt><dd>Simulações de facilitação; plano de mediação por etapa.</dd>
                  <dt>RE</dt><dd>Após cada simulação, registrar &quot;o que observei, o que faria diferente&quot;.</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 3.3 • RE — Robótica Educacional (3h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Planejar, montar e testar protótipos robóticos simples.</dd>
                  <dt>Atividades</dt><dd>Aplicar princípios de segurança elétrica e mecânica. Desenvolver habilidades de resolução de problemas por meio de depuração (debugging) e iteração</dd>
                  <dt>Produtos</dt><dd>Protótipo funcional (carrinho/robô experimental) com esquema de ligação e lista de componentes.</dd>
                </dl>
              </div>
            </details>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/Modulo_3.pdf" target="_blank" rel="noopener">Abrir módulo 3</a>
            </div>
          </article>

          {/* Módulo 4 */}
          <article id="mod4" className="space-y-2 mt-4">
            <h3>✦ Módulo 4 — Estratégias de Avaliação de Competências Computacionais (6h)</h3>
            <details open>
              <summary>Unidade 4.1 • Matriz de competências e progressão (2h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Construir uma matriz por níveis (iniciante, básico, intermediário, proficiente).</dd>
                  <dt>Atividades</dt><dd>Mapeamento de evidências por pilar do PC; alinhamento a objetivos.</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 4.2 • Instrumentos e rubricas (2h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Elaborar rubricas claras e tarefas autênticas.</dd>
                  <dt>Atividades</dt><dd>Construção de rubrica; validação por pares; critérios de acessibilidade.</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 4.3 • Feedback e autoavaliação (2h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Implementar ciclos de feedback formativo e autoavaliação.</dd>
                  <dt>Atividades</dt><dd>Quadro de feedback &quot;Eu observei / Sugiro / Pergunto&quot;; checklists de qualidade.</dd>
                </dl>
              </div>
            </details>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/Modulo_4.pdf" target="_blank" rel="noopener">Abrir módulo 4</a>
            </div>
          </article>

          {/* Módulo 5 */}
          <article id="mod5" className="space-y-2 mt-4">
            <h3>✦ Módulo 5 — Compartilhamento de experiências e banco de práticas (2h)</h3>
            <details open>
              <summary>Unidade 5.1 • Showcase e Banco de Práticas (2h)</summary>
              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <dl>
                  <dt>Objetivos</dt><dd>Documentar, publicar e licenciar práticas no repositório MAPEAR.</dd>
                  <dt>Atividades</dt><dd>PechaKucha/galeria; ficha-padrão (contexto, objetivos, passo a passo, RE, avaliação, anexos).</dd>
                  <dt>Produtos</dt><dd>Prática publicada + plano de replicação em outra turma/área.</dd>
                </dl>
              </div>
            </details>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/Modulo_5.pdf" target="_blank" rel="noopener">Abrir módulo 5</a>
            </div>
          </article>
        </section>

        <hr className="my-6 border-t border-slate-400/20" />

        {/* Avaliação: Matriz de competências */}
        <section id="avaliacao" aria-labelledby="av-t">
          <h2 id="av-t" className="text-xl sm:text-2xl font-semibold text-white">Matriz de competências (exemplo)</h2>
          <div className="mt-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-100 p-3">
            Use e adapte conforme seu contexto. Inclui critérios transversais: colaboração, comunicação, ética digital e acessibilidade.
          </div>
          <div className="mt-3">
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-3 text-white">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="px-3 py-2">Competência</th>
                      <th className="px-3 py-2">Iniciante</th>
                      <th className="px-3 py-2">Básico</th>
                      <th className="px-3 py-2">Intermediário</th>
                      <th className="px-3 py-2">Proficiente</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200">
                    <tr className="border-b border-white/10">
                      <td className="px-3 py-2">Decomposição</td>
                      <td className="px-3 py-2">Reconhece tarefas grandes.</td>
                      <td className="px-3 py-2">Separa em 2–3 partes simples.</td>
                      <td className="px-3 py-2">Estrutura etapas com dependências.</td>
                      <td className="px-3 py-2">Refatora e otimiza o plano.</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="px-3 py-2">Padrões</td>
                      <td className="px-3 py-2">Identifica semelhanças simples.</td>
                      <td className="px-3 py-2">Classifica exemplos recorrentes.</td>
                      <td className="px-3 py-2">Generaliza para novas situações.</td>
                      <td className="px-3 py-2">Cria modelos reutilizáveis.</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="px-3 py-2">Abstração</td>
                      <td className="px-3 py-2">Diferencia dados essenciais e supérfluos.</td>
                      <td className="px-3 py-2">Cria representações básicas (tabela/diagrama).</td>
                      <td className="px-3 py-2">Escolhe abstrações adequadas ao público.</td>
                      <td className="px-3 py-2">Transita entre níveis de abstração.</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">Algoritmos</td>
                      <td className="px-3 py-2">Segue sequências simples.</td>
                      <td className="px-3 py-2">Escreve instruções claras.</td>
                      <td className="px-3 py-2">Usa estruturas condicionais/repetição.</td>
                      <td className="px-3 py-2">Refina com testes e depuração.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                <li><strong>RE</strong>: momentos de metacognição antes/durante/depois.</li>
                <li><strong>Produto público</strong>: utilidade, clareza e documentação.</li>
                <li><strong>Feedback</strong>: ciclos e critérios transparentes.</li>
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

        {/* Baralho Pedagógico (amostra reduzida) */}
        <section id="baralho" aria-labelledby="baralho-t">
          <h2 id="baralho-t" className="text-xl sm:text-2xl font-semibold text-white">Baralho Pedagógico</h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white border border-white/20 opacity-60" disabled>
              Baixar baralho (em breve)
            </button>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3" role="list">
            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 text-white" role="listitem">
              <h4>Orientação</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <line x1="10" y1="90" x2="140" y2="90" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="140,90 130,85 130,95" fill="#eaf0ff"/>
                <line x1="20" y1="100" x2="20" y2="20" stroke="#eaf0ff" strokeWidth="3" />
                <polygon points="20,20 15,30 25,30" fill="#eaf0ff"/>
                <text x="95" y="105" fontSize="10" fill="#aab3d1">Você está aqui</text>
              </svg>
              <p>Forneça uma pista ou caminho inicial para orientar os alunos.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 text-white" role="listitem">
              <h4>Motivação</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="80" cy="55" r="38" fill="#f59e0b33" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="68" cy="47" r="4" fill="#0b1020" />
                <circle cx="92" cy="47" r="4" fill="#0b1020" />
                <path d="M62 65 Q80 78 98 65" fill="none" stroke="#0b1020" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <p>Incentive os estudantes a persistirem diante de desafios.</p>
            </div>

            <div className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 text-white" role="listitem">
              <h4>Colaboração Forçada</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="60" cy="55" r="26" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <circle cx="100" cy="55" r="26" fill="none" stroke="#eaf0ff" strokeWidth="2" />
                <circle cx="80" cy="35" r="26" fill="none" stroke="#eaf0ff" strokeWidth="2" />
              </svg>
              <p>Membros da equipe devem trabalhar juntos</p>
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