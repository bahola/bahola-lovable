import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { Loader2 } from 'lucide-react';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { isAdmin, isLoading, error } = useAdminCheck();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-bahola-blue-500 mb-4" />
        <p className="text-gray-600">Verifying admin access...</p>
      </div>
    );
  }

  if (error || !isAdmin) {
    // Redirect to admin login page
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
