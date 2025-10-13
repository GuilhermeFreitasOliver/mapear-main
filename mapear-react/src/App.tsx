import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Conteudo from './pages/Conteudo';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/auth/AuthModal';
import Jogos from './pages/Jogos';
import DetectiveDePadroes from './pages/jogos/DetectiveDePadroes';
import Abstracao from './pages/jogos/Abstracao';
import Decomposicao from './pages/jogos/Decomposicao';
import Algoritmo from './pages/jogos/Algoritmo';
import Generalizacao from './pages/jogos/Generalizacao';
import Robotica from './pages/jogos/Robotica';

function SubNav() {
  const location = useLocation();
  if (!location.pathname.startsWith('/jogos')) return null;
  return (
    <nav className="sub-nav" aria-label="Navegação dos jogos">
      <NavLink to="/jogos" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
        Início
      </NavLink>
      <NavLink to="/jogos/padroes" className={({ isActive }) => (isActive ? 'active' : undefined)}>
        Detective de Padrões
      </NavLink>
      <NavLink to="/jogos/abstracao" className={({ isActive }) => (isActive ? 'active' : undefined)}>
        Abstração
      </NavLink>
      <NavLink to="/jogos/decomposicao" className={({ isActive }) => (isActive ? 'active' : undefined)}>
        Decomposição
      </NavLink>
      <NavLink to="/jogos/algoritmo" className={({ isActive }) => (isActive ? 'active' : undefined)}>
        Algoritmos
      </NavLink>
      <NavLink to="/jogos/generalizacao" className={({ isActive }) => (isActive ? 'active' : undefined)}>
        Generalize+
      </NavLink>
      <NavLink to="/jogos/robotica" className={({ isActive }) => (isActive ? 'active' : undefined)}>
        Robótica
      </NavLink>
      <NavLink to="/jogos/relatorios" className={({ isActive }) => (isActive ? 'active' : undefined)}>
        Relatórios
      </NavLink>
      <NavLink to="/jogos/ajustes" className={({ isActive }) => (isActive ? 'active' : undefined)}>
        Ajustes
      </NavLink>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <AuthModal />
        <SubNav />
        <main className="app-container">
          <Routes>
            <Route path="/" element={<Conteudo />} />
            <Route element={<ProtectedRoute />}> 
              <Route path="/conteudo" element={<Conteudo />} />
              <Route path="/jogos/*" element={<Jogos />}>
                <Route index element={<h2>Bem-vindo aos Jogos MAPEAR</h2>} />
                <Route path="padroes" element={<DetectiveDePadroes />} />
                <Route path="abstracao" element={<Abstracao />} />
                <Route path="decomposicao" element={<Decomposicao />} />
                <Route path="algoritmo" element={<Algoritmo />} />
                <Route path="generalizacao" element={<Generalizacao />} />
                <Route path="robotica" element={<Robotica />} />
                <Route path="relatorios" element={<h2>Relatórios</h2>} />
                <Route path="ajustes" element={<h2>Ajustes</h2>} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
