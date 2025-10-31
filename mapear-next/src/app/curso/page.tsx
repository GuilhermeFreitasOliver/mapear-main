"use client";

export default function CursoPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <>
      {/* Navegação rápida do curso */}
      <nav className="sub-nav" aria-label="Navegação do curso">
        <a href="#topo">Topo</a>
        <a href="#programa">Programa</a>
        <a href="#mod1">Módulo 1</a>
        <a href="#mod2">Módulo 2</a>
        <a href="#mod3">Módulo 3</a>
        <a href="#mod4">Módulo 4</a>
        <a href="#mod5">Módulo 5</a>
        <a href="#avaliacao">Matriz</a>
        <a href="#cronograma">Cronograma</a>
        <a href="#recursos">Recursos</a>
        <a href="#baralho">Baralho</a>
        <a href="#faq">FAQ</a>
      </nav>

      <div id="topo" className="wrap">
        {/* Cabeçalho do Curso */}
        <section className="card" aria-labelledby="titulo">
          <span className="badge">Formação Docente • MAPEAR</span>
          <h1 id="titulo">Curso de Formação MAPEAR</h1>
          <h3>
            Presencial, híbrido ou EAD. Um percurso formativo para implementar o
            <strong> Pensamento Computacional (PC)</strong> na Educação Básica com 
            mediação ativa e <strong> Robótica Educacional (RE)</strong>, combinando 
            ferramentas digitais e atividades desplugadas, avaliação por competências 
            e um banco colaborativo de práticas.
          </h3>
          <div className="cta-row" role="group" aria-label="Ações da página">
            <button className="btn" onClick={handlePrint}>Imprimir/Salvar em PDF</button>
            <a className="btn secondary" href="/Artefatos.zip" download>
              Baixar Artefatos (ZIP)
            </a>
          </div>
        </section>

        {/* Visão geral (KPIs + Objetivos) */}
        <section className="grid" aria-label="Visão geral">
          <div className="grid cols-3">
            <div className="card kpi"><strong>Carga horária</strong><span className="pill">30h • sugerido</span></div>
            <div className="card kpi"><strong>Público-alvo</strong><span className="pill">Professores em Formação Inicial ou Continuada</span></div>
            <div className="card kpi"><strong>Modalidades</strong><span className="pill">Presencial • Híbrido • EAD</span></div>
          </div>
          <div className="card">
            <h2>Objetivos</h2>
            <ul>
              <li>Compreender fundamentos do PC e seus pilares (decomposição, padrões, abstração, algoritmos).</li>
              <li>Planejar sequências e projetos com <em>mediação ativa</em> e momentos de <strong>RE</strong>.</li>
              <li>Selecionar ferramentas digitais e propor atividades desplugadas alinhadas à BNCC.</li>
              <li>Desenhar estratégias e instrumentos de avaliação por competências.</li>
              <li>Construir e compartilhar um banco aberto de práticas MAPEAR.</li>
            </ul>
          </div>
        </section>

        <div className="divider"></div>

        {/* Programa detalhado */}
        <section id="programa" aria-labelledby="programa-t">
          <h2 id="programa-t">Programa detalhado</h2>
          <p className="muted">Cada módulo inclui objetivos de aprendizagem, conteúdos, atividades (presencial/EAD), RE (Robótica Educacional), avaliação formativa e recursos.</p>

          {/* Módulo 1 */}
          <article id="mod1" className="stack">
            <h3>✦ Módulo 1 — Fundamentos do PC na Educação Básica (6h)</h3>
            <details open>
              <summary>Unidade 1.1 • PC e BNCC: por que e para quê (2h)</summary>
              <div className="unit">
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
              <div className="unit">
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
              <div className="unit">
                <dl>
                  <dt>Objetivos</dt><dd>Planejar experiências acessíveis e inclusivas.</dd>
                  <dt>Atividades</dt><dd>Checklist de acessibilidade; adaptação de atividade para baixa visão e TDAH.</dd>
                  <dt>RE</dt><dd>Matriz 2×2: impacto x esforço de adaptações.</dd>
                  <dt>Avaliação</dt><dd>Plano de ação individual com metas SMART.</dd>
                </dl>
              </div>
            </details>
            <div className="cta-row">
              <a className="btn secondary" href="/Modulo_1.pdf" target="_blank" rel="noopener">Abrir módulo 1</a>
            </div>
          </article>

          {/* Módulo 2 */}
          <article id="mod2" className="stack">
            <h3>✦ Módulo 2 — Ferramentas Digitais e Atividades Desplugadas (8h)</h3>
            <details open>
              <summary>Unidade 2.1 • Ecossistema de ferramentas (2h)</summary>
              <div className="unit">
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
              <div className="unit">
                <dl>
                  <dt>Objetivos</dt><dd>Conduzir dinâmicas desplugadas para desenvolver raciocínio algorítmico.</dd>
                  <dt>Atividades</dt><dd>Percurso em grade, cartas &quot;Se/Então&quot;, debug humano, sorting network com cordas.</dd>
                  <dt>RE</dt><dd>Roda de conversa sobre transferência para leitura, escrita e matemática.</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 2.3 • Trilhas digitais guiadas (3h)</summary>
              <div className="unit">
                <dl>
                  <dt>Objetivos</dt><dd>Experimentar sequências curtas em Scratch/planilhas/Micro:bit.</dd>
                  <dt>Atividades</dt><dd>Mini-desafios por níveis; pares programadores; &quot;stop & share&quot;.</dd>
                  <dt>RE</dt><dd>Robótica Educacional: o que manter, adaptar, eliminar.</dd>
                </dl>
              </div>
            </details>
            <div className="cta-row">
              <a className="btn secondary" href="/Modulo_2.pdf" target="_blank" rel="noopener">Abrir módulo 2</a>
            </div>
          </article>

          {/* Módulo 3 */}
          <article id="mod3" className="stack">
            <h3>✦ Módulo 3 — Planejamento de Projetos com Mediação Ativa e Robótica Educacional (8h)</h3>
            <details open>
              <summary>Unidade 3.1 • MAPEAR um projeto (2h)</summary>
              <div className="unit">
                <dl>
                  <dt>Objetivos</dt><dd>Aplicar a metodologia MAPEAR para desenhar projetos interdisciplinares.</dd>
                  <dt>Conteúdos</dt><dd>Problema-motriz; perguntas orientadoras; critérios de sucesso; produto público.</dd>
                  <dt>Atividades</dt><dd>Canvas do projeto; definição de evidências de aprendizagem por competência.</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 3.2 • Mediação ativa e protocolos de sala (3h)</summary>
              <div className="unit">
                <dl>
                  <dt>Objetivos</dt><dd>Conduzir protocolos: pense-compartilhe, galerias, crítica amigável, check-ins.</dd>
                  <dt>Atividades</dt><dd>Simulações de facilitação; plano de mediação por etapa.</dd>
                  <dt>RE</dt><dd>Após cada simulação, registrar &quot;o que observei, o que faria diferente&quot;.</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 3.3 • RE — Robótica Educacional (3h)</summary>
              <div className="unit">
                <dl>
                  <dt>Objetivos</dt><dd>Planejar, montar e testar protótipos robóticos simples.</dd>
                  <dt>Atividades</dt><dd>Aplicar princípios de segurança elétrica e mecânica. Desenvolver habilidades de resolução de problemas por meio de depuração (debugging) e iteração</dd>
                  <dt>Produtos</dt><dd>Protótipo funcional (carrinho/robô experimental) com esquema de ligação e lista de componentes.</dd>
                </dl>
              </div>
            </details>
            <div className="cta-row">
              <a className="btn secondary" href="/Modulo_3.pdf" target="_blank" rel="noopener">Abrir módulo 3</a>
            </div>
          </article>

          {/* Módulo 4 */}
          <article id="mod4" className="stack">
            <h3>✦ Módulo 4 — Estratégias de Avaliação de Competências Computacionais (6h)</h3>
            <details open>
              <summary>Unidade 4.1 • Matriz de competências e progressão (2h)</summary>
              <div className="unit">
                <dl>
                  <dt>Objetivos</dt><dd>Construir uma matriz por níveis (iniciante, básico, intermediário, proficiente).</dd>
                  <dt>Atividades</dt><dd>Mapeamento de evidências por pilar do PC; alinhamento a objetivos.</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 4.2 • Instrumentos e rubricas (2h)</summary>
              <div className="unit">
                <dl>
                  <dt>Objetivos</dt><dd>Elaborar rubricas claras e tarefas autênticas.</dd>
                  <dt>Atividades</dt><dd>Construção de rubrica; validação por pares; critérios de acessibilidade.</dd>
                </dl>
              </div>
            </details>
            <details>
              <summary>Unidade 4.3 • Feedback e autoavaliação (2h)</summary>
              <div className="unit">
                <dl>
                  <dt>Objetivos</dt><dd>Implementar ciclos de feedback formativo e autoavaliação.</dd>
                  <dt>Atividades</dt><dd>Quadro de feedback &quot;Eu observei / Sugiro / Pergunto&quot;; checklists de qualidade.</dd>
                </dl>
              </div>
            </details>
            <div className="cta-row">
              <a className="btn secondary" href="/Modulo_4.pdf" target="_blank" rel="noopener">Abrir módulo 4</a>
            </div>
          </article>

          {/* Módulo 5 */}
          <article id="mod5" className="stack">
            <h3>✦ Módulo 5 — Compartilhamento de experiências e banco de práticas (2h)</h3>
            <details open>
              <summary>Unidade 5.1 • Showcase e Banco de Práticas (2h)</summary>
              <div className="unit">
                <dl>
                  <dt>Objetivos</dt><dd>Documentar, publicar e licenciar práticas no repositório MAPEAR.</dd>
                  <dt>Atividades</dt><dd>PechaKucha/galeria; ficha-padrão (contexto, objetivos, passo a passo, RE, avaliação, anexos).</dd>
                  <dt>Produtos</dt><dd>Prática publicada + plano de replicação em outra turma/área.</dd>
                </dl>
              </div>
            </details>
            <div className="cta-row">
              <a className="btn secondary" href="/Modulo_5.pdf" target="_blank" rel="noopener">Abrir módulo 5</a>
            </div>
          </article>
        </section>

        <div className="divider"></div>

        {/* Avaliação: Matriz de competências */}
        <section id="avaliacao" aria-labelledby="av-t">
          <h2 id="av-t">Matriz de competências (exemplo)</h2>
          <div className="notice">Use e adapte conforme seu contexto. Inclui critérios transversais: colaboração, comunicação, ética digital e acessibilidade.</div>
          <div className="stack">
            <div className="card">
              <div className="table-wrap">
                <table className="rubric" aria-label="Matriz de competências de PC">
                  <thead>
                    <tr><th>Competência</th><th>Iniciante</th><th>Básico</th><th>Intermediário</th><th>Proficiente</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Decomposição</td>
                      <td>Reconhece tarefas grandes.</td>
                      <td>Separa em 2–3 partes simples.</td>
                      <td>Estrutura etapas com dependências.</td>
                      <td>Refatora e otimiza o plano.</td>
                    </tr>
                    <tr>
                      <td>Padrões</td>
                      <td>Identifica semelhanças simples.</td>
                      <td>Classifica exemplos recorrentes.</td>
                      <td>Generaliza para novas situações.</td>
                      <td>Cria modelos reutilizáveis.</td>
                    </tr>
                    <tr>
                      <td>Abstração</td>
                      <td>Diferencia dados essenciais e supérfluos.</td>
                      <td>Cria representações básicas (tabela/diagrama).</td>
                      <td>Escolhe abstrações adequadas ao público.</td>
                      <td>Transita entre níveis de abstração.</td>
                    </tr>
                    <tr>
                      <td>Algoritmos</td>
                      <td>Segue sequências simples.</td>
                      <td>Escreve instruções claras.</td>
                      <td>Usa estruturas condicionais/repetição.</td>
                      <td>Refina com testes e depuração.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* Cronograma e rubrica resumida */}
        <section id="cronograma" aria-labelledby="crono-t">
          <div className="two">
            <div className="card">
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
            <div className="card">
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

        <div className="divider"></div>

        {/* Recursos e modelos prontos */}
        <section id="recursos" aria-labelledby="recursos-t">
          <h2 id="recursos-t">Recursos e modelos prontos</h2>
          <div className="two">
            <div className="card">
              <h3>Modelos editáveis</h3>
              <ul>
                <li>Canvas de projeto MAPEAR</li>
                <li>Roteiro de RE (antes/durante/depois)</li>
                <li>Rubrica de PC (padrão)</li>
                <li>Checklist de acessibilidade didática</li>
              </ul>
            </div>
            <div className="card">
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

        <div className="divider"></div>

        {/* Baralho Pedagógico (amostra reduzida) */}
        <section id="baralho" aria-labelledby="baralho-t">
          <h2 id="baralho-t">Baralho Pedagógico</h2>
          <div className="cta-row">
            <button className="btn secondary" disabled>Baixar baralho (em breve)</button>
          </div>
          <div className="deck" role="list">
            <div className="card-deck" role="listitem">
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

            <div className="card-deck" role="listitem">
              <h4>Motivação</h4>
              <svg viewBox="0 0 160 110" aria-hidden="true">
                <circle cx="80" cy="55" r="38" fill="#f59e0b33" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="68" cy="47" r="4" fill="#0b1020" />
                <circle cx="92" cy="47" r="4" fill="#0b1020" />
                <path d="M62 65 Q80 78 98 65" fill="none" stroke="#0b1020" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <p>Incentive os estudantes a persistirem diante de desafios.</p>
            </div>

            <div className="card-deck" role="listitem">
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

        <div className="divider"></div>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-t">
          <h2 id="faq-t">FAQ</h2>
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

        <footer className="footer">
          Arcabouço Pedagógico MAPEAR — Aprendizagem ativa, reflexiva e colaborativa
        </footer>
      </div>
    </>
  );
}