import { useState, useEffect } from 'react';
import { swell } from '@/integrations/swell/client';

export interface SwellProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  sale_price?: number;
  images?: Array<{ file: { url: string } }>;
  slug?: string;
  stock_status?: string;
  category?: string;
  categories?: Array<{ id: string; name: string }>;
}

export const useSwellProducts = (options?: {
  category?: string;
  limit?: number;
  page?: number;
  search?: string;
}) => {
  const [products, setProducts] = useState<SwellProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: any = {
          limit: options?.limit || 20,
          page: options?.page || 1
        };

        if (options?.category) {
          params.category = options.category;
        }

        if (options?.search) {
          params.search = options.search;
        }

        const result: any = await swell.products.list(params);
        setProducts(result.results || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [options?.category, options?.limit, options?.page, options?.search]);

  return { products, loading, error };
};

export const useSwellProduct = (productId?: string) => {
  const [product, setProduct] = useState<SwellProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const result: any = await swell.products.get(productId);
        setProduct(result);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};
