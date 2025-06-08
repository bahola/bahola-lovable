
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { 
  MegaMenuConcern, 
  MegaMenuCategory, 
  MegaMenuDoctor, 
  MegaMenuBachFlower 
} from '@/components/mega-menus';

interface MainMenuProps {
  activeMenu: string | null;
  onMenuHover: (menuName: string) => void;
  onMenuLeave: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ 
  activeMenu, 
  onMenuHover, 
  onMenuLeave 
}) => {
  const handleMenuClick = (menuName: string) => {
    if (activeMenu === menuName) {
      onMenuLeave();
    } else {
      onMenuHover(menuName);
    }
  };

  return (
    <nav className="hidden lg:flex items-center space-x-2 relative">
      <div
        className="main-menu-item flex items-center relative cursor-pointer"
        onClick={() => handleMenuClick('concern')}
      >
        <span className="text-gray-800 font-medium">Shop by Problem</span>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
      </div>

      <div
        className="main-menu-item flex items-center relative cursor-pointer"
        onClick={() => handleMenuClick('category')}
      >
        <span className="text-gray-800 font-medium">Shop by Category</span>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
      </div>

      <Link to="/diseases-conditions" className="main-menu-item">
        <span className="text-gray-800 font-medium">Diseases & Conditions</span>
      </Link>

      <div
        className="main-menu-item flex items-center relative cursor-pointer"
        onClick={() => handleMenuClick('doctors')}
      >
        <span className="text-gray-800 font-medium">For Doctors</span>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
      </div>

      <div 
        className="main-menu-item flex items-center relative cursor-pointer"
        onClick={() => handleMenuClick('bachflower')}
      >
        <span className="text-gray-800 font-medium">Bach Flower</span>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
      </div>

      <a 
        href="https://lovable.dev/projects/90f95490-dd0f-4544-953c-3fada8daac1b" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="main-menu-item flex items-center"
      >
        <span className="whitespace-nowrap text-gray-800 font-medium">I</span>
        <div className="mx-1 text-red-500">❤️</div>
        <span className="whitespace-nowrap text-gray-800 font-medium">HOMEOPATHY</span>
      </a>
      
      <Link to="/homeopathy" className="main-menu-item">
        <span className="text-gray-800 font-medium">Why Homeopathy</span>
      </Link>

      {/* Mega menus positioned at the end of the nav */}
      <MegaMenuConcern isOpen={activeMenu === 'concern'} />
      <MegaMenuCategory isOpen={activeMenu === 'category'} />
      <MegaMenuDoctor isOpen={activeMenu === 'doctors'} />
      <MegaMenuBachFlower isOpen={activeMenu === 'bachflower'} />
    </nav>
  );
};
