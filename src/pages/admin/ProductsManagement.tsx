
import React, { useState } from 'react';
import AddProductSheet from '@/components/admin/AddProductSheet';
import ImportProductDialog from '@/components/admin/ImportProductDialog';
import SearchAndFilterBar from '@/components/admin/SearchAndFilterBar';
import ProductList from '@/components/admin/ProductList';
import { sampleProducts, ProductListItem } from '@/data/sampleProducts';
import { initialCategories } from '@/components/admin/CategorySelect';

const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductListItem[]>(sampleProducts);
  
  // Ensure categories are loaded
  console.log("Available categories:", initialCategories);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredProducts(sampleProducts);
    } else {
      const filtered = sampleProducts.filter(product => 
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
          <AddProductSheet />
          <ImportProductDialog />
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <SearchAndFilterBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
      />
      
      {/* Products Table */}
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default ProductsManagement;
