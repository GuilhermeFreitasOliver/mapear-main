import Link from "next/link";

export default function Home() {
  return (
    <section id="intro" className="card">
      <h1>Arcabouço Pedagógico MAPEAR — Pensamento Computacional com Consciência</h1>
      <div className="figure">
        <img alt="Logo da Metodologia MAPEAR" src="/MAPEAR.png" />
      </div>
      <div className="hero-actions">
        <Link className="button cta secondary" href="/curso">Abrir Curso MAPEAR</Link>
        <Link className="button cta primary" href="/jogos">Abrir Jogos MAPEAR</Link>
        <a className="button cta purple" href="/Artefatos.zip" download>
          Baixar Artefatos (ZIP)
        </a>
      </div>
    </section>
  );
}
