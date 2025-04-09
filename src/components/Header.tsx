
import React, { useState, useEffect } from 'react';
import { Phone, Truck, Heart, Gift, Mail, Search, Menu, X, ChevronDown, ShoppingCart, ChevronRight, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MegaMenuConcern, MegaMenuCategory, MegaMenuDoctor, MegaMenuBachFlower } from './MegaMenus';
import { AuthModals } from './AuthModals';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<'signin' | 'signup' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Mock cart data - this would be replaced with actual cart state
  const cartItems = 3;
  const cartTotal = 1250;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when switching to desktop
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  const handleMenuHover = (menuName: string) => {
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  const handleSubmenuToggle = (submenu: string) => {
    setActiveSubmenu(prev => prev === submenu ? null : submenu);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  return (
    <>
      <header className="w-full">
        {/* Top Menu */}
        <div className="bg-bahola-blue-50 py-2">
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-6">
              <a 
                href="tel:+919791035385" 
                className="flex items-center space-x-1 top-menu-item"
              >
                <Phone size={14} />
                <span>+919791035385</span>
              </a>
              <div className="hidden md:flex items-center space-x-1 top-menu-item">
                <Truck size={14} />
                <span>Free shipping on Rs 500+</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/my-list" className="top-menu-item flex items-center space-x-1">
                <Heart size={14} />
                <span>My List</span>
              </a>
              <a href="/promo-pocket" className="top-menu-item flex items-center space-x-1">
                <Gift size={14} />
                <span>Promo Pocket</span>
              </a>
              <button 
                className="top-menu-item flex items-center space-x-1"
                onClick={() => setAuthModalOpen('signup')}
              >
                <Mail size={14} />
                <span>Email Signup</span>
              </button>
              <button 
                className="top-menu-item flex items-center"
                onClick={() => setAuthModalOpen('signin')}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Main Menu */}
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
                <form onSubmit={handleSearch} className="relative hidden md:block w-full max-w-md">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bahola-neutral-400" />
                </form>
              </div>

              {/* Cart Button and Track Order */}
              <div className="flex items-center flex-shrink-0">
                {/* Track Order Link */}
                <a href="/track-order" className="flex items-center mr-6 text-bahola-blue-500 hover:text-bahola-blue-700">
                  <Package size={22} className="mr-1" />
                  <span className="hidden md:inline">Track Order</span>
                </a>
                
                {/* Cart Button */}
                <a href="/cart" className="relative flex items-center mr-6">
                  <ShoppingCart size={24} className="text-bahola-blue-500" />
                  <span className="absolute -top-2 -right-2 bg-bahola-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                  <span className="ml-2 hidden md:block">₹{cartTotal.toLocaleString()}</span>
                </a>
                
                {/* Mobile menu toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Menu */}
        <div className={`w-full bg-white border-t border-bahola-neutral-100 ${isScrolled ? 'sticky-subheader' : ''}`}>
          <div className="container mx-auto px-4">
            <nav className="hidden lg:flex items-center">
              <div
                className="main-menu-item flex items-center"
                onMouseEnter={() => handleMenuHover('concern')}
                onMouseLeave={handleMenuLeave}
              >
                <span>Shop by Concern</span>
                <ChevronDown size={16} className="ml-1" />
                <MegaMenuConcern isOpen={activeMenu === 'concern'} />
              </div>

              <div
                className="main-menu-item flex items-center"
                onMouseEnter={() => handleMenuHover('category')}
                onMouseLeave={handleMenuLeave}
              >
                <span>Shop by Category</span>
                <ChevronDown size={16} className="ml-1" />
                <MegaMenuCategory isOpen={activeMenu === 'category'} />
              </div>

              <div
                className="main-menu-item flex items-center"
                onMouseEnter={() => handleMenuHover('doctors')}
                onMouseLeave={handleMenuLeave}
              >
                <span>For Doctors</span>
                <ChevronDown size={16} className="ml-1" />
                <MegaMenuDoctor isOpen={activeMenu === 'doctors'} />
              </div>

              <div 
                className="main-menu-item flex items-center"
                onMouseEnter={() => handleMenuHover('bachflower')}
                onMouseLeave={handleMenuLeave}
              >
                <span>Bach Flower</span>
                <ChevronDown size={16} className="ml-1" />
                <MegaMenuBachFlower isOpen={activeMenu === 'bachflower'} />
              </div>

              <div className="main-menu-item flex items-center">
                <span>I</span>
                <Heart size={16} className="mx-1 text-red-500 fill-red-500" />
                <span>HOMEOPATHY</span>
              </div>
              
              <a href="/homeopathy" className="main-menu-item">
                <span>Why Homeopathy</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Mobile Menu - Slide from Left */}
        <div 
          className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}
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
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </Button>
          </div>
          
          {/* Mobile search */}
          <div className="p-4 border-b border-bahola-neutral-100">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bahola-neutral-400" />
            </form>
          </div>
          
          {/* Mobile menu items */}
          <div>
            {/* Shop by Concern */}
            <div>
              <button 
                className="mobile-menu-item w-full"
                onClick={() => handleSubmenuToggle('concern')}
              >
                <span>Shop by Concern</span>
                <ChevronRight size={20} className={`transition-transform duration-300 ${activeSubmenu === 'concern' ? 'rotate-90' : ''}`} />
              </button>
              <div className={`mobile-submenu ${activeSubmenu === 'concern' ? 'mobile-submenu-open' : ''}`}>
                <div className="p-4 grid grid-cols-1 gap-2">
                  {['Allergies', 'Cancer', 'Heart Health', 'Child Care', 'Eye Care'].map(item => (
                    <a key={item} href={`/concern/${item.toLowerCase().replace(/\s+/g, '-')}`} className="py-2 px-4 hover:bg-bahola-blue-100 rounded">
                      {item}
                    </a>
                  ))}
                  <a href="/concerns" className="py-2 px-4 text-bahola-blue-500 font-semibold">View all concerns →</a>
                </div>
              </div>
            </div>
            
            {/* Shop by Category */}
            <div>
              <button 
                className="mobile-menu-item w-full"
                onClick={() => handleSubmenuToggle('category')}
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
                onClick={() => handleSubmenuToggle('doctors')}
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
                onClick={() => handleSubmenuToggle('bach')}
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
            
            {/* I ❤️ HOMEOPATHY */}
            <a href="/i-love-homeopathy" className="mobile-menu-item block">
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
      </header>

      <AuthModals
        modalType={authModalOpen}
        onClose={() => setAuthModalOpen(null)}
      />
    </>
  );
};
