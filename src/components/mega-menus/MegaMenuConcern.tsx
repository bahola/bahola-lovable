
import React from 'react';
import { 
  Bug, Heart, Baby, Ear, Eye, Wheat, 
  BadgePlus, Flower, BugPlay, Dumbbell, 
  Brain, Apple, Pill, Stethoscope, Wind, 
  Banana, Smile, Droplets, Book, ShoppingBag
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

// Shop by Concern Mega Menu - Split design with Learn and Shop sections
export const MegaMenuConcern: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const concerns = [
    { name: 'Allergies', infoRoute: '/diseases-conditions/allergies', shopRoute: '/category/allergies' },
    { name: 'Cancer', infoRoute: '/diseases-conditions/cancer-support', shopRoute: '/category/cancer-support' },
    { name: 'Heart Health', infoRoute: '/diseases-conditions/heart-health', shopRoute: '/category/heart-health' },
    { name: 'Child Care', infoRoute: '/diseases-conditions/child-care', shopRoute: '/category/child-care' },
    { name: 'Ear Nose Throat', infoRoute: '/diseases-conditions/ent-care', shopRoute: '/category/ent-care' },
    { name: 'Eye Care', infoRoute: '/diseases-conditions/eye-care', shopRoute: '/category/eye-care' },
    { name: 'Gut Health', infoRoute: '/diseases-conditions/gut-health', shopRoute: '/category/gut-health' },
    { name: 'Womens Care', infoRoute: '/diseases-conditions/womens-health', shopRoute: '/category/womens-health' },
    { name: 'Hair Care', infoRoute: '/diseases-conditions/hair-care', shopRoute: '/category/hair-care' },
    { name: 'Immune boosters', infoRoute: '/diseases-conditions/immune-boosters', shopRoute: '/category/immune-boosters' },
    { name: 'Infection', infoRoute: '/diseases-conditions/infection-care', shopRoute: '/category/infection-care' },
    { name: 'Lifestyle', infoRoute: '/diseases-conditions/lifestyle-care', shopRoute: '/category/lifestyle-care' },
    { name: 'Muscle & Joint Care', infoRoute: '/diseases-conditions/muscle-care', shopRoute: '/category/muscle-care' },
    { name: 'Mental health', infoRoute: '/diseases-conditions/mental-health', shopRoute: '/category/mental-health' },
    { name: 'Nutritive', infoRoute: '/diseases-conditions/nutritive-care', shopRoute: '/category/nutritive-care' },
    { name: 'Pain Care', infoRoute: '/diseases-conditions/pain-care', shopRoute: '/category/pain-care' },
    { name: 'Reproductive care', infoRoute: '/diseases-conditions/reproductive-care', shopRoute: '/category/reproductive-care' },
    { name: 'Respiratory Care', infoRoute: '/diseases-conditions/respiratory-care', shopRoute: '/category/respiratory-care' },
    { name: 'Skin Care', infoRoute: '/diseases-conditions/skin-care', shopRoute: '/category/skin-care' },
    { name: 'Tooth Care', infoRoute: '/diseases-conditions/tooth-care', shopRoute: '/category/tooth-care' },
    { name: 'Urinary care', infoRoute: '/diseases-conditions/urology-care', shopRoute: '/category/urology-care' }
  ];

  return (
    <div className={`mega-menu ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Learn About Conditions */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Book size={24} className="text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-blue-800">Learn About Conditions</h2>
            </div>
            <p className="text-sm text-blue-700 mb-4">Discover causes, symptoms, and natural treatment approaches</p>
            
            <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
              {concerns.map((concern) => (
                <a 
                  key={`info-${concern.name}`}
                  href={concern.infoRoute}
                  className="flex items-center p-2 hover:bg-blue-200/50 rounded-md transition-colors duration-200 text-blue-800 hover:text-blue-900 min-w-0 bg-white/50"
                >
                  <div className="mr-3 text-blue-600 flex-shrink-0">
                    {getConcernIcon(concern.name)}
                  </div>
                  <span className="text-sm font-medium truncate">
                    Learn about {concern.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Shop Products */}
          <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <ShoppingBag size={24} className="text-green-600 mr-2" />
              <h2 className="text-xl font-bold text-green-800">Shop Natural Solutions</h2>
            </div>
            <p className="text-sm text-green-700 mb-4">Browse homeopathic remedies and natural products</p>
            
            <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
              {concerns.map((concern) => (
                <a 
                  key={`shop-${concern.name}`}
                  href={concern.shopRoute}
                  className="flex items-center p-2 hover:bg-green-200/50 rounded-md transition-colors duration-200 text-green-800 hover:text-green-900 min-w-0 bg-white/50"
                >
                  <div className="mr-3 text-green-600 flex-shrink-0">
                    {getConcernIcon(concern.name)}
                  </div>
                  <span className="text-sm font-medium truncate">
                    Shop {concern.name} products
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuConcern;
