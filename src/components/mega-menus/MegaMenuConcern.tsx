
import React from 'react';
import { 
  Bug, Heart, Baby, Ear, Eye, Wheat, 
  BadgePlus, Flower, BugPlay, Dumbbell, 
  Brain, Apple, Pill, Stethoscope, Wind, 
  Banana, Smile, Droplets
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
}

// Utility function for concern icons
const getConcernIcon = (name: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Mental Health': <Brain size={24} />,
    'Digestive Disorders': <Wheat size={24} />,
    'Respiratory Diseases': <Wind size={24} />,
    'Skin Diseases': <Banana size={24} />,
    'Joint & Muscle Disorders': <Dumbbell size={24} />,
    'Womens Health': <BadgePlus size={24} />,
    'Childrens Health': <Baby size={24} />,
    'Eye Problems': <Eye size={24} />,
    'Cardiovascular Disorders': <Heart size={24} />,
    'Metabolic Disorders': <Apple size={24} />
  };
  
  return iconMap[name] || <Pill size={24} />;
};

// Shop by Disease Categories Mega Menu
export const MegaMenuConcern: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const diseaseCategories = [
    'Mental Health',
    'Digestive Disorders', 
    'Respiratory Diseases',
    'Skin Diseases',
    'Joint & Muscle Disorders',
    'Womens Health',
    'Childrens Health',
    'Eye Problems',
    'Cardiovascular Disorders',
    'Metabolic Disorders'
  ];

  return (
    <div className={`mega-menu mega-menu-full ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-lg border-t-4 border-blue-500">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Shop by Disease Category</h2>
        <div className="grid grid-cols-2 gap-4 max-w-6xl">
          {diseaseCategories.map((category) => (
            <a 
              key={category} 
              href={`/diseases/${category.toLowerCase().replace(/\s+/g, '-').replace('&', '')}`}
              className="flex items-center p-3 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-gray-700 hover:text-blue-600 min-w-0 bg-white/70 hover:bg-blue-100 shadow-sm"
            >
              <div className="mr-3 text-blue-500 flex-shrink-0">
                {getConcernIcon(category)}
              </div>
              <span className="text-sm font-medium truncate">
                {category}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenuConcern;
