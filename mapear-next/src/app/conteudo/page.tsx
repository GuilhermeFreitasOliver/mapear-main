import Link from "next/link";
import Image from "next/image";

const fases = [
  {
    titulo: "Motivar",
    descricao:
      "Estimula o engajamento dos estudantes por meio de desafios contextualizados, conectando problemas reais ao uso do PC. Objetiva despertar curiosidade, interesse e protagonismo.",
  },
  {
    titulo: "Apresentar Conceitos",
    descricao:
      "Introdução estruturada e acessível dos fundamentos do PC — decomposição, abstração, reconhecimento de padrões e raciocínio algorítmico — utilizando exemplos concretos e experiências pedagógicas alinhadas à realidade dos participantes.",
  },
  {
    titulo: "Planejar e Prototipar",
    descricao:
      "Professores e alunos planejam atividades e projetos, criando mapas conceituais, fluxogramas e pseudocódigos. A fase integra soluções digitais e desplugadas, considerando o contexto e a disponibilidade de recursos.",
  },
  {
    titulo: "Experimentar com Tecnologia",
    descricao:
      "Aplicação prática dos conceitos utilizando plataformas como Scratch, Code.org, Tinkercad Circuits, MakeCode, simuladores Arduino, kits físicos (Arduino, Micro:bit, LEGO Education) e os Jogos MAPEAR. Essa etapa valoriza aprendizagem ativa por meio da experimentação e construção colaborativa.",
  },
  {
    titulo: "Analisar e Ajustar",
    descricao:
      "Reflexão crítica sobre os resultados obtidos. Identificação de acertos, desafios e estratégias de melhoria. Incentiva postura investigativa e capacidade de adaptação frente a problemas pedagógicos.",
  },
  {
    titulo: "Refletir e Compartilhar",
    descricao:
      "Sistematização das aprendizagens e socialização das experiências com a comunidade escolar, via feiras, portfólios digitais ou plataformas colaborativas. Promove redes de colaboração e consolida práticas inovadoras.",
  },
];

export default function Conteudo() {
  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(8,35,54,0.9),rgba(7,20,33,0.92))] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)] sm:p-9 fade-up">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute -left-12 bottom-8 h-44 w-44 rounded-full bg-sky-400/15 blur-3xl" />

        <div className="relative grid gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Trilha MAPEAR</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Arcabouço Pedagógico MAPEAR para Pensamento Computacional
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
              O Arcabouço Pedagógico para o Ensino-Aprendizagem de Pensamento Computacional (MAPEAR)
              constitui uma proposta inovadora voltada ao ensino básico e à formação inicial e
              continuada de professores, com foco no desenvolvimento de competências associadas ao
              Pensamento Computacional (PC). Inspirada na metáfora de “traçar caminhos”, a proposta
              busca mapear o processo de aprendizagem por meio de ciclos de experimentação,
              investigação e reflexão, sempre conectados à prática pedagógica real.
            </p>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
              O Arcabouço Pedagógico MAPEAR integra princípios do Construcionismo e do
              Construtivismo, valorizando a construção ativa do conhecimento e a criação de artefatos
              tangíveis como estratégia de aprendizagem. Com isso, promove experiências pedagógicas
              reais, estimulando a autonomia, a colaboração e a reflexão crítica.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/curso"
                className="lift-on-hover inline-flex min-h-[46px] items-center justify-center rounded-lg border border-white/15 bg-sky-500/80 px-5 py-2.5 text-sm font-bold text-white"
              >
                Abrir Curso MAPEAR
              </Link>
              <Link
                href="/jogos"
                className="lift-on-hover inline-flex min-h-[46px] items-center justify-center rounded-lg border border-white/15 bg-emerald-500/75 px-5 py-2.5 text-sm font-bold text-white"
              >
                Abrir Jogos MAPEAR
              </Link>
              <a
                href="/Artefatos.zip"
                download
                className="lift-on-hover inline-flex min-h-[46px] items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white"
              >
                Baixar Artefatos (ZIP)
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <Image
              alt="Logo da Metodologia MAPEAR"
              src="/MAPEAR.png"
              width={620}
              height={360}
              className="h-auto w-full rounded-xl border border-white/10 bg-white/5 p-2"
              priority
            />
            <p className="mt-3 text-sm text-slate-300">
              Ensino com metodologia ativa, integração curricular e progressão por fases.
            </p>
          </div>
        </div>
      </section>

      <section id="fases" className="mt-7 fade-up">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/90">Trilha Formativa</p>
          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Fases da Proposta MAPEAR</h2>
          <p className="mt-2 text-slate-300">
            A proposta organiza-se em seis fases formativas interdependentes, concebidas para criar
            um ciclo contínuo de aprendizagem.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {fases.map((fase, index) => (
            <article
              key={fase.titulo}
              className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(11,36,53,0.7),rgba(9,26,39,0.65))] p-5"
            >
              <div className="inline-flex rounded-md border border-emerald-200/30 bg-emerald-300/15 px-2.5 py-1 text-xs font-semibold text-emerald-100">
                Fase {index + 1}
              </div>
              <h3 className="mt-3 text-xl font-bold text-emerald-200">{fase.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">{fase.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="protocolo" className="mt-8 rounded-2xl border border-white/10 bg-[rgba(8,25,37,0.78)] p-5 sm:p-7 fade-up">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Protocolo MAPEAR</h2>
        <div className="section-divider mt-3" />
        <div className="mt-5 overflow-hidden rounded-xl border border-white/15">
          <Image
            alt="Protocolo"
            src="/protocoloMAPEAR.png"
            width={1200}
            height={760}
            className="h-auto w-full"
          />
        </div>
      </section>

      <section id="recursos" className="mt-8 rounded-2xl border border-white/10 bg-[rgba(8,25,37,0.78)] p-5 sm:p-7 fade-up">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Recursos Integrados do Arcabouço Pedagógico MAPEAR
        </h2>
        <div className="section-divider mt-3" />

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <article className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-lg font-semibold text-emerald-200">Jogos MAPEAR</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-200">
              <li>Feedback em tempo real para aprendizagem autônoma;</li>
              <li>Monitoramento do progresso através de relatórios;</li>
              <li>Atividades que integram conceitos de PC e RE de forma lúdica.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-lg font-semibold text-emerald-200">
              Curso de Formação MAPEAR (presencial, híbrido ou EAD)
            </h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-200">
              <li>Fundamentos do PC na educação básica;</li>
              <li>Ferramentas digitais e atividades desplugadas;</li>
              <li>Planejamento de projetos escolares com mediação ativa e RE;</li>
              <li>Estratégias de avaliação de competências;</li>
              <li>Compartilhamento de experiências e banco de práticas.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-lg font-semibold text-emerald-200">Kits Didáticos e Atividades Guiadas</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-200">
              <li>Kits analógicos: baralhos pedagógicos...</li>
              <li>Kits digitais: simuladores, aplicativos e plataformas de programação;</li>
              <li>Roteiros passo a passo para projetos interdisciplinares;</li>
              <li>Rubricas de avaliação para monitoramento de competências.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3 fade-up">
        <article id="diferenciais" className="rounded-2xl border border-white/10 bg-[rgba(8,25,37,0.78)] p-5 sm:p-6 lg:col-span-1">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Diferenciais</h2>
          <div className="section-divider mt-3" />
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-200">
            <li><strong>Flexibilidade:</strong> aplicável com ou sem tecnologia digital;</li>
            <li><strong>Interdisciplinaridade:</strong> integração do PC com conteúdos curriculares e problemas reais;</li>
            <li><strong>Protagonismo:</strong> incentiva autoria e autonomia de alunos e professores;</li>
            <li><strong>Ciclos ativos</strong> de teoria, prática e reflexão;</li>
            <li><strong>Formação contínua</strong> com trilhas gamificadas e microcertificações;</li>
            <li><strong>Colaboração:</strong> socialização de práticas e fortalecimento de redes escolares.</li>
          </ul>
        </article>

        <article id="steam" className="rounded-2xl border border-white/10 bg-[rgba(8,25,37,0.78)] p-5 sm:p-6 lg:col-span-1">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Integração com Metodologias Ativas e STEAM</h2>
          <div className="section-divider mt-3" />
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-200">
            <li>Solução de problemas reais e contextualizados;</li>
            <li>Aprendizagem interdisciplinar, conectando Ciências, Tecnologia, Engenharia, Artes e Matemática;</li>
            <li>Desenvolvimento de habilidades cognitivas e socioemocionais;</li>
            <li>Engajamento ativo e construção colaborativa do conhecimento.</li>
          </ul>
        </article>

        <article id="resultados" className="rounded-2xl border border-white/10 bg-[rgba(8,25,37,0.78)] p-5 sm:p-6 lg:col-span-1">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Resultados Esperados</h2>
          <div className="section-divider mt-3" />
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-200">
            <li><strong>Aprendizagem dos Estudantes:</strong> Engajamento, pensamento crítico, criatividade e competências em PC.</li>
            <li><strong>Competências Docentes:</strong> Habilidade de integrar PC e RE em práticas pedagógicas alinhadas à BNCC.</li>
            <li><strong>Repertório Pedagógico:</strong> Diversificação de estratégias de ensino com metodologias ativas, gamificação e recursos tecnológicos.</li>
            <li><strong>Comunidade de Prática:</strong> Criação de redes colaborativas de alunos e professores que compartilham experiências e aprimoram continuamente a metodologia.</li>
          </ol>
        </article>
      </section>

      <section id="finais" className="mt-8 rounded-2xl border border-emerald-200/20 bg-[linear-gradient(135deg,rgba(10,56,83,0.66),rgba(11,104,82,0.58))] p-6 sm:p-8 fade-up">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Considerações Finais</h2>
        <p className="mt-4 leading-relaxed text-slate-100">
          O Arcabouço Pedagógico MAPEAR constitui uma abordagem inovadora que conecta teoria,
          prática, reflexão e tecnologia, favorecendo o desenvolvimento de competências de PC,
          habilidades socioemocionais e aprendizagem significativa. Sua flexibilidade,
          interdisciplinaridade e foco em protagonismo tornam-na adequada para contextos diversos,
          desde escolas básicas até programas de formação docente.
        </p>
        <p className="mt-4 leading-relaxed text-slate-100">
          O ensino com o Arcabouço Pedagógico MAPEAR permite aos alunos e professores explorar o
          Pensamento Computacional de forma ativa e reflexiva, promovendo a construção de conhecimento
          contextualizado, colaborativo e interdisciplinar, essencial para a educação do século XXI.
        </p>
      </section>
    </>
  );
}
