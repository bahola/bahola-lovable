
import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { Filter, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState('popularity');
  
  // This would come from an API in a real implementation
  const getCategoryName = (id: string) => {
    const categoryMap: {[key: string]: string} = {
      'mother-tinctures': 'Mother Tinctures',
      'dilutions': 'Dilutions',
      'biochemics': 'Biochemics',
      'lm-potencies': 'LM Potencies',
      'bach-flower': 'Bach Flower Remedies',
      'combinations': 'Combination Remedies'
    };
    return categoryMap[id] || 'Products';
  };
  
  // Dummy products for display purposes - would come from an API
  const products = Array(12).fill(null).map((_, index) => ({
    id: `product-${index}`,
    name: `${getCategoryName(categoryId || '')} Product ${index + 1}`,
    description: 'A high-quality homeopathic remedy for natural healing',
    price: Math.floor(Math.random() * 500) + 100,
    image: '/placeholder.svg',
    discountPercentage: index % 3 === 0 ? 10 : 0,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviewCount: Math.floor(Math.random() * 100)
  }));
  
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
  };
  
  return (
    <PageLayout 
      title={getCategoryName(categoryId || '')} 
      description={`Browse our collection of ${getCategoryName(categoryId || '').toLowerCase()} and find the perfect remedy for your needs`}
    >
      <div className="lg:grid lg:grid-cols-4 gap-8">
        {/* Mobile Filters Toggle */}
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFilters.length > 0 && (
              <span className="ml-2 bg-bahola-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </Button>
          
          <div className="flex items-center">
            <label htmlFor="mobile-sort" className="mr-2 text-sm">Sort:</label>
            <select 
              id="mobile-sort"
              className="border rounded-md px-2 py-1"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
        
        {/* Mobile Filters (Slide in) */}
        <div className={`fixed inset-0 z-50 bg-white transform transition-transform ${filtersOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
            {/* Filter Content - Same as desktop */}
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="flex items-center">
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    className="w-24"
                  />
                  <span className="mx-2">-</span>
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    className="w-24"
                  />
                  <Button size="sm" variant="outline" className="ml-2">Set</Button>
                </div>
              </div>
              
              {/* Potency */}
              <div>
                <h3 className="font-semibold mb-3">Potency</h3>
                <div className="space-y-2">
                  {['6C', '30C', '200C', '1M', 'Mother Tincture'].map(potency => (
                    <div key={potency} className="flex items-center">
                      <Checkbox 
                        id={`potency-${potency}`} 
                        checked={activeFilters.includes(`potency-${potency}`)}
                        onCheckedChange={() => toggleFilter(`potency-${potency}`)}
                      />
                      <Label htmlFor={`potency-${potency}`} className="ml-2">{potency}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Brand */}
              <div>
                <h3 className="font-semibold mb-3">Brand</h3>
                <div className="space-y-2">
                  {['Bahola', 'SBL', 'Willmar Schwabe', 'Boiron'].map(brand => (
                    <div key={brand} className="flex items-center">
                      <Checkbox 
                        id={`brand-${brand}`} 
                        checked={activeFilters.includes(`brand-${brand}`)}
                        onCheckedChange={() => toggleFilter(`brand-${brand}`)}
                      />
                      <Label htmlFor={`brand-${brand}`} className="ml-2">{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Concerns */}
              <div>
                <h3 className="font-semibold mb-3">Health Concerns</h3>
                <div className="space-y-2">
                  {['Digestive', 'Respiratory', 'Skin', 'Immunity', 'Pain Relief'].map(concern => (
                    <div key={concern} className="flex items-center">
                      <Checkbox 
                        id={`concern-${concern}`} 
                        checked={activeFilters.includes(`concern-${concern}`)}
                        onCheckedChange={() => toggleFilter(`concern-${concern}`)}
                      />
                      <Label htmlFor={`concern-${concern}`} className="ml-2">{concern}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <Button className="flex-1" onClick={() => setFiltersOpen(false)}>
                Apply Filters
              </Button>
              <Button variant="outline" className="flex-1" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </div>
        </div>
        
        {/* Desktop Filters (Sidebar) */}
        <div className="hidden lg:block col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              {activeFilters.length > 0 && (
                <Button variant="ghost" className="text-sm h-auto p-0" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="flex items-center">
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    className="w-20 text-sm"
                  />
                  <span className="mx-2">-</span>
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    className="w-20 text-sm"
                  />
                  <Button size="sm" variant="outline" className="ml-2 text-sm">Set</Button>
                </div>
              </div>
              
              {/* Potency */}
              <div>
                <h3 className="font-semibold mb-3">Potency</h3>
                <div className="space-y-2">
                  {['6C', '30C', '200C', '1M', 'Mother Tincture'].map(potency => (
                    <div key={potency} className="flex items-center">
                      <Checkbox 
                        id={`potency-desktop-${potency}`} 
                        checked={activeFilters.includes(`potency-${potency}`)}
                        onCheckedChange={() => toggleFilter(`potency-${potency}`)}
                      />
                      <Label htmlFor={`potency-desktop-${potency}`} className="ml-2 text-sm">{potency}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Brand */}
              <div>
                <h3 className="font-semibold mb-3">Brand</h3>
                <div className="space-y-2">
                  {['Bahola', 'SBL', 'Willmar Schwabe', 'Boiron'].map(brand => (
                    <div key={brand} className="flex items-center">
                      <Checkbox 
                        id={`brand-desktop-${brand}`} 
                        checked={activeFilters.includes(`brand-${brand}`)}
                        onCheckedChange={() => toggleFilter(`brand-${brand}`)}
                      />
                      <Label htmlFor={`brand-desktop-${brand}`} className="ml-2 text-sm">{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Concerns */}
              <div>
                <h3 className="font-semibold mb-3">Health Concerns</h3>
                <div className="space-y-2">
                  {['Digestive', 'Respiratory', 'Skin', 'Immunity', 'Pain Relief'].map(concern => (
                    <div key={concern} className="flex items-center">
                      <Checkbox 
                        id={`concern-desktop-${concern}`} 
                        checked={activeFilters.includes(`concern-${concern}`)}
                        onCheckedChange={() => toggleFilter(`concern-${concern}`)}
                      />
                      <Label htmlFor={`concern-desktop-${concern}`} className="ml-2 text-sm">{concern}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Section */}
        <div className="lg:col-span-3">
          {/* Sort & Filter Bar */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="text-bahola-neutral-600">Showing {products.length} products</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <label htmlFor="desktop-sort" className="text-sm">Sort by:</label>
              <select 
                id="desktop-sort"
                className="border rounded-md px-3 py-1"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          
          {/* Active Filters Pills */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map(filter => (
                <div 
                  key={filter} 
                  className="bg-bahola-blue-100 text-bahola-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {filter.split('-')[1]}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 p-0"
                    onClick={() => toggleFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="text-sm h-auto py-1 px-3" 
                onClick={clearFilters}
              >
                Clear All
              </Button>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                discountPercentage={product.discountPercentage}
                rating={parseFloat(product.rating)}
                reviewCount={product.reviewCount}
                link={`/product/${product.id}`}
              />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center space-x-1">
              <Button variant="outline" size="icon" disabled>
                <span className="sr-only">Previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-9 w-9">1</Button>
              <Button variant="outline" className="h-9 w-9">2</Button>
              <Button variant="outline" className="h-9 w-9">3</Button>
              <span className="px-2">...</span>
              <Button variant="outline" className="h-9 w-9">8</Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">Next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CategoryPage;
