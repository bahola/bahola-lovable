
/**
 * ERPNext API Service
 * This service handles communication with the ERPNext instance through a Supabase Edge Function proxy
 */

import { supabase } from "@/integrations/supabase/client";

// Define base URL type for better type safety
export interface ERPNextConfig {
  baseUrl: string;
  username: string;
  password: string;
}

// Store the config in memory (consider using localStorage or a more secure method in production)
let erpConfig: ERPNextConfig | null = null;

/**
 * Initialize the ERPNext connection config
 */
export const initializeERPNext = (config: ERPNextConfig): void => {
  erpConfig = config;
  console.log("ERPNext connection initialized with base URL:", config.baseUrl);
};

/**
 * Get the current ERPNext configuration
 */
export const getERPNextConfig = (): ERPNextConfig | null => {
  return erpConfig;
};

/**
 * Clear the ERPNext configuration
 */
export const clearERPNextConfig = (): void => {
  erpConfig = null;
};

/**
 * Make a request to the ERPNext API through the Supabase Edge Function proxy
 */
export const erpRequest = async <T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  if (!erpConfig) {
    throw new Error("ERPNext is not initialized. Call initializeERPNext first.");
  }

  try {
    console.log(`Making ERPNext API request via proxy: ${method} ${endpoint}`);
    
    const { data: result, error } = await supabase.functions.invoke('erpnext-proxy', {
      body: {
        baseUrl: erpConfig.baseUrl,
        endpoint,
        method,
        data,
      },
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`ERPNext proxy error: ${error.message}`);
    }

    if (result?.error) {
      // Handle ERPNext-specific errors
      if (result.code === 'SESSION_EXPIRED') {
        throw new Error('Authentication required. Please reconnect to ERPNext.');
      }
      throw new Error(result.error);
    }

    console.log('ERPNext API request successful via proxy');
    return result;
  } catch (error) {
    console.error("ERPNext API request failed:", error);
    throw error;
  }
};

/**
 * Make a login request to ERPNext through the proxy
 */
export const loginToERPNext = async (username: string, password: string): Promise<any> => {
  if (!erpConfig) {
    throw new Error("ERPNext is not initialized. Call initializeERPNext first.");
  }

  try {
    console.log('Attempting ERPNext login via proxy...');
    
    const { data: result, error } = await supabase.functions.invoke('erpnext-proxy', {
      body: {
        baseUrl: erpConfig.baseUrl,
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
 * Fetch list of all DocTypes
 */
export const getDocTypes = async (): Promise<string[]> => {
  const response = await erpRequest<{message: string[]}>('/api/method/frappe.desk.search.get_doctypes_for_global_search', 'GET');
  return response.message;
};

/**
 * Fetch list of records for a specific DocType
 */
export const getDocList = async <T>(doctype: string, fields: string[] = ['name'], filters?: any): Promise<T[]> => {
  const params = new URLSearchParams();
  params.append('doctype', doctype);
  params.append('fields', JSON.stringify(fields));
  
  if (filters) {
    params.append('filters', JSON.stringify(filters));
  }
  
  const response = await erpRequest<{message: T[]}>(`/api/resource/${doctype}?${params.toString()}`, 'GET');
  return response.message;
};

/**
 * Fetch a single document by DocType and name
 */
export const getDoc = async <T>(doctype: string, name: string): Promise<T> => {
  const response = await erpRequest<{message: T}>(`/api/resource/${doctype}/${name}`, 'GET');
  return response.message;
};

/**
 * Create a new document
 */
export const createDoc = async <T>(doctype: string, data: any): Promise<T> => {
  const response = await erpRequest<{message: T}>(`/api/resource/${doctype}`, 'POST', { data });
  return response.message;
};

/**
 * Update an existing document
 */
export const updateDoc = async <T>(doctype: string, name: string, data: any): Promise<T> => {
  const response = await erpRequest<{message: T}>(`/api/resource/${doctype}/${name}`, 'PUT', { data });
  return response.message;
};

/**
 * Delete a document
 */
export const deleteDoc = async (doctype: string, name: string): Promise<void> => {
  await erpRequest(`/api/resource/${doctype}/${name}`, 'DELETE');
};

/**
 * Run a custom method
 */
export const runMethod = async <T>(method: string, params?: any): Promise<T> => {
  const response = await erpRequest<{message: T}>(`/api/method/${method}`, 'POST', params);
  return response.message;
};
