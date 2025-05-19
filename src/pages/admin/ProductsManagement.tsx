
import React, { useState, useEffect } from 'react';
import AddProductSheet from '@/components/admin/AddProductSheet';
import ImportProductDialog from '@/components/admin/ImportProductDialog';
import SearchAndFilterBar from '@/components/admin/SearchAndFilterBar';
import ProductList from '@/components/admin/ProductList';
import { ProductListItem } from '@/data/sampleProducts';
import { initialCategories } from '@/components/admin/CategorySelect';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Fetch products from Supabase
  const fetchProducts = async () => {
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
          product_categories(name),
          product_variations(id)
        `);
      
      if (error) {
        throw error;
      }
      
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
        category: product.product_categories?.name || 'Uncategorized',
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
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [toast]);
  
  // Ensure categories are loaded
  console.log("Available categories:", initialCategories);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.hsnCode.includes(term) ||
        product.id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  
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
      />
      
      {/* Products Table */}
      <ProductList products={filteredProducts} isLoading={isLoading} />
    </div>
  );
};

export default ProductsManagement;
