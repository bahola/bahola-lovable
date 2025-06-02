
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
        className="main-menu-item flex items-center relative cursor-pointer"
        onMouseEnter={() => onMenuHover('concern')}
        onMouseLeave={onMenuLeave}
      >
        <span className="text-gray-800 font-medium">Shop by Disease</span>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
        <MegaMenuConcern isOpen={activeMenu === 'concern'} />
      </div>

      <div
        className="main-menu-item flex items-center relative cursor-pointer"
        onMouseEnter={() => onMenuHover('category')}
        onMouseLeave={onMenuLeave}
      >
        <span className="text-gray-800 font-medium">Shop by Category</span>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
        <MegaMenuCategory isOpen={activeMenu === 'category'} />
      </div>

      <div
        className="main-menu-item flex items-center relative cursor-pointer"
        onMouseEnter={() => onMenuHover('doctors')}
        onMouseLeave={onMenuLeave}
      >
        <span className="text-gray-800 font-medium">For Doctors</span>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
        <MegaMenuDoctor isOpen={activeMenu === 'doctors'} />
      </div>

      <div 
        className="main-menu-item flex items-center relative cursor-pointer"
        onMouseEnter={() => onMenuHover('bachflower')}
        onMouseLeave={onMenuLeave}
      >
        <span className="text-gray-800 font-medium">Bach Flower</span>
        <ChevronDown size={16} className="ml-1 text-gray-600" />
        <MegaMenuBachFlower isOpen={activeMenu === 'bachflower'} />
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
    </nav>
  );
};
