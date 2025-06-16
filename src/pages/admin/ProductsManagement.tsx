
import React, { useState, useEffect, useCallback } from 'react';
import AddProductSheet from '@/components/admin/AddProductSheet';
import ImportProductDialog from '@/components/admin/ImportProductDialog';
import ERPNextProductImport from '@/components/erpnext/ERPNextProductImport';
import SearchAndFilterBar from '@/components/admin/SearchAndFilterBar';
import ProductList from '@/components/admin/ProductList';
import { ProductListItem } from '@/data/sampleProducts';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Upload, Database } from 'lucide-react';

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
      console.log('Fetching products from database...');
      
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
        console.error('Error fetching products:', error);
        throw error;
      }
      
      console.log('Raw fetched products:', data);
      
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
      
      console.log('Transformed products:', transformedProducts);
      
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
            console.log('Product added, refreshing list...');
            // Refresh product list after adding a product
            fetchProducts();
          }} />
        </div>
      </div>
      
      {/* Import and Manage Tabs */}
      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Manage Products
          </TabsTrigger>
          <TabsTrigger value="excel-import" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Excel Import
          </TabsTrigger>
          <TabsTrigger value="erpnext-import" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            ERPNext Import
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="manage" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="excel-import">
          <ImportProductDialog />
        </TabsContent>
        
        <TabsContent value="erpnext-import">
          <ERPNextProductImport />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsManagement;
