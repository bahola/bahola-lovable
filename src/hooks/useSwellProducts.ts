import { useState, useEffect, useMemo } from 'react';
import { swell } from '@/integrations/swell/client';
import { getSwellSubcategorySlug, getSubcategoryLetter } from '@/config/swellCategoryMapping';

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
  subcategory?: string;
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
    subcategory: options?.subcategory,
    limit: options?.limit,
    page: options?.page,
    search: options?.search,
  }), [options?.category, options?.subcategory, options?.limit, options?.page, options?.search]);

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

        // Check if we should use Swell subcategory directly
        const swellSubcategory = memoizedOptions.category && memoizedOptions.subcategory 
          ? getSwellSubcategorySlug(memoizedOptions.category, memoizedOptions.subcategory)
          : null;
        
        // First try with Swell subcategory if available
        if (swellSubcategory) {
          params.category = swellSubcategory;
          console.log(`Trying Swell subcategory: ${swellSubcategory}`);
        } else if (memoizedOptions.category) {
          params.category = memoizedOptions.category;
        }

        if (memoizedOptions.search) {
          params.search = memoizedOptions.search;
        }

        console.log('Fetching Swell products with params:', params);
        let result: any = await swell.products.list(params);
        console.log('Swell products result:', result);
        
        let fetchedProducts = result?.results || [];
        
        // If subcategory fetch returned 0 results, fall back to parent category + name filter
        if (swellSubcategory && fetchedProducts.length === 0 && memoizedOptions.category) {
          console.log(`Subcategory ${swellSubcategory} returned 0 results, falling back to parent category with name filter`);
          params.category = memoizedOptions.category;
          result = await swell.products.list(params);
          fetchedProducts = result?.results || [];
          
          // Filter by first letter of product name
          if (memoizedOptions.subcategory) {
            const letter = getSubcategoryLetter(memoizedOptions.subcategory);
            fetchedProducts = fetchedProducts.filter((product: SwellProduct) => 
              product.name.toLowerCase().startsWith(letter)
            );
            console.log(`Filtered by first letter '${letter}':`, fetchedProducts.length, 'products');
          }
        }
        
        // If subcategory is provided but no Swell subcategory mapping exists, filter by first letter
        if (memoizedOptions.subcategory && !swellSubcategory) {
          const letter = getSubcategoryLetter(memoizedOptions.subcategory);
          fetchedProducts = fetchedProducts.filter((product: SwellProduct) => 
            product.name.toLowerCase().startsWith(letter)
          );
          console.log(`Filtered by subcategory '${letter}':`, fetchedProducts.length, 'products');
        }
        
        setProducts(fetchedProducts);
        setCount(memoizedOptions.subcategory ? fetchedProducts.length : (result?.count || 0));
        setPages(memoizedOptions.subcategory ? 1 : (result?.pages || 0));
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
// For products with variants, returns the minimum variant price if base price is 0
export const getSwellEffectivePrice = (product: SwellProduct): number => {
  const basePrice = product.sale_price || product.price || 0;
  
  // If base price is 0 and product has variants, find minimum variant price
  if (basePrice === 0 && product.variants && product.variants.length > 0) {
    const variantPrices = product.variants
      .map(v => v.price)
      .filter(p => p != null && p > 0);
    
    if (variantPrices.length > 0) {
      return Math.min(...variantPrices);
    }
  }
  
  return basePrice;
};

// Helper to get minimum price from variants (for "From ₹X" display)
export const getSwellMinVariantPrice = (product: SwellProduct): number | null => {
  if (!product.variants || product.variants.length === 0) {
    return null;
  }
  
  const variantPrices = product.variants
    .map(v => v.price)
    .filter(p => p != null && p > 0);
  
  if (variantPrices.length === 0) {
    return null;
  }
  
  return Math.min(...variantPrices);
};
