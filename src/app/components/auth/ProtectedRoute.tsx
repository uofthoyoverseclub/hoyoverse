import { ReactNode } from 'react';
import { useAuth } from '../../../hooks/useAuth';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    window.location.href = '/api/auth/discord';
    return null;
  }

  return <>{children}</>;
}