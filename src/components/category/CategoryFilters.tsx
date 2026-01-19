import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Filter, SlidersHorizontal } from 'lucide-react';
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
import { CategoryFilterConfig } from '@/config/swellCategoryMapping';

interface CategoryFiltersProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  activeFilters: string[];
  toggleFilter: (filter: string) => void;
  clearFilters: () => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // New filter props
  potencyFilter: string[];
  setPotencyFilter: (potencies: string[]) => void;
  packSizeFilter: string[];
  setPackSizeFilter: (sizes: string[]) => void;
  filterConfig: CategoryFilterConfig;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  showFilters,
  setShowFilters,
  activeFilters,
  toggleFilter,
  clearFilters,
  priceRange,
  setPriceRange,
  searchQuery,
  setSearchQuery,
  potencyFilter,
  setPotencyFilter,
  packSizeFilter,
  setPackSizeFilter,
  filterConfig
}) => {
  const location = useLocation();
  
  const togglePotency = (potency: string) => {
    if (potencyFilter.includes(potency)) {
      setPotencyFilter(potencyFilter.filter(p => p !== potency));
    } else {
      setPotencyFilter([...potencyFilter, potency]);
    }
  };

  const togglePackSize = (size: string) => {
    if (packSizeFilter.includes(size)) {
      setPackSizeFilter(packSizeFilter.filter(s => s !== size));
    } else {
      setPackSizeFilter([...packSizeFilter, size]);
    }
  };

  const totalActiveFilters = potencyFilter.length + packSizeFilter.length + 
    (priceRange[0] > 100 || priceRange[1] < 5000 ? 1 : 0);

  return (
    <>
      {/* Mobile filters button */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-between"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}
          </span>
          <span>{showFilters ? <X size={16} /> : <SlidersHorizontal size={16} />}</span>
        </Button>
        
        {totalActiveFilters > 0 && (
          <div className="mt-2 flex items-center flex-wrap gap-1">
            <span className="text-sm text-muted-foreground mr-2">Applied:</span>
            {potencyFilter.map(potency => (
              <span 
                key={potency} 
                className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs flex items-center"
              >
                {potency}
                <button 
                  onClick={() => togglePotency(potency)}
                  className="ml-1 hover:text-primary/80"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            {packSizeFilter.map(size => (
              <span 
                key={size} 
                className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs flex items-center"
              >
                {size}
                <button 
                  onClick={() => togglePackSize(size)}
                  className="ml-1 hover:text-primary/80"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <button 
              onClick={clearFilters}
              className="text-xs text-primary hover:text-primary/80 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
      
      {/* Desktop sidebar filters */}
      <aside className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
        <div className="bg-card p-4 rounded-lg shadow-sm mb-4 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Filters</h3>
            {totalActiveFilters > 0 && (
              <button 
                onClick={clearFilters}
                className="text-xs text-primary hover:text-primary/80"
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
          
          {/* Subcategory Navigation for Specialty Categories */}
          {filterConfig.showSubcategories && filterConfig.subcategories && filterConfig.subcategories.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2 text-muted-foreground uppercase tracking-wide">
                Browse Categories
              </h4>
              <nav className="space-y-1 max-h-64 overflow-y-auto">
                {filterConfig.subcategories.map((sub) => {
                  const isActive = location.pathname === sub.path;
                  return (
                    <Link
                      key={sub.id}
                      to={sub.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
          
          <Accordion type="multiple" defaultValue={['potency', 'packSize', 'price']} className="w-full">
            {/* Potency Filter - Only show for categories that have potency */}
            {filterConfig.showPotency && filterConfig.potencyOptions.length > 0 && (
              <AccordionItem value="potency">
                <AccordionTrigger className="text-sm font-medium">
                  Potency {potencyFilter.length > 0 && `(${potencyFilter.length})`}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filterConfig.potencyOptions.map(potency => (
                      <div key={potency} className="flex items-center">
                        <Checkbox 
                          id={`potency-${potency}`} 
                          checked={potencyFilter.includes(potency)}
                          onCheckedChange={() => togglePotency(potency)}
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
            )}
            
            {/* Pack Size Filter */}
            {filterConfig.showPackSize && filterConfig.packSizeOptions.length > 0 && (
              <AccordionItem value="packSize">
                <AccordionTrigger className="text-sm font-medium">
                  Pack Size {packSizeFilter.length > 0 && `(${packSizeFilter.length})`}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {filterConfig.packSizeOptions.map(size => (
                      <div key={size} className="flex items-center">
                        <Checkbox 
                          id={`size-${size}`} 
                          checked={packSizeFilter.includes(size)}
                          onCheckedChange={() => togglePackSize(size)}
                        />
                        <Label 
                          htmlFor={`size-${size}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
            
            {/* Price Range Filter */}
            <AccordionItem value="price">
              <AccordionTrigger className="text-sm font-medium">
                Price Range
              </AccordionTrigger>
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
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </aside>
    </>
  );
};
