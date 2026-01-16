import { useState, useEffect, useMemo } from 'react';
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
  stock_level?: number;
  category?: string;
  categories?: Array<{ id: string; name: string; slug: string }>;
  options?: Array<{
    id: string;
    name: string;
    values?: Array<{ id: string; name: string }>;
  }>;
  variants?: Array<{
    id: string;
    name: string;
    price: number;
    stock_level?: number;
    option_value_ids?: string[];
  }>;
  attributes?: Record<string, any>;
  content?: {
    benefits?: string[];
    usage?: string;
    ingredients?: string;
  };
}

export interface SwellProductsResult {
  products: SwellProduct[];
  loading: boolean;
  error: string | null;
  count: number;
  pages: number;
}

export const useSwellProducts = (options?: {
  category?: string;
  limit?: number;
  page?: number;
  search?: string;
}): SwellProductsResult => {
  const [products, setProducts] = useState<SwellProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(0);

  // Memoize options to prevent infinite loops
  const memoizedOptions = useMemo(() => ({
    category: options?.category,
    limit: options?.limit,
    page: options?.page,
    search: options?.search,
  }), [options?.category, options?.limit, options?.page, options?.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: Record<string, string> = {};
        
        if (memoizedOptions.limit) {
          params.limit = String(memoizedOptions.limit);
        }
        
        if (memoizedOptions.page) {
          params.page = String(memoizedOptions.page);
        }

        if (memoizedOptions.category) {
          params.category = memoizedOptions.category;
        }

        if (memoizedOptions.search) {
          params.search = memoizedOptions.search;
        }

        console.log('Fetching Swell products with params:', params);
        const result: any = await swell.products.list(params);
        console.log('Swell products result:', result);
        
        setProducts(result?.results || []);
        setCount(result?.count || 0);
        setPages(result?.pages || 0);
      } catch (err) {
        console.error('Error fetching Swell products:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [memoizedOptions]);

  return { products, loading, error, count, pages };
};

export const useSwellProduct = (productIdOrSlug?: string) => {
  const [product, setProduct] = useState<SwellProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productIdOrSlug) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching Swell product:', productIdOrSlug);
        const result: any = await swell.products.get(productIdOrSlug);
        console.log('Swell product result:', result);
        setProduct(result);
      } catch (err) {
        console.error('Error fetching Swell product:', err);
        setError('Failed to load product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productIdOrSlug]);

  return { product, loading, error };
};

// Helper to get primary image URL from Swell product
export const getSwellProductImage = (product: SwellProduct): string => {
  if (product.images && product.images.length > 0 && product.images[0]?.file?.url) {
    return product.images[0].file.url;
  }
  return '/placeholder.svg';
};

// Helper to get all image URLs from Swell product
export const getSwellProductImages = (product: SwellProduct): string[] => {
  if (!product.images || product.images.length === 0) {
    return ['/placeholder.svg'];
  }
  return product.images
    .filter(img => img?.file?.url)
    .map(img => img.file.url);
};

// Helper to calculate discount percentage
export const getSwellDiscountPercentage = (product: SwellProduct): number => {
  if (product.sale_price && product.price && product.sale_price < product.price) {
    return Math.round(((product.price - product.sale_price) / product.price) * 100);
  }
  return 0;
};

// Helper to get effective price (sale price if available, otherwise regular price)
export const getSwellEffectivePrice = (product: SwellProduct): number => {
  return product.sale_price || product.price || 0;
};
