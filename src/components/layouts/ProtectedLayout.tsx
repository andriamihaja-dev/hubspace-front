import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import Header from './Header';

export default function ProtectedLayout() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div className="p-4 text-center">Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />; // ✅ vers / et pas /login
  }

   return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
