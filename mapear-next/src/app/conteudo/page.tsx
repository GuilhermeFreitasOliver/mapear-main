import Link from "next/link";
import Image from "next/image";

export default function Conteudo() {
  return (
    <>
      <section
        id="intro"
        className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-gray-200"
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Arcabouço Pedagógico MAPEAR — Pensamento Computacional
        </h1>
        <div className="mt-4 flex justify-center">
          <Image
            alt="Logo da Metodologia MAPEAR"
            src="/MAPEAR.png"
            width={512}
            height={256}
            className="h-56 sm:h-64 object-contain rounded-lg border border-slate-400/30 shadow-lg"
            priority
          />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link
            className="inline-flex items-center justify-center gap-2 font-extrabold tracking-wide px-4 py-4 rounded-xl text-white shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-blue-500/45 ring-1 ring-white/20 bg-[linear-gradient(135deg,#2563eb,#60a5fa_50%,#7c3aed)] text-lg"
            href="/curso"
          >
            Abrir Curso MAPEAR
          </Link>
          <Link
            className="inline-flex items-center justify-center gap-2 font-extrabold tracking-wide px-4 py-4 rounded-xl text-white shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-green-500/45 ring-1 ring-white/20 bg-[linear-gradient(135deg,#16a34a,#22c55e_50%,#10b981)] text-lg"
            href="/jogos"
          >
            Abrir Jogos MAPEAR
          </Link>
          <a
            className="inline-flex items-center justify-center gap-2 font-extrabold tracking-wide px-4 py-4 rounded-xl text-white shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-purple-500/45 ring-1 ring-white/20 bg-[linear-gradient(135deg,#6d28d9,#7c3aed_50%,#a78bfa)] text-lg"
            href="/Artefatos.zip"
            download
          >
            Baixar Artefatos (ZIP)
          </a>
        </div>
        <div className="mt-6 space-y-4 leading-relaxed">
          <p>O Arcabouço Pedagógico para o Ensino-Aprendizagem de Pensamento Computacional (MAPEAR) constitui uma proposta inovadora voltada ao ensino básico e à formação inicial e continuada de professores, com foco no desenvolvimento de competências associadas ao Pensamento Computacional (PC). Inspirada na metáfora de “traçar caminhos”, a proposta busca mapear o processo de aprendizagem por meio de ciclos de experimentação, investigação e reflexão, sempre conectados à prática pedagógica real.</p>
          <p>O Arcabouço Pedagógico MAPEAR integra princípios do Construcionismo e do Construtivismo, valorizando a construção ativa do conhecimento e a criação de artefatos tangíveis como estratégia de aprendizagem. Com isso, promove experiências pedagógicas reais, estimulando a autonomia, a colaboração e a reflexão crítica.</p>
        </div>
      </section>

      <section
        id="fases"
        className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-gray-200 mt-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-blue-400">
          Fases da Proposta MAPEAR
        </h2>
        <p className="text-slate-400 mt-2">A proposta organiza-se em seis fases formativas interdependentes, concebidas para criar um ciclo contínuo de aprendizagem:</p>
        <ol className="list-decimal list-inside ml-4 mt-4 space-y-6">
          <li className="space-y-2">
            <h3 className="inline text-lg font-semibold text-green-400">
              Motivar
            </h3>
            <p className="text-gray-200">
              Estimula o engajamento dos estudantes por meio de desafios contextualizados, conectando problemas reais ao uso do PC. Objetiva despertar curiosidade, interesse e protagonismo.
            </p>
          </li>
          <li className="space-y-2">
            <h3 className="inline text-lg font-semibold text-green-400">
              Apresentar Conceitos
            </h3>
            <p className="text-gray-200">
              Introdução estruturada e acessível dos fundamentos do PC — decomposição, abstração, reconhecimento de padrões e raciocínio algorítmico — utilizando exemplos concretos e experiências pedagógicas alinhadas à realidade dos participantes.
            </p>
          </li>
          <li className="space-y-2">
            <h3 className="inline text-lg font-semibold text-green-400">
              Planejar e Prototipar
            </h3>
            <p className="text-gray-200">
              Professores e alunos planejam atividades e projetos, criando mapas conceituais, fluxogramas e pseudocódigos. A fase integra soluções digitais e desplugadas, considerando o contexto e a disponibilidade de recursos.
            </p>
          </li>
          <li className="space-y-2">
            <h3 className="inline text-lg font-semibold text-green-400">
              Experimentar com Tecnologia
            </h3>
            <p className="text-gray-200">
              Aplicação prática dos conceitos utilizando plataformas como Scratch, Code.org, Tinkercad Circuits, MakeCode, simuladores Arduino, kits físicos (Arduino, Micro:bit, LEGO Education) e os Jogos MAPEAR. Essa etapa valoriza aprendizagem ativa por meio da experimentação e construção colaborativa.
            </p>
          </li>
          <li className="space-y-2">
            <h3 className="inline text-lg font-semibold text-green-400">
              Analisar e Ajustar
            </h3>
            <p className="text-gray-200">
              Reflexão crítica sobre os resultados obtidos. Identificação de acertos, desafios e estratégias de melhoria. Incentiva postura investigativa e capacidade de adaptação frente a problemas pedagógicos.
            </p>
          </li>
          <li className="space-y-2">
            <h3 className="inline text-lg font-semibold text-green-400">
              Refletir e Compartilhar
            </h3>
            <p className="text-gray-200">
              Sistematização das aprendizagens e socialização das experiências com a comunidade escolar, via feiras, portfólios digitais ou plataformas colaborativas. Promove redes de colaboração e consolida práticas inovadoras.
            </p>
          </li>
        </ol>
      </section>

      <section
        id="protocolo"
        className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-gray-200 mt-4"
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Protocolo MAPEAR</h1>
        <div className="mt-4 flex justify-center">
          <Image alt="Protocolo" src="/protocoloMAPEAR.png" width={1024} height={640} className="max-w-full rounded-lg border border-slate-400/30 shadow-lg" />
        </div>
      </section>

      <section
        id="recursos"
        className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-gray-200 mt-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-blue-400">
          Recursos Integrados do Arcabouço Pedagógico MAPEAR
        </h2>
        <h3 className="text-lg sm:text-xl font-semibold mt-4 text-green-400">Jogos MAPEAR</h3>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Feedback em tempo real para aprendizagem autônoma;</li>
          <li>Monitoramento do progresso através de relatórios;</li>
          <li>Atividades que integram conceitos de PC e RE de forma lúdica.</li>
        </ul>
        <h3 className="text-lg sm:text-xl font-semibold mt-4 text-green-400">Curso de Formação MAPEAR (presencial, híbrido ou EAD)</h3>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Fundamentos do PC na educação básica;</li>
          <li>Ferramentas digitais e atividades desplugadas;</li>
          <li>Planejamento de projetos escolares com mediação ativa e RE;</li>
          <li>Estratégias de avaliação de competências;</li>
          <li>Compartilhamento de experiências e banco de práticas.</li>
        </ul>
        <h3 className="text-lg sm:text-xl font-semibold mt-4 text-green-400">Kits Didáticos e Atividades Guiadas</h3>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Kits analógicos: baralhos pedagógicos...</li>
          <li>Kits digitais: simuladores, aplicativos e plataformas de
            programação;
          </li>
          <li>Roteiros passo a passo para projetos interdisciplinares;</li>
          <li>Rubricas de avaliação para monitoramento de competências.</li>
        </ul>
      </section>

      <section
        id="diferenciais"
        className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-gray-200 mt-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-blue-400">
          Diferenciais do Arcabouço Pedagógico MAPEAR
        </h2>
        <ul className="list-disc list-inside ml-4 mt-4 space-y-2">
          <li>
            <strong>Flexibilidade:</strong> aplicável com ou sem tecnologia
            digital;
          </li>
          <li>
            <strong>Interdisciplinaridade:</strong> integração do PC com
            conteúdos curriculares e problemas reais;
          </li>
          <li>
            <strong>Protagonismo:</strong> incentiva autoria e autonomia de
            alunos e professores;
          </li>
          <li>
            <strong>Ciclos ativos</strong> de teoria, prática e reflexão;
          </li>
          <li>
            <strong>Formação contínua</strong> com trilhas gamificadas e
            microcertificações;
          </li>
          <li>
            <strong>Colaboração:</strong> socialização de práticas e
            fortalecimento de redes escolares.
          </li>
        </ul>
      </section>

      <section
        id="steam"
        className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-gray-200 mt-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-blue-400">
          Integração com Metodologias Ativas e STEAM
        </h2>
        <ul className="list-disc list-inside ml-4 mt-4 space-y-2">
          <li>Solução de problemas reais e contextualizados;</li>
          <li>
            Aprendizagem interdisciplinar, conectando Ciências, Tecnologia,
            Engenharia, Artes e Matemática;
          </li>
          <li>Desenvolvimento de habilidades cognitivas e socioemocionais;</li>
          <li>Engajamento ativo e construção colaborativa do conhecimento.</li>
        </ul>
      </section>

      <section
        id="resultados"
        className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-gray-200 mt-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-blue-400">Resultados Esperados</h2>
        <ol className="list-decimal list-inside ml-4 mt-4 space-y-2">
          <li>
            <strong>Aprendizagem dos Estudantes:</strong> Engajamento,
            pensamento crítico, criatividade e competências em PC.
          </li>
          <li>
            <strong>Competências Docentes:</strong> Habilidade de integrar PC e
            RE em práticas pedagógicas alinhadas à BNCC.
          </li>
          <li>
            <strong>Repertório Pedagógico:</strong> Diversificação de
            estratégias de ensino com metodologias ativas, gamificação e
            recursos tecnológicos.
          </li>
          <li>
            <strong>Comunidade de Prática:</strong> Criação de redes
            colaborativas de alunos e professores que compartilham experiências
            e aprimoram continuamente a metodologia.
          </li>
        </ol>
      </section>

      <section
        id="finais"
        className="rounded-xl border border-slate-400/15 bg-[linear-gradient(180deg,rgba(16,24,39,0.8),rgba(16,24,39,0.6))] shadow-md p-4 sm:p-6 text-white mt-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-blue-400">Considerações Finais</h2>
        {/* Adicionado espaçamento 'space-y-4' para separar os parágrafos */}
        <div className="mt-4 space-y-4">
          <p>
            O Arcabouço Pedagógico MAPEAR constitui uma abordagem inovadora que
            conecta teoria, prática, reflexão e tecnologia, favorecendo o
            desenvolvimento de competências de PC, habilidades socioemocionais e
            aprendizagem significativa. Sua flexibilidade, interdisciplinaridade
            e foco em protagonismo tornam-na adequada para contextos diversos,
            desde escolas básicas até programas de formação docente.
          </p>
          <p>
            O ensino com o Arcabouço Pedagógico MAPEAR permite aos alunos e
            professores explorar o Pensamento Computacional de forma ativa e
            reflexiva, promovendo a construção de conhecimento contextualizado,
            colaborativo e interdisciplinar, essencial para a educação do século
            XXI.
          </p>
        </div>
      </section>
    </>
  );
}