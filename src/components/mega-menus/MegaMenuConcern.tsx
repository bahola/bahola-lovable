
import React from 'react';
import { 
  Bug, Heart, Baby, Ear, Eye, Wheat, 
  BadgePlus, Flower, BugPlay, Dumbbell, 
  Brain, Apple, Pill, Stethoscope, Wind, 
  Banana, Smile, Droplets, ShoppingBag
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
}

// Utility function for concern icons
const getConcernIcon = (name: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Allergies': <Bug size={20} />,
    'Cancer': <Pill size={20} />,
    'Heart Health': <Heart size={20} />,
    'Child Care': <Baby size={20} />,
    'Ear Nose Throat': <Ear size={20} />,
    'Eye Care': <Eye size={20} />,
    'Gut Health': <Wheat size={20} />,
    'Womens Care': <BadgePlus size={20} />,
    'Hair Care': <Flower size={20} />,
    'Immune boosters': <BadgePlus size={20} />,
    'Infection': <BugPlay size={20} />,
    'Lifestyle': <BadgePlus size={20} />,
    'Muscle & Joint Care': <Dumbbell size={20} />,
    'Mental health': <Brain size={20} />,
    'Nutritive': <Apple size={20} />,
    'Pain Care': <Pill size={20} />,
    'Reproductive care': <BadgePlus size={20} />,
    'Respiratory Care': <Wind size={20} />,
    'Skin Care': <Banana size={20} />,
    'Tooth Care': <Smile size={20} />,
    'Urinary care': <Droplets size={20} />
  };
  
  return iconMap[name] || <Pill size={20} />;
};

// Shop by Concern Mega Menu - Simplified to show only products
export const MegaMenuConcern: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const concerns = [
    { name: 'Allergies', shopRoute: '/category/allergies' },
    { name: 'Cancer', shopRoute: '/category/cancer-support' },
    { name: 'Heart Health', shopRoute: '/category/heart-health' },
    { name: 'Child Care', shopRoute: '/category/child-care' },
    { name: 'Ear Nose Throat', shopRoute: '/category/ent-care' },
    { name: 'Eye Care', shopRoute: '/category/eye-care' },
    { name: 'Gut Health', shopRoute: '/category/gut-health' },
    { name: 'Womens Care', shopRoute: '/category/womens-health' },
    { name: 'Hair Care', shopRoute: '/category/hair-care' },
    { name: 'Immune boosters', shopRoute: '/category/immune-boosters' },
    { name: 'Infection', shopRoute: '/category/infection-care' },
    { name: 'Lifestyle', shopRoute: '/category/lifestyle-care' },
    { name: 'Muscle & Joint Care', shopRoute: '/category/muscle-care' },
    { name: 'Mental health', shopRoute: '/category/mental-health' },
    { name: 'Nutritive', shopRoute: '/category/nutritive-care' },
    { name: 'Pain Care', shopRoute: '/category/pain-care' },
    { name: 'Reproductive care', shopRoute: '/category/reproductive-care' },
    { name: 'Respiratory Care', shopRoute: '/category/respiratory-care' },
    { name: 'Skin Care', shopRoute: '/category/skin-care' },
    { name: 'Tooth Care', shopRoute: '/category/tooth-care' },
    { name: 'Urinary care', shopRoute: '/category/urology-care' }
  ];

  return (
    <div className={`mega-menu ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="container mx-auto bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <ShoppingBag size={24} className="text-green-600 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-green-800">Shop by Health Problem</h3>
              <p className="text-sm text-green-600">Browse homeopathic remedies and natural products</p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {concerns.map((concern) => (
              <a 
                key={concern.name}
                href={concern.shopRoute}
                className="flex items-center p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 text-green-800 hover:text-green-900 border border-green-200 hover:border-green-300"
              >
                <div className="mr-2 text-green-600 flex-shrink-0">
                  {getConcernIcon(concern.name)}
                </div>
                <span className="text-xs font-medium">
                  {concern.name}
                </span>
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-green-100">
            <a 
              href="/products" 
              className="inline-flex items-center text-sm font-medium text-green-700 hover:text-green-900"
            >
              View All Products →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuConcern;
