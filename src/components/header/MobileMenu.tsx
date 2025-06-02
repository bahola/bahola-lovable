
import React from 'react';
import { X, Search, ChevronRight, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onClearSearch?: () => void;
  activeSubmenu: string | null;
  onSubmenuToggle: (submenu: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  onSearch,
  onClearSearch,
  activeSubmenu,
  onSubmenuToggle
}) => {
  // Common disease categories for mobile menu
  const commonDiseases = ['Mental Health', 'Digestive Disorders', 'Respiratory Diseases', 'Skin Diseases', 'Cardiovascular Disorders'];
  
  return (
    <div 
      className={`mobile-menu ${isOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}
    >
      <div className="p-4 border-b border-bahola-neutral-100 flex items-center justify-between">
        <img 
          src="/lovable-uploads/e10be5fd-868f-4ce3-8e97-f9c2aac6e207.png" 
          alt="Bahola Labs" 
          className="h-8" 
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
        >
          <X size={24} />
        </Button>
      </div>
      
      {/* Mobile search */}
      <div className="p-4 border-b border-bahola-neutral-100">
        <form onSubmit={onSearch} className="relative">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-10 py-2 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bahola-neutral-400" />
            
            {searchQuery && onClearSearch && (
              <Button 
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-10 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                onClick={onClearSearch}
              >
                <X size={16} />
              </Button>
            )}
            
            <Button 
              type="submit" 
              className="absolute right-0 top-0 rounded-l-none rounded-r-full h-full"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
      
      {/* Mobile menu items */}
      <div>
        {/* Shop by Disease */}
        <div>
          <button 
            className="mobile-menu-item w-full"
            onClick={() => onSubmenuToggle('diseases')}
          >
            <span>Shop by Disease</span>
            <ChevronRight size={20} className={`transition-transform duration-300 ${activeSubmenu === 'diseases' ? 'rotate-90' : ''}`} />
          </button>
          <div className={`mobile-submenu ${activeSubmenu === 'diseases' ? 'mobile-submenu-open' : ''}`}>
            <div className="p-4 grid grid-cols-1 gap-2">
              {commonDiseases.map(disease => (
                <a 
                  key={disease} 
                  href={`/diseases/${disease.toLowerCase().replace(/\s+/g, '-').replace('&', '')}`} 
                  className="py-2 px-4 hover:bg-bahola-blue-100 rounded"
                >
                  {disease}
                </a>
              ))}
              <a href="/diseases" className="py-2 px-4 text-bahola-blue-500 font-semibold">View all diseases →</a>
            </div>
          </div>
        </div>
        
        {/* Shop by Category */}
        <div>
          <button 
            className="mobile-menu-item w-full"
            onClick={() => onSubmenuToggle('category')}
          >
            <span>Shop by Category</span>
            <ChevronRight size={20} className={`transition-transform duration-300 ${activeSubmenu === 'category' ? 'rotate-90' : ''}`} />
          </button>
          <div className={`mobile-submenu ${activeSubmenu === 'category' ? 'mobile-submenu-open' : ''}`}>
            <div className="p-4 grid grid-cols-1 gap-2">
              <a href="/category/mother-tinctures" className="py-2 px-4 hover:bg-bahola-blue-100 rounded font-medium">Mother Tinctures</a>
              <a href="/category/dilutions" className="py-2 px-4 hover:bg-bahola-blue-100 rounded font-medium">Dilutions</a>
              <a href="/category/lm-potencies" className="py-2 px-4 hover:bg-bahola-blue-100 rounded font-medium">LM Potencies</a>
              <a href="/category/bio-chemics" className="py-2 px-4 hover:bg-bahola-blue-100 rounded font-medium">Bio Chemics</a>
              <a href="/categories" className="py-2 px-4 text-bahola-blue-500 font-semibold">View all categories →</a>
            </div>
          </div>
        </div>
        
        {/* For Doctors */}
        <div>
          <button 
            className="mobile-menu-item w-full"
            onClick={() => onSubmenuToggle('doctors')}
          >
            <span>For Doctors</span>
            <ChevronRight size={20} className={`transition-transform duration-300 ${activeSubmenu === 'doctors' ? 'rotate-90' : ''}`} />
          </button>
          <div className={`mobile-submenu ${activeSubmenu === 'doctors' ? 'mobile-submenu-open' : ''}`}>
            <div className="p-4 grid grid-cols-1 gap-2">
              <a href="/professional/signup" className="py-2 px-4 hover:bg-bahola-blue-100 rounded font-medium">Professional Account</a>
              <a href="/professional/materia-medica" className="py-2 px-4 hover:bg-bahola-blue-100 rounded">Comparative Materia Medica</a>
              <a href="/professional/remedy-deep-dive" className="py-2 px-4 hover:bg-bahola-blue-100 rounded">Deep Dive into a Remedy</a>
              <a href="/professional/case-studies" className="py-2 px-4 hover:bg-bahola-blue-100 rounded">Case Studies</a>
            </div>
          </div>
        </div>
        
        {/* Bach Flower */}
        <div>
          <button 
            className="mobile-menu-item w-full"
            onClick={() => onSubmenuToggle('bach')}
          >
            <span>Bach Flower</span>
            <ChevronRight size={20} className={`transition-transform duration-300 ${activeSubmenu === 'bach' ? 'rotate-90' : ''}`} />
          </button>
          <div className={`mobile-submenu ${activeSubmenu === 'bach' ? 'mobile-submenu-open' : ''}`}>
            <div className="p-4 grid grid-cols-1 gap-2">
              <a href="/bach-flower/concern" className="py-2 px-4 hover:bg-bahola-blue-100 rounded">Shop By Concern</a>
              <a href="/bach-flower/name" className="py-2 px-4 hover:bg-bahola-blue-100 rounded">Shop by Name</a>
            </div>
          </div>
        </div>
        
        {/* I ❤️ HOMEOPATHY - Updated to link to blog */}
        <a 
          href="https://lovable.dev/projects/90f95490-dd0f-4544-953c-3fada8daac1b" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mobile-menu-item block"
        >
          <div className="flex items-center">
            <span>I</span>
            <Heart size={16} className="mx-1 text-red-500 fill-red-500" />
            <span>HOMEOPATHY</span>
          </div>
          <ChevronRight size={20} />
        </a>
        
        {/* Why Homeopathy */}
        <a href="/homeopathy" className="mobile-menu-item block">
          <span>Why Homeopathy</span>
          <ChevronRight size={20} />
        </a>
        
        {/* Call to Action */}
        <div className="p-6">
          <Button className="w-full btn-bahola">
            Find Your Remedy
          </Button>
        </div>
      </div>
    </div>
  );
};
