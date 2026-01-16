import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CustomerFormData, 
  DoctorFormData, 
  PharmacyFormData, 
  StudentFormData, 
  UserType 
} from '@/schemas/registerSchema';
import { useSwellAuth, RegisterUserData } from '@/contexts/SwellAuthContext';

export type RegisterFormData = CustomerFormData | DoctorFormData | PharmacyFormData | StudentFormData;

export const useRegisterSubmit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const { register } = useSwellAuth();
  
  const handleSubmit = async (values: RegisterFormData, userType: UserType) => {
    try {
      console.log('Registration form submitted:', { userType, email: values.email });
      
      const registrationData: RegisterUserData = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone || '',
        userType,
      };

      // Add type-specific fields
      if (userType === 'doctor') {
        const doctorValues = values as DoctorFormData;
        registrationData.medicalLicense = doctorValues.medicalLicense;
        registrationData.specialization = doctorValues.specialization;
        registrationData.clinic = doctorValues.clinic;
        registrationData.yearsOfPractice = doctorValues.yearsOfPractice;
      } else if (userType === 'pharmacy') {
        const pharmacyValues = values as PharmacyFormData;
        registrationData.pharmacyLicense = pharmacyValues.pharmacyLicense;
        registrationData.pharmacyName = pharmacyValues.pharmacyName;
        registrationData.gstNumber = pharmacyValues.gstNumber;
        registrationData.address = pharmacyValues.address;
      } else if (userType === 'student') {
        const studentValues = values as StudentFormData;
        registrationData.studentId = studentValues.studentId;
        registrationData.institutionName = studentValues.institutionName;
        registrationData.course = studentValues.course;
        registrationData.expectedGraduation = studentValues.expectedGraduation;
      }

      console.log('Calling register function with data:', registrationData);
      await register(registrationData);

      // Show appropriate message based on user type
      const requiresVerification = ['doctor', 'pharmacy', 'student'].includes(userType);
      
      if (requiresVerification) {
        const typeLabels: Record<string, string> = {
          doctor: 'Healthcare Professional',
          pharmacy: 'Pharmacy',
          student: 'Student',
        };
        toast({
          title: "Registration Successful",
          description: `Your ${typeLabels[userType]} account has been created and is pending verification. You'll receive an email notification once your account is approved (typically 1-2 business days).`,
          duration: 7000,
        });
        navigate('/login');
      } else {
        toast({
          title: "Registration Successful",
          description: "Welcome! You have been registered and are now logged in.",
          duration: 5000,
        });
        navigate(returnUrl || '/');
      }
    } catch (error) {
      console.error('Registration error in handleSubmit:', error);
      
      let errorMessage = "There was a problem with your registration. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Handle specific error cases
        if (error.message.includes('already exists') || error.message.includes('409')) {
          errorMessage = "An account with this email already exists. Please try logging in instead.";
        } else if (error.message.includes('Failed to create')) {
          errorMessage = "Failed to create your account. Please check your details and try again.";
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
