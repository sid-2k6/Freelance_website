import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageLoader } from '../ui/Loader';

/**
 * Guards admin routes. Unauthenticated users are redirected to the login page.
 * While the session is being restored we show a loader to avoid flicker.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader />;

  // When Supabase is not configured we still allow access so the admin UI can
  // be explored with demo data. In production (configured), enforce auth.
  if (!isAuthenticated && isConfigured) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
