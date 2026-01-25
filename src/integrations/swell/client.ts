// Swell API client wrapper with enhanced error handling
const SWELL_STORE_ID = 'baholalabs';
const SWELL_PUBLIC_KEY = 'pk_7r06gV1fCa7kPbg1mSFTtetIZTI6qaC7';
const SWELL_API_URL = `https://${SWELL_STORE_ID}.swell.store/api`;

// Customer types available in Swell
export type SwellCustomerType = 'customer' | 'doctor' | 'pharmacy' | 'student';

// Customer group mapping in Swell
export const CUSTOMER_GROUPS: Record<SwellCustomerType, string> = {
  customer: 'customer',
  doctor: 'doctor',
  pharmacy: 'pharmacy',
  student: 'student',
};

// Types requiring verification before activation
export const REQUIRES_VERIFICATION: SwellCustomerType[] = ['doctor', 'pharmacy', 'student'];

export interface SwellAccount {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  phone?: string;
  group?: string;
  type?: string;
  metadata?: Record<string, any>;
  date_created?: string;
}

export interface SwellLoginResult {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  group?: string;
}

class SwellClient {
  private storeId: string;
  private publicKey: string;

  constructor(storeId: string, publicKey: string) {
    this.storeId = storeId;
    this.publicKey = publicKey;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${SWELL_API_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${this.publicKey}:`)}`,
      ...options.headers,
    };

    console.log(`[Swell API] ${options.method || 'GET'} ${url}`);
    if (options.body) {
      console.log('[Swell API] Request body:', options.body);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
        mode: 'cors',
      });

      const responseText = await response.text();
      console.log(`[Swell API] Response status: ${response.status}`);
      console.log('[Swell API] Response body:', responseText);

      if (!response.ok) {
        let errorMessage = `Swell API error: ${response.statusText}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // Use status text if response isn't JSON
        }
        throw new Error(errorMessage);
      }

      // Parse JSON if there's content
      if (responseText) {
        return JSON.parse(responseText);
      }
      return {};
    } catch (error: any) {
      console.error('[Swell API] Request failed:', error);
      
      // Check if it's a CORS error
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        console.error('[Swell API] Possible CORS issue - the Swell store may not be configured or accessible');
        throw new Error('Unable to connect to Swell. Please check if the store is properly configured.');
      }
      
      throw error;
    }
  }

  // Account/Authentication methods
  account = {
    // Create a new customer account
    // Swell Frontend API only supports: email, password, first_name, last_name, email_optin
    create: async (data: {
      email: string;
      password: string;
      first_name?: string;
      last_name?: string;
      email_optin?: boolean;
    }): Promise<SwellAccount> => {
      // Only send fields that Swell Frontend API accepts
      const swellData: Record<string, any> = {
        email: data.email,
        password: data.password,
      };
      
      if (data.first_name) swellData.first_name = data.first_name;
      if (data.last_name) swellData.last_name = data.last_name;
      if (data.email_optin !== undefined) swellData.email_optin = data.email_optin;
      
      console.log('[Swell API] Creating account with data:', {
        email: swellData.email,
        first_name: swellData.first_name,
        last_name: swellData.last_name,
        email_optin: swellData.email_optin,
      });
      
      const result = await this.request('/account', {
        method: 'POST',
        body: JSON.stringify(swellData),
      });
      
      console.log('[Swell API] Account creation result:', result);
      
      if (!result || !result.id) {
        throw new Error('Failed to create account - no account ID returned from Swell');
      }
      
      return result;
    },

    // Login to existing account
    login: async (email: string, password: string): Promise<SwellLoginResult> => {
      return this.request('/account/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },

    // Logout current session
    logout: async (): Promise<void> => {
      return this.request('/account/logout', {
        method: 'POST',
      });
    },

    // Get current logged-in account
    get: async (): Promise<SwellAccount | null> => {
      try {
        return await this.request('/account');
      } catch {
        return null;
      }
    },

    // Update account details
    update: async (data: Partial<SwellAccount>): Promise<SwellAccount> => {
      return this.request('/account', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    // Recover password
    recover: async (email: string): Promise<{ success: boolean }> => {
      return this.request('/account/recover', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    },

    // Reset password with token
    resetPassword: async (token: string, password: string): Promise<{ success: boolean }> => {
      return this.request('/account/recover', {
        method: 'PUT',
        body: JSON.stringify({ reset_key: token, password }),
      });
    },
  };

  products = {
    list: async (params?: any) => {
      const queryParams = new URLSearchParams(params).toString();
      return this.request(`/products${queryParams ? `?${queryParams}` : ''}`);
    },
    get: async (id: string) => {
      return this.request(`/products/${id}`);
    },
  };

  cart = {
    get: async () => {
      return this.request('/cart');
    },
    recover: async (checkoutId: string) => {
      // Recover a cart session using checkout_id
      return this.request(`/cart?checkout_id=${checkoutId}`);
    },
    addItem: async (item: any) => {
      return this.request('/cart/items', {
        method: 'POST',
        body: JSON.stringify(item),
      });
    },
    updateItem: async (itemId: string, item: any) => {
      return this.request(`/cart/items/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify(item),
      });
    },
    removeItem: async (itemId: string) => {
      return this.request(`/cart/items/${itemId}`, {
        method: 'DELETE',
      });
    },
    setItems: async (items: any[]) => {
      return this.request('/cart/items', {
        method: 'PUT',
        body: JSON.stringify({ items }),
      });
    },
  };

  categories = {
    list: async (params?: any) => {
      const queryParams = new URLSearchParams(params).toString();
      return this.request(`/categories${queryParams ? `?${queryParams}` : ''}`);
    },
    get: async (id: string) => {
      return this.request(`/categories/${id}`);
    },
  };
}

export const swell = new SwellClient(SWELL_STORE_ID, SWELL_PUBLIC_KEY);
