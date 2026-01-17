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
    } catch (error) {
      console.error('[Swell API] Request failed:', error);
      throw error;
    }
  }

  // Account/Authentication methods
  account = {
    // Create a new customer account
    create: async (data: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      phone?: string;
      group?: string;
      type?: string;
      metadata?: Record<string, any>;
    }): Promise<SwellAccount> => {
      return this.request('/account', {
        method: 'POST',
        body: JSON.stringify(data),
      });
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
