import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { swell, SwellAccount, SwellCustomerType, CUSTOMER_GROUPS, REQUIRES_VERIFICATION } from '@/integrations/swell/client';
import { supabase } from '@/integrations/supabase/client';

interface SwellAuthContextType {
  user: SwellAccount | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  customerType: SwellCustomerType | null;
  verificationStatus: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterUserData) => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
}

export interface RegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: SwellCustomerType;
  // Doctor fields
  medicalLicense?: string;
  specialization?: string;
  clinic?: string;
  yearsOfPractice?: string;
  // Pharmacy fields
  pharmacyLicense?: string;
  pharmacyName?: string;
  gstNumber?: string;
  address?: string;
  // Student fields
  studentId?: string;
  institutionName?: string;
  course?: string;
  expectedGraduation?: string;
}

const SwellAuthContext = createContext<SwellAuthContextType | undefined>(undefined);

export const useSwellAuth = () => {
  const context = useContext(SwellAuthContext);
  if (context === undefined) {
    throw new Error('useSwellAuth must be used within a SwellAuthProvider');
  }
  return context;
};

interface SwellAuthProviderProps {
  children: ReactNode;
}

export const SwellAuthProvider: React.FC<SwellAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SwellAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerType, setCustomerType] = useState<SwellCustomerType | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const account = await swell.account.get();
        if (account) {
          setUser(account);
          setIsAuthenticated(true);
          setCustomerType((account.group as SwellCustomerType) || 'customer');
          
          // Fetch verification status from Supabase for professional accounts
          if (account.email) {
            await fetchVerificationStatus(account.email);
          }
        }
      } catch (error) {
        console.log('No active Swell session');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const fetchVerificationStatus = async (email: string) => {
    try {
      const { data } = await supabase
        .from('customers')
        .select('verification_status, customer_type')
        .eq('email', email)
        .maybeSingle();

      if (data) {
        setVerificationStatus(data.verification_status);
        if (data.customer_type) {
          setCustomerType(data.customer_type as SwellCustomerType);
        }
      }
    } catch (error) {
      console.error('Error fetching verification status:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Starting Swell login for:', email);

      const result = await swell.account.login(email, password);
      console.log('Swell login result:', result);

      const account = await swell.account.get();
      if (account) {
        setUser(account);
        setIsAuthenticated(true);
        setCustomerType((account.group as SwellCustomerType) || 'customer');
        await fetchVerificationStatus(email);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await swell.account.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setCustomerType(null);
      setVerificationStatus(null);
    }
  };

  const register = async (userData: RegisterUserData) => {
    try {
      setIsLoading(true);
      console.log('=== STARTING SWELL REGISTRATION ===');
      console.log('User data:', {
        email: userData.email,
        userType: userData.userType,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });

      const requiresVerification = REQUIRES_VERIFICATION.includes(userData.userType);
      const verificationStatusValue = requiresVerification ? 'pending' : 'approved';

      // Build metadata based on user type
      const metadata: Record<string, any> = {
        userType: userData.userType,
      };

      if (userData.userType === 'doctor') {
        metadata.medicalLicense = userData.medicalLicense;
        metadata.specialization = userData.specialization;
        metadata.clinic = userData.clinic;
        metadata.yearsOfPractice = userData.yearsOfPractice;
      } else if (userData.userType === 'pharmacy') {
        metadata.pharmacyLicense = userData.pharmacyLicense;
        metadata.pharmacyName = userData.pharmacyName;
        metadata.gstNumber = userData.gstNumber;
        metadata.address = userData.address;
      } else if (userData.userType === 'student') {
        metadata.studentId = userData.studentId;
        metadata.institutionName = userData.institutionName;
        metadata.course = userData.course;
        metadata.expectedGraduation = userData.expectedGraduation;
      }

      // Step 1: Create Swell account
      console.log('Step 1: Creating Swell account...');
      const swellAccount = await swell.account.create({
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        group: CUSTOMER_GROUPS[userData.userType],
        type: userData.userType,
        metadata,
      });
      console.log('✅ Swell account created:', swellAccount.id);

      // Step 2: Store verification info in Supabase
      console.log('Step 2: Creating Supabase customer record...');
      const customerIdPrefix = userData.userType === 'doctor' ? 'DOC' 
        : userData.userType === 'pharmacy' ? 'PHR' 
        : userData.userType === 'student' ? 'STU' 
        : 'CUST';

      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', userData.email)
        .maybeSingle();

      if (!existingCustomer) {
        const insertData: any = {
          customer_id: `${customerIdPrefix}${Date.now().toString().slice(-6)}`,
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          phone: userData.phone || '',
          customer_type: userData.userType as 'customer' | 'doctor' | 'pharmacy' | 'student',
          verification_status: verificationStatusValue,
        };

        // Add type-specific fields for doctors
        if (userData.userType === 'doctor') {
          insertData.medical_license = userData.medicalLicense;
          insertData.specialization = userData.specialization;
          insertData.clinic = userData.clinic;
          insertData.years_of_practice = userData.yearsOfPractice ? parseInt(userData.yearsOfPractice) : null;
        }

        // Add type-specific fields for pharmacies
        if (userData.userType === 'pharmacy') {
          insertData.pharmacy_license = userData.pharmacyLicense;
          insertData.pharmacy_name = userData.pharmacyName;
          insertData.gst_number = userData.gstNumber;
          insertData.address = userData.address;
        }

        // Add type-specific fields for students
        if (userData.userType === 'student') {
          insertData.student_id = userData.studentId;
          insertData.institution_name = userData.institutionName;
          insertData.course = userData.course;
          insertData.expected_graduation = userData.expectedGraduation;
        }

        const { error: insertError } = await supabase.from('customers').insert(insertData);

        if (insertError) {
          console.error('❌ Supabase customer creation failed:', insertError);
          // Don't throw - Swell account is already created
        } else {
          console.log('✅ Supabase customer created');
        }
      }

      // Step 3: Auto-login for regular customers, show pending message for others
      if (!requiresVerification) {
        console.log('Step 3: Auto-login for customer...');
        await login(userData.email, userData.password);
        console.log('✅ Auto-login successful');
      } else {
        console.log(`✅ ${userData.userType} registration completed - pending verification`);
      }

      console.log('=== REGISTRATION COMPLETED ===');
    } catch (error) {
      console.error('❌ REGISTRATION FAILED:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const recoverPassword = async (email: string) => {
    try {
      await swell.account.recover(email);
    } catch (error) {
      console.error('Password recovery failed:', error);
      throw error;
    }
  };

  const value: SwellAuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    customerType,
    verificationStatus,
    login,
    logout,
    register,
    recoverPassword,
  };

  return (
    <SwellAuthContext.Provider value={value}>
      {children}
    </SwellAuthContext.Provider>
  );
};

// Re-export for backward compatibility during migration
export { useSwellAuth as useERPNextAuth };
