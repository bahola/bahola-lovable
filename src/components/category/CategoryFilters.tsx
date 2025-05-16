
import React from 'react';
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
  setSearchQuery
}) => {
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
    </>
  );
};
