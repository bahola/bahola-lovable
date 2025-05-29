
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CustomerFormData, DoctorFormData, UserType } from '@/schemas/registerSchema';
import { supabase } from '@/integrations/supabase/client';
import { createCustomerFromRegistration } from './customerUtils';

export const useRegisterSubmit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  
  const handleSubmit = async (values: CustomerFormData | DoctorFormData, userType: UserType) => {
    try {
      // Register with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
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

      if (authError) {
        throw authError;
      }

      // Create customer record
      const customerData = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: values.phone || '',
        customer_type: userType === 'doctor' ? 'doctor' as const : 'customer' as const,
        source: 'signup',
        notes: userType === 'doctor' ? 
          `Doctor - License: ${(values as DoctorFormData).medicalLicense || 'N/A'}, Specialization: ${(values as DoctorFormData).specialization || 'N/A'}` 
          : null
      };

      const customerResult = await createCustomerFromRegistration(customerData);
      
      if (!customerResult.success) {
        console.error('Failed to create customer record:', customerResult.error);
        // Don't fail the registration if customer record creation fails
        toast({
          title: "Registration Successful",
          description: `Thank you for registering as a ${userType === 'doctor' ? 'healthcare professional' : 'customer'}. Note: Customer profile creation had an issue.`,
          duration: 5000,
        });
      } else {
        toast({
          title: "Registration Successful",
          description: `Thank you for registering as a ${userType === 'doctor' ? 'healthcare professional' : 'customer'}. Your customer ID is ${customerResult.data?.customer_id}.`,
          duration: 5000,
        });
      }
      
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
