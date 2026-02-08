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
        // First try Swell session
        const account = await swell.account.get();
        if (account && account.email) {
          console.log('Found active Swell session:', account.email);
          setUser(account);
          setIsAuthenticated(true);
          setCustomerType((account.group as SwellCustomerType) || 'customer');
          
          // Fetch verification status from Supabase for professional accounts
          await fetchVerificationStatus(account.email);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log('No active Swell session, checking local storage...');
      }
      
      // Check localStorage for Supabase-only session
      try {
        const storedSession = localStorage.getItem('bahola_user_session');
        if (storedSession) {
          const sessionData = JSON.parse(storedSession);
          console.log('Found stored session:', sessionData.email);
          setUser(sessionData);
          setIsAuthenticated(true);
          setCustomerType(sessionData.group as SwellCustomerType);
          
          // Verify session is still valid by checking Supabase
          const { data } = await supabase
            .from('customers')
            .select('verification_status, customer_type')
            .eq('email', sessionData.email)
            .maybeSingle();
          
          if (data) {
            setVerificationStatus(data.verification_status);
            setCustomerType(data.customer_type as SwellCustomerType);
          } else {
            // Customer no longer exists, clear session
            localStorage.removeItem('bahola_user_session');
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Error checking stored session:', error);
      }
      
      setIsLoading(false);
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
      console.log('Starting login for:', email);

      // Try Swell login first
      let swellLoginSuccess = false;
      try {
        const result = await swell.account.login(email, password);
        console.log('Swell login result:', result);

        const account = await swell.account.get();
        if (account && account.email) {
          // Persist to localStorage as backup
          localStorage.setItem('bahola_user_session', JSON.stringify(account));
          setUser(account);
          setIsAuthenticated(true);
          setCustomerType((account.group as SwellCustomerType) || 'customer');
          await fetchVerificationStatus(email);
          swellLoginSuccess = true;
        }
      } catch (swellError) {
        console.warn('Swell login failed, trying Supabase fallback:', swellError);
      }

      // If Swell login failed, check if user exists in Supabase
      if (!swellLoginSuccess) {
        const { data: customer } = await supabase
          .from('customers')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        if (customer) {
          console.log('Found customer in Supabase:', customer.name);
          const sessionData = {
            id: customer.customer_id,
            email: customer.email,
            first_name: customer.name?.split(' ')[0] || '',
            last_name: customer.name?.split(' ').slice(1).join(' ') || '',
            name: customer.name,
            phone: customer.phone,
            group: customer.customer_type,
          };
          localStorage.setItem('bahola_user_session', JSON.stringify(sessionData));
          setUser(sessionData);
          setIsAuthenticated(true);
          setCustomerType(customer.customer_type as SwellCustomerType);
          setVerificationStatus(customer.verification_status);
        } else {
          throw new Error('Invalid email or password');
        }
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
      // Clear local storage session
      localStorage.removeItem('bahola_user_session');
      setUser(null);
      setIsAuthenticated(false);
      setCustomerType(null);
      setVerificationStatus(null);
    }
  };

  const register = async (userData: RegisterUserData) => {
    try {
      setIsLoading(true);
      console.log('=== STARTING REGISTRATION ===');
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

      // Step 1: Try to create Swell account (skip for doctor/pharmacy - created on approval)
      let swellAccountCreated = false;
      const shouldCreateSwellNow = !['doctor', 'pharmacy'].includes(userData.userType);

      if (shouldCreateSwellNow) {
        try {
          console.log('Step 1: Attempting to create Swell account...');
          const swellAccount = await swell.account.create({
            email: userData.email,
            password: userData.password,
            first_name: userData.firstName,
            last_name: userData.lastName,
            email_optin: true,
          });
          console.log('✅ Swell account created:', swellAccount.id);
          swellAccountCreated = true;

          console.log('Step 1b: Updating Swell account with metadata...');
          await swell.account.update({
            phone: userData.phone,
            metadata: {
              ...metadata,
              customer_type: userData.userType,
            },
          });
          console.log('✅ Swell account metadata updated');
        } catch (swellError: any) {
          console.warn('⚠️ Swell account creation failed, continuing with Supabase only:', swellError.message);
        }
      } else {
        console.log(`Step 1: Skipping Swell account creation for ${userData.userType} - will be created on approval`);
      }

      // Step 2: Store customer info in Supabase
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

      if (existingCustomer) {
        throw new Error('An account with this email already exists. Please try logging in instead.');
      }

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
        throw new Error('Failed to create account. Please try again.');
      }
      console.log('✅ Supabase customer created');

      // Step 3: Auto-login for regular customers
      if (!requiresVerification) {
        if (swellAccountCreated) {
          console.log('Step 3: Auto-login via Swell...');
          try {
            await login(userData.email, userData.password);
            console.log('✅ Auto-login successful');
          } catch (loginError) {
            console.warn('⚠️ Swell auto-login failed, setting local state only');
            // Set local state even if Swell login fails
            const sessionData = {
              id: insertData.customer_id,
              email: userData.email,
              first_name: userData.firstName,
              last_name: userData.lastName,
              name: `${userData.firstName} ${userData.lastName}`,
              phone: userData.phone,
              group: userData.userType,
            };
            localStorage.setItem('bahola_user_session', JSON.stringify(sessionData));
            setUser(sessionData);
            setIsAuthenticated(true);
            setCustomerType(userData.userType);
            setVerificationStatus('approved');
          }
        } else {
          // Supabase-only: set local state and persist to localStorage
          const sessionData = {
            id: insertData.customer_id,
            email: userData.email,
            first_name: userData.firstName,
            last_name: userData.lastName,
            name: `${userData.firstName} ${userData.lastName}`,
            phone: userData.phone,
            group: userData.userType,
          };
          localStorage.setItem('bahola_user_session', JSON.stringify(sessionData));
          setUser(sessionData);
          setIsAuthenticated(true);
          setCustomerType(userData.userType);
          setVerificationStatus('approved');
        }
      } else {
        console.log(`✅ ${userData.userType} registration completed - pending verification`);
        setVerificationStatus('pending');
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
