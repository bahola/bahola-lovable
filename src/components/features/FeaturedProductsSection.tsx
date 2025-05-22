
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ProductCard } from '@/components/ProductCard';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string | number; // Updated to accept both string and number types
  name: string;
  price: number;
  rating: number;
  image: string;
}

export const FeaturedProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, image')
          .limit(6);
        
        if (error) {
          console.error('Error fetching products:', error);
        } else {
          console.log('Fetched featured products:', data);
          
          // Transform the data to match our Product interface
          const transformedProducts = data.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            rating: 4.7, // Default value
            image: product.image || '/placeholder.svg'
          }));
          
          setProducts(transformedProducts);
        }
      } catch (error) {
        console.error('Error in fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleViewAllProducts = () => {
    navigate('/category/all-products');
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Products</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-bahola-blue-500" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 mb-4">No products available. Add products in the admin panel.</p>
          </div>
        )}
        
        <div className="text-center mt-10">
          <Button 
            className="btn-bahola"
            onClick={handleViewAllProducts}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
