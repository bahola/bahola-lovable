
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  loginToERPNext, 
  logoutFromERPNext, 
  getCurrentUser, 
  createERPNextUser,
  createERPNextCustomer,
  getCustomerByEmail,
  ERPNextUser 
} from '@/services/erpnext/authService';
import { initializeERPNext, getERPNextConfig } from '@/services/erpnext/erpnextService';
import { supabase } from '@/integrations/supabase/client';

interface ERPNextAuthContextType {
  user: ERPNextUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    userType: 'customer' | 'doctor';
    medicalLicense?: string;
    specialization?: string;
    clinic?: string;
    yearsOfPractice?: string;
  }) => Promise<void>;
}

const ERPNextAuthContext = createContext<ERPNextAuthContextType | undefined>(undefined);

export const useERPNextAuth = () => {
  const context = useContext(ERPNextAuthContext);
  if (context === undefined) {
    throw new Error('useERPNextAuth must be used within an ERPNextAuthProvider');
  }
  return context;
};

interface ERPNextAuthProviderProps {
  children: ReactNode;
}

export const ERPNextAuthProvider: React.FC<ERPNextAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<ERPNextUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize ERPNext connection
    initializeERPNext({
      baseUrl: 'https://bahola.net',
      username: '', // Will be set during login
      password: '', // Will be set during login
    });

    const checkAuthStatus = async () => {
      try {
        const config = getERPNextConfig();
        if (!config) {
          setIsLoading(false);
          return;
        }

        console.log('ERPNext config initialized, ready for login');
      } catch (error) {
        console.log('ERPNext not configured or user not authenticated');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Starting login process for:', email);
      
      const loginResult = await loginToERPNext(email, password);
      console.log('ERPNext login result:', loginResult);
      
      // Create a user object from login result since getCurrentUser might not work
      const userFromLogin: ERPNextUser = {
        name: loginResult.user || email,
        email: email,
        full_name: loginResult.full_name || email,
        user_type: 'System User',
        enabled: 1
      };
      
      setUser(userFromLogin);
      setIsAuthenticated(true);
      
      // Try to get additional user details, but don't fail if it doesn't work
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.log('Could not fetch detailed user info, using basic info from login');
        // Keep the basic user info from login
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
      await logoutFromERPNext();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    userType: 'customer' | 'doctor';
    medicalLicense?: string;
    specialization?: string;
    clinic?: string;
    yearsOfPractice?: string;
  }) => {
    try {
      setIsLoading(true);
      console.log('=== STARTING REGISTRATION ===');
      console.log('User data:', { 
        email: userData.email, 
        userType: userData.userType,
        firstName: userData.firstName,
        lastName: userData.lastName 
      });
      
      // Step 1: Create ERPNext user account
      console.log('Step 1: Creating ERPNext user...');
      let newUser;
      try {
        newUser = await createERPNextUser({
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          password: userData.password,
          user_type: 'Website User',
        });
        console.log('✅ ERPNext user created/exists:', newUser.email);
      } catch (error) {
        console.error('❌ ERPNext user creation failed:', error);
        throw new Error(`Failed to create user account: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Step 2: Check if customer already exists in ERPNext
      console.log('Step 2: Checking if customer exists in ERPNext...');
      let existingCustomer;
      try {
        existingCustomer = await getCustomerByEmail(userData.email);
        console.log('Customer check result:', existingCustomer ? '✅ Exists' : '❌ Not found');
      } catch (error) {
        console.warn('⚠️ Error checking existing customer (proceeding anyway):', error);
      }
      
      // Step 3: Create customer record if it doesn't exist
      if (!existingCustomer) {
        console.log('Step 3: Creating ERPNext customer...');
        try {
          const customerName = `${userData.firstName} ${userData.lastName}`;
          
          // Set customer group based on user type
          const customerGroup = userData.userType === 'doctor' ? 'Online Doctor' : 'All Customer Groups';
          
          await createERPNextCustomer({
            customer_name: customerName,
            email_id: userData.email,
            mobile_no: userData.phone,
            customer_type: 'Individual',
            customer_group: customerGroup,
            territory: 'All Territories',
          });
          console.log(`✅ ERPNext customer created successfully with group: ${customerGroup}`);
        } catch (error) {
          console.error('❌ ERPNext customer creation failed:', error);
          // Don't fail registration if customer creation fails - proceed anyway
          console.log('⚠️ Proceeding with registration despite customer creation failure');
        }
      } else {
        console.log('✅ Customer already exists in ERPNext, skipping creation');
      }

      // Step 4: Store additional information in Supabase
      console.log('Step 4: Creating Supabase customer record...');
      const verificationStatus = userData.userType === 'doctor' ? 'pending' : 'approved';
      
      try {
        // Check if customer already exists in Supabase
        const { data: existingSupabaseCustomer, error: checkError } = await supabase
          .from('customers')
          .select('id')
          .eq('email', userData.email)
          .maybeSingle();

        if (checkError) {
          console.error('Error checking Supabase customer:', checkError);
        }

        if (!existingSupabaseCustomer) {
          const { data: insertData, error: insertError } = await supabase.from('customers').insert({
            customer_id: `${userData.userType === 'doctor' ? 'DOC' : 'CUST'}${Date.now().toString().slice(-6)}`,
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            phone: userData.phone || '',
            customer_type: userData.userType,
            verification_status: verificationStatus,
            medical_license: userData.userType === 'doctor' ? userData.medicalLicense : null,
            specialization: userData.userType === 'doctor' ? userData.specialization : null,
            clinic: userData.userType === 'doctor' ? userData.clinic : null,
            years_of_practice: userData.userType === 'doctor' && userData.yearsOfPractice ? parseInt(userData.yearsOfPractice) : null,
          }).select();

          if (insertError) {
            console.error('❌ Supabase customer creation failed:', insertError);
            throw new Error(`Failed to store customer information: ${insertError.message}`);
          }
          
          console.log('✅ Supabase customer created successfully:', insertData);
        } else {
          console.log('✅ Customer already exists in Supabase, skipping creation');
        }
      } catch (error) {
        console.error('❌ Supabase operation failed:', error);
        throw new Error(`Failed to store customer information: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Step 5: Automatically log in the user after registration
      console.log('Step 5: Logging in user after registration...');
      try {
        await login(userData.email, userData.password);
        console.log('✅ Auto-login successful');
        console.log('=== REGISTRATION COMPLETED SUCCESSFULLY ===');
      } catch (error) {
        console.error('❌ Auto-login failed:', error);
        throw new Error(`Registration successful but login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
      
    } catch (error) {
      console.error('❌ REGISTRATION FAILED:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: ERPNextAuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return (
    <ERPNextAuthContext.Provider value={value}>
      {children}
    </ERPNextAuthContext.Provider>
  );
};
