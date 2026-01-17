import React from 'react';
import { Menu } from 'lucide-react';
import { SearchBar } from '@/components/header/SearchBar';
import { CartButton } from '@/components/header/CartButton';
import { Link } from 'react-router-dom';
import baholaLogo from '@/assets/bahola-logo.png';

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
              src={baholaLogo} 
              alt="Bahola" 
              className="h-10 w-auto"
            />
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
