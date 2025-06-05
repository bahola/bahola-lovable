
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
    'Allergies': <Bug size={24} />,
    'Cancer': <Pill size={24} />,
    'Heart Health': <Heart size={24} />,
    'Child Care': <Baby size={24} />,
    'Ear Nose Throat': <Ear size={24} />,
    'Eye Care': <Eye size={24} />,
    'Gut Health': <Wheat size={24} />,
    'Womens Care': <BadgePlus size={24} />,
    'Hair Care': <Flower size={24} />,
    'Immune boosters': <BadgePlus size={24} />,
    'Infection': <BugPlay size={24} />,
    'Lifestyle': <BadgePlus size={24} />,
    'Muscle & Joint Care': <Dumbbell size={24} />,
    'Mental health': <Brain size={24} />,
    'Nutritive': <Apple size={24} />,
    'Pain Care': <Pill size={24} />,
    'Reproductive care': <BadgePlus size={24} />,
    'Respiratory Care': <Wind size={24} />,
    'Skin Care': <Banana size={24} />,
    'Tooth Care': <Smile size={24} />,
    'Urinary care': <Droplets size={24} />
  };
  
  return iconMap[name] || <Pill size={24} />;
};

// Shop by Concern Mega Menu - Updated to link to product categories instead of health concern pages
export const MegaMenuConcern: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const concerns = [
    { name: 'Allergies', route: '/products/allergies' },
    { name: 'Cancer', route: '/products/cancer-support' },
    { name: 'Heart Health', route: '/products/heart-health' },
    { name: 'Child Care', route: '/products/childrens-health' },
    { name: 'Ear Nose Throat', route: '/products/ent-care' },
    { name: 'Eye Care', route: '/products/eye-care' },
    { name: 'Gut Health', route: '/products/digestive-health' },
    { name: 'Womens Care', route: '/products/womens-health' },
    { name: 'Hair Care', route: '/products/hair-care' },
    { name: 'Immune boosters', route: '/products/immune-support' },
    { name: 'Infection', route: '/products/infection-care' },
    { name: 'Lifestyle', route: '/products/lifestyle' },
    { name: 'Muscle & Joint Care', route: '/products/joint-muscle-care' },
    { name: 'Mental health', route: '/products/mental-health' },
    { name: 'Nutritive', route: '/products/nutritional-supplements' },
    { name: 'Pain Care', route: '/products/pain-relief' },
    { name: 'Reproductive care', route: '/products/reproductive-health' },
    { name: 'Respiratory Care', route: '/products/respiratory-health' },
    { name: 'Skin Care', route: '/products/skin-care' },
    { name: 'Tooth Care', route: '/products/dental-care' },
    { name: 'Urinary care', route: '/products/urinary-health' }
  ];

  return (
    <div className={`mega-menu mega-menu-full ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-lg border-t-4 border-blue-500">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Shop by Health Concern</h2>
        <div className="grid grid-cols-3 gap-4 max-w-6xl">
          {concerns.map((concern) => (
            <a 
              key={concern.name} 
              href={concern.route}
              className="flex items-center p-3 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-gray-700 hover:text-blue-600 min-w-0 bg-white/70 hover:bg-blue-100 shadow-sm"
            >
              <div className="mr-3 text-blue-500 flex-shrink-0">
                {getConcernIcon(concern.name)}
              </div>
              <span className="text-sm font-medium truncate">
                {concern.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenuConcern;
