
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSearch } from '@/hooks/useSearch';
import { AuthModals } from '@/components/AuthModals';
import { TopBar } from '@/components/header/TopBar';
import { MainHeader } from '@/components/header/MainHeader';
import { MainMenu } from '@/components/header/MainMenu';
import { MobileMenu } from '@/components/header/MobileMenu';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<'signin' | 'signup' | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { searchQuery, setSearchQuery, handleSearch, clearSearch } = useSearch();
  
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

  return (
    <>
      <header className="w-full">
        {/* Top Menu */}
        <TopBar onOpenAuthModal={setAuthModalOpen} />

        {/* Main Menu */}
        <MainHeader 
          isScrolled={isScrolled}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onClearSearch={clearSearch}
          cartItems={cartItems}
          cartTotal={cartTotal}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Secondary Menu */}
        <div className={`w-full bg-white border-t border-bahola-neutral-100 ${isScrolled ? 'sticky-subheader' : ''}`}>
          <div className="container mx-auto px-4">
            <MainMenu 
              activeMenu={activeMenu}
              onMenuHover={handleMenuHover}
              onMenuLeave={handleMenuLeave}
            />
          </div>
        </div>

        {/* Mobile Menu - Slide from Left */}
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onClearSearch={clearSearch}
          activeSubmenu={activeSubmenu}
          onSubmenuToggle={handleSubmenuToggle}
        />
      </header>

      <AuthModals
        modalType={authModalOpen}
        onClose={() => setAuthModalOpen(null)}
      />
    </>
  );
};
