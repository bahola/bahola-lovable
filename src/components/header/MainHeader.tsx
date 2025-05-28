
import React from 'react';
import { Menu } from 'lucide-react';
import { SearchBar } from '@/components/header/SearchBar';
import { CartButton } from '@/components/header/CartButton';
import { Link } from 'react-router-dom';

interface MainHeaderProps {
  isScrolled: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  onClearSearch: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  isScrolled,
  searchQuery,
  setSearchQuery,
  onSearch,
  onClearSearch,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  return (
    <div className={`w-full bg-white border-b border-bahola-neutral-100 ${isScrolled ? 'sticky-header' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-bahola-navy-950"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/ee08c806-593a-4759-b27e-d41be5af04a8.png" 
              alt="Bahola" 
              className="h-10 w-auto"
              onError={(e) => {
                // Fallback to text logo if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden text-2xl font-bold text-bahola-navy-950 font-helvetica">
              Bahola
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={onSearch}
              onClearSearch={onClearSearch}
            />
          </div>

          {/* Cart and user actions */}
          <CartButton />
        </div>
      </div>
    </div>
  );
};
