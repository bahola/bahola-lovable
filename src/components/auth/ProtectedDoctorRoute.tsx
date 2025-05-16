
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
        
        // In a real implementation, we would check if user is actually a doctor
        // This would typically involve checking a user_type field in a profiles table
        // For now, we're assuming if they're logged in, they could be a doctor
        // and the UI would adjust accordingly
        const { data, error } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user type:', error);
          setIsDoctor(false);
        } else {
          setIsDoctor(data?.user_type === 'doctor');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bahola-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    toast({
      title: "Access Restricted",
      description: "Please sign in as a healthcare professional to access this resource.",
      variant: "destructive",
    });
    
    return <Navigate to={`/register?type=doctor&returnUrl=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isDoctor) {
    toast({
      title: "Doctor Access Only",
      description: "This resource is only available to registered healthcare professionals.",
      variant: "destructive",
    });
    
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
