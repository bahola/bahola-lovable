// Swell API client wrapper
const SWELL_STORE_ID = 'baholalabs';
const SWELL_PUBLIC_KEY = 'pk_7r06gV1fCa7kPbg1mSFTtetIZTI6qaC7';
const SWELL_API_URL = `https://${SWELL_STORE_ID}.swell.store/api`;

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

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Swell API error: ${response.statusText}`);
    }

    return response.json();
  }

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
