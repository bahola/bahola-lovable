
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
 * Create a new customer in ERPNext via proxy
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
    const response = await erpRequest<{message: ERPNextCustomer}>('/api/resource/Customer', 'POST', data);
    return response.message;
  } catch (error) {
    console.error("Failed to create customer:", error);
    throw error;
  }
};

/**
 * Get customer by email via proxy
 */
export const getCustomerByEmail = async (email: string): Promise<ERPNextCustomer | null> => {
  try {
    const params = new URLSearchParams();
    params.append('filters', JSON.stringify([["email_id","=",email]]));
    
    const response = await erpRequest<{message: ERPNextCustomer[]}>(`/api/resource/Customer?${params.toString()}`, 'GET');
    return response.message && response.message.length > 0 ? response.message[0] : null;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
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
  const data = {
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
    new_password: userData.password,
    user_type: userData.user_type || 'Website User',
    enabled: 1,
    send_welcome_email: 0,
  };

  try {
    // Use your actual admin credentials for user creation
    const { data: result, error } = await supabase.functions.invoke('erpnext-proxy', {
      body: {
        baseUrl: 'https://bahola.net',
        endpoint: '/api/resource/User',
        method: 'POST',
        data,
        username: 'kartik@baholalabs.in', // Your actual admin username
        password: 'Murugan@1984', // Your actual admin password
      },
    });

    if (error) {
      console.error('Supabase function error during user creation:', error);
      throw new Error(`ERPNext user creation error: ${error.message}`);
    }

    if (result?.error) {
      throw new Error(result.error);
    }

    return result.message;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};
