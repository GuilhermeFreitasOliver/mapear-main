import { Link, useLocation } from 'react-router-dom';
import mapearFavicon from '../../assets/images/MAPEARFavicon.png';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../services/firebase';
import { useUI } from '../../contexts/UIContext';

const Header = () => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  const inJogos = location.pathname.startsWith('/jogos');
  const { openAuthModal } = useUI();
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-row">
          <img className="brand-icon" src={mapearFavicon} alt="Logo MAPEAR" />
          <span className="brand-title">{inJogos ? 'Jogos MAPEAR' : 'Arcabouço Pedagógico MAPEAR'}</span>
        </div>
      </div>
      <nav className="main-nav">
        <Link className="btn ghost" to="/">Início</Link>
        <Link className="btn ghost" to="/curso">Curso</Link>
        <Link className="btn ghost" to="/jogos">Jogos</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {loading ? (
            <span className="muted">Carregando…</span>
          ) : currentUser ? (
            <>
              <span className="muted">Olá, {currentUser.displayName || currentUser.email}</span>
              <button className="btn ghost" onClick={() => signOut()}>Sair</button>
            </>
          ) : (
            <button className="btn primary" onClick={openAuthModal}>Entrar</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;