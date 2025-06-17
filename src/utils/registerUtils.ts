
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
      console.log('Registration form submitted:', { userType, email: values.email });
      
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

      console.log('Calling register function with data:', registrationData);
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
      console.log('Registration successful, redirecting to:', returnUrl || '/');
      navigate(returnUrl || '/');
    } catch (error) {
      console.error('Registration error in handleSubmit:', error);
      
      let errorMessage = "There was a problem with your registration. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Handle specific error cases
        if (error.message.includes('already exists') || error.message.includes('409')) {
          errorMessage = "An account with this email already exists. Please try logging in instead.";
        } else if (error.message.includes('Failed to create user account')) {
          errorMessage = "Failed to create your account. Please check your details and try again.";
        } else if (error.message.includes('Failed to create customer record')) {
          errorMessage = "Account created but failed to complete customer setup. Please contact support.";
        } else if (error.message.includes('Failed to store customer information')) {
          errorMessage = "Account created but failed to store additional information. Please contact support.";
        }
      }
      
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 7000,
      });
    }
  };

  return { handleSubmit };
};
