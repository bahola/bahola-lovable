import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useSwellAuth } from '@/contexts/SwellAuthContext';

interface ProtectedDoctorRouteProps {
  children: ReactNode;
}

// Customer types that require professional access
const PROFESSIONAL_TYPES = ['doctor', 'pharmacy', 'student'];

export const ProtectedDoctorRoute = ({ children }: ProtectedDoctorRouteProps) => {
  const { user, isAuthenticated, isLoading, customerType, verificationStatus } = useSwellAuth();
  const { toast } = useToast();
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);

  // Check if user is a professional type
  const isProfessional = customerType && PROFESSIONAL_TYPES.includes(customerType);
  const isApproved = verificationStatus === 'approved';

  useEffect(() => {
    if (!isLoading && !hasShownToast) {
      if (!isAuthenticated) {
        toast({
          title: "Access Restricted",
          description: "Please sign in as a healthcare professional to access this resource.",
          variant: "destructive",
        });
        setHasShownToast(true);
      } else if (!isProfessional) {
        toast({
          title: "Professional Access Only",
          description: "This resource is only available to registered healthcare professionals, pharmacies, and students.",
          variant: "destructive",
        });
        setHasShownToast(true);
      } else if (!isApproved) {
        toast({
          title: "Verification Pending",
          description: "Your account is pending verification. Please wait for approval.",
          variant: "default",
        });
        setHasShownToast(true);
      }
    }
  }, [isLoading, isAuthenticated, isProfessional, isApproved, toast, hasShownToast]);

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

  if (!isProfessional) {
    return <Navigate to="/" replace />;
  }

  // Allow access even if pending, but show a notification
  return <>{children}</>;
};
