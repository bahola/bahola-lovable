
import React from 'react';
import { Phone, Truck, Heart, Gift, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useERPNextAuth } from '@/contexts/ERPNextAuthContext';

export const TopBar: React.FC = () => {
  const { isAuthenticated, user, logout } = useERPNextAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
          <Link to="/my-list" className="top-menu-item flex items-center space-x-1">
            <Heart size={14} />
            <span>My List</span>
          </Link>
          <Link to="/promo-pocket" className="top-menu-item flex items-center space-x-1">
            <Gift size={14} />
            <span>Promo Pocket</span>
          </Link>
          <Link to="/register" className="top-menu-item flex items-center space-x-1">
            <Mail size={14} />
            <span>Email Signup</span>
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/account" className="top-menu-item">
                Welcome, {user?.full_name || 'User'}
              </Link>
              <button 
                className="top-menu-item"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="top-menu-item">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
