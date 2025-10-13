import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useUI } from '../contexts/UIContext';

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();
  const { openAuthModal } = useUI();

  useEffect(() => {
    if (!loading && !currentUser) {
      openAuthModal();
    }
  }, [loading, currentUser, openAuthModal]);

  if (loading) return <div>Carregando...</div>;
  if (!currentUser) return null;

  return <Outlet />;
};

export default ProtectedRoute;