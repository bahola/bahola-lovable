
import { erpRequest, getERPNextConfig } from './erpnextService';

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
    },
    credentials: 'include',
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

  return await response.json();
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
  });
};

/**
 * Get current user info from ERPNext
 */
export const getCurrentUser = async (): Promise<ERPNextUser> => {
  return await erpRequest<ERPNextUser>('/api/method/frappe.auth.get_logged_user', 'GET');
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

  return await erpRequest<ERPNextCustomer>('/api/resource/Customer', 'POST', data);
};

/**
 * Get customer by email
 */
export const getCustomerByEmail = async (email: string): Promise<ERPNextCustomer | null> => {
  try {
    const customers = await erpRequest<ERPNextCustomer[]>(
      `/api/resource/Customer?filters=[["email_id","=","${email}"]]`,
      'GET'
    );
    return customers.length > 0 ? customers[0] : null;
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
  const data = {
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
    new_password: userData.password,
    user_type: userData.user_type || 'Website User',
    enabled: 1,
    send_welcome_email: 0,
  };

  return await erpRequest<ERPNextUser>('/api/resource/User', 'POST', data);
};
