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
  }) => {
    try {
      setIsLoading(true);
      
      // Create ERPNext user account
      const newUser = await createERPNextUser({
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        password: userData.password,
        user_type: userData.userType === 'doctor' ? 'System User' : 'Website User',
      });

      // Create customer record
      const customerName = `${userData.firstName} ${userData.lastName}`;
      await createERPNextCustomer({
        customer_name: customerName,
        email_id: userData.email,
        mobile_no: userData.phone,
        customer_type: userData.userType === 'doctor' ? 'Company' : 'Individual',
        customer_group: userData.userType === 'doctor' ? 'Healthcare Professional' : 'All Customer Groups',
      });

      // Automatically log in the user after registration
      await login(userData.email, userData.password);
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
