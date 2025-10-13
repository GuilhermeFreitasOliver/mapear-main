import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import mapearLogo from '../assets/images/MAPEAR.png';

const Home = () => {
  const artefatosHref = `${import.meta.env.BASE_URL}Artefatos.zip`;
  return (
    <Card>
      <h1>Arcabouço Pedagógico MAPEAR — Pensamento Computacional com Consciência</h1>
      <div className="figure">
        <img alt="Logo da Metodologia MAPEAR" src={mapearLogo} />
      </div>
      <div className="hero-actions">
        <Link className="button cta secondary" to="/curso">Abrir Curso MAPEAR</Link>
        <Link className="button cta primary" to="/jogos">Abrir Jogos MAPEAR</Link>
        <a className="button cta purple" href={artefatosHref} download>Baixar Artefatos (ZIP)</a>
      </div>
    </Card>
  );
};

export default Home;