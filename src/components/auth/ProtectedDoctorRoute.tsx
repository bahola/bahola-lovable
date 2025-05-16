
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedDoctorRouteProps {
  children: ReactNode;
}

export const ProtectedDoctorRoute = ({ children }: ProtectedDoctorRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(true);
        
        // Since we don't have a profiles table yet, we'll temporarily 
        // assume all authenticated users can access doctor pages
        // In a real implementation, we would check user_type in a profiles table
        setIsDoctor(true);
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Move toast calls outside of render cycle to avoid infinite loops
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        toast({
          title: "Access Restricted",
          description: "Please sign in as a healthcare professional to access this resource.",
          variant: "destructive",
        });
      } else if (!isDoctor) {
        toast({
          title: "Doctor Access Only",
          description: "This resource is only available to registered healthcare professionals.",
          variant: "destructive",
        });
      }
    }
  }, [isLoading, isAuthenticated, isDoctor, toast]);

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
