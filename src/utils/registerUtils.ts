
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CustomerFormData, DoctorFormData, UserType } from '@/schemas/registerSchema';
import { supabase } from '@/integrations/supabase/client';

export const useRegisterSubmit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  
  const handleSubmit = async (values: CustomerFormData | DoctorFormData, userType: UserType) => {
    try {
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            userType: userType,
            ...(userType === 'doctor' ? {
              medicalLicense: (values as DoctorFormData).medicalLicense,
              specialization: (values as DoctorFormData).specialization,
            } : {})
          }
        }
      });

      if (error) {
        throw error;
      }
      
      // Show success notification
      toast({
        title: "Registration Successful",
        description: `Thank you for registering as a ${userType === 'doctor' ? 'healthcare professional' : 'customer'}.`,
        duration: 5000,
      });
      
      // Redirect to the return URL if available, otherwise to login page
      navigate(returnUrl || '/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was a problem with your registration. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return { handleSubmit };
};
