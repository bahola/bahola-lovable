
import React from 'react';
import { ChevronDown, Heart } from 'lucide-react';
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
  );
};
