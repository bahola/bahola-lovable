
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SearchBar } from './SearchBar';
import { CartButton } from './CartButton';

interface MainHeaderProps {
  isScrolled: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onClearSearch?: () => void;
  cartItems: number;
  cartTotal: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  isScrolled,
  searchQuery,
  setSearchQuery,
  onSearch,
  onClearSearch,
  cartItems,
  cartTotal,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  return (
    <div className={`w-full transition-all duration-300 ${isScrolled ? 'sticky-header' : 'navbar-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex-shrink-0">
            <a href="/" className="mr-8">
              <img 
                src="/lovable-uploads/e10be5fd-868f-4ce3-8e97-f9c2aac6e207.png" 
                alt="Bahola Labs" 
                className="h-10" 
              />
            </a>
          </div>
          
          {/* Live search bar - centered and wider */}
          <div className="flex-grow flex justify-center">
            <div className="hidden md:block w-full max-w-md">
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={onSearch}
                onClear={onClearSearch}
              />
            </div>
          </div>

          {/* Cart Button and Track Order */}
          <div className="flex items-center">
            <CartButton cartItems={cartItems} cartTotal={cartTotal} />
            
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
