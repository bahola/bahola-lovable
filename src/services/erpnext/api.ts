
import { ERPNextItem } from '@/types/erpnext';
import { supabase } from '@/integrations/supabase/client';

// Base API configuration
const ERPNEXT_URL = 'https://bahola.net';

export interface ERPNextConfig {
  url: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  home_page: string;
  full_name: string;
}

export class ERPNextAPI {
  private config: ERPNextConfig;
  private isAuthenticated: boolean = false;

  constructor(config: ERPNextConfig) {
    this.config = config;
  }

  updateCredentials(username: string, password: string) {
    this.config.username = username;
    this.config.password = password;
    this.isAuthenticated = false;
  }

  async login(): Promise<{ success: boolean; error?: string }> {
    if (!this.config.username || !this.config.password) {
      return { 
        success: false, 
        error: 'Username and password are required' 
      };
    }

    try {
      console.log('Attempting ERPNext login via proxy...');
      
      const { data: result, error } = await supabase.functions.invoke('erpnext-proxy', {
        body: {
          baseUrl: this.config.url,
          endpoint: '/api/method/login',
          method: 'POST',
          username: this.config.username,
          password: this.config.password,
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
      this.isAuthenticated = true;
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      this.isAuthenticated = false;
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown login error' 
      };
    }
  }

  async fetchItems(filters: Record<string, any> = {}): Promise<{ success: boolean; data?: ERPNextItem[]; error?: string }> {
    // Ensure we're authenticated before making requests
    if (!this.isAuthenticated) {
      const loginResult = await this.login();
      if (!loginResult.success) {
        return {
          success: false,
          error: `Authentication failed: ${loginResult.error}`
        };
      }
    }

    try {
      console.log('Fetching ERPNext items via proxy...');
      
      // Use ERPNext's resource API directly with simple query parameters
      const params = new URLSearchParams();
      params.append('fields', JSON.stringify([
        'name',
        'item_code',
        'item_name', 
        'item_group',
        'description',
        'standard_rate',
        'stock_uom',
        'disabled',
        'gst_hsn_code',
        'hsn_code',
        'creation',
        'modified'
      ]));
      
      // Add item group filter
      params.append('filters', JSON.stringify([
        ['item_group', 'in', ['Brands', 'Generics']]
      ]));
      
      // Add disabled filter if not importing disabled items
      if (!filters.disabled) {
        params.append('filters', JSON.stringify([
          ['item_group', 'in', ['Brands', 'Generics']],
          ['disabled', '=', 0]
        ]));
      }
      
      params.append('limit_page_length', '1000');

      const { data: result, error } = await supabase.functions.invoke('erpnext-proxy', {
        body: {
          baseUrl: this.config.url,
          endpoint: `/api/resource/Item?${params.toString()}`,
          method: 'GET',
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`ERPNext proxy error: ${error.message}`);
      }

      if (result?.error) {
        // Handle ERPNext-specific errors
        if (result.code === 'SESSION_EXPIRED') {
          this.isAuthenticated = false;
          // Try to login again and retry
          const loginResult = await this.login();
          if (loginResult.success) {
            return this.fetchItems(filters);
          }
        }
        throw new Error(result.error);
      }

      console.log('Items fetched successfully via proxy:', result.data?.length || 0, 'items');
      
      return { 
        success: true, 
        data: result.data || [] 
      };
    } catch (error) {
      console.error('Fetch items error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown fetch error' 
      };
    }
  }

  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: result, error } = await supabase.functions.invoke('erpnext-proxy', {
        body: {
          baseUrl: this.config.url,
          endpoint: '/api/method/ping',
          method: 'GET',
        },
      });

      if (error) {
        throw new Error(`Connection test failed: ${error.message}`);
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      return { success: true };
    } catch (error) {
      console.error('Connection test error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Connection failed' 
      };
    }
  }

  isConfigured(): boolean {
    return !!(this.config.username && this.config.password);
  }
}

// Export default instance
export const erpnextAPI = new ERPNextAPI({
  url: ERPNEXT_URL,
  username: '',
  password: ''
});
