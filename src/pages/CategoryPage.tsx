
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
  const { categoryId, concernId } = useParams<{ categoryId: string; concernId: string }>();
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
  
  // Mock data
  const pageInfo = {
    name: formatName(id),
    description: isConcernPage 
      ? `Browse our homeopathic remedies for ${formatName(id)}.`
      : 'Explore our range of high-quality homeopathic remedies designed to support your health naturally.',
    productCount: 36
  };
  
  // Mock product data - this would ideally come from an API
  const products = [
    {
      id: 'arnica-montana-30c',
      title: 'Arnica Montana 30C',
      description: 'For bruises, injuries and muscle soreness',
      price: 450,
      imageSrc: 'https://placehold.co/300x300/bahola-blue/white?text=Arnica+Montana',
      discountPercentage: 10,
      rating: 4.8,
      reviewCount: 124,
      url: '/product/arnica-montana-30c'
    },
    {
      id: 'belladonna-200c',
      title: 'Belladonna 200C',
      description: 'For fever, inflammation and acute conditions',
      price: 550,
      imageSrc: 'https://placehold.co/300x300/bahola-blue/white?text=Belladonna',
      discountPercentage: 0,
      rating: 4.7,
      reviewCount: 89,
      url: '/product/belladonna-200c'
    },
    {
      id: 'nux-vomica-30c',
      title: 'Nux Vomica 30C',
      description: 'For digestive issues and hangover',
      price: 380,
      imageSrc: 'https://placehold.co/300x300/bahola-blue/white?text=Nux+Vomica',
      discountPercentage: 5,
      rating: 4.9,
      reviewCount: 102,
      url: '/product/nux-vomica-30c'
    },
    {
      id: 'bryonia-alba-200c',
      title: 'Bryonia Alba 200C',
      description: 'For dry cough and joint pain',
      price: 490,
      imageSrc: 'https://placehold.co/300x300/bahola-blue/white?text=Bryonia+Alba',
      discountPercentage: 0,
      rating: 4.6,
      reviewCount: 78,
      url: '/product/bryonia-alba-200c'
    },
    {
      id: 'allium-cepa-30c',
      title: 'Allium Cepa 30C',
      description: 'For cold, hay fever and watery eyes',
      price: 420,
      imageSrc: 'https://placehold.co/300x300/bahola-blue/white?text=Allium+Cepa',
      discountPercentage: 0,
      rating: 4.5,
      reviewCount: 65,
      url: '/product/allium-cepa-30c'
    },
    {
      id: 'chamomilla-30c',
      title: 'Chamomilla 30C',
      description: 'For teething pain and irritability',
      price: 390,
      imageSrc: 'https://placehold.co/300x300/bahola-blue/white?text=Chamomilla',
      discountPercentage: 0,
      rating: 4.7,
      reviewCount: 92,
      url: '/product/chamomilla-30c'
    }
  ];
  
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
                    </>
                  )}
                  <span className="text-bahola-neutral-900">{pageInfo.name}</span>
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
