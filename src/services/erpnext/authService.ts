
import { getERPNextConfig } from './erpnextService';

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
 * Login to ERPNext using email and password
 */
export const loginToERPNext = async (email: string, password: string): Promise<ERPNextLoginResponse> => {
  const config = getERPNextConfig();
  if (!config) {
    throw new Error("ERPNext is not initialized. Please configure ERPNext connection first.");
  }

  const response = await fetch(`${config.baseUrl}/api/method/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include', // Important for session cookies
    body: JSON.stringify({
      usr: email,
      pwd: password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      `ERPNext login failed: ${response.status} ${response.statusText} - ${
        errorData?.message || 'Invalid credentials'
      }`
    );
  }

  const result = await response.json();
  console.log('ERPNext login successful:', result);
  return result;
};

/**
 * Logout from ERPNext
 */
export const logoutFromERPNext = async (): Promise<void> => {
  const config = getERPNextConfig();
  if (!config) {
    throw new Error("ERPNext is not initialized.");
  }

  await fetch(`${config.baseUrl}/api/method/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/**
 * Get current user info from ERPNext
 */
export const getCurrentUser = async (): Promise<ERPNextUser> => {
  const config = getERPNextConfig();
  if (!config) {
    throw new Error("ERPNext is not initialized.");
  }

  const response = await fetch(`${config.baseUrl}/api/method/frappe.auth.get_logged_user`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get current user: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  return result.message;
};

/**
 * Create a new customer in ERPNext
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
  const config = getERPNextConfig();
  if (!config) {
    throw new Error("ERPNext is not initialized.");
  }

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

  const response = await fetch(`${config.baseUrl}/api/resource/Customer`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(`Failed to create customer: ${response.status} ${response.statusText} - ${errorData?.message || 'Unknown error'}`);
  }

  const result = await response.json();
  return result.data;
};

/**
 * Get customer by email
 */
export const getCustomerByEmail = async (email: string): Promise<ERPNextCustomer | null> => {
  try {
    const config = getERPNextConfig();
    if (!config) {
      throw new Error("ERPNext is not initialized.");
    }

    const response = await fetch(
      `${config.baseUrl}/api/resource/Customer?filters=[["email_id","=","${email}"]]`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch customer: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result.data && result.data.length > 0 ? result.data[0] : null;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
};

/**
 * Create ERPNext user account
 */
export const createERPNextUser = async (userData: {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  user_type?: string;
}): Promise<ERPNextUser> => {
  const config = getERPNextConfig();
  if (!config) {
    throw new Error("ERPNext is not initialized.");
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

  const response = await fetch(`${config.baseUrl}/api/resource/User`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(`Failed to create user: ${response.status} ${response.statusText} - ${errorData?.message || 'Unknown error'}`);
  }

  const result = await response.json();
  return result.data;
};
