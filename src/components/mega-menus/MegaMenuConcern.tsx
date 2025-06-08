
import React, { useState } from 'react';
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

// Shop by Concern Mega Menu - Sidebar layout with hover interactions
export const MegaMenuConcern: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const [hoveredCategory, setHoveredCategory] = useState<'learn' | 'shop' | null>('shop');

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
      <div className="container mx-auto bg-white shadow-lg">
        <div className="grid grid-cols-6 min-h-[400px]">
          
          {/* Left Sidebar - 1/6 ratio */}
          <div className="col-span-1 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Browse by</h2>
              
              {/* Shop Products Button - Now first */}
              <button
                className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 ${
                  hoveredCategory === 'shop' 
                    ? 'bg-green-100 text-green-800 shadow-md' 
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
                onMouseEnter={() => setHoveredCategory('shop')}
              >
                <div className="flex items-center">
                  <ShoppingBag size={18} className="mr-2" />
                  <div>
                    <div className="font-medium text-sm">Shop Natural</div>
                    <div className="text-xs opacity-75">Solutions</div>
                  </div>
                </div>
              </button>

              {/* Learn About Button - Now second */}
              <button
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  hoveredCategory === 'learn' 
                    ? 'bg-blue-100 text-blue-800 shadow-md' 
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
                onMouseEnter={() => setHoveredCategory('learn')}
              >
                <div className="flex items-center">
                  <Book size={18} className="mr-2" />
                  <div>
                    <div className="font-medium text-sm">Learn About</div>
                    <div className="text-xs opacity-75">Conditions</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Content Area - 5/6 ratio */}
          <div className="col-span-5 p-6">
            {hoveredCategory === 'shop' && (
              <div>
                <div className="flex items-center mb-4">
                  <ShoppingBag size={24} className="text-green-600 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-green-800">Shop Natural Solutions</h3>
                    <p className="text-sm text-green-600">Browse homeopathic remedies and natural products</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {concerns.map((concern) => (
                    <a 
                      key={`shop-${concern.name}`}
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
              </div>
            )}

            {hoveredCategory === 'learn' && (
              <div>
                <div className="flex items-center mb-4">
                  <Book size={24} className="text-blue-600 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-blue-800">Learn About Conditions</h3>
                    <p className="text-sm text-blue-600">Discover causes, symptoms, and natural treatment approaches</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {concerns.map((concern) => (
                    <a 
                      key={`info-${concern.name}`}
                      href={concern.infoRoute}
                      className="flex items-center p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-blue-800 hover:text-blue-900 border border-blue-200 hover:border-blue-300"
                    >
                      <div className="mr-2 text-blue-600 flex-shrink-0">
                        {getConcernIcon(concern.name)}
                      </div>
                      <span className="text-xs font-medium">
                        {concern.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {!hoveredCategory && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="text-lg font-medium mb-2">Shop by Problem</div>
                  <p className="text-sm">Hover over "Learn About" or "Shop Natural" to explore options</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuConcern;
