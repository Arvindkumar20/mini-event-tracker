import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { authed } = useAuth();
  if (authed === null) return null;
  return authed ? <Outlet/> : <Navigate to="/login" replace />;
}