
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useERPNextAuth } from '@/contexts/ERPNextAuthContext';

interface ProtectedDoctorRouteProps {
  children: ReactNode;
}

export const ProtectedDoctorRoute = ({ children }: ProtectedDoctorRouteProps) => {
  const { user, isAuthenticated, isLoading } = useERPNextAuth();
  const { toast } = useToast();
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);

  // Check if user is a doctor based on user_type
  const isDoctor = user?.user_type === 'System User' || user?.user_type === 'Healthcare Professional';

  useEffect(() => {
    if (!isLoading && !hasShownToast) {
      if (!isAuthenticated) {
        toast({
          title: "Access Restricted",
          description: "Please sign in as a healthcare professional to access this resource.",
          variant: "destructive",
        });
        setHasShownToast(true);
      } else if (!isDoctor) {
        toast({
          title: "Doctor Access Only",
          description: "This resource is only available to registered healthcare professionals.",
          variant: "destructive",
        });
        setHasShownToast(true);
      }
    }
  }, [isLoading, isAuthenticated, isDoctor, toast, hasShownToast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bahola-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/register?type=doctor&returnUrl=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isDoctor) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
