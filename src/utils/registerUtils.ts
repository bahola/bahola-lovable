
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CustomerFormData, DoctorFormData, UserType } from '@/schemas/registerSchema';
import { useERPNextAuth } from '@/contexts/ERPNextAuthContext';

export const useRegisterSubmit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const { register } = useERPNextAuth();
  
  const handleSubmit = async (values: CustomerFormData | DoctorFormData, userType: UserType) => {
    try {
      const registrationData = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone || '',
        userType,
        ...(userType === 'doctor' ? {
          medicalLicense: (values as DoctorFormData).medicalLicense,
          specialization: (values as DoctorFormData).specialization,
          clinic: (values as DoctorFormData).clinic,
          yearsOfPractice: (values as DoctorFormData).yearsOfPractice,
        } : {})
      };

      await register(registrationData);

      if (userType === 'doctor') {
        toast({
          title: "Registration Successful",
          description: "Welcome! Your healthcare professional account has been created and is pending verification. You'll receive an email notification once your account is approved (typically 1-2 business days).",
          duration: 7000,
        });
      } else {
        toast({
          title: "Registration Successful",
          description: "Welcome! You have been registered as a customer and are now logged in.",
          duration: 5000,
        });
      }
      
      // Redirect to the return URL if available, otherwise to home page
      navigate(returnUrl || '/');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "There was a problem with your registration. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return { handleSubmit };
};
