
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
    <nav className="hidden lg:flex items-center">
      <div
        className="main-menu-item flex items-center"
        onMouseEnter={() => onMenuHover('concern')}
        onMouseLeave={onMenuLeave}
      >
        <span>Shop by Concern</span>
        <ChevronDown size={16} className="ml-1" />
        <MegaMenuConcern isOpen={activeMenu === 'concern'} />
      </div>

      <div
        className="main-menu-item flex items-center"
        onMouseEnter={() => onMenuHover('category')}
        onMouseLeave={onMenuLeave}
      >
        <span>Shop by Category</span>
        <ChevronDown size={16} className="ml-1" />
        <MegaMenuCategory isOpen={activeMenu === 'category'} />
      </div>

      <div
        className="main-menu-item flex items-center"
        onMouseEnter={() => onMenuHover('doctors')}
        onMouseLeave={onMenuLeave}
      >
        <span>For Doctors</span>
        <ChevronDown size={16} className="ml-1" />
        <MegaMenuDoctor isOpen={activeMenu === 'doctors'} />
      </div>

      <div 
        className="main-menu-item flex items-center"
        onMouseEnter={() => onMenuHover('bachflower')}
        onMouseLeave={onMenuLeave}
      >
        <Link to="/bach-flower">
          <span>Bach Flower</span>
        </Link>
        <ChevronDown size={16} className="ml-1" />
        <MegaMenuBachFlower isOpen={activeMenu === 'bachflower'} />
      </div>

      <Link to="/i-love-homeopathy" className="main-menu-item flex items-center">
        <span className="whitespace-nowrap">I</span>
        <div className="mx-1 text-red-500">❤️</div>
        <span className="whitespace-nowrap">HOMEOPATHY</span>
      </Link>
      
      <Link to="/homeopathy" className="main-menu-item">
        <span>Why Homeopathy</span>
      </Link>
    </nav>
  );
};
