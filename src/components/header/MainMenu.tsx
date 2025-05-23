
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
  return (
    <nav className="hidden lg:flex items-center space-x-2">
      <div
        className="main-menu-item flex items-center relative"
        onMouseEnter={() => onMenuHover('concern')}
        onMouseLeave={onMenuLeave}
      >
        <span className="text-gray-800 font-medium">Shop by Concern</span>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
        <MegaMenuConcern isOpen={activeMenu === 'concern'} />
      </div>

      <div
        className="main-menu-item flex items-center relative"
        onMouseEnter={() => onMenuHover('category')}
        onMouseLeave={onMenuLeave}
      >
        <span className="text-gray-800 font-medium">Shop by Category</span>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
        <MegaMenuCategory isOpen={activeMenu === 'category'} />
      </div>

      <div
        className="main-menu-item flex items-center relative"
        onMouseEnter={() => onMenuHover('doctors')}
        onMouseLeave={onMenuLeave}
      >
        <span className="text-gray-800 font-medium">For Doctors</span>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
        <MegaMenuDoctor isOpen={activeMenu === 'doctors'} />
      </div>

      <div 
        className="main-menu-item flex items-center relative"
        onMouseEnter={() => onMenuHover('bachflower')}
        onMouseLeave={onMenuLeave}
      >
        <Link to="/bach-flower" className="flex items-center">
          <span className="text-gray-800 font-medium">Bach Flower</span>
        </Link>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
        <MegaMenuBachFlower isOpen={activeMenu === 'bachflower'} />
      </div>

      <Link to="/i-love-homeopathy" className="main-menu-item flex items-center">
        <span className="whitespace-nowrap text-gray-800 font-medium">I</span>
        <div className="mx-1 text-red-500">❤️</div>
        <span className="whitespace-nowrap text-gray-800 font-medium">HOMEOPATHY</span>
      </Link>
      
      <Link to="/homeopathy" className="main-menu-item">
        <span className="text-gray-800 font-medium">Why Homeopathy</span>
      </Link>
    </nav>
  );
};
