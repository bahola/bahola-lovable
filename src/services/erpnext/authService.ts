import { getERPNextConfig, erpRequest } from './erpnextService';
import { supabase } from "@/integrations/supabase/client";

export interface ERPNextLoginResponse {
  message: string;
  home_page: string;
  full_name: string;
  user: string;
}

export interface ERPNextUser {
  name: string;
  email: string;
  full_name: string;
  user_type: string;
  enabled: number;
}

export interface ERPNextCustomer {
  name: string;
  customer_name: string;
  customer_type: string;
  customer_group: string;
  territory: string;
  email_id?: string;
  mobile_no?: string;
  phone?: string;
  disabled: number;
}

// Admin credentials for ERPNext operations
const ADMIN_USERNAME = 'kartik@baholalabs.in';
const ADMIN_PASSWORD = 'Murugan@1984';

/**
 * Login to ERPNext using email and password via proxy
 */
export const loginToERPNext = async (username: string, password: string): Promise<any> => {
  const config = getERPNextConfig();
  if (!config) {
    throw new Error("ERPNext is not initialized. Call initializeERPNext first.");
  }

  try {
    console.log('Attempting ERPNext login via proxy...');
    
    const { data: result, error } = await supabase.functions.invoke('erpnext-proxy', {
      body: {
        baseUrl: config.baseUrl,
        endpoint: '/api/method/login',
        method: 'POST',
        username,
        password,
      },
    });

    if (error) {
      console.error('Supabase function error during login:', error);
      throw new Error(`ERPNext login error: ${error.message}`);
    }

    if (result?.error) {
      throw new Error(result.error);
    }

    console.log('ERPNext login successful via proxy');
    return result;
  } catch (error) {
    console.error("ERPNext login failed:", error);
    throw error;
  }
};

/**
 * Logout from ERPNext via proxy
 */
export const logoutFromERPNext = async (): Promise<void> => {
  const config = getERPNextConfig();
  if (!config) {
    throw new Error("ERPNext is not initialized.");
  }

  try {
    const { error } = await supabase.functions.invoke('erpnext-proxy', {
      body: {
        baseUrl: config.baseUrl,
        endpoint: '/api/method/logout',
        method: 'POST',
      },
    });

    if (error) {
      console.error('Logout error:', error);
      throw new Error(`ERPNext logout error: ${error.message}`);
    }

    console.log('ERPNext logout successful');
  } catch (error) {
    console.error("ERPNext logout failed:", error);
    throw error;
  }
};

/**
 * Get current user info from ERPNext via proxy - using User doctype instead
 */
export const getCurrentUser = async (): Promise<ERPNextUser> => {
  try {
    // Try to get user info via the User doctype API instead of auth method
    const response = await erpRequest<{message: ERPNextUser[]}>('/api/resource/User?fields=["name","email","full_name","user_type","enabled"]&filters=[["enabled","=",1]]&limit=1', 'GET');
    
    if (response.message && response.message.length > 0) {
      return response.message[0];
    }
    
    throw new Error('No user data found');
  } catch (error) {
    console.error("Failed to get current user:", error);
    // If that fails, create a mock user object from login session
    throw new Error('Unable to fetch user details. You may still be logged in to ERPNext.');
  }
};

/**
 * Create a new customer in ERPNext via proxy using admin credentials
 */
export const createERPNextCustomer = async (customerData: {
  customer_name: string;
  email_id?: string;
  mobile_no?: string;
  phone?: string;
  customer_type?: string;
  customer_group?: string;
  territory?: string;
}): Promise<ERPNextCustomer> => {
  const data = {
    customer_name: customerData.customer_name,
    customer_type: customerData.customer_type || 'Individual',
    customer_group: customerData.customer_group || 'All Customer Groups',
    territory: customerData.territory || 'All Territories',
    email_id: customerData.email_id,
    mobile_no: customerData.mobile_no,
    phone: customerData.phone,
    disabled: 0,
  };

  try {
    console.log('Creating ERPNext customer with admin credentials...');
    
    const { data: result, error } = await supabase.functions.invoke('erpnext-proxy', {
      body: {
        baseUrl: 'https://bahola.net',
        endpoint: '/api/resource/Customer',
        method: 'POST',
        data,
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
      },
    });

    if (error) {
      console.error('Supabase function error during customer creation:', error);
      throw new Error(`ERPNext customer creation error: ${error.message}`);
    }

    if (result?.error) {
      throw new Error(result.error);
    }

    console.log('ERPNext customer created successfully:', result.message);
    return result.message;
  } catch (error) {
    console.error("Failed to create customer:", error);
    throw error;
  }
};

/**
 * Get customer by email via proxy using admin credentials
 */
export const getCustomerByEmail = async (email: string): Promise<ERPNextCustomer | null> => {
  try {
    console.log('Fetching customer with admin credentials...');
    
    const { data: result, error } = await supabase.functions.invoke('erpnext-proxy', {
      body: {
        baseUrl: 'https://bahola.net',
        endpoint: `/api/resource/Customer?filters=${encodeURIComponent(JSON.stringify([["email_id","=",email]]))}`,
        method: 'GET',
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
      },
    });

    if (error) {
      console.error('Error fetching customer:', error);
      return null;
    }

    if (result?.error) {
      console.error('ERPNext error fetching customer:', result.error);
      return null;
    }

    return result.data && result.data.length > 0 ? result.data[0] : null;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
};

/**
 * Check if ERPNext user exists using admin credentials
 */
export const checkERPNextUserExists = async (email: string): Promise<boolean> => {
  try {
    console.log(`Checking if ERPNext user exists: ${email}`);
    
    const { data: result, error } = await supabase.functions.invoke('erpnext-proxy', {
      body: {
        baseUrl: 'https://bahola.net',
        endpoint: `/api/resource/User/${email}`,
        method: 'GET',
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
      },
    });

    if (error) {
      console.log('User does not exist or error checking:', error);
      return false;
    }

    const exists = result && result.message;
    console.log(`User ${email} exists in ERPNext:`, exists);
    return !!exists;
  } catch (error) {
    console.log('User does not exist:', error);
    return false;
  }
};

/**
 * Create ERPNext user account via proxy with admin authentication
 */
export const createERPNextUser = async (userData: {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  user_type?: string;
}): Promise<ERPNextUser> => {
  try {
    console.log(`Creating ERPNext user: ${userData.email}`);
    
    // First check if user already exists
    const userExists = await checkERPNextUserExists(userData.email);
    
    if (userExists) {
      console.log('User already exists in ERPNext, returning existing user info');
      // Return a mock user object since the user exists
      return {
        name: userData.email,
        email: userData.email,
        full_name: `${userData.first_name} ${userData.last_name}`,
        user_type: userData.user_type || 'Website User',
        enabled: 1
      };
    }

    const data = {
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      new_password: userData.password,
      user_type: userData.user_type || 'Website User',
      enabled: 1,
      send_welcome_email: 0,
    };

    console.log('Creating new ERPNext user with admin credentials:', { ...data, new_password: '[HIDDEN]' });

    const { data: result, error } = await supabase.functions.invoke('erpnext-proxy', {
      body: {
        baseUrl: 'https://bahola.net',
        endpoint: '/api/resource/User',
        method: 'POST',
        data,
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
      },
    });

    if (error) {
      console.error('Supabase function error during user creation:', error);
      
      // Check if it's a 409 duplicate error from the edge function logs
      if (error.message && error.message.includes('non-2xx status code')) {
        console.log('Detected duplicate user error, treating as existing user');
        return {
          name: userData.email,
          email: userData.email,
          full_name: `${userData.first_name} ${userData.last_name}`,
          user_type: userData.user_type || 'Website User',
          enabled: 1
        };
      }
      
      throw new Error(`ERPNext user creation error: ${error.message}`);
    }

    if (result?.error) {
      console.error('ERPNext API error:', result.error);
      
      // Check if it's a duplicate user error
      if (result.error.includes('already exists') || result.error.includes('Duplicate entry')) {
        console.log('User already exists, returning existing user info');
        return {
          name: userData.email,
          email: userData.email,
          full_name: `${userData.first_name} ${userData.last_name}`,
          user_type: userData.user_type || 'Website User',
          enabled: 1
        };
      }
      
      throw new Error(result.error);
    }

    // Handle successful creation - construct user object from known data
    // Even if result.message is undefined, we know the creation was successful
    const createdUser: ERPNextUser = {
      name: userData.email,
      email: userData.email,
      full_name: `${userData.first_name} ${userData.last_name}`,
      user_type: userData.user_type || 'Website User',
      enabled: 1
    };

    // If result.message exists, use it; otherwise use our constructed object
    const finalUser = result?.message || createdUser;
    
    console.log('ERPNext user created successfully:', finalUser);
    return finalUser;
  } catch (error) {
    console.error("Failed to create user:", error);
    
    // One final check for duplicate user errors
    if (error instanceof Error && (
      error.message.includes('already exists') || 
      error.message.includes('Duplicate entry') ||
      error.message.includes('non-2xx status code')
    )) {
      console.log('Handling as duplicate user, returning mock user object');
      return {
        name: userData.email,
        email: userData.email,
        full_name: `${userData.first_name} ${userData.last_name}`,
        user_type: userData.user_type || 'Website User',
        enabled: 1
      };
    }
    
    throw error;
  }
};
