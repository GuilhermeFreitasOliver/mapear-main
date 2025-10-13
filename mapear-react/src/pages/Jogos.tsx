import { Outlet } from 'react-router-dom';

const Jogos = () => {
  return (
    <div style={{ padding: '16px 20px' }}>
      <Outlet />
    </div>
  );
};

export default Jogos;