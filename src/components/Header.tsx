
import React, { useState, useEffect } from 'react';
import { Phone, Truck, Heart, Gift, Mail, Search, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MegaMenuConcern, MegaMenuCategory, MegaMenuDoctor } from './MegaMenus';
import { AuthModals } from './AuthModals';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<'signin' | 'signup' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuHover = (menuName: string) => {
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  return (
    <>
      <header className="w-full">
        {/* Top Menu */}
        <div className="bg-bahola-blue-50 py-2">
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1 top-menu-item">
                <Phone size={14} />
                <span>+919791035385</span>
              </div>
              <div className="hidden md:flex items-center space-x-1 top-menu-item">
                <Truck size={14} />
                <span>Free shipping on Rs 500+</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="top-menu-item flex items-center space-x-1">
                <Heart size={14} />
                <span>My List</span>
              </button>
              <button className="top-menu-item flex items-center space-x-1">
                <Gift size={14} />
                <span>Promo Pocket</span>
              </button>
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
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-bahola-blue-500">Bahola Labs</a>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
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

                <div className="main-menu-item flex items-center">
                  <span>Bach Flower</span>
                  <ChevronDown size={16} className="ml-1" />
                </div>

                <div className="main-menu-item">
                  <span>The Remedy Room</span>
                </div>
              </nav>

              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-10 pr-4 py-2 rounded-full border border-bahola-neutral-200 focus:outline-none focus:ring-2 focus:ring-bahola-blue-400 focus:border-transparent"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bahola-neutral-400" />
                </div>
                <button className="btn-bahola hidden md:block">
                  Find Your Remedy
                </button>
                <button 
                  className="block lg:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-white w-full transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} absolute top-full left-0 z-50 shadow-lg`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <button className="flex items-center justify-between py-2 border-b border-bahola-neutral-100">
                <span className="font-medium">Shop by Concern</span>
                <ChevronDown size={16} />
              </button>
              <button className="flex items-center justify-between py-2 border-b border-bahola-neutral-100">
                <span className="font-medium">Shop by Category</span>
                <ChevronDown size={16} />
              </button>
              <button className="flex items-center justify-between py-2 border-b border-bahola-neutral-100">
                <span className="font-medium">For Doctors</span>
                <ChevronDown size={16} />
              </button>
              <button className="flex items-center justify-between py-2 border-b border-bahola-neutral-100">
                <span className="font-medium">Bach Flower</span>
                <ChevronDown size={16} />
              </button>
              <button className="py-2 border-b border-bahola-neutral-100">
                <span className="font-medium">The Remedy Room</span>
              </button>
              <div className="py-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-bahola-neutral-200 focus:outline-none focus:ring-2 focus:ring-bahola-blue-400 focus:border-transparent"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bahola-neutral-400" />
                </div>
              </div>
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
