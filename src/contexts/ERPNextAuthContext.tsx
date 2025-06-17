import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  loginToERPNext, 
  logoutFromERPNext, 
  getCurrentUser, 
  createERPNextUser,
  createERPNextCustomer,
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

        // Don't try to get current user on initial load as we might not be logged in
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
      const loginResult = await loginToERPNext(email, password);
      
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
      
      // For now, skip ERPNext user creation and just create customer in Supabase
      // We'll create the customer record directly and handle ERPNext integration later
      console.log('Creating customer record in Supabase only...');

      // Store customer information in Supabase customers table
      const customerName = `${userData.firstName} ${userData.lastName}`;
      const verificationStatus = userData.userType === 'doctor' ? 'pending' : 'approved';
      
      await supabase.from('customers').insert({
        customer_id: `${userData.userType === 'doctor' ? 'DOC' : 'CUST'}${Date.now().toString().slice(-3)}`, // Temporary ID, will be replaced by trigger
        name: customerName,
        email: userData.email,
        phone: userData.phone || '',
        customer_type: userData.userType,
        verification_status: verificationStatus,
        medical_license: userData.userType === 'doctor' ? userData.medicalLicense : null,
        specialization: userData.userType === 'doctor' ? userData.specialization : null,
        clinic: userData.userType === 'doctor' ? userData.clinic : null,
        years_of_practice: userData.userType === 'doctor' && userData.yearsOfPractice ? parseInt(userData.yearsOfPractice) : null,
      });

      // Create a mock user object for the session
      const mockUser: ERPNextUser = {
        name: userData.email,
        email: userData.email,
        full_name: customerName,
        user_type: 'Website User',
        enabled: 1
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Registration failed:', error);
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
