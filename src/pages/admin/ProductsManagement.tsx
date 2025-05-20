
import React, { useState, useEffect, useCallback } from 'react';
import AddProductSheet from '@/components/admin/AddProductSheet';
import ImportProductDialog from '@/components/admin/ImportProductDialog';
import SearchAndFilterBar from '@/components/admin/SearchAndFilterBar';
import ProductList from '@/components/admin/ProductList';
import { ProductListItem } from '@/data/sampleProducts';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Fetch products from Supabase with category and subcategory info
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          id, 
          name, 
          type, 
          hsn_code, 
          price, 
          stock,
          weight,
          dimensions,
          image,
          category:category_id(id, name),
          subcategory:subcategory_id(id, name),
          product_variations(id)
        `);
      
      if (error) {
        throw error;
      }
      
      console.log('Fetched products with categories:', data);
      
      // Transform the data to match our ProductListItem interface
      const transformedProducts: ProductListItem[] = data.map(product => ({
        id: product.id,
        name: product.name,
        // Ensure type is either 'simple' or 'variable'
        type: product.type === 'variable' ? 'variable' : 'simple',
        hsnCode: product.hsn_code,
        price: product.price,
        stock: product.stock || 0,
        variations: product.product_variations?.length || 0,
        category: product.category?.name || 'Uncategorized',
        subcategory: product.subcategory?.name || '',
      }));
      
      setProducts(transformedProducts);
      setFilteredProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Failed to load products",
        description: "There was an error loading the product data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  // Handle product deletion
  const handleDeleteProduct = async (productId: string) => {
    try {
      // First delete variations
      const { error: variationsError } = await supabase
        .from('product_variations')
        .delete()
        .eq('product_id', productId);
      
      if (variationsError) {
        throw variationsError;
      }
      
      // Then delete the product
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted."
      });
      
      // Refresh product list
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting the product.",
        variant: "destructive"
      });
    }
  };
  
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.hsnCode.includes(term) ||
        product.id.toLowerCase().includes(term.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(term.toLowerCase())) ||
        (product.subcategory && product.subcategory.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  }, [products]);

  // Provide a clear search function
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setFilteredProducts(products);
  }, [products]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        
        <div className="flex items-center gap-2">
          <AddProductSheet onProductAdded={() => {
            // Refresh product list after adding a product
            fetchProducts();
          }} />
          <ImportProductDialog />
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <SearchAndFilterBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        onClearSearch={handleClearSearch}
      />
      
      {/* Products Table */}
      <ProductList 
        products={filteredProducts} 
        isLoading={isLoading} 
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductsManagement;
