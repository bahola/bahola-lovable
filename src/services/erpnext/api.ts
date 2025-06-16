
import { ERPNextItem } from '@/types/erpnext';

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
  private cookies: string = '';

  constructor(config: ERPNextConfig) {
    this.config = config;
  }

  async login(): Promise<{ success: boolean; error?: string }> {
    try {
      const formData = new FormData();
      formData.append('cmd', 'login');
      formData.append('usr', this.config.username);
      formData.append('pwd', this.config.password);
      formData.append('use_jwt', '1');

      const response = await fetch(`${this.config.url}/api/method/login`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }

      // Store cookies for subsequent requests
      const setCookie = response.headers.get('set-cookie');
      if (setCookie) {
        this.cookies = setCookie;
      }

      const data = await response.json();
      console.log('Login successful:', data);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown login error' 
      };
    }
  }

  async fetchItems(filters: Record<string, any> = {}): Promise<{ success: boolean; data?: ERPNextItem[]; error?: string }> {
    try {
      // Build filter string for ERPNext API
      const filterParams = new URLSearchParams();
      
      // Add basic filters
      filterParams.append('doctype', 'Item');
      filterParams.append('fields', JSON.stringify([
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

      // Add custom filters if provided
      if (Object.keys(filters).length > 0) {
        filterParams.append('filters', JSON.stringify(filters));
      }

      const response = await fetch(`${this.config.url}/api/resource/Item?${filterParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': this.cookies
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Items fetched successfully:', result.data?.length || 0, 'items');
      
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
      const response = await fetch(`${this.config.url}/api/method/ping`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Connection test failed: ${response.status} ${response.statusText}`);
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
}

// Export default instance
export const erpnextAPI = new ERPNextAPI({
  url: ERPNEXT_URL,
  username: '',
  password: ''
});
