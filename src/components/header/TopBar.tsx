
import React from 'react';
import { Phone, Truck, Heart, Gift, Mail } from 'lucide-react';

interface TopBarProps {
  onOpenAuthModal: (type: 'signin' | 'signup') => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenAuthModal }) => {
  return (
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
            onClick={() => onOpenAuthModal('signup')}
          >
            <Mail size={14} />
            <span>Email Signup</span>
          </button>
          <button 
            className="top-menu-item flex items-center"
            onClick={() => onOpenAuthModal('signin')}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
