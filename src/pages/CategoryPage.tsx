
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useParams, useLocation } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { 
  Filter, 
  SlidersHorizontal, 
  ChevronRight, 
  Grid3X3, 
  List, 
  Search, 
  X 
} from 'lucide-react';

const CategoryPage = () => {
  const { categoryId, concernId, subcategoryId } = useParams<{ 
    categoryId: string; 
    concernId: string;
    subcategoryId: string;
  }>();
  const location = useLocation();
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState([100, 5000]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  
  // Determine if we're viewing a category or concern page
  const isConcernPage = location.pathname.includes('/concern/');
  const id = isConcernPage ? concernId : categoryId;
  
  // Format the name for display (convert kebab-case to Title Case)
  const formatName = (str: string = '') => {
    return str.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  };
  
  // Get page info based on if we're viewing a category, subcategory, or concern
  const getPageInfo = () => {
    const baseName = formatName(id);
    
    if (subcategoryId) {
      return {
        name: `${baseName} - ${subcategoryId.toUpperCase()}`,
        description: `Browse our ${baseName} remedies that start with ${subcategoryId.toUpperCase()}.`,
        productCount: 8 + Math.floor(Math.random() * 30) // Random number for demo
      };
    }
    
    return {
      name: baseName,
      description: isConcernPage 
        ? `Browse our homeopathic remedies for ${baseName}.`
        : `Explore our range of high-quality ${baseName} designed to support your health naturally.`,
      productCount: 10 + Math.floor(Math.random() * 30) // Random number for demo
    };
  };
  
  const pageInfo = getPageInfo();
  
  // Mock product data generator - simulate products for any category/subcategory
  const generateMockProducts = () => {
    const productTypes = [
      'Arnica', 'Belladonna', 'Nux Vomica', 'Bryonia', 'Allium Cepa', 'Chamomilla',
      'Arsenicum Album', 'Pulsatilla', 'Rhus Tox', 'Apis Mel', 'Aconite', 'Sepia'
    ];
    
    const filteredProducts = productTypes
      // If we have a subcategory, filter to only show products starting with that letter
      .filter(product => !subcategoryId || product.charAt(0).toLowerCase() === subcategoryId.toLowerCase())
      // Create product objects
      .map(product => {
        const potency = ['6C', '30C', '200C', '1M'][Math.floor(Math.random() * 4)];
        const id = `${product.toLowerCase().replace(/\s+/g, '-')}-${potency.toLowerCase()}`;
        const price = 300 + Math.floor(Math.random() * 500);
        const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 15) + 5 : 0;
        
        return {
          id,
          title: `${product} ${potency}`,
          description: `For various health conditions and symptoms.`,
          price,
          imageSrc: `https://placehold.co/300x300/bahola-blue/white?text=${encodeURIComponent(product)}`,
          discountPercentage: discount,
          rating: 4 + (Math.random() * 1),
          reviewCount: 10 + Math.floor(Math.random() * 100),
          url: `/product/${id}`
        };
      });
    
    return filteredProducts;
  };
  
  // Generate products based on current category/subcategory
  const products = generateMockProducts();
  
  // Filter toggle function
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
    setPriceRange([100, 5000]);
    setSearchQuery('');
  };
  
  // Apply search filter
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout 
      title={pageInfo.name} 
      description={pageInfo.description}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile filters button */}
        <div className="md:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </span>
            <span>{showFilters ? <X size={16} /> : <SlidersHorizontal size={16} />}</span>
          </Button>
          
          {activeFilters.length > 0 && (
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-500 mr-2">Applied filters:</span>
              <div className="flex flex-wrap gap-1">
                {activeFilters.map(filter => (
                  <span 
                    key={filter} 
                    className="bg-bahola-blue-100 text-bahola-blue-700 px-2 py-1 rounded-full text-xs flex items-center"
                  >
                    {filter}
                    <button 
                      onClick={() => toggleFilter(filter)}
                      className="ml-1 hover:text-bahola-blue-900"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <button 
                  onClick={clearFilters}
                  className="text-xs text-bahola-blue-600 hover:text-bahola-blue-800 underline"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Desktop sidebar filters */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Filters</h3>
              {activeFilters.length > 0 && (
                <button 
                  onClick={clearFilters}
                  className="text-xs text-bahola-blue-600 hover:text-bahola-blue-800"
                >
                  Clear all
                </button>
              )}
            </div>
            
            <div className="mb-4">
              <Input
                placeholder="Search in category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="potency">
                <AccordionTrigger className="text-sm font-medium">Potency</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {['6C', '12C', '30C', '200C', '1M', '10M', 'LM1', 'LM2', 'LM3'].map(potency => (
                      <div key={potency} className="flex items-center">
                        <Checkbox 
                          id={`potency-${potency}`} 
                          checked={activeFilters.includes(`Potency: ${potency}`)}
                          onCheckedChange={() => toggleFilter(`Potency: ${potency}`)}
                        />
                        <Label 
                          htmlFor={`potency-${potency}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {potency}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="type">
                <AccordionTrigger className="text-sm font-medium">Type</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {['Pills', 'Liquid', 'Mother Tincture', 'Trituration'].map(type => (
                      <div key={type} className="flex items-center">
                        <Checkbox 
                          id={`type-${type}`} 
                          checked={activeFilters.includes(`Type: ${type}`)}
                          onCheckedChange={() => toggleFilter(`Type: ${type}`)}
                        />
                        <Label 
                          htmlFor={`type-${type}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="condition">
                <AccordionTrigger className="text-sm font-medium">Health Condition</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {['Allergies', 'Digestive', 'Pain', 'Respiratory', 'Skin', 'Sleep', 'Stress'].map(condition => (
                      <div key={condition} className="flex items-center">
                        <Checkbox 
                          id={`condition-${condition}`} 
                          checked={activeFilters.includes(`Condition: ${condition}`)}
                          onCheckedChange={() => toggleFilter(`Condition: ${condition}`)}
                        />
                        <Label 
                          htmlFor={`condition-${condition}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="price">
                <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="px-2 pt-2">
                    <Slider
                      defaultValue={[100, 5000]}
                      max={5000}
                      min={100}
                      step={50}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="brand">
                <AccordionTrigger className="text-sm font-medium">Brand</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {['Bahola Labs', 'SBL', 'Dr. Reckeweg', 'Schwabe', 'Boiron'].map(brand => (
                      <div key={brand} className="flex items-center">
                        <Checkbox 
                          id={`brand-${brand}`} 
                          checked={activeFilters.includes(`Brand: ${brand}`)}
                          onCheckedChange={() => toggleFilter(`Brand: ${brand}`)}
                        />
                        <Label 
                          htmlFor={`brand-${brand}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>
        
        {/* Main content - product grid */}
        <div className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <a href="/" className="hover:text-bahola-blue-600">Home</a>
                  <ChevronRight size={14} className="mx-1" />
                  {isConcernPage ? (
                    <>
                      <a href="/categories" className="hover:text-bahola-blue-600">Health Concerns</a>
                      <ChevronRight size={14} className="mx-1" />
                    </>
                  ) : (
                    <>
                      <a href="/categories" className="hover:text-bahola-blue-600">Categories</a>
                      <ChevronRight size={14} className="mx-1" />
                      {subcategoryId && (
                        <>
                          <a href={`/category/${categoryId}`} className="hover:text-bahola-blue-600">{formatName(categoryId)}</a>
                          <ChevronRight size={14} className="mx-1" />
                        </>
                      )}
                    </>
                  )}
                  <span className="text-bahola-neutral-900">
                    {subcategoryId ? `${subcategoryId.toUpperCase()} Products` : pageInfo.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{pageInfo.productCount} products found</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="hidden md:flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={viewMode === 'grid' ? 'bg-bahola-blue-50 text-bahola-blue-700' : ''}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={viewMode === 'list' ? 'bg-bahola-blue-50 text-bahola-blue-700' : ''}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={18} />
                  </Button>
                </div>
                
                <select className="p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-bahola-blue-500">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest first</option>
                  <option>Highest rated</option>
                </select>
              </div>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  imageSrc={product.imageSrc}
                  discountPercentage={product.discountPercentage}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  url={product.url}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CategoryPage;
